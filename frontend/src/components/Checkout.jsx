import { useState } from "react";
import axios from "axios";
import { T } from "../App.jsx";
import Btn from "./ui/Btn.jsx";
import Card from "./ui/Card.jsx";
import Inp from "./ui/Inp.jsx";
import Spinner from "./ui/Spinner.jsx";

const fmtUSD = n => "$" + Number(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const Divider = () => <div style={{height:1,background:"rgba(56,189,248,0.12)",margin:"14px 0"}} />;
const sleep = ms => new Promise(r => setTimeout(r, ms));

export default function Checkout({ credit, setPage, user, token, showToast }) {
  const [step,setStep]=useState(0); const [cert,setCert]=useState(""); const [card,setCard]=useState({num:"",exp:"",cvv:"",name:""});
  const qty=1; if(!credit){setPage("marketplace");return null;}
  const total=qty*credit.price*1.02;

  const pay = async () => {
    if(!card.num||!card.exp||!card.cvv||!card.name)return;
    setStep(2);
    try {
      const { data } = await axios.post("/api/orders",{creditId:credit.id,creditName:credit.name,registry:credit.registry,qty,priceEach:credit.price,icon:credit.icon,color:credit.color,type:credit.type},{headers:{Authorization:`Bearer ${token}`}});
      await sleep(1500);setCert(data.certId);setStep(3);showToast("Purchase successful! 🎉");
    } catch { setStep(1);showToast("Payment failed. Try again.","error"); }
  };

  return (
    <div className="fade" style={{maxWidth:640,margin:"0 auto",padding:"40px 24px"}}>
      <button onClick={()=>setPage("detail")} style={{background:"transparent",color:T.teal,border:`1px solid ${T.border}`,borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:13,marginBottom:24}}>← Back</button>
      <h1 style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:26,marginBottom:24}}>{step===3?"Purchase Complete! 🎉":"Checkout"}</h1>
      {step===2&&<Card style={{padding:48,textAlign:"center"}}><Spinner/><div style={{marginTop:18,fontSize:16,fontWeight:600}}>Processing payment…</div></Card>}
      {step===3&&(
        <Card style={{padding:32,textAlign:"center"}}>
          <div style={{fontSize:60,marginBottom:14}} className="float">🎉</div>
          <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:800,color:T.green,marginBottom:8}}>Payment Successful!</h2>
          <div style={{background:"rgba(52,211,153,0.08)",border:"1px solid rgba(52,211,153,0.2)",borderRadius:14,padding:18,marginBottom:20}}><div style={{fontSize:12,color:T.text3,marginBottom:4}}>Certificate ID</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:900,color:T.green}}>{cert}</div></div>
          <div style={{display:"flex",gap:10}}><Btn full variant="outline" onClick={()=>setPage("dashboard")}>View Wallet</Btn><Btn full onClick={()=>setPage("marketplace")}>Buy More</Btn></div>
        </Card>
      )}
      {step===0&&(
        <Card style={{padding:24,marginBottom:18}}>
          <h3 style={{fontWeight:700,marginBottom:14}}>Order Summary</h3>
          <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:14}}><div style={{fontSize:32}}>{credit.icon}</div><div><div style={{fontWeight:700}}>{credit.name}</div><div style={{fontSize:13,color:T.text2}}>{credit.registry} • {credit.country}</div></div></div>
          <Divider/>
          {[["Credits",qty+"t CO₂"],["Subtotal",fmtUSD(credit.price*qty)],["Fee (2%)",fmtUSD(credit.price*qty*0.02)]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:14,color:T.text2,marginBottom:8}}><span>{k}</span><span>{v}</span></div>)}
          <Divider/><div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:18}}><span>Total</span><span style={{color:T.green}}>{fmtUSD(total)}</span></div>
          <Btn full onClick={()=>setStep(1)} style={{marginTop:18}}>Continue to Payment →</Btn>
        </Card>
      )}
      {step===1&&(
        <Card style={{padding:28}}>
          <h3 style={{fontWeight:700,marginBottom:18}}>💳 Payment Details</h3>
          <Inp label="Cardholder Name" value={card.name} onChange={v=>setCard(p=>({...p,name:v}))} placeholder="As on card" icon="👤" />
          <Inp label="Card Number" value={card.num} onChange={v=>setCard(p=>({...p,num:v}))} placeholder="1234 5678 9012 3456" icon="💳" />
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Inp label="Expiry" value={card.exp} onChange={v=>setCard(p=>({...p,exp:v}))} placeholder="MM/YY" icon="📅" />
            <Inp label="CVV" type="password" value={card.cvv} onChange={v=>setCard(p=>({...p,cvv:v}))} placeholder="•••" icon="🔐" />
          </div>
          <Btn full onClick={pay}>🔒 Pay {fmtUSD(total)}</Btn>
        </Card>
      )}
    </div>
  );
}
