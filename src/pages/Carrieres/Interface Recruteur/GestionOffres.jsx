import React, { useRef, useState } from "react";
import RecruterLayout from './RecruteurLayout';
import ParticlesBackground from '../../../Components/ParticlesBackground';
import GestionOffresL from './GestionOffresL.css';
import Select from "react-select";

function GestionOffres() {
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);


  const offres = [
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
  ];

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


  const handleFilePick = () => {
    fileInputRef.current.click();
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

  <Select
    options={options}
    styles={customStyles}
    placeholder="-- Sélectionner --"
  />

  const filterFieldOptions = [
    { value: "ref", label: "Référence" },
    { value: "departement", label: "Département" },
    { value: "type", label: "Type" },
    { value: "soumission", label: "Date de soumission" },
    { value: "expiration", label: "Date d'expiration" },
    { value: "statut", label: "Statut" },
  ];

  const [selectedFields, setSelectedFields] = useState(
    filterFieldOptions.map((f) => f.value) // tous visibles par défaut
  );

  const handleFieldSelectionChange = (selectedOptions) => {
    const selected = selectedOptions.map((opt) => opt.value);
    setSelectedFields(selected);
    setVisibleFields({
      ref: selected.includes("ref"),
      departement: selected.includes("departement"),
      type: selected.includes("type"),
      soumission: selected.includes("soumission"),
      expiration: selected.includes("expiration"),
      statut: selected.includes("statut"),
    });
  };






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


        <button className="Btny" onClick={handleCreateClick}>
          <div className="signy">+</div>
          <div className="texty">Nouvelle Offre</div>
        </button>
        <div className="download-section" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button className="Download-button" onClick={handleFilePick}>
            <svg viewBox="0 0 640 512" width="20" height="16">
              <path
                fill="white"
                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
              />
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
        </div>
        {/* champs de filtrage */}
        {isFilterVisible && (
          <div className="searchy-form-grid">
            <div className="form-row" style={{ marginBottom: "16px" }}>
              <div className="form-group selecty">
                <label htmlFor="visibleFieldsSelector" style={{ fontWeight: "600" }}>
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
                  <input type="text" id="ref" placeholder="Ex: REF-2025-01" />
                </div>
              )}

              {visibleFields.departement && (
                <div className="form-group removable">
                  <label htmlFor="departement">
                    Département
                    <button type="button" className="close-btn" onClick={() => removeField("departement")}>✕</button>
                  </label>
                  <input type="text" id="departement" placeholder="Ex: Informatique" />
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
                  <input type="date" id="soumission" />
                </div>
              )}

              {visibleFields.expiration && (
                <div className="form-group removable">
                  <label htmlFor="expiration">
                    Date d'expiration
                    <button type="button" className="close-btn" onClick={() => removeField("expiration")}>✕</button>
                  </label>
                  <input type="date" id="expiration" />
                </div>
              )}

              {visibleFields.statut && (
                <div className="form-group removable">
                  <label htmlFor="statut">
                    Statut
                    <button type="button" className="close-btn" onClick={() => removeField("statut")}>✕</button>
                  </label>
                  <Select
                    id="type"
                    options={statusOptions}
                    styles={customStyles}
                    placeholder="-- Sélectionner --"
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
                <th>Réf</th>
                <th>Titre</th>
                <th>Département</th>
                <th>Type</th>
                <th>Date de soumission</th>
                <th>Date d’expiration</th>
                <th>Statut</th>
                <th>Candidatures</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offres.map((offre, index) => {
                const isExpired = new Date(offre.expiration) < new Date();
                return (
                  <tr key={index}>
                    <td>{offre.ref}</td>
                    <td>{offre.titre}</td>
                    <td>{offre.departement}</td>
                    <td>
                      <span
                        className={`type-badge ${offre.type === "CDI" ? "type-cdi" : "type-stage"}`}
                      >
                        {offre.type}
                      </span>
                    </td>
                    <td>{offre.soumission}</td>
                    <td>{offre.expiration}</td>
                    <td>
                      <span className={`status-badge ${isExpired ? "status-expired" : "status-valid"}`}>
                        {isExpired ? "Expirée" : "Valable"}
                      </span>
                    </td>
                    <td>{offre.candidatures}</td>
                    <td>
                      <i className="bi bi-pencil-square action-edit"></i>
                      <i className="bi bi-trash3-fill action-delete"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>


    </RecruterLayout>
  );
}

export default GestionOffres;


