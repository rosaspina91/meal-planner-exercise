"use client";

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ categories = [], onSearch }) {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");

  // 🔹 Applico debounce SOLO al termine di ricerca
  const debouncedTerm = useDebounce(term, 400);

  // 🔹 Quando cambia term (debounced) o category → chiamo il parent
  useEffect(() => {
    onSearch({ term: debouncedTerm, category });
  }, [debouncedTerm, category]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cerca ricetta..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Tutte le categorie</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
