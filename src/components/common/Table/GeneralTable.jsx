import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Table } from "react-bootstrap";
import './GeneralTable.css'

const GeneralTable = ({headings, items, setSelected, selected}) => {

  return ( 
    <MDBTable responsive>
      <MDBTableHead className="colorTabla">
   
      <tr>
        { 
        headings.map((heading)=><th key={nanoid()}>{heading}</th>)
        }        
      </tr>
      </MDBTableHead>
      <MDBTableBody className="colorTabla">
      {
        
        items.length!==0 && items.map((item)=>
       
        <tr key={nanoid()} onClick={()=>setSelected(item._id)} className={selected===item._id? 'row-selected' : ''}>
          {
    
        Object.entries(item).map((elemento)=>{
          if(elemento[0]!=='_id'){
            return <td key={nanoid()}>{elemento[1]}</td>
          }
        })

          }
      
        </tr>
          )
      }
      
      </MDBTableBody>
    </MDBTable>
   );
}
 
export default GeneralTable;
