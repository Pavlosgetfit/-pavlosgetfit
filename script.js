const lightbox=document.querySelector('.lightbox');
if(lightbox){
  const lightImg=lightbox.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach(b=>b.addEventListener('click',()=>{
    lightImg.src=b.dataset.full;
    lightImg.alt=b.querySelector('img')?.alt||'';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }));
  function close(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightImg.src=''}
  lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target.classList.contains('close'))close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
}
