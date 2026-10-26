document.documentElement.classList.add("js");

/* ===== Edit your content here ===== */
const CONFIG = {
  intro: "I build fast, accessible, carefully crafted web interfaces. Replace this with a sentence about what you do and the work you want to take on.",
  email: "",
  socials: [{ label: "GitHub", url: "" }, { label: "LinkedIn", url: "" }, { label: "X", url: "" }],
  about: [
    "Write a few sentences here about your background: how you got into front-end development and what you enjoy building.",
    "Add a second paragraph about how you work with designers and teams, and what you’re learning now."
  ],
  facts: [["Location", "Your city"], ["Experience", "Add your years"], ["Focus", "Add your focus"]],
  skills: [
    { tag: "H",  name: "HTML",       text: "Semantic, accessible markup that works for everyone.", a: "#ff7a45", b: "#ff4d6d" },
    { tag: "C",  name: "CSS",        text: "Responsive layouts, custom properties, and polished motion.", a: "#3a6bff", b: "#10c3dc" },
    { tag: "JS", name: "JavaScript", text: "Clean, modular code for interactive interfaces.", a: "#f5b301", b: "#ff8a00" },
    { tag: "R",  name: "React",      text: "Reusable components and predictable state.", a: "#10c3dc", b: "#3a6bff" },
    { tag: "G",  name: "Git",        text: "Branching, reviews, and a tidy commit history.", a: "#ff6b4a", b: "#c93a6b" },
    { tag: "GH", name: "GitHub",     text: "Collaboration, issues, pull requests, and CI.", a: "#8a5cff", b: "#3a6bff" }
  ],
  projects: [
    { title: "Project One",   text: "Describe what this project does, who it is for, and your role.", tech: ["HTML","CSS","JavaScript"], demo: "", repo: "", hue: [58,107,255] },
    { title: "Project Two",   text: "Describe the problem you solved and one decision you are proud of.", tech: ["React","CSS"], demo: "", repo: "", hue: [138,92,255] },
    { title: "Project Three", text: "Describe the outcome, the tools used, and what you learned.", tech: ["React","Git"], demo: "", repo: "", hue: [16,195,220] }
  ]
};
/* ================================== */

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const el = (t, c, h) => { const e = document.createElement(t); if(c) e.className = c; if(h != null) e.innerHTML = h; return e; };
const toast = $("#toast"); let tt;
const notify = m => { toast.textContent = m; toast.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove("show"), 3200); };
function linkBtn(label, url, cls = "btn sm"){
  const a = el("a", cls, esc(label));
  if(url){ a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; }
  else { a.href = "#"; a.addEventListener("click", e => { e.preventDefault(); notify(label + ": add a URL in CONFIG."); }); }
  return a;
}

/* Hero: staggered word reveal */
const h1 = $("#name");
const words = h1.textContent.trim().split(/\s+/);
h1.textContent = "";
words.forEach((w, i) => { const s = el("span", "word", esc(w)); s.style.setProperty("--i", i); h1.append(s, i < words.length - 1 ? " " : ""); });
$("#intro").textContent = CONFIG.intro;

/* About */
$("#about-text").innerHTML = CONFIG.about.map(p => `<p>${esc(p)}</p>`).join("");
$("#facts").innerHTML = CONFIG.facts.map(([k, v]) => `<li><span>${esc(k)}</span><strong>${esc(v)}</strong></li>`).join("");

/* Skills */
CONFIG.skills.forEach((s, i) => {
  const c = el("article", "glass skill reveal", `<h3><span class="tag" style="--a:${s.a};--b:${s.b}">${esc(s.tag)}</span>${esc(s.name)}</h3><p>${esc(s.text)}</p>`);
  c.style.setProperty("--d", (i % 3) * .08 + "s"); $("#skills-grid").append(c);
});

/* Projects (SVG placeholders; swap in <img> screenshots when ready) */
CONFIG.projects.forEach((p, i) => {
  const [r, g, b] = p.hue, c = `rgb(${r},${g},${b})`;
  const art = `<svg viewBox="0 0 320 200" role="img" aria-label="Placeholder preview for ${esc(p.title)}"><defs><linearGradient id="g${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="rgba(${r},${g},${b},.35)"/></linearGradient></defs><rect width="320" height="200" fill="url(#g${i})"/><rect x="40" y="34" width="240" height="132" rx="12" fill="#fff" fill-opacity=".92"/><circle cx="58" cy="50" r="4" fill="${c}"/><circle cx="72" cy="50" r="4" fill="${c}" fill-opacity=".5"/><rect x="58" y="74" width="110" height="10" rx="5" fill="#12142b" fill-opacity=".75"/><rect x="58" y="94" width="180" height="7" rx="3.5" fill="#12142b" fill-opacity=".16"/><rect x="58" y="110" width="150" height="7" rx="3.5" fill="#12142b" fill-opacity=".16"/><rect x="58" y="132" width="58" height="16" rx="8" fill="${c}"/></svg>`;
  const card = el("article", "card reveal", `<div class="thumb">${art}</div><div class="body"><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p><ul class="badges">${p.tech.map(t => `<li>${esc(t)}</li>`).join("")}</ul><div class="links"></div></div>`);
  card.style.setProperty("--d", (i % 3) * .08 + "s");
  $(".links", card).append(linkBtn("Live Demo", p.demo, "btn sm primary"), linkBtn("GitHub", p.repo));
  $("#projects-grid").append(card);
});

/* Contact + footer */
const eb = $("#email-btn");
if(CONFIG.email) eb.href = "mailto:" + CONFIG.email;
else eb.addEventListener("click", e => { e.preventDefault(); notify("Email: add your address in CONFIG."); });
CONFIG.socials.forEach(s => $("#socials").append(linkBtn(s.label, s.url)));
$("#year").textContent = new Date().getFullYear();

