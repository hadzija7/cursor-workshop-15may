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

const dietOptionLabels: Record<DietTag | "all", string> = {
  all: "All meals",
  ...dietLabels,
};

const PREP_MIN = 15;
const PREP_MAX = 45;

export function DietFilter({
  selectedDiet,
  maxPrepMinutes,
  onDietChange,
  onPrepChange,
}: DietFilterProps) {
  return (
    <section
      aria-labelledby="filters-heading"
      className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2
            id="filters-heading"
            className="text-lg font-semibold tracking-tight text-stone-950"
          >
            Filter the menu
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Narrow the options by diet and how long you want to spend prepping.
          </p>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-stone-600">
          Up to {maxPrepMinutes} min
        </span>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <p
              id="diet-group-label"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500"
            >
              Diet
            </p>
            <p className="text-xs text-stone-500">
              {dietOptionLabels[selectedDiet]}
            </p>
          </div>
          <div
            role="group"
            aria-labelledby="diet-group-label"
            className="mt-3 flex flex-wrap gap-2"
          >
            {dietOptions.map((diet) => {
              const isActive = selectedDiet === diet;
              return (
                <button
                  key={diet}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onDietChange(diet)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "border-stone-950 bg-stone-950 text-white shadow-sm"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50"
                  }`}
                >
                  {dietOptionLabels[diet]}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="prep-time"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500"
            >
              Max prep time
            </label>
            <span className="text-sm font-semibold text-stone-950">
              {maxPrepMinutes} min
            </span>
          </div>
          <input
            id="prep-time"
            type="range"
            min={PREP_MIN}
            max={PREP_MAX}
            step={5}
            value={maxPrepMinutes}
            onChange={(event) => onPrepChange(Number(event.target.value))}
            aria-valuemin={PREP_MIN}
            aria-valuemax={PREP_MAX}
            aria-valuenow={maxPrepMinutes}
            className="mt-3 h-2 w-full cursor-pointer accent-orange-500"
          />
          <div className="mt-2 flex justify-between text-[11px] font-medium uppercase tracking-wide text-stone-500">
            <span>{PREP_MIN} min</span>
            <span>{PREP_MAX} min</span>
          </div>
        </div>
      </div>
    </section>
  );
}
