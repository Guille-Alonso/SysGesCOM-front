import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalPodio.css";
import podioSvg from "../../assets/podium-speaker-audio.svg";
import axios from "../../config/axios";
import { COMContext } from "../../context/COMContext";
import Confetti from "react-confetti";
import larry from "../../assets/LarryTheBird.png";
import medalla1 from "../../assets/medalla_1er_puesto.svg";
import medalla2 from "../../assets/medalla_2do_puesto.svg";
import medalla3 from "../../assets/medalla_3er_puesto.svg";

function ModalPodio({ reportes }) {
  const [show, setShow] = useState(true);

  const { user } = useContext(COMContext);
  const noticiasLeidas = async () => {
    try {
      let estadoNoticia = { noticias: false };
      await axios.put(`users/noticias/${user._id}`, estadoNoticia);
      setShow(false);
    } catch (error) { }
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
        className=" podioModal"
      >
        <Modal.Header closeButton className="ModalHeaderPodio text-white">
          EL VISUALIZADOR DEL MES:{" "}
        </Modal.Header>
        <Modal.Body className="ModalPodio">

          <div className="fotosPodioCont">

            <div className="cont2doPuesto">

              <div className="text-light nombreUsuarioPodio2">
                {
                  // "me.loto"
                  reportes.usuariosConMasDespachos[1]?.usuario.nombreUsuario
                }
              </div>
              <div className="contFoto">
                <img
                  className="fotoPodio1"
                  title={
                    reportes.usuariosConMasDespachos[1]?.usuario.nombreUsuario

                  }
                  src={larry}
                  alt="" />
              </div>
              <div className="contMedall">
                <img src={medalla2} className="svgPodio" alt="" />
              </div>
              <div className="text-light">
                Con: {reportes.usuariosConMasDespachos[1]?.totalDespachos}

              </div>
            </div>

            <div className="cont1erPuesto">
              <div className="text-light nombreUsuarioPodio1">
                {
                  // "paa.colombres"
                  reportes.usuariosConMasDespachos[0]?.usuario.nombreUsuario
                }
              </div>
              <div className="contFoto">
                <img
                  className="fotoPodio2"
                  title={
                    reportes.usuariosConMasDespachos[0]?.usuario.nombreUsuario

                  }
                  src={larry}
                  alt=""
                />
              </div>
              <div className="contMedall">
                <img src={medalla1} className="svgPodio" alt="" />
              </div>
              <div className="text-light">
              Con:  {reportes.usuariosConMasDespachos[0]?.totalDespachos}

              </div>
            </div>

            <div className="cont3erPuesto">
              <div className="text-light nombreUsuarioPodio3">
                {
                  // "tsa.ortiz"
                  reportes.usuariosConMasDespachos[2]?.usuario.nombreUsuario
                }
              </div>
              <div className="contFoto">
                <img
                  className="fotoPodio3"
                  title={
                    reportes.usuariosConMasDespachos[2]?.usuario.nombreUsuario
                  }
                  src={larry}
                  alt=""
                />
              </div>
              <div className="contMedall">
                <img src={medalla3} className="svgPodio" alt="" />
              </div>
              <div className="text-light">
              Con: {reportes.usuariosConMasDespachos[2]?.totalDespachos}

              </div>
            </div>

            {/* <img src={podio2} className="svgPodio" alt="" /> */}
          </div>
          {/* <div>
  <div>
{reportes.usuariosConMasDespachos[0]?.cantidadDeReportes}

  </div>
  <div>
{reportes.usuariosConMasDespachos[1]?.cantidadDeReportes}

  </div>
  <div>
{reportes.usuariosConMasDespachos[2]?.cantidadDeReportes}

  </div>
</div> */}
          <Confetti className="confetti"></Confetti>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalPodio;
