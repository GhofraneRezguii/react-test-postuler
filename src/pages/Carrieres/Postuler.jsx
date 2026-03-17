import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { envoyerCandidature } from "../../api/PostulerApi";
import "./Postuler.css";
import Layout from "../../Components/Layout.jsx";
import ScrollToTop from "../../Components/ScrollToTop";
import ParticlesBackground from "../../Components/ParticlesBackground.js";
import SocialMediaIcons from "../../Components/SocialMediaIcons.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { io } from "socket.io-client";

function Postuler() {
  const socket = io("http://localhost:5000");
  
  // États admin (inchangés)
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  // 🔥 États authentification CANDIDAT (SANS téléphone)
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [candidatToken, setCandidatToken] = useState(localStorage.getItem('candidatToken') || null);
  const [candidatData, setCandidatData] = useState(null);
  const [activeAuthTab, setActiveAuthTab] = useState("signin");

  // États formulaire (inchangés)
  const [offerListVisible, setOfferListVisible] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [cvFile, setCvFile] = useState(null);
  const [motivationFile, setMotivationFile] = useState(null);
  const [offers, setOffers] = useState([]);

  const navigate = useNavigate();
  const postulerRef = useRef(null);
  const offerInputRef = useRef(null);
  const offerSearchRef = useRef(null);
  const offerListRef = useRef(null);

  // 🔥 FONCTIONS AUTHENTIFICATION SANS TÉLÉPHONE
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/candidat/connexion', {
        email: loginEmail,
        password: loginPassword
      });

      if (response.data.success) {
        const { token, candidat } = response.data;
        
        // Sauvegarder token et infos
        localStorage.setItem('candidatToken', token);
        setCandidatToken(token);
        setCandidatData(candidat);
        setIsAuthenticated(true);
        
        setShowLoginModal(false);
        toast.success("Connexion réussie ! Redirection vers votre dashboard...");
        
        // 🔥 REDIRIGER VERS DASHBOARD
        setTimeout(() => {
          navigate('/dashboard-candidat');
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur de connexion");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/candidat/inscription', {
        nomComplet: signupName,
        email: signupEmail,
        password: signupPassword
        // 🔥 SANS téléphone
      });

      if (response.data.success) {
        toast.success("Inscription réussie ! Redirection vers la connexion...");
        setShowSignupModal(false);
        setShowLoginModal(true);
        setPasswordError("");
        // Réinitialiser formulaire
        setSignupName("");
        setSignupEmail("");
        setSignupPassword("");
        setSignupConfirmPassword("");
      }
    } catch (error) {
      setPasswordError(error.response?.data?.message || "Erreur d'inscription");
    }
  };

  // Vérifier token au chargement + redirection auto dashboard
  useEffect(() => {
    const token = localStorage.getItem('candidatToken');
    if (token) {
      setCandidatToken(token);
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // 🔥 REDIRIGER AUTO VERS DASHBOARD
      navigate('/dashboard-candidat');
    }
  }, [navigate]);

  // Fonctions offres (inchangées)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        offerInputRef.current &&
        !offerInputRef.current.contains(event.target) &&
        offerListRef.current &&
        !offerListRef.current.contains(event.target)
      ) {
        setOfferListVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showOfferList = () => {
    setOfferListVisible(true);
    if (offerSearchRef.current) offerSearchRef.current.focus();
  };

  const handleOfferClick = (offer) => {
    if (!selectedOffers.includes(offer)) {
      setSelectedOffers([...selectedOffers, offer]);
    }
    setOfferListVisible(false);
    if (offerSearchRef.current) offerSearchRef.current.value = "";
  };

  const removeSelectedOffer = (offer) => {
    setSelectedOffers(selectedOffers.filter((o) => o !== offer));
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (offerListRef.current) {
      Array.from(offerListRef.current.children).forEach((li) => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(searchTerm) ? "block" : "none";
      });
    }
  };

  useEffect(() => {
    setOffers([
      "Ingénieur développeur en finance de marché - CDIDEV121",
      "Ingénieur R&D Full-Stack - FULLSTACK-CDI",
      "Ingénieur R&D Back-End - BACK_END_CDI",
      "Tech Lead React - TECHLEAD-CDI-2020",
      "Project Management Officer - PMO_2021",
      "Business Developer Junior - BDJUNIOR106",
      "Business Developer Senior - BDCONFIRME105",
      "Consultant Technico-fonctionnel en Finance de Marché",
    ]);
  }, []);

  // Fonctions admin et navigation (inchangées)
  const togglePassword = () => {
    const passwordField = document.getElementById("recruteurInputPassword1");
    if (passwordField)
      passwordField.type = passwordField.type === "password" ? "text" : "password";
  };

  const handleEnvoyerClick = (e) => {
    e.preventDefault();
    postulerRef.current.classList.add("right-panel-active");
  };

  const handleAccederClick = () => {
    postulerRef.current.classList.remove("right-panel-active");
  };

  const handleShowMoreClick = () => {
    navigate("/carrieres/offres");
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/admin/login",
        {
          email: adminEmail,
          password: adminPassword,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/admin-condidature");
        localStorage.setItem("adminEmail", res.data.admin.email);
        localStorage.setItem(
          "adminImg",
          "https://i.pinimg.com/736x/3c/e9/f9/3ce9f976d43d32fbb431b1733a14c69f.jpg"
        );
      }
    } catch (err) {
      console.error("Erreur Axios:", err);
      setAdminError(err.response?.data?.message || "Erreur serveur");
    }
  };

  // handleSubmit MODIFIÉ avec authentification
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const nom = document.getElementById("cnom").value;
    const prenom = document.getElementById("cprenom").value;
    const telephone = document.getElementById("ctel").value;
    const email = document.getElementById("condidatInputEmail1").value;
    const typeOffre = document.querySelector('input[name="type-offre"]:checked')?.value || "";
    const ref_offre = selectedOffers.length > 0 ? selectedOffers[0] : "";
  
    if (!cvFile) {
      toast.error("Veuillez ajouter votre CV.");
      return;
    }
  
    const maxSize = 5 * 1024 * 1024;
    if (cvFile.size > maxSize) {
      toast.error("Le CV est trop volumineux (max 5 Mo).");
      return;
    }
  
    if (motivationFile && motivationFile.size > maxSize) {
      toast.error("La lettre de motivation est trop volumineuse (max 5 Mo).");
      return;
    }
  
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("telephone", telephone);
    formData.append("email", email);
    formData.append("offres", selectedOffers.join(","));
    formData.append("ref_offre", ref_offre);
    formData.append("typeOffre", typeOffre);
    formData.append("cvFile", cvFile);
    if (motivationFile) formData.append("motivationFile", motivationFile);
  
    // 🔹 Ajouter token si connecté
    if (candidatToken) {
      formData.append("token", candidatToken);
    }
  
    try {
      const response = await envoyerCandidature(formData);
  
      if (response.status === 200) {
        toast.success("Candidature envoyée avec succès !");
  
        // 🔹 Rediriger vers dashboard si déjà connecté
        if (isAuthenticated) {
          setTimeout(() => navigate("/dashboard-candidat"), 1500);
        } else {
          toast.info(
            "Vous pouvez vous inscrire ou vous connecter pour suivre vos candidatures."
          );
          // Ouvrir modal login/signup
          setShowLoginModal(true);
        }
  
        // Réinitialiser formulaire
        setCvFile(null);
        setMotivationFile(null);
        setSelectedOffers([]);
        e.target.reset();
      } else {
        toast.error("Erreur lors de l'envoi.");
      }
    } catch (error) {
      toast.error("Erreur réseau ou serveur.");
      console.error(error);
    }
  };
  return (
    <Layout>
      <ParticlesBackground />
      <ScrollToTop />
      <div className="page-wrapper">
        <div className="container-card" id="postuler-container" ref={postulerRef}>
          {/* Recruteur (INCHANGÉ) */}
          <div className="form-container recruteur-container">
            <p className="header-post">Accéder</p>
            <form className="fpostuler" autoComplete="on" onSubmit={handleAdminSubmit}>
              <label htmlFor="recruteurInputEmail1" className="form-label">
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                className="form-control py"
                placeholder="Exemple: admin@gmail.com"
                id="recruteurInputEmail1"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <label htmlFor="recruteurInputPassword1" className="form-label">
                Mot de passe<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                className="form-control py"
                placeholder="********"
                id="recruteurInputPassword1"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input py"
                  onClick={togglePassword}
                />
                <label className="form-check-label" style={{ marginLeft: "20px", marginTop: "5px" }}>
                  Afficher le mot de passe
                </label>
              </div>
              {adminError && <p style={{ color: "red" }}>{adminError}</p>}
              <button className="btn-postuler" type="submit">
                Accéder
              </button>
            </form>
          </div>

          {/* Candidat (MODIFIÉ - bouton Dashboard) */}
          <div className="form-container condidat-container">
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "0px",
                justifyContent: "center",
                padding: "10px 20px",
                marginLeft: "20px",
                marginTop: "0px",
                alignItems: "center",
              }}
            >
              <button
                className={`auth-tab ${activeAuthTab === "signin" ? "active" : ""}`}
                onClick={() => setShowLoginModal(true)}
                style={{
                  borderRadius: "15px",
                  border: "1px solid #164ca7",
                  backgroundColor: "#072348",
                  color: "#e1e3e7",
                  fontSize: "14px",
                  fontWeight: "700",
                  padding: "8px 30px",
                  minWidth: "120px",
                  letterSpacing: "0.8px",
                  textTransform: "capitalize",
                  transition: "0.3s ease-in-out",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  maxWidth: "160px",
                }}
              >
                {isAuthenticated ? "Dashboard" : "Se connecter"}
              </button>

              <button
                className={`auth-tab ${activeAuthTab === "signup" ? "active" : ""}`}
                onClick={() => setShowSignupModal(true)}
                style={{
                  borderRadius: "15px",
                  border: "1px solid #164ca7",
                  backgroundColor: activeAuthTab === "signup" ? "#072348" : "#B0E1FA",
                  color: activeAuthTab === "signup" ? "#e1e3e7" : "#072348",
                  fontSize: "14px",
                  fontWeight: "700",
                  padding: "8px 30px",
                  minWidth: "120px",
                  letterSpacing: "0.8px",
                  textTransform: "capitalize",
                  transition: "0.3s ease-in-out",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  maxWidth: "160px",
                }}
              >
                S'inscrire
              </button>
            </div>

            <p className="header-post">Postuler chez nous</p>
            <form className="fpostuler" autoComplete="on" onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Formulaire INCHANGÉ */}
              <label className="form-label">Nom<span style={{ color: "red" }}>*</span></label>
              <input type="text" className="form-control py" id="cnom" placeholder="nom" required />
              
              <label className="form-label">Prénom<span style={{ color: "red" }}>*</span></label>
              <input type="text" className="form-control py" id="cprenom" placeholder="prénom" required />
              
              <label className="form-label">Téléphone<span style={{ color: "red" }}>*</span></label>
              <input type="tel" className="form-control py" id="ctel" placeholder="+216 [***][***]" required />
              
              <label className="form-label">Email<span style={{ color: "red" }}>*</span></label>
              <input type="email" className="form-control py" id="condidatInputEmail1" placeholder="Exemple:user@gmail.com" required />

              <label className="form-label">Référence de l'offre <span style={{ color: "red" }}>*</span></label>
              <div ref={offerInputRef} className="custom-select-input" tabIndex="0" onClick={showOfferList} style={{ maxWidth: "400px" }}>
                <div className="selected-tags" style={{ marginBottom: "5px" }}>
                  {selectedOffers.map((offer) => (
                    <div key={offer} className="tag">
                      {offer}{" "}
                      <span style={{ cursor: "pointer", color: "red" }} onClick={() => removeSelectedOffer(offer)}>
                        ×
                      </span>
                    </div>
                  ))}
                </div>
                <input
                  ref={offerSearchRef}
                  type="text"
                  placeholder="Référence de l'offre"
                  onChange={handleSearch}
                  style={{ width: "100%", boxSizing: "border-box" }}
                />
              </div>
              <ul ref={offerListRef} className="offer-list" style={{ display: offerListVisible ? "block" : "none" }}>
                {offers.map((offer, index) => (
                  <li key={index} onClick={() => handleOfferClick(offer)}>
                    {offer}
                  </li>
                ))}
              </ul>

              <label className="form-label">Type d'offre<span style={{ color: "red" }}>*</span></label>
              <div style={{ display: "flex", gap: "40px", marginLeft: "20px" }}>
                {["stage", "cdi", "cdd"].map((type) => (
                  <div className="form-check" key={type}>
                    <input
                      className="form-check-input py"
                      style={{ marginRight: "15px", marginBottom: "10px", width: "10px", height: "20px" }}
                      type="radio"
                      name="type-offre"
                      id={type}
                      value={type}
                      required
                    />
                    <label className="form-check-label" htmlFor={type}>
                      {type.toUpperCase()}
                    </label>
                  </div>
                ))}
              </div>

              <label className="form-label">Lettre de motivation</label>
              <input
                className="form-control py"
                type="file"
                accept=".doc,.docx"
                onChange={(e) => setMotivationFile(e.target.files[0])}
              />
              <label className="form-label" style={{ marginTop: "10px" }}>
                CV<span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control py"
                type="file"
                accept=".doc,.docx"
                required
                onChange={(e) => setCvFile(e.target.files[0])}
              />
              <button type="submit" className="btn-postuler">
                Envoyer
              </button>
            </form>
          </div>

          {/* Overlay (INCHANGÉ) */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <i className="fa-solid fa-user-graduate fa-3x mb-2"></i>
                <h1 className="titley">Candidat</h1>
                <p className="infoy-overlay">Pour postuler à l'une de nos offres...</p>
                <button className="ghost" onClick={handleEnvoyerClick}>
                  Envoyer <i className="lni lni-arrow-left envoyer"></i>
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <i className="fa-solid fa-user-tie fa-3x mb-3"></i>
                <h1 className="titley">Admin</h1>
                <p className="infoy-overlay">Pour accéder à votre espace de gestion des offres...</p>
                <button className="ghost" onClick={handleAccederClick}>
                  Accéder <i className="lni lni-arrow-right acceder"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={4000} />

      {/* Footer (INCHANGÉ) */}
      <footer className="footer-social">
        <ul className="example-2">
          {["linkedin", "github", "instagram", "youtube", "facebook", "whatsapp"].map((network) => (
            <li className="icon-content" key={network}>
              <a href="#" aria-label={network} data-social={network}>
                <div className="filled"></div>
                <i className={`bi bi-${network}`}></i>
              </a>
              <div className="tooltip">
                {network.charAt(0).toUpperCase() + network.slice(1)}
              </div>
            </li>
          ))}
        </ul>
        <button className="typey1" id="showy-more" onClick={handleShowMoreClick}></button>
      </footer>

      {/* 🔥 MODALS SANS TÉLÉPHONE */}
      {showLoginModal && (
        <div className="auth-modal-overlay">
          <div className="auth-modal">
            <span className="close-modal" onClick={() => setShowLoginModal(false)}>×</span>
            <h2 className="auth-title">Connectez-vous et transformez votre ambition en opportunité ✨</h2>
            <p className="auth-subtitle">
              Chaque grande carrière commence par une simple connexion. Accédez à votre espace et poursuivez votre réussite.
            </p>
            <form className="fpostuler" onSubmit={handleLoginSubmit}>
              <label>Email</label>
              <input
                type="email"
                className="form-control py"
                placeholder="Exemple : user@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <label>Mot de passe</label>
              <input
                type="password"
                className="form-control py"
                placeholder="********"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn-postuler">
                Se connecter
              </button>
              <p className="signup-text">
                Vous n'avez pas encore de compte ?{" "}
                <span className="signup-link" onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}>
                  S'inscrire
                </span>
              </p>
            </form>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className="auth-modal-overlay">
          <div className="auth-modal">
            <span className="close-modal" onClick={() => setShowSignupModal(false)}>×</span>
            <h2 className="auth-title">Créez votre compte et démarrez votre parcours</h2>
            <p className="auth-subtitle">Rejoignez-nous dès aujourd'hui et accédez à de nouvelles opportunités.</p>
            <form className="fpostuler" onSubmit={handleSignupSubmit}>
              <label>Nom complet</label>
              <input
                type="text"
                className="form-control py"
                placeholder="Votre nom complet"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
              />
              <label>Email</label>
              <input
                type="email"
                className="form-control py"
                placeholder="Exemple : user@gmail.com"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <label>Mot de passe</label>
              <input
                type="password"
                className="form-control py"
                placeholder="********"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <label>Confirmer le mot de passe</label>
              <input
                type="password"
                className="form-control py"
                placeholder="********"
                value={signupConfirmPassword}
                onChange={(e) => {
                  setSignupConfirmPassword(e.target.value);
                  setPasswordError("");
                }}
                required
              />
              {passwordError && (
                <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                  {passwordError}
                </p>
              )}
              <button type="submit" className="btn-postuler">
                S'inscrire
              </button>
              <p className="signup-text">
                Vous avez déjà un compte ?{" "}
                <span className="signup-link" onClick={() => {
                  setShowSignupModal(false);
                  setShowLoginModal(true);
                }}>
                  Se connecter
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Postuler;
