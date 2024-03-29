import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import HomePage from "./pages/HomePage";
import CambiarContraseña from "./components/CambiarContraseña/CambiarContraseña";
import ProviderCOM from "./context/COMContext";
import { ToastContainer } from "react-toastify";
import AltaDeCamara from "./components/AltaDeCamara/AltaDeCamara";
import AltaUsuarios from "./components/AltaUsuarios/AltaUsuarios";
import ListaUsuarios from "./components/ListaUsuarios/ListaUsuarios";
import ListarCamaras from "./components/ListarCamaras/ListarCamaras";
import AltaCategoria from "./components/AltaCategoria/AltaCategoria";
import EditarCategoria from "./components/EditarCategoria/EditarCategoria";
import PrivateRoute from "./routes/PrivateRoute";
import { PerfilUsuario } from "./components/PerfilUsuario/PerfilUsuario";
import AltaEvento from "./components/AltaEvento/AltaEvento";
import ListarEventos from "./components/ListarEventos/ListarEventos";
import Login from "./components/Login/Login";
import DetalleEvento from "./components/ListarEventos/DetalleEvento";
import AltaDespacho from "./components/Despacho/AltaDespacho";
import EditarDespacho from "./components/Despacho/EditarDespacho";
import { Grafico } from "./components/Graficos/Graficas";
import PrivateRouteAdmin from "./routes/PrivateRouteAdmin";
import PrivateRouteEstadistica from "./routes/PrivateRouteEstadistica";
import PrivateRouteAdministracion from "./routes/PrivateRouteAdministracion";
import RelevamientoMotos from "./components/RelevamientoMotos/RelevamientoMotos";
import PedidoCambios from "./components/PedidoCambios/PedidoCambios";
import Notificaciones from "./components/Notificaciones/Notificaciones";
import PrivateRouteVisualizadores from "./routes/PrivateRouteVisualizadores";
import PanelSupervisor from "./components/PanelSupervisor/PanelSupervisor";
import PrivateRouteSupervisores from "./routes/PrivateRouteSupervisores";
import PanelAdmin from "./components/PanelAdmin/panelAdmin";
import PDFcambios from "./components/PDFCambios/PDFcambios";
import ListarTickets from "./components/Tickets/ListarTickets";
import AltaTickets from "./components/Tickets/AltaTickets";
import DetalleTicket from "./components/Tickets/DetalleTicket";
import RelevamientoVehiculos from "./components/RelevamientoMotos/RelevamientoVehiculos";
import AltaNoticias from "./components/AltaNoticias/AltaNoticias";

function App() {
  return (
    <Router>
      <ProviderCOM>
        <Layout>
          <Routes>
            <Route
              path="/alta-categoria"
              element={
                <PrivateRouteEstadistica>
                  <AltaCategoria />
                </PrivateRouteEstadistica>
              }
            />
            <Route
              path="/cambio-turno"
              element={
                <PrivateRouteAdministracion>
                  <PedidoCambios />
                </PrivateRouteAdministracion>
              }
            />
            <Route
              path="/cambio-pdf"
              element={
                <PrivateRouteAdministracion>
                  <PDFcambios />
                </PrivateRouteAdministracion>
              }
            />
            <Route
              path="/lista-usuarios"
              element={
                <PrivateRouteAdmin>
                  <ListaUsuarios />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/alta-camara"
              element={
                <PrivateRouteAdmin>
                  <AltaDeCamara />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/cambiar-contraseña"
              element={
                <PrivateRoute>
                  <CambiarContraseña />
                </PrivateRoute>
              }
            />
            <Route
              path="/notificaciones"
              element={
                <PrivateRouteVisualizadores>
                  <Notificaciones />
                </PrivateRouteVisualizadores>
              }
            />
            <Route
              path="/relevamiento-motos"
              element={
                <PrivateRouteVisualizadores>
                  {/* <RelevamientoMotos /> */}
                  <RelevamientoVehiculos />
                </PrivateRouteVisualizadores>
              }
            />
            <Route
              path="/relevamiento-motos-panel"
              element={
                <PrivateRouteSupervisores>
                  <PanelSupervisor />
                </PrivateRouteSupervisores>
              }
            />
            <Route
              path="/listar-camaras"
              element={
                <PrivateRouteAdmin>
                  <ListarCamaras />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/alta-usuarios"
              element={
                <PrivateRouteAdmin>
                  <AltaUsuarios />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/estadisticas"
              element={
                <PrivateRouteEstadistica>
                  <Grafico />
                </PrivateRouteEstadistica>
              }
            />
            <Route path="/*" element={<Login />} />
            <Route
              path="/editarCategoria"
              element={
                <PrivateRouteEstadistica>
                  <EditarCategoria />
                </PrivateRouteEstadistica>
              }
            />
            <Route
              path="/perfil-usuario"
              element={
                <PrivateRoute>
                  <PerfilUsuario />
                </PrivateRoute>
              }
            />
            <Route
              path="/alta-reporte"
              element={
                <PrivateRouteVisualizadores>
                  <AltaEvento />
                </PrivateRouteVisualizadores>
              }
            />
            <Route
              path="/reportes"
              element={
                <PrivateRoute>
                  <ListarEventos />
                </PrivateRoute>
              }
            />
            <Route
              path="/detalleEvento"
              element={
                <PrivateRoute>
                  <DetalleEvento />
                </PrivateRoute>
              }
            />
            <Route
              path="/despachar"
              element={
                <PrivateRoute>
                  <AltaDespacho />
                </PrivateRoute>
              }
            />
            <Route
              path="/editarDespacho"
              element={
                <PrivateRoute>
                  <EditarDespacho />
                </PrivateRoute>
              }
            />
            <Route
              path="/panelAdmin"
              element={
                <PrivateRouteAdmin>
                  <PanelAdmin />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/alta-noticias"
              element={
                <PrivateRouteAdministracion>
                  <AltaNoticias />
                </PrivateRouteAdministracion>
              }
            />
            {/* <Route
              path="/tickets"
              element={
                <PrivateRoute>
                  <ListarTickets/>
                </PrivateRoute>
              }
            /> */}
            {/* <Route
              path="/nuevo-ticket"
              element={
                <PrivateRouteAdmin>
                  <AltaTickets />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/detalleTicket"
              element={
                <PrivateRouteAdmin>
                  <DetalleTicket />
                </PrivateRouteAdmin>
              }
            /> */}
          </Routes>
          <ToastContainer />
        </Layout>
      </ProviderCOM>
    </Router>
  );
}

export default App;
