import { Button } from "react-bootstrap";
import "./DeleteConfirmation.css";

const DeleteConfirmation = ({ onClose, deleteFunction }) => {
  const handleDelete = () => {
    deleteFunction();
    onClose();
  };
  return (
    <>
      <h2 className="mb-5 header-modal justify-content-center col-12">
        {" "}
        Estas seguro que deseas eliminar este elemento?
      </h2>
      <div className="d-flex">
        <Button
          shadow
          variant="danger"
          auto
          flat
          className="d-flex me-2 col-12 justify-content-center"
          onClick={handleDelete}
        >
          {" "}
          Confirmar{" "}
        </Button>
      </div>
    </>
  );
};

export default DeleteConfirmation;
