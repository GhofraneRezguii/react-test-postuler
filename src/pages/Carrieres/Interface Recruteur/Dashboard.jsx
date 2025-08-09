// src/carreires/interface/recruteur/Dashboard.jsx
// src/carreires/interface/recruteur/Dashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import RecruterLayout from "./RecruteurLayout";
import ParticlesBackground from "../../../Components/ParticlesBackground";
import "particles.js";
import "./DashboardL.css";
import ModalNouvelleOffre from "./ModalNouvelleOffre";
import ModalNouvelCandidat from "./ModalNouvelCandidat";

function Dashboard() {
  const [showQuickActions, setShowQuickActions] = useState(false);
  useEffect(() => {
    if (showQuickActions && quickActionsRef.current) {
      quickActionsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showQuickActions]);

  const quickActionsRef = React.useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const [newOffer, setNewOffer] = useState({
    ref: "",
    titre: "",
    departement: "",
    type: "Stage",
    soumission: "",
    expiration: "",
    description: "",
    candidatures: 0,
  });
  const [offres, setOffres] = useState([]);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = () => {
    setUploadSuccess(true);
  };

  const handleCreateOffer = () => {
    if (
      newOffer.ref &&
      newOffer.titre &&
      newOffer.departement &&
      newOffer.type &&
      newOffer.soumission &&
      newOffer.expiration
    ) {
      setOffres([...offres, newOffer]);
      setNewOffer({
        ref: "",
        titre: "",
        departement: "",
        type: "Stage",
        soumission: "",
        expiration: "",
        description: "",
        candidatures: 0,
      });
      setUploadSuccess(false);
      setIsModalOpen(false);
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  };

  const [isModalOfferOpen, setIsModalOfferOpen] = useState(false);
  const [isModalCandidatOpen, setIsModalCandidatOpen] = useState(false);
  const [newCandidat, setNewCandidat] = useState({
    id: "",
    nom: "",
    prenom: "",
    email: "",
    ref_offre: "",
    type: "",
    statut: "",
    date_condidature: "",
    description: "",
  });
  const [candidats, setCandidats] = useState([]);

  const handleFileButtonClickCandidat = () => fileInputRef.current?.click();
  const handleFileSelectCandidat = () => setUploadSuccess(true);

  const handleCreateCandidat = () => {
    const nc = newCandidat;
    if (
      nc.id &&
      nc.nom &&
      nc.prenom &&
      nc.email &&
      nc.ref_offre &&
      nc.type &&
      nc.statut &&
      nc.date_condidature
    ) {
      setCandidats([...candidats, nc]);
      setNewCandidat({
        id: "",
        nom: "",
        prenom: "",
        email: "",
        ref_offre: "",
        type: "",
        statut: "",
        date_condidature: "",
        description: "",
      });
      setUploadSuccess(false);
      setIsModalCandidatOpen(false);
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  };

  return (
    <RecruterLayout>
      <ParticlesBackground />
      <div className="header-row">
        <div className="title-column">
          <h2
            style={{
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              color: " rgb(0 22 72)",
              fontWeight: "600",
              textShadow: "0px 2px 2px  #4c87ee",
            }}
          >
            Tableau de bord
          </h2>
          <h6
            className="zoom-animation"
            style={{ color: "#0048c6", marginLeft: "12px" }}
          >
            Aperçu de votre activité de recrutement
          </h6>
        </div>

        <button
          className="fancy"
          onClick={() => setShowQuickActions(!showQuickActions)}
        >
          <span className="top-key"></span>
          <span className="text">
            <span className="icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-plus-square-dotted"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.518 0-10-4.482-10-10s4.482-10 10-10
        10 4.482 10 10-4.482 10-10 10zm-1-16h2v6h-2zm0 8h2v2h-2z"
                />
              </svg>
            </span>
            Actions Rapides
          </span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </button>
      </div>

      {/* Card stats */}
      <div className="cards-container">
        {/* Card 1 */}
        <div className="card">
          <div className="card-header">
            <p className="card-title">Total des offres</p>
            <i
              className="bi bi-briefcase icon-right"
              style={{ marginLeft: "12px" }}
            ></i>
          </div>
          <div className="info-line">
            Nombre d'Offres : <strong>120</strong>
          </div>
          <div className="info-line">
            <strong className="Noffres-act">8</strong> Actives,{" "}
            <strong className="Noffres-exp">4</strong> Expirées
          </div>
          <div className="info-line">
            Dernière mise à jour : <strong>14 Juil 2025</strong>
          </div>
          <Link
            to="/offres"
            className="go-corner"
            style={{ textDecoration: "none" }}
          >
            <div className="go-arrow">→</div>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="card">
          <div className="card-header">
            <p className="card-title">Total Candidats</p>
            <i
              className="bi bi-mortarboard-fill icon-right"
              style={{ marginLeft: "12px" }}
            ></i>
          </div>
          <div className="info-line">
            Nombre de Candidats : <strong>85</strong>
          </div>
          <div className="info-line">
            Acceptés : <strong>35</strong>
          </div>
          <div className="info-line">
            Refusés : <strong>50</strong>
          </div>
          <Link
            to="/candidats"
            className="go-corner"
            style={{ textDecoration: "none" }}
          >
            <div className="go-arrow">→</div>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="card">
          <div className="card-header">
            <p className="card-title">Nouvelles Candidatures</p>
            <i
              className="bi bi-person-fill-up icon-right"
              style={{ marginLeft: "12px" }}
            ></i>
          </div>
          <div className="info-line">
            Cette semaine : <strong>2</strong>
          </div>
          <div className="info-line">
            Ce mois : <strong>9</strong>
          </div>
          <Link
            to="/nouvelles-candidatures"
            className="go-corner"
            style={{ textDecoration: "none" }}
          >
            <div className="go-arrow">→</div>
          </Link>
        </div>

        {/* Card 4 */}
        <div className="card">
          <div className="card-header">
            <p className="card-title">En attente</p>
            <i
              className="bi bi-stopwatch icon-right"
              style={{ marginLeft: "12px" }}
            ></i>
          </div>
          <div
            className="info-line"
            style={{ fontSize: "28px", textAlign: "center" }}
          >
            <strong>19</strong>
          </div>
          <div
            className="info-line"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            Candidatures à traiter
            <span className="icon-wrapperd">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-plus-square-dotted"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.518 0-10-4.482-10-10s4.482-10 10-10 10 4.482 10 10-4.482 10-10 10zm-1-16h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </span>
          </div>
          <Link
            to="/en-attente"
            className="go-corner"
            style={{ textDecoration: "none" }}
          >
            <div className="go-arrow">→</div>
          </Link>
        </div>
      </div>

      {/* Section supplémentaire avec deux cards empilées */}
      <div
        className="stacked-cards"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          marginTop: "40px",
        }}
      >
        <div className="stack-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h4 style={{ fontWeight: "600", marginBottom: "10px" }}>
              Offres récentes
            </h4>
            <button className="cta">
              <span>Voir tout</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
          <div className="cardy">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="cardy-title" style={{ marginBottom: "0" }}>
                Bussiness Developer junior
              </p>
              <button className="button-smooth">Valable</button>
            </div>
            <hr />
            <div className="info-line">
              Réf:{" "}
              <span style={{ fontSize: "12px", fontWeight: "bolder" }}>
                BDJUNIOR106
              </span>
            </div>
            <div className="info-line">
              <strong>12</strong> : Candidatures{" "}
            </div>
          </div>
        </div>

        <div className="stack-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h4 style={{ fontWeight: "600", marginBottom: "10px" }}>
              Candidatures récentes
            </h4>
            <button className="cta">
              <span>Voir tout</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
          <div className="cardy">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="cardy-title" style={{ marginBottom: "0" }}>
                REZGUI Ghofrane
              </p>
              <button className="button-smooth status">en cours</button>
            </div>
            <hr />
            <div className="info-line">
              Type Offre:{" "}
              <span style={{ fontSize: "12px", fontWeight: "bolder" }}>
                Stage
              </span>
            </div>
            <div className="info-line">
              Candidature le : <strong>26/06/2025</strong>
            </div>
          </div>
        </div>
      </div>
      {/* Section avec titre + 3 mini-cards sur une ligne */}
      {showQuickActions && (
        <div
          ref={quickActionsRef}
          className="quick-actions-section"
          style={{ marginTop: "50px" }}
        >
          <h4 style={{ fontWeight: "600", marginBottom: "20px" }}>
            Actions rapides
          </h4>
          <div className="quick-cards-container">
            <div className="quick-card" onClick={() => setIsModalOpen(true)}>
              <div className="quick-icon">
                <i className="bi bi-clipboard2-plus"></i>
              </div>
              <p className="quick-label">Créer une offre</p>
            </div>

            <div
              className="quick-card"
              onClick={() => setIsModalCandidatOpen(true)}
            >
              <div className="quick-icon">
                <i className="bi bi-person-plus-fill"></i>
              </div>
              <p className="quick-label">Ajouter un candidat</p>
            </div>

            <div className="quick-card">
              <div className="quick-icon">
                <i className="bi bi-person-lines-fill"></i>
              </div>
              <p className="quick-label">Traiter les candidatures</p>
            </div>
          </div>
        </div>
      )}
      <ModalNouvelleOffre
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateOffer}
        newOffer={newOffer}
        setNewOffer={setNewOffer}
        handleFileButtonClick={handleFileButtonClick}
        handleFileSelect={handleFileSelect}
        uploadSuccess={uploadSuccess}
        fileInputRef={fileInputRef}
      />
      <ModalNouvelCandidat
        isOpen={isModalCandidatOpen}
        onClose={() => setIsModalCandidatOpen(false)}
        onCreate={handleCreateCandidat}
        newCandidat={newCandidat}
        setNewCandidat={setNewCandidat}
        handleFileButtonClick={handleFileButtonClickCandidat}
        handleFileSelect={handleFileSelectCandidat}
        uploadSuccess={uploadSuccess}
        fileInputRef={fileInputRef}
      />
    </RecruterLayout>
  );
}

export default Dashboard;
