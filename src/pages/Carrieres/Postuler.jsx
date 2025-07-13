import React, { useEffect, useRef } from "react";
import "./Postuler.css";
import Layout from "../../Components/Layout.jsx";
import ScrollToTop from "../../Components/ScrollToTop";
import ParticlesBackground from "../../Components/ParticlesBackground.js";

function Postuler() {
  const postulerRef = useRef(null);
  const offerInputRef = useRef(null);
  const offerSearchRef = useRef(null);
  const offerListRef = useRef(null);
  const selectedOffersRef = useRef(null);
  const hiddenOffersRef = useRef(null);
  const selectedValuesRef = useRef([]);

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
    // postulerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleAccederClick = () => {
    postulerRef.current.classList.remove("right-panel-active");
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
          <form className="fpostuler" autoComplete="on">
            <label htmlFor="recruteurEmail1" className="form-label">
              Email<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="recruteurInputEmail1"
              placeholder="User@gmail.com"
              required
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
            <button className="btn-postuler">Accéder</button>
          </form>
        </div>

        {/* Candidat */}
        <div className="form-container condidat-container">
          <p className="header-post">Postuler chez nous</p>
          <form className="fpostuler" autoComplete="on">
            <label className="form-label">Nom*</label>
            <input type="text" className="form-control" id="cnom" required />
            <br />
            <label className="form-label">Prénom*</label>
            <input type="text" className="form-control" id="cprenom" required />
            <br />
            <label className="form-label">Téléphone*</label>
            <input type="tel" className="form-control" id="ctel" required />
            <br />
            <label className="form-label">Email*</label>
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
            <div
              ref={offerInputRef}
              className="custom-select-input"
              tabIndex="0"
            >
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
            <label className="form-label">Type d'offre*</label>
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
              <input className="form-control" type="file" accept=".doc,.docx" />
            </div>
            <div className="mb-3">
              <label className="form-label">Votre CV*</label>
              <input
                className="form-control"
                type="file"
                accept=".doc,.docx"
                required
              />
            </div>
            <button className="btn-postuler">Envoyer</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <i className="fa-solid fa-user-graduate fa-3x mb-3"></i>
              <h1 className="title">Condidat</h1>
              <p className="info-overlay">
                Pour postuler à l’une de nos offres...
              </p>
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
    </Layout>
  );
}

export default Postuler;


