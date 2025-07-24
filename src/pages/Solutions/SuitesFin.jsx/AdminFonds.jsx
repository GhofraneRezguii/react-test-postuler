
import React, { useState, useEffect } from "react";
import "./adminfL.css";
import { MdQueryStats } from "react-icons/md";
import { FaBuildingUser } from "react-icons/fa6";
import { TfiStatsUp } from "react-icons/tfi";
import { RiCoinsFill } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";
import { FaHandHoldingMedical, FaCloud, FaCoins } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { RiCoinsLine } from "react-icons/ri";
import { TbFilePencil } from "react-icons/tb";
import { TbCoin } from "react-icons/tb";
import { GiCalculator } from "react-icons/gi";
import { TbCoinOff } from "react-icons/tb";
import { GiAchievement } from "react-icons/gi";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaSackDollar } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";  

function AdminFonds() {

    

  return (
    <>
      <div class="section-container">
        <div class="left-images">
          <img
            src="https://fininfosolutions.com/wp-content/uploads/2024/03/80b97822-pettern-bbbb.png"
            class="rotating-bg"
            alt="rotating-bg"
          />

          <img
            src="https://fininfosolutions.com/wp-content/uploads/2024/03/b55a298f-itfp-shape-3-1.png"
            class="bg-shape"
            alt="background shape"
          />

          <img
            src="https://fininfosolutions.com/wp-content/uploads/2024/04/PLOI.png"
            class="img-secondary"
            alt="secondary image"
          />

          <img
            src="https://fininfosolutions.com/wp-content/uploads/2024/04/GGGG.png"
            class="img-main"
            alt="main image"
          />
        </div>

        <div class="rightt-text">
          <h2>Administration de Fonds</h2>
          <div className="lmp">
            <div className="underline-wrapper">
              <div className="elementskit-border-divider"></div>
              <div className="title-line"></div>
            </div>
          </div>
          <h4>
            La Clé d'une Gestion Financière Optimisée :{" "}
            <strong>
              <br></br>La Solution Incontournable de Fininfo Solutions
            </strong>
          </h4>
          <p>
            Notre produit phare, l'Administration des fonds, a été conçu pour
            répondre aux besoins spécifiques des institutions financières en
            matière de gestion d'entités, de rôles, de tenue de position, de
            comptabilité, de reporting et bien plus encore. Avec
            l'Administration des fonds, vous disposez d'un outil puissant qui
            simplifie et rationalise vos processus opérationnels. Gérez
            facilement les différentes entités de votre institution, attribuez
            des rôles et des autorisations avec précision, suivez les positions
            financières en temps réel et assurez une comptabilité précise grâce
            à notre système intégré.
          </p>
        </div>
        <button class="Hbutton type11"></button>
      </div>
      {/* fonctionnalités cards  */}
      <div className="Suites-finlp">
        <h2>fonctionnalités</h2>
        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>
      <CardsSection />
      {/* fonctionnalités cards  */}
      <div className="Suites-finlp">
        <h2>Transactionnel</h2>
        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>
      <Categorie />

     


    </>
  );
}

export default AdminFonds;

const data = {
  referentiel: [
    { icon: <MdQueryStats />, title: "Données Marchés" },
    { icon: <FaBuildingUser />, title: "Tiers & Contreparties" },
    { icon: <FaHandHoldingMedical />, title: "Valeurs" },
    {
      icon: (
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <TfiStatsUp />
          <RiCoinsFill />
        </div>
      ),
      title: "Prix et Courbe de Taux ",
    },
    {
      icon: (
        <div>
          <RiUserSettingsFill /><FaSackDollar />
        </div>
      ),
      title: "Fonds & Comptes d'Actifs",
    },
    {
      icon: (
        <div>
          
          <TbTransactionDollar />
        </div>
      ),
      title: "Porteurs de Parts",
    },
  ],
  transactionnel: [
    { icon:<div><TbCoinOff /> <FaRegHandshake /></div>, title: "Fonds Non-Conventionnels" },
    {
      icon: (
        <div>
          <div><TbCoin /> <FaRegHandshake /></div>
        </div>
      ),
      title: "Fonds Conventionnels",
    },
   
  ],
  transverse: [
    { icon:<div><LiaFileInvoiceDollarSolid /><GiAchievement /></div> , title: "Ratio de Conformité" },

    {
      icon: (
        <div>
          <RiCoinsLine />
          <GiCalculator />
        </div>
      ),
      title: "Comptabilité",
    },
    { icon: <TbFilePencil />, title: "Reporting" },
  ],
};

const CardsSection = () => {
  const [active, setActive] = useState("referentiel");

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
          className={`foncbut ${active === "referentiel" ? "active" : ""}`}
          onClick={() => handleClick("referentiel")}
        >
          Référentiel
        </button>
        <button
          className={`foncbut ${active === "transactionnel" ? "active" : ""}`}
          onClick={() => handleClick("transactionnel")}
        >
          Transactionnel
        </button>
        <button
          className={`foncbut ${active === "transverse" ? "active" : ""}`}
          onClick={() => handleClick("transverse")}
        >
          Transverse
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













const leftButtons = ["OPCVM", "Portefeuille"];
const rightButtons = ["OPCI", "OPCC", "FPCT"];

const images = {
  OPCVM: [
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-6.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-8.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/Image8-2.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-7.png",
  ],
  Portefeuille: [
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-6.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-8.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/Image8-2.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-7.png",
  ],
  OPCI: [
    "https://fininfosolutions.com/wp-content/uploads/2024/04/Image8-3.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/Image8-2.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-6.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-7.png",
  ],
  OPCC: [
    "https://fininfosolutions.com/wp-content/uploads/2024/04/Image8-3.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/Image8-2.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-6.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-7.png",
  ],
  FPCT: [
    "https://fininfosolutions.com/wp-content/uploads/2024/04/Image8-3.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/Image8-2.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-6.png",
    "https://fininfosolutions.com/wp-content/uploads/2024/04/6978354-7.png",
  ],
};

const Categorie = () => {
  const [activeLeft, setActiveLeft] = useState("OPCVM");
  const [activeRight, setActiveRight] = useState("OPCI");
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    setShowCards(false);
    const timeout = setTimeout(() => setShowCards(true), 50);
    return () => clearTimeout(timeout);
  }, [activeLeft, activeRight]);

  const renderCards = (key) => (
    <div className="cardsz">
      {images[key]?.map((img, index) => (
        <div className={`cardz ${showCards ? "fade-in" : ""}`} key={index}>
          <img src={img} alt={`Card ${index}`} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="containerz">
      {/* Section Gauche */}
      <div className="sectionu">
        <h2 className="titleo">Catégorie de gauche</h2>
        <div className="buttonGroupz">
          {leftButtons.map((btn) => (
            <button
              key={btn}
              className={`buttono ${activeLeft === btn ? "activeo" : ""}`}
              onClick={() => setActiveLeft(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
        {renderCards(activeLeft)}
      </div>

      {/* Section Droite */}
      <div className="sectionu">
        <h2 className="titleo">Catégorie de droite</h2>
        <div className="buttonGroupz">
          {rightButtons.map((btn) => (
            <button
              key={btn}
              className={`buttono ${activeRight === btn ? "activeo" : ""}`}
              onClick={() => setActiveRight(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
        {renderCards(activeRight)}
      </div>
    </div>
  );
};
