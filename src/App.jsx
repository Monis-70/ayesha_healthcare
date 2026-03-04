import { useState, useEffect } from "react";
// ============================================================
//  IMPORTANT: To fix dark background on Vercel/Vite:
//  1. Clear App.css — delete all content or replace with: body{}
//  2. Clear index.css — delete all content or replace with: body{}
//  3. In main.jsx, remove: import './index.css'  (optional)
//  The styles here override everything via the <style> tag.
// ============================================================

// ============================================================
//  DUMMY DATA
// ============================================================
const DOCTORS = [
  { id: "d1", name: "Dr. Aisha Patel",   email: "aisha@healthnest.com",  password: "doctor123", role: "doctor", specialization: "Cardiologist",      experience: 12, fee: 800,  availableDays: ["Mon","Wed","Fri"],             availableTime: "9AM–1PM",  isAvailable: true,  phone: "9876540001", avatar: "AP" },
  { id: "d2", name: "Dr. Rohan Mehta",   email: "rohan@healthnest.com",  password: "doctor123", role: "doctor", specialization: "Neurologist",        experience: 9,  fee: 1000, availableDays: ["Tue","Thu"],                   availableTime: "11AM–4PM", isAvailable: true,  phone: "9876540002", avatar: "RM" },
  { id: "d3", name: "Dr. Sunita Verma",  email: "sunita@healthnest.com", password: "doctor123", role: "doctor", specialization: "Dermatologist",      experience: 7,  fee: 600,  availableDays: ["Mon","Tue","Sat"],             availableTime: "10AM–2PM", isAvailable: true,  phone: "9876540003", avatar: "SV" },
  { id: "d4", name: "Dr. Faiz Ahmed",    email: "faiz@healthnest.com",   password: "doctor123", role: "doctor", specialization: "Orthopedic Surgeon", experience: 15, fee: 1200, availableDays: ["Wed","Fri"],                   availableTime: "2PM–6PM",  isAvailable: false, phone: "9876540004", avatar: "FA" },
  { id: "d5", name: "Dr. Priya Nair",    email: "priya@healthnest.com",  password: "doctor123", role: "doctor", specialization: "Pediatrician",       experience: 6,  fee: 500,  availableDays: ["Mon","Thu","Sat"],             availableTime: "8AM–12PM", isAvailable: true,  phone: "9876540005", avatar: "PN" },
  { id: "d6", name: "Dr. Amit Sharma",   email: "amit@healthnest.com",   password: "doctor123", role: "doctor", specialization: "General Physician",  experience: 10, fee: 400,  availableDays: ["Mon","Tue","Wed","Thu","Fri"], availableTime: "9AM–5PM",  isAvailable: true,  phone: "9876540006", avatar: "AS" },
  { id: "d7", name: "Dr. Kavita Singh",  email: "kavita@healthnest.com", password: "doctor123", role: "doctor", specialization: "Gynecologist",       experience: 11, fee: 900,  availableDays: ["Tue","Thu","Sat"],             availableTime: "10AM–3PM", isAvailable: true,  phone: "9876540007", avatar: "KS" },
  { id: "d8", name: "Dr. Vikram Joshi",  email: "vikram@healthnest.com", password: "doctor123", role: "doctor", specialization: "ENT Specialist",     experience: 8,  fee: 700,  availableDays: ["Mon","Wed","Sat"],             availableTime: "11AM–5PM", isAvailable: true,  phone: "9876540008", avatar: "VJ" },
  { id: "d9", name: "Dr. Leena Gupta",   email: "leena@healthnest.com",  password: "doctor123", role: "doctor", specialization: "Psychiatrist",       experience: 13, fee: 1500, availableDays: ["Tue","Fri"],                   availableTime: "1PM–6PM",  isAvailable: true,  phone: "9876540009", avatar: "LG" },
  { id:"d10", name: "Dr. Suresh Babu",   email: "suresh@healthnest.com", password: "doctor123", role: "doctor", specialization: "Ophthalmologist",    experience: 5,  fee: 550,  availableDays: ["Mon","Thu"],                   availableTime: "9AM–12PM", isAvailable: false, phone: "9876540010", avatar: "SB" },
  { id:"d11", name: "Dr. Nisha Pillai",  email: "nisha@healthnest.com",  password: "doctor123", role: "doctor", specialization: "Endocrinologist",    experience: 9,  fee: 1100, availableDays: ["Wed","Fri","Sat"],             availableTime: "10AM–4PM", isAvailable: true,  phone: "9876540011", avatar: "NP" },
  { id:"d12", name: "Dr. Arjun Kapoor",  email: "arjun@healthnest.com",  password: "doctor123", role: "doctor", specialization: "Pulmonologist",      experience: 14, fee: 950,  availableDays: ["Mon","Tue","Fri"],             availableTime: "8AM–2PM",  isAvailable: true,  phone: "9876540012", avatar: "AK" },
];
const PATIENTS = [
  { id:"p1",  name:"Monis Khan",   email:"monis@gmail.com",   password:"patient123", role:"patient", age:22, gender:"Male",   bloodGroup:"B+",  phone:"9812340001", address:"Pune, Maharashtra",      medicalHistory:"None" },
  { id:"p2",  name:"Sara Ali",     email:"sara@gmail.com",    password:"patient123", role:"patient", age:29, gender:"Female", bloodGroup:"O+",  phone:"9812340002", address:"Mumbai, Maharashtra",    medicalHistory:"Asthma" },
  { id:"p3",  name:"Ravi Kumar",   email:"ravi@gmail.com",    password:"patient123", role:"patient", age:45, gender:"Male",   bloodGroup:"A+",  phone:"9812340003", address:"Nagpur, Maharashtra",    medicalHistory:"Hypertension, Diabetes" },
  { id:"p4",  name:"Pooja Desai",  email:"pooja@gmail.com",   password:"patient123", role:"patient", age:33, gender:"Female", bloodGroup:"AB-", phone:"9812340004", address:"Nashik, Maharashtra",    medicalHistory:"Migraine" },
  { id:"p5",  name:"Aryan Gupta",  email:"aryan@gmail.com",   password:"patient123", role:"patient", age:27, gender:"Male",   bloodGroup:"O-",  phone:"9812340005", address:"Hyderabad, Telangana",   medicalHistory:"None" },
  { id:"p6",  name:"Neha Joshi",   email:"neha@gmail.com",    password:"patient123", role:"patient", age:38, gender:"Female", bloodGroup:"B-",  phone:"9812340006", address:"Bangalore, Karnataka",   medicalHistory:"Thyroid" },
  { id:"p7",  name:"Rahul Sharma", email:"rahul@gmail.com",   password:"patient123", role:"patient", age:52, gender:"Male",   bloodGroup:"A-",  phone:"9812340007", address:"Delhi, NCR",             medicalHistory:"Diabetes Type 2, Heart Disease" },
  { id:"p8",  name:"Anjali Singh", email:"anjali@gmail.com",  password:"patient123", role:"patient", age:24, gender:"Female", bloodGroup:"O+",  phone:"9812340008", address:"Chennai, Tamil Nadu",    medicalHistory:"None" },
  { id:"p9",  name:"Karan Mehta",  email:"karan@gmail.com",   password:"patient123", role:"patient", age:41, gender:"Male",   bloodGroup:"B+",  phone:"9812340009", address:"Kolkata, West Bengal",   medicalHistory:"Arthritis" },
  { id:"p10", name:"Divya Pillai", email:"divya@gmail.com",   password:"patient123", role:"patient", age:30, gender:"Female", bloodGroup:"A+",  phone:"9812340010", address:"Kochi, Kerala",          medicalHistory:"PCOS" },
  { id:"p11", name:"Sunil Verma",  email:"sunil@gmail.com",   password:"patient123", role:"patient", age:60, gender:"Male",   bloodGroup:"AB+", phone:"9812340011", address:"Jaipur, Rajasthan",      medicalHistory:"Hypertension, Kidney Stone" },
  { id:"p12", name:"Priti Nair",   email:"priti@gmail.com",   password:"patient123", role:"patient", age:19, gender:"Female", bloodGroup:"O-",  phone:"9812340012", address:"Ahmedabad, Gujarat",     medicalHistory:"Anemia" },
  { id:"p13", name:"Aditya Rao",   email:"aditya@gmail.com",  password:"patient123", role:"patient", age:35, gender:"Male",   bloodGroup:"B+",  phone:"9812340013", address:"Visakhapatnam, AP",      medicalHistory:"None" },
];
const ADMIN = { id:"a1", name:"Admin HealthNest", email:"admin@healthnest.com", password:"admin123", role:"admin", avatar:"AD" };
const APPTS_INIT = [
  { id:"apt1",  patientId:"p1",  doctorId:"d6",  date:"2025-03-05", time:"10:00 AM", reason:"Fever and cold for 3 days",    status:"confirmed", notes:"Prescribed rest and medication" },
  { id:"apt2",  patientId:"p2",  doctorId:"d12", date:"2025-03-06", time:"11:00 AM", reason:"Breathing difficulty",          status:"completed", notes:"Asthma follow-up done" },
  { id:"apt3",  patientId:"p3",  doctorId:"d1",  date:"2025-03-07", time:"9:00 AM",  reason:"Chest pain checkup",           status:"pending",   notes:"" },
  { id:"apt4",  patientId:"p4",  doctorId:"d9",  date:"2025-03-08", time:"2:00 PM",  reason:"Severe headache and anxiety",  status:"confirmed", notes:"Therapy session scheduled" },
  { id:"apt5",  patientId:"p5",  doctorId:"d3",  date:"2025-03-09", time:"10:30 AM", reason:"Skin rash on arms",            status:"completed", notes:"Allergic reaction treated" },
  { id:"apt6",  patientId:"p6",  doctorId:"d11", date:"2025-03-10", time:"11:30 AM", reason:"Thyroid level checkup",        status:"pending",   notes:"" },
  { id:"apt7",  patientId:"p7",  doctorId:"d1",  date:"2025-03-11", time:"9:30 AM",  reason:"Heart palpitations",           status:"confirmed", notes:"ECG scheduled" },
  { id:"apt8",  patientId:"p8",  doctorId:"d6",  date:"2025-03-12", time:"3:00 PM",  reason:"General checkup",              status:"completed", notes:"Healthy, routine vitamins advised" },
  { id:"apt9",  patientId:"p9",  doctorId:"d4",  date:"2025-03-13", time:"2:30 PM",  reason:"Knee pain since 2 weeks",      status:"cancelled", notes:"Patient rescheduled" },
  { id:"apt10", patientId:"p10", doctorId:"d7",  date:"2025-03-14", time:"10:00 AM", reason:"PCOS consultation",            status:"pending",   notes:"" },
  { id:"apt11", patientId:"p11", doctorId:"d1",  date:"2025-03-15", time:"9:00 AM",  reason:"Blood pressure monitoring",    status:"confirmed", notes:"BP medication adjusted" },
  { id:"apt12", patientId:"p12", doctorId:"d5",  date:"2025-03-16", time:"8:30 AM",  reason:"Weakness and low hemoglobin",  status:"completed", notes:"Iron supplements prescribed" },
  { id:"apt13", patientId:"p13", doctorId:"d6",  date:"2025-03-17", time:"4:00 PM",  reason:"Annual health checkup",        status:"pending",   notes:"" },
  { id:"apt14", patientId:"p1",  doctorId:"d3",  date:"2025-03-18", time:"11:00 AM", reason:"Acne treatment",               status:"pending",   notes:"" },
  { id:"apt15", patientId:"p2",  doctorId:"d6",  date:"2025-03-19", time:"1:00 PM",  reason:"Cold and cough",               status:"pending",   notes:"" },
];
const RX_INIT = [
  { id:"rx1", appointmentId:"apt2",  patientId:"p2",  doctorId:"d12", date:"2025-03-06", diagnosis:"Bronchial Asthma exacerbation",     medicines:[{name:"Salbutamol Inhaler",dosage:"100mcg",frequency:"Twice daily",duration:"10 days"},{name:"Prednisolone",dosage:"10mg",frequency:"Once daily",duration:"5 days"}],          advice:"Avoid dust and cold air. Use inhaler before exercise.", followUpDate:"2025-03-20" },
  { id:"rx2", appointmentId:"apt5",  patientId:"p5",  doctorId:"d3",  date:"2025-03-09", diagnosis:"Allergic Contact Dermatitis",        medicines:[{name:"Cetirizine",dosage:"10mg",frequency:"Once at night",duration:"7 days"},{name:"Betamethasone Cream",dosage:"Apply thin layer",frequency:"Twice daily",duration:"7 days"}], advice:"Avoid allergens. Wear cotton clothes.", followUpDate:"2025-03-16" },
  { id:"rx3", appointmentId:"apt8",  patientId:"p8",  doctorId:"d6",  date:"2025-03-12", diagnosis:"Healthy — Routine Checkup",          medicines:[{name:"Vitamin D3",dosage:"60000 IU",frequency:"Once a week",duration:"4 weeks"},{name:"Multivitamin tablet",dosage:"1 tablet",frequency:"Once daily",duration:"30 days"}],   advice:"Exercise daily. Stay hydrated.", followUpDate:"2025-04-12" },
  { id:"rx4", appointmentId:"apt12", patientId:"p12", doctorId:"d5",  date:"2025-03-16", diagnosis:"Iron Deficiency Anemia",             medicines:[{name:"Ferrous Sulfate",dosage:"200mg",frequency:"Twice daily after meals",duration:"30 days"},{name:"Folic Acid",dosage:"5mg",frequency:"Once daily",duration:"30 days"}],     advice:"Eat iron-rich foods: spinach, lentils, dates.", followUpDate:"2025-04-16" },
  { id:"rx5", appointmentId:"apt1",  patientId:"p1",  doctorId:"d6",  date:"2025-03-05", diagnosis:"Viral Upper Respiratory Infection",  medicines:[{name:"Paracetamol",dosage:"500mg",frequency:"Three times daily",duration:"5 days"},{name:"Cetirizine",dosage:"10mg",frequency:"Once at night",duration:"5 days"},{name:"Vitamin C",dosage:"500mg",frequency:"Once daily",duration:"7 days"}], advice:"Rest well. Drink warm fluids.", followUpDate:"2025-03-10" },
];

