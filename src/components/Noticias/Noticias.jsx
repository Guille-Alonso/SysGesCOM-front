import React from 'react'
import "./Noticias.css";

const Noticias = () => {
    return (
        <div className="noticias">
            <span className='text-center text-light mt-4 mb-4'>Noticias</span>
            <div className='bodyNoticias'>
                <div className="contenidoNoticias">
                    <a className="mt-3 circular">🔵 "circular pingo 1.pdf"</a>
                    <a className="mt-3 circular">🔵 "circular pingo 2.pdf"</a>
                    <a className="mt-3 circular">🔵 "circular pingo 3.pdf"</a>
                    <a className="mt-3 circular">🔵 "el picnate se la come"</a>
                    <a className="mt-3 circular">🔵 "circular pingo 4.pdf"</a>
                </div>
                <div className="aside">
                    <div className="contenidoAside">
                        <span>Compañeros este mes cobraran menos asi me compro un café.</span>
                        <span>Atte: Nestor El Negro Pinguero </span>
                    </div>
                </div>
            </div>
            {/* <div className="footerNoticias">

            </div> */}
        </div>
    )
}

export default Noticias