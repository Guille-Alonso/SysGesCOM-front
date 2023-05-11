import React from "react";
import "./UsuarioCard.css";
import Card from "react-bootstrap/Card";
import "./UsuarioCardBig.css";

const UsuarioCardBig = () => {
  return (
    <div className="contenedorBigCard">
      <div className="usuarioCardBig">
        <img
          variant="top"
          src="src\assets\img\foto-tob.png"
          className="imgUsuarioBig"
        />
        <div className="infoDeUsuarioCardBig">
          <Card.Title>Tobias Alvarez</Card.Title>
          <Card.Text>Area Tecnica y Desarrollo.</Card.Text>
          <Card.Text>********@gmail.com</Card.Text>
          <Card.Text>DNI: **********</Card.Text>
        </div>
      </div>
    </div>
  );
};

export default UsuarioCardBig;
