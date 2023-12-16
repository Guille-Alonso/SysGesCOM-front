import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import "./DetalleEvento.css";
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
import { ALTA_REPORTES_VALUES } from "../../constants";
import { COMContext } from "../../context/COMContext";
import { Navigate } from "react-router-dom";
import { validationsEditarEvento } from "../../helpers/validationsEditarEvento";
import svg404 from "../../assets/img/web-error.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { faArrowLeft, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DetalleEvento = () => {
  const [dispositivos, loading, getDispositivos] = useGet(
    "/camaras/listar",
    axios
  );

  const navigate = useNavigate();
  const goBack = () => {
    if (editReporte) {
      setEditReporte(!editReporte);
    } else {
      navigate(-1);
    }
  };

  const { user, botonState, setBotonState } = useContext(COMContext);
  const [volver, setVolver] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const location = useLocation();
  const datos = location.state;

  const [editReporte, setEditReporte] = useState(false);

  const [naturalezas, setNaturalezas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const [natuSelected, setNatuSelected] = useState(undefined);
  const [catSelected, setCatSelected] = useState(undefined);

  const handleEditReporte = () => {
    setEditReporte(!editReporte);
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
    const { _id, ...eventoInfo } = datos.reporte;
    if (JSON.stringify(eventoInfo) !== JSON.stringify(values)) {
      try {
        const formData = new FormData();
        formData.append("detalle", values.detalle);
        formData.append(
          "naturaleza",
          values.naturaleza._id ? values.naturaleza._id : values.naturaleza
        );
        formData.append(
          "categoria",
          values.categoria._id ? values.categoria._id : values.categoria
        );
        formData.append(
          "subcategoria",
          values.subcategoria?._id
            ? values.subcategoria._id
            : values.subcategoria
        );
        formData.append(
          "dispositivo",
          values.dispositivo._id ? values.dispositivo._id : values.dispositivo
        );
        formData.append("photo", values.photo);
        formData.append("rutaImagen", datos.reporte.rutaImagen);
        formData.append("usuario", user._id);
        formData.append("userName", user.nombreUsuario);

        const respuesta = await axios.put(
          `/reportes/actualizarReporte/${datos.reporte._id}`,
          formData
        );
        toast.success("Reporte modificado con éxito");
        setVolver(true);
      } catch (error) {
        toast.error(error.response?.data.message || error.message);
      }
    } else toast.error("No hiciste cambios");
    setBotonState(false);
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    ALTA_REPORTES_VALUES,
    enviarDatos,
    validationsEditarEvento
  );
  const getImg = async () => {
    try {
      const response = await axios.get(
        `http://10.5.0.206:4000/reportes/listar/${datos.reporte._id}`,
        {
          responseType: "blob", // Especifica el tipo de respuesta como Blob
        }
      );

      const blob = response.data;
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      toast.error("Reporte sin Captura");
    }
  };

  const getDatos = async () => {
    try {
      const { data } = await axios.get("/naturaleza/listarClasificacion");
      setNaturalezas(data.naturalezas);
      setCategorias(
        data.categorias.sort((catA, catB) => {
          const nombreA = catA.nombre.replace(/[0-9]+/, "");
          const nombreB = catB.nombre.replace(/[0-9]+/, "");

          // Primero compara los nombres alfabéticamente
          if (nombreA < nombreB) return -1;
          if (nombreA > nombreB) return 1;

          // Si los nombres son iguales, compara los números
        })
      );
      setSubcategorias(
        data.subcategorias.sort((subcatA, subcatB) => {
          const nombreA = subcatA.nombre.replace(/[0-9]+/, "");
          const nombreB = subcatB.nombre.replace(/[0-9]+/, "");

          // Primero compara los nombres alfabéticamente
          if (nombreA < nombreB) return -1;
          if (nombreA > nombreB) return 1;

          // Si los nombres son iguales, compara los números
        })
      );
    } catch (error) {
      toast.error("Error en la conexión");
    }
  };

  useEffect(() => {
    const { _id, ...eventoInfo } = datos.reporte;
    setValues(eventoInfo);
    setNatuSelected(eventoInfo.naturaleza._id);
    setCatSelected(eventoInfo.categoria._id);

    if (datos.reporte.rutaImagen !== "") {
      getImg();
    }
    getDatos();
  }, []);

  function capturarPantallaConImagenes() {
    html2canvas(document.body).then((canvas) => {
      var link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "screenshot.png";
      link.click();
    });
  }

  return (
    <Container className="layoutHeight2" md={12}>
      <Form onSubmit={handleSubmit}>
        <div className="navbarReporte">
          <Form.Label className="labelEditReporte">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={goBack}
              beat
              className="botonScreenshot"
            />
          </Form.Label>
          <Form.Label className="labelEditReporte">
            <strong>Fecha:</strong> {values.fecha}
          </Form.Label>
          <Form.Label className="labelEditReporte">
            <strong>Realizado por:</strong> {values.usuario.nombre}
          </Form.Label>
          <Form.Label className="labelEditReporte">
            <strong>N° Evento:</strong> {values.numero}
          </Form.Label>
          <br />
        </div>
        <Row>
          <Col sm={6} md={6}>
            <Row>
              <Col sm={6} md={6}>
                <div className=" labelEditReporte">
                  <Form.Label className="">
                    <strong>Tipo: </strong>
                  </Form.Label>
                  {editReporte ? (
                    <Form.Select
                      className="inputEditReporte"
                      onChange={handleChangeNaturaleza}
                      name="naturaleza"
                      value={values.naturaleza._id}
                      required
                    >
                      <option value="">Selecciona una opcion</option>
                      {naturalezas.map((item) => {
                        return (
                          <option key={item._id} value={item._id}>
                            {item.nombre}
                          </option>
                        );
                      })}
                    </Form.Select>
                  ) : (
                    <p className="detalleEditReporte">
                      {values.naturaleza.nombre?.toUpperCase()}
                    </p>
                  )}
                  <Form.Label className="">
                    <strong>Categoria: </strong>
                  </Form.Label>
                  {editReporte ? (
                    <Form.Select
                      className="inputEditReporte"
                      onChange={handleChangeCategoria}
                      name="categoria"
                      value={values.categoria._id}
                      required
                      disabled={natuSelected == undefined ? true : false}
                    >
                      <option value="">Selecciona una opcion</option>
                      {categorias
                        .filter((cat) => cat.naturaleza._id == natuSelected)
                        .map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.nombre}
                            </option>
                          );
                        })}
                    </Form.Select>
                  ) : (
                    <p className="detalleEditReporte">
                      {values.categoria.nombre}
                    </p>
                  )}
                  <Form.Label className="">
                    <strong>Subcategoria: </strong>
                  </Form.Label>
                  {editReporte ? (
                    <Form.Select
                      type=""
                      className="inputEditReporte"
                      onChange={handleChange}
                      name="subcategoria"
                      value={values.subcategoria?._id}
                      required={
                        subcategorias.filter(
                          (subcat) => subcat.categoria._id == catSelected
                        ) != ""
                          ? true
                          : false
                      }
                      disabled={
                        subcategorias.filter(
                          (subcat) => subcat.categoria._id == catSelected
                        ) == ""
                          ? true
                          : false
                      }
                    >
                      <option value="">Selecciona una opcion</option>
                      {subcategorias
                        .filter(
                          (subcat) =>
                            subcat.categoria._id == catSelected &&
                            subcat._id !== "64e7da580a5e30019cccd20a"
                        )
                        .map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.nombre}
                            </option>
                          );
                        })}
                    </Form.Select>
                  ) : (
                    <p className="detalleEditReporte">
                      {values.subcategoria?.nombre}
                    </p>
                  )}
                  <Form.Label className="dispositivoLabel">
                    <strong>Dispositivo: </strong>
                  </Form.Label>
                  {editReporte ? (
                    <Form.Select
                      className="inputEditReporte"
                      onChange={handleChange}
                      value={values.dispositivo._id}
                      name="dispositivo"
                      required
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
                            const nombreA = camaraA.nombre.replace(
                              /[0-9]+/,
                              ""
                            );
                            const nombreB = camaraB.nombre.replace(
                              /[0-9]+/,
                              ""
                            );

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
                      <p className="detalleEditReporte">
                        {values.dispositivo.nombre}
                      </p>
                      <p className=" detalleEditReporte">
                        {values.dispositivo.ubicacion}
                      </p>
                    </div>
                  )}
                </div>
              </Col>
              <Col sm={6} md={6}>
                <div className="d-flex flex-column">
                  <Form.Label className="">
                    <strong>Detalle: </strong>
                  </Form.Label>
                  {editReporte ? (
                    <textarea
                      className="inputEditReporte2 mb-3"
                      onChange={handleChange}
                      name="detalle"
                      value={values.detalle}
                      required
                    />
                  ) : (
                    <p className="inputEditReporteDetalle mb-3" enabled>
                      {values.detalle}
                    </p>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={6} md={6}>
            {editReporte ? (
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
              <div className="d-flex contenedorImagenReporte">
                {imageUrl ? (
                  <img
                    className="fotoReporteDetalle2"
                    style={styles}
                    src={imageUrl ? imageUrl : svg404}
                    alt="Captura del reporte"
                  />
                ) : (
                  <img
                    className="fotoReporteDetalle"
                    style={styles}
                    src={imageUrl ? imageUrl : svg404}
                    alt="Captura del reporte"
                  />
                )}
              </div>
            )}
            <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
              {!editReporte ? (
                <>
                  <FontAwesomeIcon
                    icon={faCamera}
                    disabled={imageUrl !== "" ? false : true}
                    onClick={capturarPantallaConImagenes}
                    id="download"
                    className="botonScreenshot"
                  />
                </>
              ) : (
                <></>
              )}
              {(user.tipoDeUsuario.nombre == "admin" ||
                user.tipoDeUsuario.nombre == "visualizador" ||
                user.tipoDeUsuario.nombre == "supervisor") &&
                !editReporte &&
                datos.reporte.despacho == null && (
                  <div className=" botonEditarDetalleEvento d-flex justify-content-left">
                    {datos.reporte.subcategoria?._id !=
                      "64e7da580a5e30019cccd20a" && (
                      <Button onClick={handleEditReporte}>Editar</Button>
                    )}
                  </div> //el id 64e7da580a5e30019cccd20a de la subcat pertenece a relevamiento de motos
                )}
              {editReporte && (
                <Button disabled={botonState} className=" mt-3" type="submit">
                  Guardar Cambios
                </Button>
              )}
              {volver && <Navigate to="/reportes" />}
            </div>
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

export default DetalleEvento;
