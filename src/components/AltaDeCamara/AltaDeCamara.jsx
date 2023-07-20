import React from "react";
import useForm from "../../hooks/useForm";
import { ALTA_CAMARA_VALUES } from "../../constants";
import { validationsAltaCamara } from "../../helpers/validationsAltaCamara";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import "./AltaDeCamara.css";
import axios from "../../config/axios";
import { toast } from "react-toastify";

const AltaDeCamara = () => {
  const enviarDatos = async () => {
    try {
      const respuesta = await axios.post("/camaras/alta", values);
      console.log(respuesta);
      setValues(ALTA_CAMARA_VALUES);
      toast.success("Dispositivo registrado con éxito");
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    ALTA_CAMARA_VALUES,
    enviarDatos,
    validationsAltaCamara
  );

  return (
    <>
      <div className="contenedor">
        <div className="contenedor1">
          <Row>
            <Col xs={12} className="columnaForm">
              <Form className="AltaDeCamara" onSubmit={handleSubmit}>
                <Form.Label>Cámara</Form.Label>
                <Form.Control
                  className="inputAltaDeCamara"
                  type="text"
                  placeholder="Cámara"
                  value={values.nombre}
                  name="nombre"
                  onChange={handleChange}
                  required
                  maxLength={6}
                  minLength={6}
                />
                <Form.Label className="mt-4">Tipo de Cámara</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  className="inputAltaDeCamara"
                  name="tipoDeCamara"
                  value={values.tipoDeCamara}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option>camara</option>
                  <option>domo</option>
                </Form.Select>
                <Form.Label className="mt-4">Ubicación</Form.Label>
                <Form.Control
                  className="inputAltaDeCamara"
                  type="text"
                  placeholder="Ubicación"
                  value={values.ubicacion}
                  name="ubicacion"
                  onChange={handleChange}
                  required
                  maxLength={50}
                  minLength={8}
                />
                <Button
                  variant="success"
                  className="mt-5 col-12 mb-3"
                  size="lg"
                  type="submit"
                >
                  Agregar
                </Button>
              </Form>
              <div className="alertaError">
                {Object.keys(errors).length !== 0 &&
                  Object.values(errors).map((error, index) => (
                    <Alert variant="danger" key={index}>
                      {error}
                    </Alert>
                  ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AltaDeCamara;
