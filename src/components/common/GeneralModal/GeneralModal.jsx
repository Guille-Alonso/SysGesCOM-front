import { cloneElement, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast} from "react-toastify";
import "../../ListaUsuarios/UsuarioCardBig.css";

const GeneralModal = ({buttonText, modalTitle, modalBody, variant, seleccion}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleShow = ()=>{
  //   if(seleccion) setShow(true)
  //   else  toast.error("debes seleccionar un elemento")
  // }

  return (
    <>

      <Button css={{zIndex: 0}} auto flat onClick={handleShow} className={variant}>
        {buttonText}
      </Button>

      <Modal 
      show={show} 
      onHide={handleClose} 
      backdrop="static" 
      keyboard={false}
      centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{cloneElement(modalBody,{onClose:handleClose})}</Modal.Body>
      </Modal>

    </>
  );
}
 
export default GeneralModal;