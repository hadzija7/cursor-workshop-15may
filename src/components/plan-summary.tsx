import type { Meal } from "@/lib/meals";
import { formatCurrency, summarizePlan } from "@/lib/plan";

type PlanSummaryProps = {
  selectedMeals: Meal[];
  onClear: () => void;
};

export function PlanSummary({ selectedMeals, onClear }: PlanSummaryProps) {
  const summary = summarizePlan(selectedMeals);

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
          {selectedMeals.length} picks
        </span>
      </div>

      {selectedMeals.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-white/20 p-5 text-sm leading-6 text-stone-300">
          Add meals from the cards to build a shared coworking lunch plan. The
          duplicate-add behavior is intentionally left for the Debug mode demo.
        </div>
      ) : (
        <>
          <ul className="mt-6 space-y-3">
            {selectedMeals.map((meal, index) => (
              <li
                key={`${meal.id}-${index}`}
                className="rounded-2xl bg-white/10 p-3 text-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{meal.name}</span>
                  <span className="text-stone-300">{meal.servings} serves</span>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4 text-stone-950">
              <dt className="text-xs uppercase tracking-wide text-stone-500">
                Total cost
              </dt>
              <dd className="mt-1 text-2xl font-semibold">
                {formatCurrency(summary.totalCost)}
              </dd>
            </div>
            <div className="rounded-2xl bg-orange-300 p-4 text-stone-950">
              <dt className="text-xs uppercase tracking-wide text-stone-700">
                Servings
              </dt>
              <dd className="mt-1 text-2xl font-semibold">
                {summary.totalServings}
              </dd>
            </div>
          </dl>

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
