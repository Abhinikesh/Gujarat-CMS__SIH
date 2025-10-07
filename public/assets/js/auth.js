// Simple login/signup modal handling and validation
const Auth = (() => {
  let modal;
  function open(type) {
    modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.add('open');
    setView(type || 'login');
  }
  function close() { if (modal) modal.classList.remove('open'); }
  function setView(type) {
    const title = modal.querySelector('.title');
    const confirm = modal.querySelector('.confirm-password');
    title.textContent = type === 'signup' ? 'Create Account' : 'Welcome Back';
    confirm.style.display = type === 'signup' ? 'block' : 'none';
    modal.dataset.view = type;
  }
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const isSignup = form.closest('#auth-modal').dataset.view === 'signup';
    if (!email || !password) return alert('Please fill in required fields');
    if (isSignup) {
      const confirm = form.confirm.value.trim();
      if (password !== confirm) return alert('Passwords do not match');
    }
    try {
      const res = await fetch(isSignup ? '/auth/signup' : '/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Request failed');
      localStorage.setItem('authUser', JSON.stringify({ email }));
      alert(isSignup ? 'Account created!' : 'Logged in!');
      close();
    } catch (err) {
      alert(err.message);
    }
  }
  function bind() {
    const openLogin = document.querySelectorAll('[data-open-login]');
    const openSignup = document.querySelectorAll('[data-open-signup]');
    openLogin.forEach(el => el.addEventListener('click', () => open('login')));
    openSignup.forEach(el => el.addEventListener('click', () => open('signup')));
    const closeBtn = document.querySelector('#auth-modal .close');
    if (closeBtn) closeBtn.addEventListener('click', close);
    const switchers = document.querySelectorAll('#auth-modal [data-switch]');
    switchers.forEach(el => el.addEventListener('click', () => setView(el.dataset.switch)));
    const form = document.querySelector('#auth-form');
    if (form) form.addEventListener('submit', submit);
  }
  return { bind };
})();

document.addEventListener('DOMContentLoaded', Auth.bind);

