"use client";

import { useMemo, useState } from "react";
import { DietFilter } from "@/components/diet-filter";
import { MealGrid } from "@/components/meal-grid";
import { PlanSummary } from "@/components/plan-summary";
import { meals, type DietTag, type Meal } from "@/lib/meals";
import { filterMeals, type PlanLine } from "@/lib/plan";

export function CafePlanner() {
  const [selectedDiet, setSelectedDiet] = useState<DietTag | "all">("all");
  const [maxPrepMinutes, setMaxPrepMinutes] = useState(45);
  const [planLines, setPlanLines] = useState<PlanLine[]>([]);

  const filteredMeals = useMemo(
    () => filterMeals(meals, selectedDiet, maxPrepMinutes),
    [selectedDiet, maxPrepMinutes],
  );

  function addMealToPlan(meal: Meal) {
    setPlanLines((lines) => {
      if (lines.some((line) => line.meal.id === meal.id)) return lines;
      return [...lines, { meal, quantity: 1 }];
    });
  }

  return (
    <main className="min-h-screen bg-[#fff8ed] text-stone-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] bg-stone-950 text-white shadow-2xl shadow-orange-200/60">
          <div className="grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-300">
                Cursor SDLC workshop
              </p>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
                Cursor Café Planner
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
                A tiny Next.js product for demonstrating the full software
                development loop: plan, implement, debug, test, review,
                document, and automate.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6">
              <h2 className="text-xl font-semibold">15-minute demo arc</h2>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-stone-300">
                <li>1. Plan a scoped improvement with Cursor.</li>
                <li>2. Let Agent mode edit the UI across components.</li>
                <li>
                  3. Extend the plan so coworkers can order multiple quantities
                  of the same meal.
                </li>
                <li>4. Multitask tests, review, and docs in parallel.</li>
                <li>5. Show the Cursor SDK as SDLC automation.</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <DietFilter
              selectedDiet={selectedDiet}
              maxPrepMinutes={maxPrepMinutes}
              onDietChange={setSelectedDiet}
              onPrepChange={setMaxPrepMinutes}
            />
            <MealGrid
              meals={filteredMeals}
              selectedMealIds={planLines.map((line) => line.meal.id)}
              onAddMeal={addMealToPlan}
            />
          </div>

          <PlanSummary
            planLines={planLines}
            onClear={() => setPlanLines([])}
          />
        </div>
      </section>
    </main>
  );
}
