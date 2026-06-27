/* ── CANVAS ── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H;
const orbs = [
  { xR:.82, yR:.08, r:320, col:'#4F46E5', dx:.0004, dy:.0003 },
  { xR:.08, yR:.48, r:240, col:'#EC4899', dx:.0003, dy:.0004 },
  { xR:.72, yR:.68, r:190, col:'#818CF8', dx:.0005, dy:.0002 },
  { xR:.18, yR:.88, r:260, col:'#06B6D4', dx:.0002, dy:.0005 },
];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function draw() {
  ctx.clearRect(0, 0, W, H);
  orbs.forEach(o => {
    o.xR += o.dx; o.yR += o.dy;
    if (o.xR < -.05 || o.xR > 1.05) o.dx *= -1;
    if (o.yR < -.05 || o.yR > 1.05) o.dy *= -1;
    const x = o.xR * W, y = o.yR * H;
    const r = o.r * (Math.max(W, H) / 1000);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, o.col + '1C');
    g.addColorStop(1, o.col + '00');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

document.addEventListener('mousemove', e => {
  const mx = (e.clientX / W - .5) * .0008;
  const my = (e.clientY / H - .5) * .0008;
  orbs.forEach((o, i) => {
    const s = i % 2 === 0 ? 1 : -1;
    o.dx = .0003 * s + mx * s;
    o.dy = .0003 * s + my * s;
  });
});

/* ── HAMBURGER ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* ── HEADLINE CYCLE ── */
const words = ['mobile apps','AI pipelines','SQL chatbots','OCR systems','real products'];
let wi = 0;
const cw = document.getElementById('cw');
setInterval(() => {
  cw.classList.add('fo');
  setTimeout(() => {
    wi = (wi + 1) % words.length;
    cw.textContent = words[wi];
    cw.classList.remove('fo');
    cw.classList.add('fi');
    setTimeout(() => cw.classList.remove('fi'), 250);
  }, 210);
}, 2800);

/* ── SCROLL REVEAL ── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ── NAV ACTIVE ── */
const navAs = document.querySelectorAll('.nav-links a');
const so = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { threshold: 0.35 });
['work','skills','contact'].forEach(id => { const el = document.getElementById(id); if (el) so.observe(el); });

/* ── MODAL ── */
const modal  = document.getElementById('modal');
const mClose = document.getElementById('modal-close');
document.querySelectorAll('.pc').forEach(card => {
  card.addEventListener('click', () => {
    document.getElementById('m-badge').textContent  = card.dataset.badge;
    document.getElementById('m-badge').className    = 'modal-badge ' + card.dataset.badgeClass;
    document.getElementById('m-title').textContent  = card.dataset.title;
    document.getElementById('m-desc').textContent   = card.dataset.desc;
    document.getElementById('m-stack').innerHTML    =
      card.dataset.stack.split(',').map(t => `<span class="modal-tag">${t.trim()}</span>`).join('');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
mClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });