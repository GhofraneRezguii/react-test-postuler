import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./fondsL.css";
import { MdQueryStats } from "react-icons/md";
import { FaBuildingUser } from "react-icons/fa6";
import { TfiStatsUp } from "react-icons/tfi";
import { RiCoinsFill } from "react-icons/ri";
import { PiIdentificationCard } from "react-icons/pi";
import { TbSettingsDollar } from "react-icons/tb";
import { GiArchiveRegister } from "react-icons/gi";
import { FaHandHoldingMedical, FaCloud, FaCoins } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { RiCoinsLine } from "react-icons/ri";
import { TbFilePencil } from "react-icons/tb";
import { LuFolderTree } from "react-icons/lu";
import { GiCalculator } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { RiStackshareLine } from "react-icons/ri";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { BsBuildings } from "react-icons/bs";
function Fonds() {
  const cards = [
    {
      title: "Dépositaire",
      text: `✯  Actif
        ▫︎ Dépositaire
    ✓ Gestion des Opérations
    ✓ Tenue de Position
    ✓ Valorisation des Actifs
    ✓  Comptabilité Titres & Espèces`,
    },

    {
      title: "Contrôle dépositaire",
      text: `✯   Contrôle dépositaire
        ✓ Contrôle Dépositaire Actif
        ✓Contrôle Dépositaire Passif
       `,
    },
    {
      title: "Emetteur",
      text: `✯ Passif
        ▫︎ Services aux émetteurs
        ✓  Émissions Primaires
        ✓ Services Financiers
        ✓ Tenue de Registre
        ✓  Blocage et Nantissement`,
    },
  ];

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
            src="https://fininfosolutions.com/wp-content/uploads/2024/03/5a3e80b4-itfp-image-1.png"
            class="img-secondary"
            alt="secondary image"
          />

          <img
            src="https://fininfosolutions.com/wp-content/uploads/2024/03/583ba33d-itfp-image-1-1.png"
            class="img-main"
            alt="main image"
          />
        </div>

        <div class="rightt-text">
          <h2>fonds alternatifs</h2>
          <div className="lmp">
            <div className="underline-wrapper">
              <div className="elementskit-border-divider"></div>
              <div className="title-line"></div>
            </div>
          </div>
          <h4>
            Optimisez la gestion des fonds alternatifs pour un suivi sécurisé et
            performant:{" "}
            <strong>
              <br></br>La Solution Incontournable de Fininfo Solutions
            </strong>
          </h4>
          <p>
            Dans un marché financier en constante évolution, la gestion des
            fonds alternatifs requiert des outils performants et adaptés aux
            exigences des institutions financières.
            <strong> FININFO SOLUTIONS</strong> répond à ce besoin en
            enrichissant son offre avec une solution dédiée aux investissements
            alternatifs, intégrant à la fois des approches opérationnelles et de
            conservation. Grâce à des fonctionnalités avancées couvrant la
            gestion des actifs, le suivi des opérations, le contrôle dépositaire
            et le passif des <strong>OPCC </strong>(Organismes de Placement
            Collectif en Capital), <strong>OPCI</strong> (Organisme de Placement
            Collectif en Immobilier) et <strong>FPCT</strong> (Fonds de
            Placement Collectif en Titrisation), notre solution garantit une
            maîtrise optimale des investissements, qu'ils soient conventionnels
            ou non conventionnels. Conçue pour allier fiabilité et efficacité,
            elle accompagne les professionnels dans l’optimisation de leurs
            processus et la sécurisation de leurs opérations.
          </p>
        </div>
        <Link to="/societe/Nous-Contacter">
          <button className="Hbutton type11">Aller à la page</button>
        </Link>
      </div>
      <div className="Suites-fin">
        <h2>Approche opérationnelle</h2>
        <h4>
          Les fonds alternatifs opèrent sur des investissements conventionnels
          et non conventionnels.
        </h4>

        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>
      <div className="Suites-fin suit">
        <h2>Approche de conservation</h2>
        <h4>FININFO Custody Suite propose une approche de conservation par</h4>

        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>

      <div className="cards-containerf">
        {cards.map((card, index) => (
          <div className="card-blockf" key={index}>
            <h2 className="card-titlef">{card.title}</h2>
            <div className="cardf">
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="Suites-finlp">
        <h2>Fonctionnalités</h2>
        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>
      <CardsSection />
    </>
  );
}

export default Fonds;

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
          <PiIdentificationCard /> <TbSettingsDollar />
        </div>
      ),
      title: "Clients & Comptes",
    },
    {
      icon: (
        <div>
          <LuFolderTree />
          <IoSettings />
        </div>
      ),
      title: "Géstion des Comptes Emetteurs",
    },
  ],
  transactionnel: [
    { icon: <GiArchiveRegister />, title: "Tenue de Registre" },
    {
      icon: (
        <div>
          <TbSettingsDollar />
          <RiStackshareLine />
        </div>
      ),
      title: "Centralisation",
    },
    {
      icon: (
        <div>
          <BiSolidBadgeDollar /> <FaBuildingUser />
        </div>
      ),
      title: "Marché Primaire",
    },
    { icon: <BsBuildings />, title: "Introduction en Bourse" },
  ],
  transverse: [
    { icon: <LiaFileInvoiceDollarSolid />, title: "Frais et Facturation" },

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
