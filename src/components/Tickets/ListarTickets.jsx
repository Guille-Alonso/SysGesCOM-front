import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useGet from "../../hooks/useGet";
import axios from "../../config/axios";
import TablaTickets from "./TablaTickets";
import { COMContext } from "../../context/COMContext";
import { useEffect } from "react";

const ListarTickets = () => {
  const [buscador, setBuscador] = useState("");
  const handleChange = (event) => {
    setBuscador(event.target.value);
  };
  const navigate = useNavigate();
  const nuevaCamara = () => {
    const props = { getTickets: getTickets() };

    navigate("/nuevo-ticket", { state: props });
  };
  const [selected, setSelected] = useState(undefined);
  const [tickets, loading, getTickets] = useGet("/tickets/listar", axios);
  useEffect(() => {
    getTickets();
  }, []);

  const { user } = useContext(COMContext);
  return (
    <>
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
        <Row className="mt-5">
          <Col>
            {loading ? (
              <Col className="d-flex justify-content-center">
                <Spinner variant="light" />
              </Col>
            ) : (
              <TablaTickets
                headings={[
                  "Nro",
                  "Fecha",
                  "Titulo",
                  "Descripcion",
                  "Usuario",
                  "Dispositivo",
                  "Estado",
                  "",
                ]}
                items={[...tickets.tickets].reverse()}
                setSelected={setSelected}
                selected={selected}
                getTickets={getTickets}
                user={user}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListarTickets;
