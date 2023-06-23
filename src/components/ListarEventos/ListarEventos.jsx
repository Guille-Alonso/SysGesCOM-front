import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import useGet from "../../hooks/useGet";
import axios from "../../config/axios";
import TablaEventos from "./TablaEventos";
import { useNavigate } from "react-router-dom";
import { COMContext } from "../../context/COMContext";

const ListarEventos = () => {
  const [reportes, loading, getReportes] = useGet("/reportes/listar", axios);
  const { user} = useContext(COMContext);
 
  const navigate = useNavigate();

  const nuevoReporte = () => {
    navigate("/alta-reporte");
  };

  return (
    
    <Container fluid className="layoutHeight">
     
        <Button className="ms-5 mt-2" onClick={nuevoReporte}>Nuevo Reporte</Button>

      <Row className="mt-5">
        <Col>
          {loading? (
            <Col className="d-flex justify-content-center">
            <Spinner />
            </Col>
          ) : (
            <TablaEventos
              headings={[
                "Fecha",
                "Detalle",
                "Usuario",
                "Evento",
                "Categoria",
                "Subcategoria",
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
