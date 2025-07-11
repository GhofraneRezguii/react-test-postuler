// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import ParticlesBackground from "./ParticlesBackground.js";
import Footer from "./Footer";
import "../App.css";

function Layout({ children }) {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main>{children}</main>
      <Footer/>
    </>
  );
}

export default Layout;
