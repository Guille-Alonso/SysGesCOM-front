import React from "react";
import { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { COMContext } from "../context/COMContext";

const PrivateRouteAdministracion = ({ children }) => {
  const { getAuth, authenticated, loading, user } = useContext(COMContext);

  useEffect(() => {
    getAuth();
  }, []);

  return loading ? (
    <Spinner />
  ) : authenticated && user.tipoDeUsuario !== "estadística" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRouteAdministracion;
