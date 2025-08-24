import React, { useState, useEffect } from "react";
import ParticlesBackground from '../../Components/ParticlesBackground.js';
import ScrollLineEffect from "../../Components/ScrollLineEffect.jsx"; 
import Navbar from "../../Components/Navbar.js";
import Offres from "../../Components/Offres.jsx";
import SocialMediaIcons from "../../Components/SocialMediaIcons.js";
import "../../App.css";
import "../../Components/Footer.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; 
import CarrieresNous from "./CarrieresNous.jsx";

function OffresEmp(){
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };


// état pour stocker les offres récupérées
const [offres, setOffres] = useState([]);

// Chargement des offres au montage du composant
useEffect(() => {
  fetch("http://localhost:5000/offre") // adapte l'URL selon backend et proxy
    .then((res) => res.json())
    .then((data) => setOffres(data))
    .catch((err) => console.error("Erreur fetch offres:", err));
}, []);





    return (
        <div>
          <ParticlesBackground />
          <div className="scroll-line"></div>
          <ScrollLineEffect/>
          <Navbar />
    
          <div
            className="container pt-5 "
            style={{ marginTop: "20px", position: "relative",maxHeight:"100%" }}
          >
            {/* Bouton à gauche absolue */}
            <button
      className="subscribe-btn reversed fixed-left"
      onClick={() => navigate("/carrieres/nous")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 5L3 12m0 0l7 7m-7-7h18"
        />
      </svg>
      <p>Retour</p>
    </button>
    
            {/* Titre centré comme avant */}
            <h1
              style={{
                color: "#072b62",
                lineHeight: "45px",
                margin: 0,
                marginBottom: "20px",
                fontFamily: "'Lucida sans'",
                fontSize:"45px",
                fontWeight:"550"
          
              }}
              className="pop-up text-center"
            >
              {t("home.title")}
            </h1>
    
            <div className="slide-in-left text-center">
              <p
                className="slide-in-left gradient-text"
                style={{
                  fontFamily: "'Lucida Sans', Geneva, Verdana, sans-serif",
                  fontSize: "18px",
                }}
              >
                {t("home.description")}
              </p>
            </div>
    
            <SocialMediaIcons />
            <Offres offres={ offres } />
            {/* <footer style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                 <button className="cool-btn">Postuler </button>
              </div>
             </footer> */}
            <footer style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="styled-footer-btn" onClick={() => navigate("/carrieres/Postuler")}>
               Postuler
              <span></span>
                </button>

              </div>
              {/* Bande Copyright animée */}
              <div className="footer-copy">
                <div className="footer-bg"></div>
                <div className="footer-blob"></div>
                <p>
                  © {new Date().getFullYear()} Fininfo Solutions. Tous droits
                  réservés | Politique de confidentialité.
                </p>
              </div>
            </footer>
          </div>
        </div>
      );
    }
    
    export default OffresEmp;

