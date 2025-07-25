import React, { useState } from "react";

const VideoCard = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlay = () => {
    setShowVideo(true);
  };

  const handleClose = () => {
    setShowVideo(false);
  };

  return (
    <div className="videop-container">
      {/* PARTIE GAUCHE */}
      <div className="video-left">
        <div className="video-card" onClick={handlePlay}>
          <img
            src="https://img.youtube.com/vi/dR1X73NLmKw/hqdefault.jpg"
            alt="video preview"
            className="video-thumbnail"
          />
          <button className="play-button">▶</button>
          <span className="tooltip-text">ouvre video</span>
        </div>
      </div>

      {/* PARTIE DROITE */}
      <div className="texty-rightyy">
        <div className="texty-cardy">
          <h4>La solution</h4>
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
          <h2>Qui vous convient ou des produits prêts à l'emploi</h2>

          <p>
            Vous connaissez déjà les nombreuses solutions standards de
            numérisation des processus et vous n'êtes pas vraiment convaincu
            qu'un logiciel prêt à l'emploi vous convienne ? Nos solutions sont
            aussi individuelles que votre entreprise. Nous répondons à vos
            besoins de manière très ciblée. Grâce à notre expérience dans le
            domaine. FININFO SOLUTIONS prospère en tant que société de
            développement de logiciels depuis sa création, combinant
            d'excellents spécialistes avec des processus bien réglés mais
            flexibles pour fournir également des solutions de développement de
            logiciels et des produits logiciels de qualité supérieure.
          </p>
        </div>
      </div>

      {/* OVERLAY VIDEO */}
      {showVideo && (
        <div className="video-overlay">
          <div className="video-popup">
            <button className="close-button" onClick={handleClose}>
              ✖
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dR1X73NLmKw?autoplay=1"
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
