import { dietLabels, type Meal } from "@/lib/meals";
import { formatCurrency } from "@/lib/plan";

type MealCardProps = {
  meal: Meal;
  planQuantity: number;
  onAdd: (meal: Meal) => void;
  onIncrement: (meal: Meal) => void;
  onDecrement: (meal: Meal) => void;
  onRemove: (meal: Meal) => void;
};

const qtyBtnClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-lg font-semibold text-stone-950 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40";

export function MealCard({
  meal,
  planQuantity,
  onAdd,
  onIncrement,
  onDecrement,
  onRemove,
}: MealCardProps) {
  const inPlan = planQuantity >= 1;

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
          <span aria-hidden="true">{meal.emoji}</span>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-600">
          {meal.prepMinutes} min
        </span>
      </div>

      <div className="mt-5 flex-1">
        <p className="text-sm font-medium text-orange-600">{meal.vibe}</p>
        <h3 className="mt-1 text-2xl font-semibold tracking-tight text-stone-950">
          {meal.name}
        </h3>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          {meal.description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {meal.dietTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
          >
            {dietLabels[tag]}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-stone-500">
            For {meal.servings}
          </p>
          <p className="font-semibold text-stone-950">
            {formatCurrency(meal.costPerServing * meal.servings)}
          </p>
        </div>
        {inPlan ? (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div
              className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 p-1"
              role="group"
              aria-label={`Quantity in plan for ${meal.name}`}
            >
              <button
                type="button"
                className={qtyBtnClass}
                disabled={planQuantity <= 1}
                aria-label={`Decrease quantity of ${meal.name}`}
                onClick={() => onDecrement(meal)}
              >
                −
              </button>
              <span className="min-w-8 px-1 text-center text-sm font-semibold tabular-nums">
                {planQuantity}
              </span>
              <button
                type="button"
                className={qtyBtnClass}
                aria-label={`Increase quantity of ${meal.name}`}
                onClick={() => onIncrement(meal)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="rounded-full px-3 py-2 text-sm font-semibold text-stone-600 underline-offset-2 hover:text-stone-950 hover:underline"
              aria-label={`Remove ${meal.name} from plan`}
              onClick={() => onRemove(meal)}
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-label={`Add ${meal.name} to plan`}
            onClick={() => onAdd(meal)}
            className="rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Add to plan
          </button>
        )}
      </div>
    </article>
  );
}
