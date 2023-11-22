import React, { useState } from "react";
import "./Footer.css";
import foto from "../../../assets/LarryTheBird.png";

const Footer = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };
  const handleClick2 = () => {
    setCounter(counter == 0);
  };

  if (counter == 20) {
    return (
      <>
        <div className="modalEaster">
          <div className="socalo flex-column h-100">
            <button
              className="btn btn-close botonCerrar"
              onClick={handleClick2}
            ></button>
            <img src={foto} alt="" />
            <h5 className="mensaje">
              Hola, encontraste un easter egg del sistema de gestión. Un saludo
              de parte del equipo de Programación
            </h5>
          </div>
        </div>
      </>
    );
  }

  return (
    <footer className="footer1">
      <div className="movFooter d-flex flex-row gap-1">
        <p>©2023 Equipo de Desarrollo</p>
        <p onClick={handleClick}>COM</p>
        {counter == 0 || counter == 1 ? (
          <></>
        ) : (
          <p className="position-absolute bottom-0">{counter}</p>
        )}
      </div>
    </footer>
  );
};

export default Footer;