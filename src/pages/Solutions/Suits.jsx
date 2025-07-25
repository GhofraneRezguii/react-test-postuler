import React, { useState } from "react";
import "./suitsL.css";
import {  FaShieldAlt } from "react-icons/fa";
import { GiBank } from "react-icons/gi";
import { MdSettingsSuggest } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaPlug, FaLink, FaBolt } from "react-icons/fa";

import { FaHandHoldingUsd } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";

import { TbSettingsDollar } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";

function Suits() {
  return (
    <>
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source
            src="/videos/3255275-uhd_3840_2160_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* <!-- Overlay sombre --> */}
        <div class="video-overlay"></div>

        {/* <!-- Contenu au-dessus --> */}
        <div class="split-container z-top">
          <div class="left-content">
            <h1>Suites FININFO</h1>
            <p>
              {`Prêt à transformer votre gestion financière ? 
            Découvrez dèsmaintenant la puissance de la suite
             Fininfo Solutions  et libérez lepotentiel de votre entreprise.`}
            </p>
          </div>

          <div class="right-content">
            <div class="image-stack">
              <img
                src="https://fininfosolutions.com/wp-content/uploads/2024/03/1652089901068.png"
                class="main-image"
                alt="main"
              />
              <img
                src="https://fininfosolutions.com/wp-content/uploads/2024/03/b7fd9da7-sales-marketing-1.png"
                class="overlay-image image1"
                alt="overlay1"
              />
              <img
                src="https://fininfosolutions.com/wp-content/uploads/2024/03/b7fd9da7-sales-marketing-4.png"
                class="overlay-image image2"
                alt="overlay2"
              />
              <img
                src="https://fininfosolutions.com/wp-content/uploads/2024/03/b7fd9da7-sales-marketing-2.png"
                class="overlay-image image3"
                alt="overlay3"
              />
            </div>
          </div>
        </div>
      </div>
      <ThreeCards />

      <div className="sectiono-container">
        <div className="lefto-card">
          <h2>FININFO MIDDLEWARE</h2>
          <p>
            {
              "Le Middleware FININFO est une solution clé permettant d'établir des connexions fluides entre les Suites FININFO et les systèmes internes/externes. En facilitant l'intégration et l'interopérabilité, notre Middleware garantit une communication efficace et sécurisée entre vos applications financières et les diverses plateformes utilisées au sein et à l'extérieur de votre entreprise."
            }
          </p>
        </div>
        <CardsSection />
      </div>
      <div>
        <button class="Hbutton type11 oo"></button>
      </div>
      {/* IA section */}
      <div className="doubley-card-container">
        <div className="leftp-card">
          <img
            src="https://fininfosolutions.com/wp-content/uploads/2024/03/ai-artificial-intelligence-sci-fi-7111802.jpg"
            alt="AI Illustration"
            className="cardp-image"
          />
        </div>
        <div className="rightp-card">
          <h2 className="cardp-title">Intelligence Artificielle</h2>
          {/* <div className="sk">
            <div className="underline-wrapper">
              <div className="elementskit-border-divider"></div>
              <div className="title-line"></div>
            </div>
          </div> */}
          <h4 className="cadup-subi" style={{ color: "#064e6f" }}>
            Innovation continue
          </h4>
          <p className="cardp-text">
            Explorez les possibilités infinies offertes par notre nouvelle
            intégration d'Intelligence Artificielle dans nos logiciels
            financiers. Révolutionnez votre approche de la gestion financière
            grâce à des solutions intelligentes conçues pour anticiper les
            tendances du marché, optimiser vos stratégies d'investissement et
            maximiser vos rendements.
          </p>
        </div>
      </div>
      <div>
        <button class="Hbutton type11 ook"></button>
      </div>
      <div className="Suites-finlp">
        <h2>FEATURES</h2>
        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>
      <CardsSectiond />
    </>
  );
}

export default Suits;

const cards = [
  { icon: <GiBank size={30} />, title: "Custody" },
  { icon: <MdSettingsSuggest size={30} />, title: "Services aux émetteurs" },
  { icon: <FaSackDollar size={30} />, title: "Administration des Fonds" },
];

const ThreeCards = () => {
  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div className="cardsu" key={index}>
          <div className="icon-circle">{card.icon}</div>
          <h3>{card.title}</h3>
          <p className="small-desc">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

const icons = [<FaPlug />, <FaLink />, <FaShieldAlt />, <FaBolt />];

function CardsSection() {
  const titles = [
    "Intégration Transparente",
    "Intéropérabilité",
    "Sécurité Renforcée",
    "Perférmance & Fiabilité",
  ];

  return (
    <div className="righto-card-grid">
      {titles.map((title, index) => (
        <div className="small-card" key={index}>
          <div className="cardo-bg" />
          <div className="icon-wrapper">{icons[index]}</div>
          <h3>{title}</h3>
        </div>
      ))}
    </div>
  );
}




const data = {
    SuitesFININFO: [
      { icon: <FaHandHoldingUsd />, title: "Custody" },
      { icon: <FaHandshakeAngle />, title: "Sérvices aux émetteurs" },
      { icon: <TbSettingsDollar />, title: "Administration des fonds" },
     
        
    ],
    Servicesadditionnels: [
      { icon: <BsCashCoin />, title: "Cash Managemant System" },
      {
        icon: (
          <div>
            <TbSettingsDollar />
            <GiTakeMyMoney />
          </div>
        ),
        title: "Lending/Borrowing System",
      },
     
    ],
   
  };
  
  const CardsSectiond = () => {
    const [active, setActive] = useState("SuitesFININFO");
  
    const renderCards = () => {
      return data[active].map((card, index) => (
        <div className="cardm-box" key={index}>
          <div className="cardm-icon">{card.icon}</div>
          <div className="cardm-title">{card.title}</div>
        </div>
      ));
    };
  
    const handleClick = (type) => {
      setActive(type);
    };
  
    return (
      <>
        <div className="btn-group">
          <button
            className={`foncbut ${active === "SuitesFININFO" ? "active" : ""}`}
            onClick={() => handleClick("SuitesFININFO")}
          >
            Suites FININFO
          </button>
          <button
            className={`foncbut ${active === "Servicesadditionnels" ? "active" : ""}`}
            onClick={() => handleClick("Servicesadditionnels")}
          >
            Services additionnels
          </button>
         
        </div>
  
        <div
          className="cards-func-container"
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {renderCards()}
        </div>
      </>
    );
  };