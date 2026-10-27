// Mobile menu, scroll reveal and the screenshot lightbox.
document.querySelector('.menu-btn')?.addEventListener('click', () => {
  document.querySelector('.nav ul').classList.toggle('open');
});

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const shots = [...document.querySelectorAll('.gallery button')];
if (shots.length) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<img alt=""><button class="close" aria-label="Close">&times;</button><button class="prev" aria-label="Previous">&#8249;</button><button class="next" aria-label="Next">&#8250;</button>';
  document.body.append(box);
  const img = box.querySelector('img');
  let i = 0;
  const show = n => { i = (n + shots.length) % shots.length; const s = shots[i].querySelector('img'); img.src = s.src; img.alt = s.alt; box.classList.add('open'); };
  const close = () => box.classList.remove('open');
  shots.forEach((b, n) => b.addEventListener('click', () => show(n)));
  box.querySelector('.close').onclick = close;
  box.querySelector('.prev').onclick = () => show(i - 1);
  box.querySelector('.next').onclick = () => show(i + 1);
  box.addEventListener('click', e => { if (e.target === box) close(); });
  addEventListener('keydown', e => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
}
