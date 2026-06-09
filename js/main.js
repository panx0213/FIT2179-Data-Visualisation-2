// K-pop in Australia — Vega-Lite embed script
// Each chart loads its JSON spec from charts/

const charts = [
  { id: "chart1",  spec: "charts/chart1_rise_timeline.json" },
  { id: "chart2",  spec: "charts/chart2_companies.json" },
  { id: "chart3",  spec: "charts/chart3_states_map.json" },
  { id: "chart4",  spec: "charts/chart4_states_groups.json" },
  { id: "chart5",  spec: "charts/chart5_penetration.json" },
  { id: "chart6",  spec: "charts/chart6_concert_map.json" },
  { id: "chart7",  spec: "charts/chart7_cities.json" },
  { id: "chart8",  spec: "charts/chart8_audio_scatter.json" },
  { id: "chart9",  spec: "charts/chart9_radar.json" },
  { id: "chart10", spec: "charts/chart10_duration.json" },
  { id: "chart11", spec: "charts/chart11_world_map.json" },
  { id: "chart12", spec: "charts/chart12_bump.json" },
];

const CACHE_BUST = `?v=${Date.now()}`;

function embedChart({ id, spec }) {
  const el = document.getElementById(id);
  if (!el) return;

  vegaEmbed(`#${id}`, spec + CACHE_BUST, {
    actions: false,
    renderer: "svg",
    mode: "vega-lite"
  })
    .then(({ view }) => {
      const ro = new ResizeObserver(() => {
        try { view.resize().runAsync(); } catch (e) { /* ignore */ }
      });
      ro.observe(el);
    })
    .catch((err) => console.warn(`Chart ${id} failed (${spec}):`, err));
}

function setupSectionNav() {
  const links = Array.from(document.querySelectorAll(".topnav-links a"));
  if (!links.length) return;

  const linkBySection = new Map();
  links.forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) linkBySection.set(target, a);
  });

  if (!linkBySection.size) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = linkBySection.get(entry.target);
        if (!link) return;
        links.forEach((a) => a.classList.toggle("active", a === link));
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
  );

  linkBySection.forEach((_, section) => observer.observe(section));
}

window.addEventListener("DOMContentLoaded", () => {
  charts.forEach(embedChart);
  setupSectionNav();
});
