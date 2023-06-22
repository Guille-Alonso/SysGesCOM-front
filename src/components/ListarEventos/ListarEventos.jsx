import React from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import useGet from "../../hooks/useGet";
import axios from "../../config/axios";
import TablaEventos from "./TablaEventos";
import { useNavigate } from "react-router-dom";

const ListarEventos = () => {
  const [reportes, loading, getReportes] = useGet("/reportes/listar", axios);
  const navigate = useNavigate();

  const nuevoReporte = () => {
    navigate("/alta-reporte");
  };

  return (
    <Container className="layoutHeight">
      <Button onClick={nuevoReporte}>Nuevo Reporte</Button>
      <Row>
        <Col className="mt-5">
          {loading ? (
            <Spinner />
          ) : (
            <TablaEventos
              headings={[
                "Fecha",
                "Detalle",
                "Usuario",
                "Evento",
                "Categoria",
                "Subcategoria",
                "Captura",
                "",
              ]}
              items={reportes.reportes}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ListarEventos;
