import type { MealFilter } from '../../store/mealStore';

interface FilterButtonProps {
  buttonFilter: MealFilter;
  currentFilter: MealFilter;
  onFilterChange: (filter: MealFilter) => void;
  text: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ buttonFilter, currentFilter, onFilterChange, text }) => (
  <button
    onClick={() => onFilterChange(buttonFilter)}
    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
      currentFilter === buttonFilter
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    {text}
  </button>
);


interface FilterControlsProps {
  currentFilter: MealFilter;
  onFilterChange: (filter: MealFilter) => void;
}

const FilterControls = ({ currentFilter, onFilterChange }: FilterControlsProps) => {
  return (
    <div className="flex items-center p-1 rounded-lg bg-gray-100 gap-1">
      <FilterButton
        buttonFilter="all"
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
        text="All"
      />
      <FilterButton
        buttonFilter="liked"
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
        text="Liked"
      />
      <FilterButton
        buttonFilter="deleted"
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
        text="Deleted"
      />
    </div>
  );
};

export default FilterControls;