import React, { useState } from "react";
import "./sommeL.css";
import { FaBriefcase } from "react-icons/fa";
import {
  FaBrain,
  FaUserTie,
  FaTools,
  FaChartBar,
  FaLock,
  FaChartLine,
  FaRocket,
} from "react-icons/fa";
import { PiHandHeartFill } from "react-icons/pi";
import { FaUserGraduate } from "react-icons/fa6";
import { MdStarPurple500 } from "react-icons/md";
import { FaPeopleArrows } from "react-icons/fa6";
import { GiInjustice } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBuildingUser } from "react-icons/fa6";
import { GrAchievement } from "react-icons/gr";
import { FaPeopleLine } from "react-icons/fa6";
import { FaSearchengin } from "react-icons/fa";
import { FaPencilRuler } from "react-icons/fa";

function SommesNous() {
  const [showMore, setShowMore] = useState(false);

  const extraCards = [
    {
      icon: <FaPeopleArrows />,
      title: "Partenariat",
      text: "D'excellents informaticiens, managers et entrepreneurs se sont réunis dans FININFO SOLUTIONS ; notre partenariat se caractérise par la confiance, la responsabilité et le respect.",
    },
    {
      icon: <FaBuildingUser />,
      title: "Entrepreneuriat",
      text: "L'image de l'entrepreneur fort est déterminante pour nos actions : un véritable entrepreneur pense de manière non conventionnelle, prend des risques de manière responsable et a la volonté inconditionnelle de faire de son idée un succès.",
    },
    {
      icon: <GrAchievement />,
      title: "L'excellence opérationnelle",
      text: "Pour nous, l'excellence c'est quand le client dit WOW. Il faut un esprit vif, une ouverture pour écouter et regarder de près, de la curiosité et une passion pour comprendre les choses de fond en comble.",
    },
    {
      icon: <GiInjustice />,
      title: "Justice",
      text: "En affaires, l'équité est-elle plus lente à atteindre votre objectif ? Nous croyons le contraire : Nous nous engageons à une culture d'équité envers nos collègues, nos clients, nos investisseurs et notre environnement.",
    },
    {
      icon: <FaPeopleLine />,
      title: "One Firm",
      text: "FININFO SOLUTIONS  est basée sur un partenariat ONE FIRM qui embrasse des valeurs communes. Nous représentons l'entreprise de manière uniforme vis-à-vis de nos parties prenantes et utilisons les mêmes systèmes de base et processus de support.",
    },
  ];

  return (
    <>
      <div className="image-backgroundt">
        <div className="overlayss" />
        <img
          src="https://i.pinimg.com/1200x/35/a7/ef/35a7ef7e6db30304c199abcd760e2fdf.jpg"
          alt="Fininfo"
          className="fimage"
        />
        <h2 className="title-overlays">QUI SOMMES-NOUS?</h2>
      </div>
      <ThreeCardsy />
      {/* section valeurs */}
      <div className="containerx">
        {/* Card principale */}
        <div className="main-cardx">
          <div className="iconx">{<PiHandHeartFill />}</div>
          <h2 className="titlex">Nos valeurs</h2>
          <p className="textx">
            Cinq valeurs caractérisent <strong>FININFO SOLUTIONS</strong>. Nos
            valeurs sont notre loi fondamentale et assurent ainsi notre
            comportement professionnel. Un comportement transparent, juste et
            fiable pour nos clients et partenaires.
          </p>
          <button
            className="toggle-btnx"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Cacher" : "Voir plus"}
          </button>
        </div>

        {/* Cards supplémentaires */}
        {showMore && (
          <div className="cards-gridx">
            {extraCards.map((card, index) => (
              <div className="extra-cardx" key={index}>
                <div className="iconx">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="Suites-fin">
        <h2>CE QUE NOUS CHERCHONS</h2>
        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
        <h5 className="ph" style={{ marginTop: "20px" }}>
          FININFO SOLUTIONS est une grande famille composée de 25 solutionneurs
          jeunes et enthousiastes qui partagent de fortes valeurs : l’entraide,
          l’engagement et le goût de la réussite. Au-delà des compétences
          techniques, nous sommes à la recherche de collaborateurs passionnés
          par leur métier qui ont envie de participer à la belle histoire de
          cette FinTech française 100% indépendante.
        </h5>
      </div>
      <ThreeCardsr />
      <div className="Suites-fin">
        <h4>Mode Opératoire</h4>
        <h2>Comment ça marche</h2>
        <div className="s">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>
      <ThreeCardsT />
      <div className="customp-sectiono me">
        <div className="textok-side">
          {/* <h2>{"Notre vision :\n Digitaliser. Se multiplier. Se développer."}</h2> */}
          <h2>
            Notre vision :<br />
            <span style={{ whiteSpace: "nowrap" }}>
              Digitaliser. Se multiplier. Se développer.
            </span>
          </h2>

          <div className="lp">
            <div className="underline-wrapper">
              <div className="elementskit-border-divider"></div>
              <div className="title-line"></div>
            </div>
          </div>
          <p>
            Chez FININFO SOLUTIONS, nous aidons nos clients à combiner l’agilité
            stratégique avec la centralisation des données et la réduction du
            coût afin de se positionner pour l’avenir. Nous permettons à nos
            clients de numériser et d’automatiser leurs processus de travail
            critiques. Nous les aidons à étendre leur propre propriété
            intellectuelle avec nos solutions afin d’acheter et de construire
            l’interopérabilité pour leur solution parfaite. Ensemble, nous
            faisons évoluer l’activité de nos clients pour qu’ils restent dans
            la course. Nous pensons que les réalités du secteur financier, et
            notamment des marchés des capitaux, exigent une nouvelle approche.
            Une qui tire profit des dernières technologies, mais qui est aussi
            fermement enracinée dans l’interopérabilité et l’autonomisation des
            clients. C’est la source d’énergie qui façonne et alimente tout ce
            que nous faisons pour créer de la valeur pour nos clients.
          </p>
        </div>

        <div className="imagei-sideo">
          <img
            src="https://i.pinimg.com/736x/c5/46/f5/c546f5beae19a06c9cf152187f0d25ef.jpg"
            className="mainp-img ktl"
          />
          {/* <img
            src="https://fininfosolutions.com/wp-content/uploads/2024/03/514755c1-service-shape-2-1.png"
            className="bgo-deco ptr"
          /> */}
        </div>
      </div>
      {/* collab section */}
      <div className="container-cardso">
        <div className="card-lefto">
          <h2 className="card-titleo">"Bien-être" fininfo solutions"</h2>
          <br></br>
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
          <p className="card-texto">
            Ce qui est en vigueur, c’est{" "}
            <strong>une hiérarchie horizontale</strong>, avec un leadership plus
            proche du team: chaque membre de l’équipe bénéficie de
            <strong>la pleine confiance </strong> des membres fondateurs, est
            autonome dans la gestion du temps de travail, bénéficie
            <strong>d’une flexibilité horaire </strong> et n’est pas soumis à
            des contraintes vacances. En effet,
            <strong>FININFO SOLUTIONS</strong> ne prévoit pas de périodes de
            fermeture, précisément pour permettre à chaque membre de l’équipe de
            profiter des vacances à tout moment de l’année.
          </p>
        </div>

        <div className="card-righto">
          <img
            src="https://fininfosolutions.com/wp-content/uploads/2025/04/101727110_166352728245399_8680699306937679872_n.jpg"
            alt="Image illustrative"
            className="card-image"
          />
        </div>
      </div>
      <div className="impo">
        <img
          src="https://fininfosolutions.com/wp-content/uploads/elementor/thumbs/pexels-fauxels-3184418-qwwfwetxnf732quqcuikm0oezwj781l5lkqrdr31sg.jpg"
          alt="Image illustrative"
          className="card-imageisl"
        />
      </div>
      <div className="deux-cards-container">
        <div className="mini-card">
          <FaUserGraduate className="mini-icon" />
          <h3 className="mini-title">
            <strong>60</strong> : Team{" "}
          </h3>
        </div>

        <div className="mini-card">
          <MdStarPurple500 className="mini-icon" />
          <h3 className="mini-title">
            <strong>+ 4 ans </strong> : Excellence{" "}
          </h3>
        </div>
      </div>
    </>
  );
}

export default SommesNous;

const cards = [
  { icon: <FaHandshake size={30} />, title: "10 Clients Satisfaits" },
  { icon: <FaPeopleGroup size={30} />, title: "+50 Collaborateurs" },
];

const ThreeCardsy = () => {
  return (
    <div className="cards-container gt ">
      {cards.map((card, index) => (
        <div className="cardsu nbtm" key={index}>
          <div className="icon-circle">{card.icon}</div>
          <h3>{card.title}</h3>
          <p className="small-desc">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

const ThreeCardsr = () => {
  const cards = [
    {
      title: "CONSEIL",
      description:
        "Des consultants MOA en Finance de Marché qui seront amenés à travailler avec différents acteurs (gérants, middle, risk managers…) pour des missions variées (accompagnement, conseil, formation, support, rédaction de spécifications fonctionnelles, qualité logicielle…).",
    },
    {
      title: " R & D",
      description:
        " R & D Des Ingénieurs Développeurs R&D qui seront amenés à résoudre des problématiques complexes  en utilisant des technologies récentes mais éprouvées .",
    },
    {
      title: "SUPPORT",
      description:
        "SUPPORT Des profils administratifs, RH, communication, commerciaux….qui seront amenés à accompagner notre développement en France à l’international (une bonne maîtrise des outils informatiques,  une sensibilité aux nouvelles technologies, un esprit entreprenariat seront des atouts essentiels).",
    },
  ];
  return (
    <div className="carfy-container">
      {cards.map((card, index) => (
        <div className="carfy" key={index}>
          <h3>{card.title}</h3>
          <hr className="blue-line "></hr>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

function ThreeCardsT() {
  return (
    <div className="cardsv-container">
      <div className="cardv">
        <div className="iconv">
          <FaSearchengin />
        </div>
        <h3 className="cardv-title">EVALUER</h3>
        <p className="cardv-text">
          Une évaluation est un examen ciblé et limité dans le temps, consistant
          à juger/apprécier un projet en cours ou achevé, y compris sa
          conception, sa mise en oeuvre et ses résultats..
        </p>
      </div>

      <div className="cardv">
        <div className="iconv">
          <FaPencilRuler />
        </div>
        <h3 className="cardv-title">CONCEPTION & CONSTRUCTION</h3>
        <p className="cardv-text">
          Nous concevons et construisons une expérience utilisateur moderne,
          soutenue par une architecture full-stack robuste.
        </p>
      </div>

      <div className="cardv">
        <div className="iconv">
          <FaRocket />
        </div>
        <h3 className="cardv-title">LANCEMENT</h3>
        <p className="cardv-text">
          Vous lancez une application logicielle moderne et intuitive à la
          hauteur des promesses de votre marque.
        </p>
      </div>
    </div>
  );
}
