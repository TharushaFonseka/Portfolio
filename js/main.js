/* ==========================================================================
   THARUSHA FONSEKA - PORTFOLIO INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initSplashScreen();
  initNavigation();
  initColorRevealEffect();
  initSkillFilters();
  initProjectFilters();
  initProjectModals();
  initCVModal();
  initContactForm();
  initScrollAnimations();
});

/* --- Custom Cursor (Disabled) --- */
function initCustomCursor() {
  return;
}

/* --- Kinetic Splash Screen --- */
function initSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  const enterBtn = document.getElementById('splash-enter-btn');
  if (!splashScreen || !enterBtn) return;

  enterBtn.addEventListener('click', () => {
    splashScreen.classList.add('dismissed');
    document.body.style.overflow = 'auto';
    playEntranceSound();
    triggerHeroAnimations();
  });

  // Prevent scroll while splash is active
  if (!splashScreen.classList.contains('dismissed')) {
    document.body.style.overflow = 'hidden';
  }
}

function playEntranceSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    // Web Audio API might be muted or not allowed
  }
}

function triggerHeroAnimations() {
  const heroElements = document.querySelectorAll('.hero-giant-title, .hero-description, .hero-cta-group, .hero-portrait-wrapper');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150 * index);
  });
}

/* --- Navigation & Mobile Menu --- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link on scroll
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }
}

/* --- Realistic B&W to Color Spotlight Reveal Effect --- */
function initColorRevealEffect() {
  const container = document.querySelector('.hero-portrait-wrapper');
  const colorImg = document.querySelector('.hero-portrait-color');
  if (!container || !colorImg) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    colorImg.style.clipPath = `circle(125px at ${x}px ${y}px)`;
  });

  container.addEventListener('mouseleave', () => {
    colorImg.style.clipPath = `circle(0px at 50% 50%)`;
  });
}

/* --- Skill Filters & Animations --- */
function initSkillFilters() {
  const skillBtns = document.querySelectorAll('#skills .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      skillCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Animate skill progress bars when in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-progress-fill');
        fills.forEach(fill => {
          fill.style.width = fill.dataset.level || '85%';
        });
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
}

