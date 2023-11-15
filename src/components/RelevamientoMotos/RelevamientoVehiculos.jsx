import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import motoSvg from "../../assets/motor-bike.svg";
import biciSvg from "../../assets/bicycle.svg";
import camionetaSvg from "../../assets/car-pickup.svg";
import autoSvg from "../../assets/car.svg";
import camionSvg from "../../assets/truck.svg";
import colectivoSvg from "../../assets/bus-alt.svg";
import "./RelevamientoVehiculos.css";
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

const RelevamientoVehiculos = () => {
  const [motosBicis, setMotosBicis] = useState(0);
  const [autosCamionetas, setAutosCamionetas] = useState(0);
  const [camiones, setCamiones] = useState(0);
  const [colectivos, setColectivos] = useState(0);

  const [volver, setVolver] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const suggestionsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [changeClass, setChangeClass] = useState(false);
  const [values, setValues] = useState(ALTA_REPORTES_VALUES);
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

  const detalleReporte = () => {
    let detalle = "";

    detalle += `Total de motos y bicis: ${motosBicis}\n - `;
    detalle += `Total de autos y camionetas: ${autosCamionetas}\n - `;
    detalle += `Total de camiones: ${camiones}\n - `;
    detalle += `Total de colectivos: ${colectivos}\n`;

    return detalle;
  };

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
    if (
      values.dispositivo !== "" &&
      (motosBicis > 0 || autosCamionetas > 0 || camiones > 0 || colectivos > 0)
    ) {
      let arr = [];
      arr.push({ "bicicleta/moto": motosBicis });
      arr.push({ "auto/camioneta": autosCamionetas });
      arr.push({ camion: camiones });
      arr.push({ colectivo: colectivos });
      try {
        const objVehiculoReporte = {
          arrayVehiculos: arr,
          reporte: {
            fecha: fechaSinZonaHoraria,
            detalle: detalleReporte(),
            naturaleza: "64b702496e1ce7bbdc5cc26a",
            usuario: user._id,
            categoria: "64b728ef93f64a87567f9840",
            subcategoria: "64e7da580a5e30019cccd20a", //relevamiento motos
            dispositivo: values.dispositivo,
          },
        };
        console.log(objVehiculoReporte);
        const respuesta = await axios.post(
          "/relevamientoVehicular/alta",
          objVehiculoReporte
        );
        console.log(respuesta);
        toast.success("Reporte de vehiculos generado");
        setVolver(true);
      } catch (error) {
        toast.error(error.response?.data.message || error.message);
      }
    } else toast.error("faltan cargar campos");
  };

  return (
    <>
      <div className="layoutHeight2">
        <div className="justify-content-around p-4 col-md-12 d-flex row">
          <div className="container-fluid col-12 col-md-6 asideContainer">
            <div className="motoContainer container-fluid">
              <div className=" d-flex flex-column justify-content-center align-items-center">
                <h4>MOTO / BICI</h4>
                <div className="d-flex justify-content-around align-items-center w-100">
                  <button
                    className="btn btn-danger botonAgregarVehiculo"
                    onClick={() => {
                      setMotosBicis(
                        motosBicis !== 0 ? motosBicis - 1 : motosBicis
                      );
                    }}
                  >
                    -
                  </button>
                  <div className="contenedorSvg">
                    <img src={motoSvg} alt="svg-moto" className="motoSvg" />
                    <img src={biciSvg} alt="svg-moto" className="motoSvg" />
                  </div>
                  <button
                    className="btn btn-success botonAgregarVehiculo"
                    onClick={() => {
                      setMotosBicis(motosBicis + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <h4>AUTO / CAMIONETA</h4>
                <div className="d-flex justify-content-around align-items-center w-100">
                  <button
                    className="btn btn-danger botonAgregarVehiculo"
                    onClick={() => {
                      setAutosCamionetas(
                        autosCamionetas !== 0
                          ? autosCamionetas - 1
                          : autosCamionetas
                      );
                    }}
                  >
                    -
                  </button>
                  <div className="contenedorSvg">
                    <img src={autoSvg} alt="svg-moto" className="motoSvg" />
                    <img
                      src={camionetaSvg}
                      alt="svg-moto"
                      className="motoSvg"
                    />
                  </div>
                  <button
                    className="btn btn-success botonAgregarVehiculo"
                    onClick={() => {
                      setAutosCamionetas(autosCamionetas + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <h4>CAMIÓN</h4>
                <div className="d-flex justify-content-around align-items-center w-100">
                  <button
                    className="btn btn-danger botonAgregarVehiculo"
                    onClick={() => {
                      setCamiones(camiones !== 0 ? camiones - 1 : camiones);
                    }}
                  >
                    -
                  </button>
                  <div className="contenedorSvg">
                    <img src={camionSvg} alt="svg-moto" className="motoSvg" />
                  </div>
                  <button
                    className="btn btn-success botonAgregarVehiculo"
                    onClick={() => {
                      setCamiones(camiones + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <h4>COLECTIVO</h4>
                <div className="d-flex justify-content-around align-items-center w-100">
                  <button
                    className="btn btn-danger botonAgregarVehiculo"
                    onClick={() => {
                      setColectivos(
                        colectivos !== 0 ? colectivos - 1 : colectivos
                      );
                    }}
                  >
                    -
                  </button>
                  <div className="contenedorSvg">
                    <img
                      src={colectivoSvg}
                      alt="svg-moto"
                      className="motoSvg"
                    />
                  </div>
                  <button
                    className="btn btn-success botonAgregarVehiculo"
                    onClick={() => {
                      setColectivos(colectivos + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className=" d-flex flex-column justify-content-around align-items-center contendorContadores ">
                <div>
                  <h3>{motosBicis}</h3>
                </div>
                <div>
                  <h3>{autosCamionetas}</h3>
                </div>
                <div>
                  <h3>{camiones}</h3>
                </div>
                <div>
                  <h3>{colectivos}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className=" col-12 col-md-4">
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
              <ul className={"inputDispositivosReportes"} ref={suggestionsRef}>
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
            <button
              className="mt-2 btn btn-primary w-100 mt-5"
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

export default RelevamientoVehiculos;
