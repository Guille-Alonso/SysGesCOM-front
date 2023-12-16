import React, { useContext, useEffect, useRef, useState } from "react";
import "./AltaNoticias.css";
import { Alert, Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useGet from "../../hooks/useGet";
import useForm from "../../hooks/useForm";
import axios from "../../config/axios";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { COMContext } from "../../context/COMContext";
import { ALTA_NOTICIAS_VALUES } from "../../constants";
import { validationsAltaNoticias } from "../../helpers/validationsAltaNoticias";
import { FaTrashAlt } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AltaNoticias = () => {
  const { user } = useContext(COMContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const fechaActual = new Date();
  const [noticias, loading, getNoticias] = useGet("/noticias/listarNoticias", axios);
  const [modalDelete, setModalDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const fechaSinZonaHoraria = fechaActual
    .toLocaleString("es-AR", options)
    .replace(",", "") // Eliminar la coma después del día de la semana
    .replace(/^(\w)|\s(\w)/g, (match) => match.toUpperCase()); // Convertir la primera letra del día y del mes en mayúscula

  const [fecha, hora] = fechaSinZonaHoraria.split(", "); // Separar la fecha de la hora

  const [errors, setErrors] = useState({});

  function submitForm(event) {

    event.preventDefault(); // Evitar el envío del formulario por defecto

    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    const inputFile = document.getElementById('imageNoticia');
    console.log(inputFile)

    let newErrors = {};

    validationsAltaNoticias(values, setErrors, newErrors, lengthFile);

    if (Object.keys(newErrors).length === 0) {

      axios.post(form.action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          // Manejar la respuesta del servidor
          setValues(ALTA_NOTICIAS_VALUES)
          toast.success("Noticia cargada con éxito")
          getNoticias()
          console.log(response.data);
        })
        .catch(error => {
          toast.error("Algo salio mal :(")
          // console.log(error(error));

        });
    }

  }

  const { values, setValues, handleChange } = useForm(
    ALTA_NOTICIAS_VALUES,
  );

  const [lengthFile, setLengthFile] = useState()

  const handleChangeFile = (e) => {
    handleChange(e)

    setLengthFile(e.target.files.length)

  }

  const handleRemoveNoticia = async () => {
    try {
      await axios.delete("/noticias/", { data: { id: selected } });
      toast.info("Noticia borrada con éxito");
      getNoticias();
      setModalDelete(false);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const funcionDescarga = async (obj) => {
    try {

      const response = await axios.get(
        `http://10.5.0.206:4000/noticias/listar/${obj._id}`,
        {
          responseType: "blob", // Especifica el tipo de respuesta como Blob
        }
      );
      
      const blob = response.data;
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.href = url;
    
      if(!blob.type.includes("image") && !blob.type.includes('application/pdf')){
        link.download = obj.titulo;
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Error en la conexión");
    }
  }

  const setNoticiaDelete = (id) => {
    setModalDelete(true);
    setSelected(id);
  }

  return (
    <Container className="layoutHeight">
      <Modal
        className="modal-borrarUsuario"
        show={modalDelete}
        onHide={() => setModalDelete(false)}
        backdrop="static"
        centered
      >
        <div className="fondoModal">
          <Modal.Header closeButton>
            <h4>Borrar Cámara</h4>
          </Modal.Header>
          <div className="mensajeConfirmacion">
            Seguro que quieres borrar esta Noticia?
          </div>
          <Button
            className="btn-BorrarUsuario"
            variant="danger"
            onClick={handleRemoveNoticia}
          >
            Confirmar
          </Button>
        </div>
      </Modal>
      <Row>
        <Col>

          <Form id="myForm" action="http://10.5.0.206:4000/noticias/alta" enctype="multipart/form-data" method="POST" onSubmit={submitForm}>
            <Form.Group className="contInputFechaNoticias">
              <Form.Control
                name="fecha"
                value={`${fecha} - ${hora}`}
                required
                className="inputFechaNoticias"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column labelEditReporte mt-2">
              <Form.Label className="">Título de la Noticia</Form.Label>
              <Form.Control
                className="inputAltaNoticiaTitulo w-100"
                type="text" name="titulo" id=""
                onChange={handleChange}
                value={values.titulo}
                isValid={values.titulo && !errors.titulo}
                isInvalid={!!errors.titulo}
                minLength={4}
                maxLength={200}
                required
              />
              <Form.Control.Feedback type="invalid" >
                {errors.titulo}
              </Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group className="d-flex flex-column labelEditReporte mt-2">
              <Form.Label className="">Descripción del Ticket</Form.Label>
              <textarea
                className="inputAltaTicketDescripcion w-100"
                onChange={handleChange}
                name="descripcion"
                value={values.descripcion}
                required
              />
            </Form.Group> */}
            <Form.Group className="inputAltaEvento">
              <Form.Label className="mt-2">Archivos</Form.Label>
              <Form.Control
                type="file"
                name="files" multiple
                id="imageNoticia"
                className="InputArchivo"
                onChange={handleChangeFile}
                value={values.files}
                isValid={values.files && !errors.files}
                isInvalid={!!errors.files}
              />
              <Form.Control.Feedback type="invalid" >
                {errors.files}
              </Form.Control.Feedback>
            </Form.Group>
            {selectedFile && (
              <img
                src={selectedFile}
                className="mt-5 d-flex justify-content-center align-items-center w-100 fotoPreview"
                alt=""
              />
            )}
            <Button
              variant="success"
              className="mt-5 col-12 mb-3"
              size="lg"
              type="submit" value="Upload your files" onClick={submitForm}
            >
              Agregar
            </Button>
          </Form>

        </Col>
        <Col>
          <div className="altaNoticias">
            <div className='bodyAltaNoticias'>
              <h1 className="text-light" >Noticias</h1>
              <div className="contenidoAltaNoticias mt-1">
                {

                  loading ? 
                  
                  // <Spinner variant="ligth " /> 
                  
                <div className="not ps-2 pe-2 ">
                  <Row className="g-0 mt-2" >
                    <Col className="col-11">
                    <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                    </Col>
                    <Col className="col-1 ps-1">
                    <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                      <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                    </Col>
                  </Row>
                </div>

                : (noticias.noticias.map(element => {
                      return (

                        <div className="not">

                          <Row className="g-0 mt-2" >
                            <Col className="col-11">
                              <Link className=" text-dark " onClick={() => funcionDescarga(element)} >{element.titulo}</Link>

                            </Col>
                            {user.tipoDeUsuario.nombre == "admin" || user.tipoDeUsuario.nombre == "administración" ?
                              (
                                <Col className="col-1">
                                  <FaTrashAlt
                                    onClick={() => setNoticiaDelete(element._id)}
                                    className=" botonEliminarNoticia"
                                  />
                                </Col>

                              ) : <></>
                            }
                          </Row>
                          <hr />
                        </div>

                      )
                    }))} 
              </div>

            </div>
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default AltaNoticias;


/* <div className="footerNoticias">

            </div> */


// <div className="contNoticias">
//   <Link onClick={() => funcionDescarga(element._id)} >{element.titulo}</Link>

//   {user.tipoDeUsuario == "admin" || user.tipoDeUsuario == "administración" ?
//     (
//       <FaTrashAlt
//         onClick={() => setNoticiaDelete(element._id)}
//         className="ms-3 botonEliminar"
//       />

//     ) : <></>
//   }
//   <hr />
// </div>