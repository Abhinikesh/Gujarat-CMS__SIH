let lineChart, barChart;
let currentTemple = 'Somnath';

async function fetchStatus() {
  const [statusRes, templesRes] = await Promise.all([
    fetch('/api/status'),
    fetch('/api/data')
  ]);
  const status = await statusRes.json();
  const temples = await templesRes.json();
  const selected = temples.find(t => t.temple === currentTemple) || temples[0];
  updateSummary(temples);
  updateWidgets(selected, status);
  updateCharts(status);
  const ts = new Date(status.updatedAt).toLocaleTimeString();
  const last = document.getElementById('lastUpdated');
  if (last) last.textContent = `Last updated ${ts}`;
}

function updateWidgets(selected, status) {
  countUp('crowdCount', selected.crowd);
  countUp('queueLength', selected.queueTime);
  document.getElementById('parking').textContent = selected.parking;
  const pill = document.getElementById('trafficPill');
  pill.className = 'status-pill ' + (status.trafficLevel === 'green' ? 'pill-green' : status.trafficLevel === 'yellow' ? 'pill-yellow' : 'pill-red');
  pill.textContent = status.trafficLevel.charAt(0).toUpperCase() + status.trafficLevel.slice(1);
  const e = document.getElementById('emergency');
  e.textContent = status.emergency.active ? status.emergency.message : 'No active alerts.';
}

function initCharts() {
  const lc = document.getElementById('lineChart');
  const bc = document.getElementById('barChart');
  lineChart = new Chart(lc, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Crowd Count', data: [], borderColor: '#0A1D37', backgroundColor: 'rgba(10,29,55,.15)', tension: .35, fill: true, pointRadius: 2, pointHoverRadius: 4 }] },
    options: { responsive: true, plugins: { legend: { display: true }, tooltip: { mode: 'index', intersect: false } }, interaction: { mode: 'index', intersect: false }, scales: { y: { beginAtZero: false } } }
  });
  barChart = new Chart(bc, {
    type: 'bar',
    data: { labels: ['Gate A','Gate B','Gate C','Gate D'], datasets: [{ label: 'People', data: [0,0,0,0], backgroundColor: ['#0A1D37','#12345b','#446b9a','#FFD700'] }] },
    options: { responsive: true, plugins: { legend: { display: true }, tooltip: { mode: 'index', intersect: false } }, scales: { y: { beginAtZero: true } } }
  });
}

function updateCharts(data) {
  const labels = data.series.map(p => new Date(p.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
  const values = data.series.map(p => p.count);
  lineChart.data.labels = labels;
  lineChart.data.datasets[0].data = values;
  lineChart.update();
  // distribute current crowd across gates randomly for demo
  const a = Math.floor(data.crowdCount * 0.25 + Math.random()*300);
  const b = Math.floor(data.crowdCount * 0.30 + Math.random()*300);
  const c = Math.floor(data.crowdCount * 0.20 + Math.random()*300);
  const d = Math.max(0, data.crowdCount - a - b - c);
  barChart.data.datasets[0].data = [a,b,c,d];
  barChart.update();
}

document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  const sel = document.getElementById('templeSel');
  if (sel) sel.addEventListener('change', e => { currentTemple = e.target.value; fetchStatus(); });
  fetchStatus();
  setInterval(fetchStatus, 5000);
});

function updateSummary(temples) {
  const total = temples.reduce((s, t) => s + t.crowd, 0);
  const avg = Math.round(temples.reduce((s, t) => s + t.queueTime, 0) / temples.length);
  const hasRed = temples.some(t => t.parking === 'Red');
  const sumEl = document.getElementById('sumTotal');
  const avgEl = document.getElementById('avgWait');
  const safety = document.getElementById('safety');
  if (sumEl) sumEl.textContent = total.toLocaleString();
  if (avgEl) avgEl.textContent = `${avg} mins`;
  if (safety) {
    safety.className = 'status-pill ' + (hasRed ? 'pill-red' : 'pill-green');
    safety.textContent = hasRed ? 'Attention' : 'Normal';
  }
}

function countUp(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = parseInt(el.textContent.replace(/,/g, '')) || 0;
  const duration = 600;
  const startTime = performance.now();
  function step(now) {
    const p = Math.min(1, (now - startTime) / duration);
    const cur = Math.floor(start + (value - start) * p);
    el.textContent = cur.toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

