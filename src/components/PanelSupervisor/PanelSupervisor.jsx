import React, { useEffect } from "react";
import axios from "../../config/axios";
import useGet from "../../hooks/useGet";
import { Spinner } from "react-bootstrap";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import "./PanelSupervisor.css";

const PanelSupervisor = () => {
  const [users, loading, getUsers] = useGet("/users/email", axios);

  const cambiarEstadoUsuario = async (usuario) => {
    const updatedUser = {
      relevamientoHabilitado:
        usuario.relevamientoHabilitado == undefined ||
        usuario.relevamientoHabilitado == false
          ? true
          : false,
    };
    try {
      const respuesta = await axios.put(
        `/users/actualizarRelevamiento/${usuario._id}`,
        updatedUser
      );
      getUsers();
      if (!usuario.relevamientoHabilitado) {
        toast.success(`${usuario.nombreUsuario} Habilitado para Relevamiento`);
      } else
        toast.info(`${usuario.nombreUsuario} Deshabilitado para Relevamiento`);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  function obtenerPeriodoDelDiaConHora(fecha) {
    const horaActual = fecha.getHours();

    if (horaActual >= 6 && horaActual < 12) {
      return "mañana";
    } else if (horaActual >= 12 && horaActual < 18) {
      return "intermedio";
    } else if (horaActual >= 18 && horaActual < 24) {
      return "tarde";
    } else {
      return "noche";
    }
  }
  useEffect(() => {
    console.log(users);
  }, [loading]);

  return (
    <div className="layoutHeight container">
      <div className="row">
        <div className="col-6 text-center">
          <h2 className="tituloTablasRelevamiento mt-1 ps-4 text-light">
            USUARIOS
          </h2>
          <div className="text-light d-flex justify-content-between mb-1">
            <th className="ps-5" scope="col">
              Usuario
            </th>
            <th className="" scope="col">
              Nombre
            </th>
            <th className="pe-3">Habilitar</th>
          </div>
          <div className="contenedorTablaPanel">
            <table className=" table text-light tablaPanelSupervisor">
              <tbody>
                {loading ? (
                  <Spinner />
                ) : (
                  users.users
                    .filter(
                      (user) =>
                        user.relevamientoHabilitado == false &&
                        user.tipoDeUsuario == "visualizador" &&
                        user.turno == obtenerPeriodoDelDiaConHora(new Date())
                    )
                    .sort((relA, relB) => {
                      const nombreA = relA.nombre.replace(/[0-9]+/, "");
                      const nombreB = relB.nombre.replace(/[0-9]+/, "");

                      // Primero compara los nombres alfabéticamente
                      if (nombreA < nombreB) return -1;
                      if (nombreA > nombreB) return 1;

                      // Si los nombres son iguales, compara los números
                    })
                    .map((u) => {
                      return (
                        <tr>
                          <td>{u.nombreUsuario}</td>
                          <td>{u.nombre}</td>
                          <td>
                            {" "}
                            <FontAwesomeIcon
                              onClick={() => cambiarEstadoUsuario(u)}
                              className="botonDespacho"
                              icon={faCheck}
                            />
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-6 text-center">
          <h2 className="tituloTablasRelevamiento mt-1 ps-4 text-light">
            USUARIOS PARA RELEVAMIENTO
          </h2>
          <div className="text-light d-flex justify-content-between mb-1">
            <th className="ps-5" scope="col">
              Usuario
            </th>
            <th className="" scope="col">
              Nombre
            </th>
            <th className="pe-3">Habilitar</th>
          </div>
          <div className="contenedorTablaPanel">
            <table className=" table text-light tablaPanelSupervisor">
              <tbody>
                {loading ? (
                  <Spinner />
                ) : (
                  users.users
                    .filter((user) => user.relevamientoHabilitado == true)
                    .sort((relA, relB) => {
                      const nombreA = relA.nombre.replace(/[0-9]+/, "");
                      const nombreB = relB.nombre.replace(/[0-9]+/, "");

                      // Primero compara los nombres alfabéticamente
                      if (nombreA < nombreB) return -1;
                      if (nombreA > nombreB) return 1;

                      // Si los nombres son iguales, compara los números
                    })
                    .map((u) => {
                      return (
                        <tr>
                          <td>{u.nombreUsuario}</td>
                          <td>{u.nombre}</td>
                          <td>
                            {" "}
                            <FontAwesomeIcon
                              onClick={() => cambiarEstadoUsuario(u)}
                              className="botonDespacho"
                              icon={faXmark}
                            />
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelSupervisor;
