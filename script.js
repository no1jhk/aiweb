(() => {
  // Main slider logic
  const slider = document.querySelector('.slider');
  if(slider){
    const slides = [...slider.querySelectorAll('.slide')];
    const prev = slider.querySelector('#prev');
    const next = slider.querySelector('#next');
    const bar = slider.querySelector('#progressBar');
    const bars = slider.querySelectorAll('.bars .bar');
    const AUTO = 6000;
    let i = 0, timer;
    function setBars(idx){ bars.forEach((b,k)=> b.classList.toggle('active', k===idx)); }
    function show(n){
      slides[i].classList.remove('is-active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active');
      setBars(i);
      restart();
    }
    const right = ()=>show(i+1), left = ()=>show(i-1);
    function restart(){
      if(bar){
        bar.style.transition='none';
        bar.style.width='0%';
        requestAnimationFrame(()=>requestAnimationFrame(()=>{
          bar.style.transition=`width ${AUTO}ms linear`;
          bar.style.width='100%';
        }));
      }
      clearInterval(timer);
      timer=setInterval(right,AUTO);
    }
    prev?.addEventListener('click', ()=>{clearInterval(timer); left();});
    next?.addEventListener('click', ()=>{clearInterval(timer); right();});
    bars.forEach((b,k)=> b.addEventListener('click', ()=>{clearInterval(timer); show(k);}));
    let sx=0,dx=0;
    slider.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
    slider.addEventListener('touchmove',e=>{dx=e.touches[0].clientX-sx;},{passive:true});
    slider.addEventListener('touchend',()=>{if(Math.abs(dx)>40){dx<0?right():left();}});
    if(slides.length){ setBars(0); restart(); }
  }

  // Overlay menu
  const burger=document.querySelector('.burger');
  const overlay=document.getElementById('menu-overlay');
  if(burger&&overlay){
    const navBox=overlay.querySelector('.overlay-nav');
    const first=overlay.querySelector('a');
    function open(){ document.body.classList.add('menu-open'); burger.setAttribute('aria-expanded','true'); overlay.hidden=false; first?.focus({preventScroll:true}); document.addEventListener('keydown',onEsc); document.documentElement.style.overflow='hidden';}
    function close(){ document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded','false'); overlay.hidden=true; document.removeEventListener('keydown',onEsc); document.documentElement.style.overflow=''; burger.focus({preventScroll:true}); }
    function onEsc(e){ if(e.key==='Escape') close(); }
    burger.addEventListener('click', ()=> burger.getAttribute('aria-expanded')==='true' ? close() : open());
    overlay.addEventListener('click', (e)=>{ if(!navBox.contains(e.target)) close(); });
  }

  // Work page helpers
  const hero=document.getElementById('hero');
  const hint=document.getElementById('scrollHint');
  const toTop=document.getElementById('toTop');
  if(hero){
    const onScroll=()=>{
      const y=scrollY, H=innerHeight, past=y>H-1;
      if(hint) hint.style.display=(y>20)?'none':'block';
      if(toTop) toTop.classList.toggle('show',past);
    };
    document.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }
  toTop?.addEventListener('click',()=> scrollTo({top:0,behavior:'smooth'}));
})();