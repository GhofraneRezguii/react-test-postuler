// services/postulerService.js
import axios from "axios";

export const envoyerCandidature = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/postuler",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Pour la page admin : récupérer toutes les candidatures
export const getAllCandidatures = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/postuler");
    return response.data;
  } catch (error) {
    throw error;
  }
};
