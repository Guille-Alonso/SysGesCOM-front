import React, { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import { SUBCATEGORIAS_VALUES } from "../../constants";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import useGet from "../../hooks/useGet";
import useForm from "../../hooks/useForm";
import { validationsEditarSubcategoria } from "../../helpers/validationsEditarSubcategoria";

const EditarSubcategoria = ({
  onClose,
  selected,
  getSubcategorias,
  setSelected,
}) => {
  const [categorias, loading, getCategorias] = useGet(
    `/categorias/listar`,
    axios
  );

  const editarSubcategoria = async () => {
    const { _id, ...subcategoriaInfo } = selected;
    if (JSON.stringify(subcategoriaInfo) !== JSON.stringify(values)) {
      try {
        await axios.put(
          `/subcategorias/actualizarSubcategoria/${selected._id}`,
          values
        );
        toast.success("Subcategoría actualizada");
        getSubcategorias();
        setSelected(undefined);
        onClose();
      } catch (error) {
        toast.error(
          error.response?.data.message ||
            error.response?.data.errorMje ||
            error.message
        );
      }
    } else toast.error("No hiciste cambios");
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    SUBCATEGORIAS_VALUES,
    editarSubcategoria,
    validationsEditarSubcategoria
  ); 

  useEffect(() => {
    const { _id, ...subcategoriaInfo } = selected;
    setValues(subcategoriaInfo);
  }, []);

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col>
            <h2 className="mb-5 text-light">Editar Subcategoria</h2>
            <Form className="container-form-categoria" onSubmit={handleSubmit}>
              <Form.Label>Subcategoria</Form.Label>
              <Form.Control
                className="inputAltaDeCamara"
                type="text"
                placeholder="Ej... Violencia"
                value={values.nombre}
                name="nombre"
                onChange={handleChange}
                required
                maxLength={60}
                minLength={3}
              />
              <Form.Label className="mt-2">Categoría</Form.Label>
              <Form.Select
                onChange={handleChange}
                className="inputAltaDeCamara"
                name="categoria"
                value={values.categoria._id}
                required
              >
                <option value="">Seleccione una opción</option>

                {loading ? (
                  <Spinner />
                ) : (
                  categorias.categorias.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    );
                  })
                )}
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
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditarSubcategoria;
