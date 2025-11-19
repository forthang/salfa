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
  updateMeal: (id: string, data: Partial<Omit<Meal, 'id'>>) => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set, get) => ({
      meals: [],
      loading: false,
      filter: 'all',
      searchTerm: '',

      fetchMeals: async () => {
        const existingMeals = get().meals;
        const existingMealMap = new Map(existingMeals.map(m => [m.id, m]));
        set({ loading: true });

        try {
          const mealsFromAPI = await fetchMealsAPI();

          // Add new meals from the API that are not already in our state
          mealsFromAPI.forEach(apiMeal => {
            if (!existingMealMap.has(apiMeal.id)) {
              existingMealMap.set(apiMeal.id, { ...apiMeal, liked: false, deleted: false });
            }
          });

          const finalMeals = Array.from(existingMealMap.values());
          set({ meals: finalMeals });
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

      updateMeal: (id, data) =>
        set((state) => ({
          meals: state.meals.map((meal) =>
            meal.id === id ? { ...meal, ...data } : meal
          ),
        })),

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