import { useState } from "react";
import axios from "axios";
import { T } from "../App.jsx";
import Btn from "./ui/Btn.jsx";
import Card from "./ui/Card.jsx";
import Inp from "./ui/Inp.jsx";
import Spinner from "./ui/Spinner.jsx";
import ProgressBar from "./ui/ProgressBar.jsx";

const sleep = ms => new Promise(r => setTimeout(r, ms));
const genOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const Sel = ({ label,value,onChange,options }) => (
  <div style={{marginBottom:18}}>
    {label&&<label style={{display:"block",fontSize:13,fontWeight:600,color:T.text2,marginBottom:6}}>{label}</label>}
    <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",background:T.bg2,border:`1.5px solid rgba(56,189,248,0.12)`,borderRadius:10,padding:"11px 14px",color:T.text,fontSize:14,outline:"none"}}>
      {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

export default function Register({ setPage, login, showToast }) {
  const [step,setStep]=useState(0); const [role,setRole]=useState(""); const [form,setForm]=useState({name:"",email:"",pw:"",pw2:"",phone:"",company:"",country:"IN"});
  const [otp,setOtp]=useState(""); const [genOtp,setGenOtp]=useState(""); const [loading,setLoading]=useState(false); const [uploaded,setUploaded]=useState(false); const [errors,setErrors]=useState({});
  const steps=["Account Type","Your Details","Verify Email","KYC","Done!"];
  const f=(k,v)=>setForm(p=>({...p,[k]:v})); const err=k=>errors[k];

  const next = async () => {
    if(step===0&&!role){setErrors({role:"Select an account type"});return;}
    if(step===1){
      const e={};
      if(!form.name.trim())e.name="Name required";
      if(!form.email.match(/^[^@]+@[^@]+\.[^@]+$/))e.email="Valid email required";
      if(form.pw.length<8)e.pw="Min 8 characters";
      if(form.pw!==form.pw2)e.pw2="Passwords don't match";
      if(role==="business"&&!form.company.trim())e.company="Company name required";
      if(Object.keys(e).length){setErrors(e);return;}
      setLoading(true);const g=genOTP();setGenOtp(g);await sleep(500);setLoading(false);setErrors({});setStep(2);return;
    }
    if(step===2&&otp!==genOtp){setErrors({otp:`Wrong OTP. Demo code: ${genOtp}`});return;}
    if(step===3&&!uploaded){setErrors({doc:"Please upload your ID"});return;}
    if(step===3){
      setLoading(true);
      try {
        const { data } = await axios.post("/api/auth/register",{name:form.name,email:form.email,password:form.pw,role,company:form.company,country:form.country,phone:form.phone});
        login(data.user, data.token);
        setLoading(false);setErrors({});setStep(4);
      } catch(e){setLoading(false);setErrors({doc:e.response?.data?.error||"Registration failed."});return;}
      return;
    }
    if(step===4){showToast("Welcome to CarbonBridge! 🎉");setPage("dashboard");return;}
    setErrors({});setStep(s=>s+1);
  };

  return (
    <div className="fade" style={{minHeight:"85vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:520}}>
        <div style={{textAlign:"center",marginBottom:28}}><div style={{fontSize:36,marginBottom:8}}>🌉</div><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:24,fontWeight:800}}>Create Your Account</h1></div>
        <ProgressBar steps={steps} current={step} />
        <Card style={{padding:32}}>
          {step===0&&(
            <div>
              <h2 style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:20,marginBottom:18}}>Choose Account Type</h2>
              {errors.role&&<p style={{color:"#f87171",fontSize:13,marginBottom:10}}>⚠️ {errors.role}</p>}
              {[{val:"individual",icon:"👤",title:"Individual",desc:"Personal carbon footprint offsetting"},{val:"business",icon:"🏢",title:"Business",desc:"Bulk credits, ESG reporting, API access"},{val:"seller",icon:"🌿",title:"Project Developer",desc:"List and sell verified carbon credits"}].map(opt=>(
                <div key={opt.val} onClick={()=>setRole(opt.val)} style={{background:role===opt.val?"rgba(14,165,233,0.1)":"rgba(255,255,255,0.03)",border:`2px solid ${role===opt.val?"#38bdf8":"rgba(56,189,248,0.12)"}`,borderRadius:14,padding:"16px 18px",marginBottom:10,cursor:"pointer",display:"flex",gap:14,alignItems:"center",transition:"all .2s"}}>
                  <div style={{fontSize:28}}>{opt.icon}</div><div><div style={{fontWeight:700,fontSize:14}}>{opt.title}</div><div style={{fontSize:12,color:T.text2,marginTop:2}}>{opt.desc}</div></div>
                </div>
              ))}
            </div>
          )}
          {step===1&&(
            <div>
              <h2 style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:20,marginBottom:18}}>Your Details</h2>
              <Inp label="Full Name *" value={form.name} onChange={v=>f("name",v)} placeholder="John Doe" icon="👤" error={err("name")} />
              <Inp label="Email *" type="email" value={form.email} onChange={v=>f("email",v)} placeholder="you@example.com" icon="✉️" error={err("email")} />
              {role==="business"&&<Inp label="Company Name *" value={form.company} onChange={v=>f("company",v)} placeholder="Acme Corp" icon="🏢" error={err("company")} />}
              <Inp label="Phone" value={form.phone} onChange={v=>f("phone",v)} placeholder="+91 98765 43210" icon="📱" />
              <Inp label="Password *" type="password" value={form.pw} onChange={v=>f("pw",v)} placeholder="Min 8 chars" icon="🔒" error={err("pw")} />
              <Inp label="Confirm Password *" type="password" value={form.pw2} onChange={v=>f("pw2",v)} placeholder="Re-enter" icon="🔒" error={err("pw2")} />
              <Sel label="Country" value={form.country} onChange={v=>f("country",v)} options={[{value:"IN",label:"🇮🇳 India"},{value:"US",label:"🇺🇸 United States"},{value:"GB",label:"🇬🇧 UK"},{value:"SG",label:"🇸🇬 Singapore"},{value:"AE",label:"🇦🇪 UAE"}]} />
            </div>
          )}
          {step===2&&(
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:52,marginBottom:14}} className="float">📧</div>
              <h2 style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:20,marginBottom:8}}>Verify Email</h2>
              <p style={{color:T.text2,fontSize:14,marginBottom:20}}>Sent to <strong style={{color:T.teal}}>{form.email}</strong></p>
              <div style={{background:"rgba(56,189,248,0.08)",border:"1px solid rgba(56,189,248,0.25)",borderRadius:10,padding:"10px",marginBottom:16,fontSize:13,color:T.teal}}>Demo OTP: <strong>{genOtp}</strong></div>
              <input value={otp} onChange={e=>setOtp(e.target.value)} maxLength={6} placeholder="6-digit code"
                style={{width:"100%",background:T.bg3,border:`1.5px solid ${errors.otp?"#f87171":T.border}`,borderRadius:12,padding:"14px",textAlign:"center",fontSize:24,fontFamily:"'Outfit',sans-serif",fontWeight:700,color:T.text,letterSpacing:8,outline:"none"}} />
              {errors.otp&&<p style={{color:"#f87171",fontSize:12,marginTop:6}}>{errors.otp}</p>}
            </div>
          )}
          {step===3&&(
            <div>
              <h2 style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:20,marginBottom:14}}>KYC Verification</h2>
              <div onClick={()=>setUploaded(true)} style={{border:`2px dashed ${uploaded?T.green:errors.doc?"#f87171":T.border}`,borderRadius:14,padding:"28px",textAlign:"center",cursor:"pointer",background:uploaded?"rgba(52,211,153,0.04)":"transparent",transition:"all .2s"}}>
                {uploaded?<><div style={{fontSize:32,marginBottom:6}}>✅</div><div style={{color:T.green,fontWeight:700}}>Document Uploaded!</div></>:<><div style={{fontSize:32,marginBottom:6}}>📤</div><div style={{fontWeight:600,fontSize:14}}>Click to Upload ID Document</div><div style={{color:T.text3,fontSize:12,marginTop:4}}>Passport / Aadhaar / PAN • PDF, JPG, PNG</div></>}
              </div>
              {errors.doc&&<p style={{color:"#f87171",fontSize:12,marginTop:6}}>{errors.doc}</p>}
            </div>
          )}
          {step===4&&(
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:60,marginBottom:14}} className="float">🎉</div>
              <h2 style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:24,marginBottom:8,background:T.grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>You're All Set!</h2>
              <p style={{color:T.text2,fontSize:14}}>Welcome, <strong style={{color:T.teal}}>{form.name.split(" ")[0]}</strong>! Your account is verified.</p>
            </div>
          )}
          <div style={{marginTop:22,display:"flex",justifyContent:"space-between",gap:10}}>
            {step>0&&step<4&&<button onClick={()=>setStep(s=>s-1)} disabled={loading} style={{background:"rgba(56,189,248,0.07)",color:T.teal,border:"none",borderRadius:10,padding:"10px 22px",cursor:"pointer",fontWeight:700,fontSize:14}}>← Back</button>}
            <button onClick={next} disabled={loading} style={{flex:1,background:T.grad,color:"#fff",border:"none",borderRadius:10,padding:"12px",fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:15,cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1}}>
              {loading?<><Spinner/> Processing…</>:(step===4?"Go to Dashboard →":step===3?"Submit & Verify →":"Continue →")}
            </button>
          </div>
        </Card>
        <p style={{textAlign:"center",marginTop:18,fontSize:14,color:T.text2}}>Have an account? <span onClick={()=>setPage("login")} style={{color:T.teal,fontWeight:700,cursor:"pointer"}}>Sign in</span></p>
      </div>
    </div>
  );
}
