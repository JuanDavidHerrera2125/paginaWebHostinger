// ==========================================
// ARCHIVO: src/App.jsx
// ==========================================
import React, { useState } from 'react';
import { Header } from './components/header';
import { Hero } from './components/hero';

// ==========================================
// [11] CARRUSEL RUEDA INFINITA PERFECTA
// Lista de videos: agrega aquí los que quieras
// y la rueda se adapta sola (duplicado automático)
// ==========================================
const VIDEOS_CARRUSEL = [
  '/videos/video1.mp4',
  '/videos/video2.mp4',
  '/videos/video3.mp4',
  '/videos/video4.mp4',
];

export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [archivoSubido, setArchivoSubido] = useState(null);

  const [testimonios, setTestimonios] = useState([
    { id: 1, nombre: 'Carlos Mendoza', estrellas: 5, texto: 'Las piezas de ingeniería llegaron perfectas y con una tolerancia milimétrica excelente. Muy recomendado.', rol: 'Ingeniero Mecánico' },
    { id: 2, nombre: 'Andrea Gómez', estrellas: 5, texto: 'Excelente atención y rapidez. Mandé a hacer figuras coleccionables y el texturizado superó mis expectativas.', rol: 'Diseñadora 3D' }
  ]);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoRol, setNuevoRol] = useState('');
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [estrellasSeleccionadas, setEstrellasSeleccionadas] = useState(5);

  const proyectos = [
    { id: 1, categoria: 'coleccion', titulo: 'Figura Coleccionable Anime', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80' },
    { id: 2, categoria: 'vehiculos', titulo: 'Repuesto Personalizado de Motor', img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80' },
    { id: 3, categoria: 'hospitalarios', titulo: 'Prótesis y Guías Quirúrgicas', img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' },
    { id: 4, categoria: 'accesorios', titulo: 'Soportes Tecnológicos a Medida', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80' },
    { id: 5, categoria: 'coleccion', titulo: 'Bustos Escultóricos Detallados', img: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80' },
    { id: 6, categoria: 'vehiculos', titulo: 'Componentes Aero / Tuning', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80' },
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

  const handleAgregarTestimonio = (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || !nuevoComentario.trim()) {
      alert('Por favor completa tu nombre y el comentario.');
      return;
    }

    const nuevoObj = {
      id: Date.now(),
      nombre: nuevoNombre,
      rol: nuevoRol || 'Cliente Verificado',
      estrellas: estrellasSeleccionadas,
      texto: nuevoComentario
    };

    setTestimonios([nuevoObj, ...testimonios]);
    setNuevoNombre('');
    setNuevoRol('');
    setNuevoComentario('');
    setEstrellasSeleccionadas(5);
    alert('¡Gracias por tu reseña! Ha sido publicada con éxito.');
  };

  return (
    <div>
      <Header />
      <Hero />

      <section className="process-section">
        <div className="container">
          <h2>¿Qué es la Impresión 3D?</h2>
          <p style={{ maxWidth: '800px', margin: '20px auto 40px auto', color: '#9ca3af', lineHeight: '1.6' }}>
            La impresión 3D es la tecnología que permite materializar objetos físicos a partir de diseños digitales mediante la superposición de capas. 
            En <strong>ISoft 3D</strong>, somos los mejores porque combinamos ingeniería de precisión con los materiales más avanzados del mercado, 
            garantizando piezas funcionales, duraderas y con un acabado estético inigualable.
          </p>

          {/* ==========================================
              [11] CARRUSEL RUEDA INFINITA PERFECTA
              Set original + duplicado exacto (aria-hidden)
              El -50% siempre equivale a 1 set completo, sin saltos
              ========================================== */}
          <div className="carousel-wrapper">
            <div
              className="video-carousel"
              style={{ animationDuration: `${VIDEOS_CARRUSEL.length * 5}s` }}
            >
              {[...VIDEOS_CARRUSEL, ...VIDEOS_CARRUSEL].map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="video-item"
                  aria-hidden={i >= VIDEOS_CARRUSEL.length}
                >
                  <video src={src} autoPlay loop muted playsInline />
                </div>
              ))}
            </div>
          </div>

          <h2>¿Cómo Trabajamos?</h2>
          <p className="section-subtitle">Tu proyecto impreso en 3 simples pasos</p>
          <div className="process-grid">
            <div className="process-card">
              <div className="process-number">01</div>
              <h3>Sube tu Archivo</h3>
              <p>Envíanos tu diseño en formato .STL, .OBJ o .STEP indicando el material de tu preferencia.</p>
            </div>
            <div className="process-card">
              <div className="process-number">02</div>
              <h3>Análisis y Cotización</h3>
              <p>Evaluamos la densidad, volumen y parámetros técnicos para ofrecerte el mejor presupuesto inmediato.</p>
            </div>
            <div className="process-card">
              <div className="process-number">03</div>
              <h3>Impresión y Envío</h3>
              <p>Fabricamos con impresoras industriales de alta precisión y te lo enviamos directo a la puerta de tu casa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Proyectos 3D */}
      <section id="galeria" className="gallery-section">
        <div className="container">
          <h2>Proyectos 3D Destacados</h2>
          <p className="section-subtitle">Explora algunas de nuestras creaciones y aplicaciones industriales</p>
          
          <div className="filter-buttons">
            <button className={categoriaActiva === 'todos' ? 'active' : ''} onClick={() => setCategoriaActiva('todos')}>Todos</button>
            <button className={categoriaActiva === 'coleccion' ? 'active' : ''} onClick={() => setCategoriaActiva('coleccion')}>Colección</button>
            <button className={categoriaActiva === 'vehiculos' ? 'active' : ''} onClick={() => setCategoriaActiva('vehiculos')}>Vehículos</button>
            <button className={categoriaActiva === 'hospitalarios' ? 'active' : ''} onClick={() => setCategoriaActiva('hospitalarios')}>Hospitalarios</button>
            <button className={categoriaActiva === 'accesorios' ? 'active' : ''} onClick={() => setCategoriaActiva('accesorios')}>Accesorios</button>
          </div>

          <div className="gallery-grid">
            {proyectosFiltrados.map((p) => (
              <div key={p.id} className="cyber-card">
                <div className="card-img-container">
                  <img src={p.img} alt={p.titulo} />
                </div>
                <div className="card-body">
                  <h3>{p.titulo}</h3>
                  <p>Diseños funcionales optimizados para máxima resistencia y acabado estético profesional.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Carga de Archivos 3D (Cotizador) */}
      <section id="cotizador" className="upload-section">
        <div className="container contact-container">
          <h2>Cotizador con Carga de Archivos 3D</h2>
          <p>Sube tu archivo de diseño (.stl, .obj, .step) para calcular densidad y recibir presupuesto automático.</p>
          
          <div className="dropzone" onClick={() => document.getElementById('fileInput').click()}>
            <span className="dropzone-label">📁 Haz clic aquí para adjuntar archivo 3D</span>
            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileUpload} accept=".stl,.obj,.step" />
            {archivoSubido && <p style={{ color: '#00f2fe', marginTop: '10px' }}>Archivo seleccionado: {archivoSubido}</p>}
          </div>

          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('¡Cotización enviada con éxito!'); }}>
            <input type="text" placeholder="Tu Nombre" required />
            <input type="email" placeholder="Correo Electrónico" required />
            <select className="select-material" required defaultValue="">
              <option value="" disabled>Selecciona el Material 3D</option>
              <option value="pla">PLA Pro (Estándar / Decorativo)</option>
              <option value="petg">PETG (Alta Resistencia Mecánica)</option>
              <option value="abs">ABS (Industrial / Automotriz)</option>
              <option value="resina">Resina UV Alta Definición (Detalle extremo)</option>
            </select>
            <textarea rows="4" placeholder="Detalles adicionales, medidas o instrucciones especiales..." required></textarea>
            <button type="submit" className="btn-primary">Enviar Solicitud de Cotización</button>
          </form>
        </div>
      </section>

      {/* Sección de Testimonios Reales + Formulario con Calificador de Estrellas */}
      <section id="testimonios" className="testimonials-section">
        <div className="container">
          <h2>Lo que dicen nuestros clientes</h2>
          <p className="section-subtitle">Experiencias reales con nuestra tecnología de impresión 3D</p>

          <div className="add-testimonial-box">
            <h3>Deja tu reseña y calificación</h3>
            <form className="contact-form" onSubmit={handleAgregarTestimonio}>
              <div className="form-row">
                <input 
                  type="text" 
                  placeholder="Tu Nombre" 
                  value={nuevoNombre} 
                  onChange={(e) => setNuevoNombre(e.target.value)} 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Tu Ocupación o Empresa (Opcional)" 
                  value={nuevoRol} 
                  onChange={(e) => setNuevoRol(e.target.value)} 
                />
              </div>

              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#9ca3af', marginBottom: '5px', fontSize: '14px' }}>Calificación:</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((estrella) => (
                    <span 
                      key={estrella} 
                      className={estrella <= estrellasSeleccionadas ? 'active' : ''}
                      onClick={() => setEstrellasSeleccionadas(estrella)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <textarea 
                rows="3" 
                placeholder="Escribe tu experiencia con el servicio..." 
                value={nuevoComentario} 
                onChange={(e) => setNuevoComentario(e.target.value)} 
                required
              ></textarea>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Publicar Reseña</button>
            </form>
          </div>

          <div className="testimonials-grid">
            {testimonios.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="stars">
                  {'★'.repeat(t.estrellas)}{'☆'.repeat(5 - t.estrellas)}
                </div>
                <p>"{t.texto}"</p>
                <h4>{t.nombre}</h4>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{t.rol}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Completo */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-col">
            <h3>ISoft3D</h3>
            <p>Soluciones avanzadas en modelado, prototipado industrial y impresión tridimensional a medida.</p>
          </div>
          <div className="footer-col">
            <h4>Enlaces Rápidos</h4>
            <a href="#inicio">Inicio</a>
            <a href="#galeria">Proyectos 3D</a>
            <a href="#cotizador">Cotizador</a>
            <a href="#testimonios">Testimonios</a>
          </div>
          <div className="footer-col">
            <h4>Contacto Directo</h4>
            <p>Bogotá, Colombia</p>
            <p>Teléfono / WhatsApp: +57 314 467 3020</p>
            <p>soporte@isoft3d.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ISoft3D - Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Botón Flotante de WhatsApp */}
      <a href="https://wa.me/573144673020" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat de WhatsApp">
        💬
      </a>
    </div>
  );
}