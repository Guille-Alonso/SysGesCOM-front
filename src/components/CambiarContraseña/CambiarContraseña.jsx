import React, { useContext } from "react";
import useForm from "../../hooks/useForm";
import { CHANGE_PASSWORD_VALUES } from "../../constants";
import { validationChangePassword } from "../../helpers/validacionFormChangePassword";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import "./cambiarContraseña.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./iconoPassword.css";
import { useState } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { COMContext } from "../../context/COMContext";

const CambiarContraseña = () => {
  const { user } = useContext(COMContext);

  const enviarDatos = async () => {
    try {
      const changePass = {
        confirmPassword: values.confirmPassword,
        confirmPasswordRepeat: values.confirmPasswordRepeat,
        userName: values.userName,
        password: values.password,
        userId: user._id,
      };

      let respuesta = "";
      if (user.tipoDeUsuario == "admin") {
        respuesta = await axios.put("/users/editPassword", changePass);
      } else
        respuesta = await axios.put("/users/editPassword/users", changePass);

      toast.success(respuesta.data.mensaje);
      setValues(CHANGE_PASSWORD_VALUES);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };
  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    CHANGE_PASSWORD_VALUES,
    enviarDatos,
    validationChangePassword
  );
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword2, setShowPassword2] = useState(false);
  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const [showPassword3, setShowPassword3] = useState(false);
  const handleShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  return (
    <>
      <div className="contenedorPadre">
        <div className="container-fluid contenedorForm">
          <Row>
            <Col xs={12} className="columnaForm">
              <Form onSubmit={handleSubmit} className="formChangePassword">
                {user.tipoDeUsuario == "admin" ? (
                  <Form.Group>
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control
                      maxLength={15}
                      minLength={4}
                      required
                      value={values.userName}
                      onChange={handleChange}
                      name="userName"
                      placeholder="j.alvarez"
                      className="inputBoxPasswordChange mb-3"
                    />
                  </Form.Group>
                ) : (
                  <Form.Group>
                    <Form.Label>Contraseña anterior</Form.Label>
                    <Form.Control
                      maxLength={30}
                      minLength={8}
                      required
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña anterior"
                      className="inputBoxPasswordChange"
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      onClick={handleShowPassword}
                      className="icono-password-2"
                    />
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label>Contraseña nueva</Form.Label>
                  <Form.Control
                    maxLength={30}
                    minLength={8}
                    required
                    value={values.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Contraseña nueva"
                    className="inputBoxPasswordChange"
                  />
                  <FontAwesomeIcon
                    icon={showPassword2 ? faEye : faEyeSlash}
                    onClick={handleShowPassword2}
                    className="icono-password-2"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    maxLength={30}
                    minLength={8}
                    required
                    value={values.confirmPasswordRepeat}
                    onChange={handleChange}
                    name="confirmPasswordRepeat"
                    type={showPassword3 ? "text" : "password"}
                    placeholder="Confirmar nueva"
                    className="inputBoxPasswordChange"
                  />
                  <FontAwesomeIcon
                    icon={showPassword3 ? faEye : faEyeSlash}
                    onClick={handleShowPassword3}
                    className="icono-password-3"
                  />
                </Form.Group>
                <button
                  className="mt-3 col-6 mb-3 btn btn-primary boton-confirmar"
                  size="lg"
                  type="submit"
                >
                  Confirmar
                </button>
                {/* <ButtonConfirm title="Confirmar" /> */}
              </Form>
              {/* <div className="alertaError"> */}
              {Object.keys(errors).length !== 0 &&
                Object.values(errors).map((error, index) => (
                  <Alert variant="danger" key={index}>
                    {error}
                  </Alert>
                ))}
              {/* </div> */}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CambiarContraseña;
