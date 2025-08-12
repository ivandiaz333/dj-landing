// src/App.jsx
import React from "react";
import "./index.css"; // Asegúrate de que importa tu CSS con Tailwind
import DJLandingV2 from "./DJLandingV2.jsx"; // Si ya tienes tu componente
import DJLanding from "./DJLanding.jsx";

export default function App() {
  return (
    <>
      {/* Aquí cargas tu landing real */}
      <DJLanding />
    </>
  );
}
