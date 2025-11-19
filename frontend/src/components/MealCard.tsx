import React from 'react';
import { Link } from 'react-router-dom';
import { useMealStore } from '../store/mealStore';
import type { Meal } from '../store/mealStore';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline, TrashIcon } from '@heroicons/react/24/outline';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const { toggleLike, deleteMeal } = useMealStore();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleLike(meal.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    deleteMeal(meal.id);
  };

  return (
    <Link to={`/products/${meal.id}`} className="block hover:shadow-xl transition-shadow duration-300">
      <div className="border rounded-lg overflow-hidden shadow-lg h-full relative group">
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={handleLikeClick}
            className="bg-white/70 backdrop-blur-sm rounded-full p-1.5 transition-colors hover:bg-white"
            aria-label="Like"
          >
            {meal.liked ? (
              <HeartIconSolid className="h-6 w-6 text-red-500" />
            ) : (
              <HeartIconOutline className="h-6 w-6 text-red-500" />
            )}
          </button>
        </div>
        <div className="absolute top-2 left-2 z-10">
           <button
            onClick={handleDeleteClick}
            className="bg-white/70 backdrop-blur-sm rounded-full p-1.5 transition-colors hover:bg-white text-gray-700 hover:text-red-600"
            aria-label="Delete"
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
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

