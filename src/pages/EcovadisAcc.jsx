import React from 'react'
import './ecovL.css'
import { FaBullseye, FaCalendarAlt, FaMedal } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { Link } from "react-router-dom";
function EcovadisAcc() {
    
  return (
    <>
    <div className="background-containerfk">
    <div className="overlayfk"></div>
    <div className="contentfk">
    <p className="subtitlefk">#FININFO SOLUTIONS ECOVADIS 2024</p>
      <h1 className="titlefk">FININFO récompensée par la Médaille de BRONZE EcoVadis 2024 !&nbsp;&nbsp;
      <img
    src="https://s.w.org/images/core/emoji/16.0.1/svg/1f949.svg" 
    alt="Médaille de bronze"
    className="medaille-icon"
  /> </h1>
    </div>
  </div>
  <div className="cards-containervl">
      <div className="card-itemvl">
        <div className="icon-circlevl">
          <TbTargetArrow  className="card-iconvl" />
        </div>
        <h3 className="card-titlevl">Object</h3>
        <p className="card-subtitlevl">Evaluation RSE menée par EcoVadis.</p>
      </div>

      <div className="card-itemvl">
        <div className="icon-circlevl">
          <FaCalendarAlt className="card-iconvl" />
        </div>
        <h3 className="card-titlevl">Date</h3>
        <p className="card-subtitlevl">Novembre 2024 </p>
      </div>

      <div className="card-itemvl">
        <div className="icon-circlevl">
          <FaMedal className="card-iconvl" />
        </div>
        <h3 className="card-titlevl">Médaille</h3>
        <p className="card-subtitlevl"> Bronze </p>
      </div>
    </div>
    {/* column */}
    <div className="two-column-containerQE">
      <div className="left-columnQE">
        <img src="https://fininfosolutions.com/wp-content/uploads/2024/11/FININFO-ECOVADIS-BADGE.png"alt="Illustration" className="illustrationQE" />
      </div>
      <div className="right-columnQE">
      <h4 className="section-subtitleQE"># Fininfo Solutions récompensée par la médaille de bronze en RSE 2024</h4>
        <h2 className="section-titleQE">Une reconnaissance de notre engagement pour un avenir socialement responsable et durable</h2>
        <p className="section-textQE">
        Nous avons le plaisir d'annoncer que Fininfo a obtenu la médaille de bronze suite à l'évaluation RSE (Responsabilité Sociétale des Entreprises) menée par Ecovadis pour l'année 2024 ! 
Cette reconnaissance témoigne de notre engagement constant en matière de <strong>social et droits de l'homme, environnement, éthique et achats responsables.</strong>
Nous sommes déterminés à poursuivre nos efforts pour construire un avenir plus responsable et durable pour nos collaborateurs, nos partenaires et la planète.
        </p>
      </div>
    </div>
    <Cards/>
    <Link to="/societe/Nos-Actualités" className="learn-more-link">
      <span className="circle" aria-hidden="true">
        <span className="icon arrow"></span>
      </span>
      <span className="button-text">Retourner</span>
    </Link>
  </>
  )
}

export default EcovadisAcc;






const Cards = () => {
    const cardData = [
      {
        title: "Vers de Nouveaux Horizons : Un Engagement Renouvelé pour l'Excellence et la Reconnaissance",
        image: "https://i.pinimg.com/736x/56/93/e7/5693e7a3dc966c6dfe6a89f40d6f1e9c.jpg",
        text: "",
      },
      {
        title: "Notre Equipe",
        image: "https://i.pinimg.com/1200x/b1/4c/c1/b14cc161cce4383a47cfaebca0af04cb.jpg",
        text: "Un grand merci à toutes nos équipes pour leur travail exceptionnel et à nos partenaires pour leur confiance.Ensemble, nous allons continuer à faire la différence !",
      },
      {
        title: "Notre Vision",
        image: "https://i.pinimg.com/1200x/86/de/25/86de25bf5b2b497bb8be816e43e60bc0.jpg",
        text: "Notre engagement ne s’arrête pas là ! Nous continuons à améliorer nos pratiques pour viser des performances encore meilleures et obtenir de nouvelles distinctions dans les évaluations à venir.",
      },
    ];
  
    return (
      <div className="card-containerGR">
        {cardData.map((card, index) => (
          <div className="cardGR" key={index}>
            <img src={card.image} alt={card.title} className="card-imageGR" />
            <h2 className="card-titleGR">{card.title}</h2>
            <p className="card-textGR">{card.text}</p>
          </div>
        ))}
      </div>
    );
  };