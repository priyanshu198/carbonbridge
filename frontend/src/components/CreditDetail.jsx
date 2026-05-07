import { useState } from "react";
import { T } from "../App.jsx";
import { SDG_MAP as SDG } from "../data/credits.js";
import Btn from "./ui/Btn.jsx";
import Card from "./ui/Card.jsx";
import Badge from "./ui/Badge.jsx";

const fmtUSD = n => "$" + Number(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const Divider = () => <div style={{height:1,background:"rgba(56,189,248,0.12)",margin:"14px 0"}} />;

export default function CreditDetail({ credit:c, setPage, user }) {
  const [qty,setQty]=useState(1);
  if(!c){setPage("marketplace");return null;}
  const total=qty*c.price;
  return (
    <div className="fade" style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px"}}>
      <button onClick={()=>setPage("marketplace")} style={{background:"transparent",color:T.teal,border:`1px solid ${T.border}`,borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:13,marginBottom:28}}>← Back</button>
      <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:28,alignItems:"start"}}>
        <div>
          <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}><Badge color={c.color}>{c.type}</Badge><Badge color={T.green}>{c.registry}</Badge><Badge color={T.text3}>Vintage {c.vintage}</Badge></div>
          <h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:32,fontWeight:900,marginBottom:6}}>{c.name}</h1>
          <p style={{color:T.text2,fontSize:14,marginBottom:20}}>📍 {c.country} • 🔖 {c.certId}</p>
          <Card style={{padding:24,marginBottom:18}}><h3 style={{fontWeight:700,marginBottom:10}}>About</h3><p style={{color:T.text2,lineHeight:1.75,fontSize:14}}>{c.desc}</p></Card>
          <Card style={{padding:24,marginBottom:18}}>
            <h3 style={{fontWeight:700,marginBottom:14}}>SDG Alignment</h3>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {c.sdgs.map(s=><div key={s} style={{background:"rgba(56,189,248,0.08)",border:`1px solid ${T.border}`,borderRadius:10,padding:"8px 12px",fontSize:13,color:T.teal,fontWeight:600}}>🎯 SDG {s} — {SDG[s]}</div>)}
            </div>
          </Card>
          <Card style={{padding:24}}>
            <h3 style={{fontWeight:700,marginBottom:14}}>Registry Info</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["Registry",c.registry],["Certificate",c.certId],["Vintage",c.vintage],["Available",c.available.toLocaleString()+"t"]].map(([k,v])=>(
                <div key={k} style={{background:T.bg3,borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:11,color:T.text3,marginBottom:3,textTransform:"uppercase"}}>{k}</div><div style={{fontSize:14,fontWeight:600}}>{v}</div></div>
              ))}
            </div>
          </Card>
        </div>
        <div style={{position:"sticky",top:80}}>
          <Card style={{padding:28}}>
            <div style={{marginBottom:22}}><div style={{fontFamily:"'Outfit',sans-serif",fontSize:36,fontWeight:900,color:T.green}}>{fmtUSD(c.price)}</div><div style={{fontSize:13,color:T.text3}}>per tonne CO₂</div></div>
            <div style={{marginBottom:18}}>
              <label style={{display:"block",fontSize:13,fontWeight:600,color:T.text2,marginBottom:8}}>Quantity (tonnes)</label>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <button onClick={()=>setQty(Math.max(1,qty-1))} style={{width:38,height:38,borderRadius:10,background:T.bg3,border:`1px solid ${T.border}`,color:T.teal,fontSize:20,cursor:"pointer"}}>−</button>
                <div style={{flex:1,textAlign:"center",fontFamily:"'Outfit',sans-serif",fontSize:24,fontWeight:800}}>{qty}</div>
                <button onClick={()=>setQty(Math.min(c.available,qty+1))} style={{width:38,height:38,borderRadius:10,background:T.bg3,border:`1px solid ${T.border}`,color:T.teal,fontSize:20,cursor:"pointer"}}>+</button>
              </div>
            </div>
            <div style={{background:T.bg3,borderRadius:12,padding:"14px 16px",marginBottom:18}}>
              {[["Credits",qty+"t CO₂"],["Subtotal",fmtUSD(total)],["Fee (2%)",fmtUSD(total*0.02)]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13,color:T.text2,marginBottom:6}}><span>{k}</span><span>{v}</span></div>)}
              <Divider/><div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:16}}><span>Total</span><span style={{color:T.green}}>{fmtUSD(total*1.02)}</span></div>
            </div>
            <Btn full onClick={()=>setPage(user?"checkout":"login")} style={{marginBottom:10}}>💳 {user?"Proceed to Checkout":"Login to Purchase"}</Btn>
            <p style={{textAlign:"center",fontSize:12,color:T.text3}}>🔒 Secure • Instant wallet credit</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
