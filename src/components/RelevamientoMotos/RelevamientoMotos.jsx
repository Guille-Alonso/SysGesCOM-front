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
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import axios from "../../config/axios";
import { Form } from "react-bootstrap";
import useGet from "../../hooks/useGet";
import { ALTA_REPORTES_VALUES } from "../../constants";
import { COMContext } from "../../context/COMContext";

const RelevamientoMotos = () => {
  const [arrayMotos, setArrayMotos] = useState([]);
  const [changeIcon, setChangeIcon] = useState(false);
  const [selectedRadioPersona, setSelectedRadioPersona] = useState(undefined);
  const [selectedRadioCasco, setSelectedRadioCasco] = useState(undefined);
  const [volver, setVolver] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const suggestionsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [changeClass, setChangeClass] = useState(false);
  const [values, setValues] = useState(ALTA_REPORTES_VALUES)
  const { user } = useContext(COMContext);

  const [dispositivos, loading, getDispositivos] = useGet(
    "/camaras/listar",
    axios
  );
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          suggestionsRef.current &&
          !suggestionsRef.current.contains(event.target)
        ) {
          setSuggestions([]); // Cerrar la lista de sugerencias
        }
      };
  
      document.addEventListener("click", handleClickOutside);
  
      // document.addEventListener("keypress", handleKeyDown);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
        // document.removeEventListener("keypress", handleKeyDown);
      };
    }, []);
    
    const handleSuggestionClick = (suggestion, e) => {
      setValues({
        ...values,
        dispositivo: suggestion._id,
        ubicacion: suggestion.ubicacion,
      });
      setSearchTerm(suggestion);
      setSuggestions([]);
    };

    const handleInputChange = (e) => {
      setChangeClass(!changeClass);
      const value = e.target.value;
      setSearchTerm(value);
  
      // Lógica para generar las sugerencias de coincidencias
      const filteredSuggestions =
        !loading &&
        dispositivos.camaras
          .filter((disp) =>
            disp.nombre.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 6); // Mostrar solo los primeros 6 elementos
      setSuggestions(filteredSuggestions);
    };  

    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "ArrowDown") {
        setCurrentIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
      } else if (event.key === "Enter" && suggestions.length > 0) {
        const suggestion = suggestions[currentIndex];
        setValues({
          ...values,
          dispositivo: suggestion._id,
          ubicacion: suggestion.ubicacion,
        });
  
        setSearchTerm(suggestion);
        setSuggestions([]); // Limpiar las sugerencias al seleccionar una
      }
    };

  const handleClick = () => {
    setChangeIcon(!changeIcon);
  };
  const eliminarFila = (i) => {
    let array = [];
    for (let index = 0; index < arrayMotos.length; index++) {
      if (index !== i) {
        array.push(arrayMotos[index]);
      }
    }
    setArrayMotos(array);
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

  const detalleReporte = () => {
    let detalle = "";
    let countMotos = 0;
    let countPersona = 0;
    let countCascos = 0;
    let countLuces = 0;
  
    for (let index = 0; index < arrayMotos.length; index++) {
      countMotos++;
      countPersona += arrayMotos[index].personas;
      countCascos += arrayMotos[index].cascos;
      if (arrayMotos[index].luces) {
        countLuces++;
      }
    }
  
    detalle += `Total de motos: ${countMotos}\n - `;
    detalle += `Total de personas: ${countPersona}\n - `;
    detalle += `Total de cascos: ${countCascos}\n - `;
    detalle += `Cantidad de motos con luces: ${countLuces}\n`;
  
    return detalle;
  }
   

  const fechaActual = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const fechaSinZonaHoraria = fechaActual
    .toLocaleString("es-AR", options)
    .replace(",", "") // Eliminar la coma después del día de la semana
    .replace(/^(\w)|\s(\w)/g, (match) => match.toUpperCase()); // Convertir la primera letra del día y del mes en mayúscula


  const agregarReporteMotos = async () => {
    if(values.dispositivo !== "" || selectedRadioCasco !== undefined || selectedRadioPersona !== undefined){

      try {
        const objMotosReporte={
          arrayMotos: arrayMotos,
          reporte: {
            
              fecha: fechaSinZonaHoraria,
              detalle: detalleReporte(),
              naturaleza: "6479205bf3a1370bb4f1215d",
              usuario: user._id,
              categoria: "647a7a95b1be664a13cb3caa",
              subcategoria: "",
              dispositivo: values.dispositivo,
            
          }
        }
        const respuesta = await axios.post("/relevamientoMotos/alta", objMotosReporte);
        console.log(respuesta);
        toast.success("Reporte de motos generado");
        setVolver(true);
      } catch (error) {
        toast.error(error.response?.data.message || error.message);
      }
    } else toast.error("faltan cargar campos")
  };

  return (
    <>
      <div className="layoutHeight2">
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

          <div className="col-6 col-md-2">

          <Form.Group className="inputAltaEvento">
                <Form.Label className="mt-2">Dispositivo</Form.Label>
                <Form.Control
                  type="text"
                  value={searchTerm.nombre}
                  onChange={(e) => handleInputChange(e)}
                  name="dispositivo"
                  required
                  maxLength={6}
                  minLength={6}
                  autoComplete="off"
                  className="inputDispositivo"
                  onKeyDown={handleKeyDown}
                />
                <ul
                  className={"inputDispositivosReportes"}
                  ref={suggestionsRef}
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      key={index}
                      className="liCamarasyDomos"
                      style={{
                        backgroundColor:
                          currentIndex === index && !isHovered
                            ? "#ccc"
                            : "transparent",
                      }}
                      onClick={(e) => handleSuggestionClick(suggestion, e)}
                    >
                      {suggestion.nombre}
                    </li>
                  ))}
                </ul>
              </Form.Group>

              <Form.Group className="inputAltaEvento">
                <Form.Label className="mt-2">Ubicación</Form.Label>
                <Form.Control
                  type="text"
                  value={values.ubicacion}
                  disabled
                  required
                  name="ubicacion"
                />
              </Form.Group>
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
