import React, { useState } from 'react';

export function Header() {
    // Estado para gestionar si el menú está abierto o cerrado en móvil
    const [isOpen, setIsOpen] = useState(false);

    // Funciones para alternar estado
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="header">
            <div className="container nav-container">
                {/* Logotipo */}
                <a href="#inicio" className="logo">ISoft<span>3D</span></a>

                {/* Menú de Navegación */}
                <nav className={`nav-links ${isOpen ? 'active' : ''}`} id="navMenu">
                    <a href="#inicio" className="nav-link" onClick={closeMenu}>Inicio</a>
                    <a href="#proyectos" className="nav-link" onClick={closeMenu}>Proyectos 3D</a>
                    <a href="#servicios" className="nav-link" onClick={closeMenu}>Servicios</a>
                    <a href="#comentarios" className="nav-link" onClick={closeMenu}>Testimonios</a>
                    <a href="#contacto" className="nav-link btn-cta-nav" onClick={closeMenu}>Cotizar</a>
                </nav>

                {/* Botón Hamburguesa */}
                <button 
                    className={`menu-toggle ${isOpen ? 'active' : ''}`} 
                    id="menuToggle" 
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}