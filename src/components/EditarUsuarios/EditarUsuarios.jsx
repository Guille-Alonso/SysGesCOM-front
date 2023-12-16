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
import { Alert, Button, Form, FormSelect, Spinner } from "react-bootstrap";
import { validationEditarUsuario } from "../../helpers/validationsEditarUsuario";
import Modal from "react-bootstrap/Modal";
import fotoPredet from "../../assets/fotoPredeterminada.png";
import useGet from "../../hooks/useGet";

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

  const editarUsuario = async () => {

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
    console.log(userInfo)
  }, []);


  const [turnos, loading, getTurnos] = useGet(
    "/turnos/listar",
    axios
  );

  const [roles, loadingRoles, getRoles] = useGet(
    "/roles/listar",
    axios
  );

  return (
    <Form onSubmit={handleSubmit} className="usuarioCardBig">
      <div className="bigCardLeft">
        <img
          variant="top"
          src={
            values.foto !== undefined && values.foto !== ""
              ? values.foto
              : fotoPredet
          }
          className="imgUsuarioBig"
        />
        <Card.Title className=".nombreDeUsuario">
          {values.tipoDeUsuario.nombre}
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
                value={values.turno.nombre}
                onChange={handleChange}
                required
                className="parrafoInfo"
              >
                <option value="">-----Seleccionar-----</option>
                {loading ?
                  <Spinner />
                  :
                  turnos.turnos.map((item) => {
                    return (

                      <option key={item._id} value={item._id}>
                        {item.nombre.toUpperCase().concat(' ', "(", item.horario, ")")}
                      </option>
                    );
                  })}

                {/* <option value="">-----Seleccionar-----</option>
                <option value="mañana">mañana (06:00 am - 12:00 am)</option>
                <option value="intermedio">intermedio (12:00 am - 18:00 pm)</option>
                <option value="tarde">tarde (18:00 pm - 00:00 am)</option>
                <option value="noche">noche (00:00 am - 06:00 am)</option>
                 */}
                {/* <option>mañana</option>
                <option>intermedio</option>
                <option>tarde</option>
                <option>noche</option> */}
              </FormSelect>
            ) : (
              <p className="parrafoInfo">{values.turno.nombre}</p>
            )}
            <span className="spanBigCard">Area</span>
            {changeIcon ? (
              <FormSelect
                name="tipoDeUsuario"
                value={values.tipoDeUsuario.nombre}
                onChange={handleChange}
                required
              >
                <option value="">-----Seleccionar-----</option>
                {loadingRoles ?
                <Spinner/>
                :
                roles.roles.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.nombre.toUpperCase()}
                    </option>
                  );
                })}
              </FormSelect>
            ) : (
              <p className="parrafoInfo">{values.tipoDeUsuario.nombre}</p>
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
