import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import "./DetalleEvento.css";

const DetalleEvento = () => {
  const [imageUrl, setImageUrl] = useState("");
  const location = useLocation();
  const datos = location.state;

  const styles = {
    height: "300px",
  };

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

  useEffect(() => {
    if(datos.reporte.rutaImagen !== ""){
      getImg();
    }

  }, []);

  return (
    <div className="layoutHeight">
      <div className="d-flex flex-column container contenedorDetalleReporte">
        <label className="mb-2">
          <strong>Fecha:</strong> {datos.reporte.fecha}
        </label>
        <label className="mb-2">
          <strong>Tipo: </strong>
          {datos.reporte.naturaleza.nombre.toUpperCase()}
        </label>
        <label className="mb-2">
          <strong>Categoria: </strong>
          {datos.reporte.categoria.nombre}
        </label>
        <label className="mb-2">
          <strong>Subcategoria: </strong>
          {datos.reporte.subcategoria?.nombre? datos.reporte.subcategoria.nombre : ""}
        </label>
        <label className="mb-2">
          <strong>Dispositivo: </strong>
          {datos.reporte.dispositivo.nombre}
        </label>
        <label className="mb-5">
          <strong>Detalle: </strong>
          {datos.reporte.detalle}
        </label>
        
        <img
          className="fotoReporteDetalle"
          style={styles}
          src={imageUrl}
          alt="Captura del evento"
        />
      </div>
    </div>
  );
};

export default DetalleEvento;
