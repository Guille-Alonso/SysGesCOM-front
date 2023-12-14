import React from "react";
import Noticias from "./Noticias";
import "./ModalNoticias.css"; 

const ModalNoticias = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <Noticias />
      </div>
    </div>
  );
};

export default ModalNoticias;
