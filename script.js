// Spotlight i hero som följer musen 
const hero = document.querySelector(".hero");
hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
    hero.style.setProperty("--my", `${e.clientY - r.top}px`);
});

// Mörkt/ljust tema, sparas i localStorage 
const themeBtn = document.getElementById("themeBtn");
function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeBtn.textContent = theme === "light" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
}
const saved = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
setTheme(saved || (prefersLight ? "light" : "dark"));
themeBtn.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
});

// Filtrera projekt 
const filters = document.getElementById("filters");
const cards = document.querySelectorAll(".card");
filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    filters.querySelector(".active").classList.remove("active");
    btn.classList.add("active");

    const f = btn.dataset.filter;
    cards.forEach((card) => {
        const show = f === "all" || card.dataset.tags.split(" ").includes(f);
        card.classList.toggle("hide", !show);
        if (show) {
            card.classList.remove("pop");
            void card.offsetWidth;          // startar om animationen
            card.classList.add("pop");
        }
    });
});

// 3D-tilt på projektkort 
cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", `${x * 8}deg`);
        card.style.setProperty("--rx", `${-y * 8}deg`);
    });
    card.addEventListener("mouseleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
    });
});

