import React from 'react';
import './JobCard.css';
import './JobCard.css';

function JobCard({ title, company, location, link }) {
  return (
    <div className="job-card">
      <p className="heading">{title}</p>
      <p>{company}</p>
      <p>{location}</p>

      <div className="arrow-link">
        <a href={link} className="arrow-button">
          ➜ {/* ou <i className="bi bi-arrow-right"></i> pour Bootstrap Icons */}
        </a>
      </div>
    </div>
  );
}

export default JobCard;
