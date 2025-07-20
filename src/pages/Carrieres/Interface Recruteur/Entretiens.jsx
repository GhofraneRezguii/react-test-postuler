import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecruterLayout from "./RecruteurLayout";
import ParticlesBackground from "../../../Components/ParticlesBackground";
import 'particles.js';
import EntretiensL from "./EntretiensL.css";

function Entretiens() {
    const [searchTerm, setSearchTerm] = useState("");
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
                        Planification des entretiens
                    </h2>
                    <h6 className="zoom-animation" style={{ color: "#0048c6", marginLeft: "12px" }}>
                        Organisez et gérez facilement vos entretiens avec les candidats.
                    </h6>
                </div>

                {/* btn n EDV */}
                <button class="nE-btn"><sign>+</sign>
                    Nouveau RDV
                    <div className="hoverEffect">
                        <div></div>
                    </div>
                </button>
            </div>

            {/* Search section  */}

            <div className="searchyy-wrapper">
                <div className="searchy-section">
                    <div className="searchy-input-containeri">
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
                            placeholder="Rechercher un RDV, condidat ,poste...."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="searchy-input"
                        />
                    </div>

                    {/* card today date */}
                    <div className="parent">
                        <div className="cardd">
                            <div className="header-inline">
                                <h3>Aujourd'hui</h3>
                                <div className="containeri">
                                    <div className="cloud front">
                                        <span className="left-front"></span>
                                        <span className="right-front"></span>
                                    </div>
                                    <span className="sun sunshine"></span>
                                    <span className="sun"></span>
                                    <div className="cloud back">
                                        <span className="left-back"></span>
                                        <span className="right-back"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="content-box">
                                <span className="cardd-title">3D Card</span>
                                <p className="cardd-content">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </p>
                                <span className="see-more">Calendrier</span>
                            </div>

                            <div className="date-box">
                                <span className="month">JUNE</span>
                                <span className="date">29</span>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </RecruterLayout>
    )
};

export default Entretiens;
