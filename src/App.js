import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WorkPage from "./pages/WorkPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import InteractionDesignCase from "./pages/InteractionDesignCase";
import EventManagementCaseStudy from "./pages/EventManagementCaseStudy";
import STQM from "./pages/STQM";
import ParticlesBackground from "./components/ParticlesBackground";
import { useTheme } from "./context/ThemeContext";

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
  const { theme } = useTheme();

  return (
    open && (
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "75vw",
        maxWidth: 360,
        height: "100vh",
        background: theme === "dark" ? "var(--bg-secondary)" : "var(--bg-secondary)",
        color: "var(--text-primary)",
        boxShadow: "-6px 0 30px var(--shadow)",
        zIndex: 999,
        paddingTop: 70,
        paddingBottom: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        overflowY: "auto",
      }}>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "var(--accent)",
            fontSize: 36,
            fontWeight: 900,
            marginRight: 28,
            marginTop: -60,
            marginBottom: 40,
            cursor: "pointer",
          }}
        >
          ×
        </button>
        {navs.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            style={{
              width: "100%",
              textAlign: "right",
              color: location.pathname === to ? "var(--accent)" : "var(--text-secondary)",
              textDecoration: "none",
              padding: "18px 6vw",
              marginBottom: 6,
              fontWeight: location.pathname === to ? 900 : 700,
              fontSize: 17,
              opacity: location.pathname === to ? 1 : 0.92,
              background: location.pathname === to ? "rgba(165,214,255,0.12)" : "transparent",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    )
  );
}

// Navbar – links di tengah, toggle di kiri
function Navbar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showMenu, setShowMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navs = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/work", label: "Work" },
    { to: "/portfolio", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        style={{
          width: "100vw",
          background: isMobile ? "var(--bg-primary)" : "rgba(13, 17, 23, 0.68)",
          backdropFilter: isMobile ? "none" : "blur(14px)",
          boxShadow: isMobile ? "none" : "0 6px 32px rgba(0,0,0,0.4)",
          borderBottom: "1px solid rgba(48, 54, 61, 0.28)",
          padding: isMobile ? "14px 1rem" : "16px 2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          gap: isMobile ? 0 : "3.5rem",
        }}
      >
        {/* Toggle button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
            transition: "transform 0.3s ease, color 0.3s ease",
            position: "absolute",
            left: isMobile ? "16px" : "32px",
            fontSize: "1.4rem",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          {theme === "dark" ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Desktop links – di tengah */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "3.5rem", justifyContent: "center" }}>
            {navs.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  color: location.pathname === to ? "var(--accent)" : "var(--text-primary)",
                  textDecoration: "none",
                  fontWeight: location.pathname === to ? 900 : 700,
                  fontSize: 18,
                  transition: "color 0.22s ease, transform 0.22s ease",
                  transform: location.pathname === to ? "scale(1.08)" : "scale(1)",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={() => setShowMenu(v => !v)}
            style={{
              background: "none",
              border: "none",
              fontSize: 34,
              fontWeight: 900,
              color: "var(--accent)",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              position: "absolute",
              right: "16px",
            }}
          >
            ☰
          </button>
        )}
      </nav>

      <MobileNavMenu navs={navs} location={location} open={isMobile && showMenu} setOpen={setShowMenu} />
    </>
  );
}

// Main App – versi minimal & aman
export default function App() {
  return (
    <Router>
      <ParticlesBackground />

      <Navbar />

      <div
        className="page-content"  // ← ini wajib untuk padding-top dari CSS
        style={{
          position: "relative",
          zIndex: 1,
          background: "var(--overlay)",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/interaction-design-case" element={<InteractionDesignCase />} />
          <Route path="/event-management-case-study" element={<EventManagementCaseStudy />} />
          <Route path="/stqm-case-study" element={<STQM />} />
        </Routes>
      </div>
    </Router>
  );
}