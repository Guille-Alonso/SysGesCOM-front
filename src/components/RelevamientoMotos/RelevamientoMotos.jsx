import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import motoSvg from "../../assets/img/motor-scooter.svg";
import cascoSvg from "../../assets/img/bike-helmet.svg";
import "./RelevamientoMotos.css";
import {
  faLightbulb,
  faPeopleGroup,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-toastify";

const RelevamientoMotos = () => {
  const [arrayMotos, setArrayMotos] = useState([]);
  const [changeIcon, setChangeIcon] = useState(false);
  const [selectedRadioPersona, setSelectedRadioPersona] = useState(undefined);
  const [selectedRadioCasco, setSelectedRadioCasco] = useState(undefined);
  const handleClick = () => {
    setChangeIcon(!changeIcon);
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
      console.log(arrayMotos);
    }
  };
  return (
    <>
      <div className="layoutHeight2 pt-5">
        <div className="row justify-content-center contenedorRelevamiento">
          <div className="container-fluid col-4">
            <table class="table table-light table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Persona/s</th>
                  <th scope="col">Casco</th>
                  <th scope="col">Luces</th>
                </tr>
              </thead>
              <tbody>
                {arrayMotos.length !== 0 &&
                  arrayMotos.map((moto, index) => {
                    return (
                      <tr>
                        <th scope="row">{index}</th>
                        <td>{moto.personas}</td>
                        <td>{moto.cascos}</td>
                        <td>{moto.luces == true ? "SI" : "NO"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="container col-4 asideContainer">
            <div className="motoContainer container-fluid">
              <img src={motoSvg} alt="svg-moto" className="motoSvg" />
            </div>
            <div className="containerPersona container-fluid d-flex justify-content-center gap-4">
              <FontAwesomeIcon
                icon={faPeopleGroup}
                color="white"
                className="iconoPersona"
              />
              <div className="d-flex justify-content-around gap-3 inputContainer">
                <div className="d-flex flex-column">
                  <span className="text-light">1</span>
                  <input
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
              <div className="d-flex justify-content-around gap-3 inputContainer">
                <div className="d-flex flex-column">
                  <span className="text-light">0</span>
                  <input
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
              <div className="inputContainer">
                <div className="focoContainer">
                  {changeIcon ? (
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="focoIcono2"
                      onClick={handleClick}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="focoIcono"
                      onClick={handleClick}
                    />
                  )}
                </div>
              </div>
            </div>
            <button className="mt-2 btn btn-primary" onClick={agregarMoto}>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelevamientoMotos;
