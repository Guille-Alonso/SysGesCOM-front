import { Alert } from "react-bootstrap";
import { LOGIN_VALUES } from "../../constants";
import { validationLogin } from "../../helpers/validationsLogin";
import useForm from "../../hooks/useForm";
import "./login.css";
import { useContext, useEffect, useState } from "react";
import { COMContext } from "../../context/COMContext";
import { useNavigate } from "react-router-dom";
// import logoCom from "../../assets/img/logo_comm_marca_de_agua.png";
import logoComNavidad from "../../assets/img/logo_comm_marca_de_agua-navidad.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  const { login, authenticated, botonState } = useContext(COMContext);

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    LOGIN_VALUES,
    login,
    validationLogin
  );
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/home");
    }
  }, [authenticated]);

  return (
    <div className="d-flex justify-content-center align-items-center layoutHeight">
      <div className="box">
        <span className="borderLine"></span>
        <form onSubmit={handleSubmit}>
          <img src={logoComNavidad} alt="logo del com" />
          <div className="inputBox">
            <input
              name="nombreUsuario"
              value={values.nombreUsuario}
              onChange={handleChange}
              type="text"
              required="required"
              maxLength={15}
            />
            <span>Nombre de Usuario</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              name="contraseña"
              value={values.contraseña}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              required="required"
              maxLength={30}
            />
            {values.contraseña && (
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={handleShowPassword}
                className="icono-password-login"
              />
            )}
            <span>Contraseña</span>
            <i></i>
          </div>
          {Object.keys(errors).length !== 0 &&
            Object.values(errors).map((error, index) => (
              <Alert variant="danger" className="mt-3" key={index}>
                {error}
              </Alert>
            ))}
          <input
            disabled={botonState}
            type="submit"
            value="Entrar"
            className="mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
