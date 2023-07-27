import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { EDITAR_CATEGORIAS_VALUES } from "../../constants";
import useForm from "../../hooks/useForm";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import GeneralTable from "../common/Table/GeneralTable";
import GeneralModal from "../common/GeneralModal/GeneralModal";
import DeleteConfirmation from "../common/DeleteConfirmation/DeleteConfirmation";
import useGet from "../../hooks/useGet";
import EditarSubcategoria from "../EditarSubcategoria/EditarSubcategoria";
import AltaSubcategoria from "../AltaSubcategoria/AltaSubcategoria";
import "./EditarCategoria.css";
import { validationsEditarCategoria } from "../../helpers/validationsEditarCategoria";

const EditarCategoria = () => {
  const location = useLocation();
  const datos = location.state;
  const [selected, setSelected] = useState(undefined);
  const navigate = useNavigate();
  const [subcategorias, loading, getSubcategorias] = useGet(
    `/subcategorias/listar/${datos.categoria._id}`,
    axios
  );

  const editarCategoria = async () => {
    const { _id, ...categoriaInfo } = datos.categoria;
    if (JSON.stringify(categoriaInfo) !== JSON.stringify(values)) {
      try {
        await axios.put(
          `/categorias/actualizarCategoria/${datos.categoria._id}`,
          values
        );
        toast.success("Categoría actualizada");
        navigate("/alta-categoria");
      } catch (error) {
        toast.error(
          error.response?.data.message ||
          error.response?.data.errorMje ||
          error.message
        );
      }
    } else toast.error("No hiciste cambios");
  };

  const borrarSubcategoria = async () => {
    try {
      await axios.delete("/subcategorias/", { data: { id: selected._id } });
      toast.info("Subcategoría borrada");
      getSubcategorias();
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    EDITAR_CATEGORIAS_VALUES,
    editarCategoria,
    validationsEditarCategoria
  );

  useEffect(() => {
    const { _id, ...categoriaInfo } = datos.categoria;
    setValues(categoriaInfo);
  }, []);

  return (
    <Container className="layoutHeight">
      <Row className="mt-3">
        <Col>
          <Form
            className="container-form-alta-categoria"
            onSubmit={handleSubmit}
          >
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              className="inputAltaDeCamara"
              type="text"
              placeholder="Ej... Violencia"
              value={values.nombre}
              name="nombre"
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
              value={values.naturaleza._id}
              required
            >
              <option value="">Seleccione una opción</option>

              {datos.naturalezas.map((item) => {
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
                Editar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
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

      <Row>
        <Col className="col-10" xs={10} sm={10} md={10} lg={11} >
         
          {loading ? (
            <Spinner />
          ) : (
            <GeneralTable
              headings={["Id", "Nombre"]}
              items={subcategorias.subcategorias}
              setSelected={setSelected}
              selected={selected}
            />
          )}
        </Col>

        <Col className="colBtn col-2" xs={2} sm={2} md={2} lg={1}>

          <Row className="botones-Categoria ">
            <GeneralModal
              buttonText="Eliminar"
              clase="modalEliminarSubcategoria"
              modalTitle={"Eliminar Subcategoría"}
              modalBody={
                <DeleteConfirmation deleteFunction={borrarSubcategoria} />
              }
              variant="danger"
              seleccion={selected}
            />
          </Row>

          <Row className="botones-Categoria">
            <GeneralModal
              buttonText="Editar"
              clase="modalEditarSubcategoria"
              modalTitle={"Editar Subcategoría"}
              modalBody={
                <EditarSubcategoria
                  selected={selected}
                  getSubcategorias={getSubcategorias}
                  setSelected={setSelected}
                />
              }
              variant="success"
              seleccion={selected}
            />
          </Row>

          <Row className="botones-Categoria">
            <GeneralModal
              buttonText="Agregar"
              clase="modalAgregarSubcategoria"
              modalTitle={"Agregar Subcategoría"}
              modalBody={
                <AltaSubcategoria
                  getSubcategorias={getSubcategorias}
                  idCategoria={datos.categoria._id}
                />
              }
              variant="success"
              seleccion={false}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarCategoria;
