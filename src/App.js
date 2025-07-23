import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import OffreDetail from "./pages/Carrieres/OffreDetail.jsx"; // à créer ensuite
import ScrollToTop from "./Components/ScrollToTop";
import Layout from "./Components/Layout.jsx";
import Accueil from "./pages/Accueil.jsx";
import ScrollLineEffect from "./Components/ScrollLineEffect.jsx";
// import Carrieres from "./pages/Carrieres";
import { useState, useEffect } from "react";
import Loader from "./Components/Loader.jsx";
import Postuler from "./pages/Carrieres/Postuler.jsx";
import OffresEmp from "./pages/Carrieres/OffresEmp.jsx";
import CarrieresNous from "./pages/Carrieres/CarrieresNous.jsx";
import Dashboard from "./pages/Carrieres/Interface Recruteur/Dashboard.jsx";
import GestionOffres from "./pages/Carrieres/Interface Recruteur/GestionOffres.jsx";
import GestionCondidatures from "./pages/Carrieres/Interface Recruteur/GestionCondidatures.jsx";
 import Emails from "./pages/Carrieres/Interface Recruteur/Emails.jsx"; 
 import Entretiens from "./pages/Carrieres/Interface Recruteur/Entretiens.jsx";
 import MiddleWare from "./pages/Solutions/MiddleWare.jsx";
 import SocialMediaIcons from "./Components/SocialMediaIcons";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attend que la page soit complètement chargée (images, ressources...)
    const handleLoad = () => {
      setLoading(false);
    };

    // Si la page est déjà chargée
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (loading) return <Loader />;
  
  

  return (
    
   

    <Router>
      <ScrollToTop />
      
      <ScrollLineEffect />
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route
          path="/"
          element={
            <Layout>
              <Accueil />
            </Layout>
          }
        />
        {/* Route midddleware */}
        <Route
          path="/solutions/middleware"
          element={
            <Layout>
               <SocialMediaIcons />
              <MiddleWare />
            </Layout>
          }
          />
        {/* Route carriéres chez nous */}
        <Route path="/carrieres/nous" element={<CarrieresNous />} />

        {/* <Route path="/carrieres/offres" element={<OffresEmp />} /> */}
         {/* Route pour la page Postuler */}
         <Route
          path="/carrieres/Postuler"
          element={<Postuler />}
        />
        <Route path="/carrieres/offres" element={<OffresEmp />} />
        
       
        {/* Route pour la page des offres */}
        <Route
          path="/carrieres/offres"
          element={<OffresEmp />}
        />
        <Route path="/offre/:id" element={<OffreDetail />} />
        {/* Route Dashboard admin */}
        <Route path="/admin-condidature" element={<Dashboard />} />
        {/* Route Gestion des offres */}
        <Route path="/admin-offres" element={<GestionOffres/>}/>
        {/* Route Gestion des condidatures */}
        <Route path="/admin-condidatures" element={<GestionCondidatures/>}/>
        {/* Route Emails */}
        <Route path="/emails" element={<Emails/>}/>
        {/* Route Entretiens */}
        <Route path="/entretiens" element={<Entretiens/>}/>
         {/* Redirection par défaut vers la page d'accueil si aucune route ne correspond */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
    
  );
}

export default App;
