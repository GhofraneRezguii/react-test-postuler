// services/postulerService.js
import axios from "axios";

// URL de base de ton backend
const API_URL = "http://localhost:5000/postuler";
const API_CANDIDATURE = "http://localhost:5000/candidature";


// Fonction pour envoyer une candidature
export const envoyerCandidature = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/envoyer`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};

// Fonction pour récupérer toutes les candidatures (admin)
export const getCandidatures = async () => {
  try {
    const response = await axios.get(`${API_URL}/candidatures`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔎 Récupérer les candidatures filtrées
export const getCandidaturesFiltrees = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}/candidatures`, {
      params: filters, // exemple : { nom: "Dupont", offre: "Développeur" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Créer une nouvelle candidature avec fichiers
// Créer une nouvelle candidature avec fichiers
export const createCandidature = async (formData) => {
  const response = await axios.post(API_CANDIDATURE, formData, {
    withCredentials: true,
  });
  return response.data;
};

