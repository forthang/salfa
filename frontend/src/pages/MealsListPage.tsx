import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMealStore } from '../store/mealStore';
import type { MealFilter } from '../store/mealStore';
import MealCard from '../components/MealCard';

const MEALS_PER_PAGE = 8;

const MealsListPage = () => {
  const { 
    meals, 
    loading, 
    fetchMeals, 
    filter, 
    setFilter,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
  } = useMealStore();

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const filteredMeals = useMemo(() => {
    return meals
      .filter(meal => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        
        if (searchTerm && 
            !(meal.title.toLowerCase().includes(lowerCaseSearchTerm) ||
              meal.description.toLowerCase().includes(lowerCaseSearchTerm))) {
          return false;
        }
        
        switch (filter) {
          case 'liked':
            return meal.liked && !meal.deleted;
          case 'deleted':
            return meal.deleted;
          case 'all':
          default:
            return !meal.deleted;
        }
      });
  }, [meals, filter, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredMeals.length / MEALS_PER_PAGE);
  const startIndex = (currentPage - 1) * MEALS_PER_PAGE;
  const endIndex = startIndex + MEALS_PER_PAGE;
  const currentMealsOnPage = filteredMeals.slice(startIndex, endIndex);

  if (loading && meals.length === 0) {
    return <div className="text-center p-10">Loading...</div>;
  }

  const FilterButton: React.FC<{
    buttonFilter: MealFilter,
    text: string
  }> = ({ buttonFilter, text }) => (
    <button
      onClick={() => setFilter(buttonFilter)}
      className={`px-4 py-2 rounded-lg font-semibold ${filter === buttonFilter ? 'bg-gray-200 text-gray-800' : 'bg-white'}`}
    >
      {text}
    </button>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Meals</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-lg bg-gray-200">
            <FilterButton buttonFilter="all" text="All" />
            <FilterButton buttonFilter="liked" text="Liked" />
            <FilterButton buttonFilter="deleted" text="Deleted" />
          </div>
          <Link
            to="/create-product"
            className="px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600"
          >
            Create Post
          </Link>
        </div>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMealsOnPage.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      {filteredMeals.length === 0 && !loading && (
        <div className="text-center p-10 text-gray-500">
          No meals found.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg font-semibold bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg font-semibold bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MealsListPage;
