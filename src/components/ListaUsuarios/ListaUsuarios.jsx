import React, { useEffect, useState } from "react";
import "./ListaUsuarios.css";
import UsuarioCard from "./UsuarioCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination } from "swiper";
import UsuarioCardBig from "./UsuarioCardBig";
import useGet from "../../hooks/useGet";
import axios from "../../config/axios";
import EditarUsuarios from "../EditarUsuarios/EditarUsuarios";
import GeneralModal from "../common/GeneralModal/GeneralModal";

const ListaUsuarios = () => {
  const [startIndex, setStartIndex] = useState(0); // Índice de inicio para la solicitud al backend
  const [cardsToShow, setCardsToShow] = useState(5); // Número de cards a mostrar por vez
  const [users, loading, getUsers] = useGet("/users/email", axios);
  const [buscador, setBuscador] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]); // Usuarios filtrados
  const [paginas, setPaginas] = useState(1);
  const [numerosDePagina, setNumerosDePagina] = useState(0);

  const handleChange = (e) => {
    setBuscador(e.target.value);
    setStartIndex(0);
  };

  useEffect(() => {
    if (Array.isArray(users.users)) {
      const results = users.users.filter(
        (user) =>
          user.nombre.toLowerCase().includes(buscador.toLowerCase()) ||
          user.tipoDeUsuario.toLowerCase().includes(buscador.toLowerCase())
      );
      console.log(users.users);
      setFilteredUsers(results);
    }
  }, [buscador, users.users]);

  const handleNextSlide = () => {
    if (startIndex + cardsToShow < filteredUsers.length) {
      setStartIndex(startIndex + cardsToShow);
    }
    if (paginas == numerosDePagina) return;
    setPaginas(paginas + 1);
  };

  const handlePrevSlide = () => {
    if (startIndex - cardsToShow >= 0) {
      setStartIndex(startIndex - cardsToShow);
    }
    if (paginas == 1) return;
    setPaginas(paginas - 1);
  };

  const renderUsuarios = () => {
    let slicedUsers = filteredUsers.slice(startIndex, startIndex + cardsToShow);
    return slicedUsers.map((user, index) => (
      <SwiperSlide key={index}>
        <UsuarioCard user={user} />
        {/* <UsuarioCardBig user={user} getUsers={getUsers} /> */}
        <GeneralModal
            buttonText='Ver mas'
            modalTitle={'Editar Usuario'}
            modalBody={<EditarUsuarios user={user} getUsers={getUsers}/>}
            variant="botonVerMas"
            />
      </SwiperSlide>
    ));
  };

  useEffect(() => {
    if (Array.isArray(users.users)) {
      const numeroUser = users.users.length;
      const numerosDePagina = Math.ceil(numeroUser / cardsToShow);
      setNumerosDePagina(numerosDePagina);
      console.log(numeroUser);
    }
  }, [users.users, cardsToShow]);

  return (
    <>
      <header className="contenedorBusqueda">
        <input
          type="text"
          className="buscador"
          value={buscador}
          onChange={handleChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="iconoBusquedaUserList"
        />
        <div className="paginationCards">
          {paginas} de {numerosDePagina}
        </div>
      </header>
      <section className="usuariosSection">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={false}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 5,
            stretch: 200,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="swiper-container"
          initialSlide={2}
        >
          {renderUsuarios()}
          <div className="swiper-pagination"></div>
        </Swiper>
        <div className="slider-controler">
          <div className="swiper-button-prev " onClick={handlePrevSlide}></div>
          <div className="swiper-button-next " onClick={handleNextSlide}></div>
          <div className="swiper-pagination"></div>
        </div>
      </section>
    </>
  );
};

export default ListaUsuarios;
