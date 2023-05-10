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

function App() {
  return (
    <Router>
      <ProviderCOM>
        <Layout>
          <Routes>
            <Route path="/lista-usuarios" element={<ListaUsuarios />} />
            <Route path="/alta-camara" element={<AltaDeCamara />} />
            <Route path="/cambiar-contraseña" element={<CambiarContraseña />} />
          <Route path="/listar-camaras" element={<ListarCamaras />} />
            <Route path="/alta-usuarios" element={<AltaUsuarios />} />
            <Route path="/*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <ToastContainer />
        </Layout>
      </ProviderCOM>
    </Router>
  );
}

export default App;
