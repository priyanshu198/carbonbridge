import { T } from "../App.jsx";
import Btn from "./ui/Btn.jsx";

export default function Navbar({ page, setPage, user, logout }) {
  const navLinks = user
    ? (user.role==="seller" ? [["Marketplace","marketplace"],["Dashboard","dashboard"],["My Listings","sell"]]
       : [["Marketplace","marketplace"],["Dashboard","dashboard"],["ESG Report","dashboard"]])
    : [["Marketplace","marketplace"],["How It Works","howitworks"],["For Business","business"],["Sell Credits","sell"]];

  return (
    <nav style={{position:"sticky",top:0,zIndex:200,background:"rgba(4,8,15,0.94)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${T.border}`,padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
        <div style={{width:36,height:36,borderRadius:10,background:T.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🌉</div>
        <div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:900,fontSize:18,background:T.grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>CarbonBridge</div>
          <div style={{fontSize:9,color:T.text3,letterSpacing:.5}}>by Nomad Life Corporation</div>
        </div>
      </div>
      <div style={{display:"flex",gap:2}}>
        {navLinks.map(([label,p])=>(
          <button key={p} onClick={()=>setPage(p)} style={{background:"transparent",color:page===p?T.teal:T.text2,border:"none",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:13,fontWeight:600}}>{label}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {user ? (
          <>
            <div onClick={()=>setPage("dashboard")} style={{display:"flex",alignItems:"center",gap:8,background:T.bg2,border:`1px solid ${T.border}`,borderRadius:10,padding:"6px 12px",cursor:"pointer"}}>
              <div style={{width:28,height:28,borderRadius:8,background:T.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#fff"}}>{user.name.charAt(0).toUpperCase()}</div>
              <div><div style={{fontSize:12,fontWeight:700,color:T.text}}>{user.name.split(" ")[0]}</div><div style={{fontSize:10,color:T.text3}}>{user.role}</div></div>
            </div>
            <Btn size="sm" variant="ghost" onClick={logout}>Sign Out</Btn>
          </>
        ) : (
          <>
            <Btn size="sm" variant="outline" onClick={()=>setPage("login")}>Login</Btn>
            <Btn size="sm" onClick={()=>setPage("register")}>Get Started</Btn>
          </>
        )}
      </div>
    </nav>
  );
}
