// SBI homepage clone — minimal interactivity

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.primary-nav');
const search = document.querySelector('.search');
const bluebar = document.getElementById('bluebar');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  search.classList.toggle('open');
  bluebar.classList.toggle('collapsed');
});

// Blue-bar mega menus: hover handles desktop (CSS); tap toggles on mobile
const isTouch = window.matchMedia('(max-width: 768px)');
document.querySelectorAll('.bluebar-item').forEach((item) => {
  const link = item.querySelector('.bluebar-link');
  link.addEventListener('click', (e) => {
    if (!isTouch.matches) return; // desktop uses hover
    e.preventDefault();
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.bluebar-item.open').forEach((i) => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Primary nav active state
document.querySelectorAll('.primary-nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href') === '#') e.preventDefault();
    document.querySelectorAll('.primary-nav a').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Interest-rate dropdown (demo cycle)
const products = [
  { name: 'Home Loan', rate: '7.25%*' },
  { name: 'Car Loan', rate: '8.65%*' },
  { name: 'Personal Loan', rate: '11.15%*' },
  { name: 'Education Loan', rate: '8.05%*' },
];
let pIndex = 0;
const railSelect = document.querySelector('.rail-select');
const railRate = document.querySelector('.rail-rate strong');

if (railSelect && railRate) {
  railSelect.style.cursor = 'pointer';
  railSelect.addEventListener('click', () => {
    pIndex = (pIndex + 1) % products.length;
    railSelect.firstChild.textContent = products[pIndex].name + ' ';
    railRate.textContent = products[pIndex].rate;
  });
}
