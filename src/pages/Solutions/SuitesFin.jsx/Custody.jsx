import React, { useState } from "react";
import "./custodyL.css";
import { SlPeople } from "react-icons/sl";
import { FaSackDollar } from "react-icons/fa6";
import { GoShieldLock } from "react-icons/go";
import { MdQueryStats } from "react-icons/md";
import { FaBuildingUser } from "react-icons/fa6";
import { TfiStatsUp } from "react-icons/tfi";
import { RiCoinsFill } from "react-icons/ri";
import { PiIdentificationCard } from "react-icons/pi";
import { TbSettingsDollar } from "react-icons/tb";
import { GiArchiveRegister } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbCashRegister } from "react-icons/tb";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { FaHandHoldingMedical, FaCloud, FaCoins } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { PiInvoiceBold } from "react-icons/pi";
import { RiCoinsLine } from "react-icons/ri";
import { TbFilePencil } from "react-icons/tb";

import { GiCalculator } from "react-icons/gi";
function Custody() {
  const cardsData = [
    {
      icon: <SlPeople />,
      title: "Type de client",
      description: `☑︎Client institutionnel\n
      ▪︎Portfolio\n
      ▪︎Fonds\n
      ▫︎Conventionnel\n
      – OPCVM\n
      ▫︎Alternatif\n
      – Immobilier\n
      – Fonds commun de placement\n
      – Fonds de couverture\n
      – Fonds de titrisation\n
      ☑︎Client individuel`,
    },
    {
      icon: <FaSackDollar />,
      title: "Type d'actifs",
      description: `▪︎Rente fixe\n
        ▪︎ Rente variable\n
        ▪︎Parts/unités\n
        ▪︎Produits dérivés\n
        ▪︎Actifs non-titrés\n
        ▪︎Matières premières`,
    },
    {
      icon: <GoShieldLock />,
      title: "Lieu de conservation",
      description: `▪︎Lieu de conservation\n
        ▪︎Depositaire centrale\n
        ▪︎ Dépositaire\n
        ▪︎Asset manager\n
        ▪︎Émetteur`,
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
            src="https://fininfosolutions.com/wp-content/uploads/2024/03/5a3e80b4-itfp-image-2-Recupere.png"
            class="img-secondary"
            alt="secondary image"
          />

          <img
            src="https://fininfosolutions.com/wp-content/uploads/2024/03/583ba33d-itfp-image-1-Recupere.png"
            class="img-main"
            alt="main image"
          />
        </div>

        <div class="rightt-text">
          <h2>Custody</h2>
          <div className="lmp">
            <div className="underline-wrapper">
              <div className="elementskit-border-divider"></div>
              <div className="title-line"></div>
            </div>
          </div>
          <h4>
            Maîtrisez l'Art de la Gestion des IRLs avec Custody :{" "}
            <strong>
              <br></br>La Solution Incontournable de Fininfo Solutions
            </strong>
          </h4>
          <p>
            Bienvenue dans l'univers de la gestion optimisée des IRLs avec
            Custody, une pièce maîtresse de la suite Fininfo Solutions. Custody,
            conçu avec précision pour répondre aux exigences complexes de la
            gestion des IRLs, offre bien plus qu'une simple plateforme de suivi
            des titres. C'est une solution complète qui accompagne votre
            entreprise à chaque étape, depuis le passage d'ordre jusqu'au
            dénouement, en traçant méticuleusement chaque événement crucial de
            la vie du titre.
          </p>
        </div>
        <button class="Hbutton type11"></button>
      </div>

      {/* section approche */}
      <div className="Suites-fin">
        <h2>Approche de conservation</h2>
        <h4>FININFO Custody Suite propose une approche de conservation par</h4>

        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>
      {/* cards flip */}
      <div className="cards-wrapper">
        <div className="cards-containerg">
          {cardsData.map((card, index) => (
            <div
              className="cardg"
              key={index}
              style={{
                "--index": index,
                "--color-card": "255, 255, 255",
              }}
            >
              <div className="card-innerg">
                <div className="card-frontg">
                  <div className="icon-container">{card.icon}</div>
                  <h3>{card.title}</h3>
                </div>
                <div className="card-backg">
                  <p>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* fonctionnalités cards  */}
      <div className="Suites-finl">
        <h2>fonctionnalités</h2>
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

export default Custody;

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
  ],
  transactionnel: [
    { icon: <GiArchiveRegister />, title: "Carnet d'Ordre" },
    { icon: <FaHandshake />, title: "Règlement / Livraison" },
    { icon: <FaMoneyBillTransfer />, title: "Transfert" },
    { icon: <TbCashRegister />, title: "Opérations sur Titres" },
  ],
  transverse: [
    {
      icon: (
        <div>
          <LuChartNoAxesCombined />
          <FaCoins />
        </div>
      ),
      title: "Tenue de Position",
    },
    { icon: <LiaFileInvoiceDollarSolid />, title: "Frais et Facturation" },
    { icon: <PiInvoiceBold />, title: "Taxes" },
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
