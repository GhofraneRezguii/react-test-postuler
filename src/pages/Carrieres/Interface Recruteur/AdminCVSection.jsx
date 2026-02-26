import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import RecruterLayout from "./RecruteurLayout";
import ParticlesBackground from "../../../Components/ParticlesBackground";
import "./AdminCVSection.css";

function AdminCVSection() {
  const [files, setFiles] = useState([]);
  const [selectedFilesList, setSelectedFilesList] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [minExperience, setMinExperience] = useState(0);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(65);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [classifiedCVs, setClassifiedCVs] = useState({
    recruit: [],
    placement: [],
    reject: []
  });
  const [activeTab, setActiveTab] = useState('recruit');
  const fileInputRef = useRef(null);

  // 🔥 PERSISTANCE LOCALE - Chargement au montage
  useEffect(() => {
    const saved = localStorage.getItem('classifiedCVs');
    if (saved) {
      setClassifiedCVs(JSON.parse(saved));
    }
  }, []);

  // 🔥 PERSISTANCE LOCALE - Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('classifiedCVs', JSON.stringify(classifiedCVs));
  }, [classifiedCVs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.length) {
      alert("Veuillez sélectionner au moins un CV.");
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jobDescription);
    formData.append("min_experience", minExperience);
    formData.append("min_age", minAge);
    formData.append("max_age", maxAge);

    console.log(`📊 Total fichiers sélectionnés: ${files.length}`);
    Array.from(files).forEach((file, index) => {
      console.log(`📤 Fichier ${index}: ${file.name} (${file.size} bytes)`);
      formData.append("files", file);
    });

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/analyze-multiple",
        formData,
        {
          headers: {},
        }
      );

      const data = response.data || {};
      if (!data.top_candidates) data.top_candidates = [];
      setResult(data);
      console.log("✅ Réponse backend:", data);
    } catch (error) {
      console.error("❌ Erreur complète:", error.response?.data || error.message);
      alert("Erreur lors de l'analyse des CV.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 CLASSIFICATION DES CV
  const classifyCV = (filename, category) => {
    const cvData = {
      filename,
      timestamp: new Date().toISOString(),
      category
    };

    setClassifiedCVs(prev => ({
      ...prev,
      [category]: [...prev[category], cvData]
    }));

    // Retirer de la liste des résultats si c'était affiché
    setResult(prev => ({
      ...prev,
      top_candidates: prev?.top_candidates?.filter(cv => cv.filename !== filename) || []
    }));

    console.log(`✅ ${filename} classé en ${category}`);
  };

  // 🔥 GESTION FICHIERS
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    console.log(`🔍 NOUVEAUX fichiers: ${newFiles.length}`);
    
    const hasDuplicate = newFiles.some(newFile => 
      files.some(existing => existing.name === newFile.name && existing.size === newFile.size)
    );
    
    if (hasDuplicate) {
      alert("Certains fichiers sont déjà sélectionnés !");
      e.target.value = '';
      return;
    }
    
    const updatedFiles = [...files, ...newFiles];
    const updatedList = [...selectedFilesList, ...newFiles];
    
    setFiles(updatedFiles);
    setSelectedFilesList(updatedList);
    
    e.target.value = '';
    console.log(`✅ TOTAL: ${updatedFiles.length} fichiers`);
  };

  const removeFile = (fileToRemove) => {
    const updatedFiles = files.filter(f => f !== fileToRemove);
    const updatedList = selectedFilesList.filter(f => f !== fileToRemove);
    
    setFiles(updatedFiles);
    setSelectedFilesList(updatedList);
    console.log(`🗑️ Supprimé. Reste: ${updatedFiles.length} fichiers`);
  };

  const clearAllFiles = () => {
    setFiles([]);
    setSelectedFilesList([]);
  };

  const candidates = result && result.top_candidates ? result.top_candidates : [];

  // 🔥 COMPTES
  const getCount = (category) => classifiedCVs[category].length;

  return (
    <RecruterLayout>
      <ParticlesBackground />

      <div className="header-row">
        <div className="title-column">
          <h2 style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", color: "rgb(0 22 72)", fontWeight: "600", textShadow: "0px 2px 2px #4c87ee" }}>
            Traitement CV
          </h2>
          <h6 className="zoom-animation" style={{ color: "#0048c6", marginLeft: "12px" }}>
            Analyse intelligente et classement automatique
          </h6>
        </div>

        <div className="cardy-itemy">
          <h6>CV sélectionnés</h6>
          <hr />
          <strong style={{color: selectedFilesList.length > 0 ? '#4caf50' : '#666'}}>
            {selectedFilesList.length}
          </strong>
        </div>
      </div>

      <div className="email-cards-container">
        <div className="email-card card-large">
          <h4>Analyse des CV</h4>

          <form onSubmit={handleSubmit} className="cv-form">
            <label>Description du poste (mots-clés)</label>
            <textarea
              placeholder="Ex: Python, React, Machine Learning, 3 ans expérience..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />

            <label>Expérience minimale (années)</label>
            <input 
              type="number" 
              min="0" 
              value={minExperience} 
              onChange={(e) => setMinExperience(Number(e.target.value) || 0)} 
            />

            <label>Âge minimum</label>
            <input 
              type="number" 
              min="18" 
              value={minAge} 
              onChange={(e) => setMinAge(Number(e.target.value) || 18)} 
            />

            <label>Âge maximum</label>
            <input 
              type="number" 
              min="18" 
              value={maxAge} 
              onChange={(e) => setMaxAge(Number(e.target.value) || 65)} 
            />

            <label style={{display: 'block', marginBottom: '5px'}}>
              📁 Sélection des CV (Cliquez plusieurs fois pour ajouter)
            </label>
            <input 
              ref={fileInputRef}
              type="file" 
              multiple 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileChange}
              style={{marginBottom: '15px'}}
            />

            {selectedFilesList.length > 0 && (
              <div style={{
                margin: '15px 0', 
                padding: '15px', 
                background: 'linear-gradient(135deg, #f0f8ff 0%, #e3f2fd 100%)', 
                borderRadius: '8px', 
                border: '2px solid #bbdefb'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <strong style={{color: '#1976d2', fontSize: '16px'}}>
                    📋 {selectedFilesList.length} CV sélectionné(s)
                  </strong>
                  <button 
                    type="button"
                    onClick={clearAllFiles}
                    style={{
                      background: '#ff9800', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '20px', 
                      padding: '6px 12px', 
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    🗑️ Vider tout
                  </button>
                </div>
                
                <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                  {selectedFilesList.map((file, index) => (
                    <div key={`${file.name}-${file.size}-${index}`} style={{
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '10px', 
                      borderBottom: '1px solid #e0e0e0',
                      background: index % 2 === 0 ? '#fff' : '#f5faff'
                    }}>
                      <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
                        <span style={{marginRight: '8px'}}>📄</span>
                        <div>
                          <div style={{fontSize: '14px', fontWeight: '500'}} title={file.name}>
                            {file.name.length > 25 ? file.name.substring(0, 22) + '...' : file.name}
                          </div>
                          <div style={{color: '#666', fontSize: '12px'}}>
                            {(file.size/1024).toFixed(1)} KB
                          </div>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeFile(file)}
                        style={{
                          background: '#f44336', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '50%', 
                          width: '28px',
                          height: '28px', 
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Supprimer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="button-row">
              <button 
                type="submit" 
                className="aff-btn" 
                style={{ color: "#7b2cbf" }} 
                disabled={loading || files.length === 0}
              >
                {loading ? "🔄 Analyse en cours..." : `Analyser`}
              </button>
            </div>
          </form>

          {candidates.length > 0 ? (
            <div className="cv-results">
              <h3>Top {Math.min(5, candidates.length)} candidats :</h3>
              {candidates.slice(0, 5).map((c, index) => (
                <div key={index} className="candidate-card">
                  <h4>#{index + 1} - {c.filename}</h4>
                  <p><strong>Âge :</strong> {c.age} ans</p>
                  <p><strong>Expérience :</strong> {c.experience_years} ans</p>
                  <p><strong>Similarité :</strong> {Math.round(c.similarity * 100)}%</p>
                  <p><strong>Score :</strong> {c.score}</p>
                  <p><strong>Catégorie :</strong> {Array.isArray(c.category) ? c.category[0] : c.category}</p>
                  <p><strong>Segment :</strong> {c.segment}</p>
                  <p>
                    <strong>Compétences détectées :</strong>{" "}
                    {c.skills_detected && c.skills_detected.length > 0 ? c.skills_detected.join(", ") : "Aucune détectée"}
                  </p>
                  <div style={{marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                    <button 
                      onClick={() => classifyCV(c.filename, 'recruit')}
                      style={{
                        background: '#4caf50', color: 'white', border: 'none', 
                        padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
                        fontSize: '14px', fontWeight: '500'
                      }}
                    >
                      ✅ Recruit
                    </button>
                    <button 
                      onClick={() => classifyCV(c.filename, 'placement')}
                      style={{
                        background: '#2196f3', color: 'white', border: 'none', 
                        padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
                        fontSize: '14px', fontWeight: '500'
                      }}
                    >
                      📋 Placement
                    </button>
                    <button 
                      onClick={() => classifyCV(c.filename, 'reject')}
                      style={{
                        background: '#f44336', color: 'white', border: 'none', 
                        padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
                        fontSize: '14px', fontWeight: '500'
                      }}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : result ? (
            <p style={{ marginTop: "20px", color: "red" }}>
              Aucun candidat ne correspond aux critères.
            </p>
          ) : null}
        </div>

        {/* 🔥 PETITE CARTE COMPLÈTE - COULEUR RECRUIT MODIFIÉE */}
        <div className="email-card card-small">
          <h4>📊 Statistiques</h4>
          <div className="varinfo">
            <p>
              🔹 Similarité avec la description du poste<br />
              🔹 Compétences détectées dans le CV<br />
              🔹 Années d'expérience<br />
              🔹 Filtrage par âge<br />
              🔹 Score automatique & classement
            </p>
          </div>

          <div style={{marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #e0e0e0'}}>
            <h4 style={{ 
              fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", 
              color: "rgb(0 22 72)", 
              fontWeight: "600", 
              textShadow: "0px 2px 2px #4c87ee",
              margin: '0 0 15px 0'
            }}>
              📋 CV Classés
            </h4>
            
            <div style={{display: 'flex', gap: '8px', marginBottom: '10px'}}>
              {/* 🔥 BOUTON RECRUIT - NOUVELLE COULEUR #06668C */}
              <button 
                className={`class-tab ${activeTab === 'recruit' ? 'active' : ''}`}
                onClick={() => setActiveTab('recruit')}
                style={{
                  flex: 1, padding: '10px', border: 'none', borderRadius: '8px',
                  background: activeTab === 'recruit' ? '#06668C' : '#e3f2fd',  // 🔥 CHANGÉ ICI
                  color: activeTab === 'recruit' ? 'white' : '#1976d2',
                  cursor: 'pointer', fontWeight: '500'
                }}
              >
                ✅ Recruit ({getCount('recruit')})
              </button>
              
              <button 
                className={`class-tab ${activeTab === 'placement' ? 'active' : ''}`}
                onClick={() => setActiveTab('placement')}
                style={{
                  flex: 1, padding: '10px', border: 'none', borderRadius: '8px',
                  background: activeTab === 'placement' ? '#2196f3' : '#e3f2fd',
                  color: activeTab === 'placement' ? 'white' : '#1976d2',
                  cursor: 'pointer', fontWeight: '500'
                }}
              >
                📋 Placement ({getCount('placement')})
              </button>
              
              <button 
                className={`class-tab ${activeTab === 'reject' ? 'active' : ''}`}
                onClick={() => setActiveTab('reject')}
                style={{
                  flex: 1, padding: '10px', border: 'none', borderRadius: '8px',
                  background: activeTab === 'reject' ? '#f44336' : '#e3f2fd',
                  color: activeTab === 'reject' ? 'white' : '#1976d2',
                  cursor: 'pointer', fontWeight: '500'
                }}
              >
                ❌ Reject ({getCount('reject')})
              </button>
            </div>

            <div style={{
              maxHeight: '200px', overflowY: 'auto', 
              background: '#f8f9fa', borderRadius: '6px', padding: '10px'
            }}>
              {classifiedCVs[activeTab].length > 0 ? (
                classifiedCVs[activeTab].map((cv, index) => (
                  <div key={index} style={{
                    padding: '8px', marginBottom: '5px',
                    background: 'white', borderRadius: '4px',
                    fontSize: '12px', borderLeft: `3px solid ${activeTab === 'recruit' ? '#06668C' : activeTab === 'placement' ? '#2196f3' : '#f44336'}`
                  }}>
                    📄 {cv.filename}
                    <span style={{float: 'right', color: '#666', fontSize: '11px'}}>
                      {new Date(cv.timestamp).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                ))
              ) : (
                <p style={{textAlign: 'center', color: '#666', fontSize: '12px', margin: '10px 0'}}>
                  Aucun CV dans cette catégorie
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </RecruterLayout>
  );
}

export default AdminCVSection;
