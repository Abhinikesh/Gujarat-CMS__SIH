document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ once: true, duration: 600, easing: 'ease-out' });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Mobile menu
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

  // Dark mode
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  themeBtn && themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Back to top
  const backTop = document.getElementById('back-to-top');
  if (backTop) {
    window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 300));
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Services modal
  const modal = document.getElementById('service-modal');
  const title = document.getElementById('service-title');
  const desc = document.getElementById('service-desc');
  const close = modal.querySelector('.close');
  document.querySelectorAll('.service .learn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service');
      const name = card.dataset.service;
      title.textContent = name;
      desc.textContent = `${name} details: This demo modal shows how we provide deep dive information about the selected service, including workflows, sensors, and alert logic.`;
      modal.classList.add('open');
    });
  });
  close.addEventListener('click', () => modal.classList.remove('open'));

  // Charts with simulated updates
  const crowdCtx = document.getElementById('crowdChart');
  const trafficCtx = document.getElementById('trafficChart');
  const crowdChart = new Chart(crowdCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Crowd', data: [], borderColor: '#0A1D37', backgroundColor: 'rgba(10,29,55,.15)', fill: true, tension: .35 }] },
    options: { responsive: true, plugins: { legend: { display: true } } }
  });
  const trafficChart = new Chart(trafficCtx, {
    type: 'bar',
    data: { labels: ['Somnath','Dwarka','Ambaji','Pavagadh'], datasets: [{ label: 'Traffic Level', data: [0,0,0,0], backgroundColor: ['#16a34a','#f59e0b','#dc2626','#FFD700'] }] },
    options: { responsive: true, plugins: { legend: { display: true } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1, callback:v=>v } } } }
  });

  function simulate() {
    // update time series
    const now = new Date();
    crowdChart.data.labels.push(now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}));
    if (crowdChart.data.labels.length > 12) { crowdChart.data.labels.shift(); crowdChart.data.datasets[0].data.shift(); }
    crowdChart.data.datasets[0].data.push(2000 + Math.floor(Math.random()*5000));
    crowdChart.update();

    // update traffic levels 0-3
    trafficChart.data.datasets[0].data = [
      Math.floor(Math.random()*3),
      Math.floor(Math.random()*3),
      Math.floor(Math.random()*3),
      Math.floor(Math.random()*3)
    ];
    trafficChart.update();

    // summary and emergency
    const totals = [0,1,2,3].map(()=>1500+Math.floor(Math.random()*6000));
    const total = totals.reduce((a,b)=>a+b,0);
    const avgWait = 10 + Math.floor(Math.random()*30);
    document.getElementById('sumTotal').textContent = total.toLocaleString();
    document.getElementById('avgWait').textContent = `${avgWait} mins`;
    const hasRed = trafficChart.data.datasets[0].data.some(v=>v>=2);
    const safety = document.getElementById('safety');
    safety.className = 'status-pill ' + (hasRed ? 'pill-red' : 'pill-green');
    safety.textContent = hasRed ? 'Attention' : 'Normal';
    document.getElementById('lastUpdated').textContent = `Last updated ${now.toLocaleTimeString()}`;
    document.getElementById('emergency').textContent = Math.random()<0.1 ? 'Heat advisory near main gate.' : 'No active alerts.';
  }
  simulate();
  setInterval(simulate, 5000);

  // Contact form (frontend-only demo)
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Message sent! We will contact you soon.');
    form.reset();
  });
});

