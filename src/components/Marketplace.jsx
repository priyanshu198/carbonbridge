import { useState, useEffect } from "react";
import axios from "axios";
import { T } from "../App.jsx";
import Badge from "./ui/Badge.jsx";

function CreditCard({ c, onSelect }) {
  const [hov,setHov]=useState(false);
  return (
    <div onClick={()=>onSelect(c)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?"#111d30":"#0d1525",border:`1.5px solid ${hov?c.color+"66":"rgba(56,189,248,0.12)"}`,borderRadius:20,padding:24,cursor:"pointer",transition:"all .25s",transform:hov?"translateY(-3px)":"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><Badge color={c.color}>{c.type}</Badge><span style={{fontSize:12,color:T.text3}}>🏳️ {c.country}</span></div>
      <div style={{fontSize:28,marginBottom:8}}>{c.icon}</div>
      <h3 style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:16,marginBottom:8,lineHeight:1.3}}>{c.name}</h3>
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}><Badge color={T.text3}>{c.registry}</Badge><Badge color={T.text3}>Vintage {c.vintage}</Badge></div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:24,fontWeight:900,color:T.green}}>${c.price.toFixed(2)}</div><div style={{fontSize:11,color:T.text3}}>per tonne CO₂</div></div>
        <div style={{textAlign:"right"}}><div style={{fontSize:12,color:T.text2,fontWeight:600}}>{c.available.toLocaleString()}</div><div style={{fontSize:11,color:T.text3}}>credits left</div></div>
      </div>
    </div>
  );
}

export default function Marketplace({ setPage, setSelectedCredit }) {
  const [credits,setCredits]=useState([]); const [filter,setFilter]=useState("All"); const [search,setSearch]=useState(""); const [sort,setSort]=useState("price-asc"); const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const q=new URLSearchParams();
    if(filter!=="All")q.set("type",filter);
    if(search)q.set("search",search);
    q.set("sort",sort);
    axios.get(`/api/credits?${q}`).then(r=>setCredits(r.data)).catch(()=>{}).finally(()=>setLoading(false));
  },[filter,search,sort]);
  const types=["All","Forestry","Renewable Energy","Clean Cooking","Blue Carbon","Conservation","Waste Management","Clean Energy"];
  return (
    <div className="fade" style={{maxWidth:1200,margin:"0 auto",padding:"40px 24px"}}>
      <div style={{marginBottom:28}}><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:32,fontWeight:800,marginBottom:6}}>Carbon Credit Marketplace</h1><p style={{color:T.text2}}>{credits.length} verified projects</p></div>
      <div style={{display:"flex",gap:12,marginBottom:18,flexWrap:"wrap"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search projects…" style={{flex:1,minWidth:200,background:T.bg2,border:`1.5px solid ${T.border}`,borderRadius:10,padding:"10px 16px",color:T.text,fontSize:14,outline:"none"}} />
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{background:T.bg2,border:`1.5px solid ${T.border}`,borderRadius:10,padding:"10px 14px",color:T.text,fontSize:13,outline:"none"}}>
          <option value="price-asc">Price: Low→High</option><option value="price-desc">Price: High→Low</option><option value="available">Most Available</option>
        </select>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:28,flexWrap:"wrap"}}>
        {types.map(f=><button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?"rgba(14,165,233,0.15)":"rgba(255,255,255,0.04)",color:filter===f?T.teal:T.text2,border:`1px solid ${filter===f?T.teal:T.border}`,borderRadius:20,padding:"5px 14px",cursor:"pointer",fontSize:12,fontWeight:600}}>{f}</button>)}
      </div>
      {loading ? <div style={{textAlign:"center",padding:80,color:T.text2}}>Loading credits…</div> :
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:20}}>
          {credits.map(c=><CreditCard key={c.id} c={c} onSelect={credit=>{setSelectedCredit(credit);setPage("detail");}} />)}
        </div>}
    </div>
  );
}
