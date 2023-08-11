import React from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import "./ExportExcel.css"

const ExportToExcel = ({ data }) => {

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
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dic: "12",
    };

    const [, dia, mes, anio] = fecha.match(/(\d+) De (\w+) De (\d+)/);
    const mesNumerico = meses[mes];
    const diaConCeros = String(dia).padStart(2, '0');
    return `${diaConCeros}-${mesNumerico}-${anio}`;
  }

  const exportToExcel = () => {
    const formattedData = data.map(item => {
      // Aquí puedes ajustar cómo deseas formatear los objetos antes de exportarlos
      return {
        fecha:convertirFecha2ASinHora(item.fecha),
        detalle:item.detalle,
        // Nro:item.numero,
        usuario:item.usuario.nombreUsuario,
        dispositivo:item.dispositivo.nombre,
        ubicación:item.dispositivo.ubicacion,
        naturaleza: item.naturaleza.nombre,
        categoria: item.categoria.nombre,
        subcategoria: item.subcategoria?.nombre,
        // despacho: item.despacho?.acuse
        despacho: item.despacho?.reparticiones.map(repart => repart.nombre).join(', ')
        
        // Otros campos de objeto
      };
    });

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
  };

  return (
    <button className='btnExcel' onClick={exportToExcel}>Exportar</button>
  );
};

export default ExportToExcel;
