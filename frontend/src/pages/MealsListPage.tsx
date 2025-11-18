import { useEffect } from 'react';
import { useMealStore } from '../store/mealStore';

const MealsListPage = () => {
  const { meals, loading, fetchMeals } = useMealStore();

  useEffect(() => {
    // Загружаем данные при монтировании компонента
    fetchMeals();
  }, [fetchMeals]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Raw Meal Data</h1>
      <pre className="bg-gray-100 p-4 rounded-md">
        {JSON.stringify(meals, null, 2)}
      </pre>
    </div>
  );
};

export default MealsListPage;