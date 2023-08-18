import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navBar.css";
import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { COMContext } from "../../../context/COMContext";
import logoCOM from "../../../assets/img/logo_comm_marca_de_agua.png";
import fotoPredet from "../../../assets/fotoPredeterminada.png";

function NavbarComponent() {
  const {
    authenticated,
    setAuthenticated,
    loading,
    user,
    getAuth,
    setBuscador,
    setPaginacion,
  } = useContext(COMContext);

  const navigate = useNavigate();
  const location = useLocation();

  const logOut = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    setBuscador("");
    setPaginacion(1);
    navigate("/login");
  };

  const settings = () => {
    navigate("/cambiar-contraseña");
  };
  const notificaciones = () => {
    navigate("/notificaciones");
  };

  const panelSupervisor = () => {
    navigate("/relevamiento-motos-panel");
  };

  const userProfile = () => {
    navigate("/perfil-usuario");
  };

  const home = () => {
    navigate("/home");
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="" variant="dark">
      <Container fluid className="mx-4">
        <Navbar.Brand
          onClick={home}
          href="#home"
          className="align-content-start"
        >
          <img
            src={logoCOM}
            width="150"
            height="40"
            className="d-inline-block align-top logocom"
            alt="COM Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {authenticated && user.tipoDeUsuario == "admin" && (
              <>
                <Link className="ms-3" to="/lista-usuarios">
                  Usuarios
                </Link>

                <Link className="ms-3" to="/listar-camaras">
                  Cámaras
                </Link>

                <Link className="ms-3" to="/alta-categoria">
                  Categorías
                </Link>

                <Link className="ms-3" to="/reportes">
                  Reportes
                </Link>
              
                <Link className="ms-3" to="/relevamiento-motos">
                  Relevamiento
                </Link>
              
              </>
            )}
            {authenticated &&
              (user.tipoDeUsuario == "visualizador" ||
                user.tipoDeUsuario == "supervisor" ||
                user.tipoDeUsuario == "estadística" ||
                user.tipoDeUsuario == "administración") && (
                <Link to="/reportes">Reportes</Link>
              )}
            {authenticated &&
              (user.tipoDeUsuario == "estadística" ||
                user.tipoDeUsuario == "admin") && (
                <Link to="/estadisticas" className="ms-3">
                  Estadísticas
                </Link>
              )}
            {authenticated && user.tipoDeUsuario == "estadística" && (
              <Link className="ms-3" to="/alta-categoria">
                Categorías
              </Link>
            )}
            {authenticated &&
              (user.tipoDeUsuario !== "estadística") && (
                <Link className="ms-3" to="/cambio-turno">
                  Cambios Turno
                </Link>
              )}
            {authenticated &&
              (user.relevamientoHabilitado || user.tipoDeUsuario == "supervisor") && (
                <Link className="ms-3" to="/relevamiento-motos">
                  Relevamiento
                </Link>
              )}

          </Nav>

          {authenticated ? (
            <Nav>
              <NavDropdown
                title={user.nombre}
                id="collasible-nav-dropdown"
                className="my-2 profileCard align-content-end"
              >
                <NavDropdown.Item onClick={userProfile} className="navigation">
                  <ion-icon
                    name="help-circle-outline"
                    className="icons-drop"
                  ></ion-icon>
                  <strong>{user.tipoDeUsuario.toUpperCase()}</strong>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {/* {user.tipoDeUsuario == "admin" && ( */}
                <NavDropdown.Item onClick={settings} className="navigation">
                  <ion-icon
                    name="person-outline"
                    className="icons-drop"
                  ></ion-icon>
                  Editar Contraseña
                </NavDropdown.Item>
                {/* )} */}

                <NavDropdown.Item
                  onClick={notificaciones}
                  className="navigation"
                >
                  <ion-icon
                    name="notifications-outline"
                    className="icons-drop"
                  ></ion-icon>
                  Notificaciones
                </NavDropdown.Item>
                <NavDropdown.Item onClick={panelSupervisor} className="navigation">
                  <ion-icon
                    name="settings-outline"
                    className="icons-drop"
                  ></ion-icon>
                  Opciones
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut} className="navigation">
                  <ion-icon
                    name="log-out-outline"
                    className="icons-drop"
                  ></ion-icon>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
              <Nav>
                <img
                  src={
                    user.foto !== undefined && user.foto !== ""
                      ? user.foto
                      : fotoPredet
                  }
                  alt="User profile"
                  className="ms-3 userProfile"
                />
              </Nav>
            </Nav>
          ) : (
            <></>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
