import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import useGet from "../../hooks/useGet";
import axios from "../../config/axios";
import TablaEventos from "./TablaEventos";
import { useNavigate } from "react-router-dom";
import { COMContext } from "../../context/COMContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const ListarEventos = () => {
  const [reportes, loading, getReportes] = useGet("/reportes/listar", axios);
  const { user } = useContext(COMContext);
  const [buscador, setBuscador] = useState("");
  const [ResultadoBusqueda, setResultadoBusqueda] = useState([]);
  const [selected, setSelected] = useState(undefined);

  const handleChange = (event) => {
    setBuscador(event.target.value);
  };

  const navigate = useNavigate();

  const nuevoReporte = () => {
    navigate("/alta-reporte");
  };

  useEffect(() => {
    if (Array.isArray(reportes.reportes)) {
      const results = reportes.reportes.filter(
        (reporte) =>
          reporte.detalle.toLowerCase().includes(buscador.toLowerCase()) ||
          reporte.usuario.nombreUsuario
            .toLowerCase()
            .includes(buscador.toLowerCase()) ||
          reporte.categoria.nombre
            .toLowerCase()
            .includes(buscador.toLowerCase())
      );
      setResultadoBusqueda(results);
    }
  }, [reportes, buscador]);

  return (
    <Container fluid className="layoutHeight">
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
          onClick={nuevoReporte}
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
          }}
        >
          +
        </Button>
        
      </div>
    
      <Row className="mt-5">
        <Col>
          {loading ? (
            <Col className="d-flex justify-content-center">
              <Spinner />
            </Col>
          ) : (
            <TablaEventos
              headings={[
                "Nro",
                "Fecha",
                "Detalle",
                "Usuario",
                "Evento",
                "Categoria",
                "",
              ]}
              items={
             [...ResultadoBusqueda].reverse()
              }
              setSelected={setSelected}
              selected={selected}
              getReportes={getReportes}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ListarEventos;
