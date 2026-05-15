import { describe, expect, it } from "vitest";
import type { Meal } from "./meals";
import { filterMeals, formatCurrency, summarizePlan, type PlanLine } from "./plan";

const testMeals: Meal[] = [
  {
    id: "fast-vegan",
    name: "Fast Vegan Bowl",
    description: "Quick plant-based lunch.",
    emoji: "🥗",
    prepMinutes: 15,
    servings: 4,
    costPerServing: 5,
    dietTags: ["vegan", "gluten-free"],
    ingredients: ["rice", "tofu", "lime"],
    vibe: "Fast",
  },
  {
    id: "slow-protein",
    name: "Slow Protein Tray",
    description: "Higher protein tray bake.",
    emoji: "🍗",
    prepMinutes: 40,
    servings: 6,
    costPerServing: 7,
    dietTags: ["high-protein"],
    ingredients: ["chicken", "rice", "lemon"],
    vibe: "Hearty",
  },
];

describe("filterMeals", () => {
  it("filters by diet tag and prep time", () => {
    expect(filterMeals(testMeals, "vegan", 20)).toEqual([testMeals[0]]);
  });

  it("keeps all diet tags when all is selected", () => {
    expect(filterMeals(testMeals, "all", 45)).toHaveLength(2);
  });

  it("filters by the gluten-free diet tag", () => {
    expect(filterMeals(testMeals, "gluten-free", 45)).toEqual([testMeals[0]]);
  });

  it("filters by the high-protein diet tag", () => {
    expect(filterMeals(testMeals, "high-protein", 45)).toEqual([testMeals[1]]);
  });

  it("returns no meals when the diet tag is unmatched within the prep window", () => {
    expect(filterMeals(testMeals, "high-protein", 20)).toEqual([]);
  });
});

const testLines: PlanLine[] = [
  { meal: testMeals[0], quantity: 1 },
  { meal: testMeals[1], quantity: 1 },
];

describe("summarizePlan", () => {
  it("calculates cost, servings, and unique sorted ingredients", () => {
    expect(summarizePlan(testLines)).toEqual({
      totalCost: 62,
      totalServings: 10,
      ingredients: ["chicken", "lemon", "lime", "rice", "tofu"],
    });
  });

  it("scales totals by line quantity", () => {
    expect(
      summarizePlan([{ meal: testMeals[0], quantity: 2 }]),
    ).toEqual({
      totalCost: 40,
      totalServings: 8,
      ingredients: ["lime", "rice", "tofu"],
    });
  });
});

describe("formatCurrency", () => {
  it("formats Euro values without cents for workshop readability", () => {
    expect(formatCurrency(62)).toBe("€62");
  });

  it("renders the plan summary's total cost for the summary panel", () => {
    expect(formatCurrency(summarizePlan(testLines).totalCost)).toBe("€62");
  });
});
