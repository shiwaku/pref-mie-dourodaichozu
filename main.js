const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const map = new maplibregl.Map({
  container: "map",
  style: "pale.json",
  zoom: 15.8,
  minZoom: 2,
  maxZoom: 20,
  center: [136.6958315, 35.0432594],
  hash: true,
  bearing: 0,
  pitch: 0,
  maxPitch: 85,
  attributionControl: false,
});

map.on("load", () => {
  map.addSource("dourodaichozu", {
    type: "vector",
    url: "pmtiles://https://pmtiles-data.s3.ap-northeast-1.amazonaws.com/pref-mie/dourodaichozu.pmtiles",
    attribution: '<a href="https://data.bodik.jp/dataset/240001_mieken_dourodaityouhuzu" target="_blank">三重県道路台帳附図</a>',
  });

  map.addLayer({
    id: "dourodaichozu_polygon_fill",
    type: "fill",
    source: "dourodaichozu",
    "source-layer": "dourodaichozu_polygon",
    paint: {
      "fill-color": "#ffffff",
      "fill-opacity": 0.25,
    },
  });

  map.addLayer({
    id: "dourodaichozu_polygon_outline",
    type: "line",
    source: "dourodaichozu",
    "source-layer": "dourodaichozu_polygon",
    paint: {
      "line-color": "#000000",
      "line-width": 0.6,
    },
  });

  map.addLayer({
    id: "dourodaichozu_line",
    type: "line",
    source: "dourodaichozu",
    "source-layer": "dourodaichozu_line",
    paint: {
      "line-color": "#000000",
      "line-width": 1,
    },
  });

  map.addLayer({
    id: "dourodaichozu_annotation",
    type: "symbol",
    source: "dourodaichozu",
    "source-layer": "dourodaichozu_annotation",
    layout: {
      "text-field": ["coalesce", ["get", "String"], ""],
      "text-size": 11,
      "text-anchor": "center",
      "text-offset": [1.5, -1],
      "text-rotation-alignment": "map",
      "text-rotate": [
        "let",
        "a",
        ["coalesce", ["to-number", ["get", "Angle"]], 0],
        [
          "case",
          ["any", ["==", ["var", "a"], 90], ["==", ["var", "a"], -90]],
          0,
          ["*", -1, ["var", "a"]],
        ],
      ],
    },
    paint: {
      "text-color": "#000",
      "text-halo-color": "#fff",
      "text-halo-width": 1.5,
    },
  });

  const dourodaichouzu_layers = [
    "dourodaichozu_polygon_fill",
    "dourodaichozu_polygon_outline",
    "dourodaichozu_line",
    "dourodaichozu_annotation",
  ];

  document.getElementById("toggle-dourodaichozu").addEventListener("change", (e) => {
    const visibility = e.target.checked ? "visible" : "none";
    dourodaichouzu_layers.forEach((id) => {
      map.setLayoutProperty(id, "visibility", visibility);
    });
  });
});

map.addControl(new maplibregl.NavigationControl());
map.addControl(new maplibregl.FullscreenControl());
map.addControl(new maplibregl.ScaleControl({ maxWidth: 200, unit: "metric" }));
map.addControl(
  new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: false },
    fitBoundsOptions: { maxZoom: 18 },
    trackUserLocation: true,
    showUserLocation: true,
  }),
);
map.addControl(
  new maplibregl.AttributionControl({
    compact: true,
    customAttribution:
      '<a href="https://twitter.com/shi__works" target="_blank">X(旧Twitter)</a> | ' +
      '<a href="https://github.com/shiwaku/pref-mie-dourodaichozu" target="_blank">GitHub</a> | ',
  }),
);
