document.addEventListener('DOMContentLoaded', () => {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;
  const map = L.map('map').setView([22.5, 70.5], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

  const temples = [
    { name: 'Somnath', coords: [20.888, 70.401], desc: 'First Jyotirlinga on the western coast.' },
    { name: 'Dwarka', coords: [22.237, 68.967], desc: 'Ancient city of Lord Krishna.' },
    { name: 'Ambaji', coords: [24.333, 72.851], desc: 'Important Shakti Peeth in Aravali.' },
    { name: 'Pavagadh', coords: [22.466, 73.516], desc: 'Durga temple atop volcanic hill.' }
  ];

  temples.forEach(t => {
    const m = L.marker(t.coords).addTo(map);
    const goto = `https://www.google.com/maps/dir/?api=1&destination=${t.coords[0]},${t.coords[1]}`;
    m.bindPopup(`<strong>${t.name}</strong><br>${t.desc}<br><br><a href="${goto}" target="_blank" rel="noopener" class="btn btn-primary" style="display:inline-block;padding:6px 10px;border-radius:8px;margin-top:6px;color:#fff">Let's Go</a>`);
  });
});

