import { useState } from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ meals = [] }) {
  const [page, setPage] = useState(1);
  const perPage = 8;

  const totalPages = Math.ceil(meals.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageMeals = meals.slice(start, end);

  const goPrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };
  const goNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  return (
    <div className="recipe-grid-container">
      <div className="grid">
        {pageMeals.map((m) => (
          <RecipeCard key={m.idMeal} meal={m} />
        ))}
      </div>
    </div>
  );
}
