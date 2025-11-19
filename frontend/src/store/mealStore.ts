import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchMealsAPI } from '../api/meals';

export interface Meal {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  liked?: boolean;
  deleted?: boolean;
  isCustom?: boolean;
}

export type MealFilter = 'all' | 'liked' | 'deleted';

interface MealState {
  meals: Meal[];
  loading: boolean;
  filter: MealFilter;
  searchTerm: string;
  fetchMeals: () => Promise<void>;
  toggleDelete: (id: string) => void;
  toggleLike: (id: string) => void;
  setFilter: (filter: MealFilter) => void;
  setSearchTerm: (term: string) => void;
  addMeal: (meal: { title: string; description: string; thumbnail: string }) => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set, get) => ({
      meals: [],
      loading: false,
      filter: 'all',
      searchTerm: '',

      fetchMeals: async () => {
        const oldMeals = get().meals;
        const customMeals = oldMeals.filter(m => m.isCustom);
        set({ loading: true });
        try {
          const mealsFromAPI = await fetchMealsAPI();
          const mealMap = new Map(oldMeals.map(m => [m.id, { liked: m.liked, deleted: m.deleted }]));
          
          const apiMeals = mealsFromAPI.map(newMeal => ({
            ...newMeal,
            liked: mealMap.get(newMeal.id)?.liked || false,
            deleted: mealMap.get(newMeal.id)?.deleted || false,
          }));

          set({ meals: [...customMeals, ...apiMeals] });
        } catch (error) {
          console.error("Failed to fetch meals:", error);
        } finally {
          set({ loading: false });
        }
      },

      addMeal: (meal) => {
        const newMeal: Meal = {
          id: `custom-${Date.now()}`,
          title: meal.title,
          description: meal.description,
          thumbnail: meal.thumbnail,
          liked: false,
          deleted: false,
          isCustom: true,
        };
        set((state) => ({ meals: [newMeal, ...state.meals] }));
      },

      toggleDelete: (id) =>
        set((state) => ({
          meals: state.meals.map((meal) =>
            meal.id === id ? { ...meal, deleted: !meal.deleted } : meal
          ),
        })),

      toggleLike: (id) =>
        set((state) => ({
          meals: state.meals.map((meal) =>
            meal.id === id ? { ...meal, liked: !meal.liked } : meal
          ),
        })),

      setFilter: (filter) => set({ filter }),
      setSearchTerm: (term) => set({ searchTerm: term }),
    }),
    {
      name: 'meal-app-storage',
      partialize: (state) => ({ meals: state.meals }),
    }
  )
);