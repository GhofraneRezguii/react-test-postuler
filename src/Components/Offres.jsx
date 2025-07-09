import React from 'react';
import JobCard from './JobCard';
import './JobCard.css';

function Offres() {
  const jobs = [
    { title: "Développeur Front-end", company: "Fininfo Solutions", location: "Tunis, Tunisie" },
    { title: "UI/UX Designer", company: "Creative Studio", location: "Sfax, Tunisie" },
    { title: "Chef de Projet", company: "InnoTech", location: "Remote" },
  ];

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
      {jobs.map((job, index) => (
       <JobCard
       key={index}
       title={job.title}
       company={job.company}
       location={job.location}
       link={`/offre/${index}`}
     />
      ))}
    </div>
  );
}

export default Offres;
