import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import motoSvg from "../../assets/img/motor-scooter.svg";
import cascoSvg from "../../assets/img/bike-helmet.svg";
import "./RelevamientoMotos.css";
import {
  faLightbulb,
  faPeopleGroup,
  faPerson,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import axios from "../../config/axios";

const RelevamientoMotos = () => {
  const [arrayMotos, setArrayMotos] = useState([]);
  const [changeIcon, setChangeIcon] = useState(false);
  const [selectedRadioPersona, setSelectedRadioPersona] = useState(undefined);
  const [selectedRadioCasco, setSelectedRadioCasco] = useState(undefined);
  const [volver, setVolver] = useState(false);

  const handleClick = () => {
    setChangeIcon(!changeIcon);
  };
  const eliminarFila = (i) => {
    let array = [];
    for (let index = 0; index < arrayMotos.length; index++) {
      if (index !== i) {
        array.push(arrayMotos[index]);
      } else {
        setArrayMotos(array);
      }
    }
  };
  const agregarMoto = () => {
    if (selectedRadioCasco == undefined && selectedRadioPersona == undefined) {
      toast.error("No seleccionaste nada");
    } else if (selectedRadioPersona == undefined) {
      toast.error("Olvidaste seleccionar el campo Personas");
    } else if (selectedRadioCasco == undefined) {
      toast.error("No seleccionaste el campo Cascos");
    } else {
      const moto = {
        personas: selectedRadioPersona,
        cascos: selectedRadioCasco,
        luces: changeIcon,
      };
      setArrayMotos([...arrayMotos, moto]);
      setChangeIcon(false);
      setSelectedRadioCasco(undefined);
      setSelectedRadioPersona(undefined);
    }
  };

  const agregarReporteMotos = async () => {
    console.log(arrayMotos);
    try {
      const respuesta = await axios.post("/relevamientoMotos/alta", arrayMotos);
      console.log(respuesta);
      toast.info("Pedido a la espera de confirmación");
      setVolver(true);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
    setFechaPedido("");
  };

  return (
    <>
      <div className="layoutHeight2 pt-3">
        <div className="row justify-content-center contenedorRelevamiento p-4">
          <div className="container col-lg-6 col-xl-4 col-md-6 asideContainer">
            <div className="motoContainer container-fluid">
              <img src={motoSvg} alt="svg-moto" className="motoSvg" />
            </div>
            <div className="containerRadiosMotos p-3 mb-5">
              <div className="containerPersona container-fluid d-flex justify-content-center gap-4">
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  color="white"
                  className="iconoPersona"
                />
                <div className="d-flex justify-content-around gap-3 inputContainerMoto">
                  <div className="d-flex flex-column">
                    <span className="text-light">1</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="1p"
                      checked={selectedRadioPersona == 1 ? true : false}
                      value={1}
                      onClick={() => setSelectedRadioPersona(1)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-light">2</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="2p"
                      checked={selectedRadioPersona == 2 ? true : false}
                      value={2}
                      onClick={() => setSelectedRadioPersona(2)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-light">3</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="3p"
                      checked={selectedRadioPersona == 3 ? true : false}
                      value={3}
                      onClick={() => setSelectedRadioPersona(3)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-light">4</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="4p"
                      checked={selectedRadioPersona == 4 ? true : false}
                      value={4}
                      onClick={() => setSelectedRadioPersona(4)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-light">5</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="5p"
                      checked={selectedRadioPersona == 5 ? true : false}
                      value={5}
                      onClick={() => setSelectedRadioPersona(5)}
                    />
                  </div>
                </div>
              </div>
              <div className="containerPersona container-fluid d-flex justify-content-center gap-4">
                <div>
                  <img src={cascoSvg} alt="svg-casco" className="iconoCasco" />
                </div>
                <div className="d-flex justify-content-around gap-3 inputContainerMoto">
                  <div className="d-flex flex-column">
                    <span className="text-light">0</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="0c"
                      value={0}
                      checked={selectedRadioCasco == 0 ? true : false}
                      onClick={() => setSelectedRadioCasco(0)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-light">1</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="1c"
                      value={1}
                      checked={selectedRadioCasco == 1 ? true : false}
                      onClick={() => setSelectedRadioCasco(1)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-light">2</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="2c"
                      value={2}
                      checked={selectedRadioCasco == 2 ? true : false}
                      onClick={() => setSelectedRadioCasco(2)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-light">3</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="3c"
                      value={3}
                      checked={selectedRadioCasco == 3 ? true : false}
                      onClick={() => setSelectedRadioCasco(3)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-light">4</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="4c"
                      value={4}
                      checked={selectedRadioCasco == 4 ? true : false}
                      onClick={() => setSelectedRadioCasco(4)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-light">5</span>
                    <input
                      className="radioButtons"
                      type="radio"
                      name="5c"
                      value={5}
                      checked={selectedRadioCasco == 5 ? true : false}
                      onClick={() => setSelectedRadioCasco(5)}
                    />
                  </div>
                </div>
              </div>
              <div className="containerLuces container-fluid d-flex justify-content-around">
                <div className="inputContainerMoto">
                  <div className="focoContainer">
                    {changeIcon ? (
                      <FontAwesomeIcon
                        icon={faLightbulb}
                        className="focoIcono2"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faLightbulb}
                        className="focoIcono"
                      />
                    )}
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onClick={handleClick}
                        checked={changeIcon}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="mt-2 btn btn-primary w-50"
                onClick={agregarMoto}
              >
                Agregar
              </button>
            </div>
          </div>

          <div className="container-fluid col-lg-4 d-flex flex-column align-items-center p-4">
            <div className="tablaRelevamiento container-fluid">
              <table class="table table-light table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Persona/s</th>
                    <th scope="col">Casco/s</th>
                    <th scope="col">Luces</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {arrayMotos.length !== 0 &&
                    arrayMotos.map((moto, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{moto.personas}</td>
                          <td>{moto.cascos}</td>
                          <td>{moto.luces == true ? "SI" : "NO"}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              onClick={() => eliminarFila(index)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <button
              className="mt-2 btn btn-primary w-50 mt-5"
              onClick={agregarReporteMotos}
            >
              Generar Reporte
            </button>
            {volver && <Navigate to="/reportes" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelevamientoMotos;
