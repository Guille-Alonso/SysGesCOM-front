import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import useGet from "../../hooks/useGet";
import axios from "../../config/axios";
import TablaEventos from "./TablaEventos";
import { useNavigate } from "react-router-dom";
import { COMContext } from "../../context/COMContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import "./ListarEventos.css";
import { convertirFecha2ASinHora, convertirFechaASinHora, obtenerFechaActualEnFormatoISO, obtenerPeriodoDelDia, obtenerPeriodoDelDiaConHora } from "../../utils/convertirFechaYTurno";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { nanoid } from "nanoid";

import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

const ListarEventos = () => {
  const [reportes, loading, getReportes] = useGet("/reportes/listar", axios);
  const { user, buscador, setBuscador, setPaginacion, checkboxDespacho, checkboxMunicipal, checkboxSeguridad, setCheckboxDespacho,
    setCheckboxMunicipal, setCheckboxSeguridad, ResultadoBusqueda, setResultadoBusqueda } = useContext(COMContext);

  const [selected, setSelected] = useState(undefined);

  const headings = [
    "Nro",
    "Fecha",
    "Detalle",
    "Usuario",
    "Dispositivo",
    "Categoria",
    "",
  ];
  const handleChange = (event) => {
    setBuscador(event.target.value);
  };

  const navigate = useNavigate();

  const nuevoReporte = () => {
    navigate("/alta-reporte");
  };

  const limpiarInputRadio = () => {
    setCheckboxDespacho(false);
    getReportes();
  };


  const filtroReportesDespachados = (array, SiONo) => {
    setCheckboxDespacho(!SiONo);
    if (!checkboxDespacho) {
      setResultadoBusqueda(array);
    } else if (checkboxDespacho) {
      if (checkboxSeguridad) {
        setResultadoBusqueda(
          reportes.reportes.filter((reporte) => reporte.naturaleza.nombre == "Seguridad")
        );
      } else if (checkboxMunicipal) {
        setResultadoBusqueda(
          reportes.reportes.filter((reporte) => reporte.naturaleza.nombre == "Municipal")
        );
      } else setResultadoBusqueda(reportes.reportes);
    }

    setPaginacion(1);
  };

  const filtroReportesSeguridad = (array, SiONo) => {
    setCheckboxSeguridad(!SiONo);
    if (!checkboxSeguridad) {
      setResultadoBusqueda(array);
    } else if (checkboxDespacho) {
      setResultadoBusqueda(
        reportes.reportes.filter((report) => report.despacho !== undefined)
      );
    } else setResultadoBusqueda(reportes.reportes);
  };

  const filtroReportesMunicipal = (array, SiONo) => {
    setCheckboxMunicipal(!SiONo);
    if (!checkboxMunicipal) {
      setResultadoBusqueda(array);
    } else if (checkboxDespacho) {
      setResultadoBusqueda(
        reportes.reportes.filter((report) => report.despacho !== undefined)
      );
    } else setResultadoBusqueda(reportes.reportes);
  };

  const cont = 11;

  // function convertirFecha2ASinHora(fecha) {
  //   const meses = {
  //     Ene: "01",
  //     Feb: "02",
  //     Mar: "03",
  //     Abr: "04",
  //     May: "05",
  //     Jun: "06",
  //     Jul: "07",
  //     Ago: "08",
  //     Sept: "09",
  //     Oct: "10",
  //     Nov: "11",
  //     Dic: "12",
  //   };

  //   const [, dia, mes, anio] = fecha.match(/(\d+) De (\w+) De (\d+)/);
  //   const mesNumerico = meses[mes];
  //   const diaConCeros = String(dia).padStart(2, "0");
  //   return `${diaConCeros}/${mesNumerico}/${anio}`;
  // }

  useEffect(() => {

    if (Array.isArray(reportes.reportes) && ((!checkboxDespacho && !checkboxMunicipal && !checkboxSeguridad) || (buscador !== ""))) {

      setCheckboxDespacho(false);
      setCheckboxMunicipal(false);
      setCheckboxSeguridad(false)

      let results = reportes.reportes.filter(
        (reporte) => reporte.numero == buscador
      );

      if (results.length == 0) {
        results = reportes.reportes.filter((reporte) =>
          convertirFecha2ASinHora(reporte.fecha).includes(buscador)
        );
      }

      if (results.length == 0) {
        results = reportes.reportes.filter(
          (reporte) =>
            reporte.detalle.toLowerCase().includes(buscador.toLowerCase()) ||
            reporte.usuario.nombreUsuario
              .toLowerCase()
              .includes(buscador.toLowerCase()) ||
            reporte.dispositivo.nombre
              .toLowerCase()
              .includes(buscador.toLowerCase()) ||
            reporte.categoria.nombre
              .toLowerCase()
              .includes(buscador.toLowerCase())
        );
      }
      setResultadoBusqueda(results);
    }
  }, [reportes, buscador]);

  // function obtenerPeriodoDelDia() {
  //   const horaActual = new Date().getHours();

  //   if (horaActual >= 7 && horaActual < 15) {
  //     return "mañana";
  //   } else if (horaActual >= 15 && horaActual < 23) {
  //     return "tarde";
  //   } else {
  //     return "noche";
  //   }
  // }

  // function obtenerPeriodoDelDiaConHora(fechaString) {
  //   const hora = fechaString.split(", ")[1].split(":")[0];

  //   const horaActual = parseInt(hora, 10);

  //   if (horaActual >= 7 && horaActual < 15) {
  //     return "mañana";
  //   } else if (horaActual >= 15 && horaActual < 23) {
  //     return "tarde";
  //   } else {
  //     return "noche";
  //   }
  // }

  // function obtenerFechaActualEnFormatoISO() {
  //   const fechaActual = new Date();

  //   const year = fechaActual.getFullYear();
  //   const month = String(fechaActual.getMonth() + 1).padStart(2, "0");
  //   const day = String(fechaActual.getDate()).padStart(2, "0");

  //   return `${year}-${month}-${day}`;
  // }

  // function convertirFechaASinHora(fecha) {
  //   const meses = {
  //     Ene: "01",
  //     Feb: "02",
  //     Mar: "03",
  //     Abr: "04",
  //     May: "05",
  //     Jun: "06",
  //     Jul: "07",
  //     Ago: "08",
  //     Sept: "09",
  //     Oct: "10",
  //     Nov: "11",
  //     Dic: "12",
  //   };

  //   const [, dia, mes, anio] = fecha.match(/(\d+) De (\w+) De (\d+)/);
  //   const mesNumerico = meses[mes];
  //   const diaConCeros = String(dia).padStart(2, "0");
  //   if (
  //     `${anio}-${mesNumerico}-${diaConCeros}` ==
  //     obtenerFechaActualEnFormatoISO()
  //   ) {
  //     return true;
  //   } else return false;
  // }

  function obtenerTotalObjetosCumplenCondicion(array) {
    const filterArr = array.filter(
      (rep) =>
        obtenerPeriodoDelDia() == obtenerPeriodoDelDiaConHora(rep.fecha) &&
        convertirFechaASinHora(rep.fecha)
    );
    return filterArr.length;
  }

  return (
    <Container fluid className="layoutHeight">
      <div className="contenedorBusquedaCategoria">
        <input
          type="text"
          className="buscadorCamaras"
          value={buscador}
          onChange={handleChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="iconoBusquedaCamaras"
        />
        {(user.tipoDeUsuario == "admin" ||
          user.tipoDeUsuario == "visualizador" ||
          user.tipoDeUsuario == "supervisor") && (
            <Button
              onClick={nuevoReporte}
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
              }}
            >
              +
            </Button>
          )}

        {user.tipoDeUsuario == "supervisor" && (
          <>
            <label className="totalTurno" htmlFor="">
              Turno {obtenerPeriodoDelDia()}:{" "}
              {reportes.reportes !== undefined
                ? obtenerTotalObjetosCumplenCondicion(reportes.reportes)
                : ""}
            </label>
            <FontAwesomeIcon
              onClick={limpiarInputRadio}
              className="refrescarLista"
              icon={faRotate}
            />
          </>
        )}

        {user.tipoDeUsuario == "visualizador" && (
          <label className="totalTurno" htmlFor="">
            Total del día:{" "}
            {reportes.reportes !== undefined ? reportes.reportes.length : ""}
          </label>
        )}

        <div className="d-flex filtrarPorDespacho">
          <label className="me-1">Despachos</label>
          <input
            checked={checkboxDespacho}
            onClick={() =>
              filtroReportesDespachados(
                checkboxSeguridad || checkboxMunicipal
                  ? ResultadoBusqueda.filter(
                    (reporte) => reporte.despacho !== undefined
                  )
                  :
                  reportes.reportes.filter(
                    (reporte) => reporte.despacho !== undefined
                  ),
                checkboxDespacho
              )
            }
            name=""
            value=""
            type="checkbox"
          ></input>
        </div>

        {user.tipoDeUsuario == "supervisor" && (
          <div className="d-flex filtrarPorTipo">
            <label className="me-1">Seguridad</label>
            <input
              checked={checkboxSeguridad}
              onClick={() =>
                filtroReportesSeguridad(
                  checkboxDespacho
                    ? ResultadoBusqueda.filter(
                      (reporte) => reporte.naturaleza.nombre == "Seguridad"
                    )
                    : reportes.reportes.filter(
                      (reporte) => reporte.naturaleza.nombre == "Seguridad"
                    ),
                  checkboxSeguridad
                )
              }
              disabled={checkboxMunicipal ? true : false}
              name="tipoDeEvento"
              value="seguridad"
              type="checkbox"
            ></input>
            <label className="ms-4 me-1">Municipal</label>
            <input
              checked={checkboxMunicipal}
              onClick={() =>
                filtroReportesMunicipal(
                  checkboxDespacho
                    ? ResultadoBusqueda.filter(
                      (reporte) => reporte.naturaleza.nombre == "Municipal"
                    )
                    : reportes.reportes.filter(
                      (reporte) => reporte.naturaleza.nombre == "Municipal"
                    ),
                  checkboxMunicipal
                )
              }
              disabled={checkboxSeguridad ? true : false}
              name="tipoDeEvento"
              value="municipal"
              type="checkbox"
            ></input>
          </div>
        )}
      </div>

      <Row className="mt-5">
        <Col>
          {loading ? (

            <MDBTable responsive>
              <MDBTableHead className="colorTabla">
                <tr>
                  {headings.map((heading) => (
                    <th key={nanoid()}>{heading}</th>
                  ))}
                </tr>
              </MDBTableHead>
              <MDBTableBody className="colorTabla">
                {Array.from({ length: 10 }).map(() => (
                  
                  <tr key={nanoid()}>
                    <td>
                      <SkeletonTheme baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#202020" highlightColor="blue">
                        <Skeleton />
                      </SkeletonTheme>
                    </td>

                  </tr>
                ))}


              </MDBTableBody>
            
            </MDBTable>
          ) : (
            <TablaEventos
              headings={[
                "Nro",
                "Fecha",
                "Detalle",
                "Usuario",
                "Dispositivo",
                "Categoria",
                "",
              ]}
              items={[...ResultadoBusqueda].reverse()}
              setSelected={setSelected}
              selected={selected}
              getReportes={getReportes}
              user={user}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ListarEventos;
