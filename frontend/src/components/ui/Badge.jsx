export default function Badge({ children, color="#38bdf8" }) {
  return <span style={{background:`${color}18`,color,border:`1px solid ${color}30`,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700}}>{children}</span>;
}
