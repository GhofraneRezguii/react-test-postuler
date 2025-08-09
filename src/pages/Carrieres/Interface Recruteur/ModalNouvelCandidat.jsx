// src/Components/ModalNouvelCandidat.jsx
import React from "react";

function ModalNouvelCandidat({
  isOpen,
  onClose,
  onCreate,
  newCandidat,
  setNewCandidat,
  handleFileButtonClick,
  handleFileSelect,
  uploadSuccess,
  fileInputRef
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="modal-title">Ajouter un nouveau candidat</h2>
        <form className="modal-form">
          <div className="form-grid">
            <label>Id</label>
            <input
              type="text"
              value={newCandidat.id}
              onChange={e => setNewCandidat({ ...newCandidat, id: e.target.value })}
              placeholder="Entrez l'identifiant du candidat"
            />

            <label>Nom</label>
            <input
              type="text"
              value={newCandidat.nom}
              onChange={e => setNewCandidat({ ...newCandidat, nom: e.target.value })}
              placeholder="Entrez le nom"
            />

            <label>Prénom</label>
            <input
              type="text"
              value={newCandidat.prenom}
              onChange={e => setNewCandidat({ ...newCandidat, prenom: e.target.value })}
              placeholder="Entrez le prénom"
            />

            <label>Email</label>
            <input
              type="email"
              value={newCandidat.email}
              onChange={e => setNewCandidat({ ...newCandidat, email: e.target.value })}
              placeholder="Entrez l'adresse email"
            />

            <label>Réf Offre</label>
            <input
              type="text"
              value={newCandidat.ref_offre}
              onChange={e => setNewCandidat({ ...newCandidat, ref_offre: e.target.value })}
              placeholder="Ex: OFFRE-2025-001"
            />

            <label>Type</label>
            <select
              value={newCandidat.type}
              onChange={e => setNewCandidat({ ...newCandidat, type: e.target.value })}
            >
              <option value="">-- Sélectionnez le type de contrat --</option>
              <option value="Stage">Stage</option>
              <option value="CDI">CDI</option>
            </select>

            <label>Statut</label>
            <select
              value={newCandidat.statut}
              onChange={e => setNewCandidat({ ...newCandidat, statut: e.target.value })}
            >
              <option value="">-- Sélectionnez le statut --</option>
              <option value="accepté">Accepté</option>
              <option value="refusé">Refusé</option>
              <option value="en-cours">En cours</option>
              <option value="nouveau">Nouveau</option>
            </select>

            <label>Date de candidature</label>
            <input
              type="date"
              value={newCandidat.date_condidature}
              onChange={e => setNewCandidat({ ...newCandidat, date_condidature: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Description / Document</label>
            <div className="desc-upload-container">
              <textarea
                rows="4"
                value={newCandidat.description}
                onChange={e => setNewCandidat({ ...newCandidat, description: e.target.value })}
                placeholder="Ajoutez une description ou des remarques sur ce candidat"
              />

              <button type="button" className="Btnyu" onClick={handleFileButtonClick}>
                Upload
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
              {uploadSuccess && (
                <p style={{ color: "green", marginTop: "10px" }}>
                  ✅ Document sélectionné !
                </p>
              )}
            </div>

            <div className="modal-buttons">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Annuler
              </button>
              <button type="button" className="create-btn" onClick={onCreate}>
                Créer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalNouvelCandidat;
