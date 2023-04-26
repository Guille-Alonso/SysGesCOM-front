import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import HomePage from "./pages/HomePage";
<<<<<<< HEAD
import CambiarContraseña from "./components/CambiarContraseña/CambiarContraseña";
=======
import LoginPage from "./pages/LoginPage";
import ProviderCOM from "./context/COMContext";
import { ToastContainer } from "react-toastify";
>>>>>>> fdfe6da93498e155efd51d47df59d42c9ddcd02a

function App() {
  return (
    <Router>
      <ProviderCOM>   
      {/* <Layout> */}
        <Routes>
        <Route path="/cambiar-contraseña" element={<CambiarContraseña />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
        <ToastContainer/>
      {/* </Layout> */}
      </ProviderCOM>
    </Router>
  );
}

export default App
