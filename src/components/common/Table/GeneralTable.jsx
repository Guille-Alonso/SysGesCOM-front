import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Table } from "react-bootstrap";
import "./GeneralTable.css";

const GeneralTable = ({ headings, items, setSelected, selected }) => {
  return (
    <MDBTable responsive className="generalTable">
      <MDBTableHead className="colorTabla">
        <tr>
          {headings.map((heading) => (
            <th scope="col" key={nanoid()} stickyTop>
              {heading}
            </th>
          ))}
        </tr>
      </MDBTableHead>
      <MDBTableBody className="colorTabla">
        {items.length !== 0 &&
          items.map((item) => (
            <tr
              key={nanoid()}
              onClick={() => setSelected(item._id)}
              className={selected === item._id ? "row-selected" : ""}
            >
              {Object.values(item).map((value) => {
                if (typeof value === "object" && value !== null) {
                  return <td key={nanoid()}>{value?.nombre}</td>;
                } else if (value === true) {
                  return <td key={nanoid}>Activo</td>;
                } else if (value === false) {
                  return <td key={nanoid}>Inactivo</td>;
                } else return <td key={nanoid()}>{value}</td>;
              })}
            </tr>
          ))}
        {console.log(items)}
      </MDBTableBody>
    </MDBTable>
  );
};

export default GeneralTable;
