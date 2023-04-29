import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import HomePage from "./pages/HomePage";
import AltaUsuarios from "./components/AltaUsuarios/AltaUsuarios";

function App() {
  return (
    <Router>
      {/* <Layout> */}
        <Routes>
          <Route path="/alta-usuarios" element={<AltaUsuarios/>} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      {/* </Layout> */}
    </Router>
  );
}

export default App
