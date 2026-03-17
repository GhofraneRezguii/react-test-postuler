import React, { useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { LuMessageSquareCode } from "react-icons/lu";
import { ImEyePlus } from "react-icons/im";
import Select from "react-select";
import RecruterLayout from "./RecruteurLayout";
import ParticlesBackground from "../../../Components/ParticlesBackground";
import SendButton from "./SendButton";
import './Emaily.css';

function Emails() {
    const [template, setTemplate] = useState("");
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);
    const [sentCount, setSentCount] = useState(0);
    const [sentEmails, setSentEmails] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSentEmails, setShowSentEmails] = useState(false);
    const formRef = useRef(null);

    const templateOptions = [
        { value: "accuse", label: "Accusé de réception" },
        { value: "entretien", label: "Invitation entretien" },
        { value: "refus", label: "Refus de candidature" },
        { value: "acceptation", label: "Acceptation de candidature" }
    ];

    const templateContent = {
        accuse: {
            subject: "Accusé de réception de votre candidature - {{jobReference}}",
            message: `Bonjour {{firstName}} {{lastName}},\n\nNous accusons réception de votre candidature pour le poste "{{jobTitle}}" (Réf: {{jobReference}}).\n\nVotre dossier va être examiné par notre équipe et nous reviendrons vers vous dans les plus brefs délais.\n\nCordialement,\nL'équipe RH`
        },
        entretien: {
            subject: "Convocation à un entretien pour le poste {{jobTitle}} - {{jobReference}}",
            message: `Bonjour {{firstName}} {{lastName}},\n\nSuite à votre candidature, nous souhaitons vous convier à un entretien pour le poste "{{jobTitle}}" (Réf: {{jobReference}}).\n\nMerci de nous indiquer vos disponibilités.\n\nCordialement,\nL'équipe RH`
        },
        refus: {
            subject: "Suite à votre candidature - {{jobReference}}",
            message: `Bonjour {{firstName}} {{lastName}},\n\nNous vous remercions pour l'intérêt porté à notre entreprise.\n\nCependant, après étude de votre candidature pour le poste "{{jobTitle}}" (Réf: {{jobReference}}), nous sommes au regret de ne pas pouvoir y donner une suite favorable.\n\nNous vous souhaitons une bonne continuation.\n\nCordialement,\nL'équipe RH`
        },
        acceptation: {
            subject: "Félicitations - Votre candidature est retenue ! - {{jobReference}}",
            message: `Bonjour {{firstName}} {{lastName}},\n\nFélicitations ! Votre candidature pour le poste "{{jobTitle}}" (Réf: {{jobReference}}) a été retenue.\n\nNous vous accueillerons avec plaisir au sein de notre équipe.\n\nCordialement,\nL'équipe RH`
        }
    };

    const handleClear = () => {
        setTemplate("");
        setRecipient("");
        setSubject("");
        setMessage("");
    };

    const handleSend = async (e) => {
        e.preventDefault();

        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipient, subject, message })
            });
            const data = await response.json();

            if (data.success) {
                setSent(true);
                setSentCount(prev => prev + 1);
                setSentEmails(prev => [...prev, {
                    recipient,
                    subject,
                    message,
                    date: new Date().toLocaleString()
                }]);
                setTimeout(() => setSent(false), 3000);
                alert("Email envoyé avec succès !");
                handleClear();
            } else {
                alert("Erreur : " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Erreur serveur lors de l'envoi");
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
                <button className="aff-btn" onClick={() => setShowSentEmails(true)}>
                    <ImEyePlus size={25} /> Emails
                </button>
                <div className="cardy-itemy">
                    <h6>Emails envoyés</h6>
                    <hr />
                    <strong style={{ color: "#002050" }}>{sentCount}</strong>
                </div>
            </div>

            <div className="email-cards-container" style={{ display: "flex", gap: "20px" }}>
                <div className="email-card card-large">
                    <h4 style={{ display: "flex", alignItems: "center", gap: "14px", color: "#002050" }}>
                        <IoIosSend size={30} color="#002b55" /> Envoyer un Email
                    </h4>

                    <label>Template d'email (Optionnel)</label>
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
                                '&:hover': { borderColor: '#0048c6' }
                            })
                        }}
                    />

                    <form ref={formRef} onSubmit={handleSend}>
                        <label>
                            Destinataire <span style={{ color: "#002b55" }}>*</span>
                        </label>
                        <input type="email" value={recipient} placeholder="Ex: Condidat@gmail.com" required onChange={(e) => setRecipient(e.target.value)} />

                        <label>
                            Sujet <span style={{ color: "#002b55" }}>*</span>
                        </label>
                        <input type="text" value={subject} placeholder="Ex: Acceptation de condidature" required onChange={(e) => setSubject(e.target.value)} />

                        <label>
                            Message <span style={{ color: "#002b55" }}>*</span>
                        </label>
                        <textarea value={message} placeholder="Message à envoyer au candidat..." required onChange={(e) => setMessage(e.target.value)} rows="5" />

                        <div className="button-row">
                            <SendButton sent={sent} type="submit" />
                            <button type="button" onClick={() => setShowConfirm(true)} className="Clearbutton">
                                Effacer
                            </button>
                        </div>
                    </form>
                </div>

                <div className="email-card card-small">
                    <h4 style={{ display: "flex", alignItems: "center", gap: "8px", color: "#002050" }}>
                        <LuMessageSquareCode size={50} color="#002b55" /> Variables disponibles
                    </h4>
                    <div className="varinfo">
                        <p>
                            <span style={{ color: 'rgb(129, 10, 10)', fontWeight: '600' }}>{"{{ firstName }}"}</span> - Prénom<br />
                            <span style={{ color: 'rgb(129, 10, 10)', fontWeight: '600' }}>{"{{ lastName }}"}</span> - Nom<br />
                            <span style={{ color: 'rgb(129, 10, 10)', fontWeight: '600' }}>{"{{ jobTitle }}"}</span> - Poste<br />
                            <span style={{ color: 'rgb(129, 10, 10)', fontWeight: '600' }}>{"{{ jobReference }}"}</span> - Réf
                        </p>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <div className="modal-overlay">
                    <div className="confirm-card">
                        <h3>Êtes-vous sûr de vouloir effacer ?</h3>
                        <div className="buttons">
                            <button className="yes-btn" onClick={() => { handleClear(); setShowConfirm(false); }}>Oui</button>
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
                                            all: "unset",
                                            display: "block",
                                            width: "100%", height: "4px", backgroundColor: "#002b55",
                                            border: "none", margin: "1rem 0", boxShadow: "0px 5px 10px rgb(52, 99, 241)"
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
    );
}

export default Emails;