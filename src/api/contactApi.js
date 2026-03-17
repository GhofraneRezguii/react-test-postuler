import axios from "axios";

// Utiliser la route contact spécifique
export const envoyerMessageContact = async (formData) => {
  return axios.post("http://localhost:5000/api/send-email-contact", formData);
};