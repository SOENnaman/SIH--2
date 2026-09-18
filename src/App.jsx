import React, { useState } from "react";
import { Routes, Route, Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck, LayoutDashboard, ScanLine, PackageSearch, FileText,
  BarChart3, Users, Settings, Bell, Search, ChevronDown, Menu, X,
  UploadCloud, ArrowRight, Check, AlertTriangle, Clock3, Download,
  MoreHorizontal, Eye, Home, Info, BookOpen, Lock, UserCircle, CalendarDays,
  CircleHelp, LogOut
} from "lucide-react";

const products = [
  { id:"INS-2025-0048", name:"Sunfeast Marie Light", category:"Biscuits", status:"Non-Compliant", date:"26 Apr 2025", color:"#f4c24d" },
  { id:"INS-2025-0047", name:"Dove Shampoo", category:"Cosmetics", status:"Compliant", date:"25 Apr 2025", color:"#dbe8f2" },
  { id:"INS-2025-0046", name:"Lay's Chips", category:"Snacks", status:"Non-Compliant", date:"24 Apr 2025", color:"#f5dc36" },
  { id:"INS-2025-0045", name:"Maggi Noodles", category:"Food", status:"Compliant", date:"23 Apr 2025", color:"#df3d28" },
  { id:"INS-2025-0044", name:"Patanjali Honey", category:"Beverages", status:"Needs Review", date:"22 Apr 2025", color:"#d79b2b" },
];

function Brand({ light=false }) {
  return (
    <div className={"brand " + (light ? "brand-light" : "")}>
      <div className="brand-mark"><ShieldCheck size={24}/></div>
      <div>
        <div className="brand-name">Niyamit</div>
        <div className="brand-sub">Legal Metrology Compliance Assistant</div>
      </div>
    </div>
  );
}

const nav = [
  ["Dashboard", "/", LayoutDashboard],
  ["New Inspection", "/inspection", ScanLine],
  ["Product Repository", "/products", PackageSearch],
  ["Reports", "/reports", FileText],
  ["Analytics", "/analytics", BarChart3],
  ["User Management", "/users", Users],
  ["Settings", "/settings", Settings],
];

function Sidebar({ mobileOpen, setMobileOpen }) {
  const location = useLocation();
  return (
    <aside className={"sidebar " + (mobileOpen ? "mobile-open" : "")}>
      <div className="sidebar-top">
        <Brand light />
        <button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={20}/></button>
      </div>
      <nav>
        {nav.map(([label,path,Icon]) => {
          const active = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
          return <Link key={path} to={path} className={"side-link " + (active ? "active":"")} onClick={()=>setMobileOpen(false)}>
            <Icon size={17}/><span>{label}</span>
          </Link>
        })}
      </nav>
      <div className="sidebar-user">
        <div className="avatar">RP</div>
        <div><b>Rajesh Phulwari</b><small>Inspector</small></div>
        <ChevronDown size={15}/>
      </div>
    </aside>
  );
}

function Topbar({ onMenu }) {
  return <header className="topbar">
    <button className="menu-btn" onClick={onMenu}><Menu size={22}/></button>
    <div className="search-box"><Search size={16}/><input placeholder="Search by product name, ID, or reference..." /></div>
    <div className="top-actions"><Bell size={18}/><div className="avatar small">RP</div></div>
  </header>
}

function AppLayout({ children }) {
  const [mobileOpen,setMobileOpen] = useState(false);
  return <div className="app-shell">
    <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
    {mobileOpen && <div className="backdrop" onClick={()=>setMobileOpen(false)}/>}
    <main className="main"><Topbar onMenu={()=>setMobileOpen(true)}/>{children}</main>
  </div>
}

function Status({children}) {
  const cls = children === "Compliant" ? "green" : children === "Non-Compliant" ? "red" : "amber";
  return <span className={"status "+cls}>{children}</span>
}

function StatCard({title,value,change,type="green"}) {
  return <div className="stat-card">
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
    <div className={"stat-change "+type}>{change}</div>
  </div>
}

