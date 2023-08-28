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
  const [tipoPodio, setTipoPodio] = useState("general")

  function obtenerPeriodoDelDiaConHora(fecha) {
    const horaActual = fecha.getHours();

    if (horaActual >= 7 && horaActual < 15) {
        return 'mañana';
    } else if (horaActual >= 15 && horaActual < 23) {
        return 'tarde';
    } else {
        return 'noche';
    }
}

  const [reportesTurno, loadingTurno] = useGet(`/reportes/podio/${obtenerPeriodoDelDiaConHora(new Date())}`, axios);
  
  return (
    <div className="layoutHeight">
      <div className="d-flex justify-content-around">
        <main className="estadisticas">
          <div>
            <img src={workingSvg} className="inProgress" alt="" />
          </div>
        </main>
        <aside className="contenedorCambios">

          <select className="selectPodio mt-2" onChange={(e) => setTipoPodio(e.target.value)} value={tipoPodio}>
            <option value="general">General</option>
            <option value="turno">Mi Turno</option>
          </select>

          {loading ? (
            <Spinner className="mt-3" variant="light" />
          ) : tipoPodio == "general" && (
            <LeaderboardReportes reportes={reportes} />
          )}

          {
           tipoPodio == "turno" &&
              <LeaderboardReportes reportes={reportesTurno} />
          }
          <div className="mt-3">
          <CardCambios />
          </div>
       
        </aside>
      </div>
      <div className="d-flex justify-content-around mt-5">
        <section className="w-50 text-center"></section>
      </div>
    </div>
  );
};

export default HomePage;
