import React from 'react';
import { Link } from 'react-router-dom';
import type { Meal } from '../store/mealStore';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <Link to={`/products/${meal.id}`} className="block hover:shadow-xl transition-shadow duration-300">
      <div className="border rounded-lg overflow-hidden shadow-lg h-full">
        <img src={meal.thumbnail} alt={meal.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{meal.title}</h3>
          <p className="text-gray-700 text-base line-clamp-3">
            {meal.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MealCard;
