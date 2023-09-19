import React, { useContext, useEffect, useRef, useState } from "react";
import "./AltaTickets.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import useGet from "../../hooks/useGet";
import useForm from "../../hooks/useForm";
import { ALTA_TICKETS_VALUES } from "../../constants";
import axios from "../../config/axios";
import { Navigate } from "react-router-dom";
import { validationsAltaTicket } from "../../helpers/validationsAltaTicket";
import { COMContext } from "../../context/COMContext";


const AltaTickets = () => {
    const { user } = useContext(COMContext)

    const [selectedFile, setSelectedFile] = useState(null);
    const [botonState, setBotonState] = useState(false);
    const fechaActual = new Date();

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

    const enviarDatos = async () => {
        setBotonState(true);
        try {
            const formData = new FormData();
            formData.append("fecha", fechaSinZonaHoraria);
            formData.append("descripcion", values.descripcion);
            formData.append("usuario", user._id);
            formData.append("userName", user.nombreUsuario);
            formData.append("titulo", values.titulo);
            formData.append("dispositivo", values.dispositivo);
            formData.append("photo", values.photo);

            const respuesta = await axios.post("/tickets/alta", formData);

            toast.success("Ticket registrado con éxito");
            setValues(ALTA_TICKETS_VALUES);
            setSearchTerm({ nombre: "" });
            document.querySelector("#imageTicket").value = "";
            setSelectedFile(null);
        } catch (error) {
            toast.error(error.response?.data.message || error.message);
        }
        setBotonState(false);
    };

    const { handleChange, handleSubmit, values, setValues, errors } = useForm(
        ALTA_TICKETS_VALUES,
        enviarDatos,
        validationsAltaTicket
    );

    const handleFileInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.files[0],
        });
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
        }
    };
    
  const [changeClass, setChangeClass] = useState(false);
  const handleInputChange = (e) => {
    setChangeClass(!changeClass);
    const value = e.target.value;
    setSearchTerm(value);

    // Lógica para generar las sugerencias de coincidencias
    const filteredSuggestions =
      !loading &&
      dispositivos.camaras
        .filter((disp) =>
          disp.nombre.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 6); // Mostrar solo los primeros 6 elementos
    setSuggestions(filteredSuggestions);
  };
  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "ArrowDown") {
      setCurrentIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (event.key === "Enter" && suggestions.length > 0) {
      const suggestion = suggestions[currentIndex];
      setValues({
        ...values,
        dispositivo: suggestion._id,
        ubicacion: suggestion.ubicacion,
      });

      setSearchTerm(suggestion);
      setSuggestions([]); // Limpiar las sugerencias al seleccionar una
    }
  };

  const handleSuggestionClick = (suggestion, e) => {
    setValues({
      ...values,
      dispositivo: suggestion._id,
      ubicacion: suggestion.ubicacion,
    });
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const [isHovered, setIsHovered] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [dispositivos, loading, getDispositivos] = useGet(
    "/camaras/listar",
    axios
  );

  const suggestionsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Agregar event listener para cerrar la lista de sugerencias al hacer clic fuera de ella
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setSuggestions([]); // Cerrar la lista de sugerencias
      }
    };

    document.addEventListener("click", handleClickOutside);

    // document.addEventListener("keypress", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      // document.removeEventListener("keypress", handleKeyDown);
    };
  }, []);

    return (
        <Container className="layoutHeight">
            <Row>
                <Col>
                    <Form className="formAltaEvento" onSubmit={handleSubmit}>

                        <Form.Group className="contInputFechaTickets">
                            <Form.Control
                                type="text"
                                value={`${fecha} - ${hora}`}
                                name="fecha"
                                required
                                disabled
                                className="inputFechaTickets"
                            />
                        </Form.Group>
                        <Form.Group className="d-flex flex-column labelEditReporte mt-2">
                            <Form.Label className="">Título</Form.Label>
                            <textarea
                                className="inputAltaTicketTitulo w-100"
                                onChange={handleChange}
                                name="titulo"
                                value={values.titulo}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="d-flex flex-column labelEditReporte mt-2">
                            <Form.Label className="">Descripción</Form.Label>
                            <textarea
                                className="inputAltaTicketDescripcion w-100"
                                onChange={handleChange}
                                name="descripcion"
                                value={values.descripcion}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="inputAltaEvento">
                            <Form.Label className="mt-2">Captura</Form.Label>
                            <Form.Control
                                type="file"
                                title="Suba una imágen"
                                onChange={handleFileInputChange}
                                name="photo"
                                accept="image/*"
                                id="imageTicket"
                            />
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
                            type="submit"
                            disabled={botonState}
                        >
                            Agregar
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <Form.Group className="inputAltaEvento">
                        <Form.Label className="mt-2">Dispositivo</Form.Label>
                        <Form.Control
                            type="text"
                            value={searchTerm.nombre}
                            onChange={(e) => handleInputChange(e)}
                            name="dispositivo"
                            required
                            maxLength={6}
                            minLength={6}
                            autoComplete="off"
                            className="inputDispositivo"
                            onKeyDown={handleKeyDown}
                        />
                        <ul
                            className={"inputDispositivosReportes"}
                            ref={suggestionsRef}
                        >
                            {suggestions.map((suggestion, index) => (
                                <li
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    key={index}
                                    className="liCamarasyDomos"
                                    style={{
                                        backgroundColor:
                                            currentIndex === index && !isHovered
                                                ? "#ccc"
                                                : "transparent",
                                    }}
                                    onClick={(e) => handleSuggestionClick(suggestion, e)}
                                >
                                    {suggestion.nombre}
                                </li>
                            ))}
                        </ul>
                    </Form.Group>
                    <Form.Group className="inputAltaEvento">
                <Form.Label className="mt-2">Ubicación</Form.Label>
                <Form.Control
                  type="text"
                  value={values.ubicacion}
                  disabled
                  required
                  name="ubicacion"
                />
              </Form.Group>

                </Col>
                <Col xs={12} className="d-flex justify-content-center">
                    {Object.keys(errors).length !== 0 &&
                        Object.values(errors).map((error, index) => (
                            <Alert className="me-1" variant="danger" key={index}>
                                {error}
                            </Alert>
                        ))}
                </Col>
            </Row>
        </Container>
    )
}

export default AltaTickets;
