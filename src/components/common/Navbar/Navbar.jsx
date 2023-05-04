import React, { useRef, useEffect, useState } from 'react';
import './navBar.css';

const Navbar = () => {
	const markerRef = useRef(null);
	const [isIndicatorVisible, setIsIndicatorVisible] = useState(false);
	const [listOffset, setListOffset] = useState(0);

	const handleIndicator = (e) => {
		const li = e.closest('li');
		if (li) {
			const liOffset = li.offsetLeft;
			const liWidth = li.offsetWidth;
			if (markerRef.current) {
				markerRef.current.style.left = `${liOffset + listOffset}px`;
				markerRef.current.style.width = `${liWidth}px`;
			}
		}
	};

	const handleMouseLeave = () => {
		setIsIndicatorVisible(false);
	};

	useEffect(() => {
		const lista = document.querySelector('ul.lista');
		if (lista) {
			const item = lista.querySelectorAll('li a');
			item.forEach((link) => {
				link.addEventListener('mousemove', (e) => {
					setIsIndicatorVisible(true);
					handleIndicator(e.target);
				});
			});
			setListOffset(lista.offsetLeft);
		}
	}, []);

	return (
		<>
			<header className="headerContainer">
				<div className="container1">
					<img src="src\assets\img\logo_comm_marca_de_agua.png" className='logoCOM' />
					<ul className="lista fixed-top" onMouseLeave={handleMouseLeave}>
						<li>
							<a href="#">Inicio</a>
							{isIndicatorVisible && <div ref={markerRef} id="marker"></div>}
						</li>
						<li>
							<a href="#">Nosotros</a>
						</li>
						<li>
							<a href="#">Servicios</a>
						</li>
						<li>
							<a href="#">Contacto</a>
						</li>
						<li>
							<a href="#">Equipo</a>
						</li>
					</ul>
				</div>
			</header>
		</>
	);
};

export default Navbar;