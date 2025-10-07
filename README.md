# Temple & Pilgrimage Crowd Management System

Professional demo site for managing pilgrim crowds at Somnath, Dwarka, Ambaji, and Pavagadh.

## Tech Stack
- Frontend: HTML, CSS, JavaScript, Chart.js
- Backend: Node.js, Express (simulated APIs)

## Features
- Multi-page: Home, About, Services, Dashboard, Contact
- Sticky navbar, responsive layout, royal blue & gold theme
- Login/Signup modal with basic validation (mock auth)
- Dashboard with live polling from `/api/status` and Chart.js visualizations
- Contact form posting to `/contact`

## Getting Started
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Project Structure
```
public/
  index.html, about.html, services.html, dashboard.html, contact.html
  assets/
    css/styles.css
    js/main.js, dashboard.js, auth.js
server.js
```

## Notes
- All data is simulated in-memory for demo purposes.
- Do not use the mock auth in production.

