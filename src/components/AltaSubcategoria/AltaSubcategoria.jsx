import React from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { SUBCATEGORIAS_VALUES } from "../../constants";
import useForm from "../../hooks/useForm";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { validationsAltaSubcategoria } from "../../helpers/validationsAltaSubcategoria";

const AltaSubcategoria = ({ onClose, getSubcategorias, idCategoria }) => {
  const nuevaSubcategoria = async () => {
    const obj = { nombre: values.nombre, categoria: idCategoria };
    try {
      await axios.post(`/subcategorias/alta`, obj);
      toast.success("Subcategoría creada con éxito");
      getSubcategorias();
      setValues(SUBCATEGORIAS_VALUES);
      onClose();
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    SUBCATEGORIAS_VALUES,
    nuevaSubcategoria,
    validationsAltaSubcategoria
  ); 

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <h2 className="mb-5 text-light">Subcategoría Nueva</h2>
            <Row>
            <Col xs={12} className="d-flex">
              {Object.keys(errors).length !== 0 &&
                Object.values(errors).map((error, index) => (
                  <Alert className="me-1" variant="danger" key={index}>
                    {error}
                  </Alert>
                ))}
            </Col>
          </Row>
            <Form.Control
              className="modalAgregarSubcategoria"
              type="text"
              placeholder="Ej... Violencia"
              value={values.nombre}
              name="nombre"
              onChange={handleChange}
              required
              maxLength={20}
              minLength={3}
            />
            <Button variant="success" className="mt-3 col-12" type="submit">
              Agregar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AltaSubcategoria;
