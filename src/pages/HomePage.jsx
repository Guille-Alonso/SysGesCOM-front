import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Spinner } from "react-bootstrap";
import LeaderboardReportes from "../components/LeaderboardReportes/LeaderboardReportes";
import workingSvg from "../assets/img/focused-working.svg";
import useGet from "../hooks/useGet";
import axios from "../config/axios";
import CardCambios from "../components/CardCambio/CardCambios";
import { getDate, getMonth, parseISO } from "date-fns";
import { COMContext } from "../context/COMContext";
import Confetti from "react-confetti";
import { ReactFloatingBalloons } from "react-floating-balloons";

const HomePage = () => {
  const [reportes, loading] = useGet("/reportes/podio", axios);
  const { user } = useContext(COMContext);

  const nacimientoDate = parseISO(user.nacimiento);
  const today = new Date();

  const isBirthday = getMonth(nacimientoDate) === getMonth(today) && getDate(nacimientoDate) === getDate(today);
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
      {getMonth(nacimientoDate) === getMonth(today) && getDate(nacimientoDate) === getDate(today) && 
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
      }
          {(showBalloons &&
          <>
          <ReactFloatingBalloons 
            className="globosFC"
            count={10}
            msgText={`Feli Pumple !!!!! ${user.nombre}`}
            colors={['yellow', 'green', 'blue', 'red', 'orange', 'purple']}
            style={{ transition: "opacity 1s", opacity: showBalloons ? 1 : 0 }} 
            loop={false} 
            />
            
            
        </>
          )}
    </div>
  );
};

export default HomePage;
