<div align="center">

<img src="https://img.shields.io/badge/Temple%20CMS-v1.0.0-6C63FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTV6TTIgMTdsOSA1IDktNVY3bC05IDV6Ii8+PC9zdmc+" alt="Temple CMS"/>

# 🛕 Temple & Pilgrimage Crowd Management System

### *Safe & Seamless Pilgrimage Experience*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-abhinikesh.github.io-6C63FF?style=for-the-badge)](https://abhinikesh.github.io)
[![GitHub Stars](https://img.shields.io/github/stars/abhinikesh/temple-cms?style=for-the-badge&color=FFD700)](https://github.com/abhinikesh/temple-cms)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)

<br/>

> A smart, real-time crowd management platform for Gujarat's most sacred pilgrimage sites — Somnath, Dwarka, Ambaji, and Pavagadh.

<br/>

---

</div>

## 📸 Screenshots

<div align="center">

| Landing Page | 360° Virtual Tour |
|:---:|:---:|
| ![Landing](./screenshots/landing.png) | ![Virtual Tour](./screenshots/virtual-tour.png) |

| Live Dashboard | Contact Page |
|:---:|:---:|
| ![Dashboard](./screenshots/dashboard.png) | ![Contact](./screenshots/contact.png) |

</div>

---

## ✨ Features

### 🏛️ Core Modules

| Feature | Description |
|---------|-------------|
| 🎟️ **Book Darshan** | Slot-based entry booking to prevent overcrowding at entry points |
| 📊 **Live Crowd Dashboard** | Real-time crowd count, virtual queue, traffic & parking status per temple |
| 🌐 **360° Virtual Tours** | Immersive virtual visits to Somnath, Dwarkadhish, Ambaji & Pavagadh |
| 🚨 **Emergency Alerts** | Live safety alerts and compliance monitoring across all gates |
| 🗺️ **Temple Locations** | Interactive map integration for all pilgrimage sites |
| 🌙 **Dark / Light Mode** | Seamless theme toggle for comfortable viewing |

### 📈 Dashboard Metrics
- **Live Crowd Count** — gate-wise real-time headcount
- **Virtual Queue** — smart digital queuing with wait time estimates
- **Traffic Status** — color-coded traffic indicators (Green / Yellow / Red)
- **Parking Availability** — live slot tracking at all temple premises
- **Crowd Count Chart** — last-hour trend visualization
- **Gate-wise Distribution** — breakdown across Gate A, B, C & D

---

## 🏗️ Project Architecture
temple-cms/
├── frontend/               # React + Vite user-facing app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── VirtualTour.jsx
│   │   │   └── Contact.jsx
│   │   └── components/
├── admin/                  # Admin panel (React)
│   └── src/
│       ├── pages/
│       │   ├── dashboard/
│       │   ├── users/
│       │   ├── categories/
│       │   ├── audit/
│       │   └── settings/
│       └── store/slices/
├── backend/                # Node.js / Express API
├── provider/               # Service provider portal
└── user/                   # User portal

---

## 🛕 Supported Temples

| Temple | Location | Deity | Significance |
|--------|----------|-------|--------------|
| **Somnath Temple** | Gir Somnath, Gujarat | Lord Shiva | One of the 12 Jyotirlinga shrines |
| **Dwarkadhish Temple** | Dwarka, Gujarat | Lord Krishna | One of the 4 sacred dhams |
| **Ambaji Temple** | Banaskantha, Gujarat | Goddess Amba | Shakti Peetha in the Aravalli range |
| **Pavagadh Kalika Temple** | Panchmahal, Gujarat | Goddess Kalika | Historic hilltop temple, accessible by ropeway |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, Vite, Tailwind CSS |
| **State Management** | Redux Toolkit |
| **Charts** | Recharts |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT |
| **Hosting** | GitHub Pages |

</div>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

**Abhinikesh & Team**

[![GitHub](https://img.shields.io/badge/GitHub-abhinikesh-181717?style=flat-square&logo=github)](https://github.com/abhinikesh)

---

<div align="center">

**© 2026 Temple CMS · Made with ❤️ for Pilgrims**

*Helping millions experience a safe & seamless pilgrimage*

⭐ If this project helped you, please give it a star!

</div>
