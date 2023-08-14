import React, { useState } from "react";
import "./Home.css";
import { addDays } from "date-fns";
import { format } from "date-fns";
import { Button, Spinner } from "react-bootstrap";
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
          {loading?
          <Spinner variant="light"/>
          : 
          <LeaderboardReportes reportes={reportes} />}
        </aside>
      </div>
      <div className="d-flex justify-content-around mt-5">
        <section className="w-50 text-center"></section>
      </div>
    </div>
  );
};

export default HomePage;
