import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import "./DetalleEvento.css";
import { Button, Form, Spinner } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import useGet from "../../hooks/useGet";

const DetalleEvento = () => {
  const [imageUrl, setImageUrl] = useState("");
  const location = useLocation();
  const datos = location.state;
  const [editReporte, setEditReporte] = useState(false);
  const [naturalezas, setNaturalezas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const handleEditReporte = () => {
    setEditReporte(!editReporte);
  };
  const styles = {
    height: "300px",
  };
  const enviarDatos = async () => {
    try {
      const formData = new FormData();
      formData.append("detalle", values.detalle);
      formData.append("naturaleza", values.naturaleza);
      formData.append("categoria", values.categoria);
      formData.append("subcategoria", values.subcategoria);
      formData.append("dispositivo", values.dispositivo);
      formData.append("photo", values.photo);

      // const respuesta = await axios.put("/reportes/alta", formData);
      toast.success("Reporte registrado con éxito");
      setVolver(true);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    // ALTA_REPORTES_VALUES,
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
  const [dispositivos, loading, getDispositivos] = useGet(
    "/camaras/listar",
    axios
  );
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
    if (datos.reporte.rutaImagen !== "") {
      getImg();
      getDatos();
    }
  }, []);

  return (
    <>
      <div className="layoutHeight">
        <div className="d-flex flex-column container contenedorDetalleReporte">
          <Form>
            <label className="labelEditReporte">
              <strong>Fecha:</strong> {datos.reporte.fecha}
            </label>

            <div className="d-flex labelEditReporte">
              <label className="">
                <strong>Tipo: </strong>
              </label>
              {editReporte ? (
                <Form.Select
                  type=""
                  className="inputEditReporte"
                  onChange={handleChange}
                  value={datos.reporte.naturaleza._id}
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
                  {datos.reporte.naturaleza.nombre.toUpperCase()}
                </p>
              )}
              <label className="">
                <strong>Categoria: </strong>
              </label>
              {editReporte ? (
                <Form.Select
                  type=""
                  className="inputEditReporte"
                  onChange={handleChange}
                  value={datos.reporte.categoria._id}
                >
                  <option value="">Selecciona una opcion</option>
                  {categorias.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    );
                  })}
                </Form.Select>
              ) : (
                <p className="detalleEditReporte">
                  {datos.reporte.categoria.nombre}
                </p>
              )}
              <label className="">
                <strong>Subcategoria: </strong>
              </label>
              {editReporte ? (
                <Form.Select
                  type=""
                  className="inputEditReporte"
                  onChange={handleChange}
                  value={datos.reporte.subcategoria._id}
                >
                  <option value="">Selecciona una opcion</option>
                  {subcategorias.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    );
                  })}
                </Form.Select>
              ) : (
                <p className="detalleEditReporte">
                  {datos.reporte.subcategoria?.nombre
                    ? datos.reporte.subcategoria.nombre
                    : ""}
                </p>
              )}
              <label className="">
                <strong>Dispositivo: </strong>
              </label>
              {editReporte ? (
                <Form.Select
                  className="inputEditReporte"
                  onChange={handleChange}
                  // value={datos.reporte.dispositivo._id}
                >
                  <option value="">Selecciona una opcion</option>
                  {loading ? (
                    <Spinner />
                  ) : (
                    dispositivos.dispositivos.map((item) => {
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
                  {datos.reporte.dispositivo.nombre}
                </p>
              )}
            </div>
            <div className="d-flex labelEditReporte">
              <label className="mb-5">
                <strong>Detalle: </strong>
              </label>
              {editReporte ? (
                <Form.Text
                  className="detalleEditReporte"
                  onChange={handleChange}
                >
                  {datos.reporte.detalle}
                </Form.Text>
              ) : (
                <p className="detalleEditReporte" enabled>
                  {datos.reporte.detalle}
                </p>
              )}
            </div>
            <div className="d-flex">
              <img
                className="fotoReporteDetalle"
                style={styles}
                src={imageUrl}
                alt="Captura del evento"
              />
            </div>
            <div className="mt-5 d-flex justify-content-center">
              <Button onClick={handleEditReporte}>Editar</Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default DetalleEvento;
