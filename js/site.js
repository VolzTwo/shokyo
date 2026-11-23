(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const page = document.body.dataset.page || "home";
  const savedTheme = localStorage.getItem("shokyo-theme");
  const savedLang = localStorage.getItem("shokyo-language");
  let lang = savedLang === "id" ? "id" : "en";
  document.documentElement.dataset.theme = savedTheme || "light";

  const navItems = [["index.html","navHome","home"],["about.html","navAbout","about"],["projects.html","navProjects","projects"],["join.html","navJoin","join"]];
  $("#site-header").innerHTML = `<header class="site-header"><div class="wrap nav-wrap"><a class="brand" href="index.html"><img src="assets/logo/shokyo-pixel.png" alt=""><span>SHŌKYŌ<span style="color:var(--brand)">.</span></span></a><nav class="nav-links" id="nav-links" aria-label="Main navigation">${navItems.map(([href,key,id])=>`<a href="${href}" data-i18n="${key}" ${page===id?'aria-current="page"':''}>${translations.en[key]}</a>`).join("")}</nav><div class="nav-tools"><button class="tool-button" id="language-toggle" aria-label="Switch language">EN</button><button class="tool-button" id="theme-toggle" aria-label="Toggle color theme">☼</button><button class="menu-toggle" id="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button></div></div></header>`;
  $("#site-footer").innerHTML = `<footer class="site-footer"><div class="wrap footer-inner"><div><a class="footer-brand" href="index.html">SHŌKYŌ.</a><div data-i18n="footerTagline">${translations.en.footerTagline}</div></div><div class="footer-links"><a href="about.html" data-i18n="navAbout">ABOUT</a><a href="projects.html" data-i18n="navProjects">PROJECTS</a><a href="join.html" data-i18n="navJoin">JOIN US</a></div><span>© ${new Date().getFullYear()} SHŌKYŌ</span></div></footer>`;

  function t(key){return key.split(".").reduce((o,k)=>o&&o[k],translations[lang])}
  function applyLanguage(){
    document.documentElement.lang=lang;
    document.querySelectorAll("[data-i18n]").forEach(el=>{const value=t(el.dataset.i18n);if(typeof value==="string")el.innerHTML=value;});
    $("#language-toggle").textContent=lang.toUpperCase();
    renderProjects();
  }
  $("#language-toggle").addEventListener("click",()=>{lang=lang==="en"?"id":"en";localStorage.setItem("shokyo-language",lang);applyLanguage();});
  $("#theme-toggle").addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem("shokyo-theme",next);$("#theme-toggle").textContent=next==="dark"?"☾":"☼";});
  $("#theme-toggle").textContent=document.documentElement.dataset.theme==="dark"?"☾":"☼";
  $("#menu-toggle").addEventListener("click",()=>{const nav=$("#nav-links");const open=nav.classList.toggle("open");$("#menu-toggle").setAttribute("aria-expanded",String(open));$("#menu-toggle").textContent=open?"✕":"☰";});

  const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function projectCard(p){
    const desc=typeof p.description==="string"?p.description:(p.description?.[lang]||p.description?.en||"");
    const status=t("status."+p.status)||String(p.status||"").toUpperCase();
    const image=p.image?`<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`:`<div class="project-placeholder">S<span style="color:var(--brand)">.</span></div>`;
    return `<article class="project-card"><div class="project-image">${image}</div><div class="project-content"><div class="project-meta"><span>${esc(t("projectLabel"))} / ${esc(p.id)}</span><span class="status">${esc(status)}</span></div><h3>${esc(p.title)}</h3><p>${esc(desc)}</p>${p.coordinates?`<div class="project-meta"><span>WPLACE / ${esc(p.coordinates)}</span></div>`:""}${p.link?`<a class="project-link" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">VIEW PROJECT ↗</a>`:""}</div></article>`;
  }
  function renderProjects(filter="all"){
    const all=Array.isArray(window.projects)?window.projects:[];
    const visible=all.filter(p=>filter==="all"||p.status===filter);
    const featured=all.filter(p=>p.featured).slice(0,2);
    const homeTarget=$("#featured-projects");
    if(homeTarget)homeTarget.innerHTML=featured.length?featured.map(projectCard).join(""):`<div class="empty-state">${esc(t("emptyProjects"))}</div>`;
    const target=$("#all-projects");
    if(target){target.innerHTML=visible.map(projectCard).join("");$("#project-count").textContent=String(visible.length).padStart(2,"0")+" PROJECTS";$("#empty-projects").hidden=visible.length>0;}
  }
  document.querySelectorAll(".filter-button").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter-button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderProjects(btn.dataset.filter);}));
  applyLanguage();

  // Set this once the real server invite is available; both Join page buttons use it.
  const discordInvite = "https://discord.gg/7gN4rfNfm5";
  ["discord-hero","discord-final"].forEach(id=>{const el=document.getElementById(id);if(el)el.href=discordInvite;});
})();