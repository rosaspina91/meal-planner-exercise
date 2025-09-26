"use client";

import { useState } from "react";
import Link from "next/link";

const DAYS = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
const MEALS = ["Pranzo", "Cena"];

export default function DayMealPicker({ onSelect, onCancel }) {
  const [day, setDay] = useState(DAYS[0]);
  const [meal, setMeal] = useState(MEALS[0]);

  const handleConfirm = () => {
    onSelect({ day, meal });
  };

  return (
    <div className="day-meal-picker">
         <Link href="/" className="btn-secondary">
      🏠 Torna alla Home
    </Link>
      <div className="picker-row">
        <label>Giorno:</label>
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div className="picker-row">
        <label>Pasto:</label>
        <select value={meal} onChange={(e) => setMeal(e.target.value)}>
          {MEALS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div className="picker-actions">
        <button onClick={handleConfirm}>Conferma</button>
        <button onClick={onCancel}>Annulla</button>
      </div>
    </div>
  );
}
