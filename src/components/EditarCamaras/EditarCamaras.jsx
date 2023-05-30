import React, { useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { EDITAR_CAMARA_VALUES } from "../../constants";
import { validationsEditarCamara } from "../../helpers/validationsEditarCamara";
import useForm from "../../hooks/useForm";
import axios from "../../config/axios";
import { toast } from "react-toastify";

const EditarCamaras = ({ onClose, getCamaras, camara }) => {
  const editarCamara = async () => {
    console.log(values);
    try {
      await axios.put(`/camaras/actualizarCamara/${camara._id}`, values);
      toast.success("Dispositivo actualizado");
      onClose();
      getCamaras();
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    EDITAR_CAMARA_VALUES,
    editarCamara,
    validationsEditarCamara
  );

  useEffect(() => {
    console.log(camara);
    setValues(camara);
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Cámara</Form.Label>
        <Form.Control
          className="inputAltaDeCamara"
          type="text"
          placeholder="Cámara"
          value={values.nombre}
          name="nombre"
          onChange={handleChange}
          required
          maxLength={7}
          minLength={6}
        />
        <Form.Label className="mt-4">Tipo de Cámara</Form.Label>
        <Form.Select
          onChange={handleChange}
          className="inputAltaDeCamara"
          name="tipo"
          value={values.tipo}
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
          maxLength={30}
          minLength={8}
        />

        <Button
          className="botonEditarCamara"
          size="lg"
          variant="danger"
          shadow
          auto
          flat
          type="submit"
        >
          Editar
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
    </>
  );
};

export default EditarCamaras;
