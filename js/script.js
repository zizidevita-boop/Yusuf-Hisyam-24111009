function loadPage(url, el) {
  const iframe = document.getElementById('mainFrame');
  if (!iframe) return;

  iframe.style.opacity = '0';
  iframe.style.transform = 'translateY(12px)';

  setTimeout(() => {
    iframe.src = url;
    iframe.style.transition = 'opacity .4s ease, transform .4s ease';
    iframe.style.opacity = '1';
    iframe.style.transform = 'translateY(0)';
  }, 220);

  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');

  localStorage.setItem('activePage', url);
  localStorage.setItem('activeNav', el ? el.getAttribute('data-key') : '');
}

function restoreLastPage() {
  const lastPage = localStorage.getItem('activePage');
  const lastKey  = localStorage.getItem('activeNav');

  if (lastPage) {
    const iframe = document.getElementById('mainFrame');
    if (iframe) iframe.src = lastPage;

    const navEl = document.querySelector(`nav a[data-key="${lastKey}"]`);
    if (navEl) navEl.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem('activePage')) {
    const homeLink = document.querySelector('nav a[data-key="home"]');
    if (homeLink) homeLink.classList.add('active');
  } else {
    restoreLastPage();
  }

  const burger = document.getElementById('burgerBtn');
  const navInner = document.querySelector('.nav-inner');

  if (burger && navInner) {
    burger.addEventListener('click', () => {
      navInner.classList.toggle('nav-open');
      burger.textContent = navInner.classList.contains('nav-open') ? '✕' : '☰';
    });
  }
});
