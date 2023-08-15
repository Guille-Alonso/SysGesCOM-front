import { COMContext } from "../../context/COMContext";
import { useContext, useState } from "react";
import useGet from "../../hooks/useGet";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import axios from "../../config/axios";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import "./Notificaciones.css";
import { toast } from "react-toastify";
import {FaTrashAlt} from "react-icons/fa";;

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

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = cambios?.cambios?.filter(
    (cam) => cam.estado === "consultado"
  )?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleChanges = cambios.cambios
    ?.filter((cam) => cam.estado === "consultado")
    ?.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const borrarPedidoCambio = async (id)=>{
    try {
      await axios.delete("/cambios/", { data: { id: id } });
      toast.info("Pedido borrado con éxito");
      getCambios();
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  }

  return (
    <>
      <div className="layoutHeight">
        <Row className="g-0">
          <Col className="contenedorNoticias mt-3" sm={12} lg={6}>
            <div className="text-light">Hola</div>
          </Col>
          <Col lg={6} sm={0}>
            <aside className="d-flex flex-column justify-content-center">
              <div className="container-fluid col-12 d-flex flex-column align-items-center mt-3">
                <div className="cardCambioColorTablaCambios">
                  <div className="d-flex flex-column cardCambioOscuraTablaCambios justify-content align-items-center">
                    <h3 className="text-light p-2">Pedidos de Cambio</h3>
                    <table
                      className=" table text-light tablaCambios"
                    >
                      <thead>
                        <tr>
                          <th className="w-25" scope="col">
                            Solicitante
                          </th>
                          <th className="w-25" scope="col">
                            Dia a cubrir
                          </th>
                          <th className="w-25" scope="col">
                            Dia a devolver
                          </th>
                          <th scope="col">Solicitado</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <Spinner />
                        ) : (
                          visibleChanges
                            ?.filter((cam) => (cam.estado === "consultado" && cam.solicitante.tipoDeUsuario == user.tipoDeUsuario))
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
                                          className="inputFechaCambio"
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
                                          onClick={() =>
                                            actualizarCambio(cam._id)
                                          }
                                        />
                                      ) :user._id == cam.solicitante._id? (
                                        <FaTrashAlt
                                        onClick={() => borrarPedidoCambio(cam._id)}
                                        className="botonEliminar"
                                      />
                                      ): <></>
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
                <div className="paginacionCont mt-4">
                  <Button
                    className="paginacionBtnPrev"
                    disabled={currentPage === 1}
                    onClick={prevPage}
                  >
                    Anterior
                  </Button>
                  <div className="paginacionText">
                    Página {currentPage} de {totalPages}
                  </div>
                  <Button
                    className="paginacionBtnNext"
                    disabled={currentPage === totalPages}
                    onClick={nextPage}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </aside>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Notificaciones;
