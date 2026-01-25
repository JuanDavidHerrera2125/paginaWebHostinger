/**
 * ARCHIVO: script.js
 * DESCRIPCIÓN: Gestión de Carrusel 3D, Firebase (Firestore), Modales y Efectos Visuales.
 */

// === VARIABLES GLOBALES DE ESTADO ===
const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.item');
let rotationAngle = 0;      // Ángulo de rotación actual
let isDragging = false;     // Estado para saber si el usuario arrastra el carrusel
let startX;                 // Posición inicial del ratón al hacer click

// === ELEMENTOS DEL DOM ===
const modal = document.getElementById('mediaModal');
const modalTitle = document.getElementById('modalTitle');
const modalMedia = document.getElementById('modalMedia');
const closeBtn = document.querySelector('.close');
const profilePhoto = document.querySelector('.profile-photo img');

// === REFERENCIAS A FIREBASE (FIRESTORE) ===
// Asegúrate de tener estas colecciones/documentos en tu base de datos
const statsRef = db.collection("stats").doc("global");
const commentsRef = db.collection("comments");

// === INTERFAZ DE USUARIO (CONTADORES Y FORMULARIO) ===
const visitCounter = document.getElementById('visitCounter');
const starCounter = document.getElementById('starCounter');
const starBtn = document.getElementById('starBtn');
const commentList = document.getElementById('commentList');
const commentInput = document.getElementById('commentInput');

/**
 * FUNCIÓN INICIALIZADORA
 */
function init() {
    
    // 1. GESTIÓN DE VISITAS (Una sola vez por sesión)
    if (!sessionStorage.getItem('visited')) {
        statsRef.update({
            visits: firebase.firestore.FieldValue.increment(1)
        }).catch(() => console.log("Error al actualizar visitas"));
        sessionStorage.setItem('visited', 'true');
    }

    // 2. ESCUCHA DE ESTADÍSTICAS EN TIEMPO REAL (Visitas y Estrellas)
    statsRef.onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            visitCounter.textContent = data.visits || 0;
            starCounter.textContent = data.stars || 0;
            
            // Si el usuario ya dio estrella en esta sesión, mantenemos el color
            if (sessionStorage.getItem('starred')) {
                starBtn.classList.add('active');
            }
        }
    });

    // 3. ESCUCHA DE COMENTARIOS EN TIEMPO REAL
    commentsRef.orderBy("timestamp", "desc").onSnapshot(snapshot => {
        commentList.innerHTML = ''; // Limpiamos la lista antes de renderizar
        snapshot.forEach(doc => {
            const data = doc.data();
            const div = document.createElement('div');
            div.className = 'comment-item';
            div.innerHTML = `
                <span class="comment-author">${data.author || 'Anónimo'}:</span>
                <p>${data.text}</p>
                <div class="comment-date">
                    ${data.timestamp?.toDate().toLocaleString() || 'Reciente'}
                </div>
            `;
            commentList.appendChild(div);
        });
    });

    // 4. CONFIGURACIÓN INICIAL DEL CARRUSEL
    const totalItems = items.length;
    const angleStep = 360 / totalItems;

    items.forEach((item, i) => {
        const angle = i * angleStep;
        item.dataset.angle = angle; // Guardamos su ángulo base
        updateItemTransform(item, angle);
    });

    /**
     * EVENTOS DE INTERACCIÓN
     */

    // Control de Arrastre (Drag)
    window.addEventListener('mousedown', (e) => {
        if (!e.target.closest('.item')) return;
        isDragging = true;
        startX = e.pageX;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.pageX - startX;
        rotationAngle += deltaX * 0.2; // Sensibilidad del giro
        renderCarousel();
        startX = e.pageX;
    });

    window.addEventListener('mouseup', () => isDragging = false);

    // Click en la Estrella (Sistema de Like)
    starBtn.addEventListener('click', () => {
        const isCurrentlyActive = starBtn.classList.contains('active');
        
        // Solo permitimos un voto por sesión para evitar spam
        if (!sessionStorage.getItem('starred')) {
            statsRef.update({
                stars: firebase.firestore.FieldValue.increment(1)
            });
            sessionStorage.setItem('starred', 'true');
            starBtn.classList.add('active');
        } else {
            // Si ya votó, podrías permitirle quitarlo:
            statsRef.update({
                stars: firebase.firestore.FieldValue.increment(-1)
            });
            sessionStorage.removeItem('starred');
            starBtn.classList.remove('active');
        }
    });

    // Envío de Comentarios
    document.getElementById('commentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const text = commentInput.value.trim();
        if (!text) return;

        const fakeAuthors = ['Visitante_Pro', 'Dev_Explorer', 'Code_Master', 'Web_Fan'];
        const randomAuthor = fakeAuthors[Math.floor(Math.random() * fakeAuthors.length)];

        commentsRef.add({
            text: text,
            author: randomAuthor,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        commentInput.value = ''; // Limpiar input
    });

    // Abrir Modal al hacer click en items del carrusel
    items.forEach(item => item.addEventListener('click', openModal));

    // Abrir Modal con Foto de Perfil
    profilePhoto.addEventListener('click', openProfilePhotoModal);

    // Cerrar Modal
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Auto-rotación del Carrusel (Se detiene si el usuario arrastra)
    setInterval(() => {
        if (!isDragging) {
            rotationAngle += 0.5;
            renderCarousel();
        }
    }, 50);
}

/**
 * ACTUALIZA LA POSICIÓN DE LOS ITEMS EN EL ESPACIO 3D
 */
function renderCarousel() {
    carousel.style.transform = `rotateY(${-rotationAngle}deg) rotateX(-20deg)`;
    items.forEach(item => {
        const baseAngle = parseFloat(item.dataset.angle);
        updateItemTransform(item, baseAngle);
    });
}

function updateItemTransform(item, baseAngle) {
    // Calculamos qué tan "al frente" está el item para efectos de opacidad
    const currentAngle = (baseAngle + rotationAngle) % 360;
    const isFront = Math.abs(currentAngle) < 45 || Math.abs(currentAngle) > 315;
    
    item.style.transform = `rotateY(${baseAngle}deg) translateZ(300px)`;
    item.style.opacity = isFront ? "1" : "0.4";
    item.style.filter = isFront ? "none" : "blur(1px) brightness(0.6)";
}

/**
 * FUNCIONES DEL MODAL
 */
function openModal(e) {
    const item = e.currentTarget;
    const type = item.dataset.type;
    const src = item.dataset.src;
    const title = item.dataset.title;

    modalTitle.textContent = title;
    
    if (type === 'image') {
        modalMedia.innerHTML = `<img src="${src}" alt="${title}">`;
    } else if (type === 'video') {
        // Soporta links de YouTube embebidos
        modalMedia.innerHTML = `<iframe src="${src}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
}

function openProfilePhotoModal() {
    modalTitle.textContent = "Juan David Herrera";
    modalMedia.innerHTML = `<img src="img/fotoDePerfil2.png" alt="Perfil">`;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    modalMedia.innerHTML = ''; // Limpia el contenido (detiene videos)
    document.body.style.overflow = ''; // Restaura el scroll
}

// LANZAR TODO AL CARGAR EL DOCUMENTO
document.addEventListener('DOMContentLoaded', init);