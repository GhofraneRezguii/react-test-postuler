import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./RecruterLayout.css";
import AdminButton from "./AdminButton";
import md5 from "md5";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RecruterLayout({ children }) {
  const getValidImgSrc = (img) => {
    if (!img) return getGravatarUrl(adminEmail);
    if (img.startsWith("http") || img.startsWith("https")) return img;
    return `http://localhost:5000${img}`;
  };

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const res = await fetch("http://localhost:5000/admin/current");
        if (!res.ok) throw new Error("Erreur chargement admin");
        const data = await res.json();

        setAdminData(data);
        setInputs(data);
        localStorage.setItem("adminEmail", data.email);
        setAdminEmail(data.email);

        // Si imgUrl existe, on l'utilise sinon fallback gravatar
        if (data.imgUrl) {
          setAdminImg(data.imgUrl + "?t=" + Date.now());
        } else {
          setAdminImg(getGravatarUrl(data.email));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchAdmin();
  }, []);

  const handleAdminUpdate = async (updateData) => {
    try {
      const response = await fetch("http://localhost:5000/admin/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erreur lors de la mise à jour");
      }

      const data = await response.json();

      // Mettre à jour l'état utilisateur/admin local ici si besoin
      console.log("Admin mis à jour :", data);
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/admin/update-image", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur upload image");

      const data = await response.json();

      // Ajout timestamp pour forcer la mise à jour du src
      console.log("URL image reçue du serveur:", data.imgUrl);
      setAdminImg(data.imgUrl + "?t=" + Date.now());

      toast.success("Image mise à jour !");
    } catch (error) {
      toast.error(error.message);
    }
  };

  function getGravatarUrl(
    email,
    fallback = "https://i.pinimg.com/736x/2f/5a/44/2f5a44eaa573021b56e018d7376c27af.jpg"
  ) {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=${encodeURIComponent(
      fallback
    )}`;
  }

  const IconDashboard = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="26"
      fill="currentColor"
      className="bi bi-columns-gap"
      viewBox="0 0 16 16"
      style={{ marginRight: "8px" }}
    >
      <path d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" />
    </svg>
  );

  const IconSuitcase = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="26"
      fill="currentColor"
      className="bi bi-suitcase-lg"
      viewBox="0 0 16 16"
      style={{ marginRight: "8px" }}
    >
      <path d="M5 2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2h3.5A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5H14a.5.5 0 0 1-1 0H3a.5.5 0 0 1-1 0h-.5A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2zm1 0h4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H3V3zM15 12.5v-9a.5.5 0 0 0-.5-.5H13v10h1.5a.5.5 0 0 0 .5-.5m-3 .5V3H4v10z" />
    </svg>
  );

  const IconPeople = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="26"
      fill="currentColor"
      className="bi bi-people"
      viewBox="0 0 16 16"
      style={{ marginRight: "8px" }}
    >
      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
    </svg>
  );

  const IconEnvelope = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="26"
      fill="currentColor"
      className="bi bi-envelope-at"
      viewBox="0 0 16 16"
      style={{ marginRight: "8px" }}
    >
      <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
      <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
    </svg>
  );

  const IconPersonVCard = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="26"
      fill="currentColor"
      className="bi bi-person-vcard"
      viewBox="0 0 16 16"
      style={{ marginRight: "8px" }}
    >
      <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
    </svg>
  );

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animateClass, setAnimateClass] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminImg, setAdminImg] = useState("");

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
    setAnimateClass(false);
    setTimeout(() => setAnimateClass(true), 5);
  };
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarCollapsed(true);
    }
  }, []);
  useEffect(() => {
    const storedEmail = localStorage.getItem("adminEmail");
    if (storedEmail) {
      setAdminEmail(storedEmail);
      const gravatarUrl = getGravatarUrl(storedEmail);
      setAdminImg(gravatarUrl);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [editFields, setEditFields] = useState({
    nom: false,
    prenom: false,
    email: false,
  });
  const [adminData, setAdminData] = useState({
    nom: "Ghofrane",
    prenom: "Rezgui",
    email: adminEmail || "AdminFinInfo@gmail.com",
    password: "admin123",
  });

  const [inputs, setInputs] = useState(adminData);
  const [editPassword, setEditPassword] = useState(false);
  const [passwordInputs, setPasswordInputs] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});

  // function handleConfirm() {
  //   const newErrors = {};
  //   if (editPassword) {
  //     if (passwordInputs.current !== adminData.password) {
  //       newErrors.current = "Mot de passe actuel incorrect.";
  //     }
  //     if (passwordInputs.new !== passwordInputs.confirm) {
  //       newErrors.confirm = "Les nouveaux mots de passe ne correspondent pas.";
  //     }
  //   }
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //   } else {
  //     setAdminData({
  //       ...inputs,
  //       password: editPassword ? passwordInputs.new : adminData.password,
  //     });
  //     setEditFields({ nom: false, prenom: false, email: false });
  //     setEditPassword(false);
  //     setShowModal(false);
  //   }
  // }
  async function handleConfirm() {
    const newErrors = {};

    if (editPassword && passwordInputs.new !== passwordInputs.confirm) {
      newErrors.confirm = "Les nouveaux mots de passe ne correspondent pas.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const updatePayload = {};

      // Inclure nom si modifié
      if (inputs.nom && inputs.nom !== adminData.nom)
        updatePayload.nom = inputs.nom;
      if (inputs.prenom && inputs.prenom !== adminData.prenom)
        updatePayload.prenom = inputs.prenom;

      // Inclure email si modifié
      if (inputs.email && inputs.email !== adminData.email)
        updatePayload.email = inputs.email;

      // Inclure la gestion du mot de passe
      if (editPassword) {
        updatePayload.newPassword = passwordInputs.new;
        updatePayload.currentPassword = passwordInputs.current;
      }

      const response = await axios.put(
        "http://localhost:5000/admin/update",
        updatePayload
      );

      if (response.data) {
        const updatedAdmin = response.data;
        setAdminData({
          nom: updatedAdmin.nom,
          prenom: updatedAdmin.prenom,
          email: updatedAdmin.email,
        });
        setInputs({
          nom: updatedAdmin.nom,
          prenom: updatedAdmin.prenom,
          email: updatedAdmin.email,
        });

        localStorage.setItem("adminEmail", updatedAdmin.email);
        setAdminImg(getGravatarUrl(updatedAdmin.email));

        setEditFields({ nom: false, prenom: false, email: false });
        setEditPassword(false);
        setShowModal(false);
        setPasswordInputs({ current: "", new: "", confirm: "" });
        setErrors({});

        toast.success("Modifications effectuées avec succès !");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setErrors({ current: "Mot de passe actuel incorrect." });
      } else {
        alert("Erreur lors de la mise à jour. Veuillez réessayer.");
      }
    }
  }

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [fullRdvs, setFullRdvs] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        let url = "http://localhost:5000/api/rdvs/search";
        if (searchTerm.trim() !== "") {
          url += `?q=${encodeURIComponent(searchTerm)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setFullRdvs(data);
      } catch (err) {
        console.error("Erreur fetching RDVs:", err);
        setFullRdvs([]);
      }
    }
    fetchSearchResults();
  }, [searchTerm]);




  // const formattedDate = new Date(rdv.date).toLocaleString("fr-FR", {
  //   weekday: "long",    // jour complet ("lundi", "mardi", etc.)
  //   year: "numeric",    // année "2025"
  //   month: "long",      // mois complet ("août")
  //   day: "numeric",     // jour numérique ("20")
  //   hour: "2-digit",    // heure "14"
  //   minute: "2-digit",  // minutes "30"
  //   hour12: false       // format 24h
  // });
  

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  



  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Charger notifications au montage et toutes les 2 min par exemple
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch("http://localhost:5000/api/notifications");
        const data = await res.json();
        // Vérification simple
        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          console.warn("Données notifications non valides", data);
          setNotifications([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des notifications:", error);
        setNotifications([]);
      }
    }
    fetchNotifications();
  }, []);
  








  return (
    <div className={`dashboard-wrapper ${sidebarCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar */}

      <div className="sidebar">
        <div className="sidebar-header">
          <Link className="navbar-brand" to="/">
            <img
              id="brand"
              src="https://media.licdn.com/dms/image/v2/D563DAQElHMdqtm7WuA/image-scale_191_1128/image-scale_191_1128/0/1683892525165/fininfo_solutions_cover?e=2147483647&v=beta&t=6qKoZ3Gs3KCwxHlr0gYkguibZcganBOCmUbiJwZ5QvY"
              alt="FININFO SOLUTIONS"
              width="165"
              height="40"
            />
          </Link>

          <button
            className={`button ${animateClass ? "animate" : ""}`}
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <div className="button-box">
              <span className="button-elem">
                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                </svg>
              </span>
            </div>
          </button>
        </div>
        <hr className="sidebar-divider" />
        <div className="sidebar-menu">
          <ul>
            <li>
              <NavLink
                to="/admin-condidature"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <IconDashboard />
                <span>Tableau de bord</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin-offres"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <IconSuitcase />
                <span>Offres d'emploi</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-condidatures"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <IconPeople />
                <span>Candidatures</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/emails"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <IconEnvelope />
                <span>Emails</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/entretiens"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <IconPersonVCard />
                <span> Entretiens</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <hr className="sidebar-divider second-divider" />
        <div
          className={`admin-info ${sidebarCollapsed ? "collapsed" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "3px",
          }}
        >
          <img
            src={getValidImgSrc(adminImg) + "?t=" + Date.now()}
            alt="Admin"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getGravatarUrl(adminEmail);
            }}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #4c87ee",
              // width et height sont gérés via CSS pour transition plus fluide
              width: sidebarCollapsed ? "30px" : "40px",
              height: sidebarCollapsed ? "30px" : "40px",
              marginTop: "20px",
              transition: "all 0.3s ease",
            }}
          />
          {!sidebarCollapsed && (
            <p
              className="admin-email"
              style={{
                fontSize: "14px",
                color: "#eef0f8",
                marginTop: "26px",
                textDecoration: "none",
              }}
            >
              {adminEmail}
            </p>
          )}
        </div>

        {/* <div className="sidebar-content" >{children}</div> */}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* ✅ Barre de navigation Bootstrap intégrée */}
        <div className="navwrapper">
          <nav className="navbar recruter-navbar bg-body-tertiary mb-3">
            <div
              className="container-fluid"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            >
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "15px",
                  flexDirection: "column",
                  textDecoration: "none",
                }}
                aria-label="Accueil"
              >
                {/* Icone maison */}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  fill="currentColor"
                  className="bi bi-house-fill home-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                </svg>
                <span className="Acceuil" style={{ color: "#1654c1" }}>
                  Acceuil
                </span>
              </Link>
              {/* Bouton Notifications intégré directement ici */}
              <button
                className="notification"
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  marginRight: "60px",
                  marginLeft: "10px",
                  paddingRight: "25px",
                }}
              >
                <svg
                  className="bell"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                  focusable="false"
                  width="16"
                  height="16"
                >
                  <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
                </svg>
                Notifications ({notifications.length})
                <div className="arrow">›</div>
                <div className="dot"></div>
                
              </button>
              {showNotifications && (
        <div className="notification-list" >
          {notifications.length === 0 ? (
            <p>Aucune notification</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {notifications.map((notif, idx) => (
                <li key={idx} style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
                  {notif.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

              {/* Formulaire de recherche */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="d-flex formy"
                role="search"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "400px",
                  marginRight: "30px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#4c87ee"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "30%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    zIndex: 2,
                    marginTop: "9px",
                  }}
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
                <input
                  type="search"
                  className="form-control format me-1"
                  placeholder="Rechercher Offres, Candidats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: 30, width: "100%" }}
                />
                <button
                  className="btn btn-outline search"
                  type="submit"
                  style={{
                    marginLeft: "15px",
                    marginTop: "0px",
                    paddingRight: "25px",
                  }}
                >
                  Search
                </button>
              </form>
              {/* Spacer qui pousse l'admin-btn à droite */}
              <div style={{ marginLeft: "auto" }}>
                <AdminButton
                  adminName={adminEmail ? adminEmail.split("@")[0] : "Admin"}
                  adminImgSrc={getValidImgSrc(adminImg)}
                  onClick={() => setShowModal(true)}
                />

                {showModal && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      zIndex: 9999,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => setShowModal(false)}
                  >
                    <div
                      className="monCompte"
                      style={{ padding: 25, borderRadius: 10, width: 400 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h2 style={{ marginBottom: 20 }}>Gérer mon compte</h2>

                      <div
                        style={{
                          marginBottom: 10,
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={getValidImgSrc(adminImg) + "?t=" + Date.now()}
                          alt="Admin"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = getGravatarUrl(adminEmail);
                          }}
                          style={{ width: 80, borderRadius: "50%" }}
                        />

                        <button
                          onClick={() => fileInputRef.current.click()}
                          style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            backgroundColor: "#850693",
                            border: "none",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                          title="Changer l'image"
                        >
                          <span
                            style={{
                              fontWeight: "800",
                              fontSize: "25px",
                              color: "white",
                            }}
                          >
                            +
                          </span>
                        </button>

                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                      </div>

                      {["nom", "prenom", "email"].map((field) => (
                        <div key={field} style={{ marginBottom: 10 }}>
                          <label style={{ fontWeight: "bold" }}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                          </label>
                          {editFields[field] ? (
                            <input
                              type="text"
                              value={inputs[field]}
                              onChange={(e) =>
                                setInputs({
                                  ...inputs,
                                  [field]: e.target.value,
                                })
                              }
                              style={{ width: "100%" }}
                            />
                          ) : (
                            <span style={{ marginLeft: 10 }}>
                              {adminData[field]}
                            </span>
                          )}
                          <FaEdit
                            className="comticon"
                            style={{
                              fontSize: "1.3rem",
                              marginLeft: 10,
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              setEditFields({
                                ...editFields,
                                [field]: !editFields[field],
                              })
                            }
                          />
                        </div>
                      ))}

                      <button
                        className="mdp-btn"
                        onClick={() => setEditPassword(!editPassword)}
                        style={{
                          margin: "15px 0",
                          padding: "8px 12px",
                          color: "white",
                          borderRadius: 5,
                        }}
                      >
                        Modifier mot de passe
                      </button>

                      {editPassword && (
                        <div>
                          <label>Mot de passe actuel:</label>
                          <input
                            type="password"
                            value={passwordInputs.current}
                            onChange={(e) =>
                              setPasswordInputs({
                                ...passwordInputs,
                                current: e.target.value,
                              })
                            }
                            style={{ width: "100%", marginBottom: 5 }}
                          />
                          {errors.current && (
                            <div style={{ color: "red" }}>{errors.current}</div>
                          )}

                          <label>Nouveau mot de passe:</label>
                          <input
                            type="password"
                            value={passwordInputs.new}
                            onChange={(e) =>
                              setPasswordInputs({
                                ...passwordInputs,
                                new: e.target.value,
                              })
                            }
                            style={{ width: "100%", marginBottom: 5 }}
                          />

                          <label>Confirmer le nouveau mot de passe:</label>
                          <input
                            type="password"
                            value={passwordInputs.confirm}
                            onChange={(e) =>
                              setPasswordInputs({
                                ...passwordInputs,
                                confirm: e.target.value,
                              })
                            }
                            style={{ width: "100%" }}
                          />
                          {errors.confirm && (
                            <div style={{ color: "red" }}>{errors.confirm}</div>
                          )}
                        </div>
                      )}

                      <div
                        style={{
                          marginTop: 20,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          className="annbtn"
                          onClick={() => setShowModal(false)}
                        >
                          Annuler
                        </button>
                        <button className="confbtn" onClick={handleConfirm}>
                          Confirmer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Contenu dynamique (pages enfants) */}
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default RecruterLayout;
