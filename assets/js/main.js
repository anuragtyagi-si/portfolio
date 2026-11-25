/* ═══════════ AI DEV PORTFOLIO — interactions ═══════════ */
(function () {
  "use strict";

  /* ── 1. SKILLS DATA (from FRONTEND_SKILLS_PROMPT.md reference output) ── */
  const SKILLS = [
    // Frontend
    { name: "HTML5", cat: "frontend", label: "Frontend", level: 95, lvl: "Expert" },
    { name: "CSS3", cat: "frontend", label: "Frontend", level: 93, lvl: "Expert" },
    { name: "JavaScript (ES6+)", cat: "frontend", label: "Frontend", level: 92, lvl: "Expert" },
    { name: "TypeScript", cat: "frontend", label: "Frontend", level: 88, lvl: "Advanced" },
    { name: "React", cat: "frontend", label: "Frontend", level: 90, lvl: "Expert" },
    { name: "Next.js", cat: "frontend", label: "Frontend", level: 86, lvl: "Advanced" },
    { name: "React Native", cat: "frontend", label: "Frontend", level: 82, lvl: "Advanced" },
    { name: "Three.js / WebGL", cat: "frontend", label: "Frontend", level: 80, lvl: "Advanced" },
    { name: "Tailwind CSS", cat: "frontend", label: "Frontend", level: 88, lvl: "Advanced" },
    { name: "GSAP / Framer Motion", cat: "frontend", label: "Frontend", level: 84, lvl: "Advanced" },
    { name: "Redux / Zustand", cat: "frontend", label: "Frontend", level: 82, lvl: "Advanced" },
    { name: "Vite & Build Tooling", cat: "frontend", label: "Frontend", level: 85, lvl: "Advanced" },
    { name: "Responsive Design", cat: "frontend", label: "Frontend", level: 94, lvl: "Expert" },
    { name: "Accessibility (WCAG)", cat: "frontend", label: "Frontend", level: 86, lvl: "Advanced" },
    { name: "PWA", cat: "frontend", label: "Frontend", level: 78, lvl: "Intermediate" },
    { name: "SEO & Web Perf", cat: "frontend", label: "Frontend", level: 84, lvl: "Advanced" },
    // Backend
    { name: "Node.js", cat: "backend", label: "Backend", level: 88, lvl: "Advanced" },
    { name: "Python", cat: "backend", label: "Backend", level: 86, lvl: "Advanced" },
    { name: "Go", cat: "backend", label: "Backend", level: 76, lvl: "Intermediate" },
    { name: "PostgreSQL", cat: "backend", label: "Backend", level: 84, lvl: "Advanced" },
    { name: "REST APIs", cat: "backend", label: "Backend", level: 90, lvl: "Expert" },
    { name: "GraphQL", cat: "backend", label: "Backend", level: 78, lvl: "Intermediate" },
    // AI & Automation
    { name: "Agentic AI", cat: "ai", label: "AI & Automation", level: 90, lvl: "Expert" },
    { name: "AI Workflow Automation", cat: "ai", label: "AI & Automation", level: 92, lvl: "Expert" },
    { name: "LLM Integration", cat: "ai", label: "AI & Automation", level: 89, lvl: "Advanced" },
    { name: "RAG Pipelines", cat: "ai", label: "AI & Automation", level: 87, lvl: "Advanced" },
    { name: "Prompt Engineering", cat: "ai", label: "AI & Automation", level: 93, lvl: "Expert" },
    { name: "Chatbots & Agents", cat: "ai", label: "AI & Automation", level: 88, lvl: "Advanced" },
    // Tools
    { name: "Git & GitHub", cat: "tools", label: "Tools", level: 90, lvl: "Expert" },
    { name: "Docker", cat: "tools", label: "Tools", level: 80, lvl: "Advanced" },
    { name: "CI/CD", cat: "tools", label: "Tools", level: 78, lvl: "Intermediate" },
    { name: "Figma", cat: "tools", label: "Tools", level: 82, lvl: "Advanced" },
    { name: "Jest / Testing Library", cat: "tools", label: "Tools", level: 80, lvl: "Advanced" },
    { name: "Linux & CLI", cat: "tools", label: "Tools", level: 84, lvl: "Advanced" },
  ];

  const skillsGrid = document.getElementById("skillsGrid");

  function initials(name) {
    return name.split(/[\s\/()]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  }

  function renderSkills(filter) {
    skillsGrid.innerHTML = "";
    SKILLS.filter(s => filter === "all" || s.cat === filter).forEach((s, i) => {
      const card = document.createElement("div");
      card.className = "skill-card";
      card.innerHTML =
        '<div class="skill-top">' +
          '<div class="skill-icon ' + s.cat + '">' + initials(s.name) + "</div>" +
          "<div><div class='skill-name'>" + s.name + "</div>" +
          "<div class='skill-cat'>" + s.label + "</div></div>" +
        "</div>" +
        '<div class="skill-bar"><div class="skill-fill" data-w="' + s.level + '"></div></div>' +
        '<div class="skill-level">' + s.lvl + " · " + s.level + "%</div>";
      card.style.animation = "none";
      skillsGrid.appendChild(card);
      // stagger entrance
      requestAnimationFrame(() => {
        card.style.transition = "opacity .4s ease " + (i * 40) + "ms, transform .4s ease " + (i * 40) + "ms";
        card.style.opacity = "0";
        card.style.transform = "translateY(16px)";
        requestAnimationFrame(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });
      });
    });
    observeBars();
  }

  document.getElementById("skillTabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    renderSkills(btn.dataset.filter);
  });

  renderSkills("all");

  /* ── 2. ANIMATED PROFICIENCY BARS ── */
  let barObserver;
  function observeBars() {
    if (barObserver) barObserver.disconnect();
    barObserver = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const fill = en.target;
          fill.style.width = fill.dataset.w + "%";
          barObserver.unobserve(fill);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".skill-fill").forEach(f => barObserver.observe(f));
  }

  /* ── 3. TYPED ROLE ROTATOR ── */
  const roles = ["AI Web Developer", "Software Developer", "Agentic AI Engineer", "Automation Specialist", "Full-Stack Developer"];
  const typedEl = document.getElementById("typed");
  let ri = 0, ci = 0, deleting = false;
  (function type() {
    const word = roles[ri];
    typedEl.textContent = word.slice(0, ci);
    let delay = deleting ? 45 : 90;
    if (!deleting && ci === word.length) { delay = 1700; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 350; }
    ci += deleting ? -1 : 1;
    setTimeout(type, delay);
  })();

  /* ── 4. THREE.JS NEURAL NETWORK HERO ── */
  (function initNeuralNet() {
    const canvas = document.getElementById("neural-canvas");
    if (!canvas || typeof THREE === "undefined") return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 22;

    const COUNT = window.innerWidth < 720 ? 130 : 260;
    const RANGE = 26;
    const positions = new Float32Array(COUNT * 3);
    const velocities = [];
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * RANGE;
      positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE;
      positions[i * 3 + 2] = (Math.random() - 0.5) * RANGE;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.14, transparent: true, opacity: 0.9 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array(COUNT * COUNT * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.28 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    const LINK_DIST = 4.2;
    let mouseX = 0, mouseY = 0;
    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    let running = true;
    new IntersectionObserver((en) => { running = en[0].isIntersecting; }).observe(canvas);

    (function animate() {
      requestAnimationFrame(animate);
      if (!running) return;
      const p = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        p[i * 3] += velocities[i].x;
        p[i * 3 + 1] += velocities[i].y;
        p[i * 3 + 2] += velocities[i].z;
        if (Math.abs(p[i * 3]) > RANGE / 2) velocities[i].x *= -1;
        if (Math.abs(p[i * 3 + 1]) > RANGE / 2) velocities[i].y *= -1;
        if (Math.abs(p[i * 3 + 2]) > RANGE / 2) velocities[i].z *= -1;
      }
      geo.attributes.position.needsUpdate = true;

      let li = 0;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = p[i * 3] - p[j * 3], dy = p[i * 3 + 1] - p[j * 3 + 1], dz = p[i * 3 + 2] - p[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) {
            linePos[li++] = p[i * 3]; linePos[li++] = p[i * 3 + 1]; linePos[li++] = p[i * 3 + 2];
            linePos[li++] = p[j * 3]; linePos[li++] = p[j * 3 + 1]; linePos[li++] = p[j * 3 + 2];
          }
        }
      }
      lineGeo.setDrawRange(0, li / 3);
      lineGeo.attributes.position.needsUpdate = true;

      scene.rotation.y += (mouseX * 0.35 - scene.rotation.y) * 0.03;
      scene.rotation.x += (mouseY * 0.25 - scene.rotation.x) * 0.03;
      renderer.render(scene, camera);
    })();
  })();

  /* ── 5. GSAP SCROLL REVEALS ── */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll(".reveal:not(.hero .reveal)").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
    // hero elements animate in on load
    gsap.fromTo(".hero .reveal",
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.2,
        scrollTrigger: { trigger: ".hero", start: "top 95%", once: true } });
  } else {
    document.querySelectorAll(".reveal").forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
  }

  /* ── 6. ANIMATED COUNTERS ── */
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count, dur = 1600, t0 = performance.now();
      (function tick(t) {
        const k = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + "+";
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".stat-num").forEach(el => counterObs.observe(el));

  /* ── 7. MARQUEE — duplicate track for seamless loop ── */
  const track = document.getElementById("marqueeTrack");
  track.innerHTML += track.innerHTML;

  /* ── 8. NAV: mobile menu + active link + shadow ── */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  }));

  const sections = ["about", "skills", "ai", "projects", "journey", "contact"];
  const linkMap = {};
  document.querySelectorAll(".nav-link").forEach(a => { linkMap[a.getAttribute("href").slice(1)] = a; });
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting && linkMap[en.target.id]) {
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        linkMap[en.target.id].classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(id => { const s = document.getElementById(id); if (s) secObs.observe(s); });

  /* ── 9. CONTACT FORM → mailto ── */
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const subject = encodeURIComponent("Project inquiry from " + f.name.value);
    const body = encodeURIComponent(f.message.value + "\n\n— " + f.name.value + " (" + f.email.value + ")");
    window.location.href = "mailto:saitamamango@gmail.com?subject=" + subject + "&body=" + body;
  });

  /* ── 10. BACK TO TOP + FOOTER YEAR ── */
  document.getElementById("toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.getElementById("year").textContent = new Date().getFullYear();
})();
