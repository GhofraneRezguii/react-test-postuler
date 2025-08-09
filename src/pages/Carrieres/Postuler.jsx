
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { envoyerCandidature } from "../../api/PostulerApi";
import "./Postuler.css";
import Layout from "../../Components/Layout.jsx";
import ScrollToTop from "../../Components/ScrollToTop";
import ParticlesBackground from "../../Components/ParticlesBackground.js";
import SocialMediaIcons from "../../Components/SocialMediaIcons.js"; // si utilisé
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Postuler() {

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  const navigate = useNavigate();
  const postulerRef = useRef(null);
  const offerInputRef = useRef(null);
  const offerSearchRef = useRef(null);
  const offerListRef = useRef(null);
  const selectedOffersRef = useRef(null);
  const hiddenOffersRef = useRef(null);
  const selectedValuesRef = useRef([]);

  const [cvFile, setCvFile] = useState(null);
  const [motivationFile, setMotivationFile] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  const ADMIN_EMAIL = "AdminFinInfo@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    const offerInput = offerInputRef.current;
    const offerSearch = offerSearchRef.current;
    const offerList = offerListRef.current;
    const selectedOffers = selectedOffersRef.current;
    const hiddenOffers = hiddenOffersRef.current;

    if (!offerInput || !offerSearch || !offerList) return;

    const showOfferList = () => {
      offerList.classList.remove("hidden");
      offerSearch.focus();
    };

    const hideOfferList = (e) => {
      if (
        !offerInput.contains(e.target) &&
        !offerList.contains(e.target) &&
        !offerSearch.contains(e.target)
      ) {
        offerList.classList.add("hidden");
      }
    };

    const handleOfferClick = (value) => {
      if (!selectedValuesRef.current.includes(value)) {
        selectedValuesRef.current.push(value);
        const tag = document.createElement("div");
        tag.className = "tag";
        tag.innerHTML = `${value}<span class="remove-tag">&times;</span>`;
        selectedOffers.appendChild(tag);

        tag.querySelector(".remove-tag").addEventListener("click", () => {
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

    offerInput.addEventListener("click", showOfferList);
    document.addEventListener("click", hideOfferList);

    const offerItems = offerList.querySelectorAll("li");
    offerItems.forEach((item) => {
      item.addEventListener("click", () => handleOfferClick(item.textContent.trim()));
    });

    const handleSearch = () => {
      const searchTerm = offerSearch.value.toLowerCase();
      offerItems.forEach((item) => {
        const match = item.textContent.toLowerCase().includes(searchTerm);
        item.style.display = match ? "block" : "none";
      });
    };

    offerSearch.addEventListener("input", handleSearch);

    return () => {
      document.removeEventListener("click", hideOfferList);
      offerInput.removeEventListener("click", showOfferList);
      offerSearch.removeEventListener("input", handleSearch);
      offerItems.forEach((item) => {
        item.removeEventListener("click", () => handleOfferClick(item.textContent.trim()));
      });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nom = document.getElementById("cnom").value;
    const prenom = document.getElementById("cprenom").value;
    const telephone = document.getElementById("ctel").value;
    const email = document.getElementById("condidatInputEmail1").value;
    const offres = hiddenOffersRef.current.value
      ? hiddenOffersRef.current.value.split(",").map((o) => o.trim())
      : [];
    const typeOffre =
      document.querySelector('input[name="type-offre"]:checked')?.value || "";

    // Validation fichiers
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
    formData.append("offres", offres.join(","));
    formData.append("typeOffre", typeOffre);
    formData.append("cvFile", cvFile);
    if (motivationFile) formData.append("motivationFile", motivationFile);

    try {
      const response = await envoyerCandidature(formData);
      if (response.status === 200) {
        toast.success("Candidature envoyée avec succès !");
        setCvFile(null);
        setMotivationFile(null);
        selectedValuesRef.current = [];
        if (selectedOffersRef.current) selectedOffersRef.current.innerHTML = "";
        if (hiddenOffersRef.current) hiddenOffersRef.current.value = "";
        e.target.reset();
      } else {
        toast.error("Erreur lors de l'envoi.");
      }
    } catch (error) {
      toast.error("Erreur réseau ou serveur.");
      console.error(error);
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setAdminError("");
    if (adminEmail === ADMIN_EMAIL && adminPassword === ADMIN_PASSWORD) {
      navigate("/admin-condidature");
      localStorage.setItem("adminEmail", adminEmail);
      localStorage.setItem(
        "adminImg",
        "https://i.pinimg.com/736x/3c/e9/f9/3ce9f976d43d32fbb431b1733a14c69f.jpg"
      );
    } else {
      setAdminError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <Layout>
      <ParticlesBackground />
      <ScrollToTop />
      <div className="page-wrapper">
        <div className="container-card" id="postuler-container" ref={postulerRef}>
          {/* Recruteur */}
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
                <input type="checkbox" className="form-check-input py" onClick={togglePassword} /> 

                <label className="form-check-label" style={{marginLeft:"20px",marginTop:"5px"}}> Afficher le mot de passe</label>
              </div>
              {adminError && <p style={{ color: "red" }}>{adminError}</p>}
              <button className="btn-postuler" type="submit">Accéder</button>
            </form>
          </div>

          {/* Candidat */}
          <div className="form-container condidat-container">
            <p className="header-post">Postuler chez nous</p>
            <form className="fpostuler" autoComplete="on" onSubmit={handleSubmit} encType="multipart/form-data">
              <label className="form-label">Nom<span style={{ color: "red" }}>*</span></label>
              <input type="text" className="form-control py" id="cnom" placeholder="nom" required />
              <label className="form-label">Prénom<span style={{ color: "red" }}>*</span></label>
              <input type="text" className="form-control py" id="cprenom" placeholder="prénom" required />
              <label className="form-label">Téléphone<span style={{ color: "red" }}>*</span></label>
              <input type="tel" className="form-control py" id="ctel" placeholder="+216 [***][***]" required />
              <label className="form-label">Email<span style={{ color: "red" }}>*</span></label>
              <input type="email" className="form-control py" id="condidatInputEmail1" placeholder="Exemple:user@gmail.com" required />

              <label className="form-label">Référence de l'offre <span style={{ color: "red" }}>*</span></label>
              <div ref={offerInputRef} className="custom-select-input" tabIndex="0">
                <div ref={selectedOffersRef} className="selected-tags"></div>
                <input ref={offerSearchRef} type="text" id="offerSearch" placeholder="Référence de l'offre" />
                <input ref={hiddenOffersRef} type="hidden" name="offres" id="hiddenOffers" />
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
              

              <label className="form-label">Type d'offre<span style={{ color: "red" }}>*</span></label>
              <div style={{ display: "flex", gap: "40px",marginLeft:"20px" }}>
                {["stage", "cdi", "cdd"].map((type) => (
                  <div className="form-check" key={type}>
                    <input className="form-check-input py" style={{marginRight:"15px", marginBottom:"10px",width:"10px",height:"20px"}} type="radio" name="type-offre" id={type} value={type} required />
                    <label className="form-check-label" htmlFor={type}>{type.toUpperCase()}</label>
                  </div>
                ))}
              </div>

              <label className="form-label">Lettre de motivation</label>
              <input className="form-control py" type="file" accept=".doc,.docx" onChange={(e) => setMotivationFile(e.target.files[0])} />
              <label className="form-label" style={{marginTop:"10px"}}>CV<span style={{ color: "red" }}>*</span></label>
              <input className="form-control py" type="file" accept=".doc,.docx" required onChange={(e) => setCvFile(e.target.files[0])} />
              <button type="submit" className="btn-postuler">Envoyer</button>
            </form>
          </div>

          {/* Overlay */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <i className="fa-solid fa-user-graduate fa-3x mb-2"></i>
                <h1 className="titley">Candidat</h1>
                <p className="infoy-overlay">Pour postuler à l’une de nos offres...</p>
                <button className="ghost" onClick={handleEnvoyerClick}>
                  Envoyer <i className="lni lni-arrow-left envoyer"></i>
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <i className="fa-solid fa-user-tie  fa-3x  mb-3 "></i>
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

      {/* Footer personnalisé */}
      <footer className="footer-social">
        <ul className="example-2">
          {["linkedin", "github", "instagram", "youtube", "facebook", "whatsapp"].map((network) => (
            <li className="icon-content" key={network}>
              <a href="#" aria-label={network} data-social={network}>
                <div className="filled"></div>
                <i className={`bi bi-${network}`}></i>
              </a>
              <div className="tooltip">{network.charAt(0).toUpperCase() + network.slice(1)}</div>
            </li>
          ))}
        </ul>
        <button className=" typey1" id="showy-more" onClick={handleShowMoreClick}></button>
      </footer>
    </Layout>
  );
}

export default Postuler;


