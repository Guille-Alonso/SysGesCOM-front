import { COMContext } from "../../context/COMContext";
import { useContext, useState } from "react";
import useGet from "../../hooks/useGet";
import { Col, Row, Spinner } from "react-bootstrap";
import axios from "../../config/axios";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { ca } from "date-fns/locale";
import "../Notificaciones/Notificaciones.css";

const PedidoCambios = () => {
  const { user } = useContext(COMContext);
  const [cambios, loading, getCambios] = useGet("/cambios/listar", axios);
  const [fechaPedido, setFechaPedido] = useState("");
  const [selected, setSelected] = useState(null);
  const setFecha = (e) => {
    setFechaPedido(e.target.value);
  };
  const setSeleccionCambio = (id) => {
    setSelected(id);
    setFechaPedido("");
  };

  const actualizarCambio = async (id) => {
    const pedidoDeCambio = {
      estado: true,
      estado: "confirmado",
    };
    try {
      const respuesta = await axios.put(
        `/cambios/confirmarCambio/${id}`,
        pedidoDeCambio
      );
      console.log(respuesta);
      toast.success("Pedido de cambio hecho, se te confirmará a la brevedad.");
      getCambios();
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <>
      <div className="layoutHeight">
        <Row>
          <Col>
            <div className="container-fluid col-6 d-flex flex-column align-items-center p-2 mt-5">
              <h3 className="text-light">Pedidos de Cambio</h3>
              <table class="table table-light table-striped align-items-center tablaCambios">
                <thead>
                  <tr>
                    <th scope="col">Solicitante</th>
                    <th scope="col">Turno</th>
                    <th scope="col">Dia a cubrir</th>
                    <th scope="col">Dia a devolver</th>
                    <th scope="col">Solicitado</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Spinner />
                  ) : (
                    cambios.cambios
                      .filter((cam) => cam.estado == "acordado")
                      .map((cam) => {
                        return (
                          <tr
                            key={nanoid()}
                            onClick={() => setSeleccionCambio(cam._id)}
                            className={
                              selected === cam._id ? "row-(selected" : ""
                            }
                          >
                            <td>{cam.solicitante.nombreUsuario}</td>
                            <td>{cam.solicitante.turno}</td>
                            <td>{cam.pedido}</td>
                            <td>{cam.pedidoDevolucion}</td>
                            <td>{cam.solicitado.nombreUsuario}</td>
                            <td>
                              {selected === cam._id ? (
                                <FontAwesomeIcon
                                  icon={faCircleCheck}
                                  className="confirmarCambio"
                                  onClick={() => actualizarCambio(cam._id)}
                                />
                              ) : (
                                <></>
                              )}
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </Col>
          <Col>
            <div className="container-fluid col-6 d-flex flex-column align-items-center p-2 mt-5">
              <h3 className="text-light">Pedidos de Cambio Confirmados</h3>
              <table class="table table-light table-striped tablaCambios">
                <thead>
                  <tr>
                    <th scope="col">Solicitante</th>
                    <th scope="col">Turno</th>
                    <th scope="col">Dia a cubrir</th>
                    <th scope="col">Dia a devolver</th>
                    <th scope="col">Solicitado</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Spinner />
                  ) : (
                    cambios.cambios
                      .filter((cam) => cam.estado == "confirmado")
                      .map((cam) => {
                        return (
                          <tr
                            key={nanoid()}
                            onClick={() => setSeleccionCambio(cam._id)}
                            className={
                              selected === cam._id ? "row-(selected" : ""
                            }
                          >
                            <td>{cam.solicitante.nombreUsuario}</td>
                            <td>{cam.solicitante.turno}</td>
                            <td>{cam.pedido}</td>
                            <td>{cam.pedidoDevolucion}</td>
                            <td>{cam.solicitado.nombreUsuario}</td>
                            <td>Confirmado</td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PedidoCambios;
