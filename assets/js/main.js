// Smooth scroll and active nav
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Highlight active nav by pathname
  const path = location.pathname.replace(/\/?$/, '/');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && path.endsWith(href.replace('./',''))) a.classList.add('active');
  });

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Dark mode toggle
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
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
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) backTop.classList.add('show'); else backTop.classList.remove('show');
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Scroll animations with performance optimization
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections for scroll animations
  document.querySelectorAll('.card, .section').forEach(el => {
    observer.observe(el);
  });

  // Parallax effect for hero background with throttling
  let ticking = false;
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero img.bg');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
});

// Virtual Tour functionality
function openVirtualTour(templeName) {
  const templeData = {
    somnath: {
      title: 'Somnath Temple - 360° Virtual Tour',
      description: 'Experience the divine aura of Somnath Temple, one of the twelve Jyotirlinga shrines dedicated to Lord Shiva.',
      videoUrl: 'https://www.youtube.com/embed/1La4QzGeaaQ',
      features: [
        '360° panoramic view of the temple complex',
        'Interactive exploration of the main shrine',
        'Historical significance and architecture details',
        'Virtual darshan experience'
      ]
    },
    dwarka: {
      title: 'Dwarkadhish Temple - 360° Virtual Tour',
      description: 'Explore the ancient city of Dwarka and the magnificent temple dedicated to Lord Krishna.',
      videoUrl: 'https://www.youtube.com/embed/1La4QzGeaaQ',
      features: [
        'Complete temple complex tour',
        'Ancient architecture exploration',
        'Spiritual significance of each area',
        'Interactive shrine navigation'
      ]
    },
    ambaji: {
      title: 'Ambaji Temple - 360° Virtual Tour',
      description: 'Visit the sacred Shakti Peetha dedicated to Goddess Amba in the beautiful Aravalli hills.',
      videoUrl: 'https://www.youtube.com/embed/1La4QzGeaaQ',
      features: [
        'Hilltop temple complex view',
        'Sacred shrine exploration',
        'Panoramic mountain views',
        'Spiritual energy points'
      ]
    },
    pavagadh: {
      title: 'Pavagadh Kalika Temple - 360° Virtual Tour',
      description: 'Experience the historic hill temple of Goddess Kalika with its ropeway access and panoramic views.',
      videoUrl: 'https://www.youtube.com/embed/1La4QzGeaaQ',
      features: [
        'Hill temple complex tour',
        'Ropeway journey simulation',
        'Historical significance exploration',
        'Panoramic valley views'
      ]
    }
  };

  const temple = templeData[templeName];
  if (!temple) return;

  // Create modal for virtual tour
  const modal = document.createElement('div');
  modal.className = 'modal open';
  modal.id = 'virtual-tour-modal';
  modal.innerHTML = `
    <div class="panel virtual-tour-modal" style="max-width: 900px; width: 95%;">
      <header>
        <h3 class="title">${temple.title}</h3>
        <button class="close" aria-label="Close" onclick="closeVirtualTour()">✕</button>
      </header>
      <div class="virtual-tour-content">
        <div class="video-container" style="position: relative; padding-top: 56.25%; margin-bottom: 20px;">
          <iframe style="position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 12px;" 
                  src="${temple.videoUrl}" 
                  title="${temple.title}" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen>
          </iframe>
        </div>
        <div class="tour-info">
          <p class="tour-description" style="color: var(--muted); margin-bottom: 20px; font-size: 1.1rem; line-height: 1.6;">
            ${temple.description}
          </p>
          <div class="tour-features">
            <h4 style="color: var(--primary); margin-bottom: 15px; font-size: 1.2rem;">Tour Features:</h4>
            <ul style="color: var(--text-secondary); line-height: 1.8;">
              ${temple.features.map(feature => `<li>• ${feature}</li>`).join('')}
            </ul>
          </div>
          <div class="tour-actions" style="margin-top: 30px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="window.open('${temple.videoUrl}', '_blank')">Open Full Tour</button>
            <button class="btn btn-outline" onclick="closeVirtualTour()">Close Tour</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closeVirtualTour() {
  const modal = document.getElementById('virtual-tour-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeVirtualTour();
  }
});

