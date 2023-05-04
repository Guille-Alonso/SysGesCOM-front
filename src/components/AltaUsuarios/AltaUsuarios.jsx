import { Form, Button, Alert } from "react-bootstrap";
import "./altaUsuarios.css";
import useForm from "../../hooks/useForm";
import { REGISTER_ALTA_USUARIOS_VALUES } from "../../constants";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import { validationAltaUsuario } from "../../helpers/validationsAltaUsuario";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const AltaUsuarios = () => {
  const agregarUsuario = async () => {
    try {
      console.log(values);
      const respuesta = await axios.post("/users/alta", values);
      setValues(REGISTER_ALTA_USUARIOS_VALUES);
      toast.success("Usuario registrado con éxito");
    } catch (error) {
      console.log(values);
      console.log("Error al enviar los datos. Intente nuevamente más tarde.");
      toast.error(error.message);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    REGISTER_ALTA_USUARIOS_VALUES,
    agregarUsuario,
    validationAltaUsuario
  );

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showPassword2, setShowPassword2] = useState(false);
  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const generateUserName = (nombreCompleto) => {
    if (nombreCompleto !== "") {

      const names = nombreCompleto.trim().split(" ");
      const initials = names.slice(0, -1).map((name) => name[0]).join("") + ".";
      const lastName = names[names.length - 1];
      const userName = `${initials}${lastName}`;

      return userName.toLowerCase();
    }else{
      const userName = "";
    }
  };

  const [nombreCompleto, setNombreCompleto] = useState("");

  useEffect(() => {
    const userName = generateUserName(nombreCompleto);
    
    setValues((prevValues) => ({ ...prevValues, userName }));
  },
    [nombreCompleto, setValues]
  );

  const handleNombreCompletoBlur = (event) => {
    const { value } = event.target;
    setNombreCompleto(value);
  };

  return (
    <>
      <div className="contenedorPadre">
        <div className="contenedorAltaUsuarios">
          <Form className="formAltaUsuarios" onSubmit={handleSubmit}>
            <div className="conteAltaUsuarios col-md-12">
              <Form.Group className="inputBoxAltaUsuarios col-md-6">
                <Form.Label>Nombre de Usuario</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  onChange={handleChange}
                  onBlur={handleNombreCompletoBlur}
                  value={values.name}
                  name="name"
                  maxLength={40}
                  minLength={4}
                  required
                />
              </Form.Group>

              <Form.Group className="inputBoxAltaUsuarios col-md-6">
                <Form.Label>Usuario</Form.Label>

                <Form.Control
                  type="text"
                  readOnly
                  placeholder="Ingrese el usuario"
                  onChange={handleChange}
                  value={values.userName}
                  name="userName"
                  maxLength={30}
                  minLength={4}
                  required
                />
              </Form.Group>
            </div>

            <Form.Group className="inputBoxAltaUsuarios">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                onChange={handleChange}
                value={values.email}
                name="email"
                maxLength={25}
                minLength={4}
                required
              />
            </Form.Group>

            <Form.Group className="inputBoxAltaUsuariosPassword">
              <Form.Label>Contraseña</Form.Label>

              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                onChange={handleChange}
                value={values.password}
                name="password"
                maxLength={25}
                minLength={4}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={handleShowPassword}
                className="icono-password"
              />
            </Form.Group>

            <Form.Group className="inputBoxAltaUsuariosPassword">
              <Form.Label>Confirmar contraseña</Form.Label>

              <Form.Control
                type={showPassword2 ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                onChange={handleChange}
                value={values.repeatPassword}
                name="repeatPassword"
                maxLength={25}
                minLength={4}
                required
              />
              <FontAwesomeIcon
                icon={showPassword2 ? faEye : faEyeSlash}
                onClick={handleShowPassword2}
                className="icono-password-2"
              />
            </Form.Group>

            <Form.Group className="inputBoxAltaUsuarios">
              <Form.Label>Perfil de usuario</Form.Label>

              <Form.Select
                className="perfilAltaUsuarios"
                onChange={handleChange}
                value={values.perfilAltaUsuarios}
                name="perfilAltaUsuarios"
                required
              >
                <option value="">
                  ------------------Seleccionar-----------------
                </option>
                <option>admin</option>
                <option>estadística</option>
                <option>supervisor</option>
                <option>visualizador</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="inputBoxAltaUsuarios">
              <Form.Label>Fotografía</Form.Label>

              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleChange}
                value={values.photo}
                name="photo"
              />
            </Form.Group>

            <Button className="btnAltaUsuarios" variant="success" type="submit">
              Registrar
            </Button>
          </Form>
        </div>

        <div className="alertasAltaUsuario">
          {Object.keys(errors).length !== 0 &&
            Object.values(errors).map((error, index) => (
              // toast.error(error)
              <Alert variant="danger" className="mt-3" key={index}>
                {error}
              </Alert>
            ))}
        </div>
      </div>
    </>
  );
};

export default AltaUsuarios;
