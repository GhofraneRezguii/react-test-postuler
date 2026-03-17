import React, { useEffect, useRef, useState } from "react";
import { envoyerCandidature } from "../api/PostulerApi";
import { toast } from "react-toastify";

function CandidatForm({ onSuccess }) {
  const [offerListVisible, setOfferListVisible] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [cvFile, setCvFile] = useState(null);
  const [motivationFile, setMotivationFile] = useState(null);
  const [offers, setOffers] = useState([]);

  const offerInputRef = useRef(null);
  const offerSearchRef = useRef(null);
  const offerListRef = useRef(null);

  useEffect(() => {
    setOffers([
      "Ingénieur développeur en finance de marché - CDIDEV121",
      "Ingénieur R&D Full-Stack - FULLSTACK-CDI",
      "Ingénieur R&D Back-End - BACK_END_CDI",
      "Tech Lead React - TECHLEAD-CDI-2020",
      "Project Management Officer - PMO_2021",
      "Business Developer Junior - BDJUNIOR106",
      "Business Developer Senior - BDCONFIRME105",
      "Consultant Technico-fonctionnel en Finance de Marché",
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (!cvFile) {
      toast.error("Veuillez ajouter votre CV.");
      return;
    }

    formData.append("offres", selectedOffers.join(","));
    formData.append("ref_offre", selectedOffers[0] || "");
    formData.append("cvFile", cvFile);
    if (motivationFile) formData.append("motivationFile", motivationFile);

    try {
      const response = await envoyerCandidature(formData);

      if (response.status === 200) {
        toast.success("Candidature envoyée !");
        if (onSuccess) onSuccess(); // 🔥 Ferme modal + refresh
        e.target.reset();
        setSelectedOffers([]);
      }
    } catch (error) {
      toast.error("Erreur serveur.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fpostuler" encType="multipart/form-data">
      
      <label>Nom *</label>
      <input name="nom" type="text" required className="form-control py" />

      <label>Prénom *</label>
      <input name="prenom" type="text" required className="form-control py" />

      <label>Téléphone *</label>
      <input name="telephone" type="tel" required className="form-control py" />

      <label>Email *</label>
      <input name="email" type="email" required className="form-control py" />

      <label>Référence de l'offre *</label>
      <select
        className="form-control py"
        required
        onChange={(e) => setSelectedOffers([e.target.value])}
      >
        <option value="">Choisir une offre</option>
        {offers.map((offer, i) => (
          <option key={i} value={offer}>
            {offer}
          </option>
        ))}
      </select>

      <label>Type d'offre *</label>
      <select name="typeOffre" required className="form-control py">
        <option value="">Choisir</option>
        <option value="stage">Stage</option>
        <option value="cdi">CDI</option>
        <option value="cdd">CDD</option>
      </select>

      <label>Lettre de motivation</label>
      <input
        type="file"
        className="form-control py"
        onChange={(e) => setMotivationFile(e.target.files[0])}
      />

      <label>CV *</label>
      <input
        type="file"
        required
        className="form-control py"
        onChange={(e) => setCvFile(e.target.files[0])}
      />

      <button type="submit" className="btn-postuler">
        Envoyer
      </button>
    </form>
  );
}

export default CandidatForm;