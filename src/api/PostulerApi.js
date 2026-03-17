// services/postulerService.js
import axios from "axios";

const API_URL = "http://localhost:5000/postuler";
const API_CANDIDATURE = "http://localhost:5000/candidature";

// 🔥 POSTULANT - Envoi candidature (avec auth token)
export const envoyerCandidature = async (formData) => {
  try {
    const token = localStorage.getItem('candidatToken');
    
    const response = await axios.post(`${API_URL}/envoyer`, formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      withCredentials: true,
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};

// 🔥 ADMIN - Créer candidature MANUELLE (POUR GestionCondidatures)
export const createCandidature = async (formData) => {
  try {
    const response = await axios.post(`${API_CANDIDATURE}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ADMIN - Récupérer candidatures
export const getCandidatures = async () => {
  try {
    const response = await axios.get(`${API_URL}/candidatures`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCandidaturesFiltrees = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}/candidatures`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔥 DASHBOARD CANDIDAT
// Dans PostulerApi.js
 // 🔥 DASHBOARD CANDIDAT
 export const getDashboardCandidat = async () => {
  try {
    const token = localStorage.getItem('candidatToken');
    const response = await axios.get('http://localhost:5000/api/candidat/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

