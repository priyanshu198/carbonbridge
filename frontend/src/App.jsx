import { useState, useEffect } from "react";
import Navbar       from "./components/Navbar.jsx";
import Home         from "./components/Home.jsx";
import Marketplace  from "./components/Marketplace.jsx";
import CreditDetail from "./components/CreditDetail.jsx";
import Login        from "./components/Login.jsx";
import Register     from "./components/Register.jsx";
import Checkout     from "./components/Checkout.jsx";
import Dashboard    from "./components/Dashboard.jsx";
import Sell         from "./components/Sell.jsx";
import HowItWorks   from "./components/HowItWorks.jsx";
import Business     from "./components/Business.jsx";
import Toast        from "./components/ui/Toast.jsx";

const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'DM Sans',sans-serif;background:#04080f;color:#e2e8f0;}
  input,select,textarea{font-family:'DM Sans',sans-serif;}
  ::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:#0d1117;}::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:3px;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  .fade{animation:fadeIn .4s ease forwards;}.spin{animation:spin 1s linear infinite;}.float{animation:float 4s ease-in-out infinite;}
`;

export const T = {
  bg:"#04080f",bg1:"#080d17",bg2:"#0d1525",bg3:"#111d30",
  border:"rgba(56,189,248,0.12)",border2:"rgba(56,189,248,0.25)",
  teal:"#38bdf8",tealDark:"#0ea5e9",green:"#34d399",greenDark:"#10b981",
  text:"#e2e8f0",text2:"#94a3b8",text3:"#64748b",
  grad:"linear-gradient(135deg, #0ea5e9, #34d399)",
};

export default function App() {
  const [page,   setPage]   = useState("home");
  const [user,   setUser]   = useState(() => { try { return JSON.parse(localStorage.getItem("cb_user")); } catch { return null; } });
  const [token,  setToken]  = useState(() => localStorage.getItem("cb_token") || null);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [toast,  setToast]  = useState(null);

  // Persist user & token
  useEffect(() => { user ? localStorage.setItem("cb_user", JSON.stringify(user)) : localStorage.removeItem("cb_user"); }, [user]);
  useEffect(() => { token ? localStorage.setItem("cb_token", token) : localStorage.removeItem("cb_token"); }, [token]);

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };
  const navigate  = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const login = (u, t) => { setUser(u); setToken(t); };
  const logout = () => { setUser(null); setToken(null); navigate("home"); };

  return (
    <>
      <style>{GS}</style>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <Navbar page={page} setPage={navigate} user={user} logout={logout} />
      <main>
        {page === "home"        && <Home        setPage={navigate} />}
        {page === "marketplace" && <Marketplace setPage={navigate} setSelectedCredit={setSelectedCredit} token={token} />}
        {page === "detail"      && <CreditDetail credit={selectedCredit} setPage={navigate} user={user} showToast={showToast} />}
        {page === "checkout"    && (user ? <Checkout credit={selectedCredit} setPage={navigate} user={user} token={token} showToast={showToast} /> : navigate("login"))}
        {page === "login"       && <Login    setPage={navigate} login={login}  showToast={showToast} />}
        {page === "register"    && <Register setPage={navigate} login={login}  showToast={showToast} />}
        {page === "dashboard"   && (user ? <Dashboard user={user} setUser={setUser} setPage={navigate} token={token} showToast={showToast} /> : navigate("login"))}
        {page === "sell"        && <Sell        setPage={navigate} user={user} token={token} showToast={showToast} />}
        {page === "howitworks"  && <HowItWorks  setPage={navigate} />}
        {page === "business"    && <Business    setPage={navigate} />}
      </main>
    </>
  );
}
