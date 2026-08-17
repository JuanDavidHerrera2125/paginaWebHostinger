import React from 'react';
import fondoHeader from '../assets/fondo_header.png';

export function Hero() {
    return (
        <section id="inicio" className="hero" style={{ backgroundImage: `url(${fondoHeader})` }}>
            <div className="container hero-content">
                <h1>Innovación y Modelado <span>3D Profesional</span></h1>
                <p>Llevamos tus ideas al siguiente nivel con tecnología de impresión tridimensional de alta precisión y desarrollo a medida.</p>
                <div className="hero-buttons">
                    <a href="#galeria" className="btn-primary">Ver Catálogo 3D</a>
                    <a href="#cotizador" className="btn-secondary">Cotizar con Archivo</a>
                </div>
            </div>
        </section>
    );
}