function Dashboard() {
  return <AppLayout><div className="page">
    <div className="page-heading">
      <div><h1>Good Morning, Rajesh!</h1><p>Here’s what’s happening with your inspections today.</p></div>
      <Link className="primary-btn" to="/inspection"><ScanLine size={17}/> Start Inspection</Link>
    </div>
    <div className="stats-grid">
      <StatCard title="Total Inspections" value="48" change="↑ 12% from last week"/>
      <StatCard title="Compliant Products" value="32" change="↑ 6% from last week"/>
      <StatCard title="Violations Found" value="11" change="↑ 3% from last week" type="red"/>
      <StatCard title="Pending Review" value="5" change="↓ 2% from last week" type="amber"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel chart-panel">
        <div className="panel-head"><div><h2>Compliance Trend</h2><p>Inspection results over the last 7 days</p></div><div className="legend"><span><i className="dot green-dot"/>Compliant</span><span><i className="dot red-dot"/>Non-Compliant</span></div></div>
        <div className="chart">
          <div className="y-labels"><span>50</span><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span></div>
          <div className="chart-area">
            {[0,1,2,3,4,5].map(i=><div className="gridline" key={i} style={{top:`${i*20}%`}}/>)}
            <svg viewBox="0 0 700 250" preserveAspectRatio="none">
              <polyline points="0,180 90,160 180,170 270,115 360,125 450,75 540,110 630,55 700,35" fill="none" stroke="#328c75" strokeWidth="3"/>
              <polyline points="0,215 90,205 180,190 270,188 360,165 450,170 540,140 630,150 700,115" fill="none" stroke="#dc7775" strokeWidth="3"/>
            </svg>
            <div className="x-labels">{["May 20","May 21","May 22","May 23","May 24","May 25","May 26"].map(x=><span key={x}>{x}</span>)}</div>
          </div>
        </div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><h2>Recent Inspections</h2><p>Latest activity</p></div><Link to="/reports" className="text-link">View all</Link></div>
        <div className="recent-list">{products.slice(0,4).map(p=><div className="recent-row" key={p.id}>
          <div className="product-thumb" style={{background:p.color}}>{p.name[0]}</div>
          <div className="recent-name"><b>{p.name}</b><small>{p.date}</small></div><Status>{p.status}</Status>
        </div>)}</div>
      </section>
    </div>
  </div></AppLayout>
}

function Landing() {
  return <div className="landing">
    <header className="landing-nav"><Brand/><div className="gov-text">Ministry of Consumer Affairs,<br/><span>Food & Public Distribution</span></div><nav><a href="#how">How it works</a><a href="#features">Features</a><Link to="/login" className="dark-btn">Login</Link></nav></header>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">AI-POWERED LEGAL METROLOGY</span>
        <h1>Scan. Verify.<br/><strong>Protect.</strong></h1>
        <p>AI-powered compliance checking for packaged commodities under Legal Metrology Rules, 2011.</p>
        <div className="hero-actions"><Link to="/login" className="primary-btn">Start Inspection <ArrowRight size={17}/></Link><a href="#how" className="outline-btn">Learn More</a></div>
      </div>
      <div className="hero-visual">
        <div className="scan-card">
          <div className="scan-top"><span><ScanLine size={15}/> Scanning...</span><ArrowRight size={15}/></div>
          <div className="scan-product"><div className="mock-pack"><b>MARIE</b><span>LIGHT</span><small>Biscuits</small></div></div>
          <div className="scan-checks">
            <div>MRP <Check/></div><div>Net Quantity <Check/></div><div>Manufacturer <Check/></div><div>Consumer Care <AlertTriangle/></div>
          </div>
        </div>
      </div>
    </section>
    <section id="features" className="feature-strip">{[
      [ScanLine,"Scan Products","Upload or capture product images."],
      [ShieldCheck,"Check Compliance","AI analyzes mandatory declarations."],
      [FileText,"Get Reports","Detailed report with evidence and violations."],
      [Clock3,"Track History","Maintain inspection records and analytics."]
    ].map(([I,t,d])=><div key={t}><div className="feature-icon"><I size={19}/></div><div><b>{t}</b><p>{d}</p></div></div>)}</section>
    <section id="how" className="landing-bottom"><div><span className="eyebrow">WHY NIYAMIT</span><h2>Technology assists.<br/>People decide.</h2></div><p>Designed to help inspectors identify missing or incorrect declarations quickly, consistently, and with traceable evidence.</p></section>
  </div>
}

function Login() {
  const navigate=useNavigate();
  return <div className="login-page">
    <div className="login-image"><div className="login-overlay"><Brand light/><div className="login-tag"><h2>Ensuring every packaged product meets the mark.</h2><p>Scan products, check compliance, create reports — all in one place.</p></div></div></div>
    <div className="login-form-wrap"><div className="login-form">
      <div className="mobile-brand"><Brand/></div>
      <h1>Welcome Back</h1><p>Login to continue to your dashboard.</p>
      <label>Email / Username</label><input placeholder="Enter your email or username"/>
      <label>Password</label><div className="password"><input type="password" placeholder="Enter your password"/><Eye size={16}/></div>
      <div className="login-options"><label><input type="checkbox"/> Remember me</label><a>Forgot password?</a></div>
      <button className="primary-btn full" onClick={()=>navigate("/")}>Login</button>
      <div className="or"><span>or</span></div>
      <button className="government-btn"><ShieldCheck size={16}/> Login with Government ID</button>
      <div className="secure">Secure &nbsp;•&nbsp; Government Platform &nbsp;•&nbsp; Version 1.0</div>
    </div></div>
  </div>
}

function Inspection() {
  const [files,setFiles]=useState([]);
  const [analyzing,setAnalyzing]=useState(false);
  const navigate=useNavigate();
  const handleFiles=e=>setFiles(Array.from(e.target.files||[]));
  const analyze=()=>{setAnalyzing(true);setTimeout(()=>navigate("/inspection/results"),1000)};
  return <AppLayout><div className="page">
    <div className="page-heading"><div><h1>New Inspection</h1><p>Upload product images to begin a compliance check.</p></div></div>
    <div className="steps"><div className="step active"><b>1</b> Upload Images</div><div className="step"><b>2</b> Extract & Analyze</div><div className="step"><b>3</b> Review & Report</div></div>
    <div className="upload-panel">
      <div className="upload-box">
        <UploadCloud size={42}/>
        <h2>Upload Product Images</h2><p>Drag and drop images here or click to browse</p><small>Supports JPG, PNG (Max 10MB)</small>
        <input id="file-upload" type="file" multiple accept="image/*" onChange={handleFiles}/>
        <label htmlFor="file-upload" className="outline-btn">Browse Files</label>
      </div>
      {files.length>0 && <div className="selected-files">{files.map(f=><div className="file-pill" key={f.name}><FileText size={15}/>{f.name}</div>)}</div>}
      <div className="inspection-actions"><Link className="outline-btn" to="/">Cancel</Link><button className="primary-btn" disabled={analyzing} onClick={analyze}>{analyzing?"Analyzing...":"Next"} <ArrowRight size={16}/></button></div>
    </div>
  </div></AppLayout>
}

function Results() {
  const checks=[
    ["Product Name","Compliant"],["Manufacturer Details","Compliant"],["Net Quantity","Compliant"],["MRP","Compliant"],["Unit Sale Price","Missing"],["Manufacturing Date","Needs Review"],["Consumer Care Details","Compliant"],["Country of Origin","Compliant"]
  ];
  return <AppLayout><div className="page">
    <div className="page-heading"><div><h1>Inspection Results</h1><p>AI analysis completed. Review findings before generating the report.</p></div><Status>Non-Compliant</Status></div>
    <div className="result-product panel"><div className="large-product" style={{background:"#f4c24d"}}><b>MARIE</b><span>LIGHT</span></div><div><h2>Sunfeast Marie Light Biscuits</h2><p>500 g &nbsp;•&nbsp; Category: Biscuits</p><small>Inspection ID: INS-2025-0048 &nbsp;•&nbsp; Date: 26 Apr 2025</small></div></div>
    <div className="results-grid">
      <section className="panel"><div className="tabs"><b>Summary</b><span>Extracted Information</span><span>Evidence</span><span>Report</span></div><h2 className="section-title">Compliance Checklist</h2>{checks.map(([name,status])=><div className="check-row" key={name}><span>{name}</span><Status>{status==="Missing"?"Non-Compliant":status}</Status></div>)}</section>
      <section className="panel detail-panel"><h2>Violation Details</h2><small>Rule reference</small><p><b>Rule 6 (1) — Sale Price</b></p><small>Issue</small><p>Unit sale price not mentioned on the package.</p><small>Evidence</small><div className="evidence"><div className="mock-label">MRP ₹ 50.00<br/><small>(INCL. OF ALL TAXES)</small></div></div><div className="confidence"><span>Confidence</span><b>96%</b></div><div className="result-actions"><button className="primary-btn"><Download size={16}/> Download Report</button><button className="outline-btn">Mark as Reviewed</button></div></section>
    </div>
  </div></AppLayout>
}

