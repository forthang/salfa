import type { Meal } from "../store/mealStore";

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const fetchMealsAPI = async (): Promise<Meal[]> => {
  try {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    const fetchPromises = alphabet.map(letter => 
      fetch(`${API_BASE_URL}search.php?f=${letter}`).then(res => res.json())
    );

    const results = await Promise.allSettled(fetchPromises);
    
    const allMeals = results
      .filter(result => result.status === 'fulfilled' && result.value.meals)
      .flatMap(result => (result as PromiseFulfilledResult<{ meals: any[] }>).value.meals);

    // Remove duplicates
    const uniqueMeals = Array.from(new Map(allMeals.map(meal => [meal.idMeal, meal])).values());
      
    return uniqueMeals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strInstructions,
      thumbnail: meal.strMealThumb,
      liked: false,
    }));
  } catch (error) {
    console.error('Error fetching all meals:', error);
    return [];
  }
};