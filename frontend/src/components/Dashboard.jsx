import { useState, useEffect } from "react";
import axios from "axios";
import { T } from "../App.jsx";
import Btn from "./ui/Btn.jsx";
import Card from "./ui/Card.jsx";
import Badge from "./ui/Badge.jsx";
import Spinner from "./ui/Spinner.jsx";

const fmtUSD = n => "$" + Number(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});

export default function Dashboard({ user, setPage, token, showToast }) {
  const [tab,setTab]=useState("wallet"); const [orders,setOrders]=useState([]); const [retiring,setRetiring]=useState(null); const [loading,setLoading]=useState(true);

  const fetchOrders = () => axios.get("/api/orders/my",{headers:{Authorization:`Bearer ${token}`}}).then(r=>setOrders(r.data)).finally(()=>setLoading(false));
  useEffect(()=>{fetchOrders();},[]);

  const retire = async (order) => {
    setRetiring(order._id);
    try {
      await axios.patch(`/api/orders/${order._id}/retire`,{},{headers:{Authorization:`Bearer ${token}`}});
      await fetchOrders();showToast("Credits retired! 🌿");
    } catch { showToast("Retire failed.","error"); }
    setRetiring(null);
  };

  const active=orders.filter(o=>!o.retired); const retired=orders.filter(o=>o.retired);
  const totalOffset=retired.reduce((a,b)=>a+b.qty,0); const totalSpent=orders.reduce((a,b)=>a+b.total,0);

  return (
    <div className="fade" style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28,flexWrap:"wrap",gap:14}}>
        <div><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:800,marginBottom:6}}>Welcome back, {user.name.split(" ")[0]} 👋</h1><div style={{display:"flex",gap:8}}><Badge color={T.teal}>{user.role}</Badge><Badge color={T.green}>KYC Verified ✅</Badge></div></div>
        <Btn onClick={()=>setPage("marketplace")}>+ Buy Credits</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:14,marginBottom:28}}>
        {[{l:"Active Credits",v:active.reduce((a,b)=>a+b.qty,0)+"t",icon:"💼",color:T.teal},{l:"CO₂ Offset",v:totalOffset+"t",icon:"🌍",color:T.green},{l:"Total Invested",v:fmtUSD(totalSpent),icon:"💰",color:"#f59e0b"},{l:"Projects",v:orders.length,icon:"📋",color:"#8b5cf6"}].map(s=>(
          <Card key={s.l} style={{padding:18}}><div style={{fontSize:26,marginBottom:6}}>{s.icon}</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:800,color:s.color}}>{s.v}</div><div style={{fontSize:12,color:T.text3,marginTop:2}}>{s.l}</div></Card>
        ))}
      </div>
      <div style={{display:"flex",gap:0,marginBottom:22,borderBottom:`1px solid ${T.border}`}}>
        {[["wallet","💼 Wallet"],["history","📊 History"],["certs","📜 Certificates"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{background:"transparent",color:tab===k?T.teal:T.text2,border:"none",borderBottom:tab===k?`2px solid ${T.teal}`:"2px solid transparent",padding:"10px 18px",cursor:"pointer",fontSize:14,fontWeight:600,marginBottom:-1}}>{l}</button>
        ))}
      </div>
      {loading&&<div style={{textAlign:"center",padding:60,color:T.text2}}>Loading wallet… <Spinner/></div>}
      {!loading&&tab==="wallet"&&(!active.length?
        <div style={{textAlign:"center",padding:60}}><div style={{fontSize:48,marginBottom:14}}>💼</div><p style={{color:T.text2,marginBottom:20}}>No active credits. Buy some!</p><Btn onClick={()=>setPage("marketplace")}>Browse Credits →</Btn></div>:
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {active.map(o=>(
            <Card key={o._id} style={{padding:20,display:"flex",gap:18,alignItems:"center",flexWrap:"wrap"}}>
              <div style={{fontSize:28}}>{o.icon}</div>
              <div style={{flex:1,minWidth:160}}><div style={{fontWeight:700,fontSize:14}}>{o.creditName}</div><div style={{fontSize:12,color:T.text2,marginTop:2}}>{o.registry} • {new Date(o.createdAt).toLocaleDateString()}</div><Badge color={T.teal} style={{marginTop:8}}>Active</Badge></div>
              <div style={{textAlign:"center"}}><div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:T.green}}>{o.qty}t</div><div style={{fontSize:11,color:T.text3}}>CO₂</div></div>
              <div style={{textAlign:"center"}}><div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700}}>{fmtUSD(o.total)}</div><div style={{fontSize:11,color:T.text3}}>Paid</div></div>
              <Btn size="sm" variant="success" onClick={()=>retire(o)} disabled={retiring===o._id}>{retiring===o._id?<><Spinner/> Retiring…</>:"🌿 Retire"}</Btn>
            </Card>
          ))}
        </div>
      )}
      {!loading&&tab==="history"&&(!orders.length?<div style={{textAlign:"center",padding:60,color:T.text3}}>No transactions yet.</div>:
        <Card style={{overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{borderBottom:`1px solid ${T.border}`}}>{["Date","Project","Qty","Total","Status"].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",fontSize:11,color:T.text3,fontWeight:700,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
            <tbody>{orders.map(o=><tr key={o._id} style={{borderBottom:`1px solid ${T.border}`}}><td style={{padding:"13px 14px",fontSize:13,color:T.text2}}>{new Date(o.createdAt).toLocaleDateString()}</td><td style={{padding:"13px 14px",fontSize:13,fontWeight:600}}>{o.icon} {o.creditName}</td><td style={{padding:"13px 14px",fontSize:13}}>{o.qty}t</td><td style={{padding:"13px 14px",fontSize:13,fontWeight:700,color:T.green}}>{fmtUSD(o.total)}</td><td style={{padding:"13px 14px"}}>{o.retired?<Badge color={T.green}>Retired</Badge>:<Badge color={T.teal}>Active</Badge>}</td></tr>)}</tbody>
          </table>
        </Card>
      )}
      {!loading&&tab==="certs"&&(!retired.length?
        <div style={{textAlign:"center",padding:60,color:T.text3}}><div style={{fontSize:44,marginBottom:12}}>📜</div><p>Retire credits to generate certificates.</p></div>:
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18}}>
          {retired.map(o=>(
            <div key={o._id} style={{background:"linear-gradient(135deg,rgba(52,211,153,0.07),rgba(14,165,233,0.05))",border:"1.5px solid rgba(52,211,153,0.25)",borderRadius:20,padding:24}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div style={{fontSize:11,color:T.green,fontWeight:700,letterSpacing:1}}>RETIREMENT CERTIFICATE</div><Badge color={T.green}>✅ Verified</Badge></div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:18,fontWeight:800,marginBottom:4}}>{o.certId}</div>
              <div style={{fontSize:13,color:T.text2,marginBottom:14}}>{o.creditName}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                {[["Offset",`${o.qty}t CO₂`],["Date",new Date(o.retiredAt).toLocaleDateString()],["Registry",o.registry],["Issued To",user.name.split(" ")[0]]].map(([k,v])=><div key={k} style={{background:"rgba(0,0,0,0.2)",borderRadius:8,padding:"8px 10px"}}><div style={{fontSize:10,color:T.text3}}>{k}</div><div style={{fontSize:12,fontWeight:700,color:T.text,marginTop:2}}>{v}</div></div>)}
              </div>
              <Btn full size="sm" variant="success">⬇️ Download Certificate</Btn>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
