import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./PDFcambios.css";

const PDFcambios = () => {
  const location = useLocation();
  const datos = location.state;
  console.log(datos.cambios);

  return (
    <>
      <Row className="m-0 gap-0">
        <Col className="bg-white pt-3">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-around">
              <img
                src="src\assets\logo planilla visua.jpg"
                className="logoComPDF"
              />
              <img
                src="src\assets\logomuni128x128.bmp"
                className="logoMuniPDF"
              />
              <p className="textoPDF">
                "LA NOTA DEBE SER PRESENTADA CON 24 HS DE ANTICIPACION, DE LO
                CONTRARIO SERÁ RECHAZADA"
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <p className="pt-3 m-0">
              <strong>
                Municipalidad de San Miguel de Tucumán "Ciudad Historica"
              </strong>
            </p>
            <br />
            <p>
              <strong>Centro de Operaciones y Monitoreo Municipal</strong>
            </p>
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h4 className="pt-3 mb-3">
              <strong>SOLICITUD CAMBIO DE TURNO</strong>
            </h4>
          </div>
          <div className="d-flex justify-content-around pt-3">
            <p>
              SOLICITANTE: <strong>{datos.cambios.solicitante.nombre}</strong>
            </p>
            <p>TURNO: M T N</p>
          </div>
          <div className="d-flex justify-content-around pt-4">
            <p>
              SOLICITADO: <strong>{datos.cambios.solicitado.nombre}</strong>
            </p>
            <p>TURNO: M T N</p>
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h4 className="pt-3 m-0">
              <strong>CAMBIO</strong>
            </h4>
          </div>
          <div className="d-flex justify-content-around pt-3">
            <p>
              FECHA:{" "}
              <strong>
                {datos.cambios.pedido.slice(8, 10)}/
                {datos.cambios.pedido.slice(5, 7)}/
                {datos.cambios.pedido.slice(0, 4)}
              </strong>
            </p>
            <p>
              DEVOLUCION:{" "}
              <strong>
                {datos.cambios.pedidoDevolucion.slice(8, 10)}/
                {datos.cambios.pedidoDevolucion.slice(5, 7)}/
                {datos.cambios.pedidoDevolucion.slice(0, 4)}
              </strong>
            </p>
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h4 className="pt-3 m-0">
              <strong>ACEPTACIÓN DE CAMBIO</strong>
            </h4>
          </div>
          <div className="d-flex justify-content-around pt-3">
            <p>
              <strong>SOLICITANTE</strong>
            </p>
            <p>
              <strong>REEMPLAZO</strong>
            </p>
          </div>
          <div className="d-flex justify-content-around">
            <p>FIRMA:_________________________</p>
            <p>FIRMA:_________________________</p>
          </div>
          <div className="d-flex justify-content-around">
            <p>AFILIADO: {datos.cambios.solicitante.afiliado}</p>
            <p>AFILIADO: {datos.cambios.solicitado.afiliado}</p>
          </div>
          <div className="d-flex justify-content-around pt-5">
            <p>FIRMA JEFE OPERATIVO:_______________________</p>
            <p>FIRMA JEFE ADMINISTRATIVO:_______________________</p>
          </div>
          <hr />
          <div className="d-flex justify-content-around p-4 ">
            <p>SE AUTORIZA CAMBIO.</p>
            <p>FIRMA JEFE OPERATIVO: _______________________</p>
          </div>
          <hr />
        </Col>
      </Row>
    </>
  );
};

export default PDFcambios;
