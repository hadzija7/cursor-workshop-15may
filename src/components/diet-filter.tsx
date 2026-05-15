import { dietLabels, type DietTag } from "@/lib/meals";

type DietFilterProps = {
  selectedDiet: DietTag | "all";
  maxPrepMinutes: number;
  onDietChange: (diet: DietTag | "all") => void;
  onPrepChange: (minutes: number) => void;
};

/** Baseline workshop: only a subset of diet tags are exposed in the UI. */
const dietOptions: Array<DietTag | "all"> = [
  "all",
  "vegetarian",
  "vegan",
];

export function DietFilter({
  selectedDiet,
  maxPrepMinutes,
  onDietChange,
  onPrepChange,
}: DietFilterProps) {
  return (
    <section
      aria-labelledby="filters-heading"
      className="border border-stone-400 bg-stone-100 p-3 text-stone-800"
    >
      <h2 id="filters-heading" className="text-base font-bold text-stone-900">
        filters
      </h2>
      <p className="mt-1 text-xs text-stone-600">
        Workshop task 1 — diet + prep (UI left rough on purpose)
      </p>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex min-w-[140px] flex-1 flex-col gap-1 text-xs font-medium uppercase tracking-tight text-stone-600">
          diet
          <select
            value={selectedDiet}
            onChange={(event) =>
              onDietChange(event.target.value as DietTag | "all")
            }
            className="border border-stone-500 bg-white py-1 pl-1 pr-6 text-sm font-normal normal-case text-stone-900"
          >
            {dietOptions.map((diet) => (
              <option key={diet} value={diet}>
                {diet === "all" ? "All meals" : dietLabels[diet]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-[180px] flex-[2] flex-col gap-1 text-xs text-stone-600">
          <span className="font-medium uppercase tracking-tight">prep max</span>
          <input
            type="range"
            min="15"
            max="45"
            step="5"
            value={maxPrepMinutes}
            onChange={(event) => onPrepChange(Number(event.target.value))}
            className="h-2 w-full cursor-pointer accent-stone-600"
          />
          <span className="text-[11px] text-stone-500">{maxPrepMinutes} min</span>
        </label>
      </div>
    </section>
  );
}
