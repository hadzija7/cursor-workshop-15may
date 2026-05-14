import { dietLabels, type Meal } from "@/lib/meals";
import { formatCurrency } from "@/lib/plan";

type MealCardProps = {
  meal: Meal;
  isSelected: boolean;
  onAdd: (meal: Meal) => void;
};

export function MealCard({ meal, isSelected, onAdd }: MealCardProps) {
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

      <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-stone-500">
            For {meal.servings}
          </p>
          <p className="font-semibold text-stone-950">
            {formatCurrency(meal.costPerServing * meal.servings)}
          </p>
        </div>
        <button
          type="button"
          disabled={isSelected}
          aria-label={isSelected ? `${meal.name} added to plan` : undefined}
          onClick={() => onAdd(meal)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            isSelected
              ? "cursor-default bg-emerald-600 text-white"
              : "bg-stone-950 text-white hover:bg-stone-800"
          }`}
        >
          {isSelected ? "Added" : "Add to plan"}
        </button>
      </div>
    </article>
  );
}
