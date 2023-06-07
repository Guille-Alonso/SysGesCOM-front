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
  const nuevaCamara = () => {
    navigate("/alta-camara");
  };

  return (
    <>
      <Container fluid>
        <div className="contenedorBusquedaCategoria">
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
          <Button
            onClick={nuevaCamara}
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
            }}
          >
            +
          </Button>
        </div>
  
        <Row>
          <Col className="d-flex justify-content-center">
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
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ListarCamaras;
