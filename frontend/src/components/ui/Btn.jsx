import { T } from "../../App.jsx";
export default function Btn({ children, onClick, variant="primary", size="md", full=false, disabled=false, style:sx={} }) {
  const base={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"'Outfit',sans-serif",fontWeight:700,cursor:disabled?"not-allowed":"pointer",borderRadius:10,border:"none",transition:"all .2s",opacity: disabled ? 0.6 : 1,...sx};
  const sz=size==="sm"?{padding:"7px 16px",fontSize:13}:size==="lg"?{padding:"14px 28px",fontSize:16}:{padding:"10px 22px",fontSize:14};
  const vars={primary:{background:T.grad,color:"#fff",boxShadow:"0 0 24px rgba(56,189,248,0.25)"},outline:{background:"transparent",color:T.teal,border:`1.5px solid ${T.teal}`},ghost:{background:"rgba(56,189,248,0.07)",color:T.teal},danger:{background:"rgba(239,68,68,0.15)",color:"#f87171",border:"1px solid rgba(239,68,68,0.3)"},success:{background:"rgba(52,211,153,0.15)",color:T.green,border:`1px solid rgba(52,211,153,0.3)`}};
  if(full)base.width="100%";
  return <button onClick={disabled?null:onClick} style={{...base,...sz,...vars[variant]}}>{children}</button>;
}
