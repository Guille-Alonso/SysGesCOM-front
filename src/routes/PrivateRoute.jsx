import { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { COMContext } from "../context/COMContext";

const PrivateRoute = ({ children }) => {
  const { getAuth, authenticated, loading } = useContext(COMContext);

  useEffect(() => {
    getAuth();
  }, []);

  return loading ? (
    <Spinner />
  ) : authenticated ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;