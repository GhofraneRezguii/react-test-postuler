// src/Components/ModalNouvelleOffre.jsx
import React, { useRef } from "react";

function ModalNouvelleOffre({
  isOpen,
  onClose,
  onCreate,
  newOffer,
  setNewOffer,
  handleFileButtonClick,
  handleFileSelect,
  uploadSuccess,
  fileInputRef,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="modal-title">Ajouter une nouvelle offre</h2>
        <form className="modal-form">
          <div className="form-grid">
            <label>Référence</label>
            <input
              type="text"
              placeholder="REF-2025-XX"
              value={newOffer.ref}
              onChange={(e) => setNewOffer({ ...newOffer, ref: e.target.value })}
            />

            <label>Titre</label>
            <input
              type="text"
              placeholder="Titre de l'offre"
              value={newOffer.titre}
              onChange={(e) => setNewOffer({ ...newOffer, titre: e.target.value })}
            />

            <label>Département</label>
            <input
              type="text"
              placeholder="Département"
              value={newOffer.departement}
              onChange={(e) => setNewOffer({ ...newOffer, departement: e.target.value })}
            />

            <label>Type</label>
            <select
              value={newOffer.type}
              onChange={(e) => setNewOffer({ ...newOffer, type: e.target.value })}
            >
              <option>Stage</option>
              <option>CDI</option>
            </select>

            <label>Soumission</label>
            <input
              type="date"
              value={newOffer.soumission}
              onChange={(e) => setNewOffer({ ...newOffer, soumission: e.target.value })}
            />

            <label>Expiration</label>
            <input
              type="date"
              value={newOffer.expiration}
              onChange={(e) => setNewOffer({ ...newOffer, expiration: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <div className="desc-upload-container">
              <textarea
                rows="4"
                placeholder="Décris le poste..."
                name="description"
                value={newOffer.description}
                onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
              />

              <button className="Btnyu" type="button" onClick={handleFileButtonClick}>
                Upload
              </button>

              <input
                type="file"
                name="image"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />

              {uploadSuccess && (
                <p style={{ color: "green", fontSize: "0.9em", marginTop: "10px" }}>
                  ✅ Image sélectionnée avec succès !
                </p>
              )}
            </div>

            <div className="modal-buttons">
              <button type="button" className="cancel-btn" onClick={onClose}>Annuler</button>
              <button type="button" className="create-btn" onClick={onCreate}>Créer</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalNouvelleOffre;
