import React from 'react'
import "./Noticias.css";
import useGet from "../../hooks/useGet";
import axios from '../../config/axios';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import LogoCOMM from '../../assets/SMT Escudo - blanco.png';

const Noticias = () => {
    const [noticias, loading, getNoticias] = useGet("/noticias/listarNoticias", axios);

    const funcionDescarga = async (id) => {
        try {
          // const {data} = await axios.get(`/noticias/listar/${id}`)
          console.log(id)
          const response = await axios.get(
            `http://localhost:4000/noticias/listar/${id}`,
            {
              responseType: "blob", // Especifica el tipo de respuesta como Blob
            }
          );
          console.log(response.data);
          const blob = response.data;
          const url = URL.createObjectURL(blob);
    
          const link = document.createElement("a");
          link.href = url;
          // link.download = `noticia_${id}.pdf`; // Cambiar el nombre del archivo según tus necesidades
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.log(error)
        }
      }
    
    return (
        <div className="noticias">
            <span className='text-center text-light mt-4 mb-4'>Noticias</span>
            <div className='bodyNoticias'>
                <div className="contenidoNoticias mt-1">
                    <div>
                        {
                    loading ? <Spinner variant="ligth " /> :noticias.noticias.map(element => {
                    return (
                        <Link onClick={() => funcionDescarga(element._id)} >{element.titulo}</Link>

                    )})}
                    </div>
                </div>
                    <div className="contenidoAside">
                    <img  src={LogoCOMM} alt="" />
                        {/* <span>Compañeros este mes cobraran menos asi me compro un café.</span>
                        <span>Atte: Nestor El Negro Pinguero </span> */}
                </div>
            </div>
            {/* <div className="footerNoticias">

            </div> */}
        </div>
    )
}

export default Noticias