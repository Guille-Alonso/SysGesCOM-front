import React, { useRef, useEffect } from 'react';
import './navBar.css'

const Navbar = () => {
	const markerRef = useRef(null);

	const handleIndicator = (e) => {
		markerRef.current.style.left = `${e.offsetLeft}px`;
		markerRef.current.style.width = `${e.offsetWidth}px`;
	};

	useEffect(() => {
		const item = document.querySelectorAll('ul.lista li a');
		item.forEach((link) => {
			link.addEventListener('mousemove', (e) => {
				handleIndicator(e.target);
			});
		});
	}, []);

	return (
		<>
			<header className='headerContainer'>
				<div className='container1'>
					<input type="checkbox" id='menu'/>
					<label htmlFor="menu">
						<img className='icono'  src="src/assets/menu.png"/>
					</label>
					<ul className='lista'>
						<li>
							<a href="#">Inicio</a>
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
						<div ref={markerRef} id="marker"></div>
					</ul>
				</div>
			</header>
		</>
	);
};

export default Navbar;