import { useEffect } from 'react';
import { useMealStore } from '../store/mealStore';
import MealCard from '../components/MealCard';

const MealsListPage = () => {
  const { meals, loading, fetchMeals } = useMealStore();

  useEffect(() => {
    if (meals.length === 0) {
      fetchMeals();
    }
  }, [fetchMeals, meals.length]);

  if (loading && meals.length === 0) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealsListPage;
