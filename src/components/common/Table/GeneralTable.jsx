import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { FaEdit } from 'react-icons/fa'; // Importa el ícono de edición de React Icons
import './GeneralTable.css';
import { Table, Button, Modal } from "react-bootstrap";


const EditModal = ({ show, onHide, onSave, editData, setSelectedItem, setShowModal }) => {
  
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
        <Modal.Title>Editar elemento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Aquí puedes agregar los campos de edición */}
        <input
          type="text"
          name="columna1"
          value={editedData ? editedData.columna1 : ""}
          onChange={handleChange}
        />
        {/* Agrega más campos de edición según tus necesidades */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const GeneralTable = ({ headings, items, setSelected, selected }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (itemId) => {
    console.log("Edit item with ID:", itemId);
    const itemToEdit = items.find((item) => item._id === itemId);
    setSelectedItem(itemToEdit);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
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
            <th scope="col">Editar</th>
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
                {Object.entries(item).slice(2).map((elemento) => {
                  // if (elemento[0] !== "_id") {
                    return <td key={nanoid()}>{elemento[1]}</td>;
                    console.log(elemento)
                  // }
                  // return null;
                })}
                <td>
                  <FaEdit
                    className="botonEditar"
                    onClick={() => handleEdit(item._id)}
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
      />
    </>
  );
};

export default GeneralTable;
