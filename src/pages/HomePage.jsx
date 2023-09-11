import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Spinner } from "react-bootstrap";
import LeaderboardReportes from "../components/LeaderboardReportes/LeaderboardReportes";
import useGet from "../hooks/useGet";
import axios from "../config/axios";
import CardCambios from "../components/CardCambio/CardCambios";
import { getDate, getMonth, parseISO } from "date-fns";
import { COMContext } from "../context/COMContext";
import Confetti from "react-confetti";
import { ReactFloatingBalloons } from "react-floating-balloons";
import ModalPodio from "../components/ModalPodio/ModalPodio";
import fotoPredet from "../assets/fotoPredeterminada.png";

const HomePage = () => {
  const [reportes, loading] = useGet("/reportes/podio", axios);
  const [reportesDelDia, loadingReportes] = useGet("/reportes/listar", axios);
  const [tipoPodio, setTipoPodio] = useState("general");

  function obtenerPeriodoDelDiaConHora(fecha) {
    const horaActual = fecha.getHours();

    if (horaActual >= 7 && horaActual < 15) {
      return "mañana";
    } else if (horaActual >= 15 && horaActual < 23) {
      return "tarde";
    } else {
      return "noche";
    }
  }

  const [reportesTurno, loadingTurno] = useGet(
    `/reportes/podio/${obtenerPeriodoDelDiaConHora(new Date())}`,
    axios
  );

  const { user } = useContext(COMContext);

  const nacimientoDate = parseISO(user.nacimiento);
  const today = new Date();

  const isBirthday =
    getMonth(nacimientoDate) === getMonth(today) &&
    getDate(nacimientoDate) === getDate(today);

  const [showBalloons, setShowBalloons] = useState(isBirthday);
  useEffect(() => {
    if (isBirthday) {
      const hideBalloonsTimer = setTimeout(() => {
        setShowBalloons(false);
      }, 18000);

      return () => {
        clearTimeout(hideBalloonsTimer);
      };
    }
  }, [isBirthday]);

  return (
    <div className="layoutHeight">
      <div className="d-flex justify-content-around contenedorHome">
        <main className="estadisticas">
          <div>
            <div className="dashboardUsuario mt-5 d-flex">
              <div className="dashboardIzquierda">
                <div className="dashboardCard d-flex justify-content-center align-items-center">
                  <img
                    className="imgProfileDashboard"
                    src={
                      user.foto !== undefined && user.foto !== ""
                        ? user.foto
                        : fotoPredet
                    }
                  />
                </div>
                <div className="dashboardCard d-flex flex-column justify-content-around align-items-center text-light pt-2">
                  <h5 className="tituloReportes">Reportes del dia</h5>
                  {user.tipoDeUsuario == "visualizador" && (
                    <h2 className="text-light numeroDeReportesDashboard">
                      {loadingReportes ? (
                        <Spinner />
                      ) : (
                        reportesDelDia.reportes.length
                      )}
                    </h2>
                  )}
                </div>
                <div className="dashboardCard d-flex"></div>
                <div className="dashboardCard d-flex"></div>
              </div>
              <div className="dashboardDerecha">
                <div className="dashboardCardBig d-flex"></div>
              </div>
            </div>
            {loading ? (
              <Spinner className="mt-3 d-none" />
            ) : user.noticias || user.noticias == null ? (
              <ModalPodio reportes={reportes} />
            ) : (
              <></>
            )}
          </div>
        </main>
        <aside className="contenedorCambios">
          <select
            className="selectPodio mt-2"
            onChange={(e) => setTipoPodio(e.target.value)}
            value={tipoPodio}
          >
            <option value="general">General</option>
            <option value="turno">Mi Turno</option>
          </select>

          {loading ? (
            <Spinner className="mt-3" variant="light" />
          ) : (
            tipoPodio == "general" && (
              <LeaderboardReportes reportes={reportes} />
            )
          )}

          {tipoPodio == "turno" && (
            <LeaderboardReportes reportes={reportesTurno} />
          )}
          <div className="mt-3">
            <CardCambios />
          </div>
        </aside>
      </div>
      <div className="d-flex justify-content-around mt-5">
        <section className="w-50 text-center"></section>
      </div>
      {getMonth(nacimientoDate) === getMonth(today) &&
        getDate(nacimientoDate) === getDate(today) && (
          <>
            <Confetti
              className="confettiCumple"
              numberOfPieces={500}
              gravity={0.1}
              wind={0.01}
              initialVelocityX={1}
              initialVelocityY={10}
            />
          </>
        )}
      {showBalloons && (
        <>
          <ReactFloatingBalloons
            className="globosFC"
            count={10}
            msgText={`Feliz Cumple !! ${user.nombre}`}
            colors={["yellow", "green", "blue", "red", "orange", "purple"]}
            style={{ transition: "opacity 1s", opacity: showBalloons ? 1 : 0 }}
            loop={false}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
