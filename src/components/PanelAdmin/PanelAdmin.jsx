import React from "react";
import { Button } from "react-bootstrap";
import axios from "../../config/axios";
import "./PanelAdmin.css";

const darAltaNoticia = async () => {
  try {
    await axios.get(`users/noticias/reset`);
  } catch (error) {}
};
const darBajaNoticia = async () => {
  try {
    await axios.get(`users/noticias/ocultar`);
  } catch (error) {}
};

const PanelAdmin = () => {
  return (
    <>
      <div className="layoutHeight">
        <Button className="botonMostrarPodio " onClick={darAltaNoticia}>
          Mostrar Podio
        </Button>
        <Button className="botonMostrarPodio " onClick={darBajaNoticia}>
          Ocultar Podio
        </Button>
      </div>
    </>
  );
};

export default PanelAdmin;
