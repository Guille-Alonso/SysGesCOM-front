import React, { useContext, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import { COMContext } from "../../context/COMContext";
import "./CardCambios.css";

const CardCambios = () => {
  const [fechaPedido, setFechaPedido] = useState("");
  const [fechaPedidoDevolucion, setFechaPedidoDevolucion] = useState("");
  const { user } = useContext(COMContext);
  const setFecha = (e) => {
    setFechaPedido(e.target.value);
  };
  const setFechaD = (e) => {
    setFechaPedidoDevolucion(e.target.value);
    console.log(fechaPedidoDevolucion);
  };
  const EnviarPedidoCambio = async () => {
    const pedidoDeCambio = {
      solicitante: user._id,
      pedido: fechaPedido,
      pedidoDevolucion: fechaPedidoDevolucion,
      estado: "consultado",
    };
    try {
      const respuesta = await axios.post("/cambios/alta", pedidoDeCambio);
      console.log(respuesta);
      toast.info("Pedido a la espera de confirmación");
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
    setFechaPedido("");
    setFechaPedidoDevolucion("");
  };

  const calcularFechaMinima = () => {
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 3); // Suma 3 días
    return fechaActual.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };

  return (
    <>
      <div className="cardCambioColor">
        <div className="d-flex flex-column cardCambioOscura justify-content-center align-items-center gap-4">
          <span className="spanCambiosTurno text-light ">Cambios de Turno</span>
          <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <p className="m-0 diaInput">Dia Pedido</p>
            <input
              type="date"
              name="fechaPedido"
              className="w-75 inputFechaCambio"
              value={fechaPedido}
              onChange={setFecha}
              min={calcularFechaMinima()}
            />
          </div>
          <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <p className="m-0 diaInput">Dia Devolución</p>
            <input
              type="date"
              name="fechaPedidoDevolucion"
              className="w-75 inputFechaCambio"
              value={fechaPedidoDevolucion}
              onChange={setFechaD}
              min={calcularFechaMinima()}
            />
          </div>
          {fechaPedido !== "" ? (
            <p className="text-light mb-0">
              <strong>Tu pedido es para: </strong>
              {fechaPedido}
            </p>
          ) : (
            <></>
          )}

          {fechaPedido !== "" ? (
            <Button className="botonEnviarPedido2" onClick={EnviarPedidoCambio}>
              Enviar pedido
            </Button>
          ) : (
            <Button className="botonEnviarPedido" disabled>
              Enviar pedido
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CardCambios;
