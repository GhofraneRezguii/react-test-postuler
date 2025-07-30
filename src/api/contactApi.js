// src/api/contactApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const envoyerMessageContact = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/contact`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

