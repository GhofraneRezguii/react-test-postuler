// src/components/Navbar.js
import React from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        {/* Brand logo */}
        <a className="navbar-brand" href="#">
          <img
            id="brand"
            src="https://media.licdn.com/dms/image/v2/D563DAQElHMdqtm7WuA/image-scale_191_1128/image-scale_191_1128/0/1683892525165/fininfo_solutions_cover?e=2147483647&v=beta&t=6qKoZ3Gs3KCwxHlr0gYkguibZcganBOCmUbiJwZ5QvY"
            alt="FININFO SOLUTIONS"
            width="200"
            height="40"
          />
        </a>

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
              <a className="nav-link" href="#">
                {t("navbar.accueil")}
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#">
                {t("navbar.solutions")}
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#">
                {t("navbar.societe")}
              </a>
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
                  <a className="dropdown-item" href="#">
                    {t("navbar.votre_carriere")}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {t("navbar.nos_offres")}
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {t("navbar.postuler")}
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#">
                {t("navbar.actualites")}
              </a>
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
