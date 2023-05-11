import React, { useState } from 'react'
import GeneralTable from '../common/Table/GeneralTable';
import useGet from '../../hooks/useGet';
import { Spinner } from 'react-bootstrap';
import axios from '../../config/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './ListarCamaras.css';


const ListarCamaras = () => {
  const [selected, setSelected] = useState(undefined);
  const [camara, loading] = useGet('/camaras/listar', axios);

  const handleChange = () => { };

  return (
    <>
      <h3 className='text-light'>Tabla de camaras</h3>

      <div className="contBusquedaCamaras">
        <input type="text" className="buscadorCamaras" onChange={handleChange} />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="iconoBusquedaCamaras"
        //   hacer funcion de busqueda en el icono
        />
      </div>

        {
          loading ? <Spinner />
            :
            <GeneralTable headings={['Nombre', 'Ubicacion', 'Tipo', 'Estado']} items={camara.camaras} setSelected={setSelected} selected={selected} />
        }

    </>

  );
}
export default ListarCamaras