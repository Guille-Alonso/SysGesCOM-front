import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from '../../config/axios';

export function Grafico() {
   
const [reportes, setReportes] = useState([]);

const fetchReportes = async () => {
    try {
        const {data} = await axios.get("/reportes/listar");
        setReportes(data.reportes);

    } catch (error) {
        console.log("Error al obtener los reportes:", error);
      
    }
};

useEffect(() => {
   
    fetchReportes();
  
}, []);

const countReportesCat = () => {
    let countObj = {}; // Objeto para almacenar la cantidad de reportes por categoría
    let cats = [];
    for (let index = 0; index < reportes.length; index++) {
      const categoria = reportes[index].categoria.nombre;

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
      title: {
        display: true,
        text: "Estadísticas",
      },
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
          label: 'Dataset 3',
          data: Object.values(countReportesCat()),
            backgroundColor: getRandomColor(),
        },
    ],
  };

  return(<div className='w-50 layoutHeight'>
  
    <Bar options={options} data={data} />
  
  </div>) 
}
