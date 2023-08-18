import { COMContext } from "../../context/COMContext";
import { useContext, useEffect, useState } from "react";
import useGet from "../../hooks/useGet";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import axios from "../../config/axios";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "./PedidoCambios.css";

const PedidoCambios = () => {
  const { user } = useContext(COMContext);
  const [cambios, loading, getCambios, setCambios] = useGet((user.tipoDeUsuario=="visualizador" || user.tipoDeUsuario=="supervisor")? "/cambios/listarCambiosVisualizador" : "/cambios/listar", axios);
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

  const rechazarPedidoCambio = async (id)=>{
    const pedidoDeCambio = {
      estado: "rechazado",
    };
    try {
      const respuesta = await axios.put(
        `/cambios/confirmarCambio/${id}`,
        pedidoDeCambio
      );
      console.log(respuesta);
      toast.info("Cambio rechazado.");
      getCambios();
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  }

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = cambios?.cambios?.filter(
    (cam) => cam.estado === "acordado"
  )?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleChanges = cambios.cambios
    ?.filter((cam) => cam.estado === "acordado").reverse()
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

  const itemsPerPageConfirmado = 5;
  const [currentPageConfirmado, setCurrentPageConfirmado] = useState(1);
  const totalItemsConfirmado = cambios?.cambios?.filter(
    (cam) => cam.estado === "confirmado"
  )?.length;
  const totalPagesConfirmado = Math.ceil(
    totalItemsConfirmado / itemsPerPageConfirmado
  );
  const startIndexConfirmado =
    (currentPageConfirmado - 1) * itemsPerPageConfirmado;
  const endIndexConfirmado = startIndexConfirmado + itemsPerPageConfirmado;
  const visibleChangesConfirmado = cambios.cambios
    ?.filter((cam) => cam.estado === "confirmado").reverse()
    ?.slice(startIndexConfirmado, endIndexConfirmado);

  const nextPageConfirmado = () => {
    if (currentPageConfirmado < totalPagesConfirmado) {
      setCurrentPageConfirmado(currentPageConfirmado + 1);
    }
  };

  const prevPageConfirmado = () => {
    if (currentPageConfirmado > 1) {
      setCurrentPageConfirmado(currentPageConfirmado - 1);
    }
  };

  return (
    <>
      <div className="layoutHeight2">
        <Row className="m-0 gap-0">
     { (user.tipoDeUsuario == "administración" ) &&
        <Col lg={6} className="p-0">
            <div className="container-fluid d-flex flex-column align-items-center p-2 mt-5">
              <div className="cardCambioColor2">
                <div className="d-flex flex-column cardCambioOscura2 justify-content align-items-center">
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <Spinner />
                      ) : (
                        visibleChanges
                          ?.filter((cam) => cam.estado === "acordado")
                          .map((cam) =>
                            //cam.estado == "acordado").map((cam) =>
                            {
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
                                        onClick={() =>actualizarCambio(cam._id)
                                        }
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                  <td>
                                    {selected === cam._id ? (
                                     
                                      <FontAwesomeIcon icon={faBan} className="denegarCambio"
                                      onClick={() =>rechazarPedidoCambio(cam._id) }/>
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          )
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
          </Col>}
          <Col lg={6} className="">
            <div className="container-fluid d-flex flex-column align-items-center p-2 mt-5">
              <div className="cardCambioColor2">
                <div className="d-flex flex-column cardCambioOscura3 justify-content align-items-center">
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
                        visibleChangesConfirmado
                          ?.filter((cam) => cam.estado === "confirmado")
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
              <div className="paginacionCont mt-4">
                <Button
                  className="paginacionBtnPrev"
                  disabled={currentPageConfirmado === 1}
                  onClick={prevPageConfirmado}
                >
                  Anterior
                </Button>
                <div className="paginacionText">
                  Página {currentPageConfirmado} de {totalPagesConfirmado}
                </div>
                <Button
                  className="paginacionBtnNext"
                  disabled={
                    currentPageConfirmado ===
                    Math.ceil(cambios?.cambios?.length / itemsPerPageConfirmado)
                  }
                  onClick={nextPageConfirmado}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PedidoCambios;
