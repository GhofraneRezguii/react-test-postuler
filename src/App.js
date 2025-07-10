import "./App.css";
import ParticlesBackground from "./Components/ParticlesBackground";
import Navbar from "./Components/Navbar";
import Offres from './Components/Offres';
import SocialMediaIcons from "./Components/SocialMediaIcons";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {/* ANIM BACKGROUND */}
      <ParticlesBackground />

      {/* NAVBAR */}
      <Navbar />

      {/* Langue Switcher
      <div className="text-center mt-4">
        <button onClick={() => changeLanguage('fr')} className="btn btn-outline-primary mx-2">🇫🇷 Français</button>
        <button onClick={() => changeLanguage('en')} className="btn btn-outline-secondary mx-2">🇬🇧 English</button>
      </div> */}

      {/* Contenu traduit */}
      <div className="container text-center pt-5" style={{ marginTop: "20px" }}>
        <h1
          style={{
            color: "#072b62",
            lineHeight: "45px",
            margin: 0,
            fontFamily: "Georgia, serif",
            textShadow: "0 0 10px rgb(110, 164, 235)",
          }}
          className="pop-up"
        >
          {t("home.title")}
        </h1>
        
        <div className="slide-in-left">
          <p
            className="slide-in-left gradient-text"
            style={{
              fontFamily: "'Lucida Sans', Geneva, Verdana, sans-serif",
              fontSize: "15px",
              
            }}
          >
            {t("home.description")}
          </p>
        </div>
        <SocialMediaIcons />
        <Offres />
      </div>
    </div>
  );
}

export default App;
