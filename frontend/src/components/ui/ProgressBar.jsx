import { T } from "../../App.jsx";
export default function ProgressBar({ steps, current }) {
  return (
    <div style={{display:"flex",alignItems:"center",marginBottom:32}}>
      {steps.map((s,i) => (
        <div key={i} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:undefined}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div style={{width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,background:i<current?T.grad:i===current?"rgba(56,189,248,0.2)":T.bg3,border:i<=current?`2px solid ${T.teal}`:`2px solid ${T.border}`,color:i<current?"#fff":i===current?T.teal:T.text3}}>
              {i<current?"✓":i+1}
            </div>
            <span style={{fontSize:10,color:i<=current?T.teal:T.text3,fontWeight:600,whiteSpace:"nowrap"}}>{s}</span>
          </div>
          {i<steps.length-1 && <div style={{flex:1,height:2,background:i<current?T.grad:T.border,margin:"0 4px",marginBottom:14}} />}
        </div>
      ))}
    </div>
  );
}
