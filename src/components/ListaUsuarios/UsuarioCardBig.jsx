import React, { useState } from "react";
import "./UsuarioCard.css";
import Card from "react-bootstrap/Card";
import "./UsuarioCardBig.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserPen } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import axios from "../../config/axios";
import { toast } from "react-toastify";

const UsuarioCardBig = ({ user, getUsers }) => {
  const [changeIcon, setChangeIcon] = useState(false);
  const [nombre, setNombre] = useState(user.nombre || ""); // Valor predeterminado: ""
  const [email, setEmail] = useState(user.email || ""); // Valor predeterminado: ""
  const [dni, setDni] = useState(user.dni || ""); // Valor predeterminado: ""
  const [afiliado, setAfiliado] = useState(user.afiliado || ""); // Valor predeterminado: ""
  const [nacimiento, setNacimiento] = useState(user.nacimiento || ""); // Valor predeterminado: ""
  const [turno, setTurno] = useState(user.turno || ""); // Valor predeterminado: ""
  const [show, setShow] = useState(false);

  const handleClick1 = () => {
    setChangeIcon(!changeIcon);
  };

  const handleClick2 = () => {
    setChangeIcon(!changeIcon);
  };

  const handleSave = () => {
    handleClick2();

    const updatedUser = {
      nombre,
      email,
      dni,
      afiliado,
      nacimiento,
      turno,
    };

    axios
      .put(`/users/actualizarUsuario/${user._id}`, updatedUser)

      .then(() => {
        toast.success("Usuario actualizado");
        getUsers();
      })
      .catch(() => {
        toast.error("Error al actualizar el usuario");
      });
  };

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
              <Card.Title className="titleTopicInfo">{nombre}</Card.Title>
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
                  onClick={handleSave}
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
              {changeIcon ? (
                <input
                  type="text"
                  className="parrafoInfo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <p className="parrafoInfo">{email}</p>
              )}
              <span className="spanBigCard">Usuario</span>
              <p className="parrafoInfo">{user.nombreUsuario}</p>
              <span className="spanBigCard">DNI</span>
              {changeIcon ? (
                <input
                  type="text"
                  className="parrafoInfo"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                />
              ) : (
                <p className="parrafoInfo">{dni}</p>
              )}
            </div>
            <div className="infoDeUsuarioCardBig2">
              <span className="spanBigCard">Num Afiliado</span>
              {changeIcon ? (
                <input
                  type="text"
                  className="parrafoInfo"
                  value={afiliado}
                  onChange={(e) => setAfiliado(e.target.value)}
                />
              ) : (
                <p className="parrafoInfo">{afiliado}</p>
              )}
              <span className="spanBigCard">Fecha de Nacimiento</span>
              {changeIcon ? (
                <input
                  type="text"
                  className="parrafoInfo"
                  value={nacimiento}
                  onChange={(e) => setNacimiento(e.target.value)}
                />
              ) : (
                <p className="parrafoInfo">{nacimiento}</p>
              )}
              <span className="spanBigCard">Turno</span>
              {changeIcon ? (
                <input
                  type="text"
                  className="parrafoInfo"
                  value={turno}
                  onChange={(e) => setTurno(e.target.value)}
                />
              ) : (
                <p className="parrafoInfo">{turno}</p>
              )}
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
