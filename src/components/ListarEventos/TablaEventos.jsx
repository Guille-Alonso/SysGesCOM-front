import React from "react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaTrashAlt ,FaEye} from "react-icons/fa";
import "./TablaEventos.css";
import { useNavigate } from "react-router-dom";

const TablaEventos = ({ headings, items }) => {
  const navigate = useNavigate();
  const [paginacion, setPaginacion] = useState(1);
  const itemPag = 10;
  const indexUltimoItem = paginacion * itemPag;
  const indexPrimerItem = indexUltimoItem - itemPag;
  const currentItems = items.slice(indexPrimerItem, indexUltimoItem);
  const totalPages = Math.ceil(items.length / itemPag);

  const handleNextPage = () => {
    setPaginacion((prevPag) => prevPag + 1);
  };

  const handlePreviousPage = () => {
    setPaginacion((prevPag) => prevPag - 1);
  };

  const verDetalle=(reporte)=>{
  const props = { reporte: reporte };
  navigate("/detalleEvento", { state: props });
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
          {currentItems.length !== 0 &&
            currentItems.map((item) => (
              <tr key={item._id}>
                <td>{item.fecha.split(",")[0]}</td>
                <td>{item.detalle}</td>
                <td>{item.usuario.nombreUsuario}</td>
                <td>{item.naturaleza.nombre.toUpperCase()}</td>
                <td>{item.categoria.nombre}</td>
                <td>{item.subcategoria?.nombre}</td>
                <td>
                  <FaEye
                    onClick={() => verDetalle(item)}
                    className="botonVer"
                  />
                  <FaEdit className="botonEditar" />
                  <FaTrashAlt className="botonEliminar" />
                </td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
      <div className="paginacionCont">
        <Button
          className="paginacionBtnPrev"
          disabled={paginacion === 1}
          onClick={handlePreviousPage}
        >
          Anterior
        </Button>
        <div className="paginacionText">
          Página {paginacion} de {totalPages}
        </div>
        <Button
          className="paginacionBtnNext"
          disabled={paginacion === totalPages}
          onClick={handleNextPage}
        >
          Siguiente
        </Button>
      </div>
    </>
  );
};

export default TablaEventos;
