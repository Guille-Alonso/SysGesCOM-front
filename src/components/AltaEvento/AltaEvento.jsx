import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { COMContext } from '../../context/COMContext';
import useGet from '../../hooks/useGet';
import useForm from '../../hooks/useForm';
import { ALTA_REPORTES_VALUES } from '../../constants';
import axios from '../../config/axios';
import "./AltaEvento.css"
import { Navigate } from 'react-router-dom';

const AltaEvento = () => {

const [naturalezas,setNaturalezas]= useState([])
const [categorias,setCategorias]= useState([])
const [subcategorias,setSubcategorias]= useState([])

const [natuSelected, setNatuSelected]= useState(undefined)
const [catSelected, setCatSelected]= useState(undefined)

const { user} = useContext(COMContext);
const [volver, setVolver]= useState(false)

const [searchTerm, setSearchTerm] = useState('');
const [suggestions, setSuggestions] = useState([]);

    const [dispositivos, loading, getDispositivos] = useGet(
        "/camaras/listar",
        axios
      );

    const enviarDatos = async () => {
        try {
            const formData = new FormData();
            formData.append("fecha", new Date());
            formData.append("detalle", values.detalle);
            formData.append("naturaleza", values.naturaleza);
            formData.append("usuario", user._id);
            formData.append("userName", user.nombreUsuario);
            formData.append("categoria", values.categoria);
            formData.append("subcategoria", values.subcategoria);
            formData.append("dispositivo", values.dispositivo);
            formData.append("photo", values.photo);

          const respuesta = await axios.post("/reportes/alta", formData);
          toast.success("Reporte registrado con éxito");
          setVolver(true);
        } catch (error) {
          toast.error(error.response?.data.message || error.message);
        }
      };
    
      const { handleChange, handleSubmit, values, setValues, errors } = useForm(
        ALTA_REPORTES_VALUES,
        enviarDatos,
        // validationsAltaEvento
      );

      const handleFileInputChange = (e) => {
        setValues({
          ...values,
          [e.target.name]: e.target.files[0],
        });
      };


const handleInputChange = (e) => {
   
    setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
      
    const value = e.target.value;
    setSearchTerm(value);

    // Lógica para generar las sugerencias de coincidencias
    const filteredSuggestions = !loading && dispositivos.camaras.filter(disp=>disp.nombre.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setValues({
        ...values,
        dispositivo: suggestion._id,
      });
      
    setSearchTerm(suggestion);
    setSuggestions([]); // Limpiar las sugerencias al seleccionar una
  };
  
  const handleChangeNaturaleza = (e)=>{
    setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
      
    const value = e.target.value;
    setNatuSelected(value);
  }

  const handleChangeCategoria = (e)=>{
    setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
      
    const value = e.target.value;
    setCatSelected(value);
  }

    const getDatos = async () => {
        try {
          const { data } = await axios.get("/naturaleza/listarClasificacion");
          setNaturalezas(data.naturalezas);
          setCategorias(data.categorias);
          setSubcategorias(data.subcategorias);
        } catch (error) {
          toast.error("Error en la conexión");
        }
      };
    
      useEffect(() => {
        getDatos();
      }, []);

  return (
    <Container>
    <Row>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="text"
            value={new Date()}
            name="fecha"
            required
            disabled
          />
          <Form.Label className="mt-4">Tipo de Evento</Form.Label>
          <Form.Select
            onChange={handleChangeNaturaleza}
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
          <Form.Label className="mt-4">Categoria</Form.Label>
          <Form.Select
            onChange={handleChangeCategoria}
            className="inputAltaDeCamara"
            name="categoria"
            value={values.categoria}
            required
            disabled={natuSelected == undefined? true : false}
          >
            <option value="">Seleccione una opción</option>

            {categorias.filter(cat=>cat.naturaleza._id==natuSelected).map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.nombre}
                </option>
              );
            })}
          </Form.Select>
          <Form.Label className="mt-4">Subcategoría</Form.Label>
          <Form.Select
            onChange={handleChange}
            className="inputAltaDeCamara"
            name="subcategoria"
            value={values.subcategoria}
            required={subcategorias.filter(subcat=>subcat.categoria._id==catSelected)!= ""? true : false}
            disabled={subcategorias.filter(subcat=>subcat.categoria._id==catSelected)== ""? true : false}
          >
            <option value="">Seleccione una opción</option>

            {subcategorias.filter(subcat=>subcat.categoria._id==catSelected).map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.nombre}
                </option>
              );
            })}
          </Form.Select>

          <Form.Label className="mt-4">Dispositivo</Form.Label>
          <Form.Control
            type="text"
            value={searchTerm.nombre}
            onChange={(e)=>handleInputChange(e,searchTerm._id)}
            name="dispositivo"
            required
            maxLength={6}
            minLength={6}
          />
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className='colorSugerencias'
              >
                {suggestion.nombre}
              </li>
            ))}
          </ul>
          <Form.Label className="mt-4">Ubicación</Form.Label>
          <Form.Control
              type="text"
              value={searchTerm.ubicacion}
              disabled
              required
          />
            <Form.Label className="mt-4">Detalle</Form.Label>
          <Form.Control
              type="text"
              onChange={handleChange}
              value={values.detalle}
              name="detalle"
              required
              maxLength={50}
          />
          <Form.Label className="mt-4">Captura</Form.Label>
          <Form.Control
            type="file"
            title="Suba una imágen"
            onChange={handleFileInputChange}
            name="photo"
            accept="image/*"
          />
           
            <Button
            variant="success"
            className="mt-5 col-12 mb-3"
            size="lg"
            type="submit"
          >
            Agregar
          </Button>
          {
            volver && <Navigate to="/reportes" />
          }
        
        </Form>
      </Col>
    </Row>
  </Container>
  )
}

export default AltaEvento