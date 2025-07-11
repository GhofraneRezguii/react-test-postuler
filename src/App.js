import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import OffreDetail from "./pages/Carrieres/OffreDetail.jsx"; // à créer ensuite

import Layout from "./Components/Layout.jsx";
import Accueil from "./pages/Accueil.jsx";
// import Carrieres from "./pages/Carrieres";
import OffresEmp from "./pages/Carrieres/OffresEmp.jsx";

function App() {
  return (
    <Router>
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
