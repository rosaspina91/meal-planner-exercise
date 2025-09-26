"use client";

import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite} from "@/app/api/storage"

export default function FavoriteButton({ meal, className }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(meal.idMeal));
  }, [meal.idMeal]);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
    setFavorite(!favorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`${className ? className : ''} ${favorite ? 'btn-primary' : 'btn-secondary'}`}
    >
      {favorite ? '❤️' : '🤍'}
    </button>
  );
}
