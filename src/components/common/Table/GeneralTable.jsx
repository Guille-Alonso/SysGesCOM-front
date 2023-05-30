import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importa el ícono de edición de React Icons
import "./GeneralTable.css";
import { Table, Button, Modal } from "react-bootstrap";
import EditarCamaras from "../../EditarCamaras/EditarCamaras";

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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        {editForm}
      </Modal.Body>
    </Modal>
  );
};

const GeneralTable = ({ headings, items, setSelected, selected, getCamaras }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
      onClose();
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
                className={selected === item._id ? "row-selected" : ""}
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
                    onClick={() => handleOpen(item._id)}
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

export default GeneralTable;
