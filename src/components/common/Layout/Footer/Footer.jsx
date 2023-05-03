import React from 'react'
import './Footer.css'

const Footer = () => {
	return (
		<footer className="footer1">
			<div className="movFooter">
				<div className="waves">
					<div className="wave" id="wave1"></div>
					<div className="wave" id="wave2"></div>
					<div className="wave" id="wave3"></div>
					<div className="wave" id="wave4"></div>
				</div>
				<ul className="socialIcon">
					<li>
						<a href="">
							<ion-icon name="logo-facebook"></ion-icon>
						</a>
					</li>
					<li>
						<a href="">
							<ion-icon name="logo-twitter"></ion-icon>
						</a>
					</li>
					<li>
						<a href="">
							<ion-icon name="logo-twitch"></ion-icon>
						</a>
					</li>
					<li>
						<a href="">
							<ion-icon name="logo-facebook"></ion-icon>
						</a>
					</li>
				</ul>
				<ul className="menuFooter">
					<li>
						<a href="">Inicio</a>
					</li>
					<li>
						<a href="">Nosotros</a>
					</li>
					<li>
						<a href="">Servicios</a>
					</li>
					<li>
						<a href="">Contacto</a>
					</li>
					<li>
						<a href="">Equipo</a>
					</li>
				</ul>
				<p>©2023 Equipo de Desarrollo COM</p>
			</div>
		</footer>
	);
};

export default Footer;