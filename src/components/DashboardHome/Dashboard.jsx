import axios from "../../config/axios";
import useGet from "../../hooks/useGet";
import { COMContext } from "../../context/COMContext";
import { useContext } from "react";
import fotoPredet from "../../assets/fotoPredeterminada.png";
import { Spinner } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useContext(COMContext);

  const [reportesDelDia, loadingReportes] =
    user.tipoDeUsuario == "visualizador" || user.tipoDeUsuario == "supervisor"
      ? useGet("/reportes/listar", axios)
      : [];
  const [reportesTotal, loadingReportesTotal] =
    user.tipoDeUsuario == "visualizador" || user.tipoDeUsuario == "supervisor"
      ? useGet("/reportes/totalesVisualizador", axios)
      : [];

  function getRandomColor() {
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const colors = [];
    for (let i = 0; i < 16; i++) {
      const red = randomInt(0, 255);
      const green = randomInt(0, 255);
      const blue = randomInt(0, 255);

      const rgbaColor = `rgba(${red}, ${green}, ${blue}, 1)`;
      colors.push(rgbaColor);
    }

    return colors;
  }

  const categoriasLabels = () => {
    let countObj = {}; // Objeto para almacenar la cantidad de reportes por categoría
    let cats = [];

    if (user.tipoDeUsuario == "visualizador") {
      for (let index = 0; index < reportesTotal.totalMes?.length; index++) {
        const categoria = reportesTotal.totalMes[index].categoria.nombre;

        if (countObj[categoria]) {
          // Si la categoría ya existe en el objeto, incrementa la cantidad
          countObj[categoria] += 1;
        } else {
          cats.push(categoria);
          // Si la categoría no existe, inicializa con 1
          countObj[categoria] = 1;
        }
      }
      console.log(reportesTotal);
      // setCatsLabel(cats)
      return countObj;
    } else {
      for (let index = 0; index < reportesTotal.totalMes?.length; index++) {
        const categoria = reportesTotal.totalMes[index]?.categoria.nombre;

        if (countObj[categoria]) {
          // Si la categoría ya existe en el objeto, incrementa la cantidad
          countObj[categoria] += 1;
        } else {
          cats.push(categoria);
          // Si la categoría no existe, inicializa con 1
          countObj[categoria] = 1;
        }
      }
      // setCatsLabel(cats)
      return countObj;
    }
  };

  const labels = Object.keys(categoriasLabels());

  const data = {
    labels,
    datasets: [
      {
        label: "Cantidad de Reportes por Categoría",
        data: Object.values(categoriasLabels()),
        backgroundColor: getRandomColor(),
      },
    ],
  };

  return (
    <>
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
            {user.tipoDeUsuario == "supervisor" ? (
              <></>
            ) : (
              <h5 className="tituloReportes">Reportes del dia</h5>
            )}
            {user.tipoDeUsuario == "visualizador" && (
              <h2 className="text-light numeroDeReportesDashboard">
                {loadingReportes ? <Spinner /> : reportesDelDia.reportes.length}
              </h2>
            )}
            {user.tipoDeUsuario == "supervisor" && (
              <h2 className="text-light numeroDeReportesDashboard">🫡</h2>
            )}
          </div>
          <div className="dashboardCard d-flex flex-column justify-content-around align-items-center text-light pt-2">
            {user.tipoDeUsuario == "supervisor" ? (
              <h5 className="tituloReportes">Despachos del mes</h5>
            ) : (
              <h5 className="tituloReportes">Reportes del mes</h5>
            )}
            {user.tipoDeUsuario == "visualizador" && (
              <h2 className="text-light numeroDeReportesDashboard">
                {loadingReportesTotal ? (
                  <Spinner />
                ) : (
                  reportesTotal.totalMes.length
                )}
              </h2>
            )}
            {user.tipoDeUsuario == "supervisor" && (
              <h2 className="text-light numeroDeReportesDashboard">
                {loadingReportesTotal ? (
                  <Spinner />
                ) : (
                  reportesTotal.totalMes.length
                )}
              </h2>
            )}
          </div>
          <div className="dashboardCard d-flex flex-column justify-content-around align-items-center text-light pt-2">
            {user.tipoDeUsuario == "supervisor" ? (
              <h5 className="tituloReportes">Despachos Totales</h5>
            ) : (
              <h5 className="tituloReportes">Reportes Totales</h5>
            )}
            {user.tipoDeUsuario == "visualizador" && (
              <h2 className="text-light numeroDeReportesDashboard">
                {loadingReportesTotal ? (
                  <Spinner />
                ) : (
                  reportesTotal.totalHistorico.length
                )}
              </h2>
            )}
            {user.tipoDeUsuario == "supervisor" && (
              <h2 className="text-light numeroDeReportesDashboard">
                {loadingReportesTotal ? (
                  <Spinner />
                ) : (
                  reportesTotal.totalHistorico.length
                )}
              </h2>
            )}
          </div>
        </div>
        <div className="dashboardDerecha">
          <div className="dashboardCardBig d-flex justify-content-center">
            <Pie data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
