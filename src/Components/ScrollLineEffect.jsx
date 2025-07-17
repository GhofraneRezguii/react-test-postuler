import { useEffect } from "react";

function ScrollLineEffect() {
  useEffect(() => {
    const mainContent = document.querySelector(".main-content");
    const line = document.querySelector(".scroll-line");

    if (!mainContent || !line) return;

    const handleScroll = () => {
      const scrollTop = mainContent.scrollTop;
      const scrollHeight = mainContent.scrollHeight - mainContent.clientHeight;
      const scrollPercent = scrollTop / scrollHeight;

      const windowWidth = window.innerWidth;
      const translateX = scrollPercent * (windowWidth - 100) * 0.5; // 100 = largeur de la ligne

      line.style.transform = `translateX(${translateX}px)`;
    };

    mainContent.addEventListener("scroll", handleScroll);

    return () => {
      mainContent.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}

export default ScrollLineEffect;



