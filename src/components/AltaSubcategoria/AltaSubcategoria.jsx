import React from 'react'
import axios from '../../config/axios';
import { toast } from 'react-toastify';
import { SUBCATEGORIAS_VALUES } from '../../constants';
import useForm from '../../hooks/useForm';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const AltaSubcategoria = ({onClose,getSubcategorias,idCategoria}) => {

    const nuevaSubcategoria = async () => {
        
     const obj = {nombre:values.nombre,categoria:idCategoria}
          try {
            await axios.post(`/subcategorias/alta`, obj);
            toast.success("Subcategoría creada con éxito");
            getSubcategorias();
            setValues(SUBCATEGORIAS_VALUES)
            onClose();
          } catch (error) {
            toast.error(error.response?.data.message || error.message);
          }
       };

       const { handleChange, handleSubmit, values, setValues, errors } =
         useForm(SUBCATEGORIAS_VALUES, nuevaSubcategoria); // AGREGAR VALIDACIONES JS

  return (
    <Container>
        <Row>
            <Col>
            <Form onSubmit={handleSubmit}>
            <Form.Label>Subcategoría Nueva</Form.Label>
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
                  <Button
                    variant="success"
                    className="mt-3"
                    type="submit"
                  >
                    Agregar
                  </Button>
            </Form>
            </Col>
        </Row>
    </Container>
 
  )
}

export default AltaSubcategoria