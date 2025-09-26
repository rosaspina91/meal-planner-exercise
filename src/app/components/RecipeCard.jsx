import Link from "next/link";
import FavoriteButton from "./FavoritesButton";

export default function RecipeCard({ meal }) {
  return (
    <div className="recipe-card">
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
  );
}