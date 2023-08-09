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
import "./PedidoCambios.css";

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
      estado: "confirmado",
    };
    try {
      const respuesta = await axios.put(
        `/cambios/confirmarCambio/${id}`,
        pedidoDeCambio
      );
      console.log(respuesta);
      toast.success("Cambio confirmado.");
      getCambios();
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <>
      <div className="layoutHeight2">
        <Row className="m-0 gap-0">
          <Col lg={6} className="p-0">
            <div className="container-fluid d-flex flex-column align-items-center p-2 mt-5">
              <div className="cardCambioColor2">
                <div className="d-flex flex-column cardCambioOscura2 justify-content-around align-items-center">
                  <h3 className="text-light p-4">Pedidos de Cambio</h3>
                  <table class="table text-light tablaCambios">
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
              </div>
            </div>
          </Col>
          <Col lg={6} className="">
            <div className="container-fluid d-flex flex-column align-items-center p-2 mt-5">
              <div className="cardCambioColor2">
                <div className="d-flex flex-column cardCambioOscura3 justify-content-around align-items-center">
                  <h3 className="text-light p-4">
                    Pedidos de Cambio Confirmados
                  </h3>
                  <table class="table text-light tablaCambios">
                    <thead>
                      <tr>
                        <th scope="col">Solicitante</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Dia a cubrir</th>
                        <th scope="col">Dia a devolver</th>
                        <th scope="col">Solicitado</th>
                        <th scope="col">Estado</th>
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
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PedidoCambios;
