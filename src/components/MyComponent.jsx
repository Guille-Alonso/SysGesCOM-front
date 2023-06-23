import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MyComponent = () => {
  const [imageUrl, setImageUrl] = useState('');
  const location = useLocation();
  const datos = location.state;

  const styles = {
    height:"300px"
  };

  useEffect(() => {
    // Realizar la petición al backend para obtener la imagen
    fetch(`http://localhost:4000/reportes/listar/${datos.reporte._id}`)
      .then(response => response.blob())
      .then(blob => {
        // Crear una URL del objeto Blob para mostrar la imagen
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      });
     
  }, []);

  return (
    <div className='layoutHeight'>
            <label>{datos.reporte.fecha}</label>
            <br/>
            <label>{datos.reporte.naturaleza.nombre}</label>
            <br/>
            <label>{datos.reporte.detalle}</label>
            <br/>
            <img style={styles}src={imageUrl} alt="Imagen" />
        
   
    </div>
  );
};

export default MyComponent;