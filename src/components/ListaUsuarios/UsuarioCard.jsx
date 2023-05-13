import React, { useState } from "react";
import "./UsuarioCard.css";
import Card from "react-bootstrap/Card";

const UsuarioCard = ({ name, rol }) => {
  return (
    <div className="usuarioCard">
      <img
        variant="top"
        src="src\assets\img\foto-tob.png"
        className="imgUsuario"
      />
      <div className="infoDeUsuarioCard">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{rol}</Card.Text>
      </div>
    </div>
  );
};

export default UsuarioCard;
