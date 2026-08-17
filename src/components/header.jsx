/* ==========================================================================
   GLOSARIO DE ÍNDICES COMPONENTE HEADER
   ==========================================================================
   [H-01] Importaciones y Definición del Componente Header con Estado
   [H-02] Estructura Principal del Contenedor de Navegación y Logotipo
   [H-03] Menú de Enlaces Interactivos con Cierre Automático al Hacer Clic
   [H-04] Botón Hamburguesa Interactivo para Dispositivos Móviles
   ========================================================================== */

/* [H-01] Importaciones y Definición del Componente Header con Estado */
import React, { useState } from 'react';

export function Header() {
    // Estado para controlar la apertura y cierre del menú móvil
    const [isOpen, setIsOpen] = useState(false);

    // Funciones para alternar o cerrar el menú al interactuar
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="header">
            {/* [H-02] Estructura Principal del Contenedor de Navegación y Logotipo */}
            <div className="container nav-container">
                <a href="#inicio" className="logo">ISoft<span>3D</span></a>

                {/* [H-03] Menú de Enlaces Interactivos con Cierre Automático al Hacer Clic */}
                <nav className={`nav-menu ${isOpen ? 'active' : ''}`} id="navMenu">
                    <a href="#inicio" className="nav-link" onClick={closeMenu}>Inicio</a>
                    <a href="#proyectos" className="nav-link" onClick={closeMenu}>Proyectos 3D</a>
                    <a href="#servicios" className="nav-link" onClick={closeMenu}>Servicios</a>
                    <a href="#comentarios" className="nav-link" onClick={closeMenu}>Testimonios</a>
                    <a href="#contacto" className="nav-link btn-cta-nav" onClick={closeMenu}>Cotizar</a>
                </nav>

                {/* [H-04] Botón Hamburguesa Interactivo para Dispositivos Móviles */}
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