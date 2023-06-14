import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';
import axios from '../config/axios';

export const COMContext = createContext();

const ProviderCOM = ({children}) => {

  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (values) => {
    try {
      const { data } = await axios.post("/users/login", values);
      setAuthenticated(!!data.user);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      // axios.defaults.headers.common["Authorization"] = data.token;
    } catch (error) {
      toast.error(error.response?.data.message || error.message)
    }
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
      setAuthenticated(false)
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
      }}>
      {children}
    </COMContext.Provider>
  );
}

export default ProviderCOM;