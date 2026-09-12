const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authcontroller");
const { createItinerary } = require("../controllers/itineraryController");
const { getGuides } = require("../controllers/guideController");

// Auth routes for frontend compatibility
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/signup", signup);
router.post("/login", login);
router.post("/itinerary", createItinerary);
router.get("/guides", getGuides);

router.get("/locations", (req, res) => {
  res.json([
    {
      name: "Hundru Falls",
      lat: 23.43,
      lon: 85.42,
      desc: "Majestic waterfall near Ranchi",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Patratu Valley",
      lat: 23.64,
      lon: 85.34,
      desc: "Beautiful hill valley view",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Netarhat",
      lat: 23.48,
      lon: 84.27,
      desc: "Queen of Chotanagpur hills",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
    }
  ]);
});

module.exports = router;
