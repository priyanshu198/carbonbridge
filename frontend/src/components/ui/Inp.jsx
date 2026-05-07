import { T } from "../../App.jsx";
export default function Inp({ label, type="text", value, onChange, placeholder, icon, error, hint }) {
  return (
    <div style={{marginBottom:18}}>
      {label && <label style={{display:"block",fontSize:13,fontWeight:600,color:T.text2,marginBottom:6}}>{label}</label>}
      <div style={{position:"relative"}}>
        {icon && <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,color:T.text3,pointerEvents:"none"}}>{icon}</span>}
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          style={{width:"100%",background:T.bg2,border:`1.5px solid ${error?"#f87171":T.border}`,borderRadius:10,padding:`11px ${icon?"40px":"14px"} 11px ${icon?"40px":"14px"}`,color:T.text,fontSize:14,outline:"none"}}
          onFocus={e=>{e.target.style.borderColor=T.teal}} onBlur={e=>{e.target.style.borderColor=error?"#f87171":T.border}} />
      </div>
      {error && <p style={{fontSize:12,color:"#f87171",marginTop:4}}>{error}</p>}
      {hint && !error && <p style={{fontSize:12,color:T.text3,marginTop:4}}>{hint}</p>}
    </div>
  );
}
