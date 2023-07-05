import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useGet from '../../hooks/useGet';
import axios from '../../config/axios';
import { COMContext } from '../../context/COMContext';
import useForm from '../../hooks/useForm';
import { ALTA_DESPACHOS_VALUES } from '../../constants';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DespachoDetalle = () => {
    const location = useLocation();
    const datos = location.state;

    const [reparticiones, loading, getReparticiones] = useGet(
        "/reparticiones/listar",
        axios
      );

    const { user } = useContext(COMContext);
    const [volver, setVolver] = useState(false);

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
        try {
            const despacho = {
                fecha: new Date(),
                acuse: values.acuse,
                reparticiones: values.reparticiones,
                usuario: user._id
            } 
          await axios.post("/despachos/alta", despacho);
          setValues(ALTA_DESPACHOS_VALUES);
          toast.success("Despacho realizado");
        } catch (error) {
          toast.error(error.response?.data.message || error.message);
        }
       
        console.log(values);
      };

    const { handleChange, handleSubmit, values, setValues, errors } = useForm(
        ALTA_DESPACHOS_VALUES,
        enviarDatos,
        //validationsEditarEvento
      );
        
      //useEffect(()=>{
    //    setValues(datos.reporte);
     // },[])
  return (
    <Container className='layoutHeight'>
        <Row>
            <Col xs={6}>
                
                    <Form.Label className="mt-3">
                    <strong>Detalle: </strong>
                    </Form.Label >
                    <Form.Control disabled value={datos.reporte.detalle}/>

                    <Form.Label className="mt-3">
                    <strong>Tipo de Evento: </strong>
                    </Form.Label>
                    <Form.Control disabled value={datos.reporte.naturaleza.nombre}/>

                    <Form.Label className="mt-3">
                    <strong>Categoria: </strong>
                    </Form.Label>
                    <Form.Control disabled value={datos.reporte.categoria.nombre}/>

                    <Form.Label className="mt-3">
                    <strong>Subcategoria: </strong>
                    </Form.Label>
                    <Form.Control disabled value={datos.reporte.subcategoria?.nombre}/>

                  
            </Col>
            <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column labelEditReporte mt-3">
                    <Form.Label>
                    <strong>Acuse: </strong>
                    </Form.Label >
                    <textarea
                    className="inputEditReporte2 mb-3"
                    onChange={handleChange}
                    name="acuse"
                    value={values.acuse}
                    required
                  />
                    <Form.Label>
                    <strong>Reparticiones: </strong>
                    </Form.Label >
                    {!loading && reparticiones.reparticiones.map((rep,index)=>{
                        return(
                            <div key={index} className="d-flex">
                            <Form.Check
                              type="checkbox"
                              onChange={()=>handleCheckboxChange(rep._id)}
                              value={rep._id}
                            />
                            <Form.Label className="ms-2">{rep.nombre}</Form.Label>
                          </div>
                    
                        )
                    })}
                  
            </div>
            <Button type='submit' className='mb-5'>Enviar</Button>
            </Form>
        </Row>
      
    </Container>
  )
}

export default DespachoDetalle