import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalPodio.css";
import podioSvg from "../../assets/podium-speaker-audio.svg";
import axios from "../../config/axios";
import { COMContext } from "../../context/COMContext";
import Confetti from "react-confetti";
import larry from "../../assets/LarryTheBird.png";

function ModalPodio({ reportes }) {
  const [show, setShow] = useState(true);

  const { user } = useContext(COMContext);
  const noticiasLeidas = async () => {
    try {
      let estadoNoticia = { noticias: false };
      await axios.put(`users/noticias/${user._id}`, estadoNoticia);
      setShow(false);
    } catch (error) {}
  };

  return (
    <>
      <Modal
        show={show}
        centered
        backdrop="static"
        onHide={noticiasLeidas}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className="podioModal"
      >
        <Modal.Header closeButton className="ModalHeaderPodio text-white">
          EL VISUALIZADOR DEL MES:{" "}
        </Modal.Header>
        <Modal.Body className="ModalPodio">
          <div className="text-light nombreUsuarioPodio2">
          {reportes.usuariosConMasDespachos.length > 0 ? reportes.usuariosConMasDespachos[1]?.usuario.nombreUsuario : ""}
          </div>
          <div className="text-light nombreUsuarioPodio1">
          {reportes.usuariosConMasDespachos.length > 0 ? reportes.usuariosConMasDespachos[0]?.usuario.nombreUsuario : ""}
          </div>
          <div className="text-light nombreUsuarioPodio3">
          {reportes.usuariosConMasDespachos.length > 0 ? reportes.usuariosConMasDespachos[2]?.usuario.nombreUsuario : ""}
          </div>
          <img src={podioSvg} className="svgPodio" alt="" />
          <div className="fotosPodio">
            <img className="fotoPodio1" src={larry}
            title={reportes.usuariosConMasDespachos.length > 0 ? reportes.usuariosConMasDespachos[1]?.usuario.nombreUsuario : ""}
            alt="" />
            <img
              className="fotoPodio2"
              title={reportes.usuariosConMasDespachos.length > 0 ? reportes.usuariosConMasDespachos[0]?.usuario.nombreUsuario : ""}
              src={larry}
              alt=""
            />
            <img
              className="fotoPodio3"
               title={reportes.usuariosConMasDespachos.length > 0 ? reportes.usuariosConMasDespachos[2]?.usuario.nombreUsuario : ""}
              src={larry}
              alt=""
            />
          </div>
          <Confetti className="confetti"></Confetti>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalPodio;
