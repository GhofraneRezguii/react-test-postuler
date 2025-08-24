import React, { useRef, useState, useEffect } from "react";
import RecruterLayout from "./RecruteurLayout";
import ParticlesBackground from "../../../Components/ParticlesBackground";
import { getCandidatures } from "../../../api/PostulerApi";
import { getCandidaturesFiltrees } from "../../../api/PostulerApi";
import { createCandidature } from "../../../api/PostulerApi";
import Select from "react-select";
import GestionCondidaturesL from "./GestionCondidaturesL.css";
import axios from "axios";
import { io } from "socket.io-client";

function GestionCondidatures() {
  const [selectedCondidat, setSelectedCondidat] = useState(null);
  const [condidatToDelete, setCondidatToDelete] = useState(null);
  const [condidatToEdit, setCondidatToEdit] = useState(null);
  const [editedCondidat, setEditedCondidat] = useState(null);
  const [showEditCard, setShowEditCard] = useState(false);

  const offerListRef = useRef(null);
  const [showOfferList, setShowOfferList] = useState(false);
  const offers = [
    "Ingénieur développeur en finance de marché - CDIDEV121",
    "Ingénieur R&D Full-Stack - FULLSTACK-CDI",
    "Ingénieur R&D Back-End - BACK_END_CDI",
    "Tech Lead React - TECHLEAD-CDI-2020",
    "Project Management Officer - PMO_2021",
    "Business Developer Junior - BDJUNIOR106",
    "Business Developer Senior - BDCONFIRME105",
    "Consultant Technico-fonctionnel en Finance de Marché",
  ];


  const [stats, setStats] = useState({
    total: 0,
    nouveaux: 0,
    enCours: 0,
    acceptes: 0,
    refuses: 0,
  });

 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resStats = await axios.get("http://localhost:5000/candidature/stats");
        const backendStats = resStats.data;
  
        const data = await getCandidatures();
  
        const storedStatus = JSON.parse(localStorage.getItem("candidaturesStatut") || "{}");
  
        const candidaturesWithStatus = data.map(c => {
          const id = c._id || "";
          return {
            id,
            nom: c.nom,
            prenom: c.prenom,
            email: c.email,
            telephone: c.telephone,
            ref_offre: c.ref_offre || "",
            type: c.typeOffre,
            statut: storedStatus[id] ?? c.statut ?? "nouveau",
            date_condidature: c.createdAt ? new Date(c.createdAt).toISOString().split("T")[0] : "",
            cvFile: c.cvFile,
            motivationFile: c.motivationFile,
            description: c.description,
          };
        });
  
        const statsFront = {
          total: backendStats.total,
          nouveaux: candidaturesWithStatus.filter(c => c.statut === "nouveau").length,
          enCours: candidaturesWithStatus.filter(c => c.statut === "en-cours").length,
          acceptes: candidaturesWithStatus.filter(c => c.statut === "accepté").length,
          refuses: candidaturesWithStatus.filter(c => c.statut === "refusé").length,
        };
  
        setCondidatures(candidaturesWithStatus);
        setStats(statsFront);
      } catch (err) {
        console.error("Erreur chargement des candidatures et stats", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  



  const baseURL = "http://localhost:5000"; // votre backend

  const handleOpenCv = (cvFilePath) => {
    const url = `${baseURL}${cvFilePath}`; // cvFilePath commence par /uploads/cv/nomfile.pdf
    window.open(url, "_blank");
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
    filterFieldOptions.map((f) => f.value).filter((v) => v !== "all") // ✅ retire "all"
  );

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

  const handleCreateCandidat = async () => {
    // Vérification des champs obligatoires et du CV
    if (
      newCondidat.nom &&
      newCondidat.prenom &&
      newCondidat.email &&
      newCondidat.ref_offre &&
      newCondidat.type &&
      newCondidat.statut &&
      newCondidat.date_condidature &&
      newCondidat.telephone &&
      cvFile
    ) {
      try {
        const formData = new FormData();
        formData.append("nom", newCondidat.nom);
        formData.append("prenom", newCondidat.prenom);
        formData.append("email", newCondidat.email);
        formData.append("telephone", newCondidat.telephone);
        formData.append("ref_offre", newCondidat.ref_offre);
        formData.append("typeOffre", newCondidat.type); // stage ou cdi
        formData.append("statut", newCondidat.statut);
        formData.append("date_condidature", newCondidat.date_condidature);
        formData.append("description", newCondidat.description || "");
        formData.append("cvFile", cvFile); // fichier CV obligatoire
        if (motivationFile) formData.append("motivationFile", motivationFile);

        const created = await createCandidature(formData);

        // Ajouter la candidature au tableau
        setCondidatures([created, ...condidats]);

        // Réinitialiser le formulaire
        setNewCondidat({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          ref_offre: "",
          type: "",
          statut: "nouveau",
          date_condidature: "",
          description: "",
        });
        setCvFile(null);
        setMotivationFile(null);
        setUploadSuccess(false);
        setIsModalOpen(false);
      } catch (err) {
        console.error("Erreur création candidature :", err);
        alert("Erreur lors de la création de la candidature");
      }
    } else {
      alert(
        "Veuillez remplir tous les champs obligatoires et sélectionner un CV !"
      );
    }
  };



  

  //   Search item
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const handleActionClick = () => {
    setIsFilterVisible((prev) => !prev);
  };
  //exporter
  const fileInputRefMain = useRef(null);
  const fileInputRefModal = useRef(null);
  const fileInputRef = useRef(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFilePickMain = () => {
    fileInputRefMain.current.click();
  };

  const [cvFile, setCvFile] = useState(null);
  const [motivationFile, setMotivationFile] = useState(null);
  const handleCvFileChange = (e) => {
    if (e.target.files.length > 0) setCvFile(e.target.files[0]);
  };

  const handleMotivationFileChange = (e) => {
    if (e.target.files.length > 0) setMotivationFile(e.target.files[0]);
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
  // const [condidats, setCondidatures] = useState([
  //   {
  //     id: "C001",
  //     nom: "REZGUI",
  //     prenom: "Ghofrane",
  //     email: "ghofranerezgui1911@gmail.com",
  //     ref_offre: "REF0001",
  //     type: "stage",
  //     statut: "en-cours",
  //     date_condidature: "2025-08-01",
  //     titre_offre: "dev Full-Suck",
  //   },
  //   {
  //     id: "C002",
  //     nom: "TRABELSI",
  //     prenom: "Nadia",
  //     email: "nadiatrabelsi@gmail.com",
  //     ref_offre: "REF0002",
  //     type: "CDI",
  //     statut: "accepté",
  //     date_condidature: "2025-08-01",
  //   },
  //   {
  //     id: "C003",
  //     nom: "REZGUI",
  //     prenom: "Hamadi",
  //     email: "hamadirezgui@gmail.com",
  //     ref_offre: "REF0003",
  //     type: "CDI",
  //     statut: "accepté",
  //     date_condidature: "2025-08-01",
  //   },

  //   {
  //     id: "C004",
  //     nom: "TRABELSI",
  //     prenom: "Nadia",
  //     email: "nadiatrabelsi@gmail.com",
  //     ref_offre: "REF0002",
  //     type: "CDI",
  //     statut: "accepté",
  //     date_condidature: "2025-08-01",
  //   },
  //   {
  //     id: "C005",
  //     nom: "GORMAZI",
  //     prenom: "Majd",
  //     email: "majdgormazi@gmail.com",
  //     ref_offre: "REF0001",
  //     type: "stage",
  //     statut: "refusé",
  //     date_condidature: "2025-08-01",
  //   },
  // ]);

  const [condidats, setCondidatures] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // useEffect(() => {
  //   const fetchCandidatures = async () => {
  //     try {
  //       const data = await getCandidatures();
  //       const formattedData = data.map((c, index) => ({
  //         id: c._id || `C${index + 1}`,
  //         nom: c.nom,
  //         prenom: c.prenom,
  //         email: c.email,
  //         ref_offre: c.offres?.[0] || "",
  //         type: c.typeOffre,
  //         statut: "nouveau",
  //         date_condidature: new Date(c.createdAt).toISOString().split("T")[0],
  //         cvFile: c.cvFile,
  //         motivationFile: c.motivationFile,
  //       }));
  //       setCondidatures(formattedData);
  //     } catch (error) {
  //       console.error("Erreur lors du chargement des candidatures :", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCandidatures();
  // }, []);

  const socketRef = useRef(null);

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const data = await getCandidatures();

        const stored = JSON.parse(
          localStorage.getItem("candidaturesStatut") || "{}"
        );

        const formattedData = data.map((c, index) => {
          const id = c._id || `C${index + 1}`; // 🔑 clé stable et utilisée partout

          return {
            id,
            nom: c.nom,
            prenom: c.prenom,
            email: c.email,
            telephone: c.telephone,
            ref_offre: c.ref_offre || "",
            type: c.typeOffre,
            statut: stored[id] ?? "nouveau", // ✅ fallback "nouveau" si rien trouvé
            description: c.description,

            date_condidature: c.createdAt
              ? new Date(c.createdAt).toISOString().split("T")[0]
              : "",
            cvFile: c.cvFile,
            motivationFile: c.motivationFile,
          };
        });
        console.log(formattedData.map(c => ({id: c.id, type: c.type, date_condidature: c.date_condidature})));

        setCondidatures(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidatures();
  }, []);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    // Test de connexion
    socketRef.current.on("connect", () => {
      console.log("Socket.IO connecté :", socketRef.current.id);
    });
    socketRef.current.on("nouvelleCandidature", (candidature) => {
      const stored = JSON.parse(
        localStorage.getItem("candidaturesStatut") || "{}"
      );
      const id = candidature._id;
      console.log("Socket reçu :", candidature);
      const formattedData = {
        id: candidature._id,
        nom: candidature.nom,
        prenom: candidature.prenom,
        telephone: candidature.telephone,
        email: candidature.email,
        ref_offre: candidature.ref_offre || "", // idem

        type: candidature.typeOffre,
        statut: stored[id] ?? "nouveau",
        description: candidature.description,

        date_condidature: new Date(candidature.createdAt)
          .toISOString()
          .split("T")[0],
        cvFile: candidature.cvFile,
        motivationFile: candidature.motivationFile,
      };
      setCondidatures((prev) => [formattedData, ...prev]);
    });
    return () => socketRef.current.disconnect();
  }, []);

  const [newCondidat, setNewCondidat] = useState({
    id: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    ref_offre: "",
    type: "",
    statut: "nouveau",
    date_condidature: "",
    description: "",
  });

  useEffect(() => {
    const fetchFilteredCandidatures = async () => {
      try {
        setLoading(true);
        const queryParams = {
          ...filters,
          searchTerm: searchTerm || undefined,
          fields: selectedFields.join(","), // backend attend une string séparée par des virgules
        };

        const data = await getCandidaturesFiltrees(queryParams);
        const stored = JSON.parse(
          localStorage.getItem("candidaturesStatut") || "{}"
        );
        const formattedData = data.map((c, index) => {
          const id = c._id || `C${index + 1}`; // 🔑 clé stable et utilisée partout

          return {
            id,
            nom: c.nom,
            prenom: c.prenom,
            email: c.email,
            telephone: c.telephone,
            ref_offre: c.ref_offre || "",
            type: c.typeOffre,
            statut: stored[id] ?? c.statut ?? "nouveau", // <-- Ici lire localStorage
            description: c.description,

            date_condidature: c.createdAt
              ? new Date(c.createdAt).toISOString().split("T")[0]
              : "",
            cvFile: c.cvFile,
            motivationFile: c.motivationFile,
          };
        });

        setCondidatures(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredCandidatures();
  }, [filters, searchTerm, selectedFields]); // 🔑 déclenche à chaque changement

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
    telephone: true,
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
      boxShadow: state.isFocused
        ? "0 8px 4px 2px rgba(1, 72, 195, 0.3)"
        : "none",
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

  const handleFieldSelectionChange = (selectedOptions) => {
    if (!selectedOptions) return;

    const selectedValues = selectedOptions.map((opt) => opt.value);

    const allFields = filterFieldOptions
      .map((opt) => opt.value)
      .filter((v) => v !== "all");

    const isAllSelected =
      selectedValues.includes("all") ||
      allFields.every((v) => selectedValues.includes(v));

    const finalSelectedFields = isAllSelected
      ? allFields
      : selectedValues.filter((v) => v !== "all");

    setSelectedFields(finalSelectedFields);

    setVisibleFields({
      id: finalSelectedFields.includes("id"),
      nom: finalSelectedFields.includes("nom"),
      prenom: finalSelectedFields.includes("prenom"),
      telephone: finalSelectedFields.includes("telephone"),
      email: finalSelectedFields.includes("email"),
      ref_offre: finalSelectedFields.includes("ref_offre"),
      statut: finalSelectedFields.includes("statut"),
      type: finalSelectedFields.includes("type"),
      date_condidature: finalSelectedFields.includes("date_condidature"),
    });
  };
  // 🔹 Filtrage des candidats selon la barre de recherche
  const filteredCondidats = condidats.filter(
    (c) =>
      c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ref_offre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Simuler les options sélectionnées au format attendu
    const selectedOptions = filterFieldOptions
      .map((f) => f.value)
      .filter((v) => v !== "all")
      .map(value => ({ value }));
  
    handleFieldSelectionChange(selectedOptions);
  }, []);
  
  useEffect(() => {
    console.log("visibleFields a changé :", visibleFields);
  }, [visibleFields]);
  


  return (
    <RecruterLayout>
      <ParticlesBackground />
      <div className="headerY-row">
        <div className="titleY-column">
          <h2
            style={{
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              color: "rgb(0 22 72)",
              fontWeight: "600",
              textShadow: "0px 2px 2px #4c87ee",
            }}
          >
            Candidatures
          </h2>
          <h6
            className="zoom-animation"
            style={{ color: "#0048c6", marginLeft: "12px" }}
          >
            Consulter et gérer toutes les candidatures réçues
          </h6>
        </div>
        {/* button nouvelle offre */}
        <button className="Btnyyy" onClick={() => setIsModalOpen(true)}>
          <div className="signyy">+</div>
          <div className="textyy">Nouvelle Candidature</div>
        </button>

        <div
          className="download-section"
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          {/* input file caché Exporter */}
          <input
            type="file"
            ref={fileInputRefMain}
            style={{ display: "none" }}
            onChange={handleFileChangeMain}
          />
          <button className="Downloady-button" onClick={handleFilePickMain}>
            {/* icone + texte Exporter */}
            <svg viewBox="0 0 640 512" width="20" height="16">
              <path
                fill="white"
                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
              />
            </svg>
            <span>Importer</span>
          </button>
        </div>
      </div>

      {/* cards */}
      <div className="cardsy-row">
      <div className="cardy-item">
        <h6>Total</h6>
        <hr />
        <strong style={{ color: "#002050" }}>{stats.total}</strong>
      </div>
      <div className="cardy-item">
        <h6>Nouveaux</h6>
        <hr />
        <strong style={{ color: "rgb(211, 133, 24)" }}>{stats.nouveaux}</strong>
      </div>
      <div className="cardy-item">
        <h6>En cours</h6>
        <hr />
        <strong style={{ color: "rgb(132, 11, 146)" }}>{stats.enCours}</strong>
      </div>
      <div className="cardy-item">
        <h6>Acceptés</h6>
        <hr />
        <strong style={{ color: " #039108" }}>{stats.acceptes}</strong>
      </div>
      <div className="cardy-item">
        <h6>Refusés</h6>
        <hr />
        <strong style={{ color: "red" }}>{stats.refuses}</strong>
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
            onClick={() => {
              // 1. Réinitialiser les filtres
              setFilters({
                id: "",
                nom: "",
                prenom: "",
                email: "",
                ref_offre: "",
                type: "",
                statut: "",
                date_condidature: "",
              });

              // 2. Réafficher tous les champs visibles
              setVisibleFields({
                id: true,
                nom: true,
                prenom: true,
                email: true,
                ref_offre: true,
                type: true,
                statut: true,
                date_condidature: true,
              });

              // 3. Réinitialiser les champs sélectionnés dans le select multi
              const allFields = filterFieldOptions
                .map((opt) => opt.value)
                .filter((v) => v !== "all"); // exclure "all"
              setSelectedFields(allFields);
            }}
          >
            Réinitialiser
          </button>
        </div>

        {/* champs de filtrage */}
        {isFilterVisible && (
          <div className="searchy-form-grid">
            <div className="form-row" style={{ marginBottom: "16px" }}>
              <div className="form-group selecty">
                <label
                  htmlFor="visibleFieldsSelector"
                  style={{ fontWeight: "600", fontSize: "18px" }}
                >
                  Champs à afficher
                </label>
                <Select
                  id="visibleFieldsSelector"
                  isMulti
                  closeMenuOnSelect={false}
                  value={filterFieldOptions.filter((option) =>
                    selectedFields.includes(option.value)
                  )}
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
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => removeField("id")}
                    >
                      ✕
                    </button>
                  </label>
                  <input
                    type="text"
                    id="id"
                    placeholder="C001"
                    value={filters.id}
                    onChange={(e) =>
                      setFilters({ ...filters, id: e.target.value })
                    }
                  />
                </div>
              )}

              {visibleFields.nom && (
                <div className="form-group removable">
                  <label htmlFor="nom">
                    Nom
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => removeField("nom")}
                    >
                      ✕
                    </button>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    placeholder="Nom"
                    value={filters.nom}
                    onChange={(e) =>
                      setFilters({ ...filters, nom: e.target.value })
                    }
                  />
                </div>
              )}
              {visibleFields.prenom && (
                <div className="form-group removable">
                  <label htmlFor="prenom">
                    Prénom
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => removeField("prenom")}
                    >
                      ✕
                    </button>
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    placeholder="Prénom"
                    value={filters.prenom}
                    onChange={(e) =>
                      setFilters({ ...filters, prenom: e.target.value })
                    }
                  />
                </div>
              )}
              {visibleFields.email && (
                <div className="form-group removable">
                  <label htmlFor="email">
                    Email
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => removeField("email")}
                    >
                      ✕
                    </button>
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={filters.email}
                    onChange={(e) =>
                      setFilters({ ...filters, email: e.target.value })
                    }
                  />
                </div>
              )}
            </div>

            <div className="form-row">
              {visibleFields.type && (
                <div className="form-group selecty removable">
                  <label htmlFor="type">
                    Type
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => removeField("type")}
                    >
                      ✕
                    </button>
                  </label>
                  <Select
                    id="type"
                    options={options}
                    styles={customStyles}
                    placeholder="-- Sélectionner --"
                    value={options.find((opt) => opt.value === filters.type)}
                    onChange={(selectedOption) =>
                      setFilters({
                        ...filters,
                        type: selectedOption ? selectedOption.value : "",
                      })
                    }
                  />
                </div>
              )}
              {visibleFields.ref_offre && (
                <div className="form-group removable">
                  <label htmlFor="ref_offre">
                    Référence de l'offre
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => removeField("ref_offre")}
                    >
                      ✕
                    </button>
                  </label>
                  <input
                    type="text"
                    id="ref_offre"
                    placeholder="Référence de l'offre"
                    value={filters.ref_offre}
                    onChange={(e) =>
                      setFilters({ ...filters, ref_offre: e.target.value })
                    }
                  />
                </div>
              )}

              {visibleFields.date_condidature && (
                <div className="form-group removable">
                  <label htmlFor="date_condidature">
                    Date de candidature
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => removeField("date_condidature")}
                    >
                      ✕
                    </button>
                  </label>
                  <input
                    type="date"
                    id="date_condidature"
                    value={filters.date_condidature}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        date_condidature: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {visibleFields.statut && (
                <div className="form-group removable">
                  <label htmlFor="statut">
                    Statut
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => removeField("statut")}
                    >
                      ✕
                    </button>
                  </label>
                  <Select
                    id="statut"
                    options={statusOptions}
                    styles={customStyles}
                    placeholder="-- Sélectionner --"
                    value={statusOptions.find(
                      (opt) => opt.value === filters.statut
                    )}
                    onChange={(selectedOption) =>
                      setFilters({
                        ...filters,
                        statut: selectedOption ? selectedOption.value : "",
                      })
                    }
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
                {visibleFields.telephone && <th>Téléphone</th>}
                {visibleFields.ref_offre && <th>Référence de l'offre</th>}
                {visibleFields.type && <th>Type</th>}
                {visibleFields.statut && <th>Statut</th>}
                {visibleFields.date_condidature && (
                  <th> Date de Candidatures</th>
                )}
                <th>Documents</th>
              </tr>
            </thead>

            <tbody>
              {condidats
                .filter((condidat) => {
                  // 🔹 Filtrage par searchTerm
                  const matchesSearch =
                    condidat.nom
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    condidat.prenom
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    condidat.email
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    condidat.ref_offre
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());

                  // 🔹 Filtrage par champs visibles / filtres
                  const matchesFilters =
                    (!filters.id ||
                      condidat.id
                        .toLowerCase()
                        .includes(filters.id.toLowerCase())) &&
                    (!filters.nom ||
                      condidat.nom
                        .toLowerCase()
                        .includes(filters.nom.toLowerCase())) &&
                    (!filters.prenom ||
                      condidat.prenom
                        .toLowerCase()
                        .includes(filters.prenom.toLowerCase())) &&
                    (!filters.email ||
                      condidat.email
                        .toLowerCase()
                        .includes(filters.email.toLowerCase())) &&
                    (!filters.ref_offre ||
                      condidat.ref_offre
                        .toLowerCase()
                        .includes(filters.ref_offre.toLowerCase())) &&
                    (!filters.type ||
                      condidat.type.toLowerCase() ===
                        filters.type.toLowerCase()) &&
                    (!filters.statut ||
                      condidat.statut.toLowerCase() ===
                        filters.statut.toLowerCase()) &&
                    (!filters.date_condidature ||
                      condidat.date_condidature === filters.date_condidature);

                  return matchesSearch && matchesFilters;
                })
                .map((condidat, index) => {
                  return (
                    <tr key={index}>
                      {visibleFields.id && <td>{condidat.id}</td>}
                      {visibleFields.nom && <td>{condidat.nom}</td>}
                      {visibleFields.prenom && <td>{condidat.prenom}</td>}
                      {visibleFields.email && <td>{condidat.email}</td>}
                      {visibleFields.telephone && <td>{condidat.telephone}</td>}

                      {visibleFields.ref_offre && <td>{condidat.ref_offre}</td>}
                      {visibleFields.type && (
                        <td>
                          <span
                            className={`type-badge ${
                              condidat.type?.toLowerCase().trim() === "cdi"
                                ? "type-cdi"
                                : "type-stage"
                            }`}
                          >
                            {condidat.type}
                          </span>
                        </td>
                      )}
                      {visibleFields.soumission && (
                        <td>{condidat.soumission}</td>
                      )}
                      {visibleFields.expiration && (
                        <td>{condidat.expiration}</td>
                      )}
                      {visibleFields.statut && (
                        <td>
                          <select
                            value={condidat.statut}
                            onChange={(e) => {
                              const newStatut = e.target.value;
                          
                              // 1️⃣ Met à jour le state principal des candidatures
                              setCondidatures((prev) => {
                                const updated = prev.map((c) =>
                                  c.id === condidat.id ? { ...c, statut: newStatut } : c
                                );
                          
                                // 2️⃣ Recalcul des stats immédiatement après mise à jour
                                const nouveaux = updated.filter(c => c.statut === "nouveau").length;
                                const enCours = updated.filter(c => c.statut === "en-cours").length;
                                const acceptes = updated.filter(c => c.statut === "accepté").length;
                                const refuses = updated.filter(c => c.statut === "refusé").length;
                          
                                setStats({
                                  total: updated.length,
                                  nouveaux,
                                  enCours,
                                  acceptes,
                                  refuses,
                                });
                          
                                return updated;
                              });
                          
                              // 3️⃣ Sauvegarde dans localStorage
                              const stored = JSON.parse(localStorage.getItem("candidaturesStatut") || "{}");
                              stored[condidat.id] = newStatut;
                              localStorage.setItem("candidaturesStatut", JSON.stringify(stored));
                            }}
                          
                            style={{
                              padding: "4px 8px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                              backgroundColor:
                                condidat.statut === "accepté"
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

                      <td style={{ textAlign: "center" }}>
                        {condidat.date_condidature}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        {/* CV */}
                        {condidat.cvFile && (
                          <i
                            className="bi bi-file-earmark-person cv"
                            style={{ cursor: "pointer", marginRight: "8px" }}
                            title="Voir CV"
                            onClick={() =>
                              window.open(
                                `http://localhost:5000/uploads/cv/${condidat.cvFile}`,
                                "_blank"
                              )
                            }
                          ></i>
                        )}

                        {/* Lettre de motivation */}
                        {condidat.motivationFile && (
                          <i
                            className="bi bi-file-earmark-text lettre"
                            style={{ cursor: "pointer", marginRight: "8px" }}
                            title="Voir Lettre de motivation"
                            target="_blank"
                            onClick={() =>
                              window.open(
                                `http://localhost:5000/uploads/motivation/${condidat.motivationFile}`,
                                "_blank"
                              )
                            }
                          ></i>
                        )}

                        {/* Voir détails */}
                        <i
                          className="bi bi-eye action-see"
                          title="Voir détails"
                          onClick={() => handleViewDetails(condidat)}
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                        ></i>

                        {/* Supprimer */}
                        <i
                          className="bi bi-trash3-fill action-delete"
                          title="Supprimer"
                          onClick={() => setCondidatToDelete(condidat)}
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                        ></i>
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
              <button className="close-btn-overlay" onClick={closeCard}>
                ✕
              </button>
              <h3
                style={{
                  textAlign: "center",
                  fontFamily:
                    "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                  marginBottom: "20px",
                  color: "#002b55",
                  /* Effet lumineux doux */
                  textShadow: `0 0 5px rgba(122, 159, 238, 0.788),
  0 0 10px rgba(69, 119, 235, 0.424),
  0 0 15px rgba(255, 255, 255, 0.2)`,
                }}
              >
                Détails du candidat
              </h3>
              <p>
                <strong style={{ color: "#0a55a0" }}>Id :</strong>{" "}
                {selectedCondidat.id}
              </p>
              <p>
                <strong style={{ color: "#0a55a0" }}>Nom :</strong>{" "}
                {selectedCondidat.nom}
              </p>
              <p>
                <strong style={{ color: "#0a55a0" }}>Prénom :</strong>{" "}
                {selectedCondidat.prenom}
              </p>
              <p>
                <strong style={{ color: "#0a55a0" }}>telephone:</strong>{" "}
                {selectedCondidat.telephone}
              </p>
              <p>
                <strong style={{ color: "#0a55a0" }}>Email :</strong>{" "}
                {selectedCondidat.email}
              </p>
              <p>
                <strong style={{ color: "#0a55a0" }}>Réf_offre :</strong>{" "}
                {selectedCondidat.ref_offre}
              </p>
              <p>
                <strong style={{ color: "#0a55a0" }}>Titre offre :</strong>{" "}
                {selectedCondidat.titre_offre}
              </p>
              <p>
                <strong style={{ color: "#0a55a0" }}>Type :</strong>{" "}
                {selectedCondidat.type}
              </p>
              <p>
                <strong style={{ color: "#0a55a0" }}>Statut :</strong>{" "}
                {selectedCondidat.statut}
              </p>
              <p>
                <strong style={{ color: "#0a55a0" }}>Description :</strong>{" "}
                {selectedCondidat.description || (
                  <span style={{ color: "#888" }}>(Aucune description)</span>
                )}
              </p>

              <p>
                <strong style={{ color: "#0a55a0" }}>
                  Date de candidature :
                </strong>{" "}
                {selectedCondidat.date_condidature}
              </p>
            </div>
          </div>
        )}

        {/* trash action */}
        {condidatToDelete && (
          <div className="overlay-card-backdrop">
            <div className="overlay-card">
              <h3
                style={{
                  textAlign: "center",
                  color: "#8a0505",
                  marginBottom: "15px",
                }}
              >
                Confirmer la suppression
              </h3>
              <p style={{ textAlign: "center", color: "#002b55" }}>
                Êtes-vous sûr de vouloir supprimer l'affichage du condidat
                &nbsp;:{" "}
                <strong>
                  {condidatToDelete.nom}&nbsp;{condidatToDelete.prenom}
                </strong>{" "}
                ?
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  gap: "20px",
                }}
              >
                <button
                  className="create-btn"
                  style={{ backgroundColor: "#d31010" }}
                  onClick={() => {
                    // 👉 Supprimer l'offre sélectionnée du tableau
                    setCondidatures(
                      condidats.filter((o) => o.id !== condidatToDelete.id)
                    );

                    // 👉 Fermer la popup de confirmation
                    setCondidatToDelete(null);

                    // 👉 Optionnel : message ou console
                    console.log(
                      "Suppression confirmée pour :",
                      condidatToDelete.nom,
                      condidatToDelete.prenom
                    );
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 className="modal-title">Ajouter un nouveau condidat</h2>
            <form className="modal-form">
              <div className="form-grid">
                <label>Id</label>
                <input
                  type="text"
                  placeholder="REF-2025-XX"
                  value={newCondidat.id}
                  onChange={(e) =>
                    setNewCondidat({ ...newCondidat, id: e.target.value })
                  }
                />

                <label>Nom</label>
                <input
                  type="text"
                  placeholder="nom condidat"
                  value={newCondidat.nom}
                  onChange={(e) =>
                    setNewCondidat({ ...newCondidat, nom: e.target.value })
                  }
                />
                <label>Prénom</label>
                <input
                  type="text"
                  placeholder="prenom condidat"
                  value={newCondidat.prenom}
                  onChange={(e) =>
                    setNewCondidat({ ...newCondidat, prenom: e.target.value })
                  }
                />
                <label>Téléphone</label>
                <input
                  type="text"
                  placeholder="Ex: 0612345678"
                  value={newCondidat.telephone}
                  onChange={(e) =>
                    setNewCondidat({
                      ...newCondidat,
                      telephone: e.target.value,
                    })
                  }
                />

                <label>Email</label>
                <input
                  type="email"
                  placeholder="email condidat"
                  value={newCondidat.email}
                  onChange={(e) =>
                    setNewCondidat({ ...newCondidat, email: e.target.value })
                  }
                />

                <label>Référence de l'offre</label>
                <input
                  type="text"
                  placeholder="Ex:REF001"
                  value={newCondidat.ref_offre}
                  onFocus={() => setShowOfferList(true)}
                  onChange={(e) =>
                    setNewCondidat({
                      ...newCondidat,
                      ref_offre: e.target.value,
                    })
                  }
                />

                <label>Type</label>
                <select
                  value={newCondidat.type}
                  onChange={(e) =>
                    setNewCondidat({ ...newCondidat, type: e.target.value })
                  }
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="stage">Stage</option>
                  <option value="cdi">CDI</option>
                </select>

                <label>Statut</label>
                <select
                  value={newCondidat.statut}
                  onChange={(e) =>
                    setNewCondidat({ ...newCondidat, statut: e.target.value })
                  }
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="accepté">Accepté</option>
                  <option value="refusé">Refusé</option>
                  <option value="en-cours">En cours</option>
                  <option value="nouveau">Nouveau</option>
                </select>
                <label>Date de candidature</label>
                <input
                  type="date"
                  value={newCondidat.date_condidature}
                  onChange={(e) =>
                    setNewCondidat({
                      ...newCondidat,
                      date_condidature: e.target.value,
                    })
                  }
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
                    onChange={(e) =>
                      setNewCondidat({
                        ...newCondidat,
                        description: e.target.value,
                      })
                    }
                  />

                  {/* Bouton Download */}
                  <button
                    className="Btnyu"
                    type="button"
                    onClick={handleFileButtonClick}
                  >
                    <svg
                      className="svgIcon"
                      viewBox="0 0 384 512"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                    <span className="icon2"></span>
                    <span className="tooltipy">Upload</span>
                  </button>

                  <input
                    type="file"
                    name="cvFile"
                    accept=".pdf,.doc,.docx"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => setCvFile(e.target.files[0])}
                  />

                  {uploadSuccess && (
                    <p
                      style={{
                        color: "green",
                        fontSize: "0.9em",
                        marginTop: "10px",
                      }}
                    >
                      ✅ Document sélectionnée avec succès !
                    </p>
                  )}
                </div>

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="create-btn"
                    onClick={handleCreateCandidat}
                  >
                    Créer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </RecruterLayout>
  );
}

export default GestionCondidatures;
