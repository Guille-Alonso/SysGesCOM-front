import React, { useReducer, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar,getElementAtEvent } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from '../../config/axios';
import { Form } from 'react-bootstrap';
import "../AltaEvento/AltaEvento.css";
import useGet from '../../hooks/useGet';

export function Grafico() {
const [suggestions, setSuggestions] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);

const [reportes, setReportes] = useState([]);
const [reportesFecha, setReportesFecha] = useState([]);
const [turno,setTurno] = useState("")

const [usuarios, loading] = useGet(
  "/users/email",
  axios
);


const fetchReportes = async () => {
    try {
        const {data} = await axios.get("/reportes/listar");
        setReportes(data.reportes);
        setReportesFecha(data.reportes);

    } catch (error) {
        console.log("Error al obtener los reportes:", error);
      
    }
};

const suggestionContainerRef = useRef(null);

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

const [fechaDesde, setFechaDesde] = useState('');
const [fechaHasta, setFechaHasta] = useState('');

const handleFechaDesdeChange = (event) => {
  setFechaDesde(event.target.value);
};

const handleFechaHastaChange = (event) => {
  setFechaHasta(event.target.value);
};

function convertirFecha2ASinHora(fecha) {
  const meses = {
    Ene: '01', Feb: '02', Mar: '03', Abr: '04', May: '05', Jun: '06',
    Jul: '07', Ago: '08', Sep: '09', Oct: '10', Nov: '11', Dic: '12'
  };

  const [, dia, mes, anio] = fecha.match(/(\d+) De (\w+) De (\d+)/);
  const mesNumerico = meses[mes];
  return `${anio}-${mesNumerico}-${dia}`;
}

useEffect(() => {
   if(fechaDesde !== '' && fechaHasta !== ''){
  
    // Filtrar los reportes con un rango de fechas
    const reportesFiltrados = reportes.filter((reporte) => {
      const fechaReporte = convertirFecha2ASinHora(reporte.fecha);
    
      return fechaReporte >= fechaDesde && fechaReporte <= fechaHasta;
    });

  
    setReportesFecha(reportesFiltrados);
  
  }
}, [fechaDesde,fechaHasta]);

const countReportesCat = () => {
    let countObj = {}; // Objeto para almacenar la cantidad de reportes por categoría
    let cats = [];
    for (let index = 0; index < reportesFecha.length; index++) {
      const categoria = reportesFecha[index].categoria.nombre;

      if (countObj[categoria]) {
        // Si la categoría ya existe en el objeto, incrementa la cantidad
        countObj[categoria] += 1;
      } else {
        cats.push(categoria)
        // Si la categoría no existe, inicializa con 1
        countObj[categoria] = 1;
      }
    }
    // setCatsLabel(cats)
    return  countObj;
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
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: "Estadísticas",
      // },
    },
  };

  function getRandomColor() {
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  
    const colors = [];
    for (let i = 0; i < 16; i++) {
      const red = randomInt(0, 255);
      const green = randomInt(0, 255);
      const blue = randomInt(0, 255);
  
      const rgbaColor = `rgba(${red}, ${green}, ${blue}, 1)`;
      colors.push(rgbaColor);
    }
  
    return colors;
  }
  
  
  const labels = Object.keys(countReportesCat());
  
  const data = {
    labels,
    datasets: [
      {
          label: 'Reportes por fecha',
          data: Object.values(countReportesCat()),
            backgroundColor: getRandomColor(),
        },
    ],
  };

  const filtroTurnoYFecha =(reportesFiltro)=>{
    if(fechaDesde !== '' && fechaHasta !== ''){
  
      // Filtrar los reportes con un rango de fechas
      const reportesFiltrados = reportesFiltro.filter((reporte) => {
        const fechaReporte = convertirFecha2ASinHora(reporte.fecha);
      
        return fechaReporte >= fechaDesde && fechaReporte <= fechaHasta;
      });
  
    
      setReportesFecha(reportesFiltrados);
    
    }else setReportesFecha(reportesFiltro);
  }

  const selectedTurno = (e) => {
    setTurno(e.target.value)
    console.log(e.target.value);
    if (e.target.value !== "") {
      // setReportesFecha(reportes.filter(rep=>rep.usuario.turno == e.target.value))
      filtroTurnoYFecha(reportes.filter(rep => rep.usuario.turno == e.target.value));
    } else {
      if (fechaDesde !== "" && fechaHasta !== "") {
        if(e.target.value !== ""){
          setReportesFecha(reportes.filter(rep => rep.usuario.turno == e.target.value));
        }else filtroTurnoYFecha(reportes)
      } else {
        setReportesFecha(reportes)
        setFechaDesde('');
        setFechaHasta('');
        setSearchTerm({ nombre: "" });
      }
    }
  }


  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "ArrowDown") {
      setCurrentIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (event.key === "Enter" && suggestions.length > 0) {
      const suggestion = suggestions[currentIndex];
      filtroTurnoYFecha(reportes.filter(rep=>rep.usuario._id == suggestion._id));
      setSearchTerm(suggestion);
      setSuggestions([]); // Limpiar las sugerencias al seleccionar una
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    filtroTurnoYFecha(reportes.filter(rep=>rep.usuario._id == suggestion._id));
  };

  const [changeClass, setChangeClass] = useState(false);

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

  const [isHovered, setIsHovered] = useState(false);

  return(
    <>
      <div className='text-center my-2'>
      <Form.Group className="inputAltaEvento">
                <label className='me-1'>Usuario</label>
                <input
                  type="text"
                  value={searchTerm.nombre}
                  onChange={(e) => handleInputChange(e)}
                  name="dispositivo"
                  required
                  maxLength={6}
                  minLength={6}
                  autoComplete="off"
                  className="inputDispositivo w-25 mb-2"
                  onKeyDown={handleKeyDown}
                />
                
                <ul
                  className="inputDispositivosReportes"
                  ref={suggestionContainerRef}
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
        <label className='me-1' htmlFor="">Turno</label>
        <select name="" id="" onChange={selectedTurno} value={turno}>
          <option value="">Todos</option>
          <option value="mañana">Mañana</option>
          <option value="tarde">Tarde</option>
          <option value="noche">Noche</option>
        </select>
        <label className='ms-2 me-1' htmlFor="desde">Desde</label>
        <input type="date" name="desde" id="desde" value={fechaDesde} onChange={handleFechaDesdeChange} />

        <label className='ms-2  me-1' htmlFor="hasta">Hasta</label>
        <input type="date" name="hasta" id="hasta" value={fechaHasta} onChange={handleFechaHastaChange} />
        <label className='ms-2' htmlFor="">Total: {reportesFecha.length}</label>

      </div>
      <div className=' layoutHeight d-flex justify-content-center align-items-center'>
        <Bar className='w-75 h-50' options={options} data={data} />
      </div>
    </>
  )
}
