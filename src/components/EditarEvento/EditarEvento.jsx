import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { COMContext } from "../../context/COMContext";
import useGet from "../../hooks/useGet";
import useForm from "../../hooks/useForm";
import { ALTA_REPORTES_VALUES } from "../../constants";
// import { validationsEditarCamara } from "../../helpers/validationsEditarCamara";
import axios from "../../config/axios";
import "../AltaEvento/AltaEvento.css";
import { Navigate } from "react-router-dom";

const EditarEvento = ({ onClose, getReporte, reporte }) => {
  const [naturalezas, setNaturalezas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const [natuSelected, setNatuSelected] = useState(undefined);
  const [catSelected, setCatSelected] = useState(undefined);

  const { user } = useContext(COMContext);
  const [volver, setVolver] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [dispositivos, loading, getDispositivos] = useGet(
    "/camaras/listar",
    axios
  );

  const suggestionsRef = useRef(null);

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

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  const editarEvento = async () => {
    const { _id, ...eventoInfo } = reporte;
    if (JSON.stringify(eventoInfo) !== JSON.stringify(values)) {
      try {
        await axios.put(`/camaras/actualizarCamara/${camara._id}`, values);
        toast.success("Dispositivo actualizado");
        onClose();
        getReporte();
      } catch (error) {
        toast.error(
          error.response?.data.message ||
            error.response?.data.errorMje ||
            error.message
        );
      }
    } else onClose();
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    ALTA_REPORTES_VALUES,
    editarEvento
    // validationsEditarCamara
  );

  const handleFileInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.files[0],
    });
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

  const handleSuggestionClick = (suggestion) => {
    setValues({
      ...values,
      dispositivo: suggestion._id,
      ubicacion: suggestion.ubicacion,
    });

    setSearchTerm(suggestion);
    setSuggestions([]); // Limpiar las sugerencias al seleccionar una
  };

  const handleChangeNaturaleza = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    const value = e.target.value;
    setNatuSelected(value);
  };

  const handleChangeCategoria = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    const value = e.target.value;
    setCatSelected(value);
  };

  const getDatos = async () => {
    try {
      const { data } = await axios.get("/naturaleza/listarClasificacion");
      setNaturalezas(data.naturalezas);
      setCategorias(data.categorias);
      setSubcategorias(data.subcategorias);
    } catch (error) {
      toast.error("Error en la conexión");
    }
  };

  useEffect(() => {
    getDatos();
    const { _id, ...eventoInfo } = reporte;
    console.log(reporte);
    setValues(eventoInfo);
  }, []);

  return (
    <>
      <Container>
        <input
          type="text"
          value={`${fecha} - ${hora}`}
          name="fecha"
          required
          disabled
          className="inputFecha"
        />
        <div className="contenedorEdit ">
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} sm={4}>
                    <Form.Group className="col-xs-6">
                      <Form.Select
                        onChange={handleChangeNaturaleza}
                        className="inputDatoEvento"
                        name="naturaleza"
                        value={values.naturaleza._id}
                        required
                      >
                        <option value="">Seleccione una opción</option>

                        {naturalezas.map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.nombre}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={4}>
                    <Form.Group className="col-xs-6">
                      <Form.Select
                        onChange={handleChangeCategoria}
                        className="inputDatoEvento"
                        name="categoria"
                        value={values.categoria._id}
                        required
                        // disabled={natuSelected == undefined ? true : false}
                      >
                        <option value="">Seleccione una opción</option>

                        {categorias
                          // .filter((cat) => cat.naturaleza._id == natuSelected)
                          .map((item) => {
                            return (
                              <option key={item._id} value={item._id}>
                                {item.nombre}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={4}>
                    <Form.Group className="">
                      <Form.Select
                        onChange={handleChange}
                        className="inputDatoEvento"
                        name="subcategoria"
                        value={values.subcategoria?._id}
                        required={
                          subcategorias.filter(
                            (subcat) => subcat.categoria._id == catSelected
                          ) != ""
                            ? true
                            : false
                        }
                        // disabled={
                        //   subcategorias.filter(
                        //     (subcat) => subcat.categoria._id == catSelected
                        //   ) == ""
                        //     ? true
                        //     : false
                        // }
                      >
                        <option value="">Seleccione una opción</option>

                        {subcategorias
                          // .filter(
                          //   (subcat) => subcat.categoria._id == catSelected
                          // )
                          .map((item) => {
                            return (
                              <option key={item._id} value={item._id}>
                                {item.nombre}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <input
                        className="inputDatoEvento"
                        type="text"
                        value={values.dispositivo.nombre}
                        onChange={(e) => handleInputChange(e)}
                        name="dispositivo"
                        required
                        maxLength={6}
                        minLength={6}
                      />
                      <ul
                        className={
                          changeClass
                            ? "inputDispositivosReportesEdit2"
                            : "inputDispositivosReportesEdit"
                        }
                        ref={suggestionsRef}
                      >
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion.nombre}
                          </li>
                        ))}
                      </ul>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <input
                        className="inputDatoEvento"
                        type="text"
                        value={values.dispositivo.ubicacion}
                        disabled
                        required
                        name="ubicacion"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="detalleEventoEdit">
                  <textarea
                    type="text"
                    onChange={handleChange}
                    value={values.detalle}
                    name="detalle"
                    required
                    maxLength={200}
                  />
                </Form.Group>

                <Form.Group className="inputDatoEvento">
                  <Form.Control
                    className="col-12"
                    type="file"
                    title="Suba una imágen"
                    onChange={handleFileInputChange}
                    name="photo"
                    accept="image/*"
                  />
                </Form.Group>

                <Button
                  variant="success"
                  className="col-12 mt-5"
                  size="lg"
                  type="submit"
                >
                  Agregar
                </Button>
                {volver && <Navigate to="/reportes" />}
              </Form>
            </Col>
          </Row>
        </div>
        <Row>
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
    </>
  );
};

export default EditarEvento;
