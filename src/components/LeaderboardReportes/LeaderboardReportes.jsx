import React from "react";
import { Table } from "react-bootstrap";

const LeaderboardReportes = () => {
  return (
    <>
      <section className=" leaderboard w-25">
        <h3 className="text-center text-light">Top Reportes</h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Turno</th>
              <th>Reportes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>🥇</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>999</td>
            </tr>
            <tr>
              <td>🥈</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>990</td>
            </tr>
            <tr>
              <td>🥉</td>
              <td>Larry the Bird</td>
              <td>Larry the Bird</td>
              <td>980</td>
            </tr>
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default LeaderboardReportes;
