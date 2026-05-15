import { dietLabels, type DietTag } from "@/lib/meals";

type DietFilterProps = {
  selectedDiet: DietTag | "all";
  maxPrepMinutes: number;
  onDietChange: (diet: DietTag | "all") => void;
  onPrepChange: (minutes: number) => void;
};

const dietOptions: Array<DietTag | "all"> = [
  "all",
  "vegetarian",
  "vegan",
  "gluten-free",
  "high-protein",
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
      className="rounded-3xl border border-orange-100 bg-white/85 p-5 shadow-sm shadow-orange-100/80 backdrop-blur"
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
          Menu filters
        </p>
        <h2
          id="filters-heading"
          className="text-xl font-semibold text-stone-950"
        >
          Find a lunch that fits the group
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-stone-600">
          Hide meals that do not match a diet or your prep-time budget. The grid
          below updates as you change these.
        </p>
      </div>

      <div className="mt-6 space-y-5 border-t border-orange-100/80 pt-5">
        <div>
          <p
            id="diet-filter-label"
            className="text-xs font-semibold uppercase tracking-wide text-stone-500"
          >
            Dietary match
          </p>
          <p className="mt-1 text-sm text-stone-600">
            Show only meals tagged for this eating style (or everything).
          </p>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-labelledby="diet-filter-label"
          >
            {dietOptions.map((diet) => {
              const isSelected = selectedDiet === diet;

              return (
                <button
                  key={diet}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onDietChange(diet)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isSelected
                      ? "bg-stone-950 text-white shadow-sm"
                      : "bg-orange-50 text-stone-700 hover:bg-orange-100"
                  }`}
                >
                  {diet === "all" ? "All meals" : dietLabels[diet]}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label
            htmlFor="prep-time-slider"
            className="text-xs font-semibold uppercase tracking-wide text-stone-500"
          >
            Prep time budget
          </label>
          <p id="prep-time-hint" className="mt-1 text-sm text-stone-600">
            Recipes above this many minutes disappear from the grid.
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm font-medium text-stone-700 sm:flex-row sm:items-center">
            <label htmlFor="prep-time-slider" className="sr-only">
              Maximum active prep minutes
            </label>
            <span className="shrink-0 sm:w-28">Up to {maxPrepMinutes} min</span>
            <input
              id="prep-time-slider"
              type="range"
              min="15"
              max="45"
              step="5"
              value={maxPrepMinutes}
              onChange={(event) => onPrepChange(Number(event.target.value))}
              className="accent-orange-500 sm:flex-1"
              aria-valuetext={`${maxPrepMinutes} minutes`}
              aria-describedby="prep-time-hint"
            />
            <span className="rounded-full bg-orange-50 px-3 py-1 text-stone-900 sm:shrink-0">
              {maxPrepMinutes} min cap
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
