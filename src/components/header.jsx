export function Header() {
    return (
        <header className="header">
            <div className="container nav-container">
                <a href="#" className="logo">ISoft<span>3D</span></a>
                <nav className="nav-menu" id="navMenu">
                    <a href="#inicio" className="nav-link">Inicio</a>
                    <a href="#proyectos" className="nav-link">Proyectos 3D</a>
                    <a href="#servicios" className="nav-link">Servicios</a>
                    <a href="#comentarios" className="nav-link">Testimonios</a>
                    <a href="#contacto" className="nav-link btn-cta-nav">Cotizar</a>
                </nav>
                <button className="menu-toggle" id="menuToggle" aria-label="Abrir menú">☰</button>
            </div>
        </header>
    );
}