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


function App() {
  return (
    <Router>
      <ProviderCOM>
        <Layout>
          <Routes>
            <Route path="/alta-categoria" element={<PrivateRoute><AltaCategoria /></PrivateRoute>} />
            <Route path="/lista-usuarios" element={<PrivateRoute><ListaUsuarios /></PrivateRoute>} />
            <Route path="/alta-camara" element={<PrivateRoute><AltaDeCamara /></PrivateRoute>} />
            <Route path="/cambiar-contraseña" element={<PrivateRoute><CambiarContraseña /></PrivateRoute>} />
            <Route path="/listar-camaras" element={<PrivateRoute><ListarCamaras /></PrivateRoute>} />
            <Route path="/alta-usuarios" element={<PrivateRoute><AltaUsuarios /></PrivateRoute>} />
            <Route path="/*" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editarCategoria" element={<PrivateRoute><EditarCategoria /></PrivateRoute>} />
            <Route path="/perfil-usuario" element={<PrivateRoute><PerfilUsuario/></PrivateRoute>} />
            <Route path="/alta-reporte" element={<PrivateRoute><AltaEvento/></PrivateRoute>} />
            <Route path="/reportes" element={<PrivateRoute><ListarEventos/></PrivateRoute>} />
          </Routes>
          <ToastContainer />
        </Layout>
      </ProviderCOM>
    </Router>
  );
}

export default App;
