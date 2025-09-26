"use client";

export default function Error({ error, reset }) {
  return (
    <div className="error-state">
      <h2>❌ Si è verificato un errore</h2>
      <p>{error?.message || "Qualcosa è andato storto."}</p>
      <button onClick={() => reset()}>Riprova</button>
    </div>
  );
}
