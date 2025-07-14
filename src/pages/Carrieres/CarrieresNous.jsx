import React from "react";
import Layout from "../../Components/Layout.jsx";
import ScrollToTop from "../../Components/ScrollToTop";
import ParticlesBackground from "../../Components/ParticlesBackground.js";
import "./CarrieresNous.css";

function CarrieresNous() {
  const sections = [
    {
      title: "DIPLÔMÉS",
      text: `Même en tant que débutant, vous assumerez immédiatement des responsabilités dans des domaines de travail passionnants et des projets stimulants. Des programmes de développement individuels et beaucoup d’engagement dès le premier jour vous offrent un grand nombre d’opportunités pour faire avancer votre carrière professionnelle. Dès le premier jour, vous apprendrez de collègues expérimentés et vous développerez pas à pas grâce à des formations régulières. Peu importe d’où vous venez, nous trouverons ensemble le bon départ.`,
      img: "image.png",
      img: "https://i.pinimg.com/1200x/2d/6d/dc/2d6ddcc51ff0267a5aadca8ae9439c25.jpg",
    },
    {
      title: "EXPÉRIMENTÉ",
      text: `En tant qu’entreprise leader dans la digitalisation du secteur financier, nous avons besoin d’experts et de spécialistes dans une grande variété de domaines qui connaissent très bien leur domaine. Si vous avez plus de trois ans d’expérience professionnelle et êtes prêt à changer l’avenir, nous aimerions vous accueillir au sein de notre équipe. Nous offrons aux professionnels de toutes les disciplines d’excellentes opportunités de développement profes`,
      img: "https://i.pinimg.com/736x/93/f6/9a/93f69ab05f95e3ca348bbfa27b76e93b.jpg",
    },
    {
      title: "THÈSE FINALE",
      text: `Peu importe que vous souhaitiez rédiger votre thèse de licence, de master ou de doctorat en collaboration avec nous – nous sommes toujours ouverts à vos idées ! Vous pouvez soit travailler avec nous en tant qu’étudiant, soit simplement rédiger votre thèse en coopération avec nous. Peu importe ce que vous décidez, vous recevrez certainement un contrat . De cette manière, nous vous donnons la possibilité de travailler sur des sujets scientifiques d’actualité dans notre entreprise. Nous vous accompagnons de votre première idée à la livraison !`,
      img: "https://i.pinimg.com/736x/61/52/31/615231fcbac6f2dd65dd2166c5202bec.jpg",
    },
    {
      title: "JOB ETUDIANTS",
      text: `En tant qu’étudiant travaillant chez FINIFO SOLUTIONS, vous avez la possibilité de mettre en pratique votre expérience d’études dans un environnement de travail dynamique. Même en tant qu’étudiant, vous êtes déjà un collègue à part entière pour nous. Vous pouvez nouer des contacts professionnels, apprendre beaucoup et avoir une première impression de votre futur métier.
      Bien sûr, nous savons que vos études ont la plus haute priorité pour vous. C’est pourquoi vous pouvez organiser vos horaires de travail de manière aussi flexible que nécessaire. `,
      img: "https://c1.wallpaperflare.com/preview/666/740/910/desk-office-monitor-computer.jpg",
    },
    {
      title: "STAGE",
      text: `Avec un stage chez FININFO SOLUTIONS, vous aurez un premier aperçu d’une entreprise qui s’est fixé pour objectif de numériser et de moderniser les industries dans le monde entier. Lors de discussions avec nos esprits hautement innovants, vous aurez un premier aperçu de l’avenir de demain et découvrirez à quoi ressemble une journée typique en matière de textos numériques. Bien sûr, nous ne vous laisserons jamais seuls. Une personne de contact sera à vos côtés pendant toute la durée de votre stage et vous familiarisera avec les nouveaux domaines de responsabilité.`,
      img: "https://i.pinimg.com/1200x/33/cb/6c/33cb6c20c65754c5a38f10e9ff076899.jpg",
    },
  ];

  return (
    <Layout>
      <ParticlesBackground />
      <ScrollToTop />
      <div className="carrieres-nous-wrapper">
      <div className="title-container">
        <h1 className="carrieres-title">Votre carrière chez FININFO SOLUTIONS</h1>
       </div>
        <div className="carrieres-sections">
          {sections.map((section, index) => (
           <div
           key={index}
           className={`carrieres-section ${
             index % 2 === 0 ? "left-text" : "right-text"
           }`}
         >
           <div
             className={`text-content ${
               index % 2 === 0 ? "slide-in-left" : "slide-in-right"
             }`}
           >
             <div className="section-title-with-line">
  <h2 className="section-subtitle">{section.title}</h2>
  <div className="underline-wrapper">
    <div className="elementskit-border-divider"></div>
    <div className="title-line"></div>
  </div>
</div>


            
             <p>{section.text}</p>
           </div>
           <div
             className={`image-content ${
               index % 2 === 0 ? "slide-in-right" : "slide-in-left"
             }`}
           >
             <img src={section.img} alt={`illustration ${index + 1}`} />
           </div>
         </div>
         
         
          ))}
        </div>
        <br></br>
        
         {/* Footer social ajouté ici */}
         <footer className="footer-social">
          <ul className="example-2">
            <li className="icon-content">
              <a href="https://linkedin.com/" aria-label="LinkedIn" data-social="linkedin">
                <div className="filled"></div>
                <i className="bi bi-linkedin"></i>
              </a>
              <div className="tooltip">LinkedIn</div>
            </li>
            <li className="icon-content">
              <a href="https://github.com/" aria-label="GitHub" data-social="github">
                <div className="filled"></div>
                <i className="bi bi-github"></i>
              </a>
              <div className="tooltip">GitHub</div>
            </li>
            <li className="icon-content">
              <a href="https://www.instagram.com/" aria-label="Instagram" data-social="instagram">
                <div className="filled"></div>
                <i className="bi bi-instagram"></i>
              </a>
              <div className="tooltip">Instagram</div>
            </li>
            <li className="icon-content">
              <a href="https://youtube.com/" aria-label="YouTube" data-social="youtube">
                <div className="filled"></div>
                <i className="bi bi-youtube"></i>
              </a>
              <div className="tooltip">YouTube</div>
            </li>
            <li className="icon-content">
              <a href="https://facebook.com/" aria-label="Facebook" data-social="facebook">
                <div className="filled"></div>
                <i className="bi bi-facebook"></i>
              </a>
              <div className="tooltip">Facebook</div>
            </li>
            <li className="icon-content">
              <a href="https://wa.me/" aria-label="WhatsApp" data-social="whatsapp">
                <div className="filled"></div>
                <i className="bi bi-whatsapp"></i>
              </a>
              <div className="tooltip">WhatsApp</div>
            </li>
          </ul>
        </footer>
      </div>
    </Layout>
  );
}

export default CarrieresNous;

