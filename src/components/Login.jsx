import { useState } from "react";
import axios from "axios";
import { T } from "../App.jsx";
import Btn from "./ui/Btn.jsx";
import Card from "./ui/Card.jsx";
import Inp from "./ui/Inp.jsx";
import Spinner from "./ui/Spinner.jsx";

export default function Login({ setPage, login, showToast }) {
  const [email,setEmail]=useState(""); const [pw,setPw]=useState(""); const [loading,setLoading]=useState(false); const [err,setErr]=useState("");
  const handle = async () => {
    if(!email||!pw){setErr("Enter email and password.");return;}
    setLoading(true);setErr("");
    try {
      const { data } = await axios.post("/api/auth/login", { email, password:pw });
      login(data.user, data.token);
      showToast("Welcome back! 👋");
      setPage("dashboard");
    } catch(e) {
      setErr(e.response?.data?.error || "Login failed.");
    } finally { setLoading(false); }
  };
  return (
    <div className="fade" style={{minHeight:"85vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:420}}>
        <div style={{textAlign:"center",marginBottom:32}}><div style={{fontSize:44,marginBottom:10}}>🌉</div><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:26,fontWeight:800,marginBottom:4}}>Welcome Back</h1><p style={{color:T.text2,fontSize:14}}>Sign in to your CarbonBridge account</p></div>
        <Card style={{padding:32}}>
          {err&&<div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:10,padding:"10px 14px",color:"#f87171",fontSize:13,marginBottom:16}}>{err}</div>}
          <Inp label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" icon="✉️" />
          <Inp label="Password" type="password" value={pw} onChange={setPw} placeholder="••••••••" icon="🔐" />
          <Btn full onClick={handle} disabled={loading}>{loading?<><Spinner/> Signing in…</>:"Sign In →"}</Btn>
        </Card>
        <p style={{textAlign:"center",marginTop:18,fontSize:14,color:T.text2}}>No account? <span onClick={()=>setPage("register")} style={{color:T.teal,fontWeight:700,cursor:"pointer"}}>Sign up free</span></p>
      </div>
    </div>
  );
}
