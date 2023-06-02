import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { ALTA_CATEGORIAS_VALUES } from "../../constants";
import "../AltaCategoria/AltaCategoria.css";
import GeneralTable from "../common/Table/GeneralTable";
import useGet from "../../hooks/useGet";

const AltaCategoria = () => {
  const [naturalezas, setNaturalezas] = useState([])
  const [selected, setSelected] = useState(undefined);
  const [categorias, loading, getCategorias] = useGet(
    "/categorias/listar",
    axios
  );
  const [buscador, setBuscador] = useState("");
  const [ResultadoBusaqueda, setResultadoBusaqueda] = useState([]);

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
  //       setResultadoBusaqueda(results);
  //     }
  //   }, [categoria.tipoDeCategoria, buscador]);

  const enviarDatos = async () => {
    try {
      // const respuesta = await axios.post("/categorias/alta", values);
      // console.log(respuesta);
      // setValues(ALTA_CATEGORIAS_VALUES);
      // toast.success("Cámara registrada con éxito");
      console.log(values);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    ALTA_CATEGORIAS_VALUES,
    enviarDatos
  );

  const getNaturalezaEventos = async ()=>{
    try {
      const {data} = await axios.get('/naturaleza/listar');
      
      setNaturalezas(data.naturalezas)
    
      
    } catch (error) {
      toast.error("Error en la conexión");
    }
  }

  useEffect(()=>{
  getNaturalezaEventos()
  },[])

  return (
    <>
      <div className="container-fluid">
        <Row>
          <Col xs={6} className="container-fluid">
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
                name="tipoDeCategoria"
                value={values.tipoDeCategoria}
                required
              >
                <option value="">Seleccione una opción</option>
                {/* <option>Municipal</option>
                <option>Seguridad</option> */}
                {naturalezas.map((item) => {
                 
                    return (
                      <option key={item._id}>
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
            {/* <GeneralTable headings={["Categorias", "Tipo"]}></GeneralTable> */}
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
    </>
  );
};

export default AltaCategoria;
