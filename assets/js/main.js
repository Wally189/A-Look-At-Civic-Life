document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  const footer = document.querySelector('.site-footer');
  if (footer && !footer.querySelector('.footer-links')) {
    const links = document.createElement('div');
    links.className = 'footer-links';
    links.innerHTML = `
      <nav aria-label="Footer navigation">
        <a href="privacy.html">Privacy</a>
        <a href="cookies.html">Cookies</a>
        <a href="accessibility.html">Accessibility</a>
        <a href="terms.html">Terms of use</a>
        <a href="https://waylight-atlantic.co.uk/">Waylight Atlantic</a>
      </nav>
      <p class="footer-note">A small independent civic project by Alan Gallagher. Site support by Waylight Atlantic.</p>
    `;
    footer.appendChild(links);
  }
});
