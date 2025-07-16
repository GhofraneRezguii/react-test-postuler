import React from 'react';
import { Link } from "react-router-dom";
import './JobCard.css';

function JobCard({
  title,
  département = "",
  dateSoumission = "",
  dateExpiration = "",
  description = "",
  status,
  link,
  image,
  style
}) {
  return (
    <div className="job-card" style={style}>
      <div className="job-card-bg"></div>
      <div className="job-card-blob"></div>

      <div className="flip-card">
        <div className="flip-card-inner">
          {/* Face avant */}
          <div className="flip-card-front">
            <img src={image} alt="Image offre" className="card-image" />
            <p className="title">{title}</p>
          </div>

          {/* Face arrière */}
          <div className="flip-card-back">
            <p className="back-department" style={{ textShadow: "0 0 10px rgb(110, 164, 235)" }}>
              {département}
            </p>

            {dateSoumission && (
              <p>
                <span className="back-label">Date soumission :</span>
                <span className="back-content">{dateSoumission}</span>
              </p>
            )}
            {dateExpiration && (
              <p>
                <span className="back-label">Date expiration :</span>
                <span className="back-content">{dateExpiration}</span>
              </p>
            )}
            {status && (
              <p>
                <span className="back-label">Status :</span>
                <span className="back-content">{status}</span>
              </p>
            )}

            <hr />

            {description && (
              <p>
                <span className="back-label">Description :</span>
                <span className="back-content">{description}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bouton animé en dehors de la carte retournée */}
      <div className="arrow-link">
      <Link to={link} className="ctay">
          <span className="hover-underline-animation">Voir plus</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="10"
            viewBox="0 0 46 16"
          >
            <path
              d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              transform="translate(30)"
              fill="currentColor"
            />
          </svg>
          </Link>
      </div>
    </div>
  );
}

export default JobCard;




