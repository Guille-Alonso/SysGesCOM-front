import { React } from "react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button, Modal, Table } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import "./TablaEventos.css";
import { useNavigate } from "react-router-dom";

const TablaEventos = ({ headings, items, getReportes }) => {
  const navigate = useNavigate();
  const [paginacion, setPaginacion] = useState(1);
  const itemPag = 10;
  const indexUltimoItem = paginacion * itemPag;
  const indexPrimerItem = indexUltimoItem - itemPag;
  const currentItems = items.slice(indexPrimerItem, indexUltimoItem);
  const totalPages = Math.ceil(items.length / itemPag);

  const [modalDelete, setModalDelete] = useState(false);

  const handleNextPage = () => {
    setPaginacion((prevPag) => prevPag + 1);
  };

  const handlePreviousPage = () => {
    setPaginacion((prevPag) => prevPag - 1);
  };
  // const handleEdit = (itemId) => {
  //   const itemToEdit = items.find((item) => item._id === itemId);
  //   setSelectedItem(itemToEdit);
  //   setShowModal(true);
  // };
  const handleRemove = async () => {
    try {
      await axios.delete("/camaras/", { data: { id: selected } });
      toast.info("Dispositivo borrado con éxito");
      getCamaras();
      setModalDelete(false);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const verDetalle = (reporte) => {
    const props = { reporte: reporte };
    navigate("/detalleEvento", { state: props });
  };

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
                  <FaTrashAlt
                    onClick={() => setModalDelete(true)}
                    className="botonEliminar"
                  />
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
