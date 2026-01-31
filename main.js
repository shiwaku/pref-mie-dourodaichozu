const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const map = new maplibregl.Map({
  container: "map",
  style: "dourodaichozu-style.json",
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
      '<a href="https://github.com/shiwaku/city-shizuoka-kihonzu-on-dm" target="_blank">GitHub</a> | ',
  }),
);
