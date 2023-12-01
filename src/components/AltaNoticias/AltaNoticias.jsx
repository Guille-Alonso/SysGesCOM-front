import React, { useContext, useEffect, useRef, useState } from "react";
import "./AltaNoticias.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import useGet from "../../hooks/useGet";
import useForm from "../../hooks/useForm";
import axios from "../../config/axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { COMContext } from "../../context/COMContext";
import { ALTA_NOTICIAS_VALUES } from "../../constants";
import { validationsAltaNoticias } from "../../helpers/validationsAltaNoticias";

const AltaNoticias = () => {
  const { user } = useContext(COMContext);
  const datos = useLocation.state;
  const [selectedFile, setSelectedFile] = useState(null);
  const [botonState, setBotonState] = useState(false);
  const fechaActual = new Date();
  const navigate = useNavigate();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const fechaSinZonaHoraria = fechaActual
    .toLocaleString("es-AR", options)
    .replace(",", "") // Eliminar la coma después del día de la semana
    .replace(/^(\w)|\s(\w)/g, (match) => match.toUpperCase()); // Convertir la primera letra del día y del mes en mayúscula

  const [fecha, hora] = fechaSinZonaHoraria.split(", "); // Separar la fecha de la hora

  const [errors, setErrors] = useState({});

  function submitForm(event) {

    event.preventDefault(); // Evitar el envío del formulario por defecto

    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    const inputFile = document.getElementById('imageNoticia');
    console.log(inputFile)

    let newErrors = {};

    validationsAltaNoticias(values, setErrors, newErrors, lengthFile);

    if (Object.keys(newErrors).length === 0) {

      axios.post(form.action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          // Manejar la respuesta del servidor
          setValues(ALTA_NOTICIAS_VALUES)
          toast.success("Noticia cargada con éxito")
          console.log(response.data);
        })
        .catch(error => {
          toast.error("Algo salio mal :(")
          // console.log(error(error));

        });
    }

  }

  const { values, setValues, handleChange } = useForm(
    ALTA_NOTICIAS_VALUES,
  );

  const [lengthFile, setLengthFile] = useState()

  const handleChangeFile = (e) => {
    handleChange(e)

    setLengthFile(e.target.files.length)
    
    console.log(e.target.files.length)
  
  }

  return (
    <Container className="layoutHeight">
      <Form id="myForm" action="http://localhost:4000/noticias/alta" enctype="multipart/form-data" method="POST" className="formAltaEvento" onSubmit={submitForm}>
        <Form.Group className="contInputFechaNoticias">
          <Form.Control
            name="fecha"
            value={`${fecha} - ${hora}`}
            required
            className="inputFechaNoticias"
          />
        </Form.Group>
        <Form.Group className="d-flex flex-column labelEditReporte mt-2">
          <Form.Label className="">Título de la Noticia</Form.Label>
          <Form.Control
            className="inputAltaNoticiaTitulo w-100"
            type="text" name="titulo" id=""
            onChange={handleChange}
            value={values.titulo}
            isValid={values.titulo && !errors.titulo}
            isInvalid={!!errors.titulo}
            minLength={4}
            maxLength={200}
            required
          />
          <Form.Control.Feedback type="invalid" >
            {errors.titulo}
          </Form.Control.Feedback>
        </Form.Group>
        {/* <Form.Group className="d-flex flex-column labelEditReporte mt-2">
              <Form.Label className="">Descripción del Ticket</Form.Label>
              <textarea
                className="inputAltaTicketDescripcion w-100"
                onChange={handleChange}
                name="descripcion"
                value={values.descripcion}
                required
              />
            </Form.Group> */}
        <Form.Group className="inputAltaEvento">
          <Form.Label className="mt-2">Archivos</Form.Label>
          <Form.Control
            type="file"
            name="files" multiple
            id="imageNoticia"
            className="InputArchivo"
            onChange={handleChangeFile}
            value={values.files}
            isValid={values.files && !errors.files}
            isInvalid={!!errors.files}
          />
          <Form.Control.Feedback type="invalid" >
            {errors.files}
          </Form.Control.Feedback>
        </Form.Group>
        {selectedFile && (
          <img
            src={selectedFile}
            className="mt-5 d-flex justify-content-center align-items-center w-100 fotoPreview"
            alt=""
          />
        )}
        <Button
          variant="success"
          className="mt-5 col-12 mb-3"
          size="lg"
          type="submit" value="Upload your files" onClick={submitForm}
        >
          Agregar
        </Button>
      </Form>

    </Container>
  );
};

export default AltaNoticias;
