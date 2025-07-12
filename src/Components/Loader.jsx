// src/components/Loader.jsx
import React from "react";
import "./Loader.css"; // Ton CSS de loader ici

function Loader() {
  return (
    <div className="loader-container">
      {/* Les blocs animés */}
      <div className="top">
        <div className="square">
          <div className="square">
            <div className="square">
              <div className="square">
                <div className="square"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="square">
          <div className="square">
            <div className="square">
              <div className="square">
                <div className="square"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="left">
        <div className="square">
          <div className="square">
            <div className="square">
              <div className="square">
                <div className="square"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="square">
          <div className="square">
            <div className="square">
              <div className="square">
                <div className="square"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Texte affiché après le logo */}
      <p
        style={{
          color: "rgb(5, 51, 131)",
          fontSize: "25px",
          display: "block",
          marginTop: "160px",
          textAlign: "center",
        }}
      >
        Loading...
      </p>
    </div>
  );
}

export default Loader;
