import React, { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import "./DetalleTicket.css";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import useForm from "../../hooks/useForm";
import useGet from "../../hooks/useGet";
import { ALTA_TICKETS_VALUES } from "../../constants";
import { COMContext } from "../../context/COMContext";
import { Navigate, useLocation } from "react-router-dom";
import { validationsAltaTicket } from "../../helpers/validationsAltaTicket";
import svg404 from "../../assets/img/web-error.svg";
import axios from "../../config/axios";

const DetalleTicket = () => {
  const [dispositivos, loading, getDispositivos] = useGet(
    "/camaras/listar",
    axios
  );

  const { user, botonState, setBotonState } = useContext(COMContext);
  const [volver, setVolver] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const location = useLocation();
  const datos = location.state;

  const [editTicket, seteditTicket] = useState(false);

  const handleEditTicket = () => {
    seteditTicket(!editTicket);
  };

  const handleFileInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.files[0],
    });
  };

  const styles = {
    height: "300px",
  };

  const enviarDatos = async () => {
    setBotonState(true);
    const { _id, ...ticketInfo } = datos.ticket;

    if (JSON.stringify(ticketInfo) !== JSON.stringify(values)) {
      try {
        const formData = new FormData();
        formData.append("descripcion", values.descripcion);

        formData.append(
          "dispositivo",
          values?.dispositivo?._id
            ? values?.dispositivo?._id
            : values?.dispositivo
        );
        formData.append("photo", values?.photo);
        formData.append("rutaImagen", datos.ticket?.rutaImagen);
        formData.append("usuario", user._id);
        formData.append("userName", user.nombreUsuario);

        const respuesta = await axios.put(
          `/tickets/actualizarTicket/${datos.ticket._id}`,
          formData
        );
        toast.success("Ticekt modificado con éxito");
        setVolver(true);
      } catch (error) {
        toast.error(error.response?.data.message || error.message);
      }
    } else toast.error("No hiciste cambios");
    setBotonState(false);
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    ALTA_TICKETS_VALUES,
    enviarDatos,
    validationsAltaTicket
  );
  const getImg = async () => {
    try {
      const response = await axios.get(
        // `http://10.0.0.230:4000/ticket/listar/${datos.ticket._id}`,
        `http://localhost:4000/tickets/listar/${datos.ticket._id}`,
        {
          responseType: "blob", // Especifica el tipo de respuesta como Blob
        }
      );

      const blob = response.data;
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      toast.error("Ticket sin Captura");
    }
  };

  useEffect(() => {
    const { _id, ...ticketInfo } = datos.ticket;
    setValues(ticketInfo);

    if (datos.ticket.rutaImagen !== "") {
      getImg();
    }
  }, []);

  return (
    <Container className="layoutHeight" md={12}>
      <Form onSubmit={handleSubmit}>
        <div className="navbarTicket">
          <Form.Label className="labeleditTicket">
            <strong>Fecha:</strong> {values.fecha}
          </Form.Label>
          <Form.Label className="labeleditTicket">
            <strong>Realizado por:</strong> {values.usuario.nombre}
          </Form.Label>
          <Form.Label className="labeleditTicket">
            <strong>N° Ticket:</strong> {values.numero}
          </Form.Label>
          <br />
        </div>
        <Row>
          <Col sm={6} md={6}>
            <Col>
              <div className=" labeleditTicket">
                <div className="d-flex flex-column">
                  <Form.Label className="dispositivoLabel">
                    <strong>Titulo: </strong>
                  </Form.Label>
                  {editTicket ? (
                    <textarea
                      className="inputEditarTituloTicket2 mb-3"
                      onChange={handleChange}
                      name="titulo"
                      value={values.titulo}
                      required
                    />
                  ) : (
                    <p className="inputEditarTituloTicket mb-3" enabled>
                      {values.titulo}
                    </p>
                  )}
                </div>
                <div className="d-flex flex-column mt-3">
                  <Form.Label className="">
                    <strong>Descripción: </strong>
                  </Form.Label>
                  {editTicket ? (
                    <textarea
                      className="inputEditarTicket2 mb-3"
                      onChange={handleChange}
                      name="descripcion"
                      value={values.descripcion}
                      required
                    />
                  ) : (
                    <p className="inputEditarTicketDescripcion mb-3" enabled>
                      {values.descripcion}
                    </p>
                  )}
                </div>
                <Form.Label className="dispositivoLabel">
                  <strong>Dispositivo: </strong>
                </Form.Label>
                {editTicket ? (
                  <Form.Select
                    className="inputeditTicket"
                    onChange={handleChange}
                    value={values.dispositivo?._id}
                    name="dispositivo"
                  >
                    <option value="">Selecciona una opcion</option>
                    {loading ? (
                      <Spinner />
                    ) : (
                      dispositivos.camaras
                        .sort((camaraA, camaraB) => {
                          const numeroA = parseInt(
                            camaraA.nombre.replace(/[a-zA-Z]+/, "")
                          );
                          const numeroB = parseInt(
                            camaraB.nombre.replace(/[a-zA-Z]+/, "")
                          );
                          const nombreA = camaraA.nombre.replace(/[0-9]+/, "");
                          const nombreB = camaraB.nombre.replace(/[0-9]+/, "");

                          // Primero compara los nombres alfabéticamente
                          if (nombreA < nombreB) return -1;
                          if (nombreA > nombreB) return 1;

                          // Si los nombres son iguales, compara los números
                          return numeroA - numeroB;
                        })
                        .map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.nombre}
                            </option>
                          );
                        })
                    )}
                  </Form.Select>
                ) : (
                  <div className="d-flex flex-column">
                    <p className="descripcionEditTicket">
                      {values.dispositivo?.nombre}
                    </p>
                    <p className="descripcionEditTicket">
                      {values.dispositivo?.ubicacion}
                    </p>
                  </div>
                )}
              </div>
              {(user.tipoDeUsuario == "admin" ||
                user.tipoDeUsuario == "visualizador" ||
                user.tipoDeUsuario == "supervisor") &&
                !editTicket && (
                  <div className=" botonEditarDetalleTicket d-flex justify-content-left">
                    <Button onClick={handleEditTicket}>Editar</Button>
                  </div>
                )}
              {editTicket && (
                <Button disabled={botonState} className=" mt-3" type="submit">
                  Guardar Cambios
                </Button>
              )}
              {volver && <Navigate to="/tickets" />}
            </Col>
          </Col>
          <Col sm={6} md={6}>
            {editTicket ? (
              <Form.Group className="inputAltaEvento">
                <Form.Label className="mt-2">
                  <strong> Captura</strong>
                </Form.Label>
                <Form.Control
                  type="file"
                  title="Suba una imágen"
                  onChange={handleFileInputChange}
                  name="photo"
                  accept="image/*"
                />
              </Form.Group>
            ) : (
              <div className="d-flex h-100 contenedorImagenticket">
                {imageUrl ? (
                  <img
                    className="fotoTicketDetalle2"
                    style={styles}
                    src={imageUrl ? imageUrl : svg404}
                    alt="Captura del ticket"
                  />
                ) : (
                  <img
                    className="fotoTicektDetalle"
                    style={styles}
                    src={imageUrl ? imageUrl : svg404}
                    alt="Captura del ticket"
                  />
                )}
              </div>
            )}

            <Row className="mt-4">
              {Object.keys(errors).length !== 0 &&
                Object.values(errors).map((error, index) => (
                  <Alert className="me-1" variant="danger" key={index}>
                    {error}
                  </Alert>
                ))}
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default DetalleTicket;
