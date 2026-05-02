/* ═══════════════════════════════════════════
   AWDD Store — main.js
   All logic: config, projects, theme, sidebar,
   categories, project modal, scroll effects
═══════════════════════════════════════════ */

// ──────────────────────────────────────────
// CONFIG — Update these values
// ──────────────────────────────────────────
const CONFIG = {
    whatsapp: "YOUR_NUMBER",            // e.g. "9660501234567"
    whatsapp_message: "مرحباً، أريد الاستفسار عن خدماتكم",
    instagram: "YOUR_HANDLE",           // e.g. "awdd.store"
    github: "YOUR_HANDLE",              // e.g. "awdd-dev"
    linkedin: "YOUR_PROFILE_URL",       // full URL
    logo: "logo.webp",
  };
  
  // ──────────────────────────────────────────
  // PROJECTS DATA
  // ──────────────────────────────────────────
  const PROJECTS = [
    {
      id: 1,
      name: "ClinicPen",
      category: "systems",
      cover: "images/clinicpen.jpg",
      images: ["images/clinicpen-1.jpg", "images/clinicpen-2.jpg"],
      shortDesc: "نظام إدارة عيادات متكامل",
      longDesc: "نظام ويب احترافي لإدارة العيادات يشمل الحجوزات وملفات المرضى والتحليلات المالية. مبني بتقنيات حديثة يضمن الأمان والسرعة في الاستخدام اليومي.",
      features: ["إدارة الحجوزات", "ملفات المرضى", "تقارير مالية", "تحليلات أداء"],
      tech: ["HTML", "CSS", "JavaScript", "Firebase"],
      live: "https://your-link.com",
    },
    {
      id: 2,
      name: "EduPen",
      category: "systems",
      cover: "images/edupen.jpg",
      images: ["images/edupen-1.jpg"],
      shortDesc: "نظام إدارة معاهد تدريبية",
      longDesc: "نظام متكامل لإدارة المعاهد الخاصة يشمل الطلاب والدورات والحضور والمالية. يوفر لوحة تحكم شاملة تسهّل العمل اليومي للإدارة والموظفين.",
      features: ["إدارة الطلاب", "جدول الدورات", "تتبع الحضور", "التقارير المالية"],
      tech: ["HTML", "CSS", "JavaScript", "Firebase"],
      live: "",
    },
    {
      id: 3,
      name: "ShopLand",
      category: "web",
      cover: "",
      images: [],
      shortDesc: "متجر إلكتروني احترافي",
      longDesc: "متجر إلكتروني سريع وجذاب مع واجهة مستخدم سلسة، يدعم عرض المنتجات وإدارة الطلبات والدفع الإلكتروني.",
      features: ["عرض المنتجات", "سلة التسوق", "بوابة دفع", "لوحة إدارة"],
      tech: ["HTML", "CSS", "JavaScript", "Node.js"],
      live: "",
    },
    {
      id: 4,
      name: "LandPro",
      category: "web",
      cover: "",
      images: [],
      shortDesc: "صفحة هبوط تحويلية عالية الأداء",
      longDesc: "صفحة هبوط مخصصة مُحسّنة لمحركات البحث ومصممة لتحقيق أعلى معدلات التحويل للعميل.",
      features: ["تصميم متجاوب", "تحسين SEO", "أداء عالٍ", "تحليلات مدمجة"],
      tech: ["HTML", "CSS", "JavaScript"],
      live: "",
    },
    {
      id: 5,
      name: "AutoBot",
      category: "custom",
      cover: "",
      images: [],
      shortDesc: "بوت واتساب ذكي للمتاجر",
      longDesc: "حل مخصص لأتمتة خدمة العملاء عبر واتساب، يرد على الاستفسارات ويعرض المنتجات ويستقبل الطلبات تلقائياً.",
      features: ["ردود تلقائية", "عرض الكتالوج", "إدارة الطلبات", "تقارير تفاعلية"],
      tech: ["Node.js", "WhatsApp API", "Firebase"],
      live: "",
    },
  ];
  
  // ──────────────────────────────────────────
  // HELPERS
  // ──────────────────────────────────────────
  const waUrl = (msg) =>
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  
  const categoryMeta = {
    systems: { label: "الأنظمة الإدارية", icon: "layout-dashboard" },
    web:     { label: "مواقع الويب",       icon: "globe"             },
    custom:  { label: "حلول مخصصة",        icon: "settings-2"        },
  };
  
  // ──────────────────────────────────────────
  // THEME
  // ──────────────────────────────────────────
  function initTheme() {
    const saved = localStorage.getItem("awdd-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }
  
  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("awdd-theme", next);
  }
  
  // ──────────────────────────────────────────
  // NAVBAR SCROLL EFFECT
  // ──────────────────────────────────────────
  function initNavScroll() {
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });
  }
  
  // ──────────────────────────────────────────
  // SCROLLSPY
  // ──────────────────────────────────────────
  function initScrollSpy() {
    const sections = ["hero", "projects", "services", "why-us", "contact"];
    const links = document.querySelectorAll(".nav-link");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
  
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
  
  // ──────────────────────────────────────────
  // SIDEBAR
  // ──────────────────────────────────────────
  function initSidebar() {
    const sidebar  = document.getElementById("sidebar");
    const overlay  = document.getElementById("sidebarOverlay");
    const openBtn  = document.getElementById("hamburgerBtn");
    const closeBtn = document.getElementById("closeSidebar");
  
    const open  = () => { sidebar.classList.add("open"); overlay.classList.add("open"); document.body.classList.add("no-scroll"); };
    const close = () => { sidebar.classList.remove("open"); overlay.classList.remove("open"); document.body.classList.remove("no-scroll"); };
  
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", close);
  
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.addEventListener("click", close);
    });
  }
  
  // ──────────────────────────────────────────
  // SOCIAL LINKS
  // ──────────────────────────────────────────
  function initSocialLinks() {
    const waLink    = waUrl(CONFIG.whatsapp_message);
    const igLink    = `https://instagram.com/${CONFIG.instagram}`;
    const ghLink    = `https://github.com/${CONFIG.github}`;
    const liLink    = CONFIG.linkedin;
  
    const setHref = (id, href) => {
      const el = document.getElementById(id);
      if (el) el.href = href;
    };
  
    setHref("mobileWhatsapp", waLink);
  
    // Sidebar
    setHref("sidebarWa", waLink);
    setHref("sidebarIg", igLink);
    setHref("sidebarGh", ghLink);
    setHref("sidebarLi", liLink);
  
    // Contact
    setHref("contactWa", waLink);
    setHref("contactIg", igLink);
    setHref("contactGh", ghLink);
    setHref("contactLi", liLink);
  
    // Main CTA
    setHref("mainCtaBtn", waLink);
    setHref("mainCtaBtn", waUrl("مرحباً، أريد بدء مشروع جديد"));
  }
  
  // ──────────────────────────────────────────
  // PROJECTS RENDER
  // ──────────────────────────────────────────
  function renderProjects() {
    const wrapper = document.getElementById("projects-wrapper");
    if (!wrapper) return;
  
    const groups = {
      systems: PROJECTS.filter((p) => p.category === "systems"),
      web:     PROJECTS.filter((p) => p.category === "web"),
      custom:  PROJECTS.filter((p) => p.category === "custom"),
    };
  
    Object.entries(groups).forEach(([cat, projects]) => {
      if (!projects.length) return;
      const meta = categoryMeta[cat];
      const group = document.createElement("div");
      group.className = "project-group";
      group.dataset.cat = cat;
  
      group.innerHTML = `
        <div class="project-group-header">
          <div class="project-group-label">
            <i data-lucide="${meta.icon}"></i>
            ${meta.label}
          </div>
          <div class="project-group-line"></div>
        </div>
        <div class="projects-scroll-wrapper">
          <div class="projects-scroll-row" id="row-${cat}">
            ${projects.map((p) => renderCard(p)).join("")}
          </div>
          <button class="scroll-arrow scroll-arrow-right" data-row="row-${cat}" aria-label="السابق">
            <i data-lucide="chevron-right"></i>
          </button>
          <button class="scroll-arrow scroll-arrow-left" data-row="row-${cat}" aria-label="التالي">
            <i data-lucide="chevron-left"></i>
          </button>
        </div>
      `;
  
      wrapper.appendChild(group);
    });
  
    // Re-init Lucide for newly injected icons
    if (window.lucide) lucide.createIcons();
  
    // Scroll arrows
    document.querySelectorAll(".scroll-arrow").forEach((btn) => {
      btn.addEventListener("click", () => {
        const row = document.getElementById(btn.dataset.row);
        const dir = btn.classList.contains("scroll-arrow-right") ? -1 : 1;
        row.scrollBy({ left: dir * 270, behavior: "smooth" });
      });
    });
  
    // Desktop wheel-scroll on rows
    document.querySelectorAll(".projects-scroll-row").forEach((row) => {
      row.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        e.preventDefault();
        row.scrollBy({ left: -e.deltaY * 1.5, behavior: "smooth" });
      }, { passive: false });
    });
  
    // Card click → modal
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = parseInt(card.dataset.projectId, 10);
        openModal(id);
      });
    });
  }
  
  function renderCard(p) {
    const hasImage = p.cover;
    const imageHtml = hasImage
      ? `<img src="${p.cover}" alt="${p.name}" loading="lazy" />`
      : `<div class="card-image-placeholder"><i data-lucide="image-off"></i></div>`;
  
    const techs = p.tech.slice(0, 3).map((t) => `<span class="tech-chip">${t}</span>`).join("");
  
    return `
      <div class="project-card" data-project-id="${p.id}">
        <div class="card-image">
          ${imageHtml}
          <span class="card-badge">${categoryMeta[p.category]?.label || ""}</span>
        </div>
        <div class="card-body">
          <h3 class="card-name">${p.name}</h3>
          <p class="card-desc">${p.shortDesc}</p>
          <div class="card-tech">${techs}</div>
        </div>
      </div>
    `;
  }
  
  // ──────────────────────────────────────────
  // CATEGORY FILTER
  // ──────────────────────────────────────────
  function initCategoryFilter() {
    const buttons = document.querySelectorAll(".cat-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
  
        const cat = btn.dataset.cat;
        const groups = document.querySelectorAll(".project-group");
        groups.forEach((group) => {
          const match = cat === "all" || group.dataset.cat === cat;
          group.classList.toggle("hidden", !match);
          group.style.opacity   = "0";
          group.style.transform = "translateY(10px)";
          if (match) {
            // Animate back in
            requestAnimationFrame(() => {
              setTimeout(() => {
                group.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                group.style.opacity   = "1";
                group.style.transform = "translateY(0)";
              }, 20);
            });
          }
        });
      });
    });
  }
  
  // ──────────────────────────────────────────
  // PROJECT MODAL
  // ──────────────────────────────────────────
  let currentSlide = 0;
  let modalImages  = [];
  
  function openModal(projectId) {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project) return;
  
    // Fill content
    document.getElementById("modalTitle").textContent     = project.name;
    document.getElementById("modalBadge").textContent     = categoryMeta[project.category]?.label || "";
    document.getElementById("modalShortDesc").textContent = project.shortDesc;
    document.getElementById("modalLongDesc").textContent  = project.longDesc;
  
    // Features
    const featuresList = document.getElementById("featuresList");
    featuresList.innerHTML = project.features
      .map((f) => `<li><i data-lucide="check"></i> ${f}</li>`)
      .join("");
  
    // Tech chips
    const techChips = document.getElementById("techChips");
    techChips.innerHTML = project.tech
      .map((t) => `<span class="tech-chip-modal">${t}</span>`)
      .join("");
  
    // Live button
    const liveBtn = document.getElementById("modalLiveBtn");
    if (project.live) {
      liveBtn.href = project.live;
      liveBtn.style.display = "inline-flex";
    } else {
      liveBtn.style.display = "none";
    }
  
    // WhatsApp button
    document.getElementById("modalWaBtn").href =
      waUrl(`مرحباً، أريد الاستفسار عن مشروع ${project.name}`);
  
    // Image Slider
    modalImages = project.images && project.images.length
      ? project.images
      : (project.cover ? [project.cover] : []);
  
    buildSlider();
  
    // Show overlay
    const overlay = document.getElementById("modalOverlay");
    overlay.classList.add("open");
    document.body.classList.add("no-scroll");
    currentSlide = 0;
    goToSlide(0);
  
    // Rerun lucide for injected icons
    if (window.lucide) lucide.createIcons();
  }
  
  function buildSlider() {
    const track = document.getElementById("sliderTrack");
    const dots  = document.getElementById("sliderDots");
    const prev  = document.getElementById("sliderPrev");
    const next  = document.getElementById("sliderNext");
  
    track.innerHTML = "";
    dots.innerHTML  = "";
  
    if (!modalImages.length) {
      track.innerHTML = `
        <div class="slider-slide">
          <div class="slider-slide-placeholder">
            <i data-lucide="image-off"></i>
          </div>
        </div>`;
      prev.style.display = "none";
      next.style.display = "none";
      dots.style.display = "none";
      return;
    }
  
    modalImages.forEach((src, i) => {
      const slide = document.createElement("div");
      slide.className = "slider-slide";
      slide.innerHTML = `<img src="${src}" alt="صورة ${i + 1}" loading="lazy" />`;
      track.appendChild(slide);
  
      const dot = document.createElement("div");
      dot.className = `slider-dot${i === 0 ? " active" : ""}`;
      dot.addEventListener("click", () => goToSlide(i));
      dots.appendChild(dot);
    });
  
    const single = modalImages.length === 1;
    prev.style.display = single ? "none" : "flex";
    next.style.display = single ? "none" : "flex";
    dots.style.display = single ? "none" : "flex";
  }
  
  function goToSlide(idx) {
    const track = document.getElementById("sliderTrack");
    const dotsEls = document.querySelectorAll(".slider-dot");
    currentSlide = idx;
    track.style.transform = `translateX(${idx * 100}%)`;
    dotsEls.forEach((d, i) => d.classList.toggle("active", i === idx));
  }
  
  function initModal() {
    const overlay = document.getElementById("modalOverlay");
    const modal   = document.getElementById("modal");
    const close   = document.getElementById("modalClose");
    const prev    = document.getElementById("sliderPrev");
    const next    = document.getElementById("sliderNext");
  
    const closeModal = () => {
      overlay.classList.remove("open");
      document.body.classList.remove("no-scroll");
      modalImages = [];
      currentSlide = 0;
    };
  
    close.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
      if (!modal.contains(e.target)) closeModal();
    });
  
    prev.addEventListener("click", () => {
      const newIdx = (currentSlide - 1 + modalImages.length) % modalImages.length;
      goToSlide(newIdx);
    });
  
    next.addEventListener("click", () => {
      const newIdx = (currentSlide + 1) % modalImages.length;
      goToSlide(newIdx);
    });
  
    // Keyboard nav
    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        const newIdx = (currentSlide - 1 + modalImages.length) % modalImages.length;
        goToSlide(newIdx);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        const newIdx = (currentSlide + 1) % modalImages.length;
        goToSlide(newIdx);
      }
    });
  }
  
  // ──────────────────────────────────────────
  // SERVICE CTA — WhatsApp Links
  // ──────────────────────────────────────────
  function initServiceCtas() {
    document.querySelectorAll(".service-cta[data-wa-msg]").forEach((link) => {
      link.href = waUrl(link.dataset.waMsg);
      link.target = "_blank";
      link.rel = "noopener";
    });
  }
  
  // ──────────────────────────────────────────
  // SCROLL REVEAL
  // ──────────────────────────────────────────
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger children in same batch
            entry.target.style.transitionDelay = `${i * 0.07}s`;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }
  
  // ──────────────────────────────────────────
  // SMOOTH SCROLL POLYFILL (for older browsers)
  // ──────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }
  
  // ──────────────────────────────────────────
  // INIT ALL
  // ──────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    // Apply theme before render (no flash)
    initTheme();
  
    // Init Lucide icons
    if (window.lucide) lucide.createIcons();
  
    // Core
    initNavScroll();
    initScrollSpy();
    initSidebar();
    initSocialLinks();
  
    // Theme toggles
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
    document.getElementById("themeToggleSidebar").addEventListener("click", toggleTheme);
  
    // Projects
    renderProjects();
    initCategoryFilter();
  
    // Modal
    initModal();
  
    // Services
    initServiceCtas();
  
    // Animations
    initScrollReveal();
    initSmoothScroll();
  });