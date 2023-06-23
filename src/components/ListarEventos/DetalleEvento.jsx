import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../config/axios';

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
        toast.error(error.response?.data.message || error.message);
      }
    };

    useEffect(() => {
      getImg();
    }, []);

  return (
    <div className="layoutHeight">
      <label>{datos.reporte.fecha}</label>
      <br />
      <label>{datos.reporte.naturaleza.nombre}</label>
      <br />
      <label>{datos.reporte.detalle}</label>
      <br />
      <img style={styles} src={imageUrl} alt="Imagen" />
    </div>
  );
}

export default DetalleEvento