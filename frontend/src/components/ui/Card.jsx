import { T } from "../../App.jsx";
export default function Card({ children, style:sx={} }) {
  return <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:20,...sx}}>{children}</div>;
}
