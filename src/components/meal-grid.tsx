import { type Meal } from "@/lib/meals";
import { MealCard } from "@/components/meal-card";

type MealGridProps = {
  meals: Meal[];
  quantityByMealId: Record<string, number>;
  onAddMeal: (meal: Meal) => void;
};

export function MealGrid({ meals, quantityByMealId, onAddMeal }: MealGridProps) {
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
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          quantityInPlan={quantityByMealId[meal.id] ?? 0}
          onAdd={onAddMeal}
        />
      ))}
    </section>
  );
}
