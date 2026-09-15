const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');nav.classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');menu.focus();}});
document.querySelectorAll('[data-floor]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-floor]').forEach(b=>{b.classList.toggle('selected',b===btn);b.setAttribute('aria-pressed',String(b===btn));});document.querySelectorAll('[data-room-floor]').forEach(card=>{card.hidden=btn.dataset.floor!=='all'&&card.dataset.roomFloor!==btn.dataset.floor;});}));

const bookingDialog=document.querySelector('#booking-dialog');
let bookingTrigger;
document.querySelectorAll('[data-booking-open]').forEach(button=>button.addEventListener('click',()=>{bookingTrigger=button;if(bookingDialog?.showModal){bookingDialog.showModal();document.body.classList.add('dialog-open');}else{location.href='#reservation';}}));
bookingDialog?.querySelector('.dialog-close').addEventListener('click',()=>bookingDialog.close());
bookingDialog?.addEventListener('click',e=>{if(e.target===bookingDialog){const r=bookingDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)bookingDialog.close();}});
bookingDialog?.addEventListener('close',()=>{document.body.classList.remove('dialog-open');bookingTrigger?.focus();});
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!reducedMotion.matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('appeared');observer.unobserve(entry.target);}}),{threshold:.05});document.querySelectorAll('.landing .section').forEach(section=>observer.observe(section));}
