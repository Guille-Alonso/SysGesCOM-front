import React, { useState } from "react";
import "./UsuarioCard.css";
import Card from "react-bootstrap/Card";
import "./UsuarioCardBig.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserPen } from "@fortawesome/free-solid-svg-icons";

const UsuarioCardBig = () => {
  const [changeIcon, setChangeIcon] = useState(false);
  const handleClick1 = () => {
    setChangeIcon(!changeIcon);
    const paragraphs = document.querySelectorAll("p.parrafoInfo");

    // Crea nuevos elementos <input> y reemplaza los elementos <p> existentes
    paragraphs.forEach((p) => {
      const inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.value = p.textContent;
      inputElement.className = p.className;
      p.parentNode.replaceChild(inputElement, p);
    });
  };

  const handleClick2 = () => {
    setChangeIcon(!changeIcon);
    const inputElements = document.querySelectorAll(
      'input[type="text"].parrafoInfo'
    );

    // Crea nuevos elementos <p> y reemplaza los elementos <input> existentes
    inputElements.forEach((input) => {
      const pElement = document.createElement("p");
      pElement.textContent = input.value;
      pElement.className = input.className;
      input.parentNode.replaceChild(pElement, input);
    });
  };

  return (
    <div className="contenedorBigCard">
      <div className="usuarioCardBig">
        <div className="bigCardSuperior">
          <img
            variant="top"
            src="src\assets\img\foto-tob.png"
            className="imgUsuarioBig"
          />
          <div className="topicInformation">
            <Card.Title className="titleTopicInfo">Tobias Alvarez</Card.Title>
            <Card.Title className="titleTopicInfo">Area Tecnica</Card.Title>
          </div>
          <section>
            <FontAwesomeIcon
              onClick={handleClick1}
              className="iconoEditUser1"
              icon={faUserPen}
            />
            {changeIcon && (
              <FontAwesomeIcon
                onClick={handleClick2}
                className="iconoEditUser2"
                icon={faUserCheck}
                style={{ color: "#46ce68" }}
                beat
              />
            )}
          </section>
        </div>
        <div className="infoDiv">
          <div className="infoDeUsuarioCardBig1">
            <span className="spanBigCard">Email</span>
            <p className="parrafoInfo">********@gmail.com</p>
            <span className="spanBigCard">Usuario</span>
            <p className="parrafoInfo">tsa.ortiz</p>
            <span className="spanBigCard">DNI</span>
            <p className="parrafoInfo">**********</p>
          </div>
          <div className="infoDeUsuarioCardBig2">
            <span className="spanBigCard">Fecha de Nacimiento</span>
            <p className="parrafoInfo">20/12/1999</p>
            <span className="spanBigCard">Num Afiliado</span>
            <p className="parrafoInfo">28347</p>
            <span className="spanBigCard">Turno</span>
            <p className="parrafoInfo">Tarde</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioCardBig;
