import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProviderCOM from "./context/COMContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ProviderCOM>   
      {/* <Layout> */}
        <Routes>
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
