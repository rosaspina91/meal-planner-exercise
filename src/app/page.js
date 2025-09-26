"use client";

import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeGrid from "./components/RecipeGrid";
import { searchMealsByName, getCategories } from "./lib/meals";
import { getFavorites } from "./api/storage";
import Link from "next/link";

export default function HomePage() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useState({ term: "", category: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [favorites, setFavorites] = useState([]);

  // carica categorie
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // carica preferiti
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // fetch ricette
  useEffect(() => {
    async function fetchMeals() {
      try {
        setLoading(true);
        setError("");

        let results = await searchMealsByName(searchParams.term);
        results = results || [];

        // filtra per categoria
        if (searchParams.category) {
          results = results.filter(
            (m) => m.strCategory === searchParams.category
          );
        }

        // rimuove duplicati
        const uniqueMeals = Array.from(
          new Map(results.map((m) => [m.idMeal, m])).values()
        );

        setMeals(uniqueMeals);
        setCurrentPage(1);
      } catch (err) {
        setError("Errore nel caricamento delle ricette");
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, [searchParams]);

  // slice per paginazione
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(meals.length / itemsPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="home-page">
      <h1>Ricettario - by Alexa</h1>

      <div className="divider flex gap-4 mb-4">
        <Link href="/favorites" className="btn-secondary">
          ❤️ Mostra i miei preferiti
        </Link>

        <Link href="/plan" className="btn-secondary">
          📅 Mostra il mio Piano
        </Link>
      </div>

      <SearchBar
        categories={categories}
        onSearch={(params) => setSearchParams(params)}
      />

      {loading ? (
        <p className="text-center">Caricamento...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <RecipeGrid meals={currentMeals} />

          {/* Paginazione */}
          {totalPages > 1 && (
            <div className="pagination flex justify-center gap-4 mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="btn-secondary"
              >
                Prev
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
