import React, { useState } from 'react'
import GeneralTable from '../common/Table/GeneralTable';
import useGet from '../../hooks/useGet';
import { Spinner } from 'react-bootstrap';
import axios from '../../config/axios';


const ListarCamaras = () => {
    const [ selected, setSelected]= useState(undefined)
    const [camara, loading] = useGet('/camaras/listar',axios);
     return (
       <>
          <h3 className='text-light'>Tabla de camaras</h3>
          {
           loading? <Spinner/> 
           :
           <GeneralTable headings={['Nombre', 'Ubicacion', 'Tipo', 'Estado']} items={camara.camaras} setSelected={setSelected} selected={selected}/>
          }
         
       </>
    
     )
}
export default ListarCamaras