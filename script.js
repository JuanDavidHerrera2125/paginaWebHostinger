const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.item');
let rotationAngle = 0;
let isDragging = false;
let startX;

// === Modal ===
const modal = document.getElementById('mediaModal');
const modalTitle = document.getElementById('modalTitle');
const modalMedia = document.getElementById('modalMedia');
const closeBtn = document.querySelector('.close');

// === Foto de perfil ===
const profilePhoto = document.querySelector('.profile-photo img');

// === Referencias a Firestore (Firebase) ===
const statsRef = db.collection("stats").doc("global");
const commentsRef = db.collection("comments");

// === Contadores y comentarios (Firebase) ===
const visitCounter = document.getElementById('visitCounter');
const starCounter = document.getElementById('starCounter');
const starBtn = document.getElementById('starBtn');
const commentList = document.getElementById('commentList');
const commentInput = document.getElementById('commentInput');

// === Inicializar ===
function init() {
  // Incrementar visitas (una vez por sesión)
  if (!sessionStorage.getItem('visited')) {
    statsRef.update({
      visits: firebase.firestore.FieldValue.increment(1)
    });
    sessionStorage.setItem('visited', 'true');
  }

  // Escuchar cambios en tiempo real
  statsRef.onSnapshot(doc => {
    if (doc.exists) {
      const data = doc.data();
      visitCounter.textContent = data.visits || 0;
      starCounter.textContent = data.stars || 0;
      if ((data.stars || 0) > 0) {
        starBtn.classList.add('active');
      } else {
        starBtn.classList.remove('active');
      }
    }
  });

  commentsRef.orderBy("timestamp", "desc").onSnapshot(snapshot => {
    commentList.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement('div');
      div.className = 'comment-item';
      div.innerHTML = `
        <span class="comment-author">${data.author || 'Anónimo'}:</span> ${data.text}
        <div style="font-size: 0.8rem; color: #aaa; margin-top: 5px;">
          ${data.timestamp?.toDate().toLocaleString() || ''}
        </div>
      `;
      commentList.appendChild(div);
    });
  });

  // Carrusel
  const total = items.length;
  const angleStep = 360 / total;
  const radius = 300;

  items.forEach((item, i) => {
    const angle = i * angleStep;
    item.dataset.angle = angle;
    updateItemTransform(item, angle);
  });

  // Eventos
  window.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.item')) return;
    isDragging = true;
    startX = e.pageX;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.pageX - startX;
    rotationAngle += deltaX * 0.2;
    carousel.style.transform = `rotateY(${-rotationAngle}deg) rotateX(-20deg)`;
    items.forEach(item => {
      const baseAngle = parseFloat(item.dataset.angle);
      updateItemTransform(item, baseAngle);
    });
    startX = e.pageX;
  });

  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mouseleave', () => isDragging = false);

  // Modal
  items.forEach(item => item.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Estrella
  starBtn.addEventListener('click', () => {
    statsRef.update({
      stars: firebase.firestore.FieldValue.increment(
        starBtn.classList.contains('active') ? -1 : 1
      )
    });
    starBtn.classList.toggle('active');
  });

  // Comentarios
  document.getElementById('commentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = commentInput.value.trim();
    if (!text) return;

    const names = ['Visitante', 'DevFan', 'CodeLover', 'WebUser'];
    const author = names[Math.floor(Math.random() * names.length)];

    commentsRef.add({
      text: text,
      author: author,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    commentInput.value = '';
  });

  // 👇 NUEVO: Evento para la foto de perfil
  profilePhoto.addEventListener('click', openProfilePhotoModal);

  // Auto-rotación suave
  setInterval(() => {
    if (!isDragging) {
      rotationAngle += 0.5;
      carousel.style.transform = `rotateY(${-rotationAngle}deg) rotateX(-20deg)`;
      items.forEach(item => {
        const baseAngle = parseFloat(item.dataset.angle);
        updateItemTransform(item, baseAngle);
      });
    }
  }, 50);
}

function updateItemTransform(item, baseAngle) {
  const currentAngle = (parseFloat(baseAngle) + rotationAngle) % 360;
  const isFront = Math.abs(currentAngle) < 45 || Math.abs(currentAngle) > 315;
  item.style.transform = `rotateY(${baseAngle}deg) translateZ(300px)`;
  item.style.opacity = isFront ? "1" : "0.4";
  item.style.filter = isFront ? "none" : "blur(1px) brightness(0.6)";
}

function openModal(e) {
  const item = e.currentTarget;
  const type = item.dataset.type;
  const src = item.dataset.src;
  const title = item.dataset.title;

  modalTitle.textContent = title;
  if (type === 'image') {
    modalMedia.innerHTML = `<img src="${src}" alt="${title}">`;
  } else if (type === 'video') {
    modalMedia.innerHTML = `<iframe src="${src}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
  }
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// 👇 NUEVO: Función para abrir la foto de perfil en modal
function openProfilePhotoModal() {
  modalTitle.textContent = "Mi Foto de Perfil";
  modalMedia.innerHTML = `<img src="img/fotoDePerfil2.png" alt="Foto de perfil">`;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = ''; // ✅ Restaura scroll
}

document.addEventListener('DOMContentLoaded', init);

// ✅ ASEGURAR QUE EL MODAL ESTÉ OCULTO AL INICIO
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('mediaModal');
  if (modal) modal.style.display = 'none';
});