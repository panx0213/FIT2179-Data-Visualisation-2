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

charts.forEach(({ id, spec }) => {
  const el = document.getElementById(id);
  if (!el) return;
  vegaEmbed(`#${id}`, spec, { actions: false })
    .catch(() => console.log(`Chart ${id} not yet built (${spec})`));
});
