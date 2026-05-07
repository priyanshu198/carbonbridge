import { T } from "../../App.jsx";
export default function Toast({ msg, type="success" }) {
  return (
    <div style={{position:"fixed",top:80,right:24,background:type==="success"?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.15)",border:`1px solid ${type==="success"?"rgba(52,211,153,0.4)":"rgba(239,68,68,0.4)"}`,backdropFilter:"blur(12px)",borderRadius:12,padding:"12px 20px",color:type==="success"?T.green:"#f87171",fontWeight:600,fontSize:14,zIndex:9999,boxShadow:"0 8px 32px rgba(0,0,0,0.4)",animation:"fadeIn .3s ease"}}>
      {type==="success"?"✅":"❌"} {msg}
    </div>
  );
}
