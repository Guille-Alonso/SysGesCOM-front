import { React } from "react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button, Modal, Table } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaEye} from "react-icons/fa";
import "./TablaEventos.css";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const TablaEventos = ({ headings, items,  setSelected, selected,getReportes }) => {
  const navigate = useNavigate();
  const [paginacion, setPaginacion] = useState(1);
  const itemPag = 10;
  const indexUltimoItem = paginacion * itemPag;
  const indexPrimerItem = indexUltimoItem - itemPag;
  const currentItems = items.slice(indexPrimerItem, indexUltimoItem);
  const totalPages = Math.ceil(items.length / itemPag);
  const [despacho, setDespacho] = useState(false)

  const [modalDelete, setModalDelete] = useState(false);

  const setReportDelete = (id)=>{
    setModalDelete(true);
    setSelected(id);
  }

  const setDespachar = (id)=>{
    setSelected(id);
    setDespacho(true)
  }

  const handleNextPage = () => {
    setPaginacion((prevPag) => prevPag + 1);
  };

  const handlePreviousPage = () => {
    setPaginacion((prevPag) => prevPag - 1);
  };

  const handleRemove = async () => {
    try {
      await axios.delete("/reportes/", { data: { id: selected } });
      toast.info("Reporte borrado con éxito");
      getReportes();
      setModalDelete(false);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const verDetalle = (reporte) => {
    const props = { reporte: reporte };
    navigate("/detalleEvento", { state: props });
  };

  return (
    <>
      <Modal
            className="modal-borrarUsuario"
            show={modalDelete}
            onHide={() => setModalDelete(false)}
            backdrop="static"
            centered
          >
            <div className="fondoModal">
              <Modal.Header closeButton>
                <h4>Borrar Reporte</h4>
              </Modal.Header>
              <div className="mensajeConfirmacion">
                Seguro que quieres borrar este Reporte?
              </div>
              <Button
                className="btn-BorrarUsuario"
                variant="danger"
                onClick={handleRemove}
              >
                Confirmar
              </Button>
            </div>
          </Modal>
      <MDBTable responsive>
        <MDBTableHead className="colorTabla">
          <tr>
            {headings.map((heading) => (
              <th key={nanoid()}>{heading}</th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody className="colorTabla">
          {currentItems.length !== 0 &&
            currentItems.map((item) => (
              <tr key={item._id} >
                <td>{item.fecha.split(",")[0]}</td>
                <td>{item.detalle.length < 20? item.detalle :  item.detalle.slice(0, 20) + "..."}</td>
                <td>{item.usuario.nombreUsuario}</td>
                <td>{item.naturaleza.nombre.toUpperCase()}</td>
                <td>{item.categoria.nombre}</td>
                <td>{item.subcategoria?.nombre}</td>
                <td>
                  {!despacho? 
                <FontAwesomeIcon onClick={()=>setDespachar(item._id)} className="botonDespacho" icon={faXmark} />
                : despacho && selected == item._id &&
                <FontAwesomeIcon className="botonDespacho" icon={faCheck} />
                  } 
                  <FaEye
                    onClick={() => verDetalle(item)}
                    className="botonVer"
                  />
                  <FaTrashAlt
                    onClick={() => setReportDelete(item._id)}
                    className="botonEliminar"
                  />
                </td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>

      <div className="paginacionCont">
        <Button
          className="paginacionBtnPrev"
          disabled={paginacion === 1}
          onClick={handlePreviousPage}
        >
          Anterior
        </Button>
        <div className="paginacionText">
          Página {paginacion} de {totalPages}
        </div>
        <Button
          className="paginacionBtnNext"
          disabled={paginacion === totalPages}
          onClick={handleNextPage}
        >
          Siguiente
        </Button>
      </div>
    </>
  );
};

export default TablaEventos;
