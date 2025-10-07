const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// In-memory stores (simulate DB)
const messages = [];
const users = new Map(); // email -> { email, passwordHash }

// Utility: simulated data generator (legacy single-temple)
function generateDashboardData() {
  const now = Date.now();
  const crowdCount = 2000 + Math.floor(Math.random() * 5000); // 2k-7k
  const queueLength = Math.floor(crowdCount / 50) + Math.floor(Math.random() * 50);
  const trafficLevel = ['green', 'yellow', 'red'][Math.floor(Math.random() * 3)];
  const parkingAvailability = Math.max(0, 500 - Math.floor(crowdCount / 20));
  const emergency = Math.random() < 0.05 ? {
    active: true,
    message: 'Heat advisory in effect. Hydration points increased near main gates.'
  } : { active: false };

  // produce time-series for charts (last 12 points)
  const series = Array.from({ length: 12 }).map((_, idx) => ({
    timestamp: now - (11 - idx) * 5 * 60 * 1000,
    count: 1500 + Math.floor(Math.random() * 6000)
  }));

  return {
    updatedAt: now,
    crowdCount,
    queueLength,
    trafficLevel,
    parkingAvailability,
    emergency,
    series
  };
}

// Utility: new multi-temple simulated data
function generateTempleArray() {
  const temples = ['Somnath', 'Dwarka', 'Ambaji', 'Pavagadh'];
  const levels = ['Green', 'Yellow', 'Red'];
  return temples.map(t => ({
    temple: t,
    crowd: 1500 + Math.floor(Math.random() * 6000),
    queueTime: 5 + Math.floor(Math.random() * 45),
    parking: levels[Math.floor(Math.random() * levels.length)]
  }));
}

// API routes
app.get('/api/status', (req, res) => {
  res.json(generateDashboardData());
});
app.get('/api/data', (req, res) => {
  res.json(generateTempleArray());
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'All fields are required' });
  }
  const entry = { name, email, message, receivedAt: Date.now() };
  messages.push(entry);
  // Persist to JSON file (append semantics)
  const file = path.join(__dirname, 'messages.json');
  try {
    let arr = [];
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf8');
      arr = raw ? JSON.parse(raw) : [];
    }
    arr.push(entry);
    fs.writeFileSync(file, JSON.stringify(arr, null, 2));
  } catch (e) {
    console.error('Failed to persist message:', e);
  }
  return res.json({ ok: true });
});

// Simple auth mock (DO NOT use in production)
app.post('/auth/signup', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: 'Email and password required' });
  }
  if (users.has(email)) {
    return res.status(409).json({ ok: false, error: 'User already exists' });
  }
  users.set(email, { email, passwordHash: `plain:${password}` });
  res.json({ ok: true });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = users.get(email);
  if (!user || user.passwordHash !== `plain:${password}`) {
    return res.status(401).json({ ok: false, error: 'Invalid credentials' });
  }
  res.json({ ok: true, token: 'mock-token', user: { email } });
});

// 404 handler for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' });
});

// Serve 404 page for non-file routes
app.use((req, res) => {
  const candidate = path.join(__dirname, 'public', req.path);
  if (fs.existsSync(candidate)) return res.sendFile(candidate);
  const notFound = path.join(__dirname, 'public', '404.html');
  if (fs.existsSync(notFound)) return res.status(404).sendFile(notFound);
  return res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


