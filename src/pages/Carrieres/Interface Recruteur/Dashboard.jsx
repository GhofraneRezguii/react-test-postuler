// src/carreires/interface/recruteur/Dashboard.jsx
import React from "react";
import RecruterLayout from "./RecruteurLayout";
import ParticlesBackground from "../../../Components/ParticlesBackground";
import 'particles.js';

function Dashboard() {
    return (
      <RecruterLayout>
        <ParticlesBackground />
        <div>
          {/* Ton contenu ici */}
          <h1>Bienvenue sur le Dashboard Recruteur</h1>
        </div>
      </RecruterLayout>
    );
  }
  

export default Dashboard;

