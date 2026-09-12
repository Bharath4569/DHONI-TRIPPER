async function loadGuides() {
  const res = await fetch("/api/guides");
  const guides = await res.json();
  const container = document.getElementById("guideContainer");

  guides.forEach((g) => {
    const card = document.createElement("div");
    card.className = "guide-card";
    card.innerHTML = `
      <img src="${g.photo}" alt="${g.name}">
      <div class="info">
        <h3>${g.name}</h3>
        <p>${g.bio}</p>
        ${g.isVerified ? "<span class='verified'>✅ Blockchain Verified</span>" : "<span>Not Verified</span>"}
      </div>
    `;
    container.appendChild(card);
  });
}

loadGuides();
