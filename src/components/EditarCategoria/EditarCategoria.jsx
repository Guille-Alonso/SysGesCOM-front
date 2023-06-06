import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { EDITAR_CATEGORIAS_VALUES } from '../../constants';
import useForm from '../../hooks/useForm';
import axios from '../../config/axios';
import { toast } from 'react-toastify';
import GeneralTable from '../common/Table/GeneralTable';

const EditarCategoria = () => {
    const location = useLocation();
    const datos = location.state;
    const [selected, setSelected] = useState(undefined);
    const navigate = useNavigate();

    const editarCategoria = async () => {
        const { _id, ...categoriaInfo } = datos.categoria;
        if (JSON.stringify(categoriaInfo) !== JSON.stringify(values)) {
          try {
            await axios.put(`/categorias/actualizarCategoria/${datos.categoria._id}`, values);
            toast.success("Categoría actualizada");
            navigate('/alta-categoria')
          } catch (error) {
            toast.error(
              error.response?.data.message ||
                error.response?.data.errorMje ||
                error.message
            );
          }
        } else toast.error('No hiciste cambios')
       };

    const { handleChange, handleSubmit, values, setValues, errors } = useForm(
        EDITAR_CATEGORIAS_VALUES,
        editarCategoria
      ); // AGREGAR VALIDACIONES JS

    useEffect(()=>{
        console.log(datos.categoria);
        const { _id, ...categoriaInfo } = datos.categoria;
        setValues(categoriaInfo)
    },[])

  return (
    <Container>
        <Row className='mt-3'>
            <Col>
            <Form className="container-form-categoria" onSubmit={handleSubmit}>
        <Form.Label>Categoria</Form.Label>
        <Form.Control
          className="inputAltaDeCamara"
          type="text"
          placeholder="Ej... Violencia"
          value={values.nombre}
          name="nombre"
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
        <Row className='mt-5'>
            <Col className='d-flex justify-content-end'>
            <Button variant='success'>Agregar</Button>
            <Button variant='warning' className='mx-2'>Editar</Button>
            <Button variant='danger'>Quitar</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <GeneralTable headings={["nombre"]} items={datos.naturalezas} setSelected={setSelected} selected={selected}/>
            </Col>
        </Row>
    </Container>
  );
}

export default EditarCategoria