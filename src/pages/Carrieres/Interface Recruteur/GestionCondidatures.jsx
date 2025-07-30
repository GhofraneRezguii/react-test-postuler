import React, { useRef, useState,useEffect } from "react";
import RecruterLayout from './RecruteurLayout';
import ParticlesBackground from '../../../Components/ParticlesBackground';
import { getAllCandidatures } from "../../../api/PostulerApi";
import Select from "react-select";
import GestionCondidaturesL from './GestionCondidaturesL.css';

function GestionCondidatures() {

    const [selectedCondidat, setSelectedCondidat] = useState(null);  
    const [condidatToDelete, setCondidatToDelete] = useState(null);
    const [condidatToEdit, setCondidatToEdit] = useState(null);
    const [editedCondidat, setEditedCondidat] = useState(null);
    const [showEditCard, setShowEditCard] = useState(false);

    const [filters, setFilters] = useState({
        id: "",
        nom: "",
        prenom: "",
        email: "",
        ref_offre: "",
        type: "",
        statut: "",
        date_condidature: "",
    });





    const handleViewDetails = (condidat) => {
        setSelectedCondidat(condidat);
    };

    const closeCard = () => {
        setSelectedCondidat(null);
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

    //   Search item 
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const handleActionClick = () => {
        setIsFilterVisible(prev => !prev);
    };
    //exporter
    const fileInputRefMain = useRef(null);
    const fileInputRefModal = useRef(null);
    const fileInputRef = useRef(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);


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
    const [formData, setFormData] = useState({
        description: "",
        image: null,
    });
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
    // nouvelle codidat
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [condidats, setCondidatures] = useState([
        {
            id: "C001",
            nom: "REZGUI",
            prenom: "Ghofrane",
            email: "ghofranerezgui1911@gmail.com",
            ref_offre: "REF0001",
            type: "stage",
            statut: "en-cours",
            date_condidature: "2025-08-01",
            titre_offre: "dev Full-Suck"
        },
        {
            id: "C002",
            nom: "TRABELSI",
            prenom: "Nadia",
            email: "nadiatrabelsi@gmail.com",
            ref_offre: "REF0002",
            type: "CDI",
            statut: "accepté",
            date_condidature: "2025-08-01",
        },
        {
            id: "C003",
            nom: "REZGUI",
            prenom: "Hamadi",
            email: "hamadirezgui@gmail.com",
            ref_offre: "REF0003",
            type: "CDI",
            statut: "accepté",
            date_condidature: "2025-08-01",
        },

        {
            id: "C004",
            nom: "TRABELSI",
            prenom: "Nadia",
            email: "nadiatrabelsi@gmail.com",
            ref_offre: "REF0002",
            type: "CDI",
            statut: "accepté",
            date_condidature: "2025-08-01",
        },
        {
            id: "C005",
            nom: "GORMAZI",
            prenom: "Majd",
            email: "majdgormazi@gmail.com",
            ref_offre: "REF0001",
            type: "stage",
            statut: "refusé",
            date_condidature: "2025-08-01",
        },

    ]);


    // const [condidats, setCondidatures] = useState([]);
    // const [loading, setLoading] = useState(true); 
    
    // useEffect(() => {
    //   const fetchCandidatures = async () => {
    //     try {
    //       const data = await getAllCandidatures(); 
    //       setCondidatures(data);
    //     } catch (error) {
    //       console.error("Erreur lors du chargement des candidatures :", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    
    //   fetchCandidatures();
    // }, []);
    

    const [newCondidat, setNewCondidat] = useState({
        id: "",
        nom: "",
        prenom: "",
        email: "",
        ref_offre: "",
        type: "",
        statut: "nouveau",
        date_condidature: "",
        description: "",
    });










    const statusOptions = [
        { value: "accepté", label: "Accepté" },
        { value: "refusé", label: "Refusé" },
        { value: "nouveau", label: "Nouveau" },
        { value: "en-cours", label: "En cours" },
    ];
    const options = [
        { value: "CDI", label: "CDI" },
        { value: "Stage", label: "Stage" },
    ];
    //  visibilité champ filtrage  
    const [visibleFields, setVisibleFields] = useState({
        id: true,
        nom: true,
        prenom: true,
        email: true,
        ref_offre: true,
        type: true,
        statut: true,
        date_condidature: true,
    });
    const removeField = (field) => {
        setVisibleFields((prev) => ({ ...prev, [field]: false }));
    };

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
        { value: "id", label: "Id" },
        { value: "nom", label: "Nom" },
        { value: "prenom", label: "Prénom" },
        { value: "email", label: "Email" },
        { value: "ref_offre", label: "Référence de l'offre" },
        { value: "statut", label: "Statut" },
        { value: "type", label: "Type" },
        { value: "date_condidature", label: "Date de condidature" },
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
            id: finalSelectedFields.includes("id"),
            nom: finalSelectedFields.includes("nom"),
            prenom: finalSelectedFields.includes("prenom"),
            email: finalSelectedFields.includes("email"),
            ref_offre: finalSelectedFields.includes("ref_offre"),
            statut: finalSelectedFields.includes("statut"),
            type: finalSelectedFields.includes("type"),
            date_condidature: finalSelectedFields.includes("date_condidature")
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
                        Condidatures
                    </h2>
                    <h6 className="zoom-animation" style={{ color: "#0048c6", marginLeft: "12px" }}>
                        Consulter et gérer toutes les condidatures réçues
                    </h6>
                </div>
                {/* button nouvelle offre */}
                <button className="Btnyyy" onClick={() => setIsModalOpen(true)}>
                    <div className="signyy">+</div>
                    <div className="textyy">Nouvelle Condidature</div>
                </button>

                <div className="download-section" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    {/* input file caché Exporter */}
                    <input
                        type="file"
                        ref={fileInputRefMain}
                        style={{ display: 'none' }}
                        onChange={handleFileChangeMain}
                    />
                    <button className="Downloady-button" onClick={handleFilePickMain}>
                        {/* icone + texte Exporter */}
                        <svg viewBox="0 0 640 512" width="20" height="16">
                            <path fill="white" d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" />
                        </svg>
                        <span>Importer</span>
                    </button>
                </div>

            </div>

            {/* cards */}
            <div className="cardsy-row">
                <div className="cardy-item">
                    <h6>Total</h6>
                    <hr></hr>
                    <strong style={{ color: "#002050" }}>35</strong>
                </div>
                <div className="cardy-item">
                    <h6>Nouveaux</h6>
                    <hr></hr>
                    <strong style={{ color: "rgb(211, 133, 24)" }}>8</strong>
                </div>
                <div className="cardy-item">
                    <h6>En cours</h6>
                    <hr></hr>
                    <strong style={{ color: "rgb(132, 11, 146)" }}>10</strong>
                </div>
                <div className="cardy-item">
                    <h6>Acceptés</h6>
                    <hr></hr>
                    <strong style={{ color: " #039108" }}>18</strong>
                </div>
                <div className="cardy-item">
                    <h6>Refusés</h6>
                    <hr></hr>
                    <strong style={{ color: "red" }}>17</strong>
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
                            placeholder="Rechercher par nom, prénon,email, référence d'offre..."
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
                            id: "",
                            nom: "",
                            prenom: "",
                            email: "",
                            ref_offre: "",
                            type: "",
                            statut: "",
                            date_condidature: "",
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
                                <label htmlFor="visibleFieldsSelector" style={{ fontWeight: "600", fontSize: "18px" }}>
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
                            {visibleFields.id && (
                                <div className="form-group removable">
                                    <label htmlFor="id">
                                        Id
                                        <button type="button" className="close-btn" onClick={() => removeField("id")}>✕</button>
                                    </label>
                                    <input
                                        type="text"
                                        id="id"
                                        placeholder="C001"
                                        value={filters.id}
                                        onChange={(e) => setFilters({ ...filters, id: e.target.value })}
                                    />

                                </div>
                            )}

                            {visibleFields.nom && (
                                <div className="form-group removable">
                                    <label htmlFor="nom">
                                        Nom
                                        <button type="button" className="close-btn" onClick={() => removeField("nom")}>✕</button>
                                    </label>
                                    <input
                                        type="text"
                                        id="nom"
                                        placeholder="Nom"
                                        value={filters.nom}
                                        onChange={(e) => setFilters({ ...filters, nom: e.target.value })}
                                    />
                                </div>
                            )}
                            {visibleFields.prenom && (
                                <div className="form-group removable">
                                    <label htmlFor="prenom">
                                        Prénom
                                        <button type="button" className="close-btn" onClick={() => removeField("prenom")}>✕</button>
                                    </label>
                                    <input
                                        type="text"
                                        id="prenom"
                                        placeholder="Prénom"
                                        value={filters.prenom}
                                        onChange={(e) => setFilters({ ...filters, prenom: e.target.value })}
                                    />
                                </div>
                            )}
                            {visibleFields.email && (
                                <div className="form-group removable">
                                    <label htmlFor="email">
                                        Email
                                        <button type="button" className="close-btn" onClick={() => removeField("email")}>✕</button>
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        placeholder="Email"
                                        value={filters.email}
                                        onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                                    />
                                </div>
                            )}


                        </div>

                        <div className="form-row">
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
                            {visibleFields.ref_offre && (
                                <div className="form-group removable">
                                    <label htmlFor="ref_offre">
                                        Référence de l'offre
                                        <button type="button" className="close-btn" onClick={() => removeField("ref_offre")}>✕</button>
                                    </label>
                                    <input
                                        type="text"
                                        id="ref_offre"
                                        placeholder="Référence de l'offre"
                                        value={filters.ref_offre}
                                        onChange={(e) => setFilters({ ...filters, ref_offre: e.target.value })}
                                    />
                                </div>
                            )}

                            {visibleFields.date_condidature && (
                                <div className="form-group removable">
                                    <label htmlFor="date_condidature">
                                        Date de condidature
                                        <button type="button" className="close-btn" onClick={() => removeField("date_condidature")}>✕</button>
                                    </label>
                                    <input
                                        type="date"
                                        id="date_condidature"
                                        value={filters.date_condidature}
                                        onChange={(e) => setFilters({ ...filters, date_condidature: e.target.value })}
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

           {/* ******************************************** */}

                {/* <button
                    className="resety-button"
                    onClick={() =>
                        setFilters({
                            id: "",
                            nom: "",
                            prenom: "",
                            email: "",
                            ref_offre: "",
                            type: "",
                            statut: "",
                            date_condidature: "",
                        })
                    }
                >
                    Réinitialiser 
                </button> */}

               {/* **************************************** */}



                <div className="table-wrapper">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                {visibleFields.id && <th>ID</th>}
                                {visibleFields.nom && <th>Nom</th>}
                                {visibleFields.prenom && <th>Prénom</th>}
                                {visibleFields.email && <th>Email</th>}
                                {visibleFields.ref_offre && <th>Référence de l'offre</th>}
                                {visibleFields.type && <th>Type</th>}
                                {visibleFields.statut && <th>Statut</th>}
                                {visibleFields.date_condidature && <th> Date de Candidatures</th>}
                                <th>Documents</th>
                            </tr>
                        </thead>

                        <tbody>
                            {condidats
                                .filter((condidat) => {
                                    return (
                                        (!filters.id || condidat.id.toLowerCase().includes(filters.id.toLowerCase())) &&
                                        (!filters.nom || condidat.nom.toLowerCase().includes(filters.nom.toLowerCase())) &&
                                        (!filters.prenom || condidat.prenom.toLowerCase().includes(filters.prenom.toLowerCase())) &&
                                        (!filters.email || condidat.email.toLowerCase().includes(filters.email.toLowerCase())) &&
                                        (!filters.ref_offre || condidat.ref_offre.toLowerCase().includes(filters.ref_offre.toLowerCase())) &&
                                        (!filters.type || condidat.type.toLowerCase() === filters.type.toLowerCase()) &&
                                        (!filters.statut || condidat.statut.toLowerCase() === filters.statut.toLowerCase()) &&
                                        (!filters.date_condidature || condidat.date_condidature === filters.date_condidature)
                                    );
                                })
                                .map((condidat, index) => {




                                    return (
                                        <tr key={index}>
                                            {visibleFields.id && <td>{condidat.id}</td>}
                                            {visibleFields.nom && <td>{condidat.nom}</td>}
                                            {visibleFields.prenom && <td>{condidat.prenom}</td>}
                                            {visibleFields.email && <td>{condidat.email}</td>}
                                            {visibleFields.ref_offre && <td>{condidat.ref_offre}</td>}
                                            {visibleFields.type && (
                                                <td>
                                                    <span
                                                        className={`type-badge ${condidat.type === "CDI" ? "type-cdi" : "type-stage"
                                                            }`}
                                                    >
                                                        {condidat.type}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleFields.soumission && <td>{condidat.soumission}</td>}
                                            {visibleFields.expiration && <td>{condidat.expiration}</td>}
                                            {visibleFields.statut && (
                                                <td>
                                                    <select
                                                        value={condidat.statut}
                                                        onChange={(e) => {
                                                            const updatedStatuts = [...condidats];
                                                            updatedStatuts[index].statut = e.target.value;
                                                            setCondidatures(updatedStatuts);
                                                        }}
                                                        style={{
                                                            padding: "4px 8px",
                                                            borderRadius: "6px",
                                                            border: "1px solid #ccc",
                                                            backgroundColor: condidat.statut === "accepté"
                                                                ? "#9bdea4"
                                                                : condidat.statut === "refusé"
                                                                    ? "#f1b5aa"
                                                                    : condidat.statut === "en-cours"
                                                                        ? "#fcbef9"
                                                                        : condidat.statut === "nouveau"
                                                                            ? "rgb(183, 240, 250)"
                                                                            : "#333",
                                                            color:
                                                                condidat.statut === "accepté"
                                                                    ? "green"
                                                                    : condidat.statut === "refusé"
                                                                        ? "red"
                                                                        : condidat.statut === "en-cours"
                                                                            ? "#a000b0"
                                                                            : condidat.statut === "nouveau"
                                                                                ? "rgb(5, 73, 85)"
                                                                                : "white",
                                                        }}
                                                    >
                                                        <option value="nouveau">Nouveau</option>
                                                        <option value="en-cours">En cours</option>
                                                        <option value="accepté">Accepté</option>
                                                        <option value="refusé">Refusé</option>
                                                    </select>
                                                </td>
                                            )}


                                            <td style={{ textAlign: "center" }}>{condidat.date_condidature}</td>

                                            <td>
                                                <div className="document-icons">
                                                    <i
                                                        className="bi bi-file-earmark-text lettre"
                                                        title="Lettre de motivation"
                                                    ></i>

                                                    <i
                                                        className="bi bi-file-earmark-person cv"
                                                        title="CV"
                                                    ></i>

                                                    <i
                                                        className="bi bi-eye action-see"
                                                        title="Voir détails"
                                                        onClick={() => handleViewDetails(condidat)}
                                                    ></i>

                                                    <i
                                                        className="bi bi-trash3-fill action-delete"
                                                        title="Supprimer"
                                                        onClick={() => setCondidatToDelete(condidat)}
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
                {selectedCondidat && (
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
                            <p><strong style={{ color: "#0a55a0" }}>Id :</strong> {selectedCondidat.id}</p>
                            <p><strong style={{ color: "#0a55a0" }}>Nom :</strong> {selectedCondidat.nom}</p>
                            <p><strong style={{ color: "#0a55a0" }}>Prénom :</strong> {selectedCondidat.prenom}</p>
                            <p><strong style={{ color: "#0a55a0" }}>Email :</strong> {selectedCondidat.email}</p>
                            <p><strong style={{ color: "#0a55a0" }}>Réf_offre :</strong> {selectedCondidat.ref_offre}</p>
                            <p><strong style={{ color: "#0a55a0" }}>Titre offre :</strong> {selectedCondidat.titre_offre}</p>
                            <p><strong style={{ color: "#0a55a0" }}>Type :</strong> {selectedCondidat.type}</p>
                            <p><strong style={{ color: "#0a55a0" }}>Statut :</strong> {selectedCondidat.statut}</p>
                            <p><strong style={{ color: "#0a55a0" }}>Date de condidature :</strong> {selectedCondidat.date_condidature}</p>

                        </div>
                    </div>
                )}


                {/* trash action */}
                {condidatToDelete && (
                    <div className="overlay-card-backdrop">
                        <div className="overlay-card">
                            <h3 style={{ textAlign: "center", color: "#8a0505", marginBottom: "15px" }}>
                                Confirmer la suppression
                            </h3>
                            <p style={{ textAlign: "center", color: "#002b55" }}>
                                Êtes-vous sûr de vouloir supprimer l'affichage du  condidat  &nbsp;: <strong>{condidatToDelete.nom}&nbsp;{condidatToDelete.prenom}</strong> ?
                            </p>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                                <button
                                    className="create-btn"
                                    style={{ backgroundColor: "#d31010" }}
                                    onClick={() => {
                                        // 👉 Supprimer l'offre sélectionnée du tableau
                                        setCondidatures(condidats.filter(o => o.id !== condidatToDelete.id));

                                        // 👉 Fermer la popup de confirmation
                                        setCondidatToDelete(null);

                                        // 👉 Optionnel : message ou console
                                        console.log("Suppression confirmée pour :", condidatToDelete.nom, condidatToDelete.prenom);
                                    }}
                                >
                                    Confirmer
                                </button>

                                <button
                                    className="cancel-btn"
                                    onClick={() => setCondidatToDelete(null)}
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {
                isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-card">
                            <h2 className="modal-title">Ajouter une nouvelle condidat</h2>
                            <form className="modal-form">
                                <div className="form-grid">
                                    <label>Id</label>
                                    <input
                                        type="text"
                                        placeholder="REF-2025-XX"
                                        value={newCondidat.id}
                                        onChange={(e) => setNewCondidat({ ...newCondidat, id: e.target.value })}
                                    />

                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        placeholder="nom condidat"
                                        value={newCondidat.nom}
                                        onChange={(e) => setNewCondidat({ ...newCondidat, nom: e.target.value })}
                                    />
                                    <label>Prénom</label>
                                    <input
                                        type="text"
                                        placeholder="prenom condidat"
                                        value={newCondidat.prenom}
                                        onChange={(e) => setNewCondidat({ ...newCondidat, prenom: e.target.value })}
                                    />
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="email condidat"
                                        value={newCondidat.email}
                                        onChange={(e) => setNewCondidat({ ...newCondidat, email: e.target.value })}
                                    />

                                    <label>Référence de l'offre</label>
                                    <input
                                        type="text"
                                        placeholder="Ex:REF001"
                                        value={newCondidat.ref_offre}
                                        onChange={(e) => setNewCondidat({ ...newCondidat, ref_offre: e.target.value })}
                                    />

                                    <label>Type</label>
                                    <select
                                        value={newCondidat.type}
                                        onChange={(e) => setNewCondidat({ ...newCondidat, type: e.target.value })}
                                    >
                                        <option value="">-- Sélectionner --</option>
                                        <option value="Stage">Stage</option>
                                        <option value="CDI">CDI</option>

                                    </select>

                                    <label>Statut</label>
                                    <select
                                        value={newCondidat.statut}
                                        onChange={(e) => setNewCondidat({ ...newCondidat, statut: e.target.value })}
                                    >
                                        <option value="">-- Sélectionner --</option>
                                        <option value="accepté">Accepté</option>
                                        <option value="refusé">Refusé</option>
                                        <option value="en-cours">En cours</option>
                                        <option value="nouveau">Nouveau</option>

                                    </select>
                                    <label>Date de condidature</label>
                                    <input
                                        type="date"
                                        value={newCondidat.date_condidature}
                                        onChange={(e) => setNewCondidat({ ...newCondidat, date_condidature: e.target.value })}
                                    />

                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <div className="desc-upload-container">
                                        <textarea
                                            rows="4"
                                            placeholder="Décris notes..."
                                            name="description"
                                            value={newCondidat.description}
                                            onChange={(e) => setNewCondidat({ ...newCondidat, description: e.target.value })}
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
                                            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleFileSelect}
                                        />

                                        {uploadSuccess && (
                                            <p style={{ color: "green", fontSize: "0.9em", marginTop: "10px" }}>
                                                ✅ Document sélectionnée avec succès !
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
                                                    newCondidat.id &&
                                                    newCondidat.nom &&
                                                    newCondidat.prenom &&
                                                    newCondidat.email &&
                                                    newCondidat.ref_offre &&
                                                    newCondidat.type &&
                                                    newCondidat.statut &&
                                                    newCondidat.date_condidature

                                                ) {
                                                    setCondidatures([...condidats, newCondidat]); // Ajouter dans le tableau
                                                    setNewCondidat({ // Réinitialiser le formulaire
                                                        id: "",
                                                        nom: "",
                                                        prenom: "",
                                                        email: "",
                                                        ref_offre: "",
                                                        type: "",
                                                        statut: "",
                                                        date_condidature: "",
                                                        description: "",

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

export default GestionCondidatures;