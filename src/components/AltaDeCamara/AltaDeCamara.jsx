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
    const datosCamara = {
      idCamara: values.idCamara,
      tipoDeCamara: values.tipoDeCamara,
      ubicacion: values.ubicacion,
    };
    try {
      const respuesta = await axios.post("/camaras/altaDeCamara", datosCamara);
      console.log(respuesta);
      setValues(ALTA_CAMARA_VALUES);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    ALTA_CAMARA_VALUES,
    enviarDatos,
    validationsAltaCamara
  );

  return (
    <>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="container-fluid">
          <Row>
            <Col xs={12} className="columnaForm">
              <img
                src="src\assets\img\logo_comm_marca_de_agua.png"
                alt="logo del com"
                className="mb-5 mt-5 logoComFormAltaDeCamara"
              />
              <Form className="AltaDeCamara" onSubmit={handleSubmit}>
                <Form.Label>Cámara</Form.Label>
                <Form.Control
                  className="inputAltaDeCamara"
                  type="text"
                  placeholder="Cámara"
                  value={values.idCamara}
                  name="idCamara"
                  onChange={handleChange}
                  required
                  maxLength={7}
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
                  <option>Cámara</option>
                  <option>Domo</option>
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
                  maxLength={30}
                  minLength={8}
                />
                <Button
                  variant="success"
                  className="mt-5 col-9 mb-3 "
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
