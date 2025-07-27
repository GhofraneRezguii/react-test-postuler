import React from 'react';
import './actuelL.css';
import { Link } from 'react-router-dom';
function Actualite() {
  return (
    <><div className="hero-container">
    <div className="hero-background"></div>
    <div className="hero-overlay"></div>
    <div className="hero-content">
    NOS actualités
    </div>
  </div>
  {/* cards */}
  <div className="card-linksy-container">
      {/* Première carte */}
      <div className="card-itemj">
        <Link to="/societe/Nos-Actualités-ecovadis" className="image-linkj">
          <img
            src="https://fininfosolutions.com/wp-content/uploads/2024/11/222-1-300x201.png"
            alt="Description 1"
            className="card-imagej"
          />
          <div className="card-textj">FININFO récompensée par la Médaille de BRONZE EcoVadis 2024 !&nbsp;&nbsp;</div>
        </Link>
        <Link to="/societe/Nos-Actualités-ecovadis" className="card-buttonj">11 Novembre 2024</Link>
      </div>

      {/* Deuxième carte */}
      <div className="card-itemj">
        <Link to="/societe/Nos-Actualités-UserClub" className="image-linkj">
          <img
            src="https://fininfosolutions.com/wp-content/uploads/2024/02/DSC_2921-300x200.jpg"
            alt="Description 2"
            className="card-imagej"
          />
          <div className="card-textj">«&nbsp;User Club&nbsp;» de Fininfo Solutions réunit les leaders financiers à Casablanca.</div>
        </Link>
        <Link to="/societe/Nos-Actualités-UserClub" className="card-buttonj">12 Février 2024</Link>
      </div>
    </div>
    </>
  )
}

export default Actualite