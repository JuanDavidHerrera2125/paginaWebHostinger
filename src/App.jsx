import React, { useState } from 'react';
import { Header } from './components/header';
import { Hero } from './components/hero';
import { Footer } from './components/footer';
import './index.css';

export default function App() {
    const [categoriaActiva, setCategoriaActiva] = useState('todos');
    const [archivoSubido, setArchivoSubido] = useState(null);

    const proyectos = [
        { id: 1, categoria: 'coleccion', titulo: 'Figura Coleccionable Anime', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80', desc: 'Impresión de alta definición en resina con acabado manual.' },
        { id: 2, categoria: 'vehiculos', titulo: 'Repuesto Personalizado de Motor', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', desc: 'Piezas mecánicas de alta resistencia térmica.' },
        { id: 3, categoria: 'hospitalarios', titulo: 'Prótesis y Guías Quirúrgicas', img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80', desc: 'Modelado biomédico de precisión estéril.' },
        { id: 4, categoria: 'accesorios', titulo: 'Soportes Tecnológicos a Medida', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80', desc: 'Diseños funcionales optimizados para el hogar y oficina.' },
        { id: 5, categoria: 'coleccion', titulo: 'Bustos Escultóricos Detallados', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', desc: 'Acabados texturizados listos para pintura artística.' },
        { id: 6, categoria: 'vehiculos', titulo: 'Componentes Aero / Tuning', img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80', desc: 'Aerodinámica y estética personalizada.' }
    ];

    const proyectosFiltrados = categoriaActiva === 'todos' 
        ? proyectos 
        : proyectos.filter(p => p.categoria === categoriaActiva);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArchivoSubido(file.name);
            alert(`¡Archivo "${file.name}" cargado exitosamente para análisis 3D!`);
        }
    };

    return (
        <div className="isoft-app">
            {/* Componente Header Modular */}
            <Header />

            {/* Componente Hero Modular */}
            <main>
                <Hero />

                {/* GALERÍA PROFESIONAL CON FILTROS Y MOVIMIENTO */}
                <section id="galeria" className="gallery-section">
                    <div className="container">
                        <h2>Galería de Proyectos 3D</h2>
                        <p className="section-subtitle">Explora nuestra variedad de aplicaciones industriales, médicas y de colección</p>
                        
                        <div className="filter-buttons">
                            <button className={categoriaActiva === 'todos' ? 'active' : ''} onClick={() => setCategoriaActiva('todos')}>Todos</button>
                            <button className={categoriaActiva === 'coleccion' ? 'active' : ''} onClick={() => setCategoriaActiva('coleccion')}>Colección</button>
                            <button className={categoriaActiva === 'vehiculos' ? 'active' : ''} onClick={() => setCategoriaActiva('vehiculos')}>Vehículos</button>
                            <button className={categoriaActiva === 'hospitalarios' ? 'active' : ''} onClick={() => setCategoriaActiva('hospitalarios')}>Hospitalarios</button>
                            <button className={categoriaActiva === 'accesorios' ? 'active' : ''} onClick={() => setCategoriaActiva('accesorios')}>Accesorios</button>
                        </div>

                        <div className="gallery-grid">
                            {proyectosFiltrados.map((item) => (
                                <div className="project-card cyber-card" key={item.id}>
                                    <div className="card-img-container">
                                        <img src={item.img} alt={item.titulo} />
                                    </div>
                                    <div className="card-body">
                                        <h3>{item.titulo}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECCIÓN DE COTIZACIÓN Y CARGA DE ARCHIVOS 3D (.STL / .OBJ) */}
                <section id="cotizador" className="upload-section">
                    <div className="container contact-container">
                        <h2>Cotizador con Carga de Archivos 3D</h2>
                        <p>Sube tu archivo de diseño (.stl, .obj, .step) para calcular densidad y recibir presupuesto automático.</p>
                        
                        <div className="dropzone">
                            <input type="file" id="file3d" onChange={handleFileUpload} hidden />
                            <label htmlFor="file3d" className="dropzone-label">
                                📁 {archivoSubido ? `Archivo listo: ${archivoSubido}` : 'Arrastra tu archivo 3D aquí o haz clic para buscar'}
                            </label>
                        </div>

                        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('¡Solicitud y modelo enviados con éxito!'); }}>
                            <input type="text" placeholder="Tu Nombre o Empresa" required />
                            <input type="email" placeholder="Correo Electrónico" required />
                            <select className="select-material" required defaultValue="">
                                <option value="" disabled>Selecciona Material de Impresión</option>
                                <option value="pla">PLA Pro (Estándar / Decorativo)</option>
                                <option value="abs">ABS / PETG (Alta Resistencia Mecánica)</option>
                                <option value="resina">Resina UV de Alta Definición (Coleccionables)</option>
                                <option value="flex">TPU Flexible (Goma / Amortiguación)</option>
                            </select>
                            <textarea placeholder="Especificaciones de relleno, escala o acabados..." rows="3" required></textarea>
                            <button type="submit" className="btn-primary">Enviar a Producción 3D</button>
                        </form>
                    </div>
                </section>

                {/* TESTIMONIOS Y ESTRELLAS */}
                <section id="testimonios" className="testimonials-section">
                    <div className="container">
                        <h2>Calificación y Opiniones</h2>
                        <div className="testimonials-grid">
                            <div className="testimonial-card">
                                <div className="stars">★★★★★</div>
                                <p>"La precisión de las piezas impresas superó mis expectativas. El sistema de carga de archivos es rapidísimo."</p>
                                <h4>Carlos Andrés Mesa</h4>
                            </div>
                            <div className="testimonial-card">
                                <div className="stars">★★★★★</div>
                                <p>"Excelente calidad en los prototipos médicos. Cumplieron con los tiempos de entrega exactos."</p>
                                <h4>Dra. Marcela Gómez</h4>
                            </div>
                            <div className="testimonial-card">
                                <div className="stars">★★★★★</div>
                                <p>"Mis figuras de colección quedaron con unos detalles increíbles. Definitivamente la mejor calidad 3D."</p>
                                <h4>Esteban Rueda</h4>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Componente Footer Modular Completo */}
            <Footer />

            {/* Botón Flotante de WhatsApp */}
            <a href="https://wa.me/573144673020" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat de WhatsApp">
                💬
            </a>
        </div>
    );
}