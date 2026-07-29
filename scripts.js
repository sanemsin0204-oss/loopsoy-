// scripts.js — shared enhancements for Loopsoy
(function(){
  const config = {
    instagram: 'https://www.instagram.com/loopsoy',
    pinterest: 'https://pin.it/11xzpybOI',
    email: 'sanemsin0204@gmail.com'
  };

  function getSiteRoot() {
  const script = document.currentScript || document.querySelector('script[src*="scripts.js"]');
  const src = script ? script.getAttribute('src') : '';
  const match = src.match(/^(\.\.\/)+/);
  return match ? match[0] : '';
}

  function loadPartial(id, path, siteRoot) {
    const container = document.getElementById(id);
    if (!container) return;

    fetch(path)
      .then(r => r.ok ? r.text() : '')
      .then(html => {
        container.innerHTML = html.replace(/\{\{SITE_ROOT\}\}/g, siteRoot);
        const yearEl = document.getElementById('year');
        if (yearEl) {
          yearEl.textContent = new Date().getFullYear();
        }
      })
      .catch(() => {
        container.innerHTML = '';
      });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const siteRoot = getSiteRoot();
    const headerPath = siteRoot ? `${siteRoot}partials/header.html` : 'partials/header.html';
    const footerPath = siteRoot ? `${siteRoot}partials/footer.html` : 'partials/footer.html';

    loadPartial('site-header', headerPath, siteRoot);
    loadPartial('site-footer', footerPath, siteRoot);

    const igLinks = document.querySelectorAll('#ig-link, #ig-cta, .ig-link');
    igLinks.forEach(a => a && (a.href = config.instagram));

    const pBanner = document.getElementById('pinterest-banner');
    if(pBanner && config.pinterest){
      pBanner.href = config.pinterest;
    }

    const footer = document.querySelector('footer .container');
    if(footer && !document.getElementById('contact-line')){
      const p = document.createElement('p');
      p.id = 'contact-line';
      p.style.margin = '6px 0 0';
      p.style.fontSize = '0.95rem';
      p.textContent = 'Get in touch: ' + config.email + ' — collaborations & order queries';
      footer.appendChild(p);
    }

    fetch(`${siteRoot}supplies.json`).then(r => r.ok ? r.json() : null).then(data => {
      if(!data) return;
      const items = data.items || data;

      document.querySelectorAll('.tool-card').forEach(card => {
        const nameEl = card.querySelector('.name');
        const btn = card.querySelector('.btn-shop');
        if(nameEl && btn){
          const key = nameEl.textContent && nameEl.textContent.trim();
          if(key && items[key]){
            btn.href = items[key];
            btn.setAttribute('target','_blank');
            btn.setAttribute('rel','noopener sponsored');
          }
        }
      });

      const supplyGrids = document.querySelectorAll('.tools-grid[data-project], .tools-grid[data-supplies]');
      if(supplyGrids.length){
        const common = Array.isArray(data.common) ? data.common : [];

        supplyGrids.forEach(supplyGrid => {
          let requested = [];
          const projectKey = supplyGrid.dataset.project;

          if(projectKey && Array.isArray(data[projectKey])){
            requested = [...new Set([...common, ...data[projectKey]])];
          } else if(supplyGrid.dataset.supplies){
            try {
              requested = JSON.parse(supplyGrid.dataset.supplies || '[]');
            } catch (err) {
              requested = [];
            }
          }

          supplyGrid.innerHTML = '';
          requested.forEach(name => {
            const url = items[name];
            if(!url) return;

            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
              <div class="top">
                <span class="icon">🧶</span>
                <span class="name">${name}</span>
              </div>
              <a class="btn btn-shop" href="${url}" target="_blank" rel="noopener sponsored">
                Shop on Amazon
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            `;
            supplyGrid.appendChild(card);
          });
        });
      }

      const suppliesContainer = document.getElementById('supplies-list');
      if(suppliesContainer){
        suppliesContainer.innerHTML = '';
        Object.keys(items).forEach(name => {
          const url = items[name];
          const card = document.createElement('div');
          card.className = 'tool-card';
          card.innerHTML = `<div class="top"><span class="icon">🔗</span><span class="name">${name}</span></div>`;
          const a = document.createElement('a');
          a.className = 'btn btn-shop';
          a.href = url;
          a.target = '_blank';
          a.rel = 'noopener sponsored';
          a.innerHTML = 'Shop on Amazon <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          card.appendChild(a);
          suppliesContainer.appendChild(card);
        });
      }
    }).catch(()=>{});

    const revealEls = document.querySelectorAll('.reveal, .project-card');
    if(revealEls.length && 'IntersectionObserver' in window){
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if(e.isIntersecting){
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(el => io.observe(el));
    }
  });
})();
