import { summarizePlan, type PlanLine } from "@/lib/plan";

type PlanSummaryProps = {
  planLines: PlanLine[];
  onAdjustQuantity: (mealId: string, delta: number) => void;
  onRemoveLine: (mealId: string) => void;
  onClear: () => void;
};

export function PlanSummary({
  planLines,
  onAdjustQuantity,
  onRemoveLine,
  onClear,
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
          +/− here or &ldquo;Add another&rdquo; on a card for repeat orders
          (minimum one per line).
        </div>
      ) : (
        <>
          <ul className="mt-6 space-y-3">
            {planLines.map((line) => (
              <li
                key={line.meal.id}
                className="rounded-2xl bg-white/10 p-3 text-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="min-w-0 font-medium">{line.meal.name}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-stone-400">
                      {line.meal.servings} serves each batch
                    </span>
                    <div className="flex items-center gap-1 rounded-full bg-black/25 p-0.5">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${line.meal.name}`}
                        onClick={() => onAdjustQuantity(line.meal.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold leading-none text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={line.quantity <= 1}
                      >
                        −
                      </button>
                      <span
                        className="min-w-[2rem] text-center tabular-nums text-white"
                        aria-live="polite"
                      >
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${line.meal.name}`}
                        onClick={() => onAdjustQuantity(line.meal.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold leading-none text-white transition hover:bg-white/15"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${line.meal.name} from plan`}
                      onClick={() => onRemoveLine(line.meal.id)}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-200 transition hover:bg-white/10 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
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
