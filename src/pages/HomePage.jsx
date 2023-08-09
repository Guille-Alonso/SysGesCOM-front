import React, { useContext, useState } from "react";
import "./Home.css";
import { Spinner } from "react-bootstrap";
import LeaderboardReportes from "../components/LeaderboardReportes/LeaderboardReportes";
import workingSvg from "../assets/img/focused-working.svg";
import useGet from "../hooks/useGet";
import axios from "../config/axios";
import CardCambios from "../components/CardCambio/CardCambios";

const HomePage = () => {
  const [reportes, loading] = useGet("/reportes/podio", axios);

  return (
    <div className="layoutHeight">
      <div className="d-flex justify-content-around">
        <main className="estadisticas">
          <div>
            <img src={workingSvg} className="inProgress" alt="" />
          </div>
        </main>
        <aside className="contenedorCambios gap-5">
          {loading ? (
            <Spinner variant="light" />
          ) : (
            <LeaderboardReportes reportes={reportes} />
          )}
          <CardCambios />
        </aside>
      </div>
      <div className="d-flex justify-content-around mt-5">
        <section className="w-50 text-center"></section>
      </div>
    </div>
  );
};

export default HomePage;
