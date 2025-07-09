// JobCard.jsx
// JobCard.jsx
import React from 'react';
import './JobCard.css';

function JobCard({ title, company, location, link }) {
  return (
    <div className="job-card">
      {/* Animation de bordure */}
      <div className="job-card-bg"></div>
      <div className="job-card-blob"></div>

    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p className="title">{title}</p>
          <p>Hover Me</p>
        </div>
        <div className="flip-card-back">
          <p className="title">{company}</p>
          <p>{location}</p>
          <div className="arrow-link">
            <a href={link} className="arrow-button">➜</a>
          </div>

        </div>
      </div>
      <div className="arrow-link">
        <a href={link} className="arrow-button">➜</a>
      </div>
    </div>
    </div>
  );
}

export default JobCard;

