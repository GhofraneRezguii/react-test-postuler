import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardCandidat } from "../api/PostulerApi";
import { toast } from "react-toastify";
import Layout from "../Components/Layout.jsx";
import ParticlesBackground from "../Components/ParticlesBackground.js";
import ScrollToTop from "../Components/ScrollToTop";
import io from "socket.io-client";
import CandidatForm from "../Components/CandidatForm";
import "./DashboardCandidat.css";

function DashboardCandidat() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showPostulerModal, setShowPostulerModal] = useState(false);

  // 🔹 Déplacée en dehors de useEffect pour être utilisable dans le JSX
  const chargerDashboard = async () => {
    setLoading(true);
    try {
      const data = await getDashboardCandidat();
      setCandidatures(data.candidatures || []);
      toast.success(
        `Bienvenue ! ${data.candidatures.length} candidature(s)`
      );
    } catch (error) {
      toast.error("Erreur chargement dashboard");
      if (error.response?.status === 401) {
        localStorage.removeItem("candidatToken");
        navigate("/carrieres/postuler");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("candidatToken");

    if (!token) {
      navigate("/carrieres/Postuler");
      return;
    }

    // 🔹 Initialiser le dashboard au montage
    chargerDashboard();

    // 🔹 Initialiser la socket
    let socket;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const candidatId = payload.candidatId;
      console.log("👉 candidatId front:", candidatId);


      if (!candidatId) {
        toast.error("Token invalide : candidatId manquant.");
        localStorage.removeItem("candidatToken");
        navigate("/carrieres/postuler");
        return;
      }

      socket = io("http://localhost:5000", {
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("✅ Socket connecté");
        if (candidatId) {
          socket.emit("joinRoom", candidatId);
          console.log("✅ Rejoint room Socket pour le candidat", candidatId);
        }
      });

      socket.on("disconnect", () => {
        console.log("❌ Socket déconnecté");
      });

      // 🔹 Écoute des événements
      socket.on("statutCandidatureMisAJour", (updatedCandidature) => {
        if (!updatedCandidature || !updatedCandidature.candidatId || !updatedCandidature._id) return;
        if (String(updatedCandidature.candidatId) === candidatId) {
          setCandidatures((prev) =>
            prev.map((c) =>
              c._id === updatedCandidature._id ? updatedCandidature : c
            )
          );
          toast.info(`Statut mis à jour: ${updatedCandidature.statut}`);
        }
      });

      socket.on("nouvelleCandidature", (newCandidature) => {
        if (!newCandidature || !newCandidature.candidatId) return;
        if (newCandidature.candidatId === candidatId) {
          setCandidatures((prev) => [newCandidature, ...prev]);
          toast.success("Nouvelle candidature ajoutée !");
        }
      });
    } catch (err) {
      console.error("Erreur extraction candidatId depuis token:", err);
      toast.error("Token invalide. Veuillez vous reconnecter.");
      localStorage.removeItem("candidatToken");
      navigate("/carrieres/postuler");
    }

    return () => {
      isMounted = false;
      if (socket) {
        socket.disconnect();
      }
    };
  }, [navigate]); // chargerDashboard est maintenant dans la closure, pas besoin de la mettre ici

  const handleDeconnexion = () => {
    localStorage.removeItem("candidatToken");
    toast.info("Déconnexion réussie");
    navigate("/carrieres/postuler");
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case "accepté":
        return "#28a745";
      case "en-cours":
        return "#ffc107";
      case "refusé":
        return "#dc3545";
      default:
        return "#17a2b8";
    }
  };

  if (loading) {
    return (
      <Layout>
        <ParticlesBackground />
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Chargement de votre tableau de bord...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ParticlesBackground />
      <ScrollToTop />

      <div className="dashboard-container">
        <div className="header-row">
          <div className="title-column">
            <h2
              style={{
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                color: "rgb(0 22 72)",
                fontWeight: "600",
                textShadow: "0px 2px 2px #4c87ee",
              }}
            >
              Construisez Votre Avenir Avec Nous
            </h2>
            <h6
              className="zoom-animation"
              style={{ color: "#0048c6", marginLeft: "12px" }}
            >
              Suivez l’évolution de vos candidatures en temps réel
            </h6>
          </div>

          <div className="candidat-actions">
            <button className="btn-refresh" onClick={chargerDashboard}>
              🔄 Actualiser
            </button>
            <button className="btn-logout" onClick={handleDeconnexion}>
              🚪 Déconnexion
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "20px", textAlign: "center" }}>
    <button
      className="btn-postuler"
      onClick={() => setShowPostulerModal(true)}
      style={{
        padding: "8px 16px",  /* ← Plus petit */
        fontSize: "14px", 
         /* ← Police plus petite */
      }}
      
    >
      Postuler à une nouvelle offre
    </button>
  </div>

  {/* Contenu conditionnel selon candidatures */}
  {candidatures.length === 0 ? (
    <div className="empty-state">
      <div className="empty-icon"></div>
      <h3 style={{
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                color: "#072348",
                fontWeight: "600",
               
              }}>Aucune candidature</h3>
      <p className="zoom-animation" style={{
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                color: "#072348",
                fontWeight: "600",
               
              }}> Aucune candidature pour le moment. Vous pouvez postuler dès maintenant !</p>
    </div>
  ) : (
          <div className="candidatures-list">
            <div className="stats-row">
              <div className="stat-card">
                <h3>{candidatures.length}</h3>
                <p>Total candidatures</p>
              </div>
              <div className="stat-card">
                <h3>
                  {candidatures.filter((c) => c.statut === "nouveau").length}
                </h3>
                <p>Nouvelles</p>
              </div>
              <div className="stat-card">
                <h3>
                  {candidatures.filter((c) => c.statut === "en-cours").length}
                </h3>
                <p>En cours</p>
              </div>
            </div>

            <div className="table-container">
              <table className="candidatures-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Offre</th>
                    <th>Type</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidatures.map((candidature, index) => (
                    <tr key={candidature._id || index}>
                      <td>
                        {new Date(candidature.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </td>
                      <td className="offre-title">{candidature.ref_offre}</td>
                      <td>
                        <span
                          className={`type-badge type-${candidature.typeOffre}`}
                        >
                          {candidature.typeOffre?.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`statut-badge statut-${candidature.statut}`}
                          style={{
                            backgroundColor: getStatutColor(candidature.statut),
                          }}
                        >
                          {candidature.statut}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <a
                            href={`http://localhost:5000${candidature.cvFile}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-cv"
                          >
                            📄 CV
                          </a>
                          {candidature.motivationFile && (
                            <a
                              href={`http://localhost:5000${
                                candidature.motivationFile
                              }`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-motiv"
                            >
                              💌 Lettre
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showPostulerModal && (
  <div className="custom-modal-overlay">
    <div className="custom-modal">
      <span
        className="close-modal"
        onClick={() => setShowPostulerModal(false)}
      >
        ×
      </span>

      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Postuler à une nouvelle offre
      </h3>

      <CandidatForm
        onSuccess={() => {
          setShowPostulerModal(false);
          chargerDashboard(); // 🔥 Refresh automatique
        }}
      />
    </div>
  </div>
)}

    </Layout>
  );
}

export default DashboardCandidat;
