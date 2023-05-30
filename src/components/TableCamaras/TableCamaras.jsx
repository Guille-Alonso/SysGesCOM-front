import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importa el ícono de edición de React Icons
import "./TableCamaras.css";
import { Table, Button, Modal } from "react-bootstrap";
import EditarCamaras from "../EditarCamaras/EditarCamaras";
import { toast } from "react-toastify";
import axios from "../../config/axios";

const EditModal = ({
  show,
  onHide,
  onSave,
  editData,
  setSelectedItem,
  setShowModal,
  editForm
}) => {
  const [editedData, setEditedData] = useState(editData);

  useEffect(() => {
    setEditedData(editData);
  }, [editData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedData);
    setShowModal(false);
  };

  return (
    <Modal
      className="modal-borrarUsuario"
      show={show}
      onHide={onHide}
      backdrop="static"
      centered
    >
      <div className="fondoModalEditCamara">
        <Modal.Header closeButton>
          <h4>Editar Cámara</h4>
        </Modal.Header>
        <div className="mensajeConfirmacion">
          {editForm}
        </div>
      </div>
    </Modal>
  );
};

const TableCamaras = ({ headings, items, setSelected, selected, getCamaras }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [modalDelete, setModalDelete]= useState(false)

  const handleEdit = (itemId) => {
    console.log("Edit item with ID:", itemId);
    const itemToEdit = items.find((item) => item._id === itemId);
    setSelectedItem(itemToEdit);
    setShowModal(true);
  };

  const handleRemove = async() => {
    try {
      await axios.delete('/camaras/',{data:{id:selected}});
      toast.info('Dispositivo borrado con éxito');
      getCamaras();
      setModalDelete(false)
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
 };

 const handleCloseModal = () => {
  setShowModal(false);
};

const handleOpen = () => {
  setShowModal(true);
};

  const handleSaveChanges = (editedData) => {
    // Realiza las acciones necesarias para guardar los cambios
    console.log("Save changes:", editedData);
    setShowModal(false);
  };

  return (
    <>
    <Modal
        className="modal-borrarUsuario"
        show={modalDelete}
        onHide={()=>setModalDelete(false)}
        backdrop="static"
        centered
      >
        <div className="fondoModal">
          <Modal.Header closeButton>
            <h4>Borrar Cámara</h4>
          </Modal.Header>
          <div className="mensajeConfirmacion">
            Seguro que quieres borrar esta Cámara?
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
            <th scope="col"></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody className="colorTabla">
          {items.length !== 0 &&
            items.map((item) => (
              <tr
                key={nanoid()}
                onClick={() => setSelected(item._id)}
                // className={selected === item._id ? "row-selected" : ""}
              >
                {Object.entries(item)
                  .slice(1,-1)
                  .map((elemento) => {
                    // if (elemento[0] !== "_id") {
                    return <td key={nanoid()}>{elemento[1]}</td>;
                    // }
                    // return null;
                  })}
                <td>
                  <FaEdit
                    className="botonEditar"
                    onClick={() => handleEdit(item._id)}

                  />
                  <FaTrashAlt
                    className="botonEliminar"
                    onClick={()=>setModalDelete(true)}
                  />
                </td>

              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
      <EditModal
        show={showModal}
        onHide={handleCloseModal}
        onSave={handleSaveChanges}
        editData={selectedItem}
        handleCloseModal={handleCloseModal}
        handleSaveChanges={handleSaveChanges}
        editForm={<EditarCamaras onClose = {handleCloseModal} getCamaras = {getCamaras} camara = {selectedItem}/>}
      />
    </>
  );
};

export default TableCamaras;
