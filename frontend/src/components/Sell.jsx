import { useState } from "react";
import { T } from "../App.jsx";
import Btn from "./ui/Btn.jsx";
import Card from "./ui/Card.jsx";
import Inp from "./ui/Inp.jsx";
import Spinner from "./ui/Spinner.jsx";
import ProgressBar from "./ui/ProgressBar.jsx";

const sleep = ms => new Promise(r => setTimeout(r, ms));
const Sel = ({ label,value,onChange,options }) => (
  <div style={{marginBottom:18}}>{label&&<label style={{display:"block",fontSize:13,fontWeight:600,color:T.text2,marginBottom:6}}>{label}</label>}<select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",background:T.bg2,border:`1.5px solid rgba(56,189,248,0.12)`,borderRadius:10,padding:"11px 14px",color:T.text,fontSize:14,outline:"none"}}>{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
);

export default function Sell({ setPage, user, showToast }) {
  const [step,setStep]=useState(0); const [form,setForm]=useState({name:"",type:"Forestry & Land Use",country:"",registry:"Verra VCS",certId:"",available:"",price:"",vintage:"2023",desc:""}); const [submitted,setSubmitted]=useState(false); const [loading,setLoading]=useState(false); const [uploaded,setUploaded]=useState(false);
  const steps=["Project Info","Verification","Pricing","Submit"];
  const f=(k,v)=>setForm(p=>({...p,[k]:v}));
  const submit=async()=>{setLoading(true);await sleep(1800);setLoading(false);setSubmitted(true);showToast("Project submitted! 🌿");};

  if(submitted)return(
    <div className="fade" style={{maxWidth:520,margin:"60px auto",padding:24,textAlign:"center"}}>
      <div style={{fontSize:60,marginBottom:14}} className="float">🌿</div>
      <h2 style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:26,marginBottom:8,color:T.green}}>Project Submitted!</h2>
      <p style={{color:T.text2,fontSize:14,lineHeight:1.75,marginBottom:28}}>Your project <strong style={{color:T.teal}}>{form.name}</strong> is under review. Approval within 24–48 hours.</p>
      <Btn onClick={()=>setPage("home")}>Back to Home</Btn>
    </div>
  );

  return(
    <div className="fade" style={{maxWidth:600,margin:"0 auto",padding:"40px 24px"}}>
      <h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:800,marginBottom:6}}>List Your Carbon Project</h1>
      <p style={{color:T.text2,marginBottom:28,fontSize:14}}>5% commission on sales only. No upfront listing fees.</p>
      <ProgressBar steps={steps} current={step} />
      <Card style={{padding:30}}>
        {step===0&&<><h3 style={{fontWeight:700,marginBottom:18}}>Project Info</h3><Inp label="Project Name *" value={form.name} onChange={v=>f("name",v)} placeholder="Amazon Rainforest REDD+" icon="🌿" /><Sel label="Project Type *" value={form.type} onChange={v=>f("type",v)} options={["Forestry & Land Use","Renewable Energy","Clean Cooking","Blue Carbon","Conservation","Waste Management","Clean Energy"].map(t=>({value:t,label:t}))} /><Sel label="Country *" value={form.country||""} onChange={v=>f("country",v)} options={[{value:"",label:"Select…"},...["India","Brazil","Indonesia","Kenya","Mexico","Malaysia","Nepal","Vietnam"].map(c=>({value:c,label:c}))]} /><Inp label="Description" value={form.desc} onChange={v=>f("desc",v)} placeholder="Describe impact…" /></>}
        {step===1&&<><h3 style={{fontWeight:700,marginBottom:18}}>Registry Verification</h3><Sel label="Registry *" value={form.registry} onChange={v=>f("registry",v)} options={["Verra VCS","Gold Standard","ACR","Climate Action Reserve"].map(r=>({value:r,label:r}))} /><Inp label="Registry Certificate ID *" value={form.certId} onChange={v=>f("certId",v)} placeholder="VCS-2301-BR" icon="📋" hint="From your registry project page" /><Sel label="Vintage Year *" value={form.vintage} onChange={v=>f("vintage",v)} options={["2024","2023","2022","2021","2020"].map(y=>({value:y,label:y}))} /><div onClick={()=>setUploaded(true)} style={{border:`2px dashed ${uploaded?T.green:T.border}`,borderRadius:14,padding:"24px",textAlign:"center",cursor:"pointer",background:uploaded?"rgba(52,211,153,0.04)":"transparent",marginTop:8}}>{uploaded?<><div style={{fontSize:28,marginBottom:6}}>✅</div><div style={{color:T.green,fontWeight:700}}>Uploaded!</div></>:<><div style={{fontSize:28,marginBottom:6}}>📤</div><div style={{fontWeight:600}}>Upload Certificate</div><div style={{color:T.text3,fontSize:12,marginTop:4}}>PDF / JPG / PNG</div></>}</div></>}
        {step===2&&<><h3 style={{fontWeight:700,marginBottom:18}}>Pricing</h3><Inp label="Credits Available (tonnes) *" type="number" value={form.available} onChange={v=>f("available",v)} placeholder="5000" icon="📊" /><Inp label="Price per tonne (USD) *" type="number" value={form.price} onChange={v=>f("price",v)} placeholder="15.00" icon="💵" hint="Market avg: $8–$25/t" /></>}
        {step===3&&<><h3 style={{fontWeight:700,marginBottom:18}}>Review</h3>{[["Name",form.name||"—"],["Type",form.type],["Country",form.country||"—"],["Registry",form.registry],["Cert ID",form.certId||"—"],["Credits",form.available?form.available+"t":"—"],["Price",form.price?"$"+form.price+"/t":"—"]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",background:T.bg3,borderRadius:10,padding:"10px 14px",marginBottom:8}}><span style={{fontSize:13,color:T.text2}}>{k}</span><span style={{fontSize:13,fontWeight:700}}>{v}</span></div>)}</>}
        <div style={{marginTop:20,display:"flex",gap:10}}>
          {step>0&&<Btn variant="ghost" onClick={()=>setStep(s=>s-1)} disabled={loading}>← Back</Btn>}
          {step<3?<Btn full={step===0} onClick={()=>setStep(s=>s+1)}>Continue →</Btn>:<Btn full onClick={submit} disabled={loading}>{loading?<><Spinner/> Submitting…</>:"🌿 Submit for Review"}</Btn>}
        </div>
      </Card>
      {!user&&<p style={{textAlign:"center",marginTop:14,fontSize:13,color:T.text2}}>Need to <span onClick={()=>setPage("register")} style={{color:T.teal,cursor:"pointer",fontWeight:700}}>create an account</span> first.</p>}
    </div>
  );
}
