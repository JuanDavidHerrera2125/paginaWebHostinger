const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.item');
let rotationAngle = 0;
let isDragging = false;
let startX;

// === Contadores y comentarios (persistencia) ===
let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;
let starCount = parseInt(localStorage.getItem('starCount')) || 0;
let comments = JSON.parse(localStorage.getItem('comments')) || [];

const visitCounter = document.getElementById('visitCounter');
const starCounter = document.getElementById('starCounter');
const starBtn = document.getElementById('starBtn');
const commentList = document.getElementById('commentList');
const commentInput = document.getElementById('commentInput');

// === Modal ===
const modal = document.getElementById('mediaModal');
const modalTitle = document.getElementById('modalTitle');
const modalMedia = document.getElementById('modalMedia');
const closeBtn = document.querySelector('.close');

// === Foto de perfil ===
const profilePhoto = document.querySelector('.profile-photo img'); // 👈 Añadimos esto

// === Inicializar ===
function init() {
  // Incrementar visitas
  visitCount++;
  localStorage.setItem('visitCount', visitCount);
  visitCounter.textContent = visitCount;

  // Actualizar estrellas
  starCounter.textContent = starCount;
  if (starCount > 0) starBtn.classList.add('active');

  // Mostrar comentarios guardados
  renderComments();

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
    starBtn.classList.toggle('active');
    starCount = starBtn.classList.contains('active') ? starCount + 1 : starCount - 1;
    if (starCount < 0) starCount = 0;
    localStorage.setItem('starCount', starCount);
    starCounter.textContent = starCount;
  });

  // Comentarios
  document.getElementById('commentForm').addEventListener('submit', addComment);

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
  modalMedia.innerHTML = `<img src="img/your-photo.jpg" alt="Foto de perfil">`; // 👈 Cambia por tu ruta real
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = ''; // ✅ Restaura scroll
}

function addComment(e) {
  e.preventDefault();
  const text = commentInput.value.trim();
  if (!text) return;

  // Generar nombre aleatorio
  const names = ['Visitante', 'DevFan', 'CodeLover', 'WebUser'];
  const author = names[Math.floor(Math.random() * names.length)];

  // Crear comentario
  const newComment = {
    id: Date.now(),
    author: author,
    text: text,
    date: new Date().toLocaleString()
  };

  comments.push(newComment);
  localStorage.setItem('comments', JSON.stringify(comments));
  renderComments();

  commentInput.value = '';
  // Scroll al nuevo comentario
  const lastComment = commentList.lastElementChild;
  if (lastComment) lastComment.scrollIntoView({ behavior: 'smooth' });
}

function renderComments() {
  commentList.innerHTML = '';
  comments.forEach(comment => {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `
      <span class="comment-author">${comment.author}:</span> ${comment.text}
      <div style="font-size: 0.8rem; color: #aaa; margin-top: 5px;">${comment.date}</div>
    `;
    commentList.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', init);