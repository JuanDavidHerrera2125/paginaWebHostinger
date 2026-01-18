const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Atom {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5 + 1;
    this.orbitRadius = Math.random() * 12 + 8;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.01 + 0.003;
    this.driftX = (Math.random() - 0.5) * 0.15;
    this.driftY = (Math.random() - 0.5) * 0.15;
  }

  draw() {
    // Núcleo
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 246, 255, 0.9)";
    ctx.fill();

    // Órbita
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.orbitRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0, 246, 255, 0.08)";
    ctx.stroke();

    // Electrón
    const ex = this.x + Math.cos(this.angle) * this.orbitRadius;
    const ey = this.y + Math.sin(this.angle) * this.orbitRadius;

    ctx.beginPath();
    ctx.arc(ex, ey, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = "#00f6ff";
    ctx.fill();
  }

  update() {
    this.angle += this.speed;
    this.x += this.driftX;
    this.y += this.driftY;

    // Reaparece suavemente
    if (this.x < -50) this.x = canvas.width + 50;
    if (this.x > canvas.width + 50) this.x = -50;
    if (this.y < -50) this.y = canvas.height + 50;
    if (this.y > canvas.height + 50) this.y = -50;

    this.draw();
  }
}

const atoms = [];
const ATOM_COUNT = 45;

for (let i = 0; i < ATOM_COUNT; i++) {
  atoms.push(new Atom());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  atoms.forEach(atom => atom.update());

  requestAnimationFrame(animate);
}

animate();
