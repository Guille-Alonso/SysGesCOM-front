import React, { useEffect, useState } from "react";
import TableCamaras from "../TableCamaras/TableCamaras";
import useGet from "../../hooks/useGet";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "../../config/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./ListarCamaras.css";
import GeneralModal from "../common/GeneralModal/GeneralModal";
import { useNavigate } from "react-router-dom";

const ListarCamaras = () => {
  const [selected, setSelected] = useState(undefined);
  const [camara, loading, getCamaras] = useGet("/camaras/listar", axios);
  const [buscador, setBuscador] = useState("");
  const [ResultadoBusqueda, setResultadoBusqueda] = useState([]);

  const handleChange = (event) => {
    setBuscador(event.target.value);
  };

  useEffect(() => {
    if (Array.isArray(camara.camaras)) {
      const results = camara.camaras.filter(
        (camara) =>
          camara.nombre.toLowerCase().includes(buscador.toLowerCase()) ||
          camara.ubicacion.toLowerCase().includes(buscador.toLowerCase()) ||
          camara.tipo.toLowerCase().includes(buscador.toLowerCase())
      );
      setResultadoBusqueda(results);
    }
  }, [camara.camaras, buscador]);

  const navigate = useNavigate();
  const nuevaCamara = ()=>{
    navigate("/alta-camara")
  }

  return (
    <>
      {/* <h3 className=' titulo text-light'>Tabla de camaras</h3> */}
    <Container fluid>
      <div className="contBusquedaCamaras">
        <input
          type="text"
          className="buscadorCamaras"
          value={buscador}
          onChange={handleChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="iconoBusquedaCamaras"
        />
      </div>
      <Row>
        <Col className="ms-5 my-4">
        <Button onClick={nuevaCamara} variant="success">Nueva Cámara</Button>
        </Col>
      </Row>
    </Container>
    
      {loading ? (
        <Spinner />
      ) : (
        <TableCamaras
          headings={["Nombre", "Ubicacion", "Tipo"]}
          items={ResultadoBusqueda}
          setSelected={setSelected}
          selected={selected}
          getCamaras={getCamaras}
        />
      )}
    </>
  );
};
export default ListarCamaras;
