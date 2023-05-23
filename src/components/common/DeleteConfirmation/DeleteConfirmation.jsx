import {Button} from "@nextui-org/react";

const DeleteConfirmation = ({onClose, deleteFunction}) => {

  const handleDelete = ()=>{
    deleteFunction();
    onClose();
  }
  return ( 
    <>
      <p> Estas seguro que deseas eliminar este elemento?</p>
      <div className="d-flex">
      <Button shadow color="error" auto flat className="d-flex me-2" onClick={handleDelete}> Confirmar </Button>
      <Button shadow color="primary" auto flat onClick={onClose}> Cancelar </Button>
      </div>
      
    </>
  );
}
 
export default DeleteConfirmation;