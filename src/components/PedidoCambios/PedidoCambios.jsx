import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { COMContext } from "../../context/COMContext";
import { useContext } from "react";

const PedidoCambios = () => {
  const { user, buscador, setBuscador, setPaginacion } = useContext(COMContext);
  const handleChange = (event) => {
    setBuscador(event.target.value);
  };

  return (
    <>
      <div className="layoutHeight">
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
        </div>
        <div className="container-fluid col-lg-6 d-flex flex-column align-items-center p-2">
          <table class="table table-light table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Solicitante</th>
                <th scope="col">Dia a cubrir</th>
                <th scope="col">Solicitado</th>
                <th scope="col">Dia a devolver</th>
                <th></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PedidoCambios;
