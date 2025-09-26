export function saveToStorage(key, value) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getFromStorage(key, defaultValue = []) {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }
  return defaultValue;
}


// Salvataggio dei preferiti


// Salva un array di preferiti
export function saveFavorites(favorites) {
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

// Ottieni array di preferiti
export function getFavorites() {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  }
  return [];
}

// Aggiungi una ricetta ai preferiti
export function addFavorite(meal) {
  const favorites = getFavorites();
  if (!favorites.find(f => f.idMeal === meal.idMeal)) {
    favorites.push(meal);
    saveFavorites(favorites);
  }
}

// Rimuovi una ricetta dai preferiti
export function removeFavorite(idMeal) {
  const favorites = getFavorites().filter(f => f.idMeal !== idMeal);
  saveFavorites(favorites);
}

// Controlla se una ricetta è nei preferiti
export function isFavorite(idMeal) {
  return getFavorites().some(f => f.idMeal === idMeal);
}