// ============================================================
//  RESPONSIVE HOOK
// ============================================================
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ============================================================
//  DESIGN TOKENS
// ============================================================
const RC = { admin: "#0d9488", doctor: "#2563eb", patient: "#7c3aed" };

function getBadge(status) {
  return { pending:{bg:"#fffbeb",c:"#92400e"}, confirmed:{bg:"#eff6ff",c:"#1e40af"}, completed:{bg:"#f0fdf4",c:"#065f46"}, cancelled:{bg:"#fef2f2",c:"#991b1b"} }[status] || {bg:"#f1f5f9",c:"#475569"};
}

// ============================================================
//  BASE COMPONENTS
// ============================================================
const Av = ({ i, color="#0d9488", size=40 }) => (
  <div style={{ width:size, height:size, borderRadius:"50%", background:`linear-gradient(135deg,${color},${color}bb)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:size*0.36, flexShrink:0, boxShadow:`0 2px 8px ${color}44` }}>{i}</div>
);

const Card = ({ children, style={} }) => (
  <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 1px 3px #0001,0 4px 20px #0001", border:"1px solid #f1f5f9", padding:20, ...style }}>{children}</div>
);

const StatCard = ({ label, value, icon, color }) => (
  <Card style={{ display:"flex", alignItems:"center", gap:14, padding:16 }}>
    <div style={{ width:50, height:50, borderRadius:14, background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{icon}</div>
    <div>
      <div style={{ fontSize:26, fontWeight:800, color:"#0f172a", lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:12, color:"#64748b", marginTop:3 }}>{label}</div>
    </div>
  </Card>
);

const Btn = ({ children, onClick, color="#0d9488", outline=false, small=false, disabled=false, danger=false, full=false, style={} }) => {
  const bg = disabled ? "#cbd5e1" : outline ? "transparent" : danger ? "#ef4444" : color;
  return (
    <button onClick={onClick} disabled={disabled} style={{ padding:small?"6px 13px":"10px 20px", borderRadius:10, border:outline?`2px solid ${danger?"#ef4444":color}`:"none", background:bg, color:outline?(danger?"#ef4444":color):"#fff", fontWeight:600, fontSize:small?12:14, cursor:disabled?"not-allowed":"pointer", fontFamily:"inherit", transition:"all .15s", boxShadow:(outline||disabled)?"none":`0 2px 8px ${bg}44`, width:full?"100%":"auto", whiteSpace:"nowrap", ...style }}>{children}</button>
  );
};

const Inp = ({ label, value, onChange, type="text", placeholder="", required=false, options=null }) => (
  <div style={{ marginBottom:14 }}>
    <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:5 }}>{label}{required&&<span style={{color:"#ef4444"}}> *</span>}</label>
    {options
      ? <select value={value} onChange={e=>onChange(e.target.value)} style={{ width:"100%", padding:"9px 12px", borderRadius:9, border:"1.5px solid #e2e8f0", fontSize:14, fontFamily:"inherit", background:"#fff", color:"#0f172a", boxSizing:"border-box" }}>
          <option value="">Select...</option>
          {options.map(o=><option key={o.value??o} value={o.value??o}>{o.label??o}</option>)}
        </select>
      : <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{ width:"100%", padding:"9px 12px", borderRadius:9, border:"1.5px solid #e2e8f0", fontSize:14, fontFamily:"inherit", color:"#0f172a", boxSizing:"border-box" }} />
    }
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div style={{ position:"fixed", inset:0, background:"#000a", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:2000, padding:"0" }} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:560, maxHeight:"92vh", overflowY:"auto", boxShadow:"0 -8px 40px #0004" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 20px 0", position:"sticky", top:0, background:"#fff", zIndex:1, borderBottom:"1px solid #f1f5f9", paddingBottom:14 }}>
        <h3 style={{ margin:0, fontSize:16, fontWeight:700, color:"#0f172a" }}>{title}</h3>
        <button onClick={onClose} style={{ background:"#f1f5f9", border:"none", width:32, height:32, borderRadius:"50%", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", color:"#64748b" }}>×</button>
      </div>
      <div style={{ padding:"16px 20px 32px" }}>{children}</div>
    </div>
  </div>
);

const Badge = ({ status }) => {
  const s = getBadge(status);
  return <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700, background:s.bg, color:s.c }}>{status}</span>;
};

const PageTitle = ({ title, sub, action }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, gap:12, flexWrap:"wrap" }}>
    <div>
      <h2 style={{ margin:0, fontSize:22, fontWeight:800, color:"#0f172a" }}>{title}</h2>
      {sub && <p style={{ margin:"4px 0 0", color:"#64748b", fontSize:13 }}>{sub}</p>}
    </div>
    {action}
  </div>
);

// ============================================================
//  APP ROOT
// ============================================================
export default function App() {
  const [user,  setUser]  = useState(null);
  const [apts,  setApts]  = useState(APPTS_INIT);
  const [rxs,   setRxs]   = useState(RX_INIT);
  const [docs,  setDocs]  = useState(DOCTORS);
  const [page,  setPage]  = useState("dashboard");
  const [toast, setToast] = useState(null);
  const w = useWindowWidth();

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const login = (email, pw) => {
    const found = [ADMIN,...docs,...PATIENTS].find(u=>u.email===email&&u.password===pw);
    if(found){ setUser(found); setPage("dashboard"); showToast(`Welcome, ${found.name.split(" ")[0]}!`); }
    else showToast("Invalid email or password","error");
  };

  if(!user) return <LoginPage onLogin={login} toast={toast} w={w}/>;

  return (
    <div style={{ fontFamily:"'Nunito','Segoe UI',sans-serif", minHeight:"100vh", background:"#f8fafc", color:"#0f172a" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { background: #f8fafc !important; color: #0f172a !important; min-height: 100vh; }
        body { margin: 0; padding: 0; }
        input, select, textarea { background: #ffffff !important; color: #0f172a !important; }
        @keyframes slideIn{from{transform:translateX(40px);opacity:0}to{transform:none;opacity:1}}
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}
        button:active{transform:scale(.97);}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#f1f5f9}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
      `}</style>

      {toast && (
        <div style={{ position:"fixed", top:16, right:16, zIndex:9999, background:toast.type==="error"?"#ef4444":"#10b981", color:"#fff", padding:"11px 18px", borderRadius:12, fontWeight:600, fontSize:14, boxShadow:"0 4px 20px #0004", animation:"slideIn .3s ease", maxWidth:"calc(100vw - 32px)", zIndex:9999 }}>
          {toast.type==="error"?"⚠️":"✅"} {toast.msg}
        </div>
      )}

      <Shell user={user} page={page} setPage={setPage} onLogout={()=>{setUser(null);setPage("dashboard");}} w={w}>
        {user.role==="admin"   && <AdminPanel   page={page} apts={apts} setApts={setApts} docs={docs} setDocs={setDocs} patients={PATIENTS} showToast={showToast} w={w}/>}
        {user.role==="doctor"  && <DoctorPanel  page={page} user={user} apts={apts} setApts={setApts} rxs={rxs} setRxs={setRxs} patients={PATIENTS} docs={docs} setDocs={setDocs} showToast={showToast} w={w}/>}
        {user.role==="patient" && <PatientPanel page={page} user={user} setUser={setUser} apts={apts} setApts={setApts} rxs={rxs} docs={docs} showToast={showToast} w={w}/>}
      </Shell>
    </div>
  );
}

