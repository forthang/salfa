import { create } from 'zustand';
import { fetchMealsAPI } from '../api/meals';

export interface Meal {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  liked?: boolean;
}

interface MealState {
  meals: Meal[];
  loading: boolean;
  fetchMeals: () => Promise<void>;
  deleteMeal: (id: string) => void;
  toggleLike: (id: string) => void;
}

export const useMealStore = create<MealState>((set) => ({
  meals: [],
  loading: false,

  fetchMeals: async () => {
    set({ loading: true });
    try {
      const meals = await fetchMealsAPI();
      set({ meals });
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      set({ meals: [] });
    } finally {
      set({ loading: false });
    }
  },

  deleteMeal: (id) =>
    set((state) => ({
      meals: state.meals.filter((meal) => meal.id !== id),
    })),

  toggleLike: (id) =>
    set((state) => ({
      meals: state.meals.map((meal) =>
        meal.id === id ? { ...meal, liked: !meal.liked } : meal
      ),
    })),
}));