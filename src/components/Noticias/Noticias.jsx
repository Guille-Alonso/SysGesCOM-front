import React from 'react'
import "./Noticias.css";
import useGet from "../../hooks/useGet";
import axios from '../../config/axios';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import LogoCOMM from '../../assets/SMT Escudo - blanco.png';
import { toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const Noticias = () => {
  const [noticias, loading, getNoticias] = useGet("/noticias/listarNoticias", axios);

    const funcionDescarga = async (obj) => {
        try {
         
          const response = await axios.get(
            `http://10.0.0.230:4000/noticias/listar/${obj._id}`,
            {
              responseType: "blob", // Especifica el tipo de respuesta como Blob
            }
          );
          
          const blob = response.data;
          const url = URL.createObjectURL(blob);
    
          const link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.href = url;
          if(!blob.type.includes("image") && !blob.type.includes('application/pdf')){

            link.download = obj.titulo;
          }
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          toast.error("Error en la conexión");
        }
  }

  return (
    <div className="noticias">
      <span className='text-center text-light mt-4 mb-4'>Noticias</span>
      <div className='bodyNoticias'>
        <div className="contenidoNoticias mt-1">
          <div className='w-100'>
            {
                          loading ? 
                  // <Spinner variant="ligth " /> 
            <>
              <SkeletonTheme  height="20px" baseColor="#202020" highlightColor="blue">
                <Skeleton />
              </SkeletonTheme>
              <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                <Skeleton />
              </SkeletonTheme>
              <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                <Skeleton />
              </SkeletonTheme>
              <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                <Skeleton />
              </SkeletonTheme>
              <SkeletonTheme height="20px" baseColor="#202020" highlightColor="blue">
                <Skeleton />
              </SkeletonTheme>
            </>
            :noticias.noticias.map(element => {
                    return (
                        <Link className='linkNoticia ' onClick={() => funcionDescarga(element)} >{element.titulo}</Link>

                    )})}
          </div>
        </div>
        <div className="contenidoAside">
          <img src={LogoCOMM} alt="" />
        </div>
      </div>
 
    </div>
  )
}

export default Noticias