import React, { useEffect, useState } from "react";
import "../ListaUsuarios/UsuarioCard.css";
import Card from "react-bootstrap/Card";
import "../ListaUsuarios/UsuarioCardBig.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUserCheck,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { REGISTER_EDITAR_USUARIOS_VALUES } from "../../constants";
import useForm from "../../hooks/useForm";
import { Alert, Button, Form, FormSelect } from "react-bootstrap";
import { validationEditarUsuario } from "../../helpers/validationsEditarUsuario";
import Modal from "react-bootstrap/Modal";

const EditarUsuarios = ({ onClose, user, getUsers }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteUser = async () => {
    //BORRADO LOGICO
    try {
      await axios.delete("/users/", { data: { id: user._id } });
      toast.info("Usuario borrado");
      getUsers();
      onClose();
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const [changeIcon, setChangeIcon] = useState(false);

  const handleClick1 = () => {
    setChangeIcon(!changeIcon);
  };
  // const handleClick2 = () => {
  //   setChangeIcon(!changeIcon);
  // };

  const editarUsuario = async () => {
    //EDITADO
    // handleClick2();
    const { _id, ...userInfo } = user;
    if (JSON.stringify(userInfo) !== JSON.stringify(values)) {
      try {
        await axios.put(`/users/actualizarUsuario/${user._id}`, values);
        toast.success("Usuario actualizado");
        getUsers();
        onClose();
      } catch (error) {
        toast.error(
          error.response?.data.message ||
            error.response?.data.errorMje ||
            error.message
        );
      }
    } else onClose();
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    REGISTER_EDITAR_USUARIOS_VALUES,
    editarUsuario,
    validationEditarUsuario
  );

  useEffect(() => {
    const { _id, ...userInfo } = user;
    setValues(userInfo);
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="usuarioCardBig">
      <div className="bigCardLeft">
        <img
          variant="top"
          src={
            values.foto !== undefined && values.foto !== ""
              ? values.foto
              : "https://us.123rf.com/450wm/hugok1000/hugok10001905/hugok1000190500198/123291745-ilustraci%C3%B3n-de-avatar-de-perfil-predeterminado-en-azul-y-blanco-sin-persona.jpg"
          }
          className="imgUsuarioBig"
        />
        <Card.Title className="tipoDeUsuario">
          {values.tipoDeUsuario.toUpperCase()}
        </Card.Title>
        {changeIcon ? (
          <FontAwesomeIcon
            icon={faTrash}
            bounce
            style={{ color: "#e61e1e" }}
            className="borrarUsuario"
            onClick={handleShow}
          />
        ) : (
          <div></div>
        )}
        <section>
          <FontAwesomeIcon
            onClick={handleClick1}
            className="iconoEditUser1"
            icon={faUserPen}
          />
          {changeIcon && (
            <button className="botonIconoEdit" type="submit">
              <FontAwesomeIcon
                className="iconoEditUser2"
                icon={faUserCheck}
                style={{ color: "#46ce68" }}
                beat
              />
            </button>
          )}
        </section>
      </div>
      <div className="infoDiv">
        <div className="topicInformation">
          <Card.Title className="nameOfUser">{values.nombre}</Card.Title>
        </div>
        <div className="formUsuario">
          <div className="infoDeUsuarioCardBig1">
            <span className="spanBigCard">Email</span>
            {changeIcon ? (
              <input
                name="email"
                type="text"
                className="parrafoInfo"
                value={values.email}
                onChange={handleChange}
                required
              />
            ) : (
              <p className="parrafoInfo">{values.email}</p>
            )}
            <span className="spanBigCard">Usuario</span>
            <p className="parrafoInfo">{values.nombreUsuario}</p>
            <span className="spanBigCard">DNI</span>
            {changeIcon ? (
              <input
                name="dni"
                type="text"
                className="parrafoInfo"
                value={values.dni}
                onChange={handleChange}
                required
              />
            ) : (
              <p className="parrafoInfo">{values.dni}</p>
            )}
            <span className="spanBigCard">Foto</span>
            {changeIcon ? (
              <input
                name="foto"
                type="text"
                className="parrafoInfo"
                value={values.foto}
                onChange={handleChange}
              />
            ) : (
              <p className="parrafoInfo">{values.foto}</p>
            )}
          </div>
          <div className="infoDeUsuarioCardBig2">
            <span className="spanBigCard">Num Afiliado</span>
            {changeIcon ? (
              <input
                name="afiliado"
                type="text"
                className="parrafoInfo"
                value={values.afiliado}
                onChange={handleChange}
                required
              />
            ) : (
              <p className="parrafoInfo">{values.afiliado}</p>
            )}
            <span className="spanBigCard">Fecha de Nacimiento</span>
            {changeIcon ? (
              <input
                name="nacimiento"
                type="date"
                className="parrafoInfo"
                value={values.nacimiento}
                onChange={handleChange}
                required
              />
            ) : (
              <p className="parrafoInfo">{values.nacimiento}</p>
            )}
            <span className="spanBigCard">Turno</span>
            {changeIcon ? (
              <FormSelect
                name="turno"
                value={values.turno}
                onChange={handleChange}
                required
                className="parrafoInfo"
              >
                <option value="">-----Seleccionar-----</option>
                <option>mañana</option>
                <option>tarde</option>
                <option>noche</option>
              </FormSelect>
            ) : (
              <p className="parrafoInfo">{values.turno}</p>
            )}
            <span className="spanBigCard">Area</span>
            {changeIcon ? (
              <FormSelect
                name="tipoDeUsuario"
                value={values.tipoDeUsuario}
                onChange={handleChange}
                required
              >
                <option value="">-----Seleccionar-----</option>
                <option>admin</option>
                <option>estadística</option>
                <option>supervisor</option>
                <option>visualizador</option>
              </FormSelect>
            ) : (
              <p className="parrafoInfo">{values.tipoDeUsuario}</p>
            )}
          </div>
        </div>
      </div>
      {Object.keys(errors).length !== 0 &&
        Object.values(errors).map((error, index) => (
          <Alert variant="danger" className="alertaEditarUsuario" key={index}>
            {error}
          </Alert>
        ))}
      <Modal
        className="modal-borrarUsuario"
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
      >
        <div className="fondoModal">
          <Modal.Header closeButton>
            <h4>Borrar Usuario</h4>
          </Modal.Header>
          <div className="mensajeConfirmacion">
            Seguro que quieres borrar este Usuario?
          </div>
          <Button
            className="btn-BorrarUsuario"
            variant="danger"
            onClick={deleteUser}
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </Form>
  );
};

export default EditarUsuarios;
