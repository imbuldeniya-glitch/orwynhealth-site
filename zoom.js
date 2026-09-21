/* Click or tap a product picture to see it larger. No library.
   Each framed picture becomes a button; the larger picture opens in a native <dialog>. */
(function(){
  if (!window.HTMLDialogElement) return;
  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Larger picture');
  dlg.innerHTML = '<div class="lb-bar"><span>Example patient</span><button type="button" class="lb-close">Close</button></div><img alt="">';
  document.body.appendChild(dlg);
  var big = dlg.querySelector('img');
  dlg.querySelector('.lb-close').addEventListener('click', function(){ dlg.close(); });
  dlg.addEventListener('click', function(e){ if (e.target === dlg) dlg.close(); });
  document.querySelectorAll('.pic .frame picture').forEach(function(pic){
    var img = pic.querySelector('img');
    var src = pic.querySelector('source[type="image/webp"]');
    var full = src ? src.getAttribute('srcset').split(',').pop().trim().split(' ')[0] : img.getAttribute('src');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'zoom';
    pic.parentNode.insertBefore(btn, pic);
    btn.appendChild(pic);
    var hint = document.createElement('span');
    hint.className = 'vh';
    hint.textContent = 'Enlarge picture';
    btn.appendChild(hint);
    btn.addEventListener('click', function(){
      big.src = full;
      big.alt = img.alt;
      dlg.showModal();
    });
  });
})();
