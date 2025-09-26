"use client";

import { use, useEffect, useState } from "react";
import { getMealById, normalizeIngredients } from "../../lib/meals";
import { saveToStorage, getFromStorage } from "@/app/api/storage";
import { addFavorite, removeFavorite, isFavorite } from "@/app/api/storage";
import DayMealPicker from "../../components/DayMealPicker";
import Link from "next/link";

export default function RecipeDetail({ params }) {
  const { id } = use(params);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    async function fetchMeal() {
      const m = await getMealById(id);
      setMeal(m);
      setLoading(false);
    }
    fetchMeal();
  }, [id]);

  if (loading) return <p>Caricamento...</p>;
  if (!meal) return <p>Ricetta non trovata</p>;

  const ingredients = normalizeIngredients(meal);

  const addToFavorites = () => {
    const favs = getFromStorage("favorites", []);
    if (!favs.find((f) => f.idMeal === meal.idMeal)) {
      favs.push(meal);
      saveToStorage("favorites", favs);
    }
    alert("Aggiunto ai preferiti!");
  };

  const addToPlan = ({ day, meal: mealType }) => {
    const plan = getFromStorage("plan", {});
    if (!plan[day]) plan[day] = {};
    plan[day][mealType] = meal;
    saveToStorage("plan", plan);
    setPickerOpen(false);
    alert("Aggiunto al piano settimanale!");
  };

  return (
    <div className="recipe-detail">
      <Link href="/" className="btn-secondary">
        🏠 Torna alla Home
      </Link>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} width={300} />
      <p>
        <b>Categoria:</b> {meal.strCategory}
      </p>
      <h3>Ingredienti</h3>
      <ul>
        {ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h3>Istruzioni</h3>
      <p>{meal.strInstructions}</p>

      <div className="actions">
        <button onClick={addToFavorites}>Aggiungi ai Preferiti</button>
        <button onClick={() => setPickerOpen(true)}>
          Aggiungi al Piano Settimanale
        </button>
      </div>

      {pickerOpen && (
        <DayMealPicker
          onSelect={addToPlan}
          onCancel={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}
