import React, { useState } from 'react'
import GeneralTable from '../components/common/Table/GeneralTable'
import axios from '../config/axios';
import useGet from "../hooks/useGet";
import { Spinner } from 'react-bootstrap';

const HomePage = () => {
 const [ selected, setSelected]= useState(undefined)
 const [users, loading] = useGet('/users/email',axios);
  return (
    <>
       <h1 className='text-light'>Bienvenido</h1>
       <h3 className='text-light'>Tabla de prueba</h3>
       {
        loading? <Spinner/> 
        :
        <GeneralTable headings={['Usuario','Nombre','Email','Turno','Rol']} items={users.users} setSelected={setSelected} selected={selected}/>
       }
      
    </>
 
  )
}

export default HomePage