document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('chat-toggle');
  const close = document.getElementById('chat-close');
  const win = document.querySelector('.chat-window');
  const body = document.getElementById('chat-body');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');

  function open(){ win.classList.add('open'); input.focus(); }
  function hide(){ win.classList.remove('open'); }
  toggle.addEventListener('click', open);
  close.addEventListener('click', hide);

  function append(role, text){
    const div = document.createElement('div');
    div.className = role === 'user' ? 'msg user' : 'msg bot';
    div.textContent = text;
    body.appendChild(div); body.scrollTop = body.scrollHeight;
  }
  function respond(q){
    const t = q.toLowerCase();
    if (t.includes('darshan')) return 'Booking is available in the Dashboard section. Scroll down and choose your slot.';
    if (t.includes('service')) return 'We offer AI Prediction, Smart Queue, IoT Surveillance, Safety Alerts, Traffic & Accessibility.';
    if (t.includes('somnath')) return 'Somnath is mapped below. Click its marker for directions.';
    return 'Thanks for asking! Our team will get back to you. Meanwhile, explore the sections on this page.';
  }
  function sendMsg(){
    const v = input.value.trim(); if(!v) return; append('user', v); input.value='';
    setTimeout(()=>{ append('bot', respond(v)); }, 400);
  }
  send.addEventListener('click', sendMsg);
  input.addEventListener('keydown', e=>{ if(e.key==='Enter') sendMsg(); });

  // Quick actions
  document.querySelectorAll('.chat-quick button').forEach(b=>{
    b.addEventListener('click', ()=>{
      const sel = b.getAttribute('data-go');
      if (sel) document.querySelector(sel)?.scrollIntoView({ behavior:'smooth' });
      open();
      append('user', b.textContent);
      append('bot', respond(b.textContent));
    });
  });
});

