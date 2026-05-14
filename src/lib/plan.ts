import type { DietTag, Meal } from "@/lib/meals";

/** One row in the lunch plan; quantity defaults to 1 until the multi-qty workshop extension. */
export type PlanLine = {
  meal: Meal;
  quantity: number;
};

export type PlanSummary = {
  totalCost: number;
  totalServings: number;
  ingredients: string[];
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function summarizePlan(lines: PlanLine[]): PlanSummary {
  return {
    totalCost: lines.reduce(
      (sum, line) =>
        sum +
        line.meal.costPerServing * line.meal.servings * line.quantity,
      0,
    ),
    totalServings: lines.reduce(
      (sum, line) => sum + line.meal.servings * line.quantity,
      0,
    ),
    ingredients: Array.from(
      new Set(
        lines.flatMap((line) =>
          Array.from({ length: line.quantity }, () => line.meal.ingredients).flat(),
        ),
      ),
    ).sort(),
  };
}

export function filterMeals(
  meals: Meal[],
  diet: DietTag | "all",
  maxPrepMinutes: number,
) {
  return meals.filter((meal) => {
    const matchesDiet = diet === "all" || meal.dietTags.includes(diet);
    const matchesPrep = meal.prepMinutes <= maxPrepMinutes;

    return matchesDiet && matchesPrep;
  });
}
