import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "../config/axios";

export const COMContext = createContext();

const ProviderCOM = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [botonState, setBotonState] = useState(false);

  const [buscador, setBuscador] = useState("");
  const [paginacion, setPaginacion] = useState(1);
  const [checkboxDespacho, setCheckboxDespacho] = useState(false);
  const [checkboxSeguridad, setCheckboxSeguridad] = useState(false);
  const [checkboxMunicipal, setCheckboxMunicipal] = useState(false);
  const [ResultadoBusqueda, setResultadoBusqueda] = useState([]);

  const [categoryName, setCategoryName] = useState("");

  const login = async (values) => {
    setBotonState(true);
    try {
      const { data } = await axios.post("/users/login", values);
      setAuthenticated(!!data.user);
      setUser(data.user);
      axios.defaults.headers.common["Authorization"] = data.token;
      localStorage.setItem("token", data.token);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
    setBotonState(false);
  };

  const getAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return setAuthenticated(false);
      }
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get("/users/authStatus");
      setUser(data.user);
      setAuthenticated(true);
    } catch (error) {
      setAuthenticated(false);
      toast.error("Error de autenticación. Ingrese nuevamente");
    }
    setLoading(false);
  };
  return (
    <COMContext.Provider
      value={{
        user,
        authenticated,
        setAuthenticated,
        loading,
        login,
        getAuth,
        setLoading,
        botonState,
        setBotonState,
        paginacion,
        setPaginacion,
        buscador,
        setBuscador,
        categoryName,
        setCategoryName,
        checkboxDespacho,
        checkboxMunicipal,
        checkboxSeguridad,
        setCheckboxDespacho,
        setCheckboxMunicipal,
        setCheckboxSeguridad,
        ResultadoBusqueda,
        setResultadoBusqueda
      }}
    >
      {children}
    </COMContext.Provider>
  );
};

export default ProviderCOM;
