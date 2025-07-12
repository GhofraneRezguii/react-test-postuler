import React, { useEffect, useState } from "react";
import "./ThemeToggle.css"; // Ton CSS pour le bouton

const ThemeToggle = () => {
  // Lire l'état du thème depuis le localStorage ou mettre par défaut light
  const [isLightTheme, setIsLightTheme] = useState(() => {
    return localStorage.getItem("theme") !== "dark"; // true = clair, false = sombre
  });

  // Appliquer le thème au body quand isLightTheme change
  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightTheme]);

  return (
    <label className="ui-switch">
      <input
        type="checkbox"
        checked={isLightTheme}
        onChange={() => setIsLightTheme(!isLightTheme)}
      />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
  );
};

export default ThemeToggle;


