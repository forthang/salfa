import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMealStore } from '../store/mealStore';
import Spinner from '../components/ui/Spinner';
import MealEditForm from '../components/meals/MealEditForm';

const MealDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { meals, fetchMeals, loading } = useMealStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const meal = meals.find((m) => m.id === id);

  useEffect(() => {
    if (!meal && !loading) {
      fetchMeals();
    }
  }, [meal, loading, fetchMeals]);

  if (loading && !meal) {
    return <Spinner />;
  }

  if (!meal) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold mb-4">Meal not found</h2>
        <button onClick={() => navigate('/products')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Back to Meals List
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/products')} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-300">
          &larr; Back to Meals
        </button>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <MealEditForm 
          meal={meal}
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-lg">
          <img src={meal.thumbnail} alt={meal.title} className="w-full h-96 object-cover" />
          <div className="p-6">
            <h1 className="font-bold text-3xl mb-4">{meal.title}</h1>
            <h2 className="font-semibold text-xl mb-2">Instructions</h2>
            <p className="text-gray-700 text-base whitespace-pre-wrap">{meal.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealDetailPage;
