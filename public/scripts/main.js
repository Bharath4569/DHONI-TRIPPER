const tripForm = document.getElementById("tripForm");
if (tripForm) {
  tripForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const interests = document.getElementById("interests").value.trim();
    const days = Number(document.getElementById("days").value);
    const baseAmount = Number(document.getElementById("baseAmount").value);
    const budget = Number(document.getElementById("budget").value);

    const loadingSpinner = document.getElementById("loadingSpinner");
    const itineraryResult = document.getElementById("itineraryResult");

    loadingSpinner.style.display = "block";
    itineraryResult.innerHTML = "";

    const response = await fetch("/api/itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interests, days, baseAmount, budget })
    });

    const result = await response.json();
    loadingSpinner.style.display = "none";

    if (!result.plan || !Array.isArray(result.plan)) {
      itineraryResult.innerHTML = "<p class='error-message'>Unable to generate itinerary.</p>";
      return;
    }

    const summary = document.createElement("div");
    summary.className = "itinerary-summary";
    summary.innerHTML = `
      <h3>Trip Overview</h3>
      <p><strong>Base Amount:</strong> ₹${Number(result.baseAmount || baseAmount).toLocaleString("en-IN")}</p>
      <p><strong>Total Budget:</strong> ₹${Number(result.budget || budget).toLocaleString("en-IN")}</p>
    `;

    itineraryResult.appendChild(summary);

    result.plan.forEach((day, index) => {
      const card = document.createElement("div");
      card.className = "day-card";
      card.innerHTML = `
        <h4>Day ${index + 1}</h4>
        <p>${day}</p>
      `;
      itineraryResult.appendChild(card);
    });
  });
}

const logoutBtn = document.getElementById("logoutBtn");
const userSection = document.getElementById("userSection");
const token = localStorage.getItem("token");

if (token) {
  if (userSection) userSection.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "inline-block";
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
  });
}

