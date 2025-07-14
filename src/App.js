import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import OffreDetail from "./pages/Carrieres/OffreDetail.jsx"; // à créer ensuite
import ScrollToTop from "./Components/ScrollToTop";
import Layout from "./Components/Layout.jsx";
import Accueil from "./pages/Accueil.jsx";
// import Carrieres from "./pages/Carrieres";
import { useState, useEffect } from "react";
import Loader from "./Components/Loader.jsx";
import Postuler from "./pages/Carrieres/Postuler.jsx";
import OffresEmp from "./pages/Carrieres/OffresEmp.jsx";
import CarrieresNous from "./pages/Carrieres/CarrieresNous.jsx";

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
      </Routes>
    </Router>
  );
}

export default App;
