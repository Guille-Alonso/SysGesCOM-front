import React from 'react'
import { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { COMContext } from "../context/COMContext";

const PrivateRouteSupervisores = ({children}) => {
    const { getAuth, authenticated, loading, user  } = useContext(COMContext);

    useEffect(() => {
      getAuth();
    }, []);
  
    return loading ? (
      <Spinner />
    ) : authenticated && (user.tipoDeUsuario.nombre == "supervisor" || user.tipoDeUsuario.nombre == "admin" || user.tipoDeUsuario.nombre == "administración")? (
      children
    ) : (
      <Navigate to="/login" />
    );
}

export default PrivateRouteSupervisores