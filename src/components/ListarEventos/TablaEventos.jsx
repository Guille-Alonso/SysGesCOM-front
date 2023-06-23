import React from "react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrashAlt ,FaEye} from "react-icons/fa";
import "./TablaEventos.css";
import { useNavigate } from "react-router-dom";

const TablaEventos = ({ headings, items }) => {
  const navigate = useNavigate();

  const verDetalle=(reporte)=>{
  const props = { reporte: reporte };
  navigate("/img", { state: props });
  }
  return (
    <>
      <MDBTable responsive>
        <MDBTableHead className="colorTabla">
          <tr>
            {headings.map((heading) => (
              <th key={nanoid()}>{heading}</th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody className="colorTabla">
          {items.length !== 0 &&
            items.map((item) => (
              <tr key={item._id}>
                <td>{new Date(item.fecha).toDateString()}</td>
                <td>{item.detalle}</td>
                <td>{item.usuario.nombreUsuario}</td>
                <td>{item.naturaleza.nombre.toUpperCase()}</td>
                <td>{item.categoria.nombre}</td>
                <td>{item.subcategoria?.nombre}</td>
                <td>
                  <FaEye onClick={()=>verDetalle(item)} className="botonVer"/>
                  <FaEdit className="botonEditar" />
                  <FaTrashAlt className="botonEliminar" />
                </td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default TablaEventos;
