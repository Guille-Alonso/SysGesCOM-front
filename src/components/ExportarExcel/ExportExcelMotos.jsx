import React from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import "./ExportExcel.css";
import {
  faCar,
  faDownload,
  faMotorcycle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertirEnMayusculaLaPrimeraLetra } from "../../utils/convertirLetrasYMas";
import { convertirFechaConHora } from "../../utils/convertirFechaYTurno";

const ExportExcelMotos = ({ vehiculos }) => {

  const exportToExcel = () => {
   
    const formattedData = vehiculos.vehiculos
      .filter((vehiculo) => vehiculo.reporte !== null)
      .map((item) => {
        return {
          vehiculo: item.vehiculo,
          cantidad: item.cantidad,
          fecha: convertirFechaConHora(item.reporte.fecha),
          dispositivo: item.reporte?.dispositivo.nombre,
          ubicación: convertirEnMayusculaLaPrimeraLetra(
            item.reporte.dispositivo.ubicacion
          ),
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
          // icon={faMotorcycle}
          icon={faCar}
        />
      </div>
    </>
  );
};

export default ExportExcelMotos;
