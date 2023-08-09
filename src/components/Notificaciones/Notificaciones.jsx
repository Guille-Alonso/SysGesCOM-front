import { COMContext } from "../../context/COMContext";
import { useContext, useState } from "react";
import useGet from "../../hooks/useGet";
import { Col, Row, Spinner } from "react-bootstrap";
import axios from "../../config/axios";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import "./Notificaciones.css";
import { toast } from "react-toastify";
import { isToday } from "date-fns";

const Notificaciones = () => {
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
      pedidoDevolucion: fechaPedido,
      solicitado: user._id,
      estado: "acordado",
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

  const calcularFechaMinima = () => {
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 3); // Suma 3 días
    return fechaActual.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };

  return (
    <>
      <div className="layoutHeight">
        <Row className="g-0">
          <Col className="contenedorNoticias mt-3" lg={8}>
            <div className="text-light">Hola</div>
          </Col>
          <Col lg={4}>
            <aside className="d-flex flex-column justify-content-center">
              <div className="container-fluid col-12 d-flex flex-column align-items-center mt-3">
                <h3 className="text-light">Pedidos de Cambio</h3>
                <table
                  className="table table-light table-striped tablaCambios"
                  getCambios={getCambios}
                >
                  <thead>
                    <tr>
                      <th scope="col">Solicitante</th>
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
                        .filter((cam) => cam.estado == "consultado")
                        .map((cam) => {
                          return (
                            <tr
                              key={nanoid()}
                              onClick={() => setSeleccionCambio(cam._id)}
                              className={
                                selected === cam._id ? "row-(selected" : ""
                              }
                            >
                              <td>{`${cam.solicitante.nombreUsuario} (${cam.solicitante.turno})`}</td>
                              <td>{cam.pedido}</td>
                              <td>
                                {selected === cam._id ? (
                                  user._id !== cam.solicitante._id ? (
                                    <input
                                      type="date"
                                      name="fechaPedidoDevolucion"
                                      min={calcularFechaMinima()}
                                      className="w-75 inputFechaCambio"
                                      disabled={
                                        user._id !== cam.solicitante._id ? (
                                          false
                                        ) : (
                                          <p> A confirmar</p>
                                        )
                                      }
                                      value={fechaPedido}
                                      onChange={setFecha}
                                    ></input>
                                  ) : (
                                    <p>A confirmar</p>
                                  )
                                ) : (
                                  <p>A confirmar</p>
                                )}
                              </td>
                              <td>
                                {selected === cam._id ? (
                                  <p
                                    name="solicitado"
                                    className="w-75 inputFechaCambio"
                                    onChange={setFecha}
                                  >
                                    {user._id !== cam.solicitante._id ? (
                                      `${user.nombreUsuario} (${user.turno})`
                                    ) : (
                                      <p>A confirmar</p>
                                    )}
                                  </p>
                                ) : (
                                  <p>A confirmar</p>
                                )}
                              </td>
                              <td>
                                {selected === cam._id ? (
                                  user._id !== cam.solicitante._id &&
                                  fechaPedido !== "" ? (
                                    <FontAwesomeIcon
                                      icon={faHandshake}
                                      className="confirmarCambio"
                                      onClick={() => actualizarCambio(cam._id)}
                                    />
                                  ) : (
                                    <></>
                                  )
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
            </aside>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Notificaciones;
