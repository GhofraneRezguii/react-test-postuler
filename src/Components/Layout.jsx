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
      <Footer/>
    </>
  );
}

export default Layout;
