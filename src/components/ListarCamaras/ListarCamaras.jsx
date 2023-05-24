import React, { useEffect, useState } from 'react'
import GeneralTable from '../common/Table/GeneralTable';
import useGet from '../../hooks/useGet';
import { Spinner } from 'react-bootstrap';
import axios from '../../config/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './ListarCamaras.css';
import GeneralModal from '../common/GeneralModal/GeneralModal';



const ListarCamaras = () => {
  const [selected, setSelected] = useState(undefined);
  const [camara, loading] = useGet('/camaras/listar', axios);
  const [buscador, setBuscador] = useState('');
  const [ResultadoBusaqueda, setResultadoBusaqueda] = useState([]);
  
  const handleChange = (event) => {
    setBuscador(event.target.value);
  }

  useEffect(() => {
    if (Array.isArray(camara.camaras)) {
      const results = camara.camaras.filter((camara) =>
        camara.nombre.toLowerCase().includes(buscador.toLowerCase()) ||
        camara.ubicacion.toLowerCase().includes(buscador.toLowerCase()) ||
        camara.tipo.toLowerCase().includes(buscador.toLowerCase())
      );
      setResultadoBusaqueda(results);
    }
  }, [camara.camaras, buscador]);
  
  return (
    <>
      {/* <h3 className=' titulo text-light'>Tabla de camaras</h3> */}

      <div className="contBusquedaCamaras">
        <input type="text" className="buscadorCamaras" value={buscador} onChange={handleChange} />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="iconoBusquedaCamaras"
        />
      </div>

      {
        loading ? <Spinner />
          :
          <GeneralTable headings={['Nombre', 'Ubicacion', 'Tipo']} items={ResultadoBusaqueda} setSelected={setSelected} selected={selected} />
      }

    </>

  );
}
export default ListarCamaras