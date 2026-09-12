const map = L.map("map").setView([23.61, 85.27], 7);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

async function loadLocations() {
  const res = await fetch("/api/locations");
  const locations = await res.json();

  locations.forEach((loc) => {
    const popupContent = `
      <div style="width: 200px;">
        <img src="${loc.image || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"}" alt="${loc.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
        <b>${loc.name}</b>
        <p>${loc.desc}</p>
      </div>
    `;

    L.marker([loc.lat, loc.lon])
      .addTo(map)
      .bindPopup(popupContent, { maxWidth: 220 });
  });
}

loadLocations();
