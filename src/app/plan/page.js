"use client";

import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../api/storage";
import Link from "next/link";

const DAYS = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
const MEALS = ["Pranzo", "Cena"];

export default function PlanPage() {
  const [plan, setPlan] = useState({});

  useEffect(() => {
    const saved = getFromStorage("plan", {});
    setPlan(saved);
  }, []);

  const removeMeal = (day, mealType) => {
    const updated = { ...plan };
    if (updated[day]) {
      delete updated[day][mealType];
    }
    saveToStorage("plan", updated);
    setPlan(updated);
  };

  return (
    <div className="plan-page">
        
      <Link href="/" className="btn-secondary">
        🏠 Torna alla Home
      </Link>
      <h1>Piano Settimanale</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Giorno</th>
            {MEALS.map((m) => (
              <th key={m}>{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {MEALS.map((m) => (
                <td key={m}>
                  {plan[day]?.[m] ? (
                    <div>
                      <span>{plan[day][m].strMeal}</span>
                      <button onClick={() => removeMeal(day, m)}>Rimuovi</button>
                    </div>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
