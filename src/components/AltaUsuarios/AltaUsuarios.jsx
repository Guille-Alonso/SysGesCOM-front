import { Form, Button, Alert } from "react-bootstrap";
import "./altaUsuarios.css";
import "./iconoPasswordUsuarios.css";
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
      toast.error(error.response?.data.message || error.message);
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

      const normalizedNombreCompleto = nombreCompleto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const names = normalizedNombreCompleto.trim().split(" ");

      const initials =
        names
          .slice(0, -1)
          .map((name) => name[0])
          .join("") + ".";

      const lastName = names[names.length - 1];

      // Reemplazar caracteres especiales por sus equivalentes sin tilde
      const normalizedLastName = lastName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const userName = `${initials}${normalizedLastName}`;

      return userName.toLowerCase();
    } else {
      const userName = "";
    }
  };

  const [nombreCompleto, setNombreCompleto] = useState("");

  useEffect(() => {
    const userName = generateUserName(nombreCompleto);

    setValues((prevValues) => ({ ...prevValues, userName }));
  }, [nombreCompleto, setValues]);

  const handleNombreCompletoBlur = (event) => {
    const { value } = event.target;
    setNombreCompleto(value);
  };

  const mayoríaDeEdad = () => {
    const fechaActual = new Date();

    const año = fechaActual.getFullYear();
    const mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
    const dia = ("0" + fechaActual.getDate()).slice(-2);

    const fechaFormateada = `${año - 18}-${mes}-${dia}`;

    return fechaFormateada;
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
                  minLength={2}
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
                  maxLength={20}
                  minLength={4}
                  required
                />
              </Form.Group>
            </div>

            <div className="conteAltaUsuarios col-md-12">
              <Form.Group className="inputBoxAltaUsuarios col-md-6">
                <Form.Label>DNI</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Ingrese su DNI"
                  onChange={handleChange}
                  value={values.dni}
                  name="dni"
                  maxLength={8}
                  requireds
                />
              </Form.Group>
              <Form.Group className="inputBoxAltaUsuarios col-md-6">
                <Form.Label>N° de Afiliado</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Ingrese n° de afiliado"
                  onChange={handleChange}
                  value={values.numAfil}
                  name="numAfil"
                  maxLength={5}
                  required
                />
              </Form.Group>
            </div>

            <div className="conteAltaUsuarios col-md-12">
              <Form.Group className="inputBoxAltaUsuarios">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Ingrese su email"
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  maxLength={40}
                  minLength={4}
                  required
                />
              </Form.Group>
              <Form.Group className="inputBoxAltaUsuarios col-md-6">
                <Form.Label>Fecha de Nacimiento</Form.Label>

                <Form.Control
                  type="date"
                  onChange={handleChange}
                  value={values.fechaNac}
                  name="fechaNac"
                  min="1923-01-01"
                  max={mayoríaDeEdad()}
                  required
                />
              </Form.Group>
            </div>

            <div className="conteAltaUsuarios col-md-12">
              <Form.Group className="inputBoxAltaUsuariosPassword">
                <Form.Label>Contraseña</Form.Label>

                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  maxLength={30}
                  minLength={8}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={handleShowPassword}
                  className="iconoUsuarios-1"
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
                  maxLength={30}
                  minLength={8}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword2 ? faEye : faEyeSlash}
                  onClick={handleShowPassword2}
                  className="iconoUsuarios-2"
                />
              </Form.Group>
            </div>
            <Form.Group className="inputBoxAltaUsuarios2">
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
                <option>administración</option>
              </Form.Select>
            </Form.Group>

            <div className="conteAltaUsuarios">
              <Form.Group className="inputBoxFotoAltaUsuarios">
                <Form.Label>Fotografía</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Ingrese una URL"
                  title="Suba una imágen a la nube y copie el vínculo"
                  onChange={handleChange}
                  value={values.photo}
                  name="photo"
                />
              </Form.Group>

              <Form.Group className="inputBoxTurnoAltaUsuarios">
                <Form.Label>Turno</Form.Label>

                <Form.Select
                  className="turno"
                  onChange={handleChange}
                  value={values.turno}
                  name="turno"
                  required
                >
                  <option value="">------------</option>
                  <option value="mañana">mañana (06:00 am - 12:00 am)</option>
                  <option value="intermedio">intermedio (12:00 am - 18:00 pm)</option>
                  <option value="tarde">tarde (18:00 pm - 00:00 am)</option>
                  <option value="noche">noche (00:00 am - 06:00 am)</option>
                </Form.Select>
              </Form.Group>
            </div>

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
