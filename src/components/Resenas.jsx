import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

export default function Resenas() {
  const [testimonios, setTestimonios] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoRol, setNuevoRol] = useState('');
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [estrellasSeleccionadas, setEstrellasSeleccionadas] = useState(5);
  const [cargando, setCargando] = useState(true);

  // Escuchar la colección 'testimonios' en tiempo real
  useEffect(() => {
    const q = query(collection(db, 'testimonios'), orderBy('creadoEn', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestimonios(docs);
      setCargando(false);
    }, (error) => {
      console.error("Error al obtener testimonios:", error);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAgregarTestimonio = async (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || !nuevoComentario.trim()) {
      alert('Por favor completa tu nombre y el comentario.');
      return;
    }

    try {
      await addDoc(collection(db, 'testimonios'), {
        nombre: nuevoNombre,
        rol: nuevoRol || 'Cliente Verificado',
        estrellas: estrellasSeleccionadas,
        texto: nuevoComentario,
        creadoEn: serverTimestamp()
      });

      setNuevoNombre('');
      setNuevoRol('');
      setNuevoComentario('');
      setEstrellasSeleccionadas(5);
      alert('¡Gracias por tu reseña! Ha sido publicada con éxito.');
    } catch (error) {
      console.error("Error al guardar reseña:", error);
      alert('Ocurrió un error al guardar tu reseña. Intenta nuevamente.');
    }
  };

  return (
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

        {cargando ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '20px' }}>Cargando opiniones...</p>
        ) : (
          <div className="testimonials-grid">
            {testimonios.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="stars">
                  {'★'.repeat(t.estrellas || 5)}{'☆'.repeat(5 - (t.estrellas || 5))}
                </div>
                <p>"{t.texto}"</p>
                <h4>{t.nombre}</h4>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{t.rol}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}