import axios from "axios";

const BASE_URL = "http://localhost:5000/offre";

export const getOffres = () => axios.get(BASE_URL).then(res => res.data);

export const createOffre = (offre) => axios.post(BASE_URL, offre).then(res => res.data);

export const updateOffre = (id, offre) => axios.put(`${BASE_URL}/${id}`, offre).then(res => res.data);

export const deleteOffre = (id) => axios.delete(`${BASE_URL}/${id}`).then(res => res.data);
