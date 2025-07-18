import React, { useRef, useState } from "react";
import RecruterLayout from './RecruteurLayout';
import ParticlesBackground from '../../../Components/ParticlesBackground';
import GestionOffresL from './GestionOffresL.css';
import Select from "react-select";

function GestionOffres() {
  const fileInputRefMain = useRef(null);
  const fileInputRefModal = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offerToDelete, setOfferToDelete] = useState(null);
  const [offerToEdit, setOfferToEdit] = useState(null);
  const [editedOffer, setEditedOffer] = useState(null);
  const [showEditCard, setShowEditCard] = useState(false);


  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");




  const [newOffer, setNewOffer] = useState({
    ref: "",
    titre: "",
    departement: "",
    type: "Stage",
    soumission: "",
    expiration: "",
    description: "",
    candidatures: 0,
  });









  const handleViewDetails = (offre) => {
    setSelectedOffer(offre);
  };

  const closeCard = () => {
    setSelectedOffer(null);
  };



  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadSuccess(true);
      // Tu peux aussi stocker le fichier ou afficher une preview ici
    }
  };


  const [filters, setFilters] = useState({
    ref: "",
    titre: "",
    département: "",
    type: "",
    soumission: "",
    expiration: "",
    statut: "",
    condidatures: "",
  });
  const [filterValues, setFilterValues] = useState({
    ref: '',
    departement: '',
    type: '',
    soumission: '',
    expiration: '',
    statut: '',
  });


  const [offres, setOffres] = useState([
    {
      ref: "REF001",
      titre: "Développeur React",
      departement: "Informatique",
      type: "CDI",
      soumission: "2025-07-10",
      expiration: "2025-08-01",
      candidatures: 12,
    },
    {
      ref: "REF002",
      titre: "Stage iot",
      departement: "Informatique",
      type: "Stage",
      soumission: "2025-07-01",
      expiration: "2025-04-03",
      candidatures: 2,
    },
    {
      ref: "REF003",
      titre: "Stage Marketing",
      departement: "Marketing",
      type: "Stage",
      soumission: "2025-07-01",
      expiration: "2025-10-15",
      candidatures: 3,
    },
    {
      ref: "REF004",
      titre: "Stage cybersecurity",
      departement: "Sécurité",
      type: "Stage",
      soumission: "2025-07-01",
      expiration: "2025-07-15",
      candidatures: 4,
    },
    {
      ref: "REF004",
      titre: "Stage finance",
      departement: "Finance",
      type: "Stage",
      soumission: "2025-07-01",
      expiration: "2025-07-15",
      candidatures: 8,
    },
  ]);

  const statusOptions = [
    { value: "valable", label: "Valable" },
    { value: "expiree", label: "Expirée" },
  ];
  //  visibilité champ filtrage  
  const [visibleFields, setVisibleFields] = useState({
    ref: true,
    departement: true,
    type: true,
    soumission: true,
    expiration: true,
    statut: true,
  });

  const removeField = (field) => {
    setVisibleFields((prev) => ({ ...prev, [field]: false }));
  };


  // bouton Exporter (page principale) : ouvrir explorateur fichier
  const handleFilePickMain = () => {
    fileInputRefMain.current.click();
  };

  // quand on choisit un fichier via Exporter (page principale)
  const handleFileChangeMain = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Par exemple, tu peux faire un traitement ici, ou juste afficher
      alert(`Fichier choisi pour importer : ${file.name}`);
      // TODO: gérer ce fichier selon besoin
    }
  };

  // bouton Download (modal) : déclencher téléchargement fichier image (ici pris depuis formData.image)
  const handleDownloadModal = () => {
    if (formData.image) {
      const url = URL.createObjectURL(formData.image);
      const link = document.createElement("a");
      link.href = url;
      link.download = formData.image.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert("Aucune image sélectionnée pour le téléchargement.");
    }
  };








  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };



  const handleCreateClick = () => {
    alert("Créer une nouvelle offre (fonctionnalité à implémenter)");
  };
  const handleActionClick = () => {
    setIsFilterVisible(prev => !prev);
  };



  const options = [
    { value: "CDI", label: "CDI" },
    { value: "Stage", label: "Stage" },
  ];


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0 4px",
      minHeight: "38px",
      backgroundColor: "#fff",
      border: "2px solid rgb(1, 72, 195)",
      borderRadius: "6px",
      fontSize: "14px",
      fontFamily: "inherit",
      boxShadow: state.isFocused ? "0 8px 4px 2px rgba(1, 72, 195, 0.3)" : "none",
      transition: "border 0.2s",
      "&:hover": {
        borderColor: "rgb(1, 72, 195)",
      },
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#98bfff"
        : state.isSelected
          ? "#b0d2fb"
          : "#fff",
      color: "#002b55",
      cursor: "pointer",
      fontSize: "14px",
      fontFamily: "inherit",
      borderRadius: "8px",
      boxShadow: "box-shadow: 0px 4px 8px#ac64e0",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#002b55",
      fontSize: "14px",
      fontFamily: "inherit",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#888",
      fontSize: "14px",
      fontFamily: "inherit",
    }),
  };


  const filterFieldOptions = [
    { value: "all", label: "Tout" },
    { value: "ref", label: "Référence" },
    { value: "departement", label: "Département" },
    { value: "type", label: "Type" },
    { value: "soumission", label: "Date de soumission" },
    { value: "expiration", label: "Date d'expiration" },
    { value: "statut", label: "Statut" },
  ];


  const [selectedFields, setSelectedFields] = useState(
    filterFieldOptions
      .map((f) => f.value)
      .filter((v) => v !== "all") // ✅ retire "all"
  );


  const handleFieldSelectionChange = (selectedOptions) => {
    if (!selectedOptions) return;

    const selectedValues = selectedOptions.map((opt) => opt.value);

    const allFields = filterFieldOptions
      .map((opt) => opt.value)
      .filter((v) => v !== "all");

    const isAllSelected =
      selectedValues.includes("all") || allFields.every((v) => selectedValues.includes(v));

    const finalSelectedFields = isAllSelected ? allFields : selectedValues.filter((v) => v !== "all");

    setSelectedFields(finalSelectedFields);

    setVisibleFields({
      ref: finalSelectedFields.includes("ref"),
      departement: finalSelectedFields.includes("departement"),
      type: finalSelectedFields.includes("type"),
      soumission: finalSelectedFields.includes("soumission"),
      expiration: finalSelectedFields.includes("expiration"),
      statut: finalSelectedFields.includes("statut"),
    });

  };

  const [formData, setFormData] = useState({
    description: "",
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState("");



  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
      setSuccessMessage("Image téléchargée avec succès !");
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }


  };
  const handleEditClick = (offre) => {
    setOfferToEdit(offre);
    setEditedOffer({
      ...offre,
      description: offre.description || "", // ✅ s'assure que "description" existe toujours
    });
    setShowEditCard(true);
  };

  // Fonction de mise à jour générique pour chaque champ texte ou date
  // const handleInputChange = (field, value) => {
  //   setFilterValues(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };

  // Fonction de filtrage du tableau
  // const filteredData = data.filter(item => {
  //   return Object.entries(visibleFields).every(([field, isVisible]) => {
  //     if (!isVisible || !filterValues[field]) return true;

  //     const value = filterValues[field].toString().toLowerCase();
  //     const itemValue = item[field]?.toString().toLowerCase() || '';

  //     return itemValue.includes(value);
  //   });
  // });


  return (
    <RecruterLayout>
      <ParticlesBackground />
      <div className="headerY-row">
        <div className="titleY-column">
          <h2 style={{
            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            color: "rgb(0 22 72)",
            fontWeight: "600",
            textShadow: "0px 2px 2px #4c87ee"
          }}>
            Offres d'emploi
          </h2>
          <h6 className="zoom-animation" style={{ color: "#0048c6", marginLeft: "12px" }}>
            Gérer vos offres d'emploi et leurs condidatures
          </h6>
        </div>

        {/* button nouvelle offre */}
        <button className="Btny" onClick={() => setIsModalOpen(true)}>
          <div className="signy">+</div>
          <div className="texty">Nouvelle Offre</div>
        </button>

        <div className="download-section" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {/* input file caché Exporter */}
          <input
            type="file"
            ref={fileInputRefMain}
            style={{ display: 'none' }}
            onChange={handleFileChangeMain}
          />
          <button className="Download-button" onClick={handleFilePickMain}>
            {/* icone + texte Exporter */}
            <svg viewBox="0 0 640 512" width="20" height="16">
              <path fill="white" d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" />
            </svg>
            <span>Exporter</span>
          </button>
        </div>
      </div>


      {/* cards */}
      <div className="cardsy-row">
        <div className="cardy-item">
          <h6>Total</h6>
          <hr></hr>
          <strong style={{ color: "#002050" }}>18</strong>
        </div>
        <div className="cardy-item">
          <h6>Valables</h6>
          <hr></hr>
          <strong style={{ color: " #039108" }}>8</strong>
        </div>
        <div className="cardy-item">
          <h6>Expirése</h6>
          <hr></hr>
          <strong style={{ color: "red" }}>10</strong>
        </div>
        <div className="cardy-item">
          <h6>Condidatures</h6>
          <hr></hr>
          <strong style={{ color: " #450391" }}>23</strong>
        </div>
      </div>

      {/* BARRE DE RECHERCHE */}
      <div className="searchy-wrapper">
        <div className="searchy-section">
          <div className="searchy-input-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#4c87ee"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher par référence, titre, département..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchy-input"
            />
          </div>

          <a className="fancty-button" onClick={handleActionClick}>
            <span className="top-key"></span>
            <span className="text">
              <i className="bi bi-sliders2" style={{ marginRight: "8px" }}></i>
              Filtrer
            </span>
            <span className="bottomy-key-1"></span>
            <span className="bottomy-key-2"></span>
          </a>

          <button
            className="resety-button"
            onClick={() =>
              setFilters({
                ref: "",
                titre: "",
                departement: "",
                type: "",
                soumission: "",
                expiration: "",
                statut: "",
                condidatures: "",
              })
            }
          >
            Réinitialiser
          </button>

        </div>
        {/* champs de filtrage */}
        {isFilterVisible && (
          <div className="searchy-form-grid">
            <div className="form-row" style={{ marginBottom: "16px" }}>
              <div className="form-group selecty">
                <label htmlFor="visibleFieldsSelector" style={{ fontWeight: "600", fontSize: "18" }}>
                  Champs à afficher
                </label>
                <Select
                  id="visibleFieldsSelector"
                  isMulti
                  closeMenuOnSelect={false}
                  value={filterFieldOptions.filter(option => selectedFields.includes(option.value))}
                  onChange={handleFieldSelectionChange}
                  options={filterFieldOptions}
                  styles={customStyles}
                  placeholder="Sélectionner les champs à afficher"
                />
              </div>
            </div>

            <div className="form-row">

              {visibleFields.ref && (
                <div className="form-group removable">
                  <label htmlFor="ref">
                    Référence
                    <button type="button" className="close-btn" onClick={() => removeField("ref")}>✕</button>
                  </label>
                  <input
                    type="text"
                    id="ref"
                    placeholder="REF001"
                    value={filters.ref}
                    onChange={(e) => setFilters({ ...filters, ref: e.target.value })}
                  />
                </div>
              )}

              {visibleFields.departement && (
                <div className="form-group removable">
                  <label htmlFor="departement">
                    Département
                    <button type="button" className="close-btn" onClick={() => removeField("departement")}>✕</button>
                  </label>
                  <input
                    type="text"
                    id="departement"
                    placeholder="EX:Informatique"
                    value={filters.departement}
                    onChange={(e) => setFilters({ ...filters, departement: e.target.value })}
                  />
                </div>
              )}

              {visibleFields.type && (
                <div className="form-group selecty removable">
                  <label htmlFor="type">
                    Type
                    <button type="button" className="close-btn" onClick={() => removeField("type")}>✕</button>
                  </label>
                  <Select
                    id="type"
                    options={options}
                    styles={customStyles}
                    placeholder="-- Sélectionner --"
                    value={options.find((opt) => opt.value === filters.type)}
                    onChange={(selectedOption) => setFilters({ ...filters, type: selectedOption ? selectedOption.value : "" })}
                  />
                </div>
              )}

              {/* gdfgsd */}
            </div>

            <div className="form-row">
              {visibleFields.soumission && (
                <div className="form-group removable">
                  <label htmlFor="soumission">
                    Date de soumission
                    <button type="button" className="close-btn" onClick={() => removeField("soumission")}>✕</button>
                  </label>
                  <input
                    type="date"
                    id="soumission"
                    value={filters.soumission}
                    onChange={(e) => setFilters({ ...filters, soumission: e.target.value })}
                  />
                </div>
              )}

              {visibleFields.expiration && (
                <div className="form-group removable">
                  <label htmlFor="expiration">
                    Date d'expiration
                    <button type="button" className="close-btn" onClick={() => removeField("expiration")}>✕</button>
                  </label>
                  <input
                    type="date"
                    id="expiration"
                    value={filters.expiration}
                    onChange={(e) => setFilters({ ...filters, expiration: e.target.value })}
                  />
                </div>
              )}

              {visibleFields.statut && (
                <div className="form-group removable">
                  <label htmlFor="statut">
                    Statut
                    <button type="button" className="close-btn" onClick={() => removeField("statut")}>✕</button>
                  </label>
                  <Select
                    id="statut"
                    options={statusOptions}
                    styles={customStyles}
                    placeholder="-- Sélectionner --"
                    value={statusOptions.find((opt) => opt.value === filters.statut)}
                    onChange={(selectedOption) => setFilters({ ...filters, statut: selectedOption ? selectedOption.value : "" })}
                  />
                </div>
              )}




            </div>



          </div>


        )}
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                {visibleFields.ref && <th>Réf</th>}
                <th>Titre</th>
                {visibleFields.departement && <th>Département</th>}
                {visibleFields.type && <th>Type</th>}
                {visibleFields.soumission && <th>Date de soumission</th>}
                {visibleFields.expiration && <th>Date d’expiration</th>}
                {visibleFields.statut && <th>Statut</th>}
                <th>Candidatures</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {offres
                .filter((offre) => {
                  return (
                    (!filters.ref || offre.ref.toLowerCase().includes(filters.ref.toLowerCase())) &&
                    (!filters.departement || offre.departement.toLowerCase().includes(filters.departement.toLowerCase())) &&
                    (!filters.type || offre.type.toLowerCase() === filters.type.toLowerCase()) &&
                    (!filters.soumission || offre.soumission === filters.soumission) &&
                    (!filters.expiration || offre.expiration === filters.expiration) &&
                    (!filters.statut || (
                      (new Date(offre.expiration) < new Date() ? "expiree" : "valable") === filters.statut
                    ))

                  );
                })
                .map((offre, index) => {
                  const isExpired = new Date(offre.expiration) < new Date();
                  return (
                    <tr key={index}>
                      {visibleFields.ref && <td>{offre.ref}</td>}
                      <td>{offre.titre}</td>
                      {visibleFields.departement && <td>{offre.departement}</td>}
                      {visibleFields.type && (
                        <td>
                          <span
                            className={`type-badge ${offre.type === "CDI" ? "type-cdi" : "type-stage"}`}
                          >
                            {offre.type}
                          </span>
                        </td>
                      )}
                      {visibleFields.soumission && <td>{offre.soumission}</td>}
                      {visibleFields.expiration && <td>{offre.expiration}</td>}
                      {visibleFields.statut && (
                        <td>
                          <span
                            className={`status-badge ${isExpired ? "status-expired" : "status-valid"}`}
                          >
                            {isExpired ? "Expirée" : "Valable"}
                          </span>
                        </td>
                      )}
                      <td style={{ textAlign: "center" }}>{offre.candidatures}</td>
                      <td>
                        <div className="action-icons">
                          <i
                            className="bi bi-pencil-square action-edit"
                            onClick={() => {
                              setOfferToEdit(offre);
                              setEditedOffer({ ...offre });
                            }}
                          ></i>

                          <i
                            className="bi bi-trash3-fill action-delete"
                            onClick={() => setOfferToDelete(offre)}
                          ></i>

                          <i
                            className="bi bi-eye action-see"
                            onClick={() => handleViewDetails(offre)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>


          </table>
        </div>
        {/* voir action */}
        {selectedOffer && (
          <div className="overlay-card-backdrop">
            <div className="overlay-card">
              <button className="close-btn-overlay" onClick={closeCard}>✕</button>
              <h3 style={{
                textAlign: "center",
                fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                marginBottom: "20px",
                color: "#002b55",
                /* Effet lumineux doux */
                textShadow:
                  `0 0 5px rgba(122, 159, 238, 0.788),
  0 0 10px rgba(69, 119, 235, 0.424),
  0 0 15px rgba(255, 255, 255, 0.2)`}}>Détails du condidat</h3>
              <p><strong style={{ color: "#0a55a0" }}>id:</strong> {selectedOffer.ref}</p>
              <p><strong style={{ color: "#0a55a0" }}>Titre :</strong> {selectedOffer.titre}</p>
              <p><strong style={{ color: "#0a55a0" }}>Département :</strong> {selectedOffer.departement}</p>
              <p><strong style={{ color: "#0a55a0" }}>Type :</strong> {selectedOffer.type}</p>
              <p><strong style={{ color: "#0a55a0" }}>Soumission :</strong> {selectedOffer.soumission}</p>
              <p><strong style={{ color: "#0a55a0" }}>Expiration :</strong> {selectedOffer.expiration}</p>
              <p><strong style={{ color: "#0a55a0" }}>Candidatures :</strong> {selectedOffer.candidatures}</p>
            </div>
          </div>
        )}
        {/* trash action */}
        {offerToDelete && (
          <div className="overlay-card-backdrop">
            <div className="overlay-card">
              <h3 style={{ textAlign: "center", color: "#8a0505", marginBottom: "15px" }}>
                Confirmer la suppression
              </h3>
              <p style={{ textAlign: "center", color: "#002b55" }}>
                Êtes-vous sûr de vouloir supprimer l’offre&nbsp;: <strong>{offerToDelete.titre}</strong> ?
              </p>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                <button
                  className="create-btn"
                  style={{ backgroundColor: "#d31010" }}
                  onClick={() => {
                    // 👉 Supprimer l'offre sélectionnée du tableau
                    setOffres(offres.filter(o => o.ref !== offerToDelete.ref));

                    // 👉 Fermer la popup de confirmation
                    setOfferToDelete(null);

                    // 👉 Optionnel : message ou console
                    console.log("Suppression confirmée pour :", offerToDelete.ref);
                  }}
                >
                  Confirmer
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setOfferToDelete(null)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
        {/* edit action */}
        {offerToEdit && (
          <div className="overlay-card-backdrop">
            <div className="overlay-cardy">
              <button className="close-btn-overlay" onClick={() => setOfferToEdit(null)}>✕</button>
              <h3 style={{
                textAlign: "center",
                fontWeight: "700",
                fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                marginBottom: "20px",
                color: "#002b55",
                textShadow:
                  `0 0 5px rgba(122, 159, 238, 0.788),
0 0 10px rgba(69, 119, 235, 0.424),
0 0 15px rgba(255, 255, 255, 0.2)`
              }}>Modifier l’offre</h3>

              <form className="modal-form">
                <div className="form-grid">
                  <label>Référence</label>
                  <input
                    type="text"
                    value={editedOffer.ref}
                    onChange={(e) => setEditedOffer({ ...editedOffer, ref: e.target.value })}
                  />

                  <label>Titre</label>
                  <input
                    type="text"
                    value={editedOffer.titre}
                    onChange={(e) => setEditedOffer({ ...editedOffer, titre: e.target.value })}
                  />

                  <label>Département</label>
                  <input
                    type="text"
                    value={editedOffer.departement}
                    onChange={(e) => setEditedOffer({ ...editedOffer, departement: e.target.value })}
                  />

                  <label>Type</label>
                  <select
                    value={editedOffer.type}
                    onChange={(e) => setEditedOffer({ ...editedOffer, type: e.target.value })}
                  >
                    <option value="Stage">Stage</option>
                    <option value="CDI">CDI</option>
                  </select>

                  <label>Soumission</label>
                  <input
                    type="date"
                    value={editedOffer.soumission}
                    onChange={(e) => setEditedOffer({ ...editedOffer, soumission: e.target.value })}
                  />

                  <label>Expiration</label>
                  <input
                    type="date"
                    value={editedOffer.expiration}
                    onChange={(e) => setEditedOffer({ ...editedOffer, expiration: e.target.value })}
                  />
                </div>

                <label>Description</label>
                <textarea
                  rows="4"
                  style={{
                    resize: "none",
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    outline: "none",
                    fontFamily: "inherit"
                  }}
                  value={editedOffer.description}
                  onChange={(e) => setEditedOffer({ ...editedOffer, description: e.target.value })}
                />


                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancely-btn"
                    onClick={() => setOfferToEdit(null)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="createy-btn"
                    onClick={() => {
                      setOffres((prev) =>
                        prev.map((o) => (o.ref === offerToEdit.ref ? editedOffer : o))
                      );
                      setOfferToEdit(null);
                    }}
                  >
                    Confirmer
                  </button>



                </div>
              </form>
            </div>
          </div>
        )}


      </div>


      {isModalOpen && (
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

                  {/* Bouton Download */}
                  <button className="Btnyu" type="button" onClick={handleFileButtonClick}>
                    <svg className="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                    <span className="icon2"></span>
                    <span className="tooltipy">Upload</span>
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
                  <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Annuler</button>
                  <button
                    type="button"
                    className="create-btn"
                    onClick={() => {
                      if (
                        newOffer.ref &&
                        newOffer.titre &&
                        newOffer.departement &&
                        newOffer.type &&
                        newOffer.soumission &&
                        newOffer.expiration
                      ) {
                        setOffres([...offres, newOffer]); // Ajouter dans le tableau
                        setNewOffer({ // Réinitialiser le formulaire
                          ref: "",
                          titre: "",
                          departement: "",
                          type: "Stage",
                          soumission: "",
                          expiration: "",
                          description: "",
                          candidatures: 0,
                        });
                        setUploadSuccess(false);
                        setIsModalOpen(false); // Fermer le modal
                      } else {
                        alert("Veuillez remplir tous les champs !");
                      }
                    }}
                  >
                    Créer
                  </button>

                </div>
              </div>
            </form>


          </div>
        </div >
      )
      }


    </RecruterLayout >
  );
}

export default GestionOffres;


