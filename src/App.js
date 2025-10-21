import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WorkPage from "./pages/WorkPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import InteractionDesignCase from "./pages/InteractionDesignCase";



// Simple minimal navbar with active highlight
function Navbar() {
  const location = useLocation();
  const navs = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/work", label: "Work" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/contact", label: "Contact" }
  ];
  return (
    <nav style={{
      width: "100%", background: "#fff", boxShadow: "0 2px 13px #d2ddec22",
      padding: "20px 0 15px", display: "flex", justifyContent: "center",
      position: "sticky", top: 0, gap: 42, fontWeight: 700, fontSize: 19, zIndex: 99
    }}>
      {navs.map(({ to, label }) => (
        <Link key={to} to={to}
          style={{
            color: location.pathname === to ? "#7B9ACC" : "#232751",
            textDecoration: "none", borderRadius: 19,
            padding: "8px 17px", opacity: location.pathname === to ? 1.0 : 0.82,
            fontWeight: 800
          }}>{label}</Link>
      ))}
    </nav>
  );
}

// Main app
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/interaction-design-case" element={<InteractionDesignCase />} />
      </Routes>
    </Router>
  );
}
