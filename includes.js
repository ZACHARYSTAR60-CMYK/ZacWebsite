// Loads shared header (nav.html) and footer (footer.html) into every page.
// Change nav.html once and it updates across the whole site.
(function () {
  function loadInclude(id, url, onLoaded) {
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to fetch ' + url);
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        // Let the browser paint the new content at height 0/opacity 0 first,
        // then transition it in on the next frame — avoids the "snap" jump.
        requestAnimationFrame(function () {
          el.classList.add('is-loaded');
        });
        if (onLoaded) onLoaded(el);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadInclude('header-placeholder', 'nav.html', function (el) {
      var current = window.location.pathname.split('/').pop() || 'index.html';
      var links = el.querySelectorAll('.site-nav a[data-page]');
      links.forEach(function (link) {
        if (link.getAttribute('data-page') === current) {
          link.classList.add('is-active');
        }
      });
    });

    loadInclude('footer-placeholder', 'footer.html');
  });
})();