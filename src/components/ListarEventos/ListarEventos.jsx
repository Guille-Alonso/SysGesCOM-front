import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import useGet from "../../hooks/useGet";
import axios from "../../config/axios";
import TablaEventos from "./TablaEventos";
import { useNavigate } from "react-router-dom";
import { COMContext } from "../../context/COMContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import './ListarEventos.css'

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
          reporte.numero.toString().includes(buscador) ||
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
        {
          (user.tipoDeUsuario == "admin" || user.tipoDeUsuario == "visualizador" || user.tipoDeUsuario == "supervisor") &&

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
        }
        
        {
          user.tipoDeUsuario == "supervisor" &&
          <FontAwesomeIcon onClick={getReportes} className="refrescarLista" icon={faRotate} />
        }
        {
          user.tipoDeUsuario == "supervisor" &&
          <div className="d-flex filtrarPorTipo">
            <label className="me-1">Seguridad</label>
            <input onClick={()=>setResultadoBusqueda(reportes.reportes.filter((reporte) =>reporte.naturaleza.nombre.toString().includes("Seguridad")))} 
            name="tipoDeEvento" value="seguridad" type="radio"></input>
            <label className="ms-4 me-1">Municipal</label>
            <input onClick={()=>setResultadoBusqueda(reportes.reportes.filter((reporte) =>reporte.naturaleza.nombre.toString().includes("Municipal")))} 
            name="tipoDeEvento" value="municipal" type="radio"></input>
          </div>
        }
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
              items={[...ResultadoBusqueda].reverse()}
              setSelected={setSelected}
              selected={selected}
              getReportes={getReportes}
              user={user}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ListarEventos;
