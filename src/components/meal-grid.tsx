import { type Meal } from "@/lib/meals";
import { MealCard } from "@/components/meal-card";
import type { PlanLine } from "@/lib/plan";

type MealGridProps = {
  meals: Meal[];
  planLines: PlanLine[];
  onAddMeal: (meal: Meal) => void;
  onIncrementQuantity: (mealId: string) => void;
  onDecrementQuantity: (mealId: string) => void;
};

export function MealGrid({
  meals,
  planLines,
  onAddMeal,
  onIncrementQuantity,
  onDecrementQuantity,
}: MealGridProps) {
  if (meals.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50/60 p-10 text-center">
        <h3 className="text-xl font-semibold text-stone-950">
          No meals match those filters yet.
        </h3>
        <p className="mt-2 text-stone-600">
          This is a nice live-demo moment: ask Cursor to add a new meal or relax
          the filter logic.
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Meal options"
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      {meals.map((meal) => {
        const qty =
          planLines.find((line) => line.meal.id === meal.id)?.quantity ?? 0;
        return (
          <MealCard
            key={meal.id}
            meal={meal}
            quantity={qty}
            onAdd={onAddMeal}
            onIncrement={() => onIncrementQuantity(meal.id)}
            onDecrement={() => onDecrementQuantity(meal.id)}
          />
        );
      })}
    </section>
  );
}
