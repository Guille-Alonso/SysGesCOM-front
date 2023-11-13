import React from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import "./ExportExcel.css";
import { faDownload, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertirEnMayusculaLaPrimeraLetra } from "../../utils/convertirLetrasYMas";
import { convertirFechaConHora } from "../../utils/convertirFechaYTurno";

const ExportExcelMotos = ({motos}) => {    

    // function convertirFechaConHora(fecha) {
    //     const diasSemana = {
    //       Domingo: "Sun",
    //       Lunes: "Mon",
    //       Martes: "Tue",
    //       Miércoles: "Wed",
    //       Jueves: "Thu",
    //       Viernes: "Fri",
    //       Sábado: "Sat",
    //     };
    
    //     const meses = {
    //       Ene: "01",
    //       Feb: "02",
    //       Mar: "03",
    //       Abr: "04",
    //       May: "05",
    //       Jun: "06",
    //       Jul: "07",
    //       Ago: "08",
    //       Sept: "09",
    //       Oct: "10",
    //       Nov: "11",
    //       Dic: "12",
    //     };
    
    //     const [, diaSemana, dia, mes, anio, hora, minutos, segundos] = fecha.match(
    //       /(\w+) (\d+) De (\w+) De (\d+), (\d+):(\d+):(\d+)/
    //     );
    
    //     // const diaSemanaAbreviado = diasSemana[diaSemana];
    //     const mesNumerico = meses[mes];
    //     const diaConCeros = String(dia).padStart(2, "0");
    //     const horaConCeros = String(hora).padStart(2, "0");
    //     const minutosConCeros = String(minutos).padStart(2, "0");
    //     const segundosConCeros = String(segundos).padStart(2, "0");
    
    //     return `${diaConCeros}-${mesNumerico}-${anio} ${horaConCeros}:${minutosConCeros}:${segundosConCeros}`;
    //   }
    
      // const convertirEnMayusculaLaPrimeraLetra = (cadena) => {
    
      //   // Dividir la cadena en palabras
      //   let palabras = cadena.split(" ");
    
      //   // Iterar sobre cada palabra y capitalizar la primera letra
      //   for (let i = 0; i < palabras.length; i++) {
      //     let palabra = palabras[i];
      //     let nuevaPalabra = "";
    
      //     for (let j = 0; j < palabra.length; j++) {
      //       if (j === 0 && palabra[j]!=="y") {
      //         nuevaPalabra += palabra[j].toUpperCase();
      //       } else {
      //         nuevaPalabra += palabra[j].toLowerCase();
      //       }
      //     }
    
      //     palabras[i] = nuevaPalabra;
      //   }
    
      //   // Unir las palabras nuevamente en una cadena
      //   return palabras.join(" ");
    
      // }
    
      const exportToExcel = () => {
       
        const formattedData = motos.motos.filter(moto=>moto.reporte !== null).map((item) => {

              return {
                  personas:item.personas,
                  cascos:item.cascos,
                  luces:item.luces?"Si":"No",
                  fecha: convertirFechaConHora(item.reporte.fecha),
                  dispositivo: item.reporte?.dispositivo.nombre,
                  ubicación: convertirEnMayusculaLaPrimeraLetra(item.reporte.dispositivo.ubicacion),
                  subcategoria: item.reporte.subcategoria.nombre,
                };
            
        });
    
        const ws = XLSX.utils.json_to_sheet(formattedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "data.xlsx");
      };

  return (
    <>
   
      <div className="fondoBtnExcel">
        <FontAwesomeIcon  
        className="btnExcel"
        onClick={exportToExcel} 
        icon={faMotorcycle} />
      </div>
    
    </>
  )
}

export default ExportExcelMotos