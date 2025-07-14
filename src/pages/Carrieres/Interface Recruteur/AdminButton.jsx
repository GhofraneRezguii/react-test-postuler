import React from "react";

function AdminButton({ adminName, adminImgSrc, onClick }) {
  return (
    <button className="admin-btn" onClick={onClick} aria-label={`Admin: ${adminName}`}>
      <img src={adminImgSrc} alt={`${adminName} avatar`} />
      <span>{adminName}</span>
    </button>
  );
}

export default AdminButton;
