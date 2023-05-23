import React, { useEffect, useState } from "react";
import "../ListaUsuarios/UsuarioCard.css";
import Card from "react-bootstrap/Card";
import "../ListaUsuarios/UsuarioCardBig.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserPen } from "@fortawesome/free-solid-svg-icons";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { REGISTER_EDITAR_USUARIOS_VALUES } from "../../constants";
import useForm from "../../hooks/useForm";
import { Alert, Form } from "react-bootstrap";
import { validationEditarUsuario } from "../../helpers/validationsEditarUsuario";

const EditarUsuarios = ({onClose,user,getUsers}) => {   //viene a reemplazar a UsuarioBigCard
    const [changeIcon, setChangeIcon] = useState(false);

    const handleClick1 = () => {
        setChangeIcon(!changeIcon);
      };
    
      const handleClick2 = () => {
        setChangeIcon(!changeIcon);
      };

      const editarUsuario = async () => {
        handleClick2();
        try {
            await axios.put(`/users/actualizarUsuario/${user._id}`,values);
            toast.success("Usuario actualizado");
            getUsers();
            onClose();
        } catch (error) {
            toast.error(error.response?.data.message || error.message)
        }
       
      }

      const { handleChange, handleSubmit, values, setValues, errors } = useForm(
        REGISTER_EDITAR_USUARIOS_VALUES,
        editarUsuario,
        validationEditarUsuario
      );

      useEffect(()=>{
        console.log(user);
        setValues(user)
      },[])

  return (
   <Form onSubmit={handleSubmit} className="usuarioCardBig">
    <div className="bigCardSuperior">
            <img
              variant="top"
              src={
                values.foto !== undefined
                  ? values.foto
                  : "https://us.123rf.com/450wm/hugok1000/hugok10001905/hugok1000190500198/123291745-ilustraci%C3%B3n-de-avatar-de-perfil-predeterminado-en-azul-y-blanco-sin-persona.jpg"
              }
              className="imgUsuarioBig"
            />
            <div className="topicInformation">
              <Card.Title className="titleTopicInfo">{values.nombre}</Card.Title>
              <Card.Title className="titleTopicInfo">
                {values.tipoDeUsuario}
              </Card.Title>
            </div>
            <section>
              <FontAwesomeIcon
                onClick={handleClick1}
                className="iconoEditUser1"
                icon={faUserPen}
              />
              {changeIcon && (
                <button type="submit">
                <FontAwesomeIcon
                  className="iconoEditUser2"
                  icon={faUserCheck}
                  style={{ color: "#46ce68" }}
                  beat
                /></button>
              )}
            </section>
          </div>
          <div className="infoDiv">
            <div className="infoDeUsuarioCardBig1">
              <span className="spanBigCard">Email</span>
              {changeIcon ? (
                <input
                  name="email"
                  type="text"
                  className="parrafoInfo"
                  value={values.email}
                  onChange={handleChange}
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
                />
              ) : (
                <p className="parrafoInfo">{values.dni}</p>
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
                />
              ) : (
                <p className="parrafoInfo">{values.afiliado}</p>
              )}
              <span className="spanBigCard">Fecha de Nacimiento</span>
              {changeIcon ? (
                <input
                  name="nacimiento"
                  type="text"
                  className="parrafoInfo"
                  value={values.nacimiento}
                  onChange={handleChange}
                />
              ) : (
                <p className="parrafoInfo">{values.nacimiento}</p>
              )}
              <span className="spanBigCard">Turno</span>
              {changeIcon ? (
                <input
                  name="turno"
                  type="text"
                  className="parrafoInfo"
                  value={values.turno}
                  onChange={handleChange}
                />
              ) : (
                <p className="parrafoInfo">{values.turno}</p>
              )}
            </div>
          </div>
          {Object.keys(errors).length !== 0 &&
          Object.values(errors).map((error, index) => (
            <Alert variant="danger" className="mt-3" key={index}>
              {error}
            </Alert>
          ))}
   </Form>
  )
}

export default EditarUsuarios