// ============================================================
//  LOGIN
// ============================================================
function LoginPage({ onLogin, toast, w }) {
  const [email,setEmail] = useState("monis@gmail.com");
  const [pw,setPw]       = useState("patient123");
  const [tab,setTab]     = useState("patient");
  const [showReg,setReg] = useState(false);
  const mobile = w < 768;

  const demos = { admin:{email:"admin@healthnest.com",password:"admin123"}, doctor:{email:"aisha@healthnest.com",password:"doctor123"}, patient:{email:"monis@gmail.com",password:"patient123"} };
  const fill = r => { setTab(r); setEmail(demos[r].email); setPw(demos[r].password); };

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:mobile?"column":"row", background:"#ffffff" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body, #root { background: #ffffff !important; color: #0f172a !important; }
        input, select, textarea, button { font-family: 'Nunito', sans-serif !important; }
      `}</style>

      {/* LEFT — HERO */}
      <div style={{ flex:mobile?undefined:1, background:"linear-gradient(145deg,#0d9488,#0891b2)", display:"flex", flexDirection:"column", justifyContent:"center", padding:mobile?"32px 24px":"60px 50px", color:"#fff", position:"relative", overflow:"hidden", minHeight:mobile?200:undefined }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:220, height:220, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
        <div style={{ position:"absolute", bottom:-40, left:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:mobile?32:48, marginBottom:4 }}>🏥</div>
          <h1 style={{ margin:"0 0 6px", fontSize:mobile?26:42, fontWeight:900, letterSpacing:-1, color:"#ffffff" }}>HealthNest</h1>
          <p style={{ margin:"0 0 16px", opacity:.9, fontSize:mobile?13:15, lineHeight:1.6, color:"#ffffff" }}>Smart Healthcare Management System</p>
          {!mobile && ["🩺 Book appointments with top doctors","📋 View prescriptions anytime","📊 Admin analytics dashboard","🔐 Role-based secure access"].map(f=>(
            <div key={f} style={{ fontSize:14, opacity:.9, marginBottom:10, color:"#ffffff" }}>{f}</div>
          ))}
        </div>
      </div>

      {/* RIGHT — FORM */}
      <div style={{ width:mobile?"100%":460, background:"#ffffff", display:"flex", alignItems:"center", justifyContent:"center", padding:mobile?"28px 20px 48px":48, minHeight:mobile?undefined:"100vh" }}>
        <div style={{ width:"100%", maxWidth:400 }}>
          <h2 style={{ margin:"0 0 4px", fontSize:mobile?22:28, fontWeight:800, color:"#0f172a" }}>Welcome back 👋</h2>
          <p style={{ margin:"0 0 24px", color:"#64748b", fontSize:14 }}>Sign in to your account</p>

          {/* ROLE TABS */}
          <div style={{ display:"flex", gap:6, marginBottom:20, background:"#f1f5f9", borderRadius:12, padding:4 }}>
            {["patient","doctor","admin"].map(r=>(
              <button key={r} onClick={()=>fill(r)} style={{ flex:1, padding:"9px 0", border:"none", borderRadius:9, background:tab===r?"#ffffff":"transparent", color:tab===r?"#0d9488":"#64748b", fontWeight:700, fontSize:13, cursor:"pointer", transition:"all .2s", boxShadow:tab===r?"0 1px 6px rgba(0,0,0,0.08)":"none", textTransform:"capitalize", fontFamily:"inherit" }}>{r}</button>
            ))}
          </div>

          <div style={{ background:"#f0fdfa", border:"1px solid #99f6e4", borderRadius:10, padding:"10px 14px", marginBottom:18, fontSize:12, color:"#0f766e" }}>
            ✅ <strong>Demo filled!</strong> Click Sign In as <strong>{tab}</strong>
          </div>

          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:5 }}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid #e2e8f0", fontSize:14, fontFamily:"inherit", color:"#0f172a", background:"#ffffff", outline:"none", boxSizing:"border-box" }}/>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:5 }}>Password</label>
            <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid #e2e8f0", fontSize:14, fontFamily:"inherit", color:"#0f172a", background:"#ffffff", outline:"none", boxSizing:"border-box" }}/>
          </div>

          <button onClick={()=>onLogin(email,pw)} style={{ width:"100%", padding:"13px", borderRadius:12, border:"none", background:"#0d9488", color:"#ffffff", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 4px 14px rgba(13,148,136,0.35)", transition:"all .2s" }}>Sign In →</button>

          <div style={{ textAlign:"center", marginTop:20 }}>
            <span style={{ color:"#64748b", fontSize:13 }}>New patient? </span>
            <button onClick={()=>setReg(true)} style={{ background:"none", border:"none", color:"#0d9488", fontWeight:700, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>Register here</button>
          </div>
          {toast && <div style={{ marginTop:14, padding:"10px 14px", borderRadius:10, background:"#fef2f2", color:"#dc2626", fontSize:13, fontWeight:600 }}>⚠️ {toast.msg}</div>}
        </div>
      </div>
      {showReg && <RegModal onClose={()=>setReg(false)} onLogin={onLogin}/>}
    </div>
  );
}

function RegModal({ onClose, onLogin }) {
  const [f,setF] = useState({name:"",email:"",password:"",phone:"",age:"",gender:"Male",bloodGroup:""});
  const u = k=>v=>setF(p=>({...p,[k]:v}));
  return (
    <Modal title="Create Patient Account" onClose={onClose}>
      <Inp label="Full Name" value={f.name} onChange={u("name")} required/>
      <Inp label="Email" value={f.email} onChange={u("email")} type="email" required/>
      <Inp label="Password" value={f.password} onChange={u("password")} type="password" required/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <Inp label="Phone" value={f.phone} onChange={u("phone")}/>
        <Inp label="Age" value={f.age} onChange={u("age")} type="number"/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <Inp label="Gender" value={f.gender} onChange={u("gender")} options={["Male","Female","Other"]}/>
        <Inp label="Blood Group" value={f.bloodGroup} onChange={u("bloodGroup")} options={["A+","A-","B+","B-","AB+","AB-","O+","O-"]}/>
      </div>
      <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 12px" }}>*Demo: logs you in as Monis Khan</p>
      <Btn full onClick={()=>{ if(!f.name||!f.email||!f.password)return; onLogin("monis@gmail.com","patient123"); onClose(); }}>Create Account</Btn>
    </Modal>
  );
}

// ============================================================
//  SHELL — responsive sidebar + mobile bottom nav
// ============================================================
function Shell({ user, page, setPage, onLogout, children, w }) {
  const [open, setOpen] = useState(false);
  const mobile = w < 768;
  const color  = RC[user.role];

  const navMap = {
    admin:   [{id:"dashboard",label:"Dashboard",icon:"📊"},{id:"doctors",label:"Doctors",icon:"🩺"},{id:"patients",label:"Patients",icon:"👥"},{id:"appointments",label:"Appointments",icon:"📅"}],
    doctor:  [{id:"dashboard",label:"Dashboard",icon:"📊"},{id:"appointments",label:"Appointments",icon:"📅"},{id:"prescriptions",label:"Prescriptions",icon:"💊"},{id:"profile",label:"Profile",icon:"👤"}],
    patient: [{id:"dashboard",label:"Dashboard",icon:"📊"},{id:"book",label:"Book",icon:"➕"},{id:"appointments",label:"Appointments",icon:"📅"},{id:"prescriptions",label:"Prescriptions",icon:"💊"},{id:"profile",label:"Profile",icon:"👤"}],
  };
  const nav = navMap[user.role];

  const SidebarInner = () => (
    <aside style={{ width:240, background:"#0f172a", display:"flex", flexDirection:"column", height:"100%", padding:"20px 0" }}>
      <div style={{ padding:"0 16px 18px", borderBottom:"1px solid #1e293b", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:18, fontWeight:900, color:"#fff" }}>🏥 HealthNest</div>
          <div style={{ fontSize:10, color:"#64748b", marginTop:1, textTransform:"uppercase", letterSpacing:1 }}>{user.role} panel</div>
        </div>
        {mobile && <button onClick={()=>setOpen(false)} style={{ background:"none", border:"none", color:"#64748b", fontSize:22, cursor:"pointer", padding:0 }}>×</button>}
      </div>
      <nav style={{ flex:1, padding:"12px 10px" }}>
        {nav.map(item=>(
          <button key={item.id} onClick={()=>{ setPage(item.id); setOpen(false); }} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"11px 12px", borderRadius:10, border:"none", background:page===item.id?color:"transparent", color:page===item.id?"#fff":"#94a3b8", fontWeight:600, fontSize:14, cursor:"pointer", marginBottom:3, textAlign:"left", fontFamily:"inherit", transition:"all .15s" }}>
            <span style={{ fontSize:18 }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div style={{ padding:"14px 10px", borderTop:"1px solid #1e293b" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <Av i={user.avatar||user.name.slice(0,2).toUpperCase()} color={color} size={36}/>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:13, lineHeight:1.3 }}>{user.name.split(" ").slice(0,2).join(" ")}</div>
            <div style={{ color:"#64748b", fontSize:11, textTransform:"capitalize" }}>{user.role}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ width:"100%", padding:"8px", border:"none", borderRadius:9, background:"#1e293b", color:"#94a3b8", fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>🚪 Sign Out</button>
      </div>
    </aside>
  );

  if(mobile) return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
      {/* MOBILE TOP BAR */}
      <div style={{ position:"sticky", top:0, zIndex:200, background:"#0f172a", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", gap:12 }}>
        <button onClick={()=>setOpen(true)} style={{ background:"none", border:"none", color:"#fff", fontSize:24, cursor:"pointer", lineHeight:1, padding:0 }}>☰</button>
        <div style={{ color:"#fff", fontWeight:900, fontSize:16 }}>🏥 HealthNest</div>
        <Av i={user.avatar||user.name.slice(0,2).toUpperCase()} color={color} size={32}/>
      </div>

      {/* DRAWER */}
      {open && (
        <>
          <div onClick={()=>setOpen(false)} style={{ position:"fixed", inset:0, background:"#0007", zIndex:299 }}/>
          <div style={{ position:"fixed", top:0, left:0, bottom:0, zIndex:300, animation:"slideIn .25s ease" }}>
            <SidebarInner/>
          </div>
        </>
      )}

      {/* CONTENT */}
      <main style={{ flex:1, padding:"16px 14px 80px", overflowX:"hidden" }}>
        {children}
      </main>

      {/* BOTTOM NAV */}
      <nav style={{ position:"fixed", bottom:0, left:0, right:0, background:"#0f172a", display:"flex", borderTop:"2px solid #1e293b", zIndex:200 }}>
        {nav.map(item=>(
          <button key={item.id} onClick={()=>setPage(item.id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"8px 2px 10px", border:"none", background:"transparent", color:page===item.id?color:"#475569", cursor:"pointer", fontFamily:"inherit", gap:2, borderTop:page===item.id?`2px solid ${color}`:"2px solid transparent", transition:"all .15s", marginTop:-2 }}>
            <span style={{ fontSize:18 }}>{item.icon}</span>
            <span style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:.3 }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  // DESKTOP
  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      <div style={{ position:"fixed", top:0, left:0, bottom:0, width:240, zIndex:100 }}>
        <SidebarInner/>
      </div>
      <main style={{ marginLeft:240, flex:1, padding:"28px 28px 40px", minHeight:"100vh", overflowX:"hidden" }}>
        {children}
      </main>
    </div>
  );
}

// ============================================================
//  ADMIN PANEL
// ============================================================
function AdminPanel({ page, apts, setApts, docs, setDocs, patients, showToast, w }) {
  const [modal,setModal] = useState(null);
  const mobile = w < 640;
  const tablet = w < 1024;

  const stats = {
    doctors: docs.length, patients: patients.length, total: apts.length,
    pending: apts.filter(a=>a.status==="pending").length,
    completed: apts.filter(a=>a.status==="completed").length,
    revenue: apts.filter(a=>a.status==="completed").reduce((s,a)=>s+(docs.find(d=>d.id===a.doctorId)?.fee||0),0),
  };

  if(page==="dashboard") return (
    <div>
      <PageTitle title="Admin Dashboard" sub="System overview"/>
      <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr 1fr":tablet?"repeat(3,1fr)":"repeat(3,1fr)", gap:12, marginBottom:24 }}>
        <StatCard label="Doctors"      value={stats.doctors}   icon="🩺" color="#2563eb"/>
        <StatCard label="Patients"     value={stats.patients}  icon="👥" color="#7c3aed"/>
        <StatCard label="Appointments" value={stats.total}     icon="📅" color="#0d9488"/>
        <StatCard label="Pending"      value={stats.pending}   icon="⏳" color="#f59e0b"/>
        <StatCard label="Completed"    value={stats.completed} icon="✅" color="#10b981"/>
        <StatCard label="Revenue"      value={`₹${stats.revenue.toLocaleString()}`} icon="💰" color="#ec4899"/>
      </div>
      <Card style={{ padding:0, overflow:"hidden" }}>
        <div style={{ padding:"14px 16px", borderBottom:"1px solid #f1f5f9", fontWeight:700, fontSize:15 }}>Recent Appointments</div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:420 }}>
            <thead><tr style={{ background:"#f8fafc" }}>
              {["Patient","Doctor","Date","Status"].map(h=><th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"#64748b", fontWeight:600, fontSize:12, whiteSpace:"nowrap" }}>{h}</th>)}
            </tr></thead>
            <tbody>{apts.slice(0,8).map(a=>{
              const pat=patients.find(p=>p.id===a.patientId), doc=docs.find(d=>d.id===a.doctorId);
              return <tr key={a.id} style={{ borderTop:"1px solid #f1f5f9" }}>
                <td style={{ padding:"10px 14px", fontWeight:600, whiteSpace:"nowrap" }}>{pat?.name}</td>
                <td style={{ padding:"10px 14px", color:"#64748b", whiteSpace:"nowrap" }}>{doc?.name}</td>
                <td style={{ padding:"10px 14px", color:"#64748b", whiteSpace:"nowrap", fontSize:12 }}>{a.date}</td>
                <td style={{ padding:"10px 14px" }}><Badge status={a.status}/></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  if(page==="doctors") return (
    <div>
      <PageTitle title="Manage Doctors" sub={`${docs.length} registered`} action={<Btn onClick={()=>setModal("add")}>+ Add Doctor</Btn>}/>
      <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":tablet?"1fr 1fr":"repeat(3,1fr)", gap:14 }}>
        {docs.map(d=>(
          <Card key={d.id} style={{ padding:16 }}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12 }}>
              <Av i={d.avatar} color="#2563eb" size={44}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:700, fontSize:14, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{d.name}</div>
                <div style={{ color:"#2563eb", fontSize:12, fontWeight:600 }}>{d.specialization}</div>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:4 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:d.isAvailable?"#10b981":"#94a3b8", display:"inline-block" }}/>
                  <span style={{ fontSize:11, color:d.isAvailable?"#10b981":"#94a3b8", fontWeight:600 }}>{d.isAvailable?"Available":"Unavailable"}</span>
                </div>
              </div>
              <Btn small outline danger onClick={()=>setModal({type:"remove",doc:d})}>✕</Btn>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, fontSize:12, color:"#64748b" }}>
              <span>⭐ {d.experience}y exp</span><span>💰 ₹{d.fee}</span>
              <span>📞 {d.phone}</span><span>🕐 {d.availableTime}</span>
            </div>
          </Card>
        ))}
      </div>
      {modal==="add" && <AddDocModal onClose={()=>setModal(null)} onAdd={doc=>{ setDocs(p=>[...p,doc]); setModal(null); showToast("Doctor added!"); }}/>}
      {modal?.type==="remove" && <Modal title="Remove Doctor?" onClose={()=>setModal(null)}>
        <p style={{ color:"#64748b" }}>Remove <strong>{modal.doc.name}</strong>?</p>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", flexWrap:"wrap" }}>
          <Btn outline color="#64748b" onClick={()=>setModal(null)}>Cancel</Btn>
          <Btn danger onClick={()=>{ setDocs(p=>p.filter(d=>d.id!==modal.doc.id)); setModal(null); showToast("Removed","error"); }}>Remove</Btn>
        </div>
      </Modal>}
    </div>
  );

  if(page==="patients") return (
    <div>
      <PageTitle title="All Patients" sub={`${patients.length} registered`}/>
      <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":tablet?"1fr 1fr":"repeat(3,1fr)", gap:14 }}>
        {patients.map(p=>(
          <Card key={p.id} style={{ padding:16 }}>
            <div style={{ display:"flex", gap:12, marginBottom:10 }}>
              <Av i={p.name.slice(0,2).toUpperCase()} color="#7c3aed" size={42}/>
              <div style={{ minWidth:0 }}>
                <div style={{ fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                <div style={{ fontSize:12, color:"#64748b", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.email}</div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, fontSize:12, color:"#64748b" }}>
              <span>🧬 {p.bloodGroup}</span><span>👤 {p.gender},{p.age}y</span>
              <span>📞 {p.phone}</span><span>📍 {p.address.split(",")[0]}</span>
            </div>
            {p.medicalHistory!=="None"&&<div style={{ marginTop:8, fontSize:11, background:"#fef3c7", borderRadius:7, padding:"4px 9px", color:"#92400e" }}>⚕️ {p.medicalHistory}</div>}
          </Card>
        ))}
      </div>
    </div>
  );

  if(page==="appointments") return (
    <div>
      <PageTitle title="All Appointments"/>
      <Card style={{ padding:0, overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:560 }}>
            <thead><tr style={{ background:"#f8fafc" }}>
              {["#","Patient","Doctor","Date","Status","Action"].map(h=><th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"#64748b", fontWeight:600, fontSize:12, whiteSpace:"nowrap" }}>{h}</th>)}
            </tr></thead>
            <tbody>{apts.map((a,i)=>{
              const pat=patients.find(p=>p.id===a.patientId), doc=docs.find(d=>d.id===a.doctorId);
              return <tr key={a.id} style={{ borderTop:"1px solid #f1f5f9" }}>
                <td style={{ padding:"10px 14px", color:"#94a3b8", fontSize:11 }}>{i+1}</td>
                <td style={{ padding:"10px 14px", fontWeight:600, whiteSpace:"nowrap" }}>{pat?.name}</td>
                <td style={{ padding:"10px 14px", color:"#64748b", whiteSpace:"nowrap" }}>
                  <div style={{ fontSize:12 }}>{doc?.name}</div>
                  <div style={{ fontSize:10, color:"#94a3b8" }}>{doc?.specialization}</div>
                </td>
                <td style={{ padding:"10px 14px", color:"#64748b", whiteSpace:"nowrap", fontSize:12 }}>{a.date}<div style={{ fontSize:10 }}>{a.time}</div></td>
                <td style={{ padding:"10px 14px" }}><Badge status={a.status}/></td>
                <td style={{ padding:"10px 14px" }}>
                  {a.status==="pending"&&<Btn small onClick={()=>{ setApts(p=>p.map(x=>x.id===a.id?{...x,status:"confirmed"}:x)); showToast("Confirmed!"); }}>Confirm</Btn>}
                </td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );
  return null;
}

function AddDocModal({ onClose, onAdd }) {
  const [f,setF] = useState({name:"",email:"",specialization:"",experience:"",fee:"",phone:"",availableTime:""});
  const u = k=>v=>setF(p=>({...p,[k]:v}));
  return (
    <Modal title="Add New Doctor" onClose={onClose}>
      <Inp label="Full Name" value={f.name} onChange={u("name")} required/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <Inp label="Email" value={f.email} onChange={u("email")} type="email" required/>
        <Inp label="Phone" value={f.phone} onChange={u("phone")}/>
        <Inp label="Specialization" value={f.specialization} onChange={u("specialization")} options={["Cardiologist","Neurologist","Dermatologist","Pediatrician","General Physician","Gynecologist","ENT Specialist","Psychiatrist","Orthopedic Surgeon","Ophthalmologist","Endocrinologist","Pulmonologist"]}/>
        <Inp label="Experience (yrs)" value={f.experience} onChange={u("experience")} type="number"/>
        <Inp label="Fee (₹)" value={f.fee} onChange={u("fee")} type="number"/>
        <Inp label="Available Time" value={f.availableTime} onChange={u("availableTime")} placeholder="9AM–5PM"/>
      </div>
      <p style={{ fontSize:12, color:"#94a3b8", margin:"6px 0 12px" }}>Default password: doctor123</p>
      <Btn full onClick={()=>{ if(!f.name||!f.email)return; onAdd({...f,id:"d"+Date.now(),password:"doctor123",role:"doctor",isAvailable:true,availableDays:["Mon","Wed","Fri"],avatar:f.name.slice(0,2).toUpperCase(),experience:+f.experience,fee:+f.fee}); }}>Add Doctor</Btn>
    </Modal>
  );
}

// ============================================================
//  DOCTOR PANEL
// ============================================================
function DoctorPanel({ page, user, apts, setApts, rxs, setRxs, patients, docs, setDocs, showToast, w }) {
  const [modal,setModal] = useState(null);
  const mobile = w < 640;
  const myApts = apts.filter(a=>a.doctorId===user.id);
  const myDoc  = docs.find(d=>d.id===user.id);
  const upd = (id,status)=>{ setApts(p=>p.map(a=>a.id===id?{...a,status}:a)); showToast(`Marked as ${status}`); };

  if(page==="dashboard") return (
    <div>
      <PageTitle title={`Hi, ${user.name.split(" ")[1]} 👋`} sub={`${user.specialization} · ${user.experience}y exp`}/>
      <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr 1fr":"repeat(4,1fr)", gap:12, marginBottom:22 }}>
        <StatCard label="Total" value={myApts.length} icon="📅" color="#2563eb"/>
        <StatCard label="Pending" value={myApts.filter(a=>a.status==="pending").length} icon="⏳" color="#f59e0b"/>
        <StatCard label="Completed" value={myApts.filter(a=>a.status==="completed").length} icon="✅" color="#10b981"/>
        <StatCard label="Prescriptions" value={rxs.filter(r=>r.doctorId===user.id).length} icon="💊" color="#7c3aed"/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"2fr 1fr", gap:16 }}>
        <Card>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:14 }}>Upcoming Appointments</div>
          {myApts.filter(a=>a.status!=="cancelled").slice(0,5).map(a=>{
            const pat=patients.find(p=>p.id===a.patientId);
            return <div key={a.id} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 0", borderBottom:"1px solid #f1f5f9", flexWrap:"wrap", rowGap:6 }}>
              <Av i={pat?.name.slice(0,2).toUpperCase()} color="#7c3aed" size={36}/>
              <div style={{ flex:1, minWidth:120 }}>
                <div style={{ fontWeight:600, fontSize:13 }}>{pat?.name}</div>
                <div style={{ fontSize:11, color:"#64748b" }}>{a.reason}</div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#2563eb" }}>{a.date}</div>
                <Badge status={a.status}/>
              </div>
            </div>;
          })}
        </Card>
        <Card>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:12 }}>My Schedule</div>
          <div style={{ fontSize:13, color:"#64748b", lineHeight:2.2 }}>
            <div>🕐 <strong>{myDoc?.availableTime||user.availableTime}</strong></div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {(myDoc?.availableDays||user.availableDays||[]).map(d=><span key={d} style={{ background:"#eff6ff", color:"#2563eb", borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:600 }}>{d}</span>)}
            </div>
            <div>💰 <strong>₹{myDoc?.fee||user.fee}/visit</strong></div>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ width:9, height:9, borderRadius:"50%", background:(myDoc?.isAvailable??user.isAvailable)?"#10b981":"#94a3b8", display:"inline-block" }}/>
              <strong>{(myDoc?.isAvailable??user.isAvailable)?"Available":"Unavailable"}</strong>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  if(page==="appointments") return (
    <div>
      <PageTitle title={`My Appointments (${myApts.length})`}/>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {myApts.map(a=>{
          const pat=patients.find(p=>p.id===a.patientId);
          return <Card key={a.id} style={{ padding:16 }}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start", flexWrap:"wrap", rowGap:10 }}>
              <Av i={pat?.name.slice(0,2).toUpperCase()} color="#7c3aed" size={44}/>
              <div style={{ flex:1, minWidth:150 }}>
                <div style={{ fontWeight:700, fontSize:15 }}>{pat?.name}</div>
                <div style={{ fontSize:12, color:"#64748b" }}>{pat?.age}y · {pat?.gender} · {pat?.bloodGroup}</div>
                <div style={{ fontSize:12, color:"#64748b", marginTop:3 }}>📋 {a.reason}</div>
                {pat?.medicalHistory&&pat.medicalHistory!=="None"&&<div style={{ marginTop:6, fontSize:11, background:"#fef3c7", borderRadius:7, padding:"3px 9px", color:"#92400e" }}>⚕️ {pat.medicalHistory}</div>}
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontWeight:700, color:"#2563eb", fontSize:13 }}>{a.date}</div>
                <div style={{ fontSize:12, color:"#64748b" }}>{a.time}</div>
                <div style={{ marginTop:5 }}><Badge status={a.status}/></div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
              {a.status==="pending"&&<><Btn small onClick={()=>upd(a.id,"confirmed")}>✓ Confirm</Btn><Btn small outline danger onClick={()=>upd(a.id,"cancelled")}>✗ Cancel</Btn></>}
              {a.status==="confirmed"&&<><Btn small color="#10b981" onClick={()=>upd(a.id,"completed")}>✓ Complete</Btn><Btn small color="#7c3aed" onClick={()=>setModal({type:"rx",apt:a,pat})}>+ Prescription</Btn></>}
              {a.status==="completed"&&<Btn small color="#7c3aed" onClick={()=>setModal({type:"rx",apt:a,pat})}>+ Prescription</Btn>}
            </div>
          </Card>;
        })}
      </div>
      {modal?.type==="rx"&&<RxModal apt={modal.apt} pat={modal.pat} doctorId={user.id} onClose={()=>setModal(null)} onSave={rx=>{ setRxs(p=>[...p,rx]); setModal(null); showToast("Prescription saved!"); }}/>}
    </div>
  );

  if(page==="prescriptions"){
    const myRx=rxs.filter(r=>r.doctorId===user.id);
    return <div><PageTitle title={`Prescriptions (${myRx.length})`}/><div style={{ display:"flex", flexDirection:"column", gap:16 }}>{myRx.map(rx=><RxCard key={rx.id} rx={rx} patient={patients.find(p=>p.id===rx.patientId)}/>)}</div></div>;
  }

  if(page==="profile") return <DocProfile user={user} docs={docs} setDocs={setDocs} showToast={showToast} mobile={mobile}/>;
  return null;
}

function RxModal({ apt, pat, doctorId, onClose, onSave }) {
  const [diag,setDiag] = useState("");
  const [adv,setAdv]   = useState("");
  const [fu,setFu]     = useState("");
  const [meds,setMeds] = useState([{name:"",dosage:"",frequency:"",duration:""}]);
  return (
    <Modal title={`Prescription — ${pat?.name}`} onClose={onClose}>
      <Inp label="Diagnosis" value={diag} onChange={setDiag} required/>
      <div style={{ marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <label style={{ fontSize:13, fontWeight:600, color:"#374151" }}>Medicines</label>
          <Btn small onClick={()=>setMeds(p=>[...p,{name:"",dosage:"",frequency:"",duration:""}])}>+ Add</Btn>
        </div>
        {meds.map((m,i)=>(
          <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:8 }}>
            <input placeholder="Medicine name" value={m.name}      onChange={e=>setMeds(p=>p.map((x,j)=>j===i?{...x,name:e.target.value}:x))}      style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:13, fontFamily:"inherit", width:"100%", boxSizing:"border-box" }}/>
            <input placeholder="Dosage"         value={m.dosage}    onChange={e=>setMeds(p=>p.map((x,j)=>j===i?{...x,dosage:e.target.value}:x))}    style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:13, fontFamily:"inherit", width:"100%", boxSizing:"border-box" }}/>
            <input placeholder="Frequency"      value={m.frequency} onChange={e=>setMeds(p=>p.map((x,j)=>j===i?{...x,frequency:e.target.value}:x))} style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:13, fontFamily:"inherit", width:"100%", boxSizing:"border-box" }}/>
            <input placeholder="Duration"       value={m.duration}  onChange={e=>setMeds(p=>p.map((x,j)=>j===i?{...x,duration:e.target.value}:x))}  style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:13, fontFamily:"inherit", width:"100%", boxSizing:"border-box" }}/>
          </div>
        ))}
      </div>
      <Inp label="Advice" value={adv} onChange={setAdv}/>
      <Inp label="Follow-up Date" value={fu} onChange={setFu} type="date"/>
      <Btn full onClick={()=>{ if(!diag)return; onSave({id:"rx"+Date.now(),appointmentId:apt.id,patientId:apt.patientId,doctorId,date:apt.date,diagnosis:diag,medicines:meds.filter(m=>m.name),advice:adv,followUpDate:fu}); }}>Save Prescription</Btn>
    </Modal>
  );
}

function DocProfile({ user, docs, setDocs, showToast, mobile }) {
  const myDoc = docs.find(d=>d.id===user.id)||user;
  const [avail,setAvail] = useState(myDoc.isAvailable);
  const [time,setTime]   = useState(myDoc.availableTime||"");
  const [days,setDays]   = useState(myDoc.availableDays||[]);
  const allDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return (
    <div>
      <PageTitle title="My Profile"/>
      <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1fr 1fr", gap:16 }}>
        <Card>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:14 }}>Doctor Info</div>
          <div style={{ display:"flex", gap:14, marginBottom:14 }}>
            <Av i={user.avatar||user.name.slice(0,2).toUpperCase()} color="#2563eb" size={56}/>
            <div>
              <div style={{ fontWeight:800, fontSize:17 }}>{user.name}</div>
              <div style={{ color:"#2563eb", fontWeight:600, fontSize:13 }}>{user.specialization}</div>
              <div style={{ color:"#64748b", fontSize:12 }}>{user.experience} yrs</div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:7, fontSize:13, color:"#64748b" }}>
            <div>📧 {user.email}</div><div>📞 {user.phone}</div><div>💰 ₹{myDoc.fee}/visit</div>
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:14 }}>Update Availability</div>
          <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
            <button onClick={()=>setAvail(true)} style={{ padding:"8px 18px", border:"2px solid", borderColor:avail?"#10b981":"#e2e8f0", borderRadius:9, background:avail?"#d1fae5":"#fff", color:avail?"#065f46":"#64748b", fontWeight:600, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>✓ Available</button>
            <button onClick={()=>setAvail(false)} style={{ padding:"8px 18px", border:"2px solid", borderColor:!avail?"#ef4444":"#e2e8f0", borderRadius:9, background:!avail?"#fee2e2":"#fff", color:!avail?"#7f1d1d":"#64748b", fontWeight:600, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>✗ Unavailable</button>
          </div>
          <Inp label="Available Hours" value={time} onChange={setTime} placeholder="9AM–5PM"/>
          <label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:8 }}>Available Days</label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:16 }}>
            {allDays.map(d=><button key={d} onClick={()=>setDays(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d])} style={{ padding:"5px 12px", border:"2px solid", borderColor:days.includes(d)?"#2563eb":"#e2e8f0", borderRadius:8, background:days.includes(d)?"#eff6ff":"#fff", color:days.includes(d)?"#2563eb":"#64748b", fontWeight:600, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>{d}</button>)}
          </div>
          <Btn full onClick={()=>{ setDocs(p=>p.map(d=>d.id===user.id?{...d,isAvailable:avail,availableTime:time,availableDays:days}:d)); showToast("Saved!"); }}>Save Changes</Btn>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
//  PATIENT PANEL
// ============================================================
function PatientPanel({ page, user, setUser, apts, setApts, rxs, docs, showToast, w }) {
  const [modal,setModal] = useState(null);
  const mobile = w < 640;
  const myApts = apts.filter(a=>a.patientId===user.id);
  const myRxs  = rxs.filter(r=>r.patientId===user.id);

  if(page==="dashboard") return (
    <div>
      <PageTitle title={`Hello, ${user.name.split(" ")[0]} 👋`} sub="Your health summary"/>
      <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr 1fr":"repeat(4,1fr)", gap:12, marginBottom:22 }}>
        <StatCard label="Total"        value={myApts.length}                                                  icon="📅" color="#7c3aed"/>
        <StatCard label="Upcoming"     value={myApts.filter(a=>["pending","confirmed"].includes(a.status)).length} icon="📆" color="#2563eb"/>
        <StatCard label="Completed"    value={myApts.filter(a=>a.status==="completed").length}                icon="✅" color="#10b981"/>
        <StatCard label="Prescriptions"value={myRxs.length}                                                   icon="💊" color="#f59e0b"/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"2fr 1fr", gap:16 }}>
        <Card>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:12 }}>Recent Appointments</div>
          {myApts.length===0?<p style={{ color:"#94a3b8", margin:0 }}>No appointments yet. Book one!</p>:myApts.slice(0,4).map(a=>{
            const doc=docs.find(d=>d.id===a.doctorId);
            return <div key={a.id} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 0", borderBottom:"1px solid #f1f5f9", flexWrap:"wrap", rowGap:6 }}>
              <Av i={doc?.avatar} color="#2563eb" size={36}/>
              <div style={{ flex:1, minWidth:100 }}>
                <div style={{ fontWeight:600, fontSize:13 }}>{doc?.name}</div>
                <div style={{ fontSize:11, color:"#64748b" }}>{doc?.specialization}</div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#7c3aed" }}>{a.date}</div>
                <Badge status={a.status}/>
              </div>
            </div>;
          })}
        </Card>
        <Card>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:12 }}>Health Info</div>
          <div style={{ display:"flex", flexDirection:"column", gap:9, fontSize:13 }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#64748b" }}>Blood Group</span><span style={{ fontWeight:700, color:"#ef4444" }}>{user.bloodGroup}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#64748b" }}>Age</span><span style={{ fontWeight:700 }}>{user.age} yrs</span></div>
            <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#64748b" }}>Gender</span><span style={{ fontWeight:700 }}>{user.gender}</span></div>
            <div style={{ borderTop:"1px solid #f1f5f9", paddingTop:9 }}>
              <div style={{ color:"#64748b", fontSize:12, marginBottom:3 }}>Medical History</div>
              <div style={{ fontSize:13, fontWeight:600 }}>{user.medicalHistory||"None"}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  if(page==="book") return (
    <div>
      <PageTitle title="Book an Appointment" sub="Choose a doctor"/>
      <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":w<1024?"1fr 1fr":"repeat(3,1fr)", gap:14 }}>
        {docs.filter(d=>d.isAvailable).map(d=>(
          <Card key={d.id} style={{ padding:16 }}>
            <div style={{ display:"flex", gap:12, marginBottom:12 }}>
              <Av i={d.avatar} color="#2563eb" size={46}/>
              <div style={{ minWidth:0 }}>
                <div style={{ fontWeight:700, fontSize:14, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{d.name}</div>
                <div style={{ color:"#2563eb", fontSize:12, fontWeight:600 }}>{d.specialization}</div>
                <div style={{ fontSize:11, color:"#64748b" }}>⭐ {d.experience}y exp</div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5, fontSize:11, color:"#64748b", marginBottom:12 }}>
              <span>💰 ₹{d.fee}/visit</span><span>🕐 {d.availableTime}</span>
              <span style={{ gridColumn:"span 2" }}>📅 {d.availableDays.join(", ")}</span>
            </div>
            <Btn full onClick={()=>setModal(d)}>Book Appointment</Btn>
          </Card>
        ))}
      </div>
      {modal&&<BookModal doctor={modal} patientId={user.id} onClose={()=>setModal(null)} onBook={apt=>{ setApts(p=>[...p,apt]); setModal(null); showToast("Booked!"); }}/>}
    </div>
  );

  if(page==="appointments") return (
    <div>
      <PageTitle title="My Appointments"/>
      {myApts.length===0&&<Card><p style={{ color:"#94a3b8", textAlign:"center", margin:0 }}>No appointments yet.</p></Card>}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {myApts.map(a=>{
          const doc=docs.find(d=>d.id===a.doctorId);
          return <Card key={a.id} style={{ padding:16 }}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start", flexWrap:"wrap", rowGap:10 }}>
              <Av i={doc?.avatar} color="#2563eb" size={44}/>
              <div style={{ flex:1, minWidth:150 }}>
                <div style={{ fontWeight:700, fontSize:15 }}>{doc?.name}</div>
                <div style={{ color:"#2563eb", fontSize:12 }}>{doc?.specialization}</div>
                <div style={{ color:"#64748b", fontSize:12, marginTop:3 }}>📋 {a.reason}</div>
                {a.notes&&<div style={{ color:"#64748b", fontSize:11, marginTop:3 }}>📝 {a.notes}</div>}
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontWeight:700, color:"#7c3aed", fontSize:13 }}>{a.date}</div>
                <div style={{ fontSize:12, color:"#64748b" }}>{a.time}</div>
                <div style={{ marginTop:5 }}><Badge status={a.status}/></div>
              </div>
            </div>
            {a.status==="pending"&&<div style={{ marginTop:12 }}>
              <Btn small outline danger onClick={()=>{ setApts(p=>p.map(x=>x.id===a.id?{...x,status:"cancelled"}:x)); showToast("Cancelled","error"); }}>Cancel Appointment</Btn>
            </div>}
          </Card>;
        })}
      </div>
    </div>
  );

  if(page==="prescriptions") return (
    <div>
      <PageTitle title={`My Prescriptions (${myRxs.length})`}/>
      {myRxs.length===0&&<Card><p style={{ color:"#94a3b8", textAlign:"center", margin:0 }}>No prescriptions yet.</p></Card>}
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {myRxs.map(rx=><RxCard key={rx.id} rx={rx} doctor={docs.find(d=>d.id===rx.doctorId)}/>)}
      </div>
    </div>
  );

  if(page==="profile") return <PatProfile user={user} setUser={setUser} showToast={showToast} mobile={mobile}/>;
  return null;
}

function BookModal({ doctor, patientId, onClose, onBook }) {
  const [date,setDate]   = useState("");
  const [time,setTime]   = useState("");
  const [reason,setReas] = useState("");
  const times = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM"];
  return (
    <Modal title={`Book — ${doctor.name}`} onClose={onClose}>
      <div style={{ background:"#f0f9ff", borderRadius:10, padding:"10px 14px", marginBottom:14 }}>
        <div style={{ fontWeight:700, fontSize:14 }}>{doctor.specialization}</div>
        <div style={{ fontSize:12, color:"#64748b" }}>💰 ₹{doctor.fee}/visit · 🕐 {doctor.availableTime}</div>
      </div>
      <Inp label="Date" value={date} onChange={setDate} type="date" required/>
      <Inp label="Time Slot" value={time} onChange={setTime} options={times.map(t=>({value:t,label:t}))} required/>
      <div style={{ marginBottom:14 }}>
        <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:5 }}>Reason <span style={{ color:"#ef4444" }}>*</span></label>
        <textarea value={reason} onChange={e=>setReas(e.target.value)} rows={3} placeholder="Describe your symptoms..." style={{ width:"100%", padding:"9px 12px", borderRadius:9, border:"1.5px solid #e2e8f0", fontSize:14, fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }}/>
      </div>
      <Btn full onClick={()=>{ if(!date||!time||!reason)return; onBook({id:"apt"+Date.now(),patientId,doctorId:doctor.id,date,time,reason,status:"pending",notes:""}); }}>Confirm Booking</Btn>
    </Modal>
  );
}

function PatProfile({ user, setUser, showToast, mobile }) {
  const [f,setF] = useState({name:user.name,phone:user.phone||"",address:user.address||"",age:user.age||"",bloodGroup:user.bloodGroup||"",medicalHistory:user.medicalHistory||""});
  const u = k=>v=>setF(p=>({...p,[k]:v}));
  return (
    <div>
      <PageTitle title="My Profile"/>
      <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1fr 2fr", gap:16 }}>
        <Card style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:28, textAlign:"center" }}>
          <Av i={user.name.slice(0,2).toUpperCase()} color="#7c3aed" size={72}/>
          <div style={{ fontWeight:800, fontSize:17, marginTop:12 }}>{user.name}</div>
          <div style={{ color:"#7c3aed", fontWeight:600, fontSize:12 }}>Patient</div>
          <div style={{ color:"#64748b", fontSize:12, marginTop:3 }}>{user.email}</div>
          <div style={{ marginTop:14, display:"flex", gap:7, flexWrap:"wrap", justifyContent:"center" }}>
            <span style={{ background:"#fef3c7", color:"#92400e", borderRadius:8, padding:"4px 11px", fontSize:12, fontWeight:700 }}>🩸 {user.bloodGroup}</span>
            <span style={{ background:"#eff6ff", color:"#1e40af", borderRadius:8, padding:"4px 11px", fontSize:12, fontWeight:700 }}>{user.gender}</span>
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:14 }}>Edit Profile</div>
          <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1fr 1fr", gap:10 }}>
            <div style={{ gridColumn:mobile?"1":"span 2" }}><Inp label="Full Name" value={f.name} onChange={u("name")}/></div>
            <Inp label="Phone" value={f.phone} onChange={u("phone")}/>
            <Inp label="Age" value={f.age} onChange={u("age")} type="number"/>
            <Inp label="Blood Group" value={f.bloodGroup} onChange={u("bloodGroup")} options={["A+","A-","B+","B-","AB+","AB-","O+","O-"]}/>
            <div style={{ gridColumn:mobile?"1":"span 2" }}><Inp label="Address" value={f.address} onChange={u("address")}/></div>
            <div style={{ gridColumn:mobile?"1":"span 2" }}>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:5 }}>Medical History</label>
              <textarea value={f.medicalHistory} onChange={e=>u("medicalHistory")(e.target.value)} rows={3} style={{ width:"100%", padding:"9px 12px", borderRadius:9, border:"1.5px solid #e2e8f0", fontSize:14, fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }}/>
            </div>
          </div>
          <Btn onClick={()=>{ setUser({...user,...f}); showToast("Profile updated!"); }} style={{ marginTop:8 }}>Save Profile</Btn>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
//  SHARED — RxCard & PageTitle
// ============================================================
function RxCard({ rx, doctor, patient }) {
  return (
    <Card style={{ padding:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontWeight:800, fontSize:16, color:"#0f172a" }}>📋 {rx.diagnosis}</div>
          <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>
            {doctor&&<span>👨‍⚕️ {doctor.name} · </span>}
            {patient&&<span>👤 {patient.name} · </span>}
            📅 {rx.date}
          </div>
        </div>
        {rx.followUpDate&&<div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:9, padding:"5px 12px", fontSize:12, color:"#065f46", fontWeight:600, flexShrink:0 }}>🗓 Follow-up: {rx.followUpDate}</div>}
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:7 }}>💊 Medicines</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {rx.medicines.map((m,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 2fr 1fr", gap:8, background:"#f8fafc", borderRadius:10, padding:"9px 12px", fontSize:12 }}>
              <span style={{ fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.name}</span>
              <span style={{ color:"#7c3aed", fontWeight:600 }}>{m.dosage}</span>
              <span style={{ color:"#64748b" }}>{m.frequency}</span>
              <span style={{ color:"#10b981", fontWeight:600 }}>{m.duration}</span>
            </div>
          ))}
        </div>
      </div>
      {rx.advice&&<div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:9, padding:"9px 12px", fontSize:12, color:"#78350f" }}>💡 <strong>Advice:</strong> {rx.advice}</div>}
    </Card>
  );
}