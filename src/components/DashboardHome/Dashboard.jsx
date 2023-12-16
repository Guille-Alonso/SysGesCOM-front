import axios from "../../config/axios";
import useGet from "../../hooks/useGet";
import { COMContext } from "../../context/COMContext";
import { useContext } from "react";
import fotoPredet from "../../assets/fotoPredeterminada.png";
import { Spinner } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getRandomColor } from "../../utils/convertirLetrasYMas";
import "./Dashboard.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useContext(COMContext);

  const [reportesDelDia, loadingReportes] =
    user.tipoDeUsuario.nombre == "visualizador"
      ? useGet("/reportes/listar", axios)
      : [];
  const [reportesTotal, loadingReportesTotal] =
    user.tipoDeUsuario.nombre == "visualizador" || user.tipoDeUsuario.nombre == "supervisor"
      ? useGet("/reportes/totalesVisualizadorYSupervisor", axios)
      : [];

  const categoriasLabels = () => {
    let countObj = {}; // Objeto para almacenar la cantidad de reportes por categoría
    let cats = [];

    if (user.tipoDeUsuario.nombre == "visualizador") {
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
        label: user.tipoDeUsuario.nombre == "visualizador" ? "Cantidad de Reportes por Categoría" : "Cantidad de Despachos por Categoría",
        data: Object.values(categoriasLabels()),
        backgroundColor: getRandomColor(),
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: user.tipoDeUsuario.nombre == "visualizador" ? "Reportes del Mes" : "Despachos del mes", // Personaliza el título aquí
        fontSize: 16,
        color: "white"
      },
    },
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
            {user.tipoDeUsuario.nombre == "supervisor" ? (
              <></>
            ) : (
              <h5 className="tituloReportes">Reportes del dia</h5>
            )}
            {user.tipoDeUsuario.nombre == "visualizador" && (
              <h2 className="text-light numeroDeReportesDashboard">
                {loadingReportes ? <Spinner /> : reportesDelDia.reportes.length}
              </h2>
            )}
            {user.tipoDeUsuario.nombre == "supervisor" && (
              <h2 className="text-light numeroDeReportesDashboard">👮‍♂️</h2>
            )}
          </div>
          <div className="dashboardCard d-flex flex-column justify-content-around align-items-center text-light pt-2">
            {user.tipoDeUsuario.nombre == "supervisor" ? (
              <h5 className="tituloReportes">Despachos del mes</h5>
            ) : (
              <h5 className="tituloReportes">Reportes del mes</h5>
            )}
            {user.tipoDeUsuario.nombre == "visualizador" && (
              <h2 className="text-light numeroDeReportesDashboard">
                {loadingReportesTotal ? (
                  <Spinner />
                ) : (
                  reportesTotal.totalMes.length
                )}
              </h2>
            )}
            {user.tipoDeUsuario.nombre == "supervisor" && (
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
            {user.tipoDeUsuario.nombre == "supervisor" ? (
              <h5 className="tituloReportes">Despachos Totales</h5>
            ) : (
              <h5 className="tituloReportes">Reportes Totales</h5>
            )}
            {user.tipoDeUsuario.nombre == "visualizador" && (
              <h2 className="text-light numeroDeReportesDashboard">
                {loadingReportesTotal ? (
                  <Spinner />
                ) : (
                  reportesTotal.totalHistorico.length
                )}
              </h2>
            )}
            {user.tipoDeUsuario.nombre == "supervisor" && (
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
            {
              loadingReportesTotal ?
                <>
                  <Spinner variant="light" className="mt-5 w-75 h-75" />
                  {/* 
                  <div className="w-100 h-100" >

                    <SkeletonTheme baseColor="#202020" highlightColor="blue" borderRadius={"100%"}>
                      <Skeleton className="m-6.5 h-75 w-75" />
                    </SkeletonTheme>
                  </div> */}
                </>

                :
                <Pie data={data} options={options} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
