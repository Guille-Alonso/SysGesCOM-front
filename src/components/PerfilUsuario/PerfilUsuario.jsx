import React, { useContext } from "react";
import "./PerfilUsuario.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import { COMContext } from "../../context/COMContext";
import fotoPredet from "../../assets/fotoPredeterminada.png";

export const PerfilUsuario = () => {
  const { user } = useContext(COMContext);

  return (
    <Container className="layoutHeight">
      <div className="d-flex justify-content-center my-3 imagenPerfil">
        <img
          className="imgProfile"
          src={
            user.foto !== undefined && user.foto !== "" ? user.foto : fotoPredet
          }
        />
      </div>

      <Row>
        <Col>
          <Form.Group className="inputPerfilUser">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={user.nombre}
              name="nombre"
              disabled
            />
          </Form.Group>
          <Form.Group className="inputPerfilUser">
            <Form.Label>Usuario</Form.Label>

            <Form.Control
              type="text"
              placeholder="Usuario"
              value={user.nombreUsuario}
              name="user"
              disabled
            />
          </Form.Group>
          <Form.Group className="inputPerfilUser">
            <Form.Label>DNI</Form.Label>

            <Form.Control
              type="text"
              placeholder="DNI"
              value={user.dni}
              name="dni"
              disabled
            />
          </Form.Group>
          <Form.Group className="inputPerfilUser">
            <Form.Label>Fecha Nacimiento</Form.Label>

            <Form.Control
              type="text"
              placeholder="Fecha Nacimiento"
              value={user.nacimiento}
              name="fechaNac"
              disabled
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="inputPerfilUser">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="text"
              placeholder="Email"
              value={user.email}
              name="email"
              disabled
            />
          </Form.Group>
          <Form.Group className="inputPerfilUser">
            <Form.Label>N° Afiliado</Form.Label>

            <Form.Control
              type="text"
              placeholder="N° Afiliado"
              value={user.afiliado}
              name="numAfil"
              disabled
            />
          </Form.Group>
          <Form.Group className="inputPerfilUser">
            <Form.Label>Turno</Form.Label>

            <Form.Control
              type="text"
              placeholder="Turno"
              value={user.turno.nombre}
              name="turno"
              disabled
            />
          </Form.Group>
          <Form.Group className="inputPerfilUser">
            <Form.Label>Tipo de Usuario</Form.Label>

            <Form.Control
              type="text"
              placeholder="Tipo de Usuario"
              value={user.tipoDeUsuario.nombre}
              name="tipoDeUsuario"
              disabled
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};
