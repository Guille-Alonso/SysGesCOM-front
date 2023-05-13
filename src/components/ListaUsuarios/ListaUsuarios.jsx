import React, { useState } from "react";
import "./ListaUsuarios.css";
import UsuarioCard from "./UsuarioCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import UsuarioCardBig from "./UsuarioCardBig";

const ListaUsuarios = () => {
  const handleChange = () => {};
  const users = [
    { name: "Tobias", rol: "admin" },
    { name: "Pedro", rol: "admin" },
    { name: "Guillermo", rol: "admin" },
    { name: "Walter", rol: "admin" },
  ];

  return (
    <>
      <header className="contenedorBusqueda">
        <input type="text" className="buscador" onChange={handleChange} />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="iconoBusquedaUserList"
          //   hacer funcion de busqueda en el icono
        />
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
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Navigation, Pagination]}
          className="swiper-container"
        >
          {users.map((user, index) => (
            <SwiperSlide>
              <UsuarioCard name={user.name} rol={user.rol}></UsuarioCard>
              <UsuarioCardBig />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow"></div>
          <div className="swiper-button-next slider-arrow"></div>
          <div className="swiper-pagination"></div>
        </div>
      </section>
    </>
  );
};

export default ListaUsuarios;
