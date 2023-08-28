import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalPodio.css";
import podioSvg from "../../assets/podium-speaker-audio.svg";

function ModalPodio() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button>

      <Modal
        show={show}
        centered
        backdrop="static"
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className="podioModal"
      >
        <Modal.Header closeButton className="ModalHeaderPodio text-white">
          EL VISUALIZADOR DEL MES:{" "}
        </Modal.Header>
        <Modal.Body className="ModalPodio">
          <img src={podioSvg} className="svgPodio" alt="" />
          <div className="fotosPodio">
            <img
              className="fotoPodio1"
              src="https://img.freepik.com/premium-photo/bird-with-suit-it-that-says-i-am-bird_771335-50286.jpg"
              alt=""
            />
            <img
              className="fotoPodio2"
              src="https://img.freepik.com/premium-photo/bird-with-suit-it-that-says-i-am-bird_771335-50286.jpg"
              alt=""
            />
            <img
              className="fotoPodio3"
              src="https://img.freepik.com/premium-photo/bird-with-suit-it-that-says-i-am-bird_771335-50286.jpg"
              alt=""
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalPodio;
