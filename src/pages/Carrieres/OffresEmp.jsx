import React from "react";
import ParticlesBackground from '../../Components/ParticlesBackground.js';

import Navbar from "../../Components/Navbar.js";
import Offres from "../../Components/Offres.jsx";
import SocialMediaIcons from "../../Components/SocialMediaIcons.js";
import "../../App.css";
import "../../Components/Footer.css";
import { useTranslation } from "react-i18next";

function OffresEmp(){
    const { t, i18n } = useTranslation();
    // const navigate = useNavigate();
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

    return (
        <div>
          <ParticlesBackground />
          <Navbar />
    
          <div
            className="container pt-5"
            style={{ marginTop: "20px", position: "relative" }}
          >
            {/* Bouton à gauche absolue */}
            <button className="subscribe-btn reversed fixed-left">
              {/* onClick={() => navigate("/postuler")} */}
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
                fontFamily: "Georgia, serif",
                textShadow: "0 0 10px rgb(110, 164, 235)",
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
                  fontSize: "15px",
                }}
              >
                {t("home.description")}
              </p>
            </div>
    
            <SocialMediaIcons />
            <Offres />
            {/* <footer style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                 <button className="cool-btn">Postuler </button>
              </div>
             </footer> */}
            <footer style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="styled-footer-btn">
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

