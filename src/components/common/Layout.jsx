import Footer from "./Footer/Footer";
import NavbarComponent from "./Navbar/NavbarComponent";

const Layout = ({ children }) => {
  return (
    <>
      <NavbarComponent />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
