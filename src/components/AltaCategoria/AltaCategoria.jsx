import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { ALTA_CATEGORIAS_VALUES } from "../../constants";
import "../AltaCategoria/AltaCategoria.css";
import GeneralTable from "../common/Table/GeneralTable";
import useGet from "../../hooks/useGet";
import { FaEdit } from "react-icons/fa";
import GeneralModal from "../common/GeneralModal/GeneralModal";

const AltaCategoria = () => {
  const [naturalezas, setNaturalezas] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [categorias, loading, getCategorias] = useGet(
    "/categorias/listar",
    axios
  );
  const [buscador, setBuscador] = useState("");
  const [ResultadoBusqueda, setResultadoBusqueda] = useState([]);

  //   const handleChange = (event) => {
  //     setBuscador(event.target.value);
  //   }

  //   useEffect(() => {
  //     if (Array.isArray(camara.camaras)) {
  //       const results = camara.camaras.filter(
  //         (camara) =>
  //           camara.nombre.toLowerCase().includes(buscador.toLowerCase()) ||
  //           camara.ubicacion.toLowerCase().includes(buscador.toLowerCase()) ||
  //           camara.tipo.toLowerCase().includes(buscador.toLowerCase())
  //       );
  //       setResultadoBusqueda(results);
  //     }
  //   }, [categoria.tipoDeCategoria, buscador]);

  const enviarDatos = async () => {
    try {
      const respuesta = await axios.post("/categorias/alta", values);
      getCategorias();
      setValues(ALTA_CATEGORIAS_VALUES);
      toast.success("Categoria registrada con éxito");
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    ALTA_CATEGORIAS_VALUES,
    enviarDatos
  );

  const getNaturalezaEventos = async () => {
    try {
      const { data } = await axios.get("/naturaleza/listar");

      setNaturalezas(data.naturalezas);
    } catch (error) {
      toast.error("Error en la conexión");
    }
  };

  useEffect(() => {
    getNaturalezaEventos();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <Row>
          <Col xs={12} className="container-fluid">
            {loading ? (
              <Spinner />
            ) : (
              <Container fluid>
                <Row>
                  <Col xl={6} className="tabla-Municipal">
                    <GeneralTable
                      headings={["Categorias", "Tipo"]}
                      items={categorias.categorias.filter(
                        (cat) => cat.naturaleza.nombre == "Seguridad"
                      )}
                      selected={selected}
                      setSelected={setSelected}
                    ></GeneralTable>
                  </Col>
                  <Col xl={6} className="tabla-Municipal">
                    <GeneralTable
                      headings={["Categorias", "Tipo"]}
                      items={categorias.categorias.filter(
                        (cat) => cat.naturaleza.nombre == "Municipal"
                      )}
                      selected={selected}
                      setSelected={setSelected}
                    ></GeneralTable>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>
        </Row>
        <div className="alertaError">
          {Object.keys(errors).length !== 0 &&
            Object.values(errors).map((error, index) => (
              <Alert variant="danger" key={index}>
                {error}
              </Alert>
            ))}
        </div>
      </div>
      <GeneralModal
        buttonText={"+"}
        clase={"claseModalCategoria"}
        variant={"botonAgregarCategoria"}
        modalTitle={"Añadir Categoria"}
        modalBody={
          <Form className="container-form-categoria" onSubmit={handleSubmit}>
            <Form.Label>Categoria Nueva</Form.Label>
            <Form.Control
              className="inputAltaDeCamara"
              type="text"
              placeholder="Ej... Violencia"
              value={values.categoria}
              name="categoria"
              onChange={handleChange}
              required
              maxLength={20}
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
          </Form>
        }
      />
    </>
  );
};

export default AltaCategoria;
