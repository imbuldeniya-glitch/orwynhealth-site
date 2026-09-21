/* Orwyn walk-through: next and back, keyboard and screen-reader friendly.
   No autoplay, no library. Without JavaScript every slide simply shows in order. */
(function(){
  document.querySelectorAll('.walk').forEach(function(walk){
    var slides = walk.querySelectorAll('.walk-slide');
    var back = walk.querySelector('.walk-nav .back');
    var next = walk.querySelector('.walk-nav .next');
    var dots = walk.querySelector('.walk-dots');
    var live = walk.querySelector('.walk-live');
    if (!slides.length || !back || !next) return;
    walk.classList.remove('nojs');
    walk.querySelector('.walk-nav').hidden = false;
    var i = 0;
    slides.forEach(function(s, n){
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show step ' + (n + 1) + ' of ' + slides.length);
      b.addEventListener('click', function(){ show(n, true); });
      li.appendChild(b); dots.appendChild(li);
    });
    function show(n, announce){
      i = Math.max(0, Math.min(slides.length - 1, n));
      slides.forEach(function(s, k){ s.classList.toggle('is-on', k === i); s.hidden = k !== i; });
      dots.querySelectorAll('button').forEach(function(b, k){
        if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      back.disabled = i === 0;
      next.disabled = i === slides.length - 1;
      if (announce && live) {
        var h = slides[i].querySelector('h3');
        live.textContent = 'Step ' + (i + 1) + ' of ' + slides.length + (h ? ': ' + h.textContent : '');
      }
    }
    back.addEventListener('click', function(){ show(i - 1, true); });
    next.addEventListener('click', function(){ show(i + 1, true); });
    walk.addEventListener('keydown', function(e){
      if (e.target.closest('a')) return;
      if (e.key === 'ArrowRight') { show(i + 1, true); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { show(i - 1, true); e.preventDefault(); }
    });
    show(0, false);
  });
})();
