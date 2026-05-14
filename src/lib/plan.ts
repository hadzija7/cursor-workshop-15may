import type { DietTag, Meal } from "@/lib/meals";

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

export function summarizePlan(meals: Meal[]): PlanSummary {
  return {
    totalCost: meals.reduce(
      (sum, meal) => sum + meal.costPerServing * meal.servings,
      0,
    ),
    totalServings: meals.reduce((sum, meal) => sum + meal.servings, 0),
    ingredients: Array.from(
      new Set(meals.flatMap((meal) => meal.ingredients)),
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
