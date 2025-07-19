import React from "react";
import "./SendButtony.css";

function SendButton({ onClick, sent }) {
  return (
    <button  type="submit"className="Sendbutton" onClick={onClick}>
      <div className="outline"></div>

      <div className={`state state--default ${sent ? "hidden" : ""}`}>
        <div className="icon">
          {/* Icône d'envoi */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1.2em" width="1.2em">
            <g style={{ filter: "url(#shadow)" }}>
              <path
                 
                d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63Z"
              />
              <path
                fill="currentColor"
                d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
              />
            </g>
            <defs>
              <filter id="shadow">
                <feDropShadow floodOpacity="0.6" stdDeviation="0.8" dy="1" dx="0" />
              </filter>
            </defs>
          </svg>
        </div>
        <p>
          <span style={{ "--i": 0 }}>E</span>
          <span style={{ "--i": 1 }}>n</span>
          <span style={{ "--i": 2 }}>v</span>
          <span style={{ "--i": 3 }}>o</span>
          <span style={{ "--i": 4 }}>y </span>
          <span style={{ "--i": 5}}>e</span>
          <span style={{ "--i": 6 }}>r </span>
          <span style={{ "--i": 5 }}>M</span>
          <span style={{ "--i": 6 }}>e</span>
          <span style={{ "--i": 7 }}>s</span>
          <span style={{ "--i": 8 }}>s</span>
          <span style={{ "--i": 9 }}>a</span>
          <span style={{ "--i": 10 }}>g</span>
          <span style={{ "--i": 11 }}>e</span>
        </p>
      </div>

      <div className={`state state--sent ${sent ? "" : "hidden"}`}>
        <div className="icon">
          {/* Icône Sent */}
          <svg stroke="black" strokeWidth="0.5px" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#4f46e5 ">
            <g style={{ filter: "url(#shadow)" }}>
              <path
                d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                fill="#4f46e5 "
              />
              <path
                d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                fill="#4f46e5 "
              />
            </g>
          </svg>
        </div>
        <p>
          <span style={{ "--i": 5 }}>E</span>
          <span style={{ "--i": 6 }}>e</span>
          <span style={{ "--i": 7 }}>n</span>
          <span style={{ "--i": 8 }}>v</span>
          <span style={{ "--i": 8 }}>o</span>
          <span style={{ "--i": 8 }}>y</span>
          <span style={{ "--i": 8 }}>e</span>
          <span style={{ "--i": 8 }}>r</span>
          <span style={{ "--i": 9 }}>!</span>
        </p>
      </div>
    </button>
  );
}

export default SendButton;



