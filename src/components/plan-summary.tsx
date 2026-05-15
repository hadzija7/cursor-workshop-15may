import { formatCurrency, summarizePlan, type PlanLine } from "@/lib/plan";

type PlanSummaryProps = {
  planLines: PlanLine[];
  onClear: () => void;
};

export function PlanSummary({ planLines, onClear }: PlanSummaryProps) {
  const summary = summarizePlan(planLines);

  return (
    <aside className="sticky top-6 rounded-[2rem] border border-stone-200 bg-stone-950 p-6 text-white shadow-2xl shadow-stone-300/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
            Lunch order
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Friday team lunch</h2>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            A running list of dishes everyone agreed on. Add from the meal cards
            on the left.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-sm">
          {planLines.length === 0
            ? "No dishes yet"
            : `${planLines.length} dish${planLines.length === 1 ? "" : "es"}`}
        </span>
      </div>

      {planLines.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-white/20 p-5 text-sm leading-6 text-stone-300">
          Choose <span className="font-semibold text-white">Add to plan</span>{" "}
          on a meal card to put it here. Each line starts at one portion; a later workshop
          step adds repeat orders of the same meal.
        </div>
      ) : (
        <>
          <ul className="mt-6 space-y-3">
            {planLines.map((line) => (
              <li
                key={line.meal.id}
                className="rounded-2xl bg-white/10 p-3 text-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{line.meal.name}</span>
                  <span className="text-stone-300">
                    ×{line.quantity} · {line.meal.servings} serves each
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4 text-stone-950">
              <dt className="text-xs uppercase tracking-wide text-stone-500">
                Est. total
              </dt>
              <dd className="mt-1 text-2xl font-semibold">
                {formatCurrency(summary.totalCost)}
              </dd>
              <dd className="mt-2 text-xs leading-5 text-stone-600">
                Sum of menu prices × portions in this draft order.
              </dd>
            </div>
            <div className="rounded-2xl bg-orange-300 p-4 text-stone-950">
              <dt className="text-xs uppercase tracking-wide text-stone-700">
                Portions covered
              </dt>
              <dd className="mt-1 text-2xl font-semibold">
                {summary.totalServings}
              </dd>
              <dd className="mt-2 text-xs leading-5 text-stone-800/90">
                Approximate seats fed if each recipe feeds as listed.
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <h3 className="font-semibold">Ingredient preview</h3>
            <p className="mt-1 text-sm text-stone-400">
              Combined from the dishes above (first few items, not a full
              grocery run).
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-300">
              {summary.ingredients.slice(0, 8).join(", ")}
              {summary.ingredients.length > 8 ? ", ..." : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="mt-6 w-full rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Clear lunch order
          </button>
        </>
      )}
    </aside>
  );
}
