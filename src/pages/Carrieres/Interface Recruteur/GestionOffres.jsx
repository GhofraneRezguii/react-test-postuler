import React, { useRef, useState } from "react";
import RecruterLayout from './RecruteurLayout';
import ParticlesBackground from '../../../Components/ParticlesBackground';
import GestionOffresL from './GestionOffresL.css';

function GestionOffres() {
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilePick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleCreateClick = () => {
    alert("Créer une nouvelle offre (fonctionnalité à implémenter)");
  };
  const handleActionClick = () => {
    alert("Action du bouton à côté de la recherche");
  };

  return (
    <RecruterLayout>
      <ParticlesBackground />
      <div className="headerY-row">
        <div className="titleY-column">
          <h2 style={{
            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            color: "rgb(0 22 72)",
            fontWeight: "600",
            textShadow: "0px 2px 2px #4c87ee"
          }}>
            Offres d'emploi
          </h2>
          <h6 className="zoom-animation" style={{ color: "#0048c6", marginLeft: "12px" }}>
            Gérer vos offres d'emploi et leurs condidatures
          </h6>
        </div>
        
        
        <button className="Btny" onClick={handleCreateClick}>
            <div className="signy">+</div>
            <div className="texty">Nouvelle Offre</div>
          </button>
        <div className="download-section" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button className="Download-button" onClick={handleFilePick}>
            <svg viewBox="0 0 640 512" width="20" height="16">
              <path
                fill="white"
                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
              />
            </svg>
            <span>Exporter</span>
          </button>

        </div>
      </div>

      {/* BARRE DE RECHERCHE */}
      <div className="searchy-wrapper">
        <div className="searchy-section" style={{ marginTop: "25px", display: "flex", justifyContent: "center" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#4c87ee"

            className="bi bi-search"
            viewBox="0 0 16 16"
            style={{
              position: "absolute",
              right: "690px",
              top: "30%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              zIndex: 2,
              marginTop: "9px"
            }}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher une offre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchy-input"
          />
        </div>
        {/* BOUTON À CÔTÉ DE LA BARRE DE RECHERCHE */}
        <a className="fancty-button" onClick={handleActionClick}>
          <span className="top-key"></span>
          <span className="text">
            <i className="bi bi-sliders2" style={{ marginRight: "8px" }}></i>
            Filtrer
          </span>
          <span className="bottomy-key-1"></span>
          <span className="bottomy-key-2"></span>
        </a>
      </div>
      {/* cards */}
      <div className="cardsy-row">
        <div className="cardy-item">
          <h6>Total</h6>
          <hr></hr>
          <strong style={{color:"#002050"}}>18</strong>
        </div>
        <div className="cardy-item">
          <h6>Valables</h6>
          <hr></hr>
          <strong style={{color:" #039108"}}>8</strong>
        </div>
        <div className="cardy-item">
          <h6>Expirése</h6>
          <hr></hr>
          <strong style={{color:"red"}}>10</strong>
        </div>
        <div className="cardy-item">
          <h6>Condidatures</h6>
          <hr></hr>
          <strong style={{color:" #450391"}}>23</strong>
        </div>
      </div>


    </RecruterLayout>
  );
}

export default GestionOffres;


