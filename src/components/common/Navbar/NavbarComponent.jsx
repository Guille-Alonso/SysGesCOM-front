import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navBar.css";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { COMContext } from "../../../context/COMContext";
import logoCOM from "../../../assets/img/logo_comm_marca_de_agua.png";
import fotoPredet from "../../../assets/fotoPredeterminada.png";
import PanelAdmin from "../../PanelAdmin/panelAdmin";

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
  const panelAdmin = () => {
    navigate("/panelAdmin");
  };
  useEffect(() => {
    getAuth();
  }, []);

  const menuItems = [
    { text: "Cámaras", path: "/listar-camaras" },
    { text: "Categorías", path: "/alta-categoria" },
    { text: "Estadísticas", path: "/estadisticas" },
    { text: "Cambios Turno", path: "/cambio-turno" },
    { text: "Relevamiento", path: "/relevamiento-motos" },
    { text: "Reportes", path: "/reportes" },
    { text: "Usuarios", path: "/lista-usuarios" },
    { text: "Tickets", path: "/tickets" },
  ];

  menuItems.sort((a, b) => a.text.localeCompare(b.text));

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <Link key={index} className="ms-3" to={item.path}>
        {item.text}
      </Link>
    ));
  };
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 990);

  const handleResize = () => {
    if(user?.tipoDeUsuario !== "admin" ){
      setIsDesktop(window.innerWidth >= 990);

      if (!isDesktop) {
        setIsNavbarCollapsed(true);
      }
 
    }else{
      setIsDesktop(window.innerWidth >= 1400);

      if (!isDesktop) {
        setIsNavbarCollapsed(true);
      }
    }
   
  };

useEffect(() => {
  getAuth();
}, [])


  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [user]);

  const toggleNavbar = () => {
    if (isDesktop) {
      setIsNavbarCollapsed(!isNavbarCollapsed);
    }
  };

  const toggleDropdown = () => {
    if (isDropdownOpen && isDesktop) {
      // Si ya está abierto en pantalla grande, lo cerramos
      setIsDropdownOpen(false);
    } else {
      // Si no está abierto o si estamos en pantalla pequeña, lo abrimos
      setIsDropdownOpen(true);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand={user?.tipoDeUsuario == "admin" ? "xxl" : "lg"}
      bg=""
      variant="dark"
      className="align-items-center"
    >
      <Container fluid className="mx-4 d-flex">
        <Navbar.Brand
          onClick={home}
          href="#home"
          className="align-content-start "
        >
          <img
            src={logoCOM}
            width="150"
            height="40"
            className="d-inline-block align-top logocom"
            alt="COM Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleNavbar}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={isNavbarCollapsed ? "" : "show"}
        >
          <div className="d-sm-flex ml-auto w-100 contNavBar ">
            <Nav className="my-2 me-auto space-evenly">
              {authenticated &&
                user.tipoDeUsuario == "admin" &&
                renderMenuItems()}
              {authenticated &&
                (user.tipoDeUsuario == "visualizador" ||
                  user.tipoDeUsuario == "supervisor" ||
                  user.tipoDeUsuario == "estadística" ||
                  user.tipoDeUsuario == "administración") && (
                  <Link to="/reportes" className="navBtn" >Reportes</Link>
                )}
              {authenticated && user.tipoDeUsuario == "estadística" && (
                <Link to="/estadisticas" className="navBtn">
                  Estadísticas
                </Link>
              )}
              {authenticated && user.tipoDeUsuario == "estadística" && (
                <Link className="navBtn" to="/alta-categoria">
                  Categorías
                </Link>
              )}
              {authenticated && (user.tipoDeUsuario == "visualizador" ||
                user.tipoDeUsuario == "supervisor" ||
                user.tipoDeUsuario == "administración") && (
                  <Link className="navBtn" to="/cambio-turno">
                    Cambios Turno
                  </Link>
                )}
              {authenticated &&
                (user.relevamientoHabilitado ||
                  user.tipoDeUsuario == "supervisor") && (
                  <Link className=" navBtn " to="/relevamiento-motos">
                    Relevamiento
                  </Link>
                )}
            </Nav>

            {authenticated ? (
              <Nav className={user.tipoDeUsuario=="admin"?"isAdmin":"notAdmin"}>
                <NavDropdown
                  title={!isDesktop ? null : user.nombre}
                  id="collasible-nav-dropdown"
                  className="my-2 profileCard align-content-end"
                  show={!isDesktop || isDropdownOpen}
                  onClick={toggleDropdown}
                >
                  <NavDropdown.Item
                    onClick={userProfile}
                    className="navigation"
                  >
                    <ion-icon
                      name="help-circle-outline"
                      className="icons-drop"
                    ></ion-icon>
                    <strong>{user.tipoDeUsuario.toUpperCase()}</strong>
                  </NavDropdown.Item>

                  <NavDropdown.Divider className="dirverDropDown" />
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
                  {user.tipoDeUsuario == "admin" ||
                  user.tipoDeUsuario == "supervisor" ? (
                    <NavDropdown.Item
                      onClick={panelSupervisor}
                      className="navigation"
                    >
                      <ion-icon
                        name="settings-outline"
                        className="icons-drop"
                      ></ion-icon>
                      Panel Supervisor
                    </NavDropdown.Item>
                  ) : (
                    <></>
                  )}
                  {user.tipoDeUsuario == "admin" ? (
                    <NavDropdown.Item
                      onClick={panelAdmin}
                      className="navigation"
                    >
                      <ion-icon
                        name="settings-outline"
                        className="icons-drop"
                      ></ion-icon>
                      Panel Admin
                    </NavDropdown.Item>
                  ) : (
                    <></>
                  )}
                  <NavDropdown.Divider className="dirverDropDown" />
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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
