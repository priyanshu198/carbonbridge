import { T } from "../../App.jsx";
export default function Spinner() {
  return <span className="spin" style={{display:"inline-block",width:20,height:20,border:`2.5px solid rgba(56,189,248,0.2)`,borderTopColor:T.teal,borderRadius:"50%"}} />;
}
