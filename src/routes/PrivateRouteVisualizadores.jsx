import React from 'react'
import { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { COMContext } from "../context/COMContext";

const PrivateRouteVisualizadores = ({children}) => {
    const { getAuth, authenticated, loading, user  } = useContext(COMContext);

    useEffect(() => {
      getAuth();
    }, []);
  
    return loading ? (
      <Spinner />
    ) : authenticated && (user.tipoDeUsuario == "visualizador" || user.tipoDeUsuario == "supervisor" || user.tipoDeUsuario == "admin")? (
      children
    ) : (
      <Navigate to="/login" />
    );
}

export default PrivateRouteVisualizadores