// maps.js - Leaflet OSM map with BM_VENUES markers and counts
document.addEventListener("DOMContentLoaded", () => {
  const venues = window.BM_VENUES || [];

  // Shared function to calculate today's RSVP count for a venue
  function getTodayCount(venueId) {
    const raw = localStorage.getItem("bm_rsvps");
    if (!raw) return 0;
    const arr = JSON.parse(raw);
    const today = new Date().toISOString().split("T")[0];
    return arr.filter((r) => r.venueId === venueId && r.date === today).length;
  }

  // Shared function to initialize a Leaflet map
  function initMap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    const map = L.map(container).setView([-23.55, -46.63], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );
    return map;
  }

  // Shared function to add venue markers (and optional circles) to a map
  function addVenueMarkers(map, venues, popupExtra = "", addCircle = false) {
    venues.forEach((v) => {
      const count = getTodayCount(v.id);
      let popup = `<strong>${v.name}</strong><br/>Confirmados: <strong>${count}</strong>`;
      if (popupExtra) popup += popupExtra;
      const marker = L.marker([v.coords.lat, v.coords.lng]).addTo(map);
      marker.bindPopup(popup);
      if (addCircle) {
        const circle = L.circle([v.coords.lat, v.coords.lng], {
          radius: 100 + count * 30,
          color: "#2575fc",
          fillColor: "#2575fc",
          fillOpacity: 0.2,
        }).addTo(map);
      }
    });
  }

  // Mini map on index.html
  const miniMap = initMap("miniMap");
  if (miniMap) {
    addVenueMarkers(
      miniMap,
      venues,
      "<br/><small>(identidades ocultas)</small>",
      false
    );
  }

  // Full map on venues.html
  const fullMap = initMap("miniMapFull");
  if (fullMap) {
    addVenueMarkers(fullMap, venues, "", false);
  }

  // Dashboard map
  const dashMap = initMap("map");
  if (dashMap) {
    addVenueMarkers(dashMap, venues, "", true);
  }
});
