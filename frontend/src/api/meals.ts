import type { Meal } from "../store/mealStore";

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

interface TheMealDBMeal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

interface FetchMealsResponse {
  meals: TheMealDBMeal[] | null;
}

export const fetchMealsAPI = async (): Promise<Meal[]> => {
  try {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    const fetchPromises = alphabet.map(letter => 
      fetch(`${API_BASE_URL}search.php?f=${letter}`).then(res => res.json() as Promise<FetchMealsResponse>)
    );

    const results = await Promise.allSettled(fetchPromises);
    
    const allMeals = results
      .filter((result): result is PromiseFulfilledResult<FetchMealsResponse> => 
        result.status === 'fulfilled' && result.value.meals !== null
      )
      .flatMap(result => result.value.meals as TheMealDBMeal[]);

    // Remove duplicates
    const uniqueMeals = Array.from(new Map(allMeals.map(meal => [meal.idMeal, meal])).values());
      
    return uniqueMeals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strInstructions,
      thumbnail: meal.strMealThumb,
    }));
  } catch (error) {
    console.error('Error fetching all meals:', error);
    return [];
  }
};