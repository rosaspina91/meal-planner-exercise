"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FavoriteButton from "../components/FavoritesButton";
import { getFavorites } from "../api/storage";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-page text-center">
        <h1>I tuoi preferiti</h1>
        <p>Nessuna ricetta salvata nei preferiti.</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">

      <Link href="/" className="btn-secondary">
        🏠 Torna alla Home
      </Link>

      <h1>I tuoi preferiti</h1>
      
      <div className="grid">
        {favorites.map((meal) => (
          <div key={meal.idMeal} className="recipe-card">
            <Link href={`/recipes/${meal.idMeal}`}>
              <img
                className="recipe-image"
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <div className="recipe-info">
                <h3>{meal.strMeal}</h3>
                <p>{meal.strCategory}</p>
              </div>
            </Link>
            <FavoriteButton meal={meal} className="mt-2 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
