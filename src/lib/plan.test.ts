import { describe, expect, it } from "vitest";
import type { Meal } from "./meals";
import { filterMeals, formatCurrency, summarizePlan } from "./plan";

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
});

describe("summarizePlan", () => {
  it("calculates cost, servings, and unique sorted ingredients", () => {
    expect(summarizePlan(testMeals)).toEqual({
      totalCost: 62,
      totalServings: 10,
      ingredients: ["chicken", "lemon", "lime", "rice", "tofu"],
    });
  });
});

describe("formatCurrency", () => {
  it("formats Euro values without cents for workshop readability", () => {
    expect(formatCurrency(62)).toBe("€62");
  });
});
