// Local fallback — app uses /api/credits from backend
export const CREDITS = [
  { id:1, name:"Amazon Rainforest REDD+",   type:"Forestry",          country:"Brazil",    registry:"Verra VCS",    price:14.5, vintage:2023, available:12400, certId:"VCS-2301-BR", sdgs:[13,15,1],  color:"#22c55e", icon:"🌿", desc:"Protects 180,000 hectares of threatened Amazon rainforest." },
  { id:2, name:"Solar Farm Gujarat",         type:"Renewable Energy",  country:"India",     registry:"Gold Standard",price:9.8,  vintage:2023, available:8200,  certId:"GS-4521-IN",  sdgs:[7,13,8],   color:"#f59e0b", icon:"☀️", desc:"25MW solar for 40,000 rural households in Gujarat." },
  { id:3, name:"Kenya Clean Cookstoves",     type:"Clean Cooking",     country:"Kenya",     registry:"Gold Standard",price:18.2, vintage:2022, available:3100,  certId:"GS-3876-KE",  sdgs:[3,5,13],   color:"#06b6d4", icon:"🔥", desc:"Efficient cookstoves for 25,000 families." },
  { id:4, name:"Mangrove Restoration",       type:"Blue Carbon",       country:"Indonesia", registry:"Verra VCS",    price:22.0, vintage:2023, available:5600,  certId:"VCS-1987-ID", sdgs:[14,13,15], color:"#8b5cf6", icon:"🌊", desc:"Restores 8,500 hectares of mangrove ecosystems." },
  { id:5, name:"Wind Power Rajasthan",       type:"Renewable Energy",  country:"India",     registry:"ACR",          price:7.5,  vintage:2022, available:15000, certId:"ACR-6643-IN", sdgs:[7,13,9],   color:"#ec4899", icon:"💨", desc:"150MW wind farm replacing thermal power." },
  { id:6, name:"Borneo Peatland Protection", type:"Conservation",      country:"Malaysia",  registry:"Verra VCS",    price:26.0, vintage:2023, available:2800,  certId:"VCS-2089-MY", sdgs:[15,13,6],  color:"#10b981", icon:"🌳", desc:"Protects 45,000 hectares of carbon-rich peatland." },
  { id:7, name:"Methane Capture Landfill",   type:"Waste Management",  country:"Mexico",    registry:"Verra VCS",    price:11.0, vintage:2023, available:9500,  certId:"VCS-3312-MX", sdgs:[7,11,13],  color:"#f97316", icon:"♻️", desc:"Converts landfill methane to electricity." },
  { id:8, name:"Himalayan Biogas",           type:"Clean Energy",      country:"Nepal",     registry:"Gold Standard",price:16.5, vintage:2022, available:4200,  certId:"GS-2241-NP",  sdgs:[7,3,13],   color:"#a3e635", icon:"⚡", desc:"Biogas digesters for 12,000 Nepali homes." },
];

export const SDG_MAP = {
  1:"No Poverty", 3:"Good Health", 5:"Gender Equality", 6:"Clean Water",
  7:"Clean Energy", 8:"Decent Work", 9:"Industry Innovation",
  11:"Sustainable Cities", 13:"Climate Action", 14:"Life Below Water", 15:"Life on Land"
};
