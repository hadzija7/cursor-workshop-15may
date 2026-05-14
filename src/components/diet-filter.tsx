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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Workshop task 1
          </p>
          <h2
            id="filters-heading"
            className="mt-1 text-xl font-semibold text-stone-950"
          >
            Find a lunch that works for the room
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
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

      <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-stone-700 sm:flex-row sm:items-center">
        Max prep time
        <input
          type="range"
          min="15"
          max="45"
          step="5"
          value={maxPrepMinutes}
          onChange={(event) => onPrepChange(Number(event.target.value))}
          className="accent-orange-500 sm:flex-1"
        />
        <span className="rounded-full bg-orange-50 px-3 py-1 text-stone-900">
          {maxPrepMinutes} min
        </span>
      </label>
    </section>
  );
}
