import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Table } from "react-bootstrap";
import "./GeneralTable.css";

const GeneralTable = ({ headings, items, setSelected, selected }) => {
  return (
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
            <tr
              key={nanoid()}
              onClick={() => setSelected(item)}
              className={selected === item ? "row-selected" : ""}
            >
              {Object.entries(item).map((elemento) => {
                if (elemento[0] !== "categoria" && elemento[0] !== "estado") {
                  return <td key={nanoid()}>{elemento[1]}</td>;
                }
              })}
          
            </tr>
          ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default GeneralTable;
