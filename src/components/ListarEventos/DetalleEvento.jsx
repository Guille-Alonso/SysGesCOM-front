import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import "./DetalleEvento.css";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import useGet from "../../hooks/useGet";
import { ALTA_REPORTES_VALUES } from "../../constants";
import { COMContext } from "../../context/COMContext";
import { Navigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const DetalleEvento = () => {
  const [dispositivos, loading, getDispositivos] = useGet(
    "/camaras/listar",
    axios
  );

  const { user } = useContext(COMContext);
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
    console.log(values);
    const { _id, ...eventoInfo } = datos.reporte;
    if (JSON.stringify(eventoInfo) !== JSON.stringify(values)) {
      try {
        const formData = new FormData();
        formData.append("detalle", values.detalle);
        formData.append("naturaleza", values.naturaleza._id? values.naturaleza._id : values.naturaleza);
        formData.append("categoria", values.categoria._id? values.categoria._id : values.categoria);
        formData.append("subcategoria", values.subcategoria?._id? values.subcategoria._id : values.subcategoria);
        formData.append("dispositivo", values.dispositivo._id? values.dispositivo._id : values.dispositivo);
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
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    ALTA_REPORTES_VALUES,
    enviarDatos
    // validationsAltaEvento
  );
  const getImg = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/reportes/listar/${datos.reporte._id}`,
        {
          responseType: "blob", // Especifica el tipo de respuesta como Blob
        }
      );

      const blob = response.data;
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      toast.error("Imágen no encontrada");
    }
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
    console.log(datos.reporte);
    const { _id, ...eventoInfo } = datos.reporte;
    setValues(eventoInfo);
    setNatuSelected(eventoInfo.naturaleza._id)
    setCatSelected(eventoInfo.categoria._id)
  
    if (datos.reporte.rutaImagen !== "") {
      getImg();
    }
    getDatos();
  }, []);

  return (
    <Container className="d-flex layoutHeight contenedorDetalleReporte">
      <Form onSubmit={handleSubmit}>
        <Form.Label className="labelEditReporte">
          <strong>Fecha:</strong> {values.fecha}
        </Form.Label>
        <br/>
        <Form.Label className="labelEditReporte">
         {datos.reporte._id}
        </Form.Label>
        <Row>
          <Col>
            <div className="d-flex-col labelEditReporte">
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
                <p className="detalleEditReporte">{values.categoria.nombre}</p>
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
                    .filter((subcat) => subcat.categoria._id == catSelected)
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
              <Form.Label className="">
                <strong>Dispositivo: </strong>
              </Form.Label>
              {editReporte ? (
                <Form.Select
                  className="inputEditReporte"
                  onChange={handleChange}
                  value={values.dispositivo._id}
                  name="dispositivo"
                >
                  <option value="">Selecciona una opcion</option>
                  {loading ? (
                    <Spinner />
                  ) : (
                    dispositivos.camaras.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.nombre}
                        </option>
                      );
                    })
                  )}
                </Form.Select>
              ) : (
                <p className="detalleEditReporte">
                  {values.dispositivo.nombre}
                </p>
              )}
            </div>
            <div className="d-flex labelEditReporte mt-3">
              <Form.Label className="mb-5">
                <strong>Detalle: </strong>
              </Form.Label>
              {editReporte ? (
                <input
                  type="text"
                  // className="detalleEditReporte"
                  onChange={handleChange}
                  name="detalle"
                  value={values.detalle}
                />
              ) : (
                <p className="detalleEditReporte" enabled>
                  {values.detalle}
                </p>
              )}
            </div>
            {(user.tipoDeUsuario == "admin" ||
              user.tipoDeUsuario == "visualizador" ||
              user.tipoDeUsuario == "supervisor") && (
              <div className="mt-5 d-flex justify-content-center">
                <Button onClick={handleEditReporte}>Editar</Button>
              </div>
            )}
           
              {volver && <Navigate to="/reportes" />}
          </Col>
          <Col>
            {editReporte ? (
              <Form.Group className="inputAltaEvento">
                <Form.Label className="mt-2">Captura</Form.Label>
                <Form.Control
                  type="file"
                  title="Suba una imágen"
                  onChange={handleFileInputChange}
                  name="photo"
                  accept="image/*"
                />
              </Form.Group>
            ) : (
              <div className="d-flex">
                <img
                  className="fotoReporteDetalle"
                  style={styles}
                  src={imageUrl}
                  alt="Captura del evento"
                />
              </div>
            )}
             {
              editReporte && <Button className="mt-3" type="submit">Guardar Cambios</Button>
            }
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default DetalleEvento;
