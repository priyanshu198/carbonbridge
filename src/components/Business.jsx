import { T } from "../App.jsx";
import Btn from "./ui/Btn.jsx";

export default function Business({ setPage }) {
  const plans=[{tier:"Startup",price:"$199/mo",features:["500 credits/month","Basic ESG Dashboard","PDF Certificates","Email Support"],color:T.teal,hot:false},{tier:"Business",price:"$799/mo",features:["Unlimited credits","Advanced ESG Reporting","API Access","Dedicated Manager","Custom Branding"],color:T.green,hot:true},{tier:"Enterprise",price:"Custom",features:["White-label solution","Registry API Integration","Multi-entity management","SLA Support","Custom workflows"],color:"#a78bfa",hot:false}];
  return (
    <div className="fade" style={{maxWidth:960,margin:"0 auto",padding:"60px 24px"}}>
      <div style={{textAlign:"center",marginBottom:52}}><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:38,fontWeight:900,marginBottom:10}}>For Businesses & Enterprises</h1><p style={{color:T.text2,fontSize:15,maxWidth:500,margin:"0 auto"}}>Bulk credits, ESG dashboards, employee offset programs, and white-label solutions.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20,marginBottom:52}}>
        {plans.map(plan=>(
          <div key={plan.tier} style={{background:plan.hot?"linear-gradient(135deg,rgba(14,165,233,0.1),rgba(52,211,153,0.08))":T.bg2,border:`2px solid ${plan.hot?plan.color:T.border}`,borderRadius:22,padding:28,position:"relative"}}>
            {plan.hot&&<div style={{position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",background:T.grad,color:"#fff",borderRadius:20,padding:"4px 16px",fontSize:12,fontWeight:700}}>MOST POPULAR</div>}
            <h3 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:plan.color,marginBottom:6}}>{plan.tier}</h3>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:30,fontWeight:900,marginBottom:22}}>{plan.price}</div>
            {plan.features.map(f=><div key={f} style={{display:"flex",gap:8,marginBottom:10,fontSize:14,color:T.text2}}><span style={{color:plan.color}}>✓</span>{f}</div>)}
            <Btn full variant={plan.hot?"primary":"outline"} onClick={()=>setPage("register")} style={{marginTop:18}}>Get Started →</Btn>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center"}}><p style={{color:T.text2,marginBottom:14}}>Need a custom solution?</p><Btn variant="ghost">📩 Contact Sales</Btn></div>
    </div>
  );
}
