import { dietLabels, type Meal } from "@/lib/meals";
import { formatCurrency } from "@/lib/plan";

type MealCardProps = {
  meal: Meal;
  quantity: number;
  onAdd: (meal: Meal) => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function MealCard({
  meal,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: MealCardProps) {
  const inPlan = quantity >= 1;
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

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-5">
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
              className="flex items-center rounded-full border border-stone-200 bg-stone-50 p-0.5"
              role="group"
              aria-label={`Quantity for ${meal.name}`}
            >
              <button
                type="button"
                onClick={onDecrement}
                aria-label={
                  quantity <= 1
                    ? `Remove ${meal.name} from plan`
                    : `Decrease quantity of ${meal.name}`
                }
                className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-full text-lg font-semibold text-stone-800 transition hover:bg-white"
              >
                −
              </button>
              <span
                className="min-w-[2rem] px-2 text-center text-sm font-semibold tabular-nums text-stone-950"
                aria-live="polite"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={onIncrement}
                aria-label={`Increase quantity of ${meal.name}`}
                className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-full text-lg font-semibold text-stone-800 transition hover:bg-white"
              >
                +
              </button>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              In plan
            </span>
          </div>
        ) : (
          <button
            type="button"
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
