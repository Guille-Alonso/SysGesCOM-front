import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import HomePage from "./pages/HomePage";
import CambiarContraseña from "./components/CambiarContraseña/CambiarContraseña";

function App() {
  return (
    <Router>
      {/* <Layout> */}
        <Routes>
        <Route path="/cambiar-contraseña" element={<CambiarContraseña />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      {/* </Layout> */}
    </Router>
  );
}

export default App
