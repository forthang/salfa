import React from 'react';
import { Link } from 'react-router-dom';
import { useMealStore } from '../store/mealStore';
import type { Meal } from '../store/mealStore';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const toggleLike = useMealStore((state) => state.toggleLike);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleLike(meal.id);
  };

  return (
    <Link to={`/products/${meal.id}`} className="block hover:shadow-xl transition-shadow duration-300">
      <div className="border rounded-lg overflow-hidden shadow-lg h-full relative">
        <button
          onClick={handleLikeClick}
          className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm rounded-full p-1.5 z-10 transition-colors hover:bg-white"
          aria-label="Like"
        >
          {meal.liked ? (
            <HeartIconSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIconOutline className="h-6 w-6 text-red-500" />
          )}
        </button>
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
