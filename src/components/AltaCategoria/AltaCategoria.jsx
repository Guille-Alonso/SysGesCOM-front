import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { ALTA_CATEGORIAS_VALUES } from "../../constants";
import "../AltaCategoria/AltaCategoria.css";
import TableCategoria from "./TableCategoria";
import useGet from "../../hooks/useGet";
import { FaEdit } from "react-icons/fa";
import GeneralModal from "../common/GeneralModal/GeneralModal";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validationsAltaCategoria } from "../../helpers/validationsAltaCategoria";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

import { nanoid } from "nanoid";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AltaCategoria = () => {
  const [naturalezas, setNaturalezas] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [categorias, loading, getCategorias] = useGet(
    "/categorias/listar",
    axios
  );
  const [buscador, setBuscador] = useState("");
  const [ResultadoBusqueda, setResultadoBusqueda] = useState([]);

  const handleBuscador = (event) => {
    setBuscador(event.target.value);
  }

  useEffect(() => {
    if (Array.isArray(categorias.categorias)) {
      const results = categorias.categorias.filter(
        (cat) =>
          cat.nombre.toLowerCase().includes(buscador.toLowerCase())
      );
      setResultadoBusqueda(results);
    }
  }, [categorias, buscador]);

  const enviarDatos = async () => {
    try {
      await axios.post("/categorias/alta", values);
      getCategorias();
      setValues(ALTA_CATEGORIAS_VALUES);
      toast.success("Categoria registrada con éxito");
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    ALTA_CATEGORIAS_VALUES,
    enviarDatos,
    validationsAltaCategoria
  );

  const getNaturalezaEventos = async () => {
    try {
      const { data } = await axios.get("/naturaleza/listar");

      setNaturalezas(data.naturalezas);
    } catch (error) {
      toast.error("Error en la conexión");
    }
  };
  const headings = [
    "Categoria",
    "Tipo",
    "",
  ];
  useEffect(() => {
    getNaturalezaEventos();
  }, []);

  return (
    <>
      <div className="container-fluid layoutHeight">
        <header className="contenedorBusquedaCategoria">
          <input
            type="text"
            className="buscador"
            value={buscador}
            onChange={handleBuscador}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="iconoBusquedaUserList"
          />
          <GeneralModal
            buttonText={"+"}
            clase={"claseModalCategoria"}
            variant={"botonAgregarCategoria"}
            modalTitle={"Añadir Categoria"}
            seleccion={false}
            setValues={setValues}
            modalBody={
              <Form
                className="container-form-categoria"
                onSubmit={handleSubmit}
              >
                <Form.Label>Categoria Nueva</Form.Label>
                <Form.Control
                  className="inputAltaDeCamara"
                  type="text"
                  placeholder="Ej... Violencia"
                  value={values.categoria}
                  name="categoria"
                  onChange={handleChange}
                  required
                  maxLength={40}
                  minLength={3}
                />
                <Form.Label className="mt-2">Tipo</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  className="inputAltaDeCamara"
                  name="naturaleza"
                  value={values.naturaleza}
                  required
                >
                  <option value="">Seleccione una opción</option>

                  {naturalezas.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    );
                  })}
                </Form.Select>
                <div>
                  <Button
                    variant="success"
                    className="mt-3 col-12 mb-3"
                    size="lg"
                    type="submit"
                  >
                    Agregar
                  </Button>
                </div>
                <Container>
                  <Row>
                    <Col xs={12} className="d-flex">
                      {Object.keys(errors).length !== 0 &&
                        Object.values(errors).map((error, index) => (
                          <Alert className="me-1" variant="danger" key={index}>
                            {error}
                          </Alert>
                        ))}
                    </Col>
                  </Row>
                </Container>
              </Form>
            }
          />
        </header>
        <Row>
          <Col
            xs={12}
            className="container-fluid d-flex justify-content-center"
          >
            {loading ? (
               // <Spinner />
              <Container fluid>
                <Row>
                  <Col xl={6} className="tabla-Municipal">
                    <MDBTable responsive>
                      <MDBTableHead className="colorTabla">
                        <tr>
                          {headings.map((heading) => (
                            <th key={nanoid()}>{heading}</th>
                          ))}
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody className="colorTabla">
                        {Array.from({ length: 12 }).map(() => (

                          <tr key={nanoid()}>
                            <td>
                              <SkeletonTheme baseColor="#202020" highlightColor="blue">
                                <Skeleton />
                              </SkeletonTheme>
                            </td>
                            <td>
                              <SkeletonTheme baseColor="#202020" highlightColor="blue">
                                <Skeleton />
                              </SkeletonTheme>
                            </td>
                            <td>
                              <SkeletonTheme baseColor="#202020" highlightColor="blue">
                                <Skeleton />
                              </SkeletonTheme>
                            </td>
                          

                          </tr>
                        ))}


                      </MDBTableBody>

                    </MDBTable>
                  </Col>
                  <Col xl={6} className="tabla-Municipal">
                    <MDBTable responsive>
                      <MDBTableHead className="colorTabla">
                        <tr>
                          {headings.map((heading) => (
                            <th key={nanoid()}>{heading}</th>
                          ))}
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody className="colorTabla">
                        {Array.from({ length: 12 }).map(() => (

                          <tr key={nanoid()}>
                            <td>
                              <SkeletonTheme baseColor="#202020" highlightColor="blue">
                                <Skeleton />
                              </SkeletonTheme>
                            </td>
                            <td>
                              <SkeletonTheme baseColor="#202020" highlightColor="blue">
                                <Skeleton />
                              </SkeletonTheme>
                            </td>
                            <td>
                              <SkeletonTheme baseColor="#202020" highlightColor="blue">
                                <Skeleton />
                              </SkeletonTheme>
                            </td>
                          </tr>
                        ))}


                      </MDBTableBody>

                    </MDBTable>
                  </Col>
                </Row>
              </Container>

            ) : (
              <Container fluid>
                <Row>
                  <Col xl={6} className="tabla-Municipal">
                    <TableCategoria
                      headings={["Categorias", "Tipo", ""]}
                      items={ResultadoBusqueda.filter(
                        (cat) => cat.naturaleza.nombre == "Seguridad"
                      )}
                      selected={selected}
                      setSelected={setSelected}
                      getCategorias={getCategorias}
                      naturalezas={naturalezas}
                    ></TableCategoria>
                  </Col>
                  <Col xl={6} className="tabla-Municipal">
                    <TableCategoria
                      headings={["Categorias", "Tipo", ""]}
                      items={ResultadoBusqueda.filter(
                        (cat) => cat.naturaleza.nombre == "Municipal"
                      )}
                      selected={selected}
                      setSelected={setSelected}
                      getCategorias={getCategorias}
                      naturalezas={naturalezas}
                    ></TableCategoria>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>
        </Row>

      </div >
    </>
  );
};

export default AltaCategoria;
