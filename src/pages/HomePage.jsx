import React, { useContext, useState } from "react";
import "./Home.css";
import { Button, Spinner } from "react-bootstrap";
import LeaderboardReportes from "../components/LeaderboardReportes/LeaderboardReportes";
import workingSvg from "../assets/img/focused-working.svg";
import useGet from "../hooks/useGet";
import axios from "../config/axios";
import { COMContext } from "../context/COMContext";

const HomePage = () => {
  const [reportes, loading] = useGet("/reportes/podio", axios);
  const [fechaPedido, setFechaPedido] = useState("");
  const { user } = useContext(COMContext);
  const [fechaParaDevolver, setFechaParaDevolver] = useState("");
  const setFecha = (e) => {
    setFechaPedido(e.target.value);
  };
  const setFecha2 = (e) => {
    setFechaParaDevolver(e.target.value);
  };

  const EnviarPedidoCambio = () => {
    const pedidoDeCambio = {
      solicitante: user.nombre,
      pedido: fechaPedido,
      pedidoDevolucion: fechaParaDevolver,
    };
    console.log(pedidoDeCambio);
  };

  return (
    <div className="layoutHeight">
      <div className="d-flex justify-content-around">
        <main className="estadisticas">
          <div>
            <img src={workingSvg} className="inProgress" alt="" />
          </div>
        </main>
        <aside className="contenedorCambios">
          {loading ? (
            <Spinner variant="light" />
          ) : (
            <LeaderboardReportes reportes={reportes} />
          )}
          <div className="almanaque mt-5 d-flex flex-column justify-content-around">
            <div className="d-flex flex-column gap-1 align-items-center">
              <span className="spanCambiosTurno">Cambios de Turno</span>
              <input
                type="date"
                name="fechaPedido"
                className="w-75 inputFechaCambio"
                value={fechaPedido}
                onChange={setFecha}
              />
              {fechaPedido !== "" ? (
                <p className="text-dark">
                  <strong>Tu pedido es para: </strong>
                  {fechaPedido}
                </p>
              ) : (
                <></>
              )}
              <input
                type="date"
                name="fechaParaDevolver"
                className="w-75 inputFechaCambio"
                value={fechaParaDevolver}
                onChange={setFecha2}
              />
              {fechaParaDevolver !== "" ? (
                <p className="text-dark">
                  <strong>Podes devolver este día: </strong>
                  {fechaParaDevolver}
                </p>
              ) : (
                <></>
              )}
            </div>
            <Button
              variant="primary"
              className="botonEnviarPedido"
              onClick={EnviarPedidoCambio}
            >
              Enviar pedido
            </Button>
          </div>
        </aside>
      </div>
      <div className="d-flex justify-content-around mt-5">
        <section className="w-50 text-center"></section>
      </div>
    </div>
  );
};

export default HomePage;