function Reports() {
  return <AppLayout><div className="page">
    <div className="page-heading"><div><h1>Reports</h1><p>Review and export inspection reports.</p></div><button className="outline-btn"><Download size={16}/> Export</button></div>
    <div className="panel table-panel"><div className="report-toolbar"><div className="search-box"><Search size={15}/><input placeholder="Search by product name, ID or date..." /></div><button className="filter-btn">All Reports <ChevronDown size={15}/></button><button className="filter-btn">Apr 01 — Apr 26 <CalendarDays size={15}/></button></div>
      <div className="tabs report-tabs"><b>All Reports</b><span>Compliant</span><span>Not-Compliant</span><span>Needs Review</span></div>
      <table><thead><tr><th>ID</th><th>Product Name</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>{products.map(p=><tr key={p.id}><td>{p.id}</td><td><b>{p.name}</b></td><td><Status>{p.status}</Status></td><td>{p.date}</td><td><button className="icon-btn"><Download size={15}/></button><button className="icon-btn"><Eye size={15}/></button><button className="icon-btn"><MoreHorizontal size={15}/></button></td></tr>)}</tbody></table>
    </div>
  </div></AppLayout>
}

function Products() {
  return <AppLayout><div className="page"><div className="page-heading"><div><h1>Product Repository</h1><p>Browse previously inspected products.</p></div><Link to="/inspection" className="primary-btn"><ScanLine size={16}/> New Inspection</Link></div>
    <div className="panel table-panel"><div className="report-toolbar"><div className="search-box"><Search size={15}/><input placeholder="Search products..." /></div><button className="filter-btn">Category <ChevronDown size={15}/></button><button className="filter-btn">Status <ChevronDown size={15}/></button></div>
    <table><thead><tr><th>Product</th><th>Category</th><th>Last Inspected</th><th>Status</th><th>Actions</th></tr></thead><tbody>{products.map(p=><tr key={p.id}><td><div className="product-cell"><div className="product-thumb" style={{background:p.color}}>{p.name[0]}</div><b>{p.name}</b></div></td><td>{p.category}</td><td>{p.date}</td><td><Status>{p.status}</Status></td><td><button className="icon-btn"><Download size={15}/></button><button className="icon-btn"><Eye size={15}/></button></td></tr>)}</tbody></table></div>
  </div></AppLayout>
}

function Analytics() {
  return <AppLayout><div className="page"><div className="page-heading"><div><h1>Analytics</h1><p>Understand compliance trends across inspections.</p></div></div>
    <div className="stats-grid"><StatCard title="Total Inspections" value="248" change="↑ 12%"/><StatCard title="Compliance Rate" value="78%" change="↑ 5%"/><StatCard title="Violation Rate" value="22%" change="↓ 5%" type="red"/><StatCard title="Avg. Processing Time" value="2.4 min" change="↓ 40%" type="green"/></div>
    <div className="analytics-grid"><div className="panel"><h2>Violations by Category</h2><div className="bars">{[["MRP",32],["Net Quantity",20],["Manufacture Details",15],["Consumer Care",12],["Others",21]].map(([x,n])=><div className="bar-row" key={x}><span>{x}</span><div className="bar"><i style={{width:n*2.3+"%"}}/></div><b>{n}%</b></div>)}</div></div><div className="panel"><h2>Top Products with Violations</h2><div className="rank-list">{["Biscuits","Snacks","Cosmetics","Beverages","Household"].map((x,i)=><div key={x}><span>{x}</span><b>{12-i*2}</b></div>)}</div></div></div>
  </div></AppLayout>
}

function SimplePage({title,icon:Icon}) {
  return <AppLayout><div className="page"><div className="page-heading"><div><h1>{title}</h1><p>Manage {title.toLowerCase()} for the Niyamit platform.</p></div></div><div className="panel empty-panel"><Icon size={36}/><h2>{title}</h2><p>This section is ready for your backend integration and additional controls.</p><button className="primary-btn">Configure</button></div></div></AppLayout>
}

export default function App() {
  return <Routes>
    <Route path="/home" element={<Landing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/inspection" element={<Inspection/>}/>
    <Route path="/inspection/results" element={<Results/>}/>
    <Route path="/reports" element={<Reports/>}/>
    <Route path="/products" element={<Products/>}/>
    <Route path="/analytics" element={<Analytics/>}/>
    <Route path="/users" element={<SimplePage title="User Management" icon={Users}/>}/>
    <Route path="/settings" element={<SimplePage title="Settings" icon={Settings}/>}/>
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>
}
