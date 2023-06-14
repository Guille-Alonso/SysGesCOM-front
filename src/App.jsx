import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import HomePage from "./pages/HomePage";
import CambiarContraseña from "./components/CambiarContraseña/CambiarContraseña";
import LoginPage from "./pages/LoginPage";
import ProviderCOM from "./context/COMContext";
import { ToastContainer } from "react-toastify";
import AltaDeCamara from "./components/AltaDeCamara/AltaDeCamara";
import AltaUsuarios from "./components/AltaUsuarios/AltaUsuarios";
import ListaUsuarios from "./components/ListaUsuarios/ListaUsuarios";
import ListarCamaras from "./components/ListarCamaras/ListarCamaras";
import AltaCategoria from "./components/AltaCategoria/AltaCategoria";
import EditarCategoria from "./components/EditarCategoria/EditarCategoria";
import PrivateRoute from "./routes/PrivateRoute";

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/editarCategoria" element={<PrivateRoute><EditarCategoria /></PrivateRoute>} />
          </Routes>
          <ToastContainer />
        </Layout>
      </ProviderCOM>
    </Router>
  );
}

export default App;
