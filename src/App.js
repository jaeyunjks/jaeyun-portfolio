import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WorkPage from "./pages/WorkPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import InteractionDesignCase from "./pages/InteractionDesignCase";

// Responsive device hook
function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < breakpoint);
  React.useEffect(() => {
    function handleResize() { setIsMobile(window.innerWidth < breakpoint); }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// Mobile navbar overlay
function MobileNavMenu({ navs, location, open, setOpen }) {
  return (
    open && (
      <div style={{
        position: "fixed",
        top: 0, right: 0,
        width: "70vw",
        maxWidth: 350,
        height: "100vh",
        background: "#fff",
        boxShadow: "-1px 0 22px #23275112",
        zIndex: 999,
        paddingTop: 52,
        paddingBottom: 22,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
      }}>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "#7B9ACC",
            fontSize: 23,
            fontWeight: 900,
            marginRight: 20,
            marginTop: -44,
            marginBottom: 21,
            cursor: "pointer"
          }}>×</button>
        {navs.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            style={{
              width: "100%",
              textAlign: "right",
              color: location.pathname === to ? "#7B9ACC" : "#232751",
              textDecoration: "none",
              borderRadius: 6,
              background: location.pathname === to ? "#EDF2FB" : "none",
              padding: "14px 4vw",
              marginBottom: 5,
              fontWeight: 800,
              fontSize: 16,
              opacity: location.pathname === to ? 1 : 0.82
            }}
          >{label}</Link>
        ))}
      </div>
    )
  );
}

// Responsive Navbar (desktop: color active, no hover effect; mobile: titik tiga)
function Navbar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showMenu, setShowMenu] = useState(false);
  const navs = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/work", label: "Work" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <>
      <nav style={{
        width: "100vw",
        background: isMobile ? "#fff" : "rgba(249,252,252,.98)",
        boxShadow: isMobile ? "none" : "0 4px 23px #c7d8f733",
        padding: isMobile ? "7px 0 7px" : "17px 0 15px",
        display: "flex",
        justifyContent: isMobile ? "flex-end" : "center",
        alignItems: "center",
        position: "sticky",
        top: 0,
        borderRadius: isMobile ? 0 : 22,
        gap: isMobile ? 0 : 38,
        fontWeight: 700,
        fontSize: isMobile ? 13.8 : 19,
        zIndex: 100,
        height: isMobile ? 44 : undefined,
        minHeight: isMobile ? 44 : undefined
      }}>
        {/* Desktop: normal nav links, minimalist NO underline */}
        {!isMobile && (
          <>
            {navs.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  color: location.pathname === to ? "#7B9ACC" : "#232751",
                  textDecoration: "none",
                  borderRadius: 2,
                  background: "none",
                  padding: "8px 15px",
                  fontWeight: 800,
                  boxShadow: "none",
                  border: "none",
                  opacity: location.pathname === to ? 1 : 0.84,
                  fontSize: 19,
                  whiteSpace: "nowrap",
                  transition: "color .18s, background .18s"
                }}
              >
                {label}
              </Link>
            ))}
          </>
        )}
        {/* Mobile: titik tiga menu (vertical dots) */}
        {isMobile && (
          <button
            onClick={() => setShowMenu(v => !v)}
            style={{
              background: "none",
              border: "none",
              fontSize: 27,
              fontWeight: 900,
              color: "#7B9ACC",
              marginRight: 16,
              cursor: "pointer",
              padding: 0,
              outline: "none"
            }}
            aria-label="Open menu"
          >
            ⋮
          </button>
        )}
      </nav>
      {/* Mobile dropdown menu */}
      <MobileNavMenu navs={navs} location={location} open={isMobile && showMenu} setOpen={setShowMenu} />
    </>
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
