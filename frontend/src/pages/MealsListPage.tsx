import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMealStore } from '../store/mealStore';
import MealCard from '../components/MealCard';
import Spinner from '../components/ui/Spinner';
import Pagination from '../components/ui/Pagination';
import FilterControls from '../components/meals/FilterControls';

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

  const totalPages = Math.ceil(filteredMeals.length / MEALS_PER_PAGE);
  const startIndex = (currentPage - 1) * MEALS_PER_PAGE;
  const currentMealsOnPage = filteredMeals.slice(startIndex, startIndex + MEALS_PER_PAGE);

  if (loading && meals.length === 0) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Meals</h1>
        <div className="flex items-center gap-4">
          <FilterControls currentFilter={filter} onFilterChange={setFilter} />
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
          placeholder="Search meals by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm"
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

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MealsListPage;