/* --- Project Filters --- */
function initProjectFilters() {
  const projectBtns = document.querySelectorAll('#projects .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

/* --- Project Modals --- */
const projectData = {
  barber: {
    title: "Online Barber Booking Mobile Application",
    category: "Mobile App • Android Studio & Kotlin",
    image: "assets/project_barber.jpg?v=4.0",
    description: "Designed and developed a sleek mobile barber booking application using Android Studio and Kotlin. Implemented complete user authentication, appointment scheduling, real-time booking management, barber catalog views, and integrated SQLite for lightweight, reliable local data storage.",
    gallery: [
      {
        src: "assets/barber_doc_01.png",
        pill: "01. App Logo & Launch",
        title: "01. App Logo and Launch Screen",
        desc: "Branded application launcher splash screen featuring scissor emblem and salon visual identity."
      },
      {
        src: "assets/barber_doc_02.png",
        pill: "02. Onboarding 01",
        title: "02. User Onboarding Screens 01",
        desc: "First onboarding screen highlighting 'Professional Service - Professionalism at its peak'."
      },
      {
        src: "assets/barber_doc_03.png",
        pill: "03. Onboarding 02",
        title: "03. User Onboarding Screens 02",
        desc: "Second onboarding screen with 'Book Online - Go ahead and book an appointment with us online'."
      },
      {
        src: "assets/barber_doc_04.png",
        pill: "04. Sign In",
        title: "04. Sign In",
        desc: "User login authentication interface with Email, Password, Remember Me, and Facebook/Google social sign in."
      },
      {
        src: "assets/barber_doc_05.png",
        pill: "05. Sign Up",
        title: "05. Sign Up",
        desc: "New user registration form with Name, Email, Phone number, Password, and Password Confirmation."
      },
      {
        src: "assets/barber_doc_06.png",
        pill: "06. Home",
        title: "06. Home",
        desc: "Main discovery dashboard featuring 50% OFF Family Treat Promo, service category filters (HairCut, BeardCut, Shaves), and top barbering shops."
      },
      {
        src: "assets/barber_doc_07.png",
        pill: "07. Favorite",
        title: "07. Favorite",
        desc: "Saved favorites collection displaying top-rated barber shops (Razor Hair, Liyo Saloon, Handsome) with star ratings."
      },
      {
        src: "assets/barber_doc_08.png",
        pill: "08. Booked",
        title: "08. Booked",
        desc: "Active booking schedule screen displaying upcoming appointment details (Tuesday 12th 2pm-4pm at Razor Hair) with cancellation terms."
      },
      {
        src: "assets/barber_doc_09.png",
        pill: "09. Profile",
        title: "09. Profile",
        desc: "User profile management screen featuring avatar, contact email (tharushafonseka01@gmail.com), Edit bio, and navigation shortcuts."
      },
      {
        src: "assets/barber_doc_10.png",
        pill: "10. Info",
        title: "10. Info",
        desc: "Side navigation drawer overlay menu providing quick access to Home, Favorite, Booked, Profile, and App Settings (Build v25.08.11)."
      },
      {
        src: "assets/barber_doc_11.png",
        pill: "11. Barber Description",
        title: "11. Barber Profile (Description)",
        desc: "Barber bio view displaying 15 years experience, 4.5 star rating, contact phone/WhatsApp/Instagram, and pricing."
      },
      {
        src: "assets/barber_doc_12.png",
        pill: "12. Barber Reviews",
        title: "12. Barber Profile (Reviews)",
        desc: "Customer ratings & reviews tab displaying feedback from clients (Arthur 4.5★, Kyle 4.0★, Tom 5.0★, John 4.1★)."
      },
      {
        src: "assets/barber_doc_13.png",
        pill: "13. Shop Location",
        title: "13. Barber Profile (Shop Location)",
        desc: "Shop location tab with integrated Google Maps view showing Kaduwela Road, Thalahena Malabe & Malabe Junction marker pin."
      },
      {
        src: "assets/barber_doc_14.png",
        pill: "14. Booking",
        title: "14. Booking",
        desc: "Appointment date & time slot selection calendar picker with advance payment agreement checkbox."
      },
      {
        src: "assets/barber_doc_15.png",
        pill: "15. Booking Success",
        title: "15. Booking Success",
        desc: "Modal popup confirmation overlay indicating successful scheduling and local SQLite database persistence."
      }
    ],
    features: [
      "User registration, login, and profile management",
      "Appointment date & slot picker with barber selection",
      "Interactive style catalog with haircut pricing",
      "SQLite local database integration for offline caching",
      "Modern Android Material UI/UX design principles"
    ],
    tech: ["Android Studio", "Kotlin", "SQLite", "Material UI", "Figma"]
  },
  vr: {
    title: "Dragon Rider: Journey to the Hidden World (VR Experience)",
    category: "VR & 3D • Unity & Meta Quest",
    image: "assets/project_vr.jpg?v=3.0",
    isVR: true,
    gallery: [
      {
        src: "assets/vr_screen1.jpg",
        pill: "1. VR Sky Environment",
        title: "Dragon Rider 3D Fantasy Environment View (IMG_7013)",
        desc: "High-fidelity Unity 3D fantasy environment displaying dynamic skybox lighting, mountain terrain, and VR headset flight field-of-view."
      },
      {
        src: "assets/dragon_flight_rig.jpg",
        pill: "2. Dragon & Flight Controls",
        title: "Physical Motion Saddle Rig & Dragon Flight Controls",
        desc: "Mechanical design sketches of the custom dragon-riding saddle mechanism alongside real-world physical motion prototype testing paired with Meta Quest VR flight controls."
      }
    ],
    description: "An immersive Virtual Reality adventure project developed using Unity Engine, C#, and Meta Quest VR headset with Unity XR Toolkit. Created intuitive hand-tracked flight mechanics, dynamic 3D sky environments, quest objective markers, and optimized rendering performance.",
    features: [
      "Intuitive VR flight mechanics using Unity XR Toolkit",
      "Custom mechanical saddle rig design & physical motion prototype",
      "Interactive dragon movement & hand-tracked flight controls",
      "Optimized framerate and latency for Meta Quest headsets",
      "Engaging audio spatialization & HUD mini-map"
    ],
    tech: ["Unity 3D", "C#", "Unity XR Toolkit", "Meta Quest", "Blender"]
  },
  fridge: {
    title: "Smart Refrigerator UX Design & Prototype",
    category: "UI/UX Design • Figma & Physical Mockup",
    image: "assets/hero-u86Y_A8e.jpeg",
    physicalImage: "assets/fridge_physical_mockup.jpg",
    video: "assets/fridge.MOV",
    demoUrl: "Smart Refrigerator OS • Touch Display & Mobile Companion Sync",
    videoHeaderIcon: "fas fa-microchip",
    videoTabTitle: "Interactive Touch Screen Demo",
    videoCaptionTitle: "Smart Refrigerator UI & Physical Prototype Walkthrough",
    videoCaption: "High-fidelity UX prototype demonstration showcasing real-time touch interaction on the smart refrigerator door display, food inventory management, automated expiry alerts, and mobile companion app sync.",
    physicalCaptionTitle: "Elora Smart Cooling Refrigerator — Physical Prototype Model",
    physicalCaptionDesc: "Custom built physical display mock-up featuring dual-compartment handles, internal sectional cooling system documentation box, and integrated electronics.",
    description: "Conducted extensive user research to solve food waste and inventory tracking issues. Designed user flows, interactive high-fidelity UI prototypes in Figma, and built a physical display mock-up to demonstrate real-time touch interaction and mobile app companion sync.",
    features: [
      "Comprehensive user research & persona mapping",
      "Smart inventory tracker with automated expiry alerts",
      "Recipe suggestion engine based on available ingredients",
      "Mobile companion app synchronization flows",
      "Accessibility-focused UI with dark theme aesthetics"
    ],
    tech: ["Figma", "UI/UX Research", "Wireframing", "Prototyping", "User Testing"]
  },
  vehicle: {
    title: "RentXpress — Online Vehicle Booking System",
    category: "Web Application • MERN Stack",
    image: "assets/project_vehicle.jpg?v=2.0",
    video: "assets/vehicle_demo.mp4",
    demoUrl: "https://rentxpress.app/live-demo",
    videoCaption: "Full-stack MERN application video recording showcasing user login, luxury fleet inventory filtering, vehicle details page, and booking reservation workflow.",
    description: "Collaborated in the development of a full-stack web application for renting luxury vehicles. Built using MongoDB, Express.js, React, and Node.js with responsive screen layouts, interactive map filtering, and seamless booking reservation flows.",
    features: [
      "Full MERN stack architecture (MongoDB, Express, React, Node)",
      "Interactive location map with available fleet markers",
      "Multi-criteria filter parameters (class, price, features)",
      "Responsive layout optimized for mobile, tablet, and desktop",
      "Backend RESTful API authentication & reservation logic"
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript"]
  },
  hospital: {
    title: "Hospital Management System",
    category: "Web Application • Java & MySQL",
    image: "assets/hospitalManagementSystem.jpeg",
    video: "assets/hospitalManagementSystem.mp4",
    demoUrl: "https://hospital-management-system.local/demo",
    videoCaption: "Enterprise Java & MySQL web portal video walkthrough featuring doctor/patient scheduling matrix, record management, and secure MVC backend integration.",
    description: "Designed and implemented an enterprise Hospital Management System using Java, JSP, Servlets, and MySQL database. Utilized Model-View-Controller (MVC) architecture to ensure strict separation of concerns, patient/doctor scheduling grids, and secure database connectivity.",
    features: [
      "Complete CRUD functionality for patient & doctor records",
      "Weekly doctor scheduling matrix & appointment tracking",
      "MVC architecture for scalable codebase maintenance",
      "Secure MySQL database connectivity with PreparedStatements",
      "Department analytics dashboard & patient inflow reports"
    ],
    tech: ["Java", "JSP", "Servlets", "MySQL", "MVC Architecture"]
  },
  jonty: {
    title: "Jonty Clothing Brand Digital Marketing & Graphic Design",
    category: "Graphic Design • Branding & Marketing",
    image: "assets/Couple-Tshirt-MockUp.webp_2K_202609091455.jpeg",
    isPoster: true,
    gallery: [
      {
        src: "assets/Breaking_Barriers_(9;16)_JPG.jpg",
        pill: "1. Breaking Barriers",
        title: "Jonty Streetwear Campaign — Breaking Barriers (9:16)",
        desc: "High-impact typography poster design and visual composition created for the Jonty AW24 promotional marketing campaign."
      },
      {
        src: "assets/Dont_Judge_By_Cover_(9;16)_JPG.jpg",
        pill: "2. Don't Judge By Cover",
        title: "Jonty Streetwear Campaign — Don't Judge By Cover (9:16)",
        desc: "Dark streetwear aesthetic campaign asset featuring bold model photography and apparel branding typography."
      },
      {
        src: "assets/Hunt_Your_Dream_(9;16)_JPG.jpg",
        pill: "3. Hunt Your Dream",
        title: "Jonty Streetwear Campaign — Hunt Your Dream (9:16)",
        desc: "Dynamic digital marketing graphic poster optimized for vertical social media feeds and streetwear promotion."
      },
      {
        src: "assets/I_Build_My_Future_(9;16)_JPG.jpg",
        pill: "4. I Build My Future",
        title: "Jonty Streetwear Campaign — I Build My Future (9:16)",
        desc: "Urban streetwear typography banner designed in Photoshop and Illustrator for brand identity promotion."
      },
      {
        src: "assets/Wings_Over_Chains_(9;16)_JPG.jpg",
        pill: "5. Wings Over Chains",
        title: "Jonty Streetwear Campaign — Wings Over Chains (9:16)",
        desc: "Symbolic streetwear branding graphic poster created for social media campaign distribution and apparel marketing."
      }
    ],
    description: "Planned and executed comprehensive digital marketing strategies for Jonty Clothing brand. Created promotional posters, streetwear visual identity graphics, social media marketing campaigns, and brand identity guidelines.",
    features: [
      "High-impact poster design using typography & color theory",
      "Social media marketing campaign graphics & content calendar",
      "Audience research & content engagement optimization",
      "Brand style guide, apparel mockups, and promotional banners"
    ],
    tech: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "Branding", "Typography"]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const projectBtns = document.querySelectorAll('.project-card .project-btn');
  const mediaContainer = document.getElementById('modal-media-container');

  if (!modalOverlay || !closeBtn || !mediaContainer) return;

  let currentGalleryIndex = 0;
  let galleryAutoPlayTimer = null;

  function stopGalleryAutoPlay() {
    if (galleryAutoPlayTimer) {
      clearInterval(galleryAutoPlayTimer);
      galleryAutoPlayTimer = null;
    }
  }

  function startGalleryAutoPlay(gallery, updateFn, interval = 2800) {
    stopGalleryAutoPlay();
    if (!gallery || gallery.length <= 1) return;
    galleryAutoPlayTimer = setInterval(() => {
      currentGalleryIndex = (currentGalleryIndex + 1) % gallery.length;
      updateFn(gallery, currentGalleryIndex);
    }, interval);
  }

  projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      stopGalleryAutoPlay();
      const projectKey = btn.dataset.project;
      const data = projectData[projectKey];
      if (!data) return;

      document.getElementById('modal-project-title').textContent = data.title;
      document.getElementById('modal-project-cat').textContent = data.category;
      document.getElementById('modal-project-desc').textContent = data.description;

      const featuresList = document.getElementById('modal-project-features');
      featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

      const techContainer = document.getElementById('modal-project-tech');
      techContainer.innerHTML = data.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');

      if (data.video) {
        renderVideoShowcase(data);
      } else if (data.gallery && data.gallery.length > 0) {
        currentGalleryIndex = 0;
        if (data.isVR) {
          renderVRGallery(data.gallery, currentGalleryIndex);
        } else if (data.isPoster) {
          renderPosterGallery(data.gallery, currentGalleryIndex);
        } else {
          renderPhoneGallery(data.gallery, currentGalleryIndex);
        }
      } else {
        mediaContainer.innerHTML = `<img id="modal-project-img" src="${data.image}" alt="${data.title}" class="modal-image">`;
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      const colLeft = modalOverlay.querySelector('.modal-col-left');
      const colRight = modalOverlay.querySelector('.modal-col-right');
      if (colLeft) colLeft.scrollTop = 0;
      if (colRight) colRight.scrollTop = 0;
    });
  });

  function renderVideoShowcase(data) {
    stopGalleryAutoPlay();
    const addressUrl = data.demoUrl || "https://demo.app/live-preview";
    const captionDesc = data.videoCaption || data.description;
    const tabTitle = data.videoTabTitle || "Live Web Demo Video";
    const captionTitle = data.videoCaptionTitle || "Live Screen Recording Walkthrough";
    const headerIcon = data.videoHeaderIcon || "fas fa-lock";

    const hasPhysical = !!data.physicalImage;

    const pillsHtml = `
      <button class="gallery-pill active" id="view-tab-video"><i class="fas fa-play-circle" style="color: var(--accent-lime);"></i> ${tabTitle}</button>
      ${hasPhysical ? `<button class="gallery-pill" id="view-tab-physical"><i class="fas fa-cube" style="color: var(--accent-lime);"></i> Physical Prototype Model</button>` : ''}
      <button class="gallery-pill" id="view-tab-mockup"><i class="fas fa-desktop"></i> Multi-Device Showcase</button>
    `;

    mediaContainer.innerHTML = `
      <div class="video-showcase-wrapper">
        <div class="gallery-nav-pills">
          ${pillsHtml}
        </div>

        <div id="video-display-area" class="browser-mockup-frame">
          <div class="browser-mockup-header">
            <div class="browser-dots">
              <span class="browser-dot red"></span>
              <span class="browser-dot yellow"></span>
              <span class="browser-dot green"></span>
            </div>
            <div class="browser-address-bar">
              <i class="${headerIcon}"></i> ${addressUrl}
            </div>
          </div>
          <video class="video-element" controls poster="${data.image}" autoplay loop muted playsinline style="max-height: 480px; object-fit: contain; background: #000;">
            <source src="${data.video}" type="video/mp4">
            <source src="${data.video}" type="video/quicktime">
            Your browser does not support the video tag.
          </video>
        </div>

        <div id="video-caption-box" class="gallery-caption-box">
          <div class="gallery-caption-title" id="gallery-caption-title-target"><i class="fas fa-video" style="color: var(--accent-lime);"></i> ${captionTitle}</div>
          <div class="gallery-caption-desc" id="gallery-caption-desc-target">${captionDesc}</div>
        </div>
      </div>
    `;

    const tabVideo = mediaContainer.querySelector('#view-tab-video');
    const tabPhysical = mediaContainer.querySelector('#view-tab-physical');
    const tabMockup = mediaContainer.querySelector('#view-tab-mockup');
    const displayArea = mediaContainer.querySelector('#video-display-area');
    const captionTitleTarget = mediaContainer.querySelector('#gallery-caption-title-target');
    const captionDescTarget = mediaContainer.querySelector('#gallery-caption-desc-target');

    function setActiveTab(activeBtn) {
      mediaContainer.querySelectorAll('.gallery-pill').forEach(btn => btn.classList.remove('active'));
      activeBtn.classList.add('active');
    }

    if (tabVideo && displayArea) {
      tabVideo.addEventListener('click', () => {
        setActiveTab(tabVideo);
        displayArea.innerHTML = `
          <div class="browser-mockup-header">
            <div class="browser-dots">
              <span class="browser-dot red"></span>
              <span class="browser-dot yellow"></span>
              <span class="browser-dot green"></span>
            </div>
            <div class="browser-address-bar">
              <i class="${headerIcon}"></i> ${addressUrl}
            </div>
          </div>
          <video class="video-element" controls poster="${data.image}" autoplay loop muted playsinline style="max-height: 480px; object-fit: contain; background: #000;">
            <source src="${data.video}" type="video/mp4">
            <source src="${data.video}" type="video/quicktime">
            Your browser does not support the video tag.
          </video>
        `;
        if (captionTitleTarget) captionTitleTarget.innerHTML = `<i class="fas fa-video" style="color: var(--accent-lime);"></i> ${captionTitle}`;
        if (captionDescTarget) captionDescTarget.textContent = captionDesc;
      });
    }

    if (tabPhysical && displayArea) {
      tabPhysical.addEventListener('click', () => {
        setActiveTab(tabPhysical);
        displayArea.innerHTML = `<img src="${data.physicalImage}" alt="Physical Prototype Model" style="width: 100%; max-height: 520px; object-fit: contain; display: block; border-radius: 0 0 16px 16px; background: #080a08;">`;
        if (captionTitleTarget) captionTitleTarget.innerHTML = `<i class="fas fa-cube" style="color: var(--accent-lime);"></i> ${data.physicalCaptionTitle || 'Physical Prototype Model'}`;
        if (captionDescTarget) captionDescTarget.textContent = data.physicalCaptionDesc || 'Custom physical display mock-up and hardware prototype.';
      });
    }

    if (tabMockup && displayArea) {
      tabMockup.addEventListener('click', () => {
        setActiveTab(tabMockup);
        displayArea.innerHTML = `<img src="${data.image}" alt="${data.title}" style="width: 100%; max-height: 520px; object-fit: contain; display: block; border-radius: 0 0 16px 16px; background: #080a08;">`;
        if (captionTitleTarget) captionTitleTarget.innerHTML = `<i class="fas fa-desktop" style="color: var(--accent-lime);"></i> High-Fidelity UI & Mobile Companion Showcase`;
        if (captionDescTarget) captionDescTarget.textContent = 'Interactive Figma UI design screens, food inventory tracker, recipe suggestion engine, and mobile companion sync flows.';
      });
    }
  }

  function renderVRGallery(gallery, activeIdx) {
    const activeItem = gallery[activeIdx];
    const pillsHtml = gallery.map((item, idx) => 
      `<button class="gallery-pill ${idx === activeIdx ? 'active' : ''}" data-index="${idx}">${item.pill}</button>`
    ).join('');

    mediaContainer.innerHTML = `
      <div class="vr-gallery-wrapper">
        <div class="gallery-nav-pills">${pillsHtml}</div>

        <div class="vr-media-frame">
          <img src="${activeItem.src}" alt="${activeItem.title}" class="vr-media-img" id="vr-screen-target">
          <div class="gallery-controls-overlay">
            <button class="gallery-control-btn" id="vr-prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="gallery-control-btn" id="vr-next-btn"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>

        <div class="gallery-caption-box">
          <div class="gallery-caption-title" id="vr-caption-title">${activeItem.title}</div>
          <div class="gallery-caption-desc" id="vr-caption-desc">${activeItem.desc}</div>
        </div>
      </div>
    `;

    startGalleryAutoPlay(gallery, updateVRScreen);

    const galleryWrapper = mediaContainer.querySelector('.vr-gallery-wrapper');
    if (galleryWrapper) {
      galleryWrapper.addEventListener('mouseenter', stopGalleryAutoPlay);
      galleryWrapper.addEventListener('mouseleave', () => startGalleryAutoPlay(gallery, updateVRScreen));
    }

    const pills = mediaContainer.querySelectorAll('.gallery-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        currentGalleryIndex = parseInt(pill.dataset.index);
        updateVRScreen(gallery, currentGalleryIndex);
        startGalleryAutoPlay(gallery, updateVRScreen);
      });
    });

    const prevBtn = mediaContainer.querySelector('#vr-prev-btn');
    const nextBtn = mediaContainer.querySelector('#vr-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + gallery.length) % gallery.length;
        updateVRScreen(gallery, currentGalleryIndex);
        startGalleryAutoPlay(gallery, updateVRScreen);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % gallery.length;
        updateVRScreen(gallery, currentGalleryIndex);
        startGalleryAutoPlay(gallery, updateVRScreen);
      });
    }
  }

  function updateVRScreen(gallery, idx) {
    const activeItem = gallery[idx];
    const imgTarget = document.getElementById('vr-screen-target');
    const titleTarget = document.getElementById('vr-caption-title');
    const descTarget = document.getElementById('vr-caption-desc');
    const pills = mediaContainer.querySelectorAll('.gallery-pill');

    if (imgTarget) {
      imgTarget.style.opacity = '0.3';
      imgTarget.style.transform = 'scale(0.98)';
      setTimeout(() => {
        imgTarget.src = activeItem.src;
        imgTarget.alt = activeItem.title;
        imgTarget.style.opacity = '1';
        imgTarget.style.transform = 'scale(1)';
      }, 150);
    }

    if (titleTarget) titleTarget.textContent = activeItem.title;
    if (descTarget) descTarget.textContent = activeItem.desc;

    pills.forEach((p, i) => {
      if (i === idx) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  function renderPhoneGallery(gallery, activeIdx) {
    const activeItem = gallery[activeIdx];
    const pillsHtml = gallery.map((item, idx) => 
      `<button class="gallery-pill ${idx === activeIdx ? 'active' : ''}" data-index="${idx}">${item.pill}</button>`
    ).join('');

    mediaContainer.innerHTML = `
      <div class="phone-gallery-wrapper">
        <div class="gallery-nav-pills">${pillsHtml}</div>

        <div class="phone-mockup-frame">
          <div class="phone-mockup-speaker"></div>
          <img src="${activeItem.src}" alt="${activeItem.title}" class="phone-screen-img" id="phone-screen-target">
          <div class="phone-mockup-home-bar"></div>
          <div class="gallery-controls-overlay">
            <button class="gallery-control-btn" id="gallery-prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="gallery-control-btn" id="gallery-next-btn"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>

        <div class="gallery-caption-box">
          <div class="gallery-caption-title" id="gallery-caption-title">${activeItem.title}</div>
          <div class="gallery-caption-desc" id="gallery-caption-desc">${activeItem.desc}</div>
        </div>
      </div>
    `;

    startGalleryAutoPlay(gallery, updateGalleryScreen);

    const galleryWrapper = mediaContainer.querySelector('.phone-gallery-wrapper');
    if (galleryWrapper) {
      galleryWrapper.addEventListener('mouseenter', stopGalleryAutoPlay);
      galleryWrapper.addEventListener('mouseleave', () => startGalleryAutoPlay(gallery, updateGalleryScreen));
    }

    const pills = mediaContainer.querySelectorAll('.gallery-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        currentGalleryIndex = parseInt(pill.dataset.index);
        updateGalleryScreen(gallery, currentGalleryIndex);
        startGalleryAutoPlay(gallery, updateGalleryScreen);
      });
    });

    const prevBtn = mediaContainer.querySelector('#gallery-prev-btn');
    const nextBtn = mediaContainer.querySelector('#gallery-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + gallery.length) % gallery.length;
        updateGalleryScreen(gallery, currentGalleryIndex);
        startGalleryAutoPlay(gallery, updateGalleryScreen);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % gallery.length;
        updateGalleryScreen(gallery, currentGalleryIndex);
        startGalleryAutoPlay(gallery, updateGalleryScreen);
      });
    }
  }

  function updateGalleryScreen(gallery, idx) {
    const activeItem = gallery[idx];
    const imgTarget = document.getElementById('phone-screen-target');
    const titleTarget = document.getElementById('gallery-caption-title');
    const descTarget = document.getElementById('gallery-caption-desc');
    const pills = mediaContainer.querySelectorAll('.gallery-pill');

    if (imgTarget) {
      imgTarget.style.opacity = '0.3';
      imgTarget.style.transform = 'scale(0.96)';
      setTimeout(() => {
        imgTarget.src = activeItem.src;
        imgTarget.alt = activeItem.title;
        imgTarget.style.opacity = '1';
        imgTarget.style.transform = 'scale(1)';
      }, 150);
    }

    if (titleTarget) titleTarget.textContent = activeItem.title;
    if (descTarget) descTarget.textContent = activeItem.desc;

    pills.forEach((p, i) => {
      if (i === idx) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  function renderPosterGallery(gallery, activeIdx) {
    const activeItem = gallery[activeIdx];
    const pillsHtml = gallery.map((item, idx) => 
      `<button class="gallery-pill ${idx === activeIdx ? 'active' : ''}" data-index="${idx}">${item.pill}</button>`
    ).join('');

    mediaContainer.innerHTML = `
      <div class="poster-gallery-wrapper">
        <div class="gallery-nav-pills">${pillsHtml}</div>

        <div class="poster-showcase-frame">
          <div class="poster-frame-header">
            <span class="poster-badge"><i class="fas fa-palette" style="color: var(--accent-lime);"></i> JONTY AW24 // STREETWEAR POSTER ARTWORK</span>
            <span class="poster-counter" id="poster-counter-target">${activeIdx + 1} / ${gallery.length}</span>
          </div>

          <div class="poster-image-container">
            <img src="${activeItem.src}" alt="${activeItem.title}" class="poster-screen-img" id="poster-screen-target">
            <div class="gallery-controls-overlay">
              <button class="gallery-control-btn" id="poster-prev-btn" aria-label="Previous Poster"><i class="fas fa-chevron-left"></i></button>
              <button class="gallery-control-btn" id="poster-next-btn" aria-label="Next Poster"><i class="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </div>

        <div class="gallery-caption-box">
          <div class="gallery-caption-title" id="poster-caption-title">${activeItem.title}</div>
          <div class="gallery-caption-desc" id="poster-caption-desc">${activeItem.desc}</div>
        </div>
      </div>
    `;

    startGalleryAutoPlay(gallery, updatePosterScreen);

    const galleryWrapper = mediaContainer.querySelector('.poster-gallery-wrapper');
    if (galleryWrapper) {
      galleryWrapper.addEventListener('mouseenter', stopGalleryAutoPlay);
      galleryWrapper.addEventListener('mouseleave', () => startGalleryAutoPlay(gallery, updatePosterScreen));
    }

    const pills = mediaContainer.querySelectorAll('.gallery-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        currentGalleryIndex = parseInt(pill.dataset.index);
        updatePosterScreen(gallery, currentGalleryIndex);
        startGalleryAutoPlay(gallery, updatePosterScreen);
      });
    });

    const prevBtn = mediaContainer.querySelector('#poster-prev-btn');
    const nextBtn = mediaContainer.querySelector('#poster-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + gallery.length) % gallery.length;
        updatePosterScreen(gallery, currentGalleryIndex);
        startGalleryAutoPlay(gallery, updatePosterScreen);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % gallery.length;
        updatePosterScreen(gallery, currentGalleryIndex);
        startGalleryAutoPlay(gallery, updatePosterScreen);
      });
    }
  }

  function updatePosterScreen(gallery, idx) {
    const activeItem = gallery[idx];
    const imgTarget = document.getElementById('poster-screen-target');
    const titleTarget = document.getElementById('poster-caption-title');
    const descTarget = document.getElementById('poster-caption-desc');
    const counterTarget = document.getElementById('poster-counter-target');
    const pills = mediaContainer.querySelectorAll('.gallery-pill');

    if (imgTarget) {
      imgTarget.style.opacity = '0.3';
      imgTarget.style.transform = 'scale(0.97)';
      setTimeout(() => {
        imgTarget.src = activeItem.src;
        imgTarget.alt = activeItem.title;
        imgTarget.style.opacity = '1';
        imgTarget.style.transform = 'scale(1)';
      }, 150);
    }

    if (titleTarget) titleTarget.textContent = activeItem.title;
    if (descTarget) descTarget.textContent = activeItem.desc;
    if (counterTarget) counterTarget.textContent = `${idx + 1} / ${gallery.length}`;

    pills.forEach((p, i) => {
      if (i === idx) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  function closeModal() {
    stopGalleryAutoPlay();
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    const videos = mediaContainer.querySelectorAll('video');
    videos.forEach(v => { v.pause(); v.currentTime = 0; });
  }
}

/* --- CV Modal Viewer --- */
function initCVModal() {
  const cvModal = document.getElementById('cv-modal');
  const cvTriggerBtns = document.querySelectorAll('.trigger-cv-modal');
  const closeCVBtn = document.getElementById('cv-modal-close');

  if (!cvModal) return;

  cvTriggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cvModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeCVBtn) {
    closeCVBtn.addEventListener('click', () => {
      cvModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      cvModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

/* --- Contact Form Handling --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    showToast(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
    form.reset();
  });
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderColor = type === 'success' ? 'var(--accent-green)' : 'var(--accent-green)';
  toast.innerHTML = `<i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i> ${msg}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

/* --- Intersection Scroll Animations --- */
function initScrollAnimations() {
  const animElements = document.querySelectorAll('.section-header, .spec-card, .timeline-card, .contact-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  animElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}
