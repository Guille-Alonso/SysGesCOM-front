import React, { useState } from "react";
import "./UsuarioCard.css";
import Card from "react-bootstrap/Card";
import "./UsuarioCardBig.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserPen } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";

const UsuarioCardBig = ({ user }) => {
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal size="lg" show={show} centered onHide={handleClose}>
        <Modal.Body className="usuarioCardBig">
          <div className="bigCardSuperior">
            <img
              variant="top"
              src={
                user.foto !== undefined
                  ? user.foto
                  : "https://us.123rf.com/450wm/hugok1000/hugok10001905/hugok1000190500198/123291745-ilustraci%C3%B3n-de-avatar-de-perfil-predeterminado-en-azul-y-blanco-sin-persona.jpg"
              }
              className="imgUsuarioBig"
            />
            <div className="topicInformation">
              <Card.Title className="titleTopicInfo">{user.nombre}</Card.Title>
              <Card.Title className="titleTopicInfo">
                {user.tipoDeUsuario}
              </Card.Title>
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
              <p className="parrafoInfo">{user.email}</p>
              <span className="spanBigCard">Usuario</span>
              <p className="parrafoInfo">{user.nombreUsuario}</p>
              <span className="spanBigCard">DNI</span>
              <p className="parrafoInfo">{user.dni}</p>
            </div>
            <div className="infoDeUsuarioCardBig2">
              <span className="spanBigCard">Num Afiliado</span>
              <p className="parrafoInfo">{user.afiliado}</p>
              <span className="spanBigCard">Fecha de Nacimiento</span>
              <p className="parrafoInfo">{user.nacimiento}</p>
              <span className="spanBigCard">Turno</span>
              <p className="parrafoInfo">{user.turno}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Button className="botonVerMas" variant="primary" onClick={handleShow}>
        Ver más...
      </Button>
    </>
  );
};

export default UsuarioCardBig;
