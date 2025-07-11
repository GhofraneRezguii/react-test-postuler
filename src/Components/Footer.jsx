import React from "react";
import "./FooterLayout.css";

function Footer() {
  return (
    <footer style={{ padding: "2rem" }}>
      <div className="footer-copy">
        <div className="footer-bg"></div>
        <div className="footer-blob"></div>
        <p>
          © {new Date().getFullYear()} Fininfo Solutions. Tous droits
          réservés | Politique de confidentialité.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
