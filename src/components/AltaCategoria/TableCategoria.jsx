import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button, Modal, Table } from "react-bootstrap";
import "./TableCategoria.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const TableCategoria = ({ headings, items, setSelected, selected ,getCategorias,naturalezas}) => {

  const [modalDelete, setModalDelete] = useState(false);

  const handleRemove = async () => {
    try {
      await axios.delete("/categorias/", { data: { id: selected } });
      toast.info("Categoría borrada con éxito");
      getCategorias();
      setModalDelete(false);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const navigate = useNavigate();

  const handleNavigate=(item)=>{
    const props = {categoria:item,naturalezas:naturalezas}
    navigate('/editarCategoria', { state: props });
  }

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
            <h4>Borrar Categoría</h4>
          </Modal.Header>
          <div className="mensajeConfirmacion">
            Seguro que quieres borrar esta Categoría?
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
   
    <MDBTable responsive className="generalTable">
      <MDBTableHead className="colorTabla">
        <tr>
          {headings.map((heading) => (
            <th scope="col" key={nanoid()}>
              {heading}
            </th>
          ))}
        </tr>
      </MDBTableHead>
      <MDBTableBody className="colorTabla">
        {items.length !== 0 &&
          items.map((item) => (
            <tr
              onClick={() => setSelected(item._id)}
              // className={selected === item._id ? "row-selected" : ""}
            >
              {Object.values(item).map((value) => {
                if (typeof value === "object" && value !== null) {
                  return (
                    <>
                      <td>{item.nombre}</td>
                      <td>{value?.nombre}</td>
                      <td>
                     
                        <FaEdit
                          className="botonEditar"
                          onClick={()=>handleNavigate(item)}
                        />
                        <FaTrashAlt
                          className="botonEliminar"
                          onClick={() => setModalDelete(true)}
                        />
                      </td>
                    </>
                  );
                }
              })}
            </tr>
          ))}
      </MDBTableBody>
    </MDBTable>
    </>
  );
};

export default TableCategoria;
