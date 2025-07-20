import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import RecruterLayout from "./RecruteurLayout";
import ParticlesBackground from "../../../Components/ParticlesBackground";
import 'particles.js';
import Emaily from './Emaily.css';
import { IoIosSend } from "react-icons/io";
import { LuMessageSquareCode } from "react-icons/lu";
import { ImEyePlus } from "react-icons/im";
import Select from "react-select";
import SendButton from "./SendButton";

function Emails() {
    const [template, setTemplate] = useState("");
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [sentCount, setSentCount] = useState(0);
    const formRef = useRef(null);





    const handleClear = () => {
        setTemplate("");
        setRecipient("");
        setSubject("");
        setMessage("");
    };
    // const handleSend = () => {
    //     if (!recipient || !subject || !message) {
    //         alert("Veuillez remplir tous les champs obligatoires.");
    //         return;
    //     }

    //     // Logique d'envoi (ex: appel backend, envoi email)
    //     console.log("Email envoyé à :", recipient);
    //     console.log("Sujet :", subject);
    //     console.log("Message :", message);
    //     alert("Email envoyé avec succès !");
    //     setSent(true);
    //     setTimeout(() => setSent(false), 2000); // reset après 2s

    // };

    const [sent, setSent] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault(); // bloque le rechargement

        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity(); // Affiche les erreurs natives
            return; // bloque l'envoi
        }

        const success = await fakeSend();

        if (success) {
            setSent(true);
            setSentCount((prev) => prev + 1);

            const newEmail = {
                recipient,
                subject,
                message,
                date: new Date().toLocaleString(),
            };

            setSentEmails((prev) => [...prev, newEmail]);
            setTimeout(() => setSent(false), 3000);
        }
    };






    const fakeSend = () =>
        new Promise((resolve) => {
            setTimeout(() => resolve(true), 1500);
        });




    const [showSentEmails, setShowSentEmails] = useState(false);
    const [sentEmails, setSentEmails] = useState([]);























    const options = [
        { value: "accuse", label: "Accusé de réception" },
        { value: "entretien", label: "Invitation entretien" },
        { value: "refus", label: "Refus de candidature" },
        { value: "acceptation", label: "Acceptation de candidature" }
    ];

    const templateOptions = [
        { value: "accuse", label: "Accusé de réception" },
        { value: "entretien", label: "Invitation entretien" },
        { value: "refus", label: "Refus de candidature" },
        { value: "acceptation", label: "Acceptation de candidature" }
    ];

    const templateContent = {
        accuse: {
            subject: "Accusé de réception de votre candidature - {{jobReference}}",
            message: `Bonjour {{firstName}} {{lastName}},
      
      Nous accusons réception de votre candidature pour le poste "{{jobTitle}}" (Réf: {{jobReference}}).
      
      Votre dossier va être examiné par notre équipe et nous reviendrons vers vous dans les plus brefs délais.
      
      Cordialement,  
      L'équipe RH`
        },
        entretien: {
            subject: "Convocation à un entretien pour le poste {{jobTitle}} - {{jobReference}}",
            message: `Bonjour {{firstName}} {{lastName}},
      
      Suite à votre candidature, nous souhaitons vous convier à un entretien pour le poste "{{jobTitle}}" (Réf: {{jobReference}}).
      
      Merci de nous indiquer vos disponibilités.
      
      Cordialement,  
      L'équipe RH`
        },
        refus: {
            subject: "Suite à votre candidature - {{jobReference}}",
            message: `Bonjour {{firstName}} {{lastName}},
      
      Nous vous remercions pour l'intérêt porté à notre entreprise.
      
      Cependant, après étude de votre candidature pour le poste "{{jobTitle}}" (Réf: {{jobReference}}), nous sommes au regret de ne pas pouvoir y donner une suite favorable.
      
      Nous vous souhaitons une bonne continuation.
      
      Cordialement,  
      L'équipe RH`
        },
        acceptation: {
            subject: "Félicitations - Votre candidature est retenue ! - {{jobReference}}",
            message: `Bonjour {{firstName}} {{lastName}},
      
      Félicitations ! Votre candidature pour le poste "{{jobTitle}}" (Réf: {{jobReference}}) a été retenue.
      
      Nous vous accueillerons avec plaisir au sein de notre équipe.
      
      Cordialement,  
      L'équipe RH`
        }
    };




    return (
        <RecruterLayout>
            <ParticlesBackground />
            <div className="header-row">
                <div className="title-column">
                    <h2 style={{
                        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                        color: " rgb(0 22 72)",
                        fontWeight: "600",
                        textShadow: "0px 2px 2px  #4c87ee"
                    }}>
                        Gestion des Emails
                    </h2>
                    <h6 className="zoom-animation" style={{ color: "#0048c6", marginLeft: "12px" }}>
                        Envoyez des emails aux candidats et gérez vos templates
                    </h6>
                </div>
                {/* btn afficher emails envoyés */}
                <button className="aff-btn" onClick={() => setShowSentEmails(true)}>
                    <ImEyePlus size={25} /> Emails
                </button>

                {/* card */}
                <div className="cardy-itemy">
                    <h6>Emails envoyés</h6>
                    <hr />
                    <strong style={{ color: "#002050" }}>{sentCount}</strong>
                </div>

            </div>

            {/* cards content  */}
            <div className="email-cards-container" style={{ display: "flex", gap: "20px" }}>
                {/* Card Formulaire Email */}
                <div className="email-card card-large" >
                    <h4 style={{ display: "flex", alignItems: "center", gap: "14px", color: "#002050" }}>
                        <IoIosSend size={30} color="#002b55" />
                        Envoyer un Email
                    </h4>
                    <label>Template d'email (Optionel)</label>
                    <Select
                        options={templateOptions}
                        placeholder="--- Choisir template ---"
                        value={templateOptions.find((o) => o.value === template)}
                        onChange={(selectedOption) => {
                            setTemplate(selectedOption.value);
                            const templateData = templateContent[selectedOption.value];
                            if (templateData) {
                                setSubject(templateData.subject);
                                setMessage(templateData.message);
                            }
                        }}
                        styles={{
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused ? 'rgb(11, 46, 110)' : 'white',
                                color: state.isFocused ? 'white' : '#002050',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }),
                            control: (base) => ({
                                ...base,
                                borderColor: '#ccc',
                                boxShadow: '0px 9px 8px  #0048c6',
                                '&:hover': {
                                    borderColor: '#0048c6',
                                }
                            })
                        }}
                    />


                    <form ref={formRef} onSubmit={handleSend}>
                        <label>
                            Destinataire <span style={{ color: "#002b55" }}>*</span>
                        </label>
                        <input
                            type="email"
                            value={recipient}
                            placeholder="Ex: Condidat@gmail.com"
                            required
                            onChange={(e) => setRecipient(e.target.value)}
                        />

                        <label>
                            Sujet <span style={{ color: "#002b55" }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={subject}
                            placeholder="Ex: Acceptation de condidature"
                            required
                            onChange={(e) => setSubject(e.target.value)}
                        />

                        <label>
                            Message <span style={{ color: "#002b55" }}>*</span>
                        </label>
                        <textarea
                            value={message}
                            placeholder="Message à envoyer au candidat..."
                            required
                            onChange={(e) => setMessage(e.target.value)}
                            rows="5"
                        />

                        <div className="button-row">
                            <SendButton sent={sent} onClick={handleSend} />
                            <button type="button" onClick={() => setShowConfirm(true)} className="Clearbutton">
                                <svg viewBox="0 0 448 512" className="svgIcon">
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                </svg>
                            </button>

                        </div>
                    </form>
                </div>


                {/* Deuxième Card (vide pour l’instant) */}
                <div className="email-card card-small" >
                    <h4 style={{ display: "flex", alignItems: "center", gap: "8px", color: "#002050" }}>
                        <LuMessageSquareCode size={50} color="#002b55" />
                        Variables disponibles
                    </h4>
                    <div className="varinfo">
                        <p>
                            <span style={{ color: 'rgb(129, 10, 10)', fontWeight: '600' }}>{"{{ firstName }}"}</span> - Prénom du candidat<br />
                            <span style={{ color: 'rgb(129, 10, 10)', fontWeight: '600' }}>{"{{ lastName }}"}</span> - Nom du candidat<br />
                            <span style={{ color: 'rgb(129, 10, 10)', fontWeight: '600' }}>{"{{ jobTitle }}"}</span> - Titre du poste<br />
                            <span style={{ color: 'rgb(129, 10, 10)', fontWeight: '600' }}>{"{{ jobReference }}"}</span> - Référence de l'offre
                        </p>

                    </div>

                </div>
            </div>
            {showConfirm && (
                <div className="modal-overlay">
                    <div className="confirm-card">
                        <h3>Êtes-vous sûr de vouloir effacer ?</h3>
                        <div className="buttons">
                            <button className="yes-btn" onClick={() => {
                                handleClear();          // appel de la fonction d'effacement
                                setShowConfirm(false);  // fermeture de la carte
                            }}>Oui</button>
                            <button className="no-btn" onClick={() => setShowConfirm(false)}>Non</button>
                        </div>
                    </div>
                </div>
            )}

            {showSentEmails && (
                <div className="emails-modal-overlay">
                    <div className="emails-modal-card">
                        <h3>📬 Emails envoyés</h3>
                        <div className="emails-list">
                            {sentEmails.length === 0 ? (
                                <p>Aucun email envoyé.</p>
                            ) : (
                                sentEmails.map((email, index) => (
                                    <div key={index} className="email-item">
                                        <p><strong>Destinataire:</strong> {email.recipient}</p>
                                        <p><strong>Sujet:</strong> {email.subject}</p>
                                        <p><strong>Message:</strong><br />{email.message}</p>
                                        <p><small><em>Envoyé le : {email.date}</em></small></p>
                                        <hr style={{
                                            all: "unset",                // <-- Réinitialise tous les styles
                                            display: "block",
                                            width: "100%", height: "4px", backgroundColor: "#002b55", border: "none", margin: "1rem 0", boxShadow: "0px 5px 10px rgb(52, 99, 241)"
                                        }} />

                                    </div>
                                ))
                            )}
                        </div>
                        <button className="closey-btn" onClick={() => setShowSentEmails(false)}>Fermer</button>
                    </div>
                </div>
            )}



        </RecruterLayout>
    )
}

export default Emails