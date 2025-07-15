import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assure-toi que react-router-dom est installé et configuré
import "./Postuler.css";
import Layout from "../../Components/Layout.jsx";
import ScrollToTop from "../../Components/ScrollToTop";
import ParticlesBackground from "../../Components/ParticlesBackground.js";
import SocialMediaIcons from "../../Components/SocialMediaIcons.js";

function Postuler() {
  const navigate = useNavigate();
 
 

  const postulerRef = useRef(null);
  const offerInputRef = useRef(null);
  const offerSearchRef = useRef(null);
  const offerListRef = useRef(null);
  const selectedOffersRef = useRef(null);
  const hiddenOffersRef = useRef(null);
  const selectedValuesRef = useRef([]);

  // États pour fichiers candidats
  const [cvFile, setCvFile] = useState(null);
  const [motivationFile, setMotivationFile] = useState(null);

  // États pour admin (email + mdp + erreur)
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  // Valeurs admin initialisées
  const ADMIN_EMAIL = "AdminFinInfo@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  // ... ton useEffect existant pour l'offre, inchangé ...

  useEffect(() => {
    const offerInput = offerInputRef.current;
    const offerSearch = offerSearchRef.current;
    const offerList = offerListRef.current;
    const selectedOffers = selectedOffersRef.current;
    const hiddenOffers = hiddenOffersRef.current;

    if (!offerInput || !offerSearch || !offerList) return;

    const handleInputClick = () => {
      offerList.classList.remove("hidden");
      offerSearch.focus();
    };

    const handleClickOutside = (e) => {
      if (!offerInput.contains(e.target)) {
        offerList.classList.add("hidden");
      }
    };

    const handleOfferClick = (item) => {
      const value = item.textContent.trim();
      if (!selectedValuesRef.current.includes(value)) {
        selectedValuesRef.current.push(value);
        const tag = document.createElement("div");
        tag.className = "tag";
        tag.innerHTML = `${value}<span>&times;</span>`;
        selectedOffers.appendChild(tag);

        tag.querySelector("span").addEventListener("click", () => {
          selectedValuesRef.current = selectedValuesRef.current.filter(
            (v) => v !== value
          );
          selectedOffers.removeChild(tag);
          hiddenOffers.value = selectedValuesRef.current.join(", ");
        });

        hiddenOffers.value = selectedValuesRef.current.join(", ");
      }

      offerSearch.value = "";
      offerList.classList.add("hidden");
    };

    offerInput.addEventListener("click", handleInputClick);
    document.addEventListener("click", handleClickOutside);

    offerList.querySelectorAll("li").forEach((item) =>
      item.addEventListener("click", () => handleOfferClick(item))
    );

    offerSearch.addEventListener("input", () => {
      const searchTerm = offerSearch.value.toLowerCase();
      offerList.querySelectorAll("li").forEach((item) => {
        item.style.display = item.textContent
          .toLowerCase()
          .includes(searchTerm)
          ? ""
          : "none";
      });
    });

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const togglePassword = () => {
    const passwordField = document.getElementById("recruteurInputPassword1");
    if (passwordField)
      passwordField.type =
        passwordField.type === "password" ? "text" : "password";
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
  

  // Soumission formulaire candidat avec fichiers
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nom = document.getElementById("cnom").value;
    const prenom = document.getElementById("cprenom").value;
    const telephone = document.getElementById("ctel").value;
    const email = document.getElementById("condidatInputEmail1").value;
    const offres = hiddenOffersRef.current.value
      ? hiddenOffersRef.current.value.split(",").map((o) => o.trim())
      : [];
    const typeOffre = document.querySelector('input[name="type-offre"]:checked')
      ?.value || "";

    if (!cvFile) {
      alert("Veuillez ajouter votre CV.");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5 Mo max

    if (cvFile.size > maxSize) {
      alert("Le CV est trop volumineux (max 5 Mo).");
      return;
    }

    if (motivationFile && motivationFile.size > maxSize) {
      alert("La lettre de motivation est trop volumineuse (max 5 Mo).");
      return;
    }

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("telephone", telephone);
    formData.append("email", email);
    formData.append("offres", offres.join(","));
    formData.append("typeOffre", typeOffre);
    formData.append("cvFile", cvFile);
    if (motivationFile) formData.append("motivationFile", motivationFile);

    try {
      const response = await fetch("http://localhost:5000/api/postuler", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Candidature envoyée avec succès !");
        setCvFile(null);
        setMotivationFile(null);
        selectedValuesRef.current = [];
        if (selectedOffersRef.current) selectedOffersRef.current.innerHTML = "";
        if (hiddenOffersRef.current) hiddenOffersRef.current.value = "";
        e.target.reset();
      } else {
        alert("Erreur lors de l'envoi.");
      }
    } catch (error) {
      alert("Erreur réseau ou serveur.");
    }
  };

  // *** Gestion simple du formulaire Admin ***
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setAdminError(""); // reset

    if (adminEmail === ADMIN_EMAIL && adminPassword === ADMIN_PASSWORD) {
      // Redirige vers dashboard admin (à créer)
      navigate("/admin-condidature");
      localStorage.setItem("adminEmail", adminEmail);
      localStorage.setItem("adminImg", "https://i.pinimg.com/736x/3c/e9/f9/3ce9f976d43d32fbb431b1733a14c69f.jpg");
    } else {
      setAdminError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <Layout>
      <ParticlesBackground />
      <ScrollToTop />
      <div className="page-wrapper">
        <div
          className="container-card"
          id="postuler-container"
          ref={postulerRef}
        >
          {/* Formulaire Admin */}
          <div className="form-container recruteur-container">
            <p className="header-post">Accéder</p>
            <form
              className="fpostuler"
              autoComplete="on"
              onSubmit={handleAdminSubmit}
            >
              <label htmlFor="recruteurInputEmail1" className="form-label">
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="recruteurInputEmail1"
                placeholder="admin@example.com"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <br />
              <label htmlFor="recruteurInputPassword1" className="form-label">
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="recruteurInputPassword1"
                placeholder="********"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <div className="mb-3 form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onClick={togglePassword}
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Afficher le mot de passe
                </label>
              </div>
              {adminError && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {adminError}
                </p>
              )}
              <button className="btn-postuler" type="submit">
                Accéder
              </button>
            </form>
          </div>

          {/* Formulaire Candidat */}
          <div className="form-container condidat-container">
            <p className="header-post">Postuler chez nous</p>
            <form
              className="fpostuler"
              autoComplete="on"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {/* ... champs candidats ... */}
              <label className="form-label">
                Nom<span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" className="form-control" id="cnom" required />
              <br />
              <label className="form-label">
                Prénom<span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" className="form-control" id="cprenom" required />
              <br />
              <label className="form-label">
                Téléphone<span style={{ color: "red" }}>*</span>
              </label>
              <input type="tel" className="form-control" id="ctel" required />
              <br />
              <label className="form-label">
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="condidatInputEmail1"
                required
              />
              <br />
              <label className="form-label">
                Référence de l'offre <span style={{ color: "red" }}>*</span>
              </label>
              <div ref={offerInputRef} className="custom-select-input" tabIndex="0">
                <div ref={selectedOffersRef} className="selected-tags"></div>
                <input
                  ref={offerSearchRef}
                  type="text"
                  id="offerSearch"
                  placeholder="Référence de l'offre"
                  required
                />
                <input
                  ref={hiddenOffersRef}
                  type="hidden"
                  name="offres"
                  id="hiddenOffers"
                />
              </div>
              <ul ref={offerListRef} className="offer-list hidden">
                <li>Ingénieur développeur en finance de marché - CDIDEV121</li>
                <li>Ingénieur R&D Full-Stack - FULLSTACK-CDI</li>
                <li>Ingénieur R&D Back-End - BACK_END_CDI</li>
                <li>Tech Lead React - TECHLEAD-CDI-2020</li>
                <li>Project Management Officer - PMO_2021</li>
                <li>Business Developer Junior - BDJUNIOR106</li>
                <li>Business Developer Senior - BDCONFIRME105</li>
                <li>Consultant Technico-fonctionnel en Finance de Marché</li>
              </ul>

              {/* Type offre */}
              <label className="form-label">
                Type d'offre<span style={{ color: "red" }}>*</span>
              </label>
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                {["stage", "cdi", "cdd"].map((type) => (
                  <div className="form-check" key={type}>
                    <input
                      className="form-check-input"
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
              <br />
              <div className="mb-3">
                <label className="form-label">Lettre de motivation</label>
                <input
                  className="form-control"
                  type="file"
                  accept=".doc,.docx"
                  onChange={(e) => setMotivationFile(e.target.files[0])}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Votre CV<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  accept=".doc,.docx"
                  required
                  onChange={(e) => setCvFile(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn-postuler">
                Envoyer
              </button>
            </form>
          </div>

          {/* Overlay */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <i className="fa-solid fa-user-graduate fa-3x mb-3"></i>
                <h1 className="title">Condidat</h1>
                <p className="info-overlay">Pour postuler à l’une de nos offres...</p>
                <button className="ghost" onClick={handleEnvoyerClick}>
                  Envoyer <i className="lni lni-arrow-left envoyer"></i>
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <i className="fa-solid fa-user-tie fa-3x mb-3"></i>
                <h1 className="title">Admin</h1>
                <p className="info-overlay">
                  Pour accéder à votre espace de gestion des offres...
                </p>
                <button className="ghost" onClick={handleAccederClick}>
                  Accéder <i className="lni lni-arrow-right acceder"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer-social">
  <ul className="example-2">
    <li className="icon-content">
      <a href="https://linkedin.com/" aria-label="LinkedIn" data-social="linkedin">
        <div className="filled"></div>
        <i className="bi bi-linkedin"></i>
      </a>
      <div className="tooltip">LinkedIn</div>
    </li>
    <li className="icon-content">
      <a href="https://github.com/" aria-label="GitHub" data-social="github">
        <div className="filled"></div>
        <i className="bi bi-github"></i>
      </a>
      <div className="tooltip">GitHub</div>
    </li>
    <li className="icon-content">
      <a href="https://www.instagram.com/" aria-label="Instagram" data-social="instagram">
        <div className="filled"></div>
        <i className="bi bi-instagram"></i>
      </a>
      <div className="tooltip">Instagram</div>
    </li>
    <li className="icon-content">
      <a href="https://youtube.com/" aria-label="YouTube" data-social="youtube">
        <div className="filled"></div>
        <i className="bi bi-youtube"></i>
      </a>
      <div className="tooltip">YouTube</div>
    </li>
    <li className="icon-content">
      <a href="https://facebook.com/" aria-label="Facebook" data-social="facebook">
        <div className="filled"></div>
        <i className="bi bi-facebook"></i>
      </a>
      <div className="tooltip">Facebook</div>
    </li>
    <li className="icon-content">
      <a href="https://wa.me/" aria-label="WhatsApp" data-social="whatsapp">
        <div className="filled"></div>
        <i className="bi bi-whatsapp"></i>
      </a>
      <div className="tooltip">WhatsApp</div>
    </li>
  </ul>
  <button
  className="button type1"
  id="show-more"
  aria-label="afficher nos offres"
  onClick={handleShowMoreClick}
></button>

</footer>
    </Layout>
  );
}

export default Postuler;
