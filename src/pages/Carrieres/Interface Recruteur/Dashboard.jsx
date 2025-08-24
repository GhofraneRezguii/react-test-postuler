// src/carreires/interface/recruteur/Dashboard.jsx
// src/carreires/interface/recruteur/Dashboard.jsx
import React, { useState, useEffect, useRef,useMemo } from "react";
import { Link } from "react-router-dom";
import RecruterLayout from "./RecruteurLayout";
import ParticlesBackground from "../../../Components/ParticlesBackground";
import "./DashboardL.css";
import ModalNouvelleOffre from "./ModalNouvelleOffre";
import ModalNouvelCandidat from "./ModalNouvelCandidat";

function Dashboard() {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const quickActionsRef = useRef(null);

  // États pour modals et fichiers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Offres et candidats récupérés
  const [offres, setOffres] = useState([]);
  const [candidats, setCandidats] = useState([]);

  // Stats globales
  const [stats, setStats] = useState({
    totalOffres: 0,
    offresActives: 0,
    offresExpirees: 0,
    derniereMaj: "",
    totalCandidats: 0,
    accepts: 0,
    refus: 0,
    nouvellesSemaine: 0,
    nouvellesMois: 0,
    enAttente: 0,
  });

  // Nouveaux objets pour modals
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
  const [isModalCandidatOpen, setIsModalCandidatOpen] = useState(false);
  //ref******************************************************************
  const [candidaturesStatut, setCandidaturesStatut] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("candidaturesStatut")) || {};
    } catch {
      return {};
    }
  });

  // Fonction pour mettre à jour localStorage ET state React en même temps
  const updateStatutLocal = (id, nouveauStatut) => {
    setCandidaturesStatut((prev) => {
      const updated = { ...prev, [id]: nouveauStatut };
      localStorage.setItem("candidaturesStatut", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    if (candidats.length === 0) return;

    let acceptsCount = 0;
    let refusCount = 0;
    let enAttenteCount = 0;

    candidats.forEach((c) => {
      const statut = c.statut ?? "nouveau";
      if (statut === "accepté") acceptsCount++;
      else if (statut === "refusé") refusCount++;
      else if (["nouveau", "en-cours"].includes(statut)) enAttenteCount++;
    });
    console.log(
      "Statuts candidats:",
      candidats.map((c) => c.statut)
    );
    console.log("Calcul enAttente:", enAttenteCount);

    setStats((prev) => ({
      ...prev,
      accepts: acceptsCount,
      refus: refusCount,
      enAttente: enAttenteCount,
    }));
  }, [candidats]);

  // *****************************************

  useEffect(() => {
    if (showQuickActions && quickActionsRef.current) {
      quickActionsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showQuickActions]);

  // Chargement des données dashboard au montage
  useEffect(() => {
    async function fetchData() {
      try {
        // Charger les stats hors statuts
        const statsRes = await fetch(
          "http://localhost:5000/api/dashboard/stats"
        );
        const statsData = await statsRes.json();

        // Mettre à jour le state stats sans écraser les valeurs de statuts calculées localement
        setStats((prev) => ({
          ...statsData,
          accepts: prev.accepts, // garder l'existant local
          refus: prev.refus, // garder l'existant local
          enAttente: prev.enAttente, // (Notez que dans le backend, demain Maj peut être null etc)
        }));

        // Charger offres récentes
        const offresRes = await fetch(
          "http://localhost:5000/api/dashboard/offres/recentes"
        );
        const offresData = await offresRes.json();
        setOffres(offresData);

        // Charger candidatures récentes
        const candidatsRes = await fetch(
          "http://localhost:5000/api/dashboard/candidatures/recentes"
        );
        const candidatsData = await candidatsRes.json();

        // Injecter les statuts locaux issus de localStorage
        const candidatsAvecStatutLocal = candidatsData.map((c) => ({
          ...c,
          statut: candidaturesStatut[c._id] ?? c.statut ?? "nouveau",
        }));
        setCandidats(candidatsAvecStatutLocal);
      } catch (error) {
        console.error("Erreur chargement dashboard :", error);
      }
    }
    fetchData();
  }, [candidaturesStatut]);
  // 🔑 important d'avoir candidaturesStatut ici !

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = () => {
    setUploadSuccess(true);
  };

  // const handleCreateOffer = () => {
  //   if (
  //     newOffer.ref &&
  //     newOffer.titre &&
  //     newOffer.departement &&
  //     newOffer.type &&
  //     newOffer.soumission &&
  //     newOffer.expiration
  //   ) {
  //     setOffres([...offres, newOffer]);
  //     setNewOffer({
  //       ref: "",
  //       titre: "",
  //       departement: "",
  //       type: "Stage",
  //       soumission: "",
  //       expiration: "",
  //       description: "",
  //       candidatures: 0,
  //     });
  //     setUploadSuccess(false);
  //     setIsModalOpen(false);
  //   } else {
  //     alert("Veuillez remplir tous les champs !");
  //   }
  // };

  const handleFileButtonClickCandidat = () => fileInputRef.current?.click();
  const handleFileSelectCandidat = () => setUploadSuccess(true);

  // const handleCreateCandidat = () => {
  //   const nc = newCandidat;
  //   if (
  //     nc.id &&
  //     nc.nom &&
  //     nc.prenom &&
  //     nc.email &&
  //     nc.ref_offre &&
  //     nc.type &&
  //     nc.statut &&
  //     nc.date_condidature
  //   ) {
  //     setCandidats([...candidats, nc]);
  //     setNewCandidat({
  //       id: "",
  //       nom: "",
  //       prenom: "",
  //       email: "",
  //       ref_offre: "",
  //       type: "",
  //       statut: "",
  //       date_condidature: "",
  //       description: "",
  //     });
  //     setUploadSuccess(false);
  //     setIsModalCandidatOpen(false);
  //   } else {
  //     alert("Veuillez remplir tous les champs !");
  //   }
  // };

  // Formatage date simple
  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }


  const handleCreateOffer = async () => {
    if (
      newOffer.ref &&
      newOffer.titre &&
      newOffer.departement &&
      newOffer.type &&
      newOffer.soumission &&
      newOffer.expiration
    ) {
      try {
        const res = await fetch("http://localhost:5000/offre", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOffer),
        });
        if (!res.ok) throw new Error("Erreur lors de la création de l'offre");
  
        const createdOffer = await res.json();
        setOffres(prev => [...prev, createdOffer]);
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
        setIsModalOpen(false);
        setUploadSuccess(false);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  };
  




  const handleCreateCandidat = async () => {
    if (
      newCandidat.id &&
      newCandidat.nom &&
      newCandidat.prenom &&
      newCandidat.email &&
      newCandidat.ref_offre &&
      newCandidat.type &&
      newCandidat.statut &&
      newCandidat.date_condidature
    ) {
      try {
        const res = await fetch("http://localhost:5000/candidature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCandidat),
        });
        if (!res.ok) throw new Error("Erreur lors de la création du candidat");
  
        const createdCandidat = await res.json();
        setCandidats(prev => [...prev, createdCandidat]);
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
        setIsModalCandidatOpen(false);
        setUploadSuccess(false);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  };
  


  const [candidatures, setCandidatures] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/candidature')
    .then(res => {
      if (!res.ok) throw new Error('Erreur réseau ' + res.status);
      return res.json();
    })
    .then(data => {
      setCandidatures(data);
    })
    .catch(e => {
      console.error('Erreur fetch candidatures:', e);
    });
}, []);

const candidaturesCountByOffre = useMemo(() => {
  return candidatures.reduce((acc, candidature) => {
    acc[candidature.ref_offre] = (acc[candidature.ref_offre] || 0) + 1;
    return acc;
  }, {});
}, [candidatures]);







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
            Nombre d'Offres : <strong>{stats.totalOffres}</strong>
          </div>
          <div className="info-line">
            <strong className="Noffres-act">{stats.offresActives}</strong>{" "}
            Actives,{" "}
            <strong className="Noffres-exp">{stats.offresExpirees}</strong>{" "}
            Expirées
          </div>
          <div className="info-line">
            Dernière mise à jour :{" "}
            <strong>{formatDate(stats.derniereMaj)}</strong>
          </div>
          <Link
            to="/admin-offres"
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
            Nombre de Candidats : <strong>{stats.totalCandidats}</strong>
          </div>
          <div className="info-line">
            Acceptés : <strong>{stats.accepts}</strong>
          </div>
          <div className="info-line">
            Refusés : <strong>{stats.refus}</strong>
          </div>
          <Link
            to="/admin-condidatures"
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
            Cette semaine : <strong>{stats.nouvellesSemaine}</strong>
          </div>
          <div className="info-line">
            Ce mois : <strong>{stats.nouvellesMois}</strong>
          </div>
          <Link
            to="/admin-condidatures"
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
            <strong>{stats.enAttente}</strong>
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
            to="/admin-condidatures"
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
        {/* Offres récentes */}
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
            <Link to="/admin-offres" style={{ textDecoration: "none" }}>
              <button className="cta">
                <span>Voir tout</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </Link>
          </div>

          {offres.map((offer) => (
  <div key={offer._id} className="cardy">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <p className="cardy-title" style={{ marginBottom: 0 }}>
        {offer.titre}
      </p>
      <button className="button-smooth">
        {new Date(offer.expiration) > new Date() ? "Valable" : "Expirée"}
      </button>
    </div>
    <hr />
    <div className="info-line">
      Réf: <span style={{ fontSize: "12px", fontWeight: "bolder" }}>{offer.ref}</span>
    </div>
    <div className="info-line">
      <strong>{candidaturesCountByOffre[offer.ref] || 0}</strong> : Candidatures
    </div>
  </div>
))}

        </div>

        {/* Candidatures récentes */}
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
            <Link to="/admin-condidatures" style={{ textDecoration: "none" }}>
              <button className="cta">
                <span>Voir tout</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </Link>
          </div>

          {candidats.map((cand) => (
            <div key={cand._id} className="cardy">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p className="cardy-title" style={{ marginBottom: 0 }}>
                  {cand.nom} {cand.prenom}
                </p>
                <button className="button-smooth status">{cand.statut}</button>
              </div>
              <hr />
              <div className="info-line">
                Type Offre:{" "}
                <span style={{ fontSize: "12px", fontWeight: "bolder" }}>
                  {cand.typeOffre}
                </span>
              </div>
              <div className="info-line">
                Candidature le :{" "}
                <strong>
                  {formatDate(
                    cand.date_condidature || cand.date || cand.createdAt
                  )}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Actions Rapides */}
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
