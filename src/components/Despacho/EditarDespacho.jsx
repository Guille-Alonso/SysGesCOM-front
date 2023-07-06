import React, { useContext, useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import { validationsAltaDespacho } from '../../helpers/validationsAltaDespacho';
import { ALTA_DESPACHOS_VALUES } from '../../constants';
import useGet from '../../hooks/useGet';
import axios from '../../config/axios';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { COMContext } from '../../context/COMContext';

const EditarDespacho = () => {
    const location = useLocation();
    const datos = location.state;

    const [reparticiones, loading, getReparticiones] = useGet(
        "/reparticiones/listar",
        axios
      );

    const [volver, setVolver] = useState(false);
    const { user } = useContext(COMContext);

    const [selectedValues, setSelectedValues] = useState([]);

    const handleCheckboxChange = (value) => {
        // Verificar si el valor ya está en el array de seleccionados
        if (selectedValues.includes(value)) {
          // Si el valor ya está seleccionado, eliminarlo del array
          setSelectedValues(selectedValues.filter((item) => item !== value));
          setValues({
            ...values,
            "reparticiones": selectedValues.filter((item) => item !== value),
          });
       
        } else {
          // Si el valor no está seleccionado, agregarlo al array
          setSelectedValues([...selectedValues, value]);
          setValues({
            ...values,
            "reparticiones": [...selectedValues, value],
          });
         
          
        }
      }; 

    const enviarDatos = async () => {

        console.log(values);
    };

    const { handleChange, handleSubmit, values, setValues, errors } = useForm(
        ALTA_DESPACHOS_VALUES,
        enviarDatos,
        validationsAltaDespacho
      );

    useEffect(()=>{
    //console.log(datos.despacho);
    console.log(Object.values(datos.despacho.reparticiones));
    const { _id, ...despachoInfo } = datos.despacho;
    setValues(despachoInfo)

    setSelectedValues(datos.despacho.reparticiones.filter((item) => item));
    setValues({
      ...values,
      "reparticiones": datos.despacho.reparticiones.filter((item) => item),
    });
    },[]);

  return (
    <Container className="layoutHeight">
      <Row>
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column labelEditReporte mt-3">
              <Form.Label>
                <strong>Acuse: </strong>
              </Form.Label>
              <textarea
                className="inputEditReporte2 mb-3"
                onChange={handleChange}
                name="acuse"
                value={values.acuse}
              />
              <Form.Label>
                <strong>Reparticiones: </strong>
              </Form.Label>
            
              {!loading?
                reparticiones.reparticiones.map((rep, index) => {
                  return (
                    <div key={index} className="d-flex">
                      <Form.Check
                        type="checkbox"
                        onChange={() => handleCheckboxChange(rep._id)}
                        value={rep._id}
                        checked={values.reparticiones.filter(value=>value == rep._id).length == 1? true : false}
                      />
                      <Form.Label title='Seleccione al menos una' className="ms-2">{rep.nombre}</Form.Label>
                    </div>
                  );
                }):
                <Spinner/>}
            </div>
            <Button className='mt-5' type="submit">Editar</Button>
          </Form>
        </Col>
        {volver && <Navigate to="/reportes" />}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center mt-3">
          {Object.keys(errors).length !== 0 &&
            Object.values(errors).map((error, index) => (
              <Alert className="me-1" variant="danger" key={index}>
                {error}
              </Alert>
            ))}
        </Col>
      </Row>
    </Container>
  )
}

export default EditarDespacho