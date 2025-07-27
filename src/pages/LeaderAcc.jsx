import React, { useState } from "react";
import './leadaccL.css';
import { FaCalendarAlt,FaMapMarkerAlt } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { Link } from "react-router-dom";
function LeaderAcc() {
    const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <>
    <div className="background-containerfk ST">
    <div className="overlayfk SL"></div>
    <div className="contentfk">
    <p className="subtitlefk SM">#FININFO SOLUTIONS USER CLUB</p>
      <h1 className="titlefk SJ">"User Club" de Fininfo Solutions<br></br> réunit les leaders financiers à Casablanca.!
     </h1>
    </div>
  </div>
  <div className="cards-containervl">
      <div className="card-itemvl">
        <div className="icon-circlevl">
          <TbTargetArrow  className="card-iconvl" />
        </div>
        <h3 className="card-titlevl">Object</h3>
        <p className="card-subtitlevl">Présenter nos dernières avancées à nos clients marocains</p> 
      </div>

      <div className="card-itemvl">
        <div className="icon-circlevl">
          <FaCalendarAlt className="card-iconvl" />
        </div>
        <h3 className="card-titlevl">Date</h3>
        <p className="card-subtitlevl">16 Janvier 2024 </p>
      </div>

      <div className="card-itemvl">
        <div className="icon-circlevl">
          <FaMapMarkerAlt  className="card-iconvl" />
        </div>
        <h3 className="card-titlevl">Lieu</h3>
        <p className="card-subtitlevl"> Hotel 4 saisons Casablaca , Maroc </p>  
      </div>
    </div>
    {/* vid section */}
    <div className="two-column-containerQE">
      <div className="left-columnQE video-thumbnail-wrapper">
        <img
          src="	https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2845-scaled.jpg"
          alt="Miniature vidéo"
          className="illustrationQE"
        />
        <button className="video-play-button" onClick={handleToggle}>
          ▶
        </button>
      </div>

      <div className="right-columnQE ">
        <h4 className="section-subtitleQE">Partenariat solide</h4>
        <h2 className="section-titleQE">
        Bâtir l'avenir ensemble avec le marché financier marocain.
        </h2>
        <p className="section-textQE">
        Les acteurs de premier plan du secteur financier se sont réunis au prestigieux Hôtel Four Seasons de Casablanca pour l'événement exclusif "user club", organisé par <strong>FININFO SOLUTIONS.</strong>.
Cet événement a rassemblé des représentants éminents de banques et d'institutions financières pour une journée de partage d'expertise
et d'exploration des tendances émergentes dans le domaine financier.
        </p>
      </div>

      {isOpen && (
        <div className="video-modal sdf">
          <div className="video-card ghj">
            <button className="close-btn fds" onClick={handleToggle}>×</button>
            <iframe
              width="100%"
              height="375"
              src="https://www.youtube.com/embed/xkif6ELoFmg?feature=oembed?playlist=xkif6ELoFmg&mute=0&autoplay=0&loop=no&controls=0&start=0&end="
              title="Vidéo Fininfo"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
    
    <Cards/>
    {/* brainS section */}
    <div className="Suites-finlp szl">
            <h2>Brainstorming interactif</h2>
            <div className="s">
              <div className="underline-wrapper ">
                <div className="elementskit-border-divider "></div>
                <div className="title-line "></div>
              </div>
            </div>
    </div>
    {/* img gal */}
    <div className="galerie-container">
      <div className="galerie-left">
        <h2>Cultivons ensemble l'échange d'idées!</h2>
        <p>
        Au cours de cette journée immersive, les participants ont eu l'occasion d'assister à des présentations détaillées des fonctionnalités de nos logiciels , des démonstrations pratiques et des sessions de questions-réponses animées par nos experts . De plus, l'événement a permis aux participants de développer leur réseau professionnel et d'établir des contacts précieux au sein de l'industrie.


        </p>
      </div>
      <div className="galerie-right">
        <img
          src="https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2979-1536x1025.jpg"
          alt="img1"
          className="galerie-img"
        />
        <img
          src="https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2915-1-1536x1025.jpg"
          alt="img2"
          className="galerie-img"
        />
        <img
          src="https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2884-1536x1025.jpg"
          alt="img3"
          className="galerie-img"
        />
        <img
          src="https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2893-1536x1025.jpg"
          alt="img4"
          className="galerie-img"
        />
      </div>
    </div>
    {/* section  */}
    <div className="Suites-finlp szl lgd">
            <h2>Nos invités</h2>
            <div className="s">
              <div className="underline-wrapper ">
                <div className="elementskit-border-divider "></div>
                <div className="title-line "></div>
              </div>
            </div>
            <h4 >Que nous remercions chaleureusement d'avoir participé à notre "User club"</h4>
    </div>
    <CardsPartenaires/>
    {/* section */}
    <div className="Suites-finlp szl lgd">
            <h2>Au-delà des Murs de notre Club</h2>
            <div className="s">
              <div className="underline-wrapper ">
                <div className="elementskit-border-divider "></div>
                <div className="title-line "></div>
              </div>
            </div>
            <h4 >Articles de Presse sur nos Rencontres"</h4>
    </div>
    <ArticlesCards/>
    <Link to="/ma-page" className="learn-more-link">
      <span className="circle" aria-hidden="true">
        <span className="icon arrow"></span>
      </span>
      <span className="button-text">Retourner</span>
    </Link>
    </>
  )
}

export default LeaderAcc;



const Cards = () => {
    const cardData = [
      {
        title: "plateforme interactive",
        image: "https://i.pinimg.com/1200x/86/fc/ba/86fcba3869a8b159e69dac6007a09926.jpg",
        text: "",
      },
      {
        title: "",
        image: "https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2902-2048x1367.jpg",
        text: "Les représentants des institutions financières ont eu l’opportunité d’explorer les solutions innovantes proposées par Fininfo Solutions et d’échanger des idées sur les défis et les opportunités du secteur.",
      },
      {
        title: "",
        image: "https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2886-2048x1367.jpg",
        text: "Notre « User Club » de  a été conçu comme une plateforme interactive permettant aux participants de découvriren avant-première la dernière version des logiciels, les nouvelles fonctionnalités ainsi que les projets à venir de la société.",
      },
    ];
  
    return (
      <div className="card-containerGR pj">
        {cardData.map((card, index) => (
          <div className="cardGR" key={index}>
            <img src={card.image} alt={card.title} className="card-imageGR " />
            <h2 className="card-titleGR ">{card.title}</h2>
            <p className="card-textGR">{card.text}</p>
          </div>
        ))}
      </div>
    );
  };



  const CardsPartenaires = () => {
    const images = [
      "https://fininfosolutions.com/wp-content/uploads/2024/02/Logo_BMCE_Capital-removebg-preview.png",
      "https://fininfosolutions.com/wp-content/uploads/2024/02/2.png",
      "https://fininfosolutions.com/wp-content/uploads/2024/02/3.png",
      "https://fininfosolutions.com/wp-content/uploads/2024/02/4.png",
    ];
  
    return (
      <div className="cards-partenaires-container">
        {images.map((img, index) => (
          <div key={index} className="card-parten">
            <img src={img} alt={`Partenaire ${index + 1}`} />
          </div>
        ))}
      </div>
    );
  };


  const ArticlesCards = () => {
    const articles = [
      {
        image: "https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2881.jpg",
        title: "La fintech Fininfo Solutions présente ses dernières avancées à ses clients marocains",
        link: "https://lnt.ma/la-fintech-fininfo-solutions-presente-ses-dernieres-avancees-a-ses-clients-marocains/",
      },
      {
        image: "https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2921.jpg",
        title: "Fares GAIED, CEO FININFO Solutions : « Devenir un acteur de référence sur l’espace du post marché au Maroc »",
        link: "https://lnt.ma/fares-gaied-ceo-fininfo-solutions-devenir-un-acteur-de-reference-sur-lespace-du-post-marche-au-maroc/",
      },
    ];
  
    return (
      <div className="articles-container">
        {articles.map((article, index) => (
          <div className="article-card" key={index}>
            <img src={article.image} alt={`Article ${index + 1}`} className="article-image" />
            <h3 className="article-title">{article.title}</h3>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="article-button">
              Lire l'article
            </a>
          </div>
        ))}
      </div>
    );
  };