import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Postuler from "./Carrieres/Postuler";
import acceuiL from "./acceuiL.css";
import useScrollAnimation from "./useScrollAnimation";
import SocialMediaIcons from "../Components/SocialMediaIcons";
import { ImStatsDots } from "react-icons/im";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import {
  FaChartLine,
  FaCode,
  FaLaptopCode,
  FaLaptop,
  FaRegHandshake,
  FaCommentsDollar,
} from "react-icons/fa";
import VideoCard from "./VideoCard";

function Accueil() {
  const titleRef = useScrollAnimation();
  const newsRef = useScrollAnimation();
  const solutionRef = useScrollAnimation();

  const cardData = [
    { icon: <ImStatsDots />, title: "Expertise banque finance" },
    { icon: <FaCode />, title: "Développement sur mesure" },
    { icon: <FaLaptop />, title: "Transformation digitale" },
    {
      icon: <LiaFileInvoiceDollarSolid />,
      title: "Intégration des logiciels en finance",
    },
    { icon: <FaLaptopCode />, title: "R & D LAB" },
    { icon: <FaCommentsDollar />, title: "Accompagnement & conseil" },
  ];

  return (
    <>
     <div class="svg-separatoro">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 700 10"
          preserveAspectRatio="none"
        >
          <path d="M350,10 L340,0 H360 L350,10 Z" class="svg-fill"></path>
        </svg>
      </div>
      <div className="acceuil-wrapper">
        <div ref={titleRef} className="titley-container fade-in-left">
          <h1 className="acceuil-title">
            Votre partenaire pour la transformation numérique
          </h1>
          <h4 className="acceuil-subt">
            FININFO SOLUTIONS est une entreprise innovante spécialisée dans
            <br></br> l'édition logicielle et l'implémentation des solutions sur
            mesure pour les acteurs des marchés financiers
          </h4>
        </div>
      </div>
      

      {/* news section */}
      <div ref={newsRef} className="news-ticker-wrap fade-in-left">
        <div className="news-ticker-label">
          <span className="news-ticker-icon">
            <i className="fa fa-bolt" aria-hidden="true"></i>
          </span>
          Articles de presse
        </div>

        <div className="news-ticker-track">
          <div className="ticker-content">
            <div className="ticker-items">
              <a
                className="news-item"
                href="https://fininfosolutions.com/article_de_presse/elementor-52297/"
              >
                FARES GAIED, CEO FININFO SOLUTIONS : « DEVENIR UN ACTEUR DE
                RÉFÉRENCE SUR L’ESPACE DU POST MARCHÉ AU MAROC »
              </a>
              <span className="sep_icon">
                <i className="fa fa-circle"></i>
              </span>
              <a
                className="news-item"
                href="https://fininfosolutions.com/article_de_presse/la-fintech-fininfo-solutions-presente-ses-dernieres-avancees-a-ses-clients-marocains/"
              >
                LA FINTECH FININFO SOLUTIONS PRÉSENTE SES DERNIÈRES AVANCÉES À
                SES CLIENTS MAROCAINS
              </a>
            </div>
            <div className="ticker-items">
              <a
                className="news-item"
                href="https://fininfosolutions.com/article_de_presse/elementor-52297/"
              >
                FARES GAIED, CEO FININFO SOLUTIONS : « DEVENIR UN ACTEUR DE
                RÉFÉRENCE SUR L’ESPACE DU POST MARCHÉ AU MAROC »
              </a>
              <span className="sep_icon">
                <i className="fa fa-circle"></i>
              </span>
              <a
                className="news-item"
                href="https://fininfosolutions.com/article_de_presse/la-fintech-fininfo-solutions-presente-ses-dernieres-avancees-a-ses-clients-marocains/"
              >
                LA FINTECH FININFO SOLUTIONS PRÉSENTE SES DERNIÈRES AVANCÉES À
                SES CLIENTS MAROCAINS
              </a>
            </div>
          </div>
        </div>
      </div>
      <VideoCard />
      <div ref={solutionRef} className="solution-wrapper fade-in-left">
        <div className="card-solution">
          {cardData.map((item, index) => (
            <div key={index} className="cardS">
              <div className="iconS-wrapper">{item.icon}</div>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="Suites-fin">
        <h4>Nos Solutions</h4>
        <h2>SUITES FININFO</h2>
        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>
      {/* separateur V */}
      <div class="svg-separator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 700 10"
          preserveAspectRatio="none"
        >
          <path d="M350,10 L340,0 H360 L350,10 Z" class="svg-fill"></path>
        </svg>
      </div>
      {/* <!-- Section avec image de fond et cards --> */}
      <div class="background-section">
        <div class="cards-grid">
          {/* <!-- Card 1 --> */}
          <div class="parentt">
            <div class="cardl">
              <div class="content-boxl">
                <span class="card-titlel">CUSTODY</span>
                <p class="card-contentl">
                  Maîtrisez L'Art De La Gestion Des IRLs Avec Custody : La
                  Solution Incontournable De Fininfo Solutions.
                </p>
                <Link to="/nom-de-ta-page" className="see-more">
                  Voir plus
                </Link>
              </div>
              <div class="i-box">
                <img
                  style={{ width: "50px", height: "50px" }}
                  src="https://fininfosolutions.com/wp-content/uploads/2024/03/custody.png"
                  alt="icon"
                />
              </div>
            </div>
          </div>
          {/* <!-- Répète pour 4 autres cards --> */}
          <div class="parentt">
            <div class="cardl">
              <div class="content-boxl">
                <span class="card-titlel">
                  services aux<br></br> émetteurs
                </span>
                <p class="card-contentl">
                  Simplifiez Et Optimisez La Gestion Émettrice
                </p>
                <Link to="/nom-de-ta-page" className="see-more">
                  Voir plus
                </Link>
              </div>
              <div class="i-box">
                <img
                  style={{ width: "50px", height: "50px" }}
                  src="https://fininfosolutions.com/wp-content/uploads/2024/03/Image4.png"
                  alt="icon"
                />
              </div>
            </div>
          </div>

          <div class="parentt">
            <div class="cardl">
              <div class="content-boxl">
                <span class="card-titlel">
                  administration <br></br>des fonds
                </span>
                <p class="card-contentl">
                  La Clé D'une Gestion Financière Optimisée
                </p>
                <Link to="/nom-de-ta-page" className="see-more">
                  Voir plus
                </Link>
              </div>
              <div class="i-box">
                <img
                  style={{ width: "50px", height: "50px", paddingLeft: "10px" }}
                  src="https://fininfosolutions.com/wp-content/uploads/2024/03/Image44.png"
                  alt="icon"
                />
              </div>
            </div>
          </div>
          {/* 2 dérniers cards */}
          <div class="last-row">
            <div class="parentt">
              <div class="cardl">
                <div class="content-boxl">
                  <span class="card-titlel">Marché à terme</span>
                  <p class="card-contentl">
                    Gestion Intégrée du Marché à Terme
                  </p>
                  <Link to="/nom-de-ta-page" className="see-more">
                    Voir plus
                  </Link>
                </div>
                <div class="i-box">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src="https://fininfosolutions.com/wp-content/uploads/2025/03/tenue-de-registre.png"
                    alt="icon"
                  />
                </div>
              </div>
            </div>

            <div class="parentt">
              <div class="cardl">
                <div class="content-boxl">
                  <span class="card-titlel">fonds alternatifs</span>
                  <p class="card-contentl">
                    Optimisez la gestion des fonds alternatifs pour un suivi
                  </p>
                  <Link to="/nom-de-ta-page" className="see-more">
                    Voir plus
                  </Link>
                </div>
                <div class="i-box">
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      paddingLeft: "5px",
                    }}
                    src="https://fininfosolutions.com/wp-content/uploads/2024/03/11164145.png"
                    alt="icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* seperateur top */}
      <div class="svg-separator-top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 700 10"
          preserveAspectRatio="none"
        >
          <path d="M350,10 L340,0 H360 L350,10 Z" class="svg-filly"></path>
        </svg>
      </div>

      <div className="Suites-fin">
        <h4>L'orientation client</h4>
        <h2>Est au cœur de tout ce que nous faisons...</h2>
        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
        <h4 style={{ marginTop: "20px" }}>
          .. et l'engagement d'évoluer constamment est dans notre ADN
        </h4>
      </div>

      {/* cards  */}
      <div className="cardt-row">
        <div className="cardt-item">
          <div className="icon-circle">
            <FaChartLine />
          </div>
          <p>Devenez plus compétitif grâce à une meilleure compréhension</p>
        </div>

        <div className="cardt-item">
          <div className="icon-circle">
            <FaLaptopCode />
          </div>
          <p>
            Appuyiez-vous sur une ingénierie éprouvée et robuste à grande
            échelle{" "}
          </p>
        </div>

        <div className="cardt-item">
          <div className="icon-circle">
            <FaRegHandshake />
          </div>
          <p>
            Comptez sur notre engagement total envers les résultats de nos
            clients et partenaires
          </p>
        </div>
      </div>

      {/* collab section */}
      <div className="container-cardso">
        <div className="card-lefto">
          <h2 className="card-titleo">
            Le collaborateur au coeur de l'entreprise
          </h2>
          <br></br>
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
          <p className="card-texto">
            C’est l’une des hypothèses auxquelles nous croyons le plus et dans
            laquelle nous sommes heureux d’investir beaucoup, car FININFO
            SOLUTIONS c’est avant tout son Equipe. Nous avons créé{" "}
            <strong> un environnement stimulant et collaboratif </strong> , dans
            lequel chaque membre de l’équipe est libre de promouvoir ses idées
            et d’apporter sa vision personnelle et innovante du travail, dans un
            atmosphère d’inclusion totale. Nous pensons que{" "}
            <strong> l’ implication active de l’équipe </strong> est le critère
            principal pour le développement de chaque solution applicative :{" "}
            <strong>
              {" "}
              chaque collaborateur apporte de la richesse à l’entreprise.
            </strong>
          </p>
        </div>

        <div className="card-righto">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE4NPxuWGACv7seVnIS86tN2Oxb19qU5BwDA&s"
            alt="Image illustrative"
            className="card-image"
          />
        </div>
      </div>
      <Link to="/carrieres/Postuler" className="link-no-underline">
        <button className="rej">
          Nous rejoindre &nbsp;
          <span style={{ fontSize: "40px", color: "white" }}>⟶</span>
        </button>
      </Link>

      <div className="heart-text-container">
        <div className="heart-icon zoom-heart">
          <i className="fas fa-heart"></i>
        </div>
        <p className="heart-text">Notre vraie richesse , c'est notre team.</p>
      </div>

      {/* activité recente */}
      <div className="Suites-fin">
        <h2>Activités récentes</h2>
        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>

      {/* cards */}
      <div className="cardst-container">
        {/* Card 1 */}
        <div className="custom-card">
          <div className="card-top">
            <img
              src="https://fininfosolutions.com/wp-content/uploads/2024/11/FININFO-ECOVADIS-BADGE.png"
              alt="Image 1"
            />
          </div>
          <div className="card-bottom">
            <h3 className="card-title">
              FININFO récompensée par la Médaille de BRONZE EcoVadis 2024 ! 🥉
            </h3>
            <Link to="/page1" className="cardu-link">
              <span>En savoir plus</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="custom-card">
          <div className="card-top">
            <img
              src="https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2921.jpg"
              alt="Image 2"
            />
          </div>
          <div className="card-bottom">
            <h3 className="card-title">
              « User Club » de Fininfo Solutions réunit les leaders financiers à
              Casablanca.
            </h3>
            <Link to="/page1" className="cardu-link">
              <span>En savoir plus</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <Link to="/carrieres/Postuler" className="link-no-underline">
        <button className="reji">
          Voir tout nos actualités &nbsp;
          <span style={{ fontSize: "40px", color: "white" }}>⟶</span>
        </button>
      </Link>



      <div className="Suites-fin">
        <h2>Evènements</h2>
        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>

      <div class="three-cards">
  <div class="cardp">
    <img src="https://fininfosolutions.com/wp-content/uploads/2024/05/gitex-2.png" alt="Image 1" />
    <h3>GITEX AFRICA | Maroc-Marrakech</h3>
    <p>29 -31 Mai 2024</p>
    <Link to="/page1" className="cardu-link">
              <span>En savoir plus</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </Link>
  </div>

  <div class="cardp">
    <img src="https://fininfosolutions.com/wp-content/uploads/2024/05/VT24-LOGO-SMALL-BLACK-EN@2x.png" alt="Image 2" />
    <h3>Viva Technology | Paris</h3>
    <p>22-25 Mai 2024</p>
    <Link to="/page1" className="cardu-link">
              <span>En savoir plus</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </Link>
  </div>

  <div class="cardp">
    <img src="https://fininfosolutions.com/wp-content/uploads/2024/05/images-1.png" alt="Image 3" />
    <h3>Africa Capital Markets Forum | Cameroun</h3>
    <p>23-25 Avril 2024</p>
    <Link to="/page1" className="cardu-link">
              <span>En savoir plus</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </Link>
  </div>
</div>

      <SocialMediaIcons />
    </>
  );
}

export default Accueil;
