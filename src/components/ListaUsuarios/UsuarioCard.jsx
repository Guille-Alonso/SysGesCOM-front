import React, { useState } from "react";
import "./UsuarioCard.css";
import Card from "react-bootstrap/Card";

const UsuarioCard = ({ user }) => {
  return (
    <div className="usuarioCard">
      <img
        variant="top"
        src={
          user.foto !== undefined && user.foto !== ""
            ? user.foto
            : "https://us.123rf.com/450wm/hugok1000/hugok10001905/hugok1000190500198/123291745-ilustraci%C3%B3n-de-avatar-de-perfil-predeterminado-en-azul-y-blanco-sin-persona.jpg"
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
