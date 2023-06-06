import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Table } from "react-bootstrap";
import "./TableCategoria.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableCategoria = ({ headings, items, setSelected, selected }) => {
  return (
    <MDBTable responsive className="generalTable">
      <MDBTableHead className="colorTabla">
        <tr>
          {headings.map((heading) => (
            <th scope="col" key={nanoid()}>
              {heading}
            </th>
          ))}
        </tr>
      </MDBTableHead>
      <MDBTableBody className="colorTabla">
        {items.length !== 0 &&
          items.map((item) => (
            <tr
              onClick={() => setSelected(item._id)}
              className={selected === item._id ? "row-selected" : ""}
            >
              {Object.values(item).map((value) => {
                if (typeof value === "object" && value !== null) {
                  return (
                    <>
                      <td>{item.nombre}</td>
                      <td>{value?.nombre}</td>
                      <td>
                        <FaEdit
                          className="botonEditar"
                          onClick={() => handleEdit(item._id)}
                        />
                        <FaTrashAlt
                          className="botonEliminar"
                          onClick={() => setModalDelete(true)}
                        />
                      </td>
                    </>
                  );
                }
              })}
            </tr>
          ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default TableCategoria;
