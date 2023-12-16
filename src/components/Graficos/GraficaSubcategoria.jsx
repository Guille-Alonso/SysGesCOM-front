import React, { useContext, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../config/axios";
import { Form, Spinner } from "react-bootstrap";
import "../AltaEvento/AltaEvento.css";
import useGet from "../../hooks/useGet";
import "./Graficas.css";
import { COMContext } from "../../context/COMContext";
import ExportToExcel from "../ExportarExcel/ExportToExcel";
import { obtenerPeriodoDelDiaConHora } from "../../utils/convertirFechaYTurno";
import { getRandomColor } from "../../utils/convertirLetrasYMas";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const GraficaSubcategoria = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [reportes, setReportes] = useState([]);
  const [reportesFecha, setReportesFecha] = useState([]);
  const [turno, setTurno] = useState("");

  const [usuarios, loading] = useGet("/users/email", axios);
  const [searchTerm, setSearchTerm] = useState({ nombre: "" });

  const suggestionContainerRef = useRef(null);

  const fechaActual = new Date();
  const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
  const ultimoDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

  const [fechaDesde, setFechaDesde] = useState(primerDiaDelMes.toISOString().substr(0, 10));
  const [fechaHasta, setFechaHasta] = useState(ultimoDiaDelMes.toISOString().substr(0, 10));

  const [flagHistorico, setFlagHistorico] = useState(true)

  const [isHovered, setIsHovered] = useState(false);
  const [changeClass, setChangeClass] = useState(false);

  const { categoryName, setCategoryName } = useContext(COMContext);
  const [despachado, setDespachado] = useState(false);

  const fetchReportes = async () => {
    try {
      const { data } = await axios.get("/reportes/listar");
      setReportes(data.reportes);
      setReportesFecha(data.reportes);
    } catch (error) {
      console.log("Error al obtener los reportes:", error);
    }
  };

  
  const [turnos, loadingTurnos, getTurnos] = useGet(
    "/turnos/listar",
    axios
  );

  const [roles, loadingRoles, getRoles] = useGet(
    "/roles/listar",
    axios
  );

  useEffect(() => {
    fetchReportes();
    const handleClickOutside = (event) => {
      if (
        suggestionContainerRef.current &&
        !suggestionContainerRef.current.contains(event.target)
      ) {
        setSuggestions([]); // Cerrar la lista de sugerencias
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const totalSubcategorias = () => {
    return reportesFecha.filter((rep) => rep.categoria.nombre == categoryName)
      .length;
  };

  const handleFechaDesdeChange = (event) => {
    const fechaSeleccionada = event.target.value;
    setFechaDesde(fechaSeleccionada);
  };

  const handleFechaHastaChange = (event) => {
    const fechaSeleccionada = event.target.value;
    setFechaHasta(fechaSeleccionada);
  };

  function convertirFecha2ASinHora(fecha) {
    const meses = {
      Ene: "01",
      Feb: "02",
      Mar: "03",
      Abr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Ago: "08",
      Sept: "09",
      Oct: "10",
      Nov: "11",
      Dic: "12",
    };

    const [, dia, mes, anio] = fecha.match(/(\d+) De (\w+) De (\d+)/);
    const mesNumerico = meses[mes];
    const diaConCeros = String(dia).padStart(2, "0");
    return `${anio}-${mesNumerico}-${diaConCeros}`;
  }

  useEffect(() => {
    if (fechaDesde !== "" && fechaHasta !== "") {
      if (searchTerm.nombre !== "") {
        const reportesConUsuario = reportes.filter(
          (rep) => rep.usuario.nombre == searchTerm.nombre
        );
        const reportesFiltrados = reportesConUsuario.filter((reporte) => {
          const fechaReporte = convertirFecha2ASinHora(reporte.fecha);

          return fechaReporte >= fechaDesde && fechaReporte <= fechaHasta;
        });
        setReportesFecha(reportesFiltrados);
      } else if (turno !== "") {
        const reportesConTurno = reportes.filter(
          (rep) => obtenerPeriodoDelDiaConHora(rep.fecha) == turno
        );
        const reportesFiltrados = reportesConTurno.filter((reporte) => {
          const fechaReporte = convertirFecha2ASinHora(reporte.fecha);

          return fechaReporte >= fechaDesde && fechaReporte <= fechaHasta;
        });
        setReportesFecha(reportesFiltrados);
      } else {
        const reportesFiltrados = reportes.filter((reporte) => {
          const fechaReporte = convertirFecha2ASinHora(reporte.fecha);

          return fechaReporte >= fechaDesde && fechaReporte <= fechaHasta;
        });
        setReportesFecha(reportesFiltrados);
      }
    }
  }, [fechaDesde, fechaHasta]);

  const countReportesCat = () => {
    let countObj = {}; // Objeto para almacenar la cantidad de reportes por categoría
    let cats = [];
    for (let index = 0; index < reportes.length; index++) {
      const categoria = reportes[index].categoria.nombre;

      if (countObj[categoria]) {
        // Si la categoría ya existe en el objeto, incrementa la cantidad
        countObj[categoria] += 1;
      } else {
        cats.push(categoria);
        // Si la categoría no existe, inicializa con 1
        countObj[categoria] = 1;
      }
    }
    // setCatsLabel(cats)
    return countObj;
  };

  const countReportesSubcatElegida = () => {
    let countObj = {}; // Objeto para almacenar la cantidad de reportes por categoría
    let cats = [];
    if (despachado) {
      let reportesDespachados = reportesFecha.filter(
        (rep) => rep.despacho !== undefined
      );

      for (let index = 0; index < reportesDespachados.length; index++) {
        let categoria = reportesDespachados[index].categoria.nombre;
        if (categoryName == categoria) {
          let subcategoria =
            reportesDespachados[index].subcategoria?.nombre.length < 20
              ? reportesDespachados[index].subcategoria?.nombre
              : reportesDespachados[index].subcategoria?.nombre.slice(0, 40) +
              "...";

          if (countObj[subcategoria]) {
            // Si la categoría ya existe en el objeto, incrementa la cantidad
            countObj[subcategoria] += 1;
          } else {
            cats.push(subcategoria);
            // Si la categoría no existe, inicializa con 1
            countObj[subcategoria] = 1;
          }
        }
      }
      // setCatsLabel(cats)
      return countObj;
    } else {
      for (let index = 0; index < reportesFecha.length; index++) {
        let categoria = reportesFecha[index].categoria.nombre;
        if (categoryName == categoria) {
          let subcategoria =
            reportesFecha[index].subcategoria?.nombre.length < 20
              ? reportesFecha[index].subcategoria?.nombre
              : reportesFecha[index].subcategoria?.nombre.slice(0, 40) + "...";

          if (countObj[subcategoria]) {
            // Si la categoría ya existe en el objeto, incrementa la cantidad
            countObj[subcategoria] += 1;
          } else {
            cats.push(subcategoria);
            // Si la categoría no existe, inicializa con 1
            countObj[subcategoria] = 1;
          }
        }
      }
      // setCatsLabel(cats)
      return countObj;
    }
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      // title: {
      //   display: true,
      //   text: "Estadísticas",
      // },
    },
  };

  const labels = Object.keys(countReportesSubcatElegida());
  const labelsCat = Object.keys(countReportesCat());

  const data = {
    labels,
    datasets: [
      {
        label: "Cantidad de Reportes por Subcategoría",
        data: Object.values(countReportesSubcatElegida()),
        backgroundColor: getRandomColor(),
      },
    ],
  };

  const filtroTurnoYFecha = (reportesFiltro) => {
    if (fechaDesde !== "" && fechaHasta !== "") {
      // Filtrar los reportes con un rango de fechas
      const reportesFiltrados = reportesFiltro.filter((reporte) => {
        const fechaReporte = convertirFecha2ASinHora(reporte.fecha);

        return fechaReporte >= fechaDesde && fechaReporte <= fechaHasta;
      });

      setReportesFecha(reportesFiltrados);
    } else setReportesFecha(reportesFiltro);
  };

  const selectedCategoria = (e) => {
    setCategoryName(e.target.value);
  };

  const selectedTurno = (e) => {
    setTurno(e.target.value);
    setDespachado(false);
    if (e.target.value !== "") {
      setSearchTerm({ nombre: "" });
      filtroTurnoYFecha(
        reportes.filter(
          (rep) => e.target.value == obtenerPeriodoDelDiaConHora(rep.fecha)
        )
      );
    } else {
      if (fechaDesde !== "" && fechaHasta !== "") {
        setSearchTerm({ nombre: "" });
        if (e.target.value !== "") {
          setReportesFecha(
            reportes.filter((rep) => rep.usuario.turno == e.target.value)
          );
        } else filtroTurnoYFecha(reportes);
      } else {
        setReportesFecha(reportes);
        setFechaDesde("");
        setFechaHasta("");
        setSearchTerm({ nombre: "" });
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "ArrowDown") {
      setCurrentIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (event.key === "Enter" && suggestions.length > 0) {
      const suggestion = suggestions[currentIndex];
      filtroTurnoYFecha(
        reportes.filter((rep) => rep.usuario._id == suggestion._id)
      );
      setSearchTerm(suggestion);
      setSuggestions([]); // Limpiar las sugerencias al seleccionar una
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    filtroTurnoYFecha(
      reportes.filter((rep) => rep.usuario._id == suggestion._id)
    );
  };

  const handleInputChange = (e) => {
    setChangeClass(!changeClass);
    const value = e.target.value;
    setSearchTerm(value);

    // Lógica para generar las sugerencias de coincidencias
    const filteredSuggestions =
      !loading &&
      usuarios.users
        .filter((disp) =>
          disp.nombre.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 6); // Mostrar solo los primeros 6 elementos
    setSuggestions(filteredSuggestions);
  };

  const reportesDespachadosExcel = () => {
    if (!despachado) {
      setDespachado(!despachado);
      setReportesFecha(
        reportesFecha.filter((rep) => rep.despacho !== undefined)
      );
    } else {
      setDespachado(!despachado);
      setReportesFecha(reportes);
      setSearchTerm({ nombre: "" });
      setFechaDesde("");
      setFechaHasta("");
      setTurno("");
    }
  };

  const traerHistorico = async () => {
    if (flagHistorico) {
      setReportesFecha([])
      setTurno("");
      setFechaDesde("");
      setFechaHasta("");
      setDespachado(false);
      setSearchTerm({ nombre: "" });
      try {
        setFlagHistorico(false)
        const { data } = await axios.get("/reportes/listarHistorico");
        setReportes(data.reportes);
        setReportesFecha(data.reportes);
      } catch (error) {
        console.log("Error al obtener los reportes:", error);
      }
    }
  }

  return (
    <>
      <div className="container filterContainer">
        <Form.Group className="inputAltaEvento">
          <div className="headerSearch">
            <div className="headerSearchItem">
              <div className="headerSearchItem2">
                <input
                  type="text"
                  value={searchTerm.nombre}
                  onChange={(e) => handleInputChange(e)}
                  name="dispositivo"
                  required
                  maxLength={30}
                  minLength={4}
                  autoComplete="off"
                  className="headerSearchInput"
                  onKeyDown={handleKeyDown}
                  placeholder="Ingrese un nombre"
                  disabled={reportesFecha.length == 0 ? true : false}
                />
                <div className="d-flex">
                  <label className="me-1">Histórico</label>
                  <input disabled={!flagHistorico || reportesFecha.length == 0 ? true : false} onClick={traerHistorico} type="checkbox" name="" id="" />
                </div>
                <div className="headerSelectWrapper">
                  <select
                    id=""
                    onChange={selectedCategoria}
                    value={categoryName}
                    className="headerSelect"
                    disabled={reportesFecha.length == 0 ? true : false}
                  >
                    <option value="">Categorías</option>
                    {labelsCat.length !== 0 &&
                      labelsCat.map((cat) => {
                        return <option value={cat}>{cat}</option>;
                      })}
                  </select>
                </div>
                <select
                  name="turno"
                  id=""
                  onChange={selectedTurno}
                  value={turno}
                  className="headerSelect"
                  disabled={reportesFecha.length == 0 ? true : false}
                >
                  <option value="">Todos</option>
                  {
                  loading ?
                  <Spinner/>
                  :
                  turnos.turnos.map((item) => {
                    return (
                      <option key={item._id} value={item.nombre}>
                        {item.nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="headerSearchItem2">

                <div className="dateContainer">
                  <input
                    type="date"
                    name="desde"
                    id="desde"
                    value={fechaDesde}
                    onChange={handleFechaDesdeChange}
                    disabled={reportesFecha.length == 0 ? true : false}
                  />
                  <input
                    type="date"
                    name="hasta"
                    id="hasta"
                    value={fechaHasta}
                    onChange={handleFechaHastaChange}
                    disabled={reportesFecha.length == 0 ? true : false}
                  />
                </div>
                <div className="headerSelectWrapper">
                  <div className="custom-tooltip">
                    <label className="me-2">Despachos</label>
                    <div className="tooltip-content">
                      Al combinar filtros, utilizar éste en último término
                    </div>
                    <input
                      onClick={reportesDespachadosExcel}
                      checked={despachado}
                      type="checkbox"
                      name=""
                      id=""
                      disabled={reportesFecha.length == 0 ? true : false}
                    />
                  </div>
                </div>
                <label className="" htmlFor="">
                  Total: {totalSubcategorias()}
                </label>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <ul
              className={
                suggestions.length > 0
                  ? " w-25 ulSugerencias bg-light container"
                  : "d-none"
              }
              ref={suggestionContainerRef}
            >
              {suggestions.map((suggestion, index) => (
                <li
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  key={index}
                  className="liCamarasyDomos ps-2"
                  style={{
                    backgroundColor:
                      currentIndex === index && !isHovered
                        ? "#1967D2"
                        : "#101113",
                  }}
                  onClick={(e) => handleSuggestionClick(suggestion, e)}
                >
                  {suggestion.nombre}
                </li>
              ))}
            </ul>
          </div>
        </Form.Group>
      </div>
      {reportesFecha.length !== 0 ? (
        <div className=" layoutHeight d-flex justify-content-center align-items-center mt-3">
          <Bar className="w-75 h-50" options={options} data={data} />
          {reportesFecha.length !== 0 ? (
            <ExportToExcel data={reportesFecha.filter(rep=>rep.categoria.nombre == categoryName)}/>
          ) : (
            <></>
          )}
        </div>
      ) : (
      <div className="layoutHeight d-flex justify-content-center align-items-end pt-4 ">
        {/* <Spinner variant="light" /> */}
        
        {Array.from({ length: 12 }).map(() => (
        <tr className="h-50 pb-0 ">

        <td className="pe-2" >
            <SkeletonTheme baseColor="#202020" highlightColor="blue" className=" d-flex align-items-end">
              <Skeleton height={Math.floor(Math.random()*500)} width={"10vh"}/>
            </SkeletonTheme>
          </td>
      
      </tr>
        ))}
    </div >
      )} 
    </>
  );
};

export default GraficaSubcategoria;
