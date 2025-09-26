export async function searchMealsByName(name) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await res.json();
  return data.meals || [];
}

export async function getMealById(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function getCategories() {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
  const data = await res.json();
  return data.meals.map(c => c.strCategory);
}

export function normalizeIngredients(meal) {
  return Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i+1}`];
    const measure = meal[`strMeasure${i+1}`];
    return ingredient ? `${measure} ${ingredient}` : null;
  }).filter(Boolean);
}
