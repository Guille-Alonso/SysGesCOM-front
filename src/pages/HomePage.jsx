import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Spinner } from "react-bootstrap";
import LeaderboardReportes from "../components/LeaderboardReportes/LeaderboardReportes";
import useGet from "../hooks/useGet";
import axios from "../config/axios";
import CardCambios from "../components/CardCambio/CardCambios";
import { getDate, getMonth, parseISO } from "date-fns";
import { COMContext } from "../context/COMContext";
import Confetti from "react-confetti";
import { ReactFloatingBalloons } from "react-floating-balloons";
import ModalPodio from "../components/ModalPodio/ModalPodio";
import Dashboard from "../components/DashboardHome/Dashboard";
import GifCard from "../components/GifCard/GifCard";
import { axiosGiphy, axiosGiphySearch } from "../config/axiosGiphy";
import { toast } from "react-toastify";

const HomePage = () => {
  const [reportes, loading] = useGet("/reportes/podio", axios);
  const [tipoPodio, setTipoPodio] = useState("general");

  const { user } = useContext(COMContext);
  
  const [gifs, loadingGifs] = user.tipoDeUsuario!=="supervisor" || user.tipoDeUsuario!=="visualizador" ? useGet(`/emoji?api_key=${import.meta.env.VITE_APP_GIPHY_API_KEY}&limit=6`, axiosGiphy):[];

  function obtenerPeriodoDelDiaConHora(fecha) {
    const horaActual = fecha.getHours();
    
    if (horaActual >= 7 && horaActual < 15) {
      return "mañana";
    } else if (horaActual >= 15 && horaActual < 23) {
      return "tarde";
    } else {
      return "noche";
    }
  }
  
  const [reportesTurno, loadingTurno] = useGet(
    `/reportes/podio/${obtenerPeriodoDelDiaConHora(new Date())}`,
    axios
    );
    
  const nacimientoDate = parseISO(user.nacimiento);
  const today = new Date();

  const isBirthday =
    getMonth(nacimientoDate) === getMonth(today) &&
    getDate(nacimientoDate) === getDate(today);

  const [showBalloons, setShowBalloons] = useState(isBirthday);
  useEffect(() => {
    if (isBirthday) {
      const hideBalloonsTimer = setTimeout(() => {
        setShowBalloons(false);
      }, 18000);

      return () => {
        clearTimeout(hideBalloonsTimer);
      };
    }
  }, [isBirthday]);

  //GIPHY
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false);

  const doSearch = async()=>{
    try {
      const {data} = await axiosGiphySearch.get(`/gifs/search?api_key=${import.meta.env.VITE_APP_GIPHY_API_KEY}&q=${search}&limit=6&rating=g`);
      setResults(data.data);
      setIsSearching(false);
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChangeGiphy = (e)=>{
    setSearch(e.target.value);
    setIsSearching(true);
  }
  
  useEffect(()=>{
    if(isSearching){
      doSearch()
    }
},[search])

  return (
    <div className="layoutHeight">
      <div className="d-flex justify-content-around contenedorHome">
        <main className={user.tipoDeUsuario=="visualizador" || user.tipoDeUsuario=="supervisor" ?"estadisticas":"giphyApi"}>
          
          <div>
            {user.tipoDeUsuario == "supervisor" ||
            user.tipoDeUsuario == "visualizador" ? (
              <Dashboard />
            ) : (
              <div>
              
                {loadingGifs?
                <Spinner className="mt-3" variant="light"/>
                :
                <div>
                  <div className="mb-1">
                  <label className="ms-2">Buscar :</label>
                  <input type="text" value={search} className='ms-2' onChange={handleChangeGiphy} />
                  </div>
                <div className="d-flex flex-wrap">
                  {
                       results.length!==0?
                       <div className="d-flex flex-wrap">
                         {
                           results.map((result,index)=> <GifCard key={index} image={result.images.original.url} title={result.title}/>)
                         }
                       </div> 
                       : gifs.map((result,index)=> <GifCard key={index} image={result.images.original.url} title={result.title}/>)
                  }

                </div>
                </div>
                }
              </div>
            )}
            {loading ? (
              <Spinner className="mt-3 d-none" />
            ) : user.noticias || user.noticias == null ? (
              <ModalPodio reportes={reportes} />
            ) : (
              <></>
            )}
          </div>
        </main>
        <aside className="contenedorCambios">
          <select
            className="selectPodio mt-2"
            onChange={(e) => setTipoPodio(e.target.value)}
            value={tipoPodio}
            disabled={loading ? true : false}
          >
            <option value="general">General</option>
            <option value="turno">Mi Turno</option>
          </select>

          {loading ? (
            <Spinner className="mt-3" variant="light" />
          ) : (
            tipoPodio == "general" && (
              <LeaderboardReportes reportes={reportes} />
            )
          )}

          {tipoPodio == "turno" && (
            <LeaderboardReportes reportes={reportesTurno} />
          )}
          <div className="mt-3">
            <CardCambios />
          </div>
        </aside>
      </div>
      <div className="d-flex justify-content-around mt-5">
        <section className="w-50 text-center"></section>
      </div>
      {getMonth(nacimientoDate) === getMonth(today) &&
        getDate(nacimientoDate) === getDate(today) && (
          <>
            <Confetti
              className="confettiCumple"
              numberOfPieces={500}
              gravity={0.1}
              wind={0.01}
              initialVelocityX={1}
              initialVelocityY={10}
            />
          </>
        )}
      {showBalloons && (
        <>
          <ReactFloatingBalloons
            className="globosFC"
            count={10}
            msgText={`Feliz Cumple !! ${user.nombre}`}
            colors={["yellow", "green", "blue", "red", "orange", "purple"]}
            style={{ transition: "opacity 1s", opacity: showBalloons ? 1 : 0 }}
            loop={false}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
