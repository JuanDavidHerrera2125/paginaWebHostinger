import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import './Resenas.css';

const Resenas = () => {
  const [resenas, setResenas] = useState([]);
  const [formData, setFormData] = useState({
    usuario: '',
    ocupacion: '',
    comentario: '',
    rating: 5,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  // Sincronizar en tiempo real usando 'createAt'
  useEffect(() => {
    const q = query(collection(db, 'resenas'), orderBy('createAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setResenas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'resenas'), {
      ...formData,
      createAt: serverTimestamp(),
    });
    setFormData({ usuario: '', ocupacion: '', comentario: '', rating: 5 });
  };

  return (
    <div className="resenas-section">
      <h3>Reseñas</h3>
      
      <form onSubmit={handleSubmit} className="resenas-form">
        <input
          type="text"
          placeholder="Tu nombre"
          value={formData.usuario}
          onChange={e => setFormData({ ...formData, usuario: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tu ocupación (ej. Desarrollador)"
          value={formData.ocupacion}
          onChange={e => setFormData({ ...formData, ocupacion: e.target.value })}
          required
        />
        
        {/* Selector de estrellas */}
        <div className="rating-selector">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              onClick={() => setFormData({ ...formData, rating: star })}
              style={{
                color: star <= formData.rating ? '#ffc107' : '#ccc',
                cursor: 'pointer',
                fontSize: '22px',
                marginRight: '4px'
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Escribe tu reseña..."
          value={formData.comentario}
          onChange={e => setFormData({ ...formData, comentario: e.target.value })}
          required
        />
        <button type="submit">Publicar reseña</button>
      </form>

      {/* Lista de reseñas con scroll */}
      <div className="resenas-container">
        <div className={`resenas-scroll ${isExpanded ? 'expanded' : ''}`}>
          {resenas.length === 0 ? (
            <p className="no-resenas">Aún no hay reseñas. ¡Sé el primero!</p>
          ) : (
            (isExpanded ? resenas : resenas.slice(0, 3)).map(r => (
              <div key={r.id} className="resena-card">
                <div className="resena-header">
                  <strong>{r.usuario}</strong>
                  <span className="resena-ocupacion">({r.ocupacion})</span>
                  <span className="resena-estrellas">{'★'.repeat(r.rating || 5)}</span>
                </div>
                <p className="resena-text">{r.comentario}</p>
              </div>
            ))
          )}
        </div>

        {resenas.length > 3 && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="toggle-btn"
          >
            {isExpanded ? 'Ver menos' : `Ver más reseñas (${resenas.length - 3})`}
          </button>
        )}
      </div>
    </div>
  );
};

export default Resenas;