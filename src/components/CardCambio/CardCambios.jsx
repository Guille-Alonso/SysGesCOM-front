import React, { useContext, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import { COMContext } from "../../context/COMContext";
import "./CardCambios.css";

const CardCambios = () => {
  const [fechaPedido, setFechaPedido] = useState("");
  const { user } = useContext(COMContext);
  const setFecha = (e) => {
    setFechaPedido(e.target.value);
  };
  const EnviarPedidoCambio = async () => {
    const pedidoDeCambio = {
      solicitante: user._id,
      pedido: fechaPedido,
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
          <input
            type="date"
            name="fechaPedido"
            className="w-75 inputFechaCambio"
            value={fechaPedido}
            onChange={setFecha}
            min={calcularFechaMinima()}
          />
          {fechaPedido !== "" ? (
            <p className="text-light">
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
