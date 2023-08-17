import React from 'react'
import axios from '../../config/axios';
import useGet from '../../hooks/useGet';
import { Spinner } from 'react-bootstrap';
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

const PanelSupervisor = () => {

const [users, loading, getUsers] = useGet("/users/email", axios);

const cambiarEstadoUsuario = async (usuario) =>{
    const updatedUser = {
        relevamientoHabilitado: usuario.relevamientoHabilitado == undefined ||usuario.relevamientoHabilitado == false ? true :false
      };
      try {
        const respuesta = await axios.put(
          `/users/actualizarRelevamiento/${usuario._id}`,
          updatedUser
        );
        getUsers();
        if(!usuario.relevamientoHabilitado){

            toast.success(`${usuario.nombreUsuario} Habilitado para Relevamiento`);
        }else toast.info(`${usuario.nombreUsuario} Deshabilitado para Relevamiento`);

      } catch (error) {
        toast.error(error.response?.data.message || error.message);
      }
}

function obtenerPeriodoDelDiaConHora(fecha) {
    const horaActual = fecha.getHours();
  
    if (horaActual >= 7 && horaActual < 15) {
      return 'mañana';
    } else if (horaActual >= 15 && horaActual < 23) {
      return 'tarde';
    } else {
      return 'noche';
    }
  }  

  return (
      <div className='layoutHeight container'>
          <div className='row'>

              <div className='col-6'>
                  <table
                      className=" table text-light tablaCambios"
                  >
                      <thead>
                          <tr>
                              <th className="w-25" scope="col">
                                  Usuario
                              </th>
                              <th className="w-25" scope="col">
                                  Nombre
                              </th>
                              <th>Habilitar</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              loading ?
                                  <Spinner />
                                  :
                                  users.users.filter(user => user.relevamientoHabilitado == false && user.tipoDeUsuario == "visualizador" && user.turno== obtenerPeriodoDelDiaConHora(new Date())).map(u => {
                                      return (
                                          <tr>
                                              <td>{u.nombreUsuario}</td>
                                              <td>{u.nombre}</td>
                                              <td>  <FontAwesomeIcon onClick={() => cambiarEstadoUsuario(u)} className="botonDespacho" icon={faCheck} /></td>
                                          </tr>
                                      )
                                  })
                          }
                      </tbody>
                  </table>
              </div>
              <div className='col-6'>
                  <table
                      className=" table text-light tablaCambios"
                  >
                      <thead>
                          <tr>
                              <th className="w-25" scope="col">
                                  Usuario
                              </th>
                              <th className="w-25" scope="col">
                                  Nombre
                              </th>
                              <th>Deshabilitar</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              loading ?
                                  <Spinner />
                                  :
                                  users.users.filter(user => user.relevamientoHabilitado == true).map(u => {
                                      return (
                                          <tr>
                                              <td>{u.nombreUsuario}</td>
                                              <td>{u.nombre}</td>
                                              <td>  <FontAwesomeIcon onClick={() => cambiarEstadoUsuario(u)} className="botonDespacho" icon={faXmark} /></td>
                                          </tr>
                                      )
                                  })
                          }
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  )
}

export default PanelSupervisor