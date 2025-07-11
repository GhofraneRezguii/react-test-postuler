import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout';
import Jobs from '../../data/Jobs';
import './OffreDetail.css';
import SocialMediaIcons from "../../Components/SocialMediaIcons.js";
function OffreDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = Jobs[id];

  if (!job) {
    return (
      <Layout>
        <div className="offre-detail-container">
          <h2>Offre introuvable</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="offre-detail-container">
        {/* Bouton retour */}
        <button className="subscribe-btn reverse fixed-left" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 5L3 12m0 0l7 7m-7-7h18"
            />
          </svg>
          <p>Retour</p>
        </button>

        {/* Titre + ligne */}
        <h2 className="offre-title">{job.title}</h2>
        <hr style={{ width: "800px", border: "1px solid #06206a", marginLeft: "0px" }} />
        <br />

        {/* Image + texte */}
        <div className="offre-text">
          <div className="image-container">
            <div className="job-card-bg"></div>
            <div className="job-card-blob"></div>
            <img src={job.image} alt={job.title} className="offre-image" />
          </div>

          {/* Traitement du détail */}
          {(() => {
            const [intro, rest] = job.details.split("Mission principale :");

            return (
              <>
                {intro && (
                  <p className="offre-paragraphe" style={{ whiteSpace: "pre-line" }}>
                    {intro.trim()}
                  </p>
                )}

                <h3 className="mission-title">Mission principale :</h3>
                <br />

                {rest && (
                  <p className="offre-paragraphe" style={{ whiteSpace: "pre-line" }}>
                    {rest.trim()}
                  </p>
                )}
              </>
            );
          })()}
        </div>
        <br></br>
        <br></br>
        {/* Bouton Postuler aligné à droite avec style */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
       className="styled-footer-btn" 
      onClick={() => navigate('/postuler')}
         >
        Postuler
      <span></span>
     </button>

        </div>
      </div>
      <SocialMediaIcons />
    </Layout>
  );
}

export default OffreDetail;
