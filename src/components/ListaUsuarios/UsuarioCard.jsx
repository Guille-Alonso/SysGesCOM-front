import React from "react";
import "./UsuarioCard.css";
import Card from "react-bootstrap/Card";

const UsuarioCard = (props) => {
  return (
    <div className="usuarioCard">
      <img
        variant="top"
        src="src\assets\img\foto-tob.png"
        className="imgUsuario"
      />
      <div className="infoDeUsuarioCard">
        <Card.Title>Tobias Alvarez</Card.Title>
        <Card.Text>Area Tecnica y Desarrollo.</Card.Text>
      </div>
    </div>
  );
};

export default UsuarioCard;
