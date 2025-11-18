import type { Meal } from "../store/mealStore";


const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

interface FetchMealsResponse {
  meals: any[]; 
}

export const fetchMealsAPI = async (): Promise<Meal[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch meals');
    }
    const data: FetchMealsResponse = await response.json();
    
    return data.meals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strInstructions,
      thumbnail: meal.strMealThumb,
      liked: false,
    }));
  } catch (error) {
    console.error('Error fetching meals:', error);
    return [];
  }
};