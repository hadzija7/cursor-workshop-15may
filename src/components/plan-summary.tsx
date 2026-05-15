import { summarizePlan, type PlanLine } from "@/lib/plan";
import type { Meal } from "@/lib/meals";

type PlanSummaryProps = {
  planLines: PlanLine[];
  onClear: () => void;
  onIncrementMeal: (meal: Meal) => void;
  onDecrementMeal: (meal: Meal) => void;
  onRemoveMeal: (meal: Meal) => void;
};

const qtyBtnClass =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-white/30 text-base font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35";

export function PlanSummary({
  planLines,
  onClear,
  onIncrementMeal,
  onDecrementMeal,
  onRemoveMeal,
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
          plus and minus on a line to adjust how many of each dish to make (at
          least one while it stays on the plan), or remove a line entirely.
        </div>
      ) : (
        <>
          <ul className="mt-6 space-y-3">
            {planLines.map((line) => (
              <li
                key={line.meal.id}
                className="rounded-2xl bg-white/10 p-3 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-medium">{line.meal.name}</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <div
                      className="inline-flex items-center gap-0.5 rounded-full border border-white/20 bg-white/5 p-0.5"
                      role="group"
                      aria-label={`Quantity for ${line.meal.name}`}
                    >
                      <button
                        type="button"
                        className={qtyBtnClass}
                        disabled={line.quantity <= 1}
                        aria-label={`Decrease quantity of ${line.meal.name}`}
                        onClick={() => onDecrementMeal(line.meal)}
                      >
                        −
                      </button>
                      <span className="min-w-7 px-1 text-center text-sm font-semibold tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        className={qtyBtnClass}
                        aria-label={`Increase quantity of ${line.meal.name}`}
                        onClick={() => onIncrementMeal(line.meal)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="rounded-full px-2 py-1 text-xs font-semibold text-orange-200 underline-offset-2 hover:underline"
                      aria-label={`Remove ${line.meal.name} from plan`}
                      onClick={() => onRemoveMeal(line.meal)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-stone-400">
                  ×{line.quantity} batch
                  {line.quantity === 1 ? "" : "es"} ·{" "}
                  {line.meal.servings * line.quantity} total servings
                </p>
              </li>
            ))}
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
