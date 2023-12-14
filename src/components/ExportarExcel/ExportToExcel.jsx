import React from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import "./ExportExcel.css";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertirFechaConHora } from "../../utils/convertirFechaYTurno";
import { convertirEnMayusculaLaPrimeraLetra } from "../../utils/convertirLetrasYMas";

const ExportToExcel = ({ data }) => {

  const exportToExcel = () => {
    const formattedData = data.map((item) => {
      // Aquí puedes ajustar cómo deseas formatear los objetos antes de exportarlos
      return {
        fecha: convertirFechaConHora(item.fecha),
        detalle: item.detalle,
        // Nro:item.numero,
        usuario: item.usuario.nombreUsuario,
        turno: item.usuario.turno,
        dispositivo: item.dispositivo.nombre,
        ubicación: convertirEnMayusculaLaPrimeraLetra(item.dispositivo.ubicacion),
        naturaleza: item.naturaleza.nombre,
        categoria: item.categoria.nombre,
        subcategoria: item.subcategoria?.nombre,
        despacho: item.despacho?.reparticiones
          .map((repart) => repart.nombre)
          .join(", "),
        supervisor: item.despacho?.usuario.nombre,

        // Otros campos de objeto
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
          icon={faDownload}
        />
      </div>
    </>
  );
};

export default ExportToExcel;
