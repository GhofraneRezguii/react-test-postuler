import React from "react";
import "./planL.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
function PlanAcc() {
  return (
    <>
      <div className="backgroundq-section">
        <div className="overlayq">
          <div className="Suites-finlp overlayq-title">
            <h2>Plan D'accès</h2>
            <div className="s">
              <div className="underline-wrapper qze">
                <div className="elementskit-border-divider qz"></div>
                <div className="title-line qz"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Suites-finlp ui">
        <h2>En Tunisie</h2>
        <div className="s">
          <div className="underline-wrapper uim">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>

      <div className="plan-acces-container">
        {/* Carte à gauche */}
        <div className="plan-map">
          <iframe
            title="Fininfo Map"
            src="https://www.google.com/maps?q=36.862124,10.213562&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Infos à droite */}
        <div className="plan-info">
          <div className="plantyu">
            <div className="plan-info-item">
              <FaMapMarkerAlt size={24} className="plan-icon-red" />
              <span>Adresse : 6 Rue de l'artisanat, Charguia 2, Tunis</span>
            </div>

            <div className="plan-info-item">
              <FaPhone size={24} className="plan-icon-blue" />
              <span>Téléphone : 0033622446577</span>
            </div>

            <div className="plan-info-item">
              <FaEnvelope size={24} className="plan-icon-purple" />
              <span>Mail : fgaied@fininfosolutions.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlanAcc;

// const PlanAcces = () => {
//     const latitude = 36.862124;
//     const longitude = 10.213562;

//     return (
//       <div
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           padding: '40px',
//           backgroundColor: '#f8f9fa',
//           justifyContent: 'center',
//           gap: '30px'
//         }}
//       >
{
  /* Carte avec marqueur exact */
}
{
  /* <div
          style={{
            flex: '1 1 400px',
            minWidth: '300px',
            height: '400px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}
        >
          <iframe
            title="Fininfo Solutions Map"
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${latitude},${longitude}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div> */
}

{
  /* Infos à droite */
}
{
  /* <div
          style={{
            flex: '1 1 300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            minHeight: '400px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaMapMarkerAlt size={24} color="#e63946" />
            <span>6 Rue de l'artisanat, Charguia 2, Tunis</span>
          </div>
  
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaPhone size={24} color="#0077b6" />
            <span>0033622446577</span>
          </div>
  
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaEnvelope size={24} color="#6a4c93" />
            <span>fgaied@fininfosolutions.com</span>
          </div> */
}

{
  /* Bouton Itinéraire */
}
{
  /* <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#e63946',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Itinéraire
          </a>
        </div>
      </div>
    );
  }; */
}
