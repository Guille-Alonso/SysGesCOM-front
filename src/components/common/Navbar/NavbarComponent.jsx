import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./navBar.css"
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COMContext } from '../../../context/COMContext';

function NavbarComponent() {
	const { authenticated, setAuthenticated, loading, user, getAuth } = useContext(COMContext);

  const navigate = useNavigate();

	const logOut = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate('/login')
  };

const settings = () => {
  navigate("/cambiar-contraseña");
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
            src="src\assets\img\logo_comm_marca_de_agua.png"
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
              <Nav.Link>
                <Link to="/lista-usuarios">Usuarios</Link>
              </Nav.Link>
               <Nav.Link>
               <Link to="/listar-camaras">Cámaras</Link>
             </Nav.Link>
             <Nav.Link>
               <Link to="/alta-categoria">Categorías</Link>
             </Nav.Link>
             </>
            )}           
          </Nav>
    
          {authenticated? (
            <Nav>
              <Nav>
                <img
                  src={user.foto}
                  alt="User profile"
                  className="userProfile"
                />
              </Nav>

              <NavDropdown
                title={user.nombre}
                id="collasible-nav-dropdown"
                className="my-2 profileCard align-content-end"
              >
                {user.tipoDeUsuario == "admin" && (
                  <NavDropdown.Item onClick={settings} className="navigation">
                    <ion-icon
                      name="person-outline"
                      className="icons-drop"
                    ></ion-icon>
                    Editar Perfil
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item href="#" className="navigation">
                  <ion-icon
                    name="notifications-outline"
                    className="icons-drop"
                  ></ion-icon>
                  Notificaciones
                </NavDropdown.Item>
                <NavDropdown.Item href="#" className="navigation">
                  <ion-icon
                    name="settings-outline"
                    className="icons-drop"
                  ></ion-icon>
                  Opciones
                </NavDropdown.Item>
                <NavDropdown.Item href="#" className="navigation">
                  <ion-icon
                    name="help-circle-outline"
                    className="icons-drop"
                  ></ion-icon>
                  Ayuda
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
            </Nav>)
             :
             <Nav.Link>
              <Link to="/login">Iniciar Sesión</Link>
            </Nav.Link>  
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;