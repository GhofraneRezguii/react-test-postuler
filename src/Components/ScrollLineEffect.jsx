import { useEffect } from "react";

function ScrollLineEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const line = document.querySelector(".scroll-line");
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;

      // Calcule la largeur de l'écran
      const windowWidth = window.innerWidth;

      // Calcule le pourcentage de scroll vertical (0 à 1)
      const scrollPercent = scrollTop / docHeight;

      // Appliquer le déplacement horizontal proportionnel
      const translateX = scrollPercent * (windowWidth - 100)*0.9; // 100 = largeur de la ligne

      if (line) {
        line.style.transform = `translateX(${translateX}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

export default ScrollLineEffect;

