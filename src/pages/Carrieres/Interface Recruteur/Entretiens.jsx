import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecruterLayout from "./RecruteurLayout";
import ParticlesBackground from "../../../Components/ParticlesBackground";
import "particles.js";
import EntretiensL from "./EntretiensL.css";
import Calendar from "react-calendar";
import { useMemo } from "react";
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-edit"
    viewBox="0 0 24 24"
    style={{ cursor: "pointer", color: "#4e057b" }}
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-trash-2"
    viewBox="0 0 24 24"
    style={{ cursor: "pointer", color: "red" }}
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);

function Entretiens() {
  const [searchTerm, setSearchTerm] = useState("");

  const [showCalendar, setShowCalendar] = useState(false);
  const today = new Date();

  const [date, setDate] = useState(new Date());

  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dayName = new Date().toLocaleDateString("fr-FR", { weekday: "long" });
  const fullDate = new Date().toLocaleDateString("fr-FR", options);

  // today RDV
  const rdvsInit = [
    {
      nom: "Ali",
      prenom: "Ben Salah",
      offre: "Développeur React",
      date: "2025-07-20T14:00", // ISO 8601
    },
    {
      nom: "Inès",
      prenom: "Mansouri",
      offre: "UX Designer",
      date: "2025-07-25T10:30",
    },
    {
      nom: "Nadia",
      prenom: "Mrad",
      offre: "UX Designer",
      date: "2025-07-21T10:30",
    },
    {
      nom: "Sami",
      prenom: "Ben ahmed",
      offre: "UX Designer",
      date: "2025-07-29T10:30",
    },
    // etc.
  ];

  const [rdvs, setRdvs] = useState([]);

  useEffect(() => {
    async function fetchRdvs() {
      const res = await fetch("http://localhost:5000/api/rdvs");

      const data = await res.json();
      console.log("Données reçues:", data);
      setRdvs(data);
    }
    fetchRdvs();
  }, []);

  // const todayRDVs = useMemo(() => {
  //   const today = new Date();
  //   return rdvs.filter((rdv) => {
  //     const rdvDate = new Date(rdv.date);
  //     return (
  //       rdvDate.getDate() === today.getDate() &&
  //       rdvDate.getMonth() === today.getMonth() &&
  //       rdvDate.getFullYear() === today.getFullYear()
  //     );
  //   });
  // }, [rdvs]);

  const todayRDVs = useMemo(() => {
    if (!Array.isArray(rdvs)) {
      console.warn("rdvs n'est pas un tableau", rdvs);
      return [];
    }
    const today = new Date();
    return rdvs.filter((rdv) => {
      const rdvDate = new Date(rdv.date);
      return (
        rdvDate.getDate() === today.getDate() &&
        rdvDate.getMonth() === today.getMonth() &&
        rdvDate.getFullYear() === today.getFullYear()
      );
    });
  }, [rdvs]);

  const allRDVs = rdvs;
  console.log("votre rdv", allRDVs);
  // Etats pour modales
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rdvSelected, setRdvSelected] = useState(null);

  // Etats du formulaire d'édition
  const [formData, setFormData] = useState({
    offre: "",
    nom: "",
    prenom: "",
    date: "",
  });

  // Ouvre la modale d'édition et remplit le formulaire
  function openEditModal(rdv) {
    setRdvSelected(rdv);
    setFormData({ ...rdv });
    setEditModalOpen(true);
  }

  // Confirmer la modif : met à jour rdvs
  // function confirmEdit() {
  //   setRdvs((prev) =>
  //     prev.map((r) => (r === rdvSelected ? { ...formData } : r))
  //   );
  //   setEditModalOpen(false);
  // }

  async function confirmEdit() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/rdvs/${rdvSelected._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du RDV");
      }

      const updatedRdv = await response.json();
      setRdvs((prev) =>
        prev.map((r) => (r._id === updatedRdv._id ? updatedRdv : r))
      );
      setEditModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  }

  // Ouvre modale suppression
  function openDeleteModal(rdv) {
    setRdvSelected(rdv);
    setDeleteModalOpen(true);
  }

  // Confirme suppression
  // function confirmDelete() {
  //   setRdvs((prev) => prev.filter((r) => r !== rdvSelected));
  //   setDeleteModalOpen(false);
  // }
  async function confirmDelete() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/rdvs/${rdvSelected._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Erreur lors de la suppression du RDV");
      // Mettre à jour la liste locale en retirant le RDV supprimé
      setRdvs((prev) => prev.filter((r) => r._id !== rdvSelected._id));
      setDeleteModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  }

  //create nouveau RDV
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newRdv, setNewRdv] = useState({
    offre: "",
    nom: "",
    prenom: "",
    date: "",
  });

  const pastRDVs = useMemo(() => {
    if (!Array.isArray(rdvs)) {
      console.warn("rdvs n'est pas un tableau", rdvs);
      return [];
    }
    const now = new Date();
    return rdvs.filter((rdv) => new Date(rdv.date) < now);
  }, [rdvs]);

  const upcomingRDVs = useMemo(() => {
    if (!Array.isArray(rdvs)) {
      console.warn("rdvs n'est pas un tableau", rdvs);
      return [];
    }
    const now = new Date();
    return rdvs.filter((rdv) => new Date(rdv.date) >= now);
  }, [rdvs]);

  useEffect(() => {
    async function fetchRdvs() {
      try {
        let url = "http://localhost:5000/api/rdvs";
        if (searchTerm.trim() !== "") {
          url += `/search?q=${encodeURIComponent(searchTerm)}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setRdvs(data);
      } catch (error) {
        console.error("Erreur chargement RDVs :", error);
        setRdvs([]); // fallback sécure
      }
    }
    fetchRdvs();
  }, [searchTerm]);

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
            Planification des entretiens
          </h2>
          <h6
            className="zoom-animation"
            style={{ color: "#0048c6", marginLeft: "12px" }}
          >
            Organisez et gérez facilement vos entretiens avec les candidats.
          </h6>
        </div>

        {/* btn n EDV */}
        <button className="nE-btn" onClick={() => setCreateModalOpen(true)}>
          <sign>+</sign>
          Nouveau RDV
          <div className="hoverEffect">
            <div></div>
          </div>
        </button>
      </div>

      {/* Search section  */}

      <div className="searchyy-wrapper">
        <div className="searchy-section">
          <div className="searchy-input-containeri">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un RDV, candidat, poste..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchyy-input"
            />

            <div className="cardsyt-row">
              <div className="cardyt-item">
                <h6>Entretiens passés</h6>
                <hr></hr>
                <strong style={{ color: "#028536" }}>{pastRDVs.length}</strong>
              </div>
              <div className="cardyt-item">
                <h6>Entretiens restants</h6>
                <hr></hr>
                <strong style={{ color: "rgb(125, 4, 4)" }}>
                  {upcomingRDVs.length}
                </strong>
              </div>
            </div>
          </div>

          {/* card today date */}
          <div className="parent">
            <div className="cardd">
              <div className="header-inline">
                <h3>Aujourd'hui</h3>
                <div className="containeri">
                  <div className="cloud front">
                    <span className="left-front"></span>
                    <span className="right-front"></span>
                  </div>
                  <span className="sun sunshine"></span>
                  <span className="sun"></span>
                  <div className="cloud back">
                    <span className="left-back"></span>
                    <span className="right-back"></span>
                  </div>
                </div>
              </div>

              <div className="content-box">
                <span className="cardd-title">{dayName}</span>
                <p className="cardd-content">{fullDate}</p>
                <span
                  className="see-more"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowCalendar(true)}
                >
                  Calendrier
                </span>
              </div>

              <div className="date-box">
                <span className="month">
                  {new Date()
                    .toLocaleDateString("fr-FR", { month: "long" })
                    .toUpperCase()}
                </span>
                <span className="date">{new Date().getDate()}</span>
              </div>
            </div>

            {showCalendar && (
              <div
                className="calendar-popup-overlay"
                onClick={() => setShowCalendar(false)}
              >
                <div
                  className="calendar-popup-card"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="closey-btn"
                    onClick={() => setShowCalendar(false)}
                  >
                    ×
                  </button>
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    locale="fr-FR"
                    calendarType="gregory"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* cards */}
        <div
          className="stackedy-cards"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            marginTop: "50px",
          }}
        >
          {/* card RDV today */}
          <div className="stacky-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h4
                style={{
                  fontWeight: "600",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15rem",
                }}
              >
                <span>RDV pour Aujourd'hui</span>
                <span style={{ color: "#8ac3ff" }}>
                  Total RDV :{" "}
                  <span style={{ color: "#8ac3ff" }}>({todayRDVs.length})</span>
                </span>
              </h4>

              <button className="cta">
                <span>Voir tout</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </div>

            {todayRDVs.length === 0 ? (
              <p
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "white",
                  textShadow: `0 0 4px rgba(158, 191, 249, 0.886),
                            0 0 8px rgba(155, 186, 239, 0.975),
                            0 0 12px rgb(190, 210, 247)`,
                  transition: "text-shadow 0.3s ease",
                }}
              >
                Aucun RDV pour aujourd'hui
              </p>
            ) : (
              todayRDVs.map((rdv, index) => (
                <div key={index} className="cardy">
                  {/* Ligne titre + bouton + icônes */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p className="cardy-title" style={{ marginBottom: 0 }}>
                      {rdv.offre}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <button className="button-smooth">Valable</button>
                      <div
                        className="editi"
                        onClick={() => openEditModal(rdv)}
                        title="Modifier RDV"
                        style={{ cursor: "pointer" }}
                      >
                        <EditIcon />
                      </div>
                      <div
                        className="deleti"
                        onClick={() => openDeleteModal(rdv)}
                        title="Supprimer RDV"
                        style={{ cursor: "pointer" }}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="info-line">
                    Candidat :{" "}
                    <strong>
                      {rdv.nom} {rdv.prenom}
                    </strong>
                  </div>
                  <div className="info-line">
                    Date :{" "}
                    <strong>
                      {new Date(rdv.date).toLocaleString("fr-FR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </strong>
                  </div>
                </div>
              ))
            )}
             <br></br>
             <br></br>
            {/* all RDV */}
            <div className="stacky-card ally">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h4
                  style={{
                    fontWeight: "600",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "21rem",
                  }}
                >
                  <span>Tous les RDV</span>
                  <span style={{ color: "#8ac3ff" }}>
                    Total RDV : ({" "}
                    <span style={{ color: "#8ac3ff" }}>
                      {Array.isArray(allRDVs) ? allRDVs.length : 0}
                    </span>{" "}
                    )
                  </span>
                </h4>

                <button className="cta">
                  <span>Réduire</span>
                  <svg width="15px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </div>

              {Array.isArray(allRDVs) && allRDVs.length > 0 ? (
                allRDVs.map((rdv, index) => (
                  <div key={index} className="cardy">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p className="cardy-title" style={{ marginBottom: 0 }}>
                        {rdv.offre}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <button className="button-smooth">Valable</button>
                        <div
                          className="editi"
                          onClick={() => openEditModal(rdv)}
                          title="Modifier RDV"
                          style={{ cursor: "pointer" }}
                        >
                          <EditIcon />
                        </div>
                        <div
                          className="deleti"
                          onClick={() => openDeleteModal(rdv)}
                          title="Supprimer RDV"
                          style={{ cursor: "pointer" }}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="info-line">
                      Candidat :{" "}
                      <strong>
                        {rdv.nom} {rdv.prenom}
                      </strong>
                    </div>
                    <div className="info-line">
                      Date :{" "}
                      <strong>
                        {new Date(rdv.date).toLocaleString("fr-FR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </strong>
                    </div>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "white",
                    textShadow: `0 0 4px rgba(158, 191, 249, 0.886),
          0 0 8px rgba(155, 186, 239, 0.975),
          0 0 12px rgb(190, 210, 247)`,
                    transition: "text-shadow 0.3s ease",
                  }}
                >
                  Aucun RDV enregistré
                </p>
              )}
            </div>

            {/* MODALE EDIT */}
            {editModalOpen && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10000,
                }}
                onClick={() => setEditModalOpen(false)}
              >
                <div
                  className="editycard"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    padding: 20,
                    borderRadius: 10,
                    width: 400,
                  }}
                >
                  <h3>Modifier RDV</h3>

                  <label>
                    Offre:
                    <input
                      type="text"
                      value={formData.offre}
                      onChange={(e) =>
                        setFormData({ ...formData, offre: e.target.value })
                      }
                      style={{ width: "100%", marginBottom: 10 }}
                    />
                  </label>

                  <label>
                    Nom:
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) =>
                        setFormData({ ...formData, nom: e.target.value })
                      }
                      style={{ width: "100%", marginBottom: 10 }}
                    />
                  </label>

                  <label>
                    Prénom:
                    <input
                      type="text"
                      value={formData.prenom}
                      onChange={(e) =>
                        setFormData({ ...formData, prenom: e.target.value })
                      }
                      style={{ width: "100%", marginBottom: 10 }}
                    />
                  </label>

                  <label>
                    Date & heure:
                    <input
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      style={{ width: "100%", marginBottom: 15 }}
                    />
                  </label>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 150,
                    }}
                  >
                    <button
                      className="annbtn"
                      onClick={() => setEditModalOpen(false)}
                    >
                      Annuler
                    </button>
                    <button className="confbtn" onClick={confirmEdit}>
                      Confirmer
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODALE DELETE */}
            {deleteModalOpen && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10000,
                }}
                onClick={() => setDeleteModalOpen(false)}
              >
                <div
                  className="deliticard"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    padding: 20,
                    borderRadius: 10,
                    width: 400,
                    textAlign: "center",
                  }}
                >
                  <h3>Confirmer la suppression</h3>
                  <p>Voulez-vous vraiment supprimer ce RDV ?</p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: 20,
                    }}
                  >
                    <button
                      className="annbtn"
                      onClick={() => setDeleteModalOpen(false)}
                    >
                      Non
                    </button>
                    <button
                      className="confbtn"
                      onClick={confirmDelete}
                      style={{ color: "white" }}
                    >
                      Oui
                    </button>
                  </div>
                </div>
              </div>
            )}
            {createModalOpen && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10000,
                }}
                onClick={() => setCreateModalOpen(false)}
              >
                <div
                  className="createycard"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: "#fff",
                    padding: 20,
                    borderRadius: 10,
                    width: 400,
                    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                  }}
                >
                  <h3>Ajouter Nouveau RDV</h3>

                  <label>Offre:</label>
                  <input
                    type="text"
                    value={newRdv.offre}
                    onChange={(e) =>
                      setNewRdv({ ...newRdv, offre: e.target.value })
                    }
                    style={{ width: "100%", marginBottom: 10 }}
                  />

                  <label>Nom:</label>
                  <input
                    type="text"
                    value={newRdv.nom}
                    onChange={(e) =>
                      setNewRdv({ ...newRdv, nom: e.target.value })
                    }
                    style={{ width: "100%", marginBottom: 10 }}
                  />

                  <label>Prénom:</label>
                  <input
                    type="text"
                    value={newRdv.prenom}
                    onChange={(e) =>
                      setNewRdv({ ...newRdv, prenom: e.target.value })
                    }
                    style={{ width: "100%", marginBottom: 10 }}
                  />

                  <label>Date & heure:</label>
                  <input
                    type="datetime-local"
                    value={newRdv.date}
                    onChange={(e) =>
                      setNewRdv({ ...newRdv, date: e.target.value })
                    }
                    style={{ width: "100%", marginBottom: 15 }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "20px",
                    }}
                  >
                    <button
                      className="annbtn"
                      onClick={() => setCreateModalOpen(false)}
                    >
                      Annuler
                    </button>
                    <button
                      className="confbtn"
                      onClick={async () => {
                        try {
                          const response = await fetch(
                            "http://localhost:5000/api/rdvs",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(newRdv),
                            }
                          );
                          if (!response.ok)
                            throw new Error(
                              "Erreur lors de la création du RDV."
                            );
                          const savedRdv = await response.json();
                          setRdvs((prev) => [...prev, savedRdv]); // ajouter RDV enregistré et retourné
                          setNewRdv({
                            offre: "",
                            nom: "",
                            prenom: "",
                            date: "",
                          });
                          setCreateModalOpen(false);
                        } catch (error) {
                          alert(error.message);
                        }
                      }}
                    >
                      Créer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RecruterLayout>
  );
}

export default Entretiens;
