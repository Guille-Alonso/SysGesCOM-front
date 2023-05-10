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
          className="imgUsuario"
        />
        <div className="infoDeUsuarioCardBig">
          <Card.Title>Tobias Alvarez</Card.Title>
          <Card.Text>Area Tecnica y Desarrollo.</Card.Text>
          <Card.Text>tosal1099@gmail.com</Card.Text>
          <Card.Text>DNI: 42270169</Card.Text>
        </div>
      </div>
    </div>
  );
};

export default UsuarioCardBig;
