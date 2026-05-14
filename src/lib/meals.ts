export type DietTag = "vegetarian" | "vegan" | "gluten-free" | "high-protein";

export type Meal = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  prepMinutes: number;
  servings: number;
  costPerServing: number;
  dietTags: DietTag[];
  ingredients: string[];
  vibe: string;
};

export const dietLabels: Record<DietTag, string> = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  "gluten-free": "Gluten-free",
  "high-protein": "High-protein",
};

export const meals: Meal[] = [
  {
    id: "sunny-noodle-bowls",
    name: "Sunny Noodle Bowls",
    description:
      "Rice noodles, crunchy veg, peanut-lime dressing, and herbs for the table.",
    emoji: "🍜",
    prepMinutes: 25,
    servings: 6,
    costPerServing: 4.8,
    dietTags: ["vegan", "gluten-free"],
    ingredients: ["rice noodles", "peanut butter", "lime", "cucumber", "mint"],
    vibe: "Fresh and low effort",
  },
  {
    id: "desk-picnic-wraps",
    name: "Desk Picnic Wraps",
    description:
      "Build-your-own wraps with roasted vegetables, hummus, feta, and greens.",
    emoji: "🌯",
    prepMinutes: 20,
    servings: 8,
    costPerServing: 3.9,
    dietTags: ["vegetarian"],
    ingredients: ["wraps", "hummus", "feta", "roasted peppers", "rocket"],
    vibe: "Flexible for a mixed group",
  },
  {
    id: "protein-power-salad",
    name: "Protein Power Salad",
    description:
      "Chicken, chickpeas, grains, and a lemony dressing that keeps well.",
    emoji: "🥗",
    prepMinutes: 30,
    servings: 7,
    costPerServing: 5.6,
    dietTags: ["high-protein", "gluten-free"],
    ingredients: ["chicken", "chickpeas", "quinoa", "lemon", "parsley"],
    vibe: "Hearty but not sleepy",
  },
  {
    id: "market-frittata",
    name: "Market Frittata",
    description:
      "A tray-bake lunch with eggs, potatoes, herbs, and whatever veg is left.",
    emoji: "🍳",
    prepMinutes: 35,
    servings: 8,
    costPerServing: 3.4,
    dietTags: ["vegetarian", "gluten-free", "high-protein"],
    ingredients: ["eggs", "potatoes", "spinach", "cheddar", "chives"],
    vibe: "Reliable crowd pleaser",
  },
  {
    id: "green-curry-pot",
    name: "Green Curry Pot",
    description:
      "One pot of coconut curry with tofu, greens, rice, and enough sauce.",
    emoji: "🍛",
    prepMinutes: 40,
    servings: 9,
    costPerServing: 4.5,
    dietTags: ["vegan", "gluten-free"],
    ingredients: ["tofu", "coconut milk", "green curry paste", "rice", "beans"],
    vibe: "Warm, generous, and shareable",
  },
  {
    id: "mezze-board",
    name: "Coworking Mezze Board",
    description:
      "A grazing board with dips, olives, pita, vegetables, and quick salads.",
    emoji: "🫓",
    prepMinutes: 15,
    servings: 10,
    costPerServing: 4.2,
    dietTags: ["vegetarian"],
    ingredients: ["pita", "tzatziki", "olives", "carrots", "tabbouleh"],
    vibe: "Best for casual conversation",
  },
];
