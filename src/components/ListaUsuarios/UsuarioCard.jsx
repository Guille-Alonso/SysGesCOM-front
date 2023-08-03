import React from "react";
import "./UsuarioCard.css";
import fotoPredet from "../../assets/fotoPredeterminada.png";

const UsuarioCard = ({ user }) => {
  return (
    <div className="usuarioCard">
      <img
        variant="top"
        src={
          user.foto !== undefined && user.foto !== "" ? user.foto : fotoPredet
        }
        className="imgUsuario"
      />
      <div className="infoDeUsuarioCard">
        <p className="nameOfUserPrev">{user.nombre}</p>
        <p className="infoTipoDeUsuario">{user.tipoDeUsuario.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default UsuarioCard;
