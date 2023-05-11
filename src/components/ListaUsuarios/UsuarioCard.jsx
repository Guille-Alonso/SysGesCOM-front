import React, { useState } from "react";
import "./UsuarioCard.css";
import Card from "react-bootstrap/Card";
import UsuarioCardBig from "./UsuarioCardBig";

const UsuarioCard = ({ onClick }) => {
  const [sizeCard, setSizeCard] = useState(false);

  return (
    <div className="usuarioCard" onClick={() => setSizeCard(!sizeCard)}>
      {sizeCard && <UsuarioCardBig />}
      <img
        variant="top"
        src="src\assets\img\foto-tob.png"
        className="imgUsuario"
      />
      <div className="infoDeUsuarioCard">
        <Card.Title>Tobias Alvarez</Card.Title>
        <Card.Text>Area Tecnica y Desarrollo.</Card.Text>
        <button onClick={onClick}>hola</button>
      </div>
    </div>
  );
};

export default UsuarioCard;
