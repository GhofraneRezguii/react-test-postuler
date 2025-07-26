import React, { useState } from "react";
import "./contactL.css";
import { FaMapMarkerAlt } from "react-icons/fa";

function NousContacter() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    commentaires: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis :", formData);
    // Ici tu peux faire appel à ton backend
  };

  const cardsData = [
    {
      image: "https://fininfosolutions.com/wp-content/uploads/2021/11/casablanca-morocco-sunset-4620328.jpg",
      title: "Casablanca, Maroc",
      backText: `Adresse : 265, Bd Zerktouni 9ème étage N°92 ,20250, Casablanca\n\nE-mail : fgaied@fininfosolutions.com`,
    },
    {
      image: "https://fininfosolutions.com/wp-content/uploads/2021/11/eiffel-tower-france-paris-975004.jpg",
      title: "Paris, France",
      backText: `Adresse : 5 Bd Edgar Quinet, 92700 Colombes, France\n\nE-mail : fgaied@fininfosolutions.com\n\nTéléphone : 0033 9 72 12 01 15`,
    },
    {
      image: "https://fininfosolutions.com/wp-content/uploads/2022/04/tunisia-komachi-seaside-2471197.jpg",
      title: "Tunis, Tunisie",
      backText: `Adresse : 6 Rue de l’artisanat, charguia 2, Tunis\n\nE-mail : fgaied@fininfosolutions.com\n\nTéléphone :0033 9 72 12 01 15`,
    },
  ];

  return (
    <>
      <div className="video-sectionl">
        <video autoPlay muted loop playsInline className="video-bgl">
          <source
            src="/videos/7706979-uhd_4096_2160_25fps.mp4"
            type="video/mp4"
          />
          Ton navigateur ne supporte pas la vidéo.
        </video>

        <div className="overlayl" />

        <div className="video-contentl">
          <div className="Suites-finlp overlayq-title">
            <h2>CONTACTEZ-NOUS</h2>
            <div className="s">
              <div className="underline-wrapper qze">
                <div className="elementskit-border-divider qz"></div>
                <div className="title-line qz"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* form contacter */}
      <div className="containerw-flex">
        <div className="leftw-card">
          <div className="cardw">
            <h2>Question? Commentaire? Appelez-nous</h2>
            <hr className="styled-hr" />
            <p>
              <strong>Email :</strong> fgaied@fininfosolutions.com{" "}
              <strong>téléphone :</strong>
              0033622446577
            </p>
            <p>
              {" "}
              <strong>lundi – Vendredi :</strong> 9:00 – 18:00{" "}
              <strong>Samedi :</strong>10:00 – 18:00
            </p>
          </div>
        </div>

        <div className="rightw-card">
          <div className="cardws">
            <form onSubmit={handleSubmit}>
              <div className="form-groupw">
                <label className="loulou" htmlFor="nom">
                  Nom <span>*</span>
                </label>
                <input
                  className="inpoot"
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Nom"
                  required
                />
              </div>
              <div className="form-groupw">
                <label className="loulou" htmlFor="prenom">
                  Prénom <span>*</span>
                </label>
                <input
                  className="inpoot"
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Prénom"
                  required
                />
              </div>
              <div className="form-groupw">
                <label className="loulou" htmlFor="email">
                  Email<span>*</span>
                </label>
                <input
                  className="inpoot"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex : User@gmail.com"
                  required
                />
              </div>
              <div className="form-groupw">
                <label className="loulou" htmlFor="commentaires">
                  Commentaires / Questions <span>*</span>
                </label>
                <textarea
                  className="inpoot"
                  id="commentaires"
                  name="commentaires"
                  rows="4"
                  value={formData.commentaires}
                  onChange={handleChange}
                  placeholder="Poser votre Questions..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="buttonXz">
      <div className="outline"></div>

      {/* État par défaut */}
      <div className="state state--default">
        <div className="icon">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g style={{ filter: "url(#shadow)" }}>
              <path
                d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63Z"
                fill="currentColor"
              />
              <path
                d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <filter id="shadow">
                <feDropShadow
                  dx="0"
                  dy="1"
                  stdDeviation="0.6"
                  floodOpacity="0.5"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <p>
  {"EnvoyerMessage".split("").map((char, i) => (
    <span key={i} style={{ "--i": `${i}` }}>{char}</span>
  ))}
</p>
      </div>

      {/* État envoyé */}
      <div className="state state--sent">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            strokeWidth="0.5px"
            stroke="black"
          >
            <g style={{ filter: "url(#shadow)" }}>
              <path
                fill="currentColor"
                d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75Z"
              />
              <path
                fill="currentColor"
                d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
              />
            </g>
          </svg>
        </div>
        <p>
          {"Envoyé".split("").map((char, i) => (
            <span key={i} style={{ "--i": i + 5 }}>{char}</span>
          ))}
        </p>
      </div>
    </button>
            </form>
          </div>
        </div>
      </div>
      {/* localisation */}
      <div className="Suites-fin xc">
        <h2>Localisation</h2>
        <div className="s qc">
          <div className="underline-wrapper">
            <div className="elementskit-border-divider"></div>
            <div className="title-line"></div>
          </div>
        </div>
      </div>
      {/* separateur V */}
      <div className="svg-separator dgs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 700 10"
          preserveAspectRatio="none"
        >
          <path d="M350,10 L340,0 H360 L350,10 Z" className="svg-fill"></path>
        </svg>
      </div>

      {/* cards */}
      <div className="cards-containergh">
      {cardsData.map((card, index) => (
        <div className="flip-cardgh" key={index}>
          <div className="flip-card-innergh">
            <div className="flip-card-frontgh">
              <img src={card.image} alt={card.title} className="card-imagegh" />
              <div className="card-icongh">📍</div>
              <h3>{card.title}</h3>
            </div>
            <div className="flip-card-backgh">
              <p>{card.backText}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
   
    <div>
  <iframe
    title="Fininfo Solutions Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0577526177627!2d-7.620933184800402!3d33.58831014919573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cdfc6a0f508b%3A0xd1cc667746dd37a1!2s265%20Bd%20Zerktouni%2C%20Casablanca%2020250%2C%20Maroc!5e0!3m2!1sfr!2stn!4v1695291773870!5m2!1sfr!2stn"
    width="100%"
    height="100%"
    style={{
        width: '80%',
        height: '400px',
        borderRadius: '12px',
        overflow: 'hidden',
        marginTop:'50px',
        marginLeft:'80px',
        boxShadow: ' 2px 9px 12px rgba(9, 76, 157, 0.855)',
        border:'2px solid#125bb5',
      }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

    </>
  );
}

export default NousContacter;