/* Nav */
const menu = $("#menu"), burger = $("#burger"), header = $("header");
const setMenu = o => { menu.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); burger.textContent = o ? "✕" : "☰"; };
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", e => { if(e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", e => { if(e.key === "Escape") setMenu(false); });
const onScroll = () => header.classList.toggle("scrolled", scrollY > 20);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const navLinks = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver(es => es.forEach(en => { if(en.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach(s => spy.observe(s));

/* Scroll reveal */
const io = new IntersectionObserver(es => es.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(n => io.observe(n));

/* 3D hover tilt for the photo, skill cards and project cards */
function tilt(host, targets, max = 8, lift = 0){
  if(!matchMedia("(hover:hover) and (prefers-reduced-motion:no-preference)").matches) return;
  host.addEventListener("pointermove", e => {
    const r = host.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    targets.forEach(t => { t.style.transition = "transform .12s linear"; t.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateY(${-lift}px)`; });
  });
  host.addEventListener("pointerleave", () => targets.forEach(t => {
    t.style.transition = "transform .6s cubic-bezier(.2,.7,.2,1)"; t.style.transform = "";
    setTimeout(() => t.style.transition = "", 650);
  }));
}
document.querySelectorAll(".card").forEach(c => tilt(c, [c], 7, 8));
document.querySelectorAll(".skill").forEach(c => tilt(c, [c], 8, 6));
tilt($(".photo"), [$(".frame"), $(".ring")], 12);

/* Three.js: dark neural network that reacts to scroll and morphs as you move through the sections */
(function(){
  const canvas = $("#scene");
  if(!window.THREE || !canvas) return;
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "low-power" }); }
  catch(e){ canvas.remove(); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(55, 1, .1, 100); cam.position.z = 10;
  const V = THREE.Vector3, N = 96;
  const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

  /* Five formations of the same 96 nodes: layered network, sphere, lattice, double helix, galaxy */
  const F = [[], [], [], [], []];
  for(let i = 0; i < N; i++){
    const l = Math.floor(i / 16), k = i % 16, a = k / 16 * Math.PI * 2 + l, r = 1.2 + rnd(i) * 1.8;
    F[0].push(new V(l * 2 - 5, Math.sin(a) * r, Math.cos(a) * r));
    const y = 1 - (i + .5) / N * 2, rr = Math.sqrt(1 - y * y), th = i * 2.39996;
    F[1].push(new V(Math.cos(th) * rr * 3.2, y * 3.2, Math.sin(th) * rr * 3.2));
    F[2].push(new V((i % 6 - 2.5) * 1.2, (Math.floor(i / 6) % 4 - 1.5) * 1.2, (Math.floor(i / 24) - 1.5) * 1.2));
    const s = i % 2, j = i >> 1, ang = j * .42 + s * Math.PI;
    F[3].push(new V(Math.cos(ang) * 1.9, (j / 48 - .5) * 8, Math.sin(ang) * 1.9));
    const rg = Math.sqrt((i + 1) / N) * 4.2, ag = rg * 1.6 + (i % 3) * 2.094;
    F[4].push(new V(Math.cos(ag) * rg, (rnd(i + 9) - .5) * .8, Math.sin(ag) * rg));
  }
  const E = [];
  for(let i = 0; i < N - 16; i++){
    const l = Math.floor(i / 16);
    E.push([i, (l + 1) * 16 + Math.floor(rnd(i + 3) * 16)]);
    if(i % 2 === 0) E.push([i, (l + 1) * 16 + Math.floor(rnd(i + 7) * 16)]);
  }

  const dot = (() => { const c = document.createElement("canvas"); c.width = c.height = 64; const x = c.getContext("2d"), g = x.createRadialGradient(32,32,0,32,32,32); g.addColorStop(0,"rgba(255,255,255,1)"); g.addColorStop(.25,"rgba(255,255,255,.7)"); g.addColorStop(1,"rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0,0,64,64); return new THREE.CanvasTexture(c); })();
  const mk = (arr, mat, Ctor) => { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(arr, 3)); return [g, new Ctor(g, mat)]; };
  const add = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending };
  const group = new THREE.Group(); scene.add(group);
  const nPos = new Float32Array(N * 3), lPos = new Float32Array(E.length * 6), P = 36, pPos = new Float32Array(P * 3);
  const nMat = new THREE.PointsMaterial({ size: .5, map: dot, ...add });
  const lMat = new THREE.LineBasicMaterial({ opacity: .28, ...add });
  const pMat = new THREE.PointsMaterial({ size: .34, map: dot, ...add });
  const [nGeo, nodes] = mk(nPos, nMat, THREE.Points), [lGeo, lines] = mk(lPos, lMat, THREE.LineSegments), [pGeo, sparks] = mk(pPos, pMat, THREE.Points);
  group.add(nodes, lines, sparks);
  const pulses = Array.from({ length: P }, (_, i) => ({ e: Math.floor(rnd(i + 20) * E.length), t: rnd(i + 40) }));

  const D = 420, dPos = new Float32Array(D * 3);
  for(let i = 0; i < D; i++){ dPos[i*3] = (rnd(i) - .5) * 50; dPos[i*3+1] = (rnd(i + 500) - .5) * 30; dPos[i*3+2] = rnd(i + 900) * 24 - 20; }
  const [, dust] = mk(dPos, new THREE.PointsMaterial({ size: .07, color: 0x8890ff, opacity: .5, transparent: true, depthWrite: false }), THREE.Points);
  scene.add(dust);

  /* [node color, line color, background] for each section */
  const PAL = [[0x3a6bff,0x10c3dc,0x04060f],[0x8a5cff,0xd08bff,0x0a0518],[0x10c3dc,0x2ee6a6,0x03100f],[0xff7eb6,0xffb35c,0x12060d],[0x5b7cff,0xa070ff,0x060a1e]].map(r => r.map(h => new THREE.Color(h)));
  const cBg = new THREE.Color(); scene.background = cBg;
  const white = new THREE.Color(0xffffff);

  const ids = ["home","about","skills","projects","contact"]; let tops = [0,1,2,3,4];
  const measure = () => { tops = ids.map(id => $("#" + id).getBoundingClientRect().top + scrollY); };
  const stageAt = y => { y += innerHeight * .5; let i = 0; while(i < 4 && y >= tops[i + 1]) i++; return i >= 4 ? 4 : i + (y - tops[i]) / (tops[i + 1] - tops[i]); };

  let mx = 0, my = 0, sS = 0, last = scrollY, vel = 0, wide = true, run = false, prev = performance.now();
  addEventListener("pointermove", e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  function size(){
    renderer.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix();
    wide = cam.aspect > 1.1; group.scale.setScalar(wide ? 1 : Math.max(.4, cam.aspect * .95)); measure();
  }
  function frame(dt, t){
    const dy = scrollY - last; last = scrollY;
    vel += ((reduce ? 0 : Math.min(Math.abs(dy), 80) / 80) - vel) * .12;   // scroll speed, 0..1
    const raw = stageAt(scrollY), i = Math.min(Math.floor(raw), 3), tgt = raw >= 4 ? 4 : i + THREE.MathUtils.smoothstep(raw - i, .25, .75);
    sS = reduce ? tgt : sS + (tgt - sS) * .1;
    const a = Math.min(Math.floor(sS), 3), b = a + 1, k = Math.min(sS - a, 1);

    for(let n = 0; n < N; n++){
      const p = F[a][n], q = F[b][n], w = Math.sin(t * .8 + n) * .06;
      nPos[n*3] = p.x + (q.x - p.x) * k + w; nPos[n*3+1] = p.y + (q.y - p.y) * k + w; nPos[n*3+2] = p.z + (q.z - p.z) * k;
    }
    E.forEach(([u, v], j) => { for(let c = 0; c < 3; c++){ lPos[j*6+c] = nPos[u*3+c]; lPos[j*6+3+c] = nPos[v*3+c]; } });
    pulses.forEach((p, j) => {
      p.t += (.35 + vel * 3) * dt; if(p.t > 1){ p.t = 0; p.e = Math.floor(Math.random() * E.length); }
      const [u, v] = E[p.e];
      for(let c = 0; c < 3; c++) pPos[j*3+c] = nPos[u*3+c] + (nPos[v*3+c] - nPos[u*3+c]) * p.t;
    });
    nGeo.attributes.position.needsUpdate = lGeo.attributes.position.needsUpdate = pGeo.attributes.position.needsUpdate = true;

    nMat.color.copy(PAL[a][0]).lerp(PAL[b][0], k);
    lMat.color.copy(PAL[a][1]).lerp(PAL[b][1], k); pMat.color.copy(lMat.color).lerp(white, .5);
    cBg.copy(PAL[a][2]).lerp(PAL[b][2], k);
    nMat.size = .5 + vel * .35; lMat.opacity = .26 + vel * .3;

    group.position.x = wide ? 2.4 * Math.max(0, 1 - sS) : 0;
    group.rotation.y += ((t * .08 + sS * .9 + mx * .7) - group.rotation.y) * .08;
    group.rotation.x += ((Math.sin(sS * 1.3) * .3 + my * .4) - group.rotation.x) * .06;
    cam.position.z = 10 - vel * 1.5;
    dust.rotation.y = t * .01 + sS * .3; dust.position.y = sS * 1.2;
    renderer.render(scene, cam);
  }
  function loop(now){ if(!run) return; frame(Math.min((now - prev) / 1000, .05), now / 1000); prev = now; requestAnimationFrame(loop); }
  size(); if("ResizeObserver" in window) new ResizeObserver(measure).observe(document.body);
  addEventListener("resize", () => { size(); if(reduce) frame(0, 0); });
  if(reduce){ frame(0, 0); addEventListener("scroll", () => frame(0, 0), { passive: true }); }
  else {
    run = true; requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", () => { const was = run; run = !document.hidden; if(run && !was){ prev = performance.now(); requestAnimationFrame(loop); } });
  }
})();
