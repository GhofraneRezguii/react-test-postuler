import './App.css';
import ParticlesBackground from './Components/ParticlesBackground';
import Navbar from './Components/Navbar';
import { useTranslation } from 'react-i18next';

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
      <div className="container text-center pt-5" style={{ marginTop: '20px' }}>
        <h1 style={{ color: "#0d6efd" }}>{t('home.bienvenue')}</h1>
        <p>{t('home.description')}</p>
      </div>
    </div>
  );
}

export default App;
