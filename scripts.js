// scripts.js — simple enhancements for Loopsoy
(function(){
  // Replace Instagram, email, and Pinterest placeholders.
  const config = {
    instagram: 'https://www.instagram.com/loopsoy?igsh=MXByNjhha2xma2FxYw==',
    pinterest: 'https://pin.it/11xzpybOI',
    email: 'sanemsin0204@gmail.com'
  };

  // Update footer/contact links
  document.addEventListener('DOMContentLoaded', () => {
    const igLinks = document.querySelectorAll('#ig-link, #ig-cta, .ig-link');
    igLinks.forEach(a => a && (a.href = config.instagram));

    // set pinterest banner link if present
    const pBanner = document.getElementById('pinterest-banner');
    if(pBanner && config.pinterest){
      pBanner.href = config.pinterest;
    }

    // add contact line in footer if not present
    const footer = document.querySelector('footer .container');
    if(footer && !document.getElementById('contact-line')){
      const p = document.createElement('p');
      p.id = 'contact-line';
      p.style.margin = '6px 0 0';
      p.style.fontSize = '0.95rem';
      p.textContent = 'Get in touch: ' + config.email + ' — collaborations & order queries';
      footer.appendChild(p);
    }

    // Populate tool links from supplies.json (if present)
    fetch('supplies.json').then(r => r.ok ? r.json() : null).then(data => {
      if(!data) return;
      // Fill tool buttons on project pages
      document.querySelectorAll('.tool-card').forEach(card => {
        const nameEl = card.querySelector('.name');
        const btn = card.querySelector('.btn-shop');
        if(nameEl && btn){
          const key = nameEl.textContent && nameEl.textContent.trim();
          if(key && data[key]){
            btn.href = data[key];
            btn.setAttribute('target','_blank');
            btn.setAttribute('rel','noopener sponsored');
          }
        }
      });

      // Populate supplies page list if present
      const suppliesContainer = document.getElementById('supplies-list');
      if(suppliesContainer){
        suppliesContainer.innerHTML = '';
        Object.keys(data).forEach(name => {
          const url = data[name];
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
  });
})();
