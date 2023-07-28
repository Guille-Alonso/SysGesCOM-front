import React, { useState } from "react";
import "./Home.css";
import { addDays } from "date-fns";
import { DateRange, DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import LeaderboardReportes from "../components/LeaderboardReportes/LeaderboardReportes";
import workingSvg from "../assets/img/focused-working.svg";
import useGet from "../hooks/useGet";
import axios from "../config/axios";

const HomePage = () => {
  const [state, setState] = useState({
    selection1: {
      // startDate: addDays(new Date(), 1),
      key: "selection1",
    },
    selection2: {
      startDate: addDays(new Date(), 4),
      endDate: addDays(new Date(), 8),
      key: "selection2",
    },
    selection3: {
      startDate: addDays(new Date(), 8),
      endDate: addDays(new Date(), 10),
      key: "selection3",
      autoFocus: false,
      disabled: true,
    },
  });
  const endDate = state.selection1.endDate;
  const [reportes, loading] = useGet("/reportes/podio", axios);

  return (
    <div className="layoutHeight">
      <div className="d-flex justify-content-around">
        <main className="estadisticas">
          <div>
            <img src={workingSvg} className="inProgress" alt="" />
          </div>
        </main>
        <aside className="contenedorCambios">
          {!loading && <LeaderboardReportes reportes={reportes} />}
          <div className="almanaque mt-5">
            <DateRange
              onChange={(item) => setState({ ...state, ...item })}
              ranges={[state.selection1, state.selection2, state.selection3]}
              retainEndDateOnFirstSelection={true}
              moveRangeOnFirstSelection={false}
            />
          </div>
          <div className="contendor-referencias">
            <p className="text-light">
              {endDate ? (
                <>
                  <strong>
                    Tu pedido de cambio es para el día: <br />
                  </strong>
                  {format(endDate, "dd/MM/yyyy")} {"🔵"}
                </>
              ) : (
                <>Elije una fecha para pedir cambio</>
              )}
              <br />
              {endDate ? (
                <>
                  <strong>Los dias que podes devolver son desde: </strong>{" "}
                  <br />
                  {format(state.selection2.startDate, "dd/MM/yyyy ")}
                  <strong>Hasta: </strong>
                  {format(state.selection2.endDate, "dd/MM/yyyy")} {"🟢"}
                </>
              ) : (
                <></>
              )}
              {/* {console.log(state.selection1)} */}
            </p>
          </div>
          <Button variant="primary" className="botonEnviarPedido">
            Enviar pedido
          </Button>
        </aside>
      </div>
      <div className="d-flex justify-content-around mt-5">
        <section className="w-50 text-center"></section>
      </div>
    </div>
  );
};

export default HomePage;
