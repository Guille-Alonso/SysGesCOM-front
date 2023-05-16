import React, { useEffect, useState } from "react";
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
import useGet from "../../hooks/useGet";
import axios from "../../config/axios";

const ListaUsuarios = () => {
  const [users, loading] = useGet("/users/email", axios);
  const [buscador, setBuscador] = useState("");
  const [ResultadoBusqueda, setResultadoBusqueda] = useState([]);
  const handleChange = (e) => {
    setBuscador(e.target.value);
  };
  useEffect(() => {
    if (Array.isArray(users.users)) {
      const results = users.users.filter(
        (user) =>
          user.nombre.toLowerCase().includes(buscador.toLowerCase()) ||
          user.tipoDeUsuario.toLowerCase().includes(buscador.toLowerCase())
      );
      setResultadoBusqueda(results);
    }
  }, [buscador]);

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
          {ResultadoBusqueda.length == 0 &&
            !loading &&
            users.users.map((user, index) => (
              <SwiperSlide>
                <UsuarioCard user={user}></UsuarioCard>
                <UsuarioCardBig user={user} />
              </SwiperSlide>
            ))}
          {ResultadoBusqueda.length > 0 &&
            ResultadoBusqueda.map((user, index) => (
              <SwiperSlide>
                <UsuarioCard user={user}></UsuarioCard>
                <UsuarioCardBig user={user} />
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
