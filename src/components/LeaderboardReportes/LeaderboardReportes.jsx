import axios from "../../config/axios";
import React from "react";
import { Table } from "react-bootstrap";
import "./LeaderboardReportes.css";

const LeaderboardReportes = ({ reportes }) => {
  
  return (
    <>
      <section title={`Usuarios con más despachos por mes`} className="container p-0 leaderboard">
        <h3 className="text-center text-light">Top Reportes</h3>
        <div className="tabla-podio d-flex justify-content-center">
          <Table bordered >
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Turno</th>
                <th>Reportes</th>
              </tr>
            </thead>

            {/* <tbody>
              <tr>
                <td>🥇</td>
                <td>
                  {reportes.usuariosConMasReportes[0]?.usuario.nombreUsuario}
                </td>
                <td>{reportes.usuariosConMasReportes[0]?.usuario.turno}</td>
                <td>
                  {reportes.usuariosConMasReportes[0]?.cantidadDeReportes}
                </td>
              </tr>
              <tr>
                <td>🥈</td>
                <td>
                  {reportes.usuariosConMasReportes[1].usuario?.nombreUsuario}
                </td>
                <td>{reportes.usuariosConMasReportes[1].usuario?.turno}</td>
                <td>{reportes.usuariosConMasReportes[1].cantidadDeReportes}</td>
              </tr>
              <tr>
                <td>🥉</td>
                <td>
                  {reportes.usuariosConMasReportes[2].usuario?.nombreUsuario}
                </td>
                <td>{reportes.usuariosConMasReportes[2].usuario?.turno}</td>
                <td>{reportes.usuariosConMasReportes[2].cantidadDeReportes}</td>
              </tr>
            </tbody> */}
                <tbody>
              <tr>
                <td>🥇</td>
                <td>
                  {reportes.usuariosConMasDespachos.length > 0 ? reportes.usuariosConMasDespachos[0]?.usuario.nombreUsuario : ""}
                </td>
                <td>{reportes.usuariosConMasDespachos.length > 0 ? reportes.usuariosConMasDespachos[0]?.usuario.turno : ""}</td>
                <td>
                  {reportes.usuariosConMasDespachos.length > 0 ? reportes.usuariosConMasDespachos[0]?.totalDespachos : ""}
                </td>
              </tr>
              <tr>
                <td>🥈</td>
                <td>
                  {reportes.usuariosConMasDespachos.length > 1 ? reportes.usuariosConMasDespachos[1].usuario?.nombreUsuario : ""}
                </td>
                <td>{reportes.usuariosConMasDespachos.length > 1 ? reportes.usuariosConMasDespachos[1].usuario?.turno : ""}</td>
                <td>{reportes.usuariosConMasDespachos.length > 1 ? reportes.usuariosConMasDespachos[1].totalDespachos : ""}</td>
              </tr>
              <tr>
                <td>🥉</td>
                <td>
                  {reportes.usuariosConMasDespachos.length > 2 ? reportes.usuariosConMasDespachos[2].usuario?.nombreUsuario : ""}
                </td>
                <td>{reportes.usuariosConMasDespachos.length > 2 ? reportes.usuariosConMasDespachos[2].usuario?.turno : ""}</td>
                <td>{reportes.usuariosConMasDespachos.length > 2 ? reportes.usuariosConMasDespachos[2].totalDespachos : ""}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default LeaderboardReportes;
