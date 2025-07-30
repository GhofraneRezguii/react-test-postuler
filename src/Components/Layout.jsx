// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import ParticlesBackground from "./ParticlesBackground.js";
import Footer from "./Footer";
import "../App.css";
import ScrollLineEffect from "./ScrollLineEffect.jsx"; 
import { useState, useEffect } from "react";
import Loader from "./Loader";

function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10); // affiche le loader seulement si +600ms

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) return <Loader />;
  return (
    <>
      <ParticlesBackground />
      <div className="scroll-line"></div>


      <Navbar />
      
   <ScrollLineEffect />   
      <main>{children}</main>
      {/* Bouton scroll-to-top */}
      <button
        className="scrollToTopBtn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg className="scrollToTopIcon" viewBox="0 0 384 512">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
        </svg>
      </button>
      <Footer/>
    </>
  );
}

export default Layout;
