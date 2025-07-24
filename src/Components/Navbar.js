// src/components/Navbar.js
import React from "react";
import "./Navbar.css";
import ThemeToggle from './ThemeToggle.jsx';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; 
import ScrollLineEffect from "./ScrollLineEffect.jsx"; 

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      
      <div className="container">
      
        {/* Brand logo */}
        <Link className="navbar-brand" to="/">
          <img
            id="brand"
            src="https://media.licdn.com/dms/image/v2/D563DAQElHMdqtm7WuA/image-scale_191_1128/image-scale_191_1128/0/1683892525165/fininfo_solutions_cover?e=2147483647&v=beta&t=6qKoZ3Gs3KCwxHlr0gYkguibZcganBOCmUbiJwZ5QvY"
            alt="FININFO SOLUTIONS"
            width="200"
            height="40"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar items */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/">
                {t("navbar.accueil")}
              </Link>
            </li>

            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="carriereDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("navbar.solutions")}
              </a>
              <ul className="dropdown-menu" aria-labelledby="carriereDropdown">
                <li>
                  <Link className="dropdown-item" to="/solutions/middleware">
                    Fininfo Middleware
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <a
                    className="dropdown-item dropdown-toggle"
                    href="#"
                    id="suitesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Suites Fininfo
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="suitesDropdown">
                    <li>
                      <Link className="dropdown-item" to="/solutions/suitesfininfo/custody">
                        Custody
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/solutions/suitesfininfo/services">
                        Services aux émetteurs
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/solutions/suitesfininfo/adminfonds">
                        Administration de fonds
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Marché à terme
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Fonds alternatifs
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Intelligence Artificielle
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="societeDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("navbar.societe")}
              </a>
              <ul className="dropdown-menu" aria-labelledby="societeDropdown">
                <li>
                  <Link className="dropdown-item" to="#">
                    Qui sommes-nous
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Plan d'accès
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Nous contacter
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("navbar.carrieres")}
              </a>
              <ul className="dropdown-menu mx-3">
                <li>
                  <Link className="dropdown-item" to="/carrieres/nous">
                    {t("navbar.votre_carriere")}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/carrieres/offres">
                    {t("navbar.offres")}
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/carrieres/Postuler">
                    {t("navbar.postuler")}
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item mx-3">
              <Link className="nav-link" to="#">
                {t("navbar.actualites")}
              </Link>
            </li>

            {/* Langue */}
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={`https://cdn.countryflags.com/thumbs/${
                    i18n.language === "fr" ? "france" : "united-kingdom"
                  }/flag-400.png`}
                  alt={i18n.language === "fr" ? "Français" : "English"}
                  style={{ width: "20px", height: "auto", marginRight: "8px" }}
                />
                {i18n.language === "fr" ? "Français" : "English"}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => changeLanguage("fr")}
                  >
                    🇫🇷 Français
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => changeLanguage("en")}
                  >
                    🇬🇧 English
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <ThemeToggle />
          {/* Contact button */}
          <button className="btn-shine mx-3">
            <span>{t("navbar.contact")}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
