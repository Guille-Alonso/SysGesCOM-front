import React, { useContext, useEffect, useRef, useState } from "react";
import "./AltaTickets.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { COMContext } from "../../context/COMContext";
import useGet from "../../hooks/useGet";
import useForm from "../../hooks/useForm";
import { ALTA_TICKETS_VALUES } from "../../constants";
import axios from "../../config/axios";
import { Navigate } from "react-router-dom";
import { validationsAltaTicket } from "../../helpers/validationsAltaTicket";

// const { user } = useContext(COMContext);
const AltaTickets = () => {

    const [selectedFile, setSelectedFile] = useState(null);

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


    const { handleChange, handleSubmit, values, setValues, errors } = useForm(
        ALTA_TICKETS_VALUES,
        // enviarDatos,
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
                                id="imageEvento"
                            />
                        </Form.Group>
                        {selectedFile && (
                            <img
                                src={selectedFile}
                                className="mt-5 d-flex justify-content-center align-items-center w-100 fotoPreview"
                                alt=""
                            />
                        )}
                    </Form>
                </Col>
                <Col>
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
