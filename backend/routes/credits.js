const express = require("express");
const router = express.Router();

// Static credit data
const CREDITS = [
  { id: 1, name: "Amazon Rainforest REDD+",   type: "Forestry",        country: "Brazil",     registry: "Verra VCS",    price: 14.5, vintage: 2023, available: 12400, certId: "VCS-2301-BR", desc: "Protects 180,000 hectares of threatened Amazon rainforest.", sdgs: [13,15,1],  color: "#22c55e", icon: "🌿" },
  { id: 2, name: "Solar Farm Gujarat",         type: "Renewable Energy", country: "India",     registry: "Gold Standard", price: 9.8,  vintage: 2023, available: 8200,  certId: "GS-4521-IN",  desc: "25MW solar installation for 40,000 rural households.",      sdgs: [7,13,8],   color: "#f59e0b", icon: "☀️" },
  { id: 3, name: "Kenya Clean Cookstoves",     type: "Clean Cooking",   country: "Kenya",      registry: "Gold Standard", price: 18.2, vintage: 2022, available: 3100,  certId: "GS-3876-KE",  desc: "Distributes efficient cookstoves to 25,000 families.",      sdgs: [3,5,13],   color: "#06b6d4", icon: "🔥" },
  { id: 4, name: "Mangrove Restoration",       type: "Blue Carbon",     country: "Indonesia",  registry: "Verra VCS",    price: 22.0, vintage: 2023, available: 5600,  certId: "VCS-1987-ID", desc: "Restores 8,500 hectares of mangrove ecosystems.",           sdgs: [14,13,15], color: "#8b5cf6", icon: "🌊" },
  { id: 5, name: "Wind Power Rajasthan",       type: "Renewable Energy", country: "India",     registry: "ACR",           price: 7.5,  vintage: 2022, available: 15000, certId: "ACR-6643-IN", desc: "150MW wind farm displacing coal thermal power.",            sdgs: [7,13,9],   color: "#ec4899", icon: "💨" },
  { id: 6, name: "Borneo Peatland Protection", type: "Conservation",    country: "Malaysia",   registry: "Verra VCS",    price: 26.0, vintage: 2023, available: 2800,  certId: "VCS-2089-MY", desc: "Protects 45,000 hectares of carbon-rich peatland.",        sdgs: [15,13,6],  color: "#10b981", icon: "🌳" },
  { id: 7, name: "Methane Capture Landfill",   type: "Waste Management", country: "Mexico",    registry: "Verra VCS",    price: 11.0, vintage: 2023, available: 9500,  certId: "VCS-3312-MX", desc: "Converts landfill methane to electricity.",                sdgs: [7,11,13],  color: "#f97316", icon: "♻️" },
  { id: 8, name: "Himalayan Biogas",           type: "Clean Energy",    country: "Nepal",      registry: "Gold Standard", price: 16.5, vintage: 2022, available: 4200,  certId: "GS-2241-NP",  desc: "Household biogas digesters for 12,000 rural Nepali homes.",sdgs: [7,3,13],   color: "#a3e635", icon: "⚡" },
];

// GET /api/credits
router.get("/", (req, res) => {
  let list = [...CREDITS];
  const { type, search, sort } = req.query;
  if (type && type !== "All") list = list.filter(c => c.type === type);
  if (search) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase()));
  if (sort === "price-asc")   list.sort((a,b) => a.price - b.price);
  if (sort === "price-desc")  list.sort((a,b) => b.price - a.price);
  if (sort === "available")   list.sort((a,b) => b.available - a.available);
  res.json(list);
});

// GET /api/credits/:id
router.get("/:id", (req, res) => {
  const credit = CREDITS.find(c => c.id === parseInt(req.params.id));
  if (!credit) return res.status(404).json({ error: "Credit not found" });
  res.json(credit);
});

module.exports = router;
