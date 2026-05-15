import { summarizePlan, type PlanLine } from "@/lib/plan";

type PlanSummaryProps = {
  planLines: PlanLine[];
  onClear: () => void;
  onIncrementQuantity: (mealId: string) => void;
  onDecrementQuantity: (mealId: string) => void;
  onRemoveLine: (mealId: string) => void;
};

export function PlanSummary({
  planLines,
  onClear,
  onIncrementQuantity,
  onDecrementQuantity,
  onRemoveLine,
}: PlanSummaryProps) {
  const summary = summarizePlan(planLines);

  return (
    <aside className="sticky top-6 rounded-[2rem] border border-stone-200 bg-stone-950 p-6 text-white shadow-2xl shadow-stone-300/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
            Live plan
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Friday lunch</h2>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
          {planLines.length} picks
        </span>
      </div>

      {planLines.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-white/20 p-5 text-sm leading-6 text-stone-300">
          Add meals from the cards to build a shared coworking lunch plan. Use
          the plus and minus controls to order more than one batch of the same
          dish, or remove a line anytime.
        </div>
      ) : (
        <>
          <ul className="mt-6 space-y-3">
            {planLines.map((line) => {
              const lineServings = line.quantity * line.meal.servings;
              return (
                <li
                  key={line.meal.id}
                  className="rounded-2xl bg-white/10 p-3 text-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <span className="font-medium">{line.meal.name}</span>
                      <p className="mt-1 text-xs text-stone-300">
                        ×{line.quantity} · {line.meal.servings} serves per batch ·{" "}
                        {lineServings} servings total for this dish
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
                      <div
                        className="flex items-center rounded-full border border-white/25 bg-black/15 p-0.5"
                        role="group"
                        aria-label={`Quantity for ${line.meal.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => onDecrementQuantity(line.meal.id)}
                          aria-label={
                            line.quantity <= 1
                              ? `Remove ${line.meal.name} from plan`
                              : `Decrease quantity of ${line.meal.name}`
                          }
                          className="flex h-8 min-w-8 items-center justify-center rounded-full text-lg font-semibold text-white transition hover:bg-white/10"
                        >
                          −
                        </button>
                        <span className="min-w-8 px-2 text-center text-sm font-semibold tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onIncrementQuantity(line.meal.id)}
                          aria-label={`Increase quantity of ${line.meal.name}`}
                          className="flex h-8 min-w-8 items-center justify-center rounded-full text-lg font-semibold text-white transition hover:bg-white/10"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveLine(line.meal.id)}
                        className="rounded-full px-3 py-1 text-xs font-semibold text-orange-200 underline-offset-4 hover:text-white hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 rounded-2xl bg-orange-300 p-4 text-stone-950">
            <p className="text-xs uppercase tracking-wide text-stone-700">
              Servings
            </p>
            <p className="mt-1 text-2xl font-semibold">{summary.totalServings}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Shopping list starter</h3>
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
            Clear plan
          </button>
        </>
      )}
    </aside>
  );
}
