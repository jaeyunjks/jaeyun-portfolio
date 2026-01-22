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
import { Moon, Sun, Menu } from 'lucide-react';

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
        background: theme === "dark" ? "#0f172a" : "#ffffff",
        color: theme === "dark" ? "#e2e8f0" : "#232751",
        boxShadow: theme === "dark" ? "-6px 0 30px rgba(0,0,0,0.7)" : "-6px 0 30px rgba(0,0,0,0.15)",
        zIndex: 999,
        paddingTop: 70,
        paddingBottom: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        overflowY: "auto",
        transition: "all 0.3s ease",
      }}>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: theme === "dark" ? "#a5d6ff" : "#7b9acc",
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
              color: location.pathname === to
                ? (theme === "dark" ? "#a5d6ff" : "#7b9acc")
                : (theme === "dark" ? "#cbd5e1" : "#4b5563"),
              textDecoration: "none",
              padding: "18px 6vw",
              marginBottom: 6,
              fontWeight: location.pathname === to ? 900 : 700,
              fontSize: 17,
              opacity: location.pathname === to ? 1 : 0.92,
              background: location.pathname === to
                ? (theme === "dark" ? "rgba(165,214,255,0.12)" : "rgba(123,154,204,0.08)")
                : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    )
  );
}

// Navbar
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
          background: theme === "dark"
            ? "rgba(13, 17, 23, 0.92)"
            : "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(14px)",
          boxShadow: theme === "dark"
            ? "0 6px 32px rgba(0,0,0,0.6)"
            : "0 6px 32px rgba(0,0,0,0.12)",
          borderBottom: `1px solid ${theme === "dark" ? "rgba(48,54,61,0.45)" : "rgba(226,232,240,0.6)"}`,
          padding: isMobile ? "14px 1rem" : "16px 2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          gap: isMobile ? 0 : "3.5rem",
          transition: "all 0.3s ease",
        }}
      >
        {/* Theme Toggle */}
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
            color: theme === "dark" ? "#a5d6ff" : "#7b9acc",
            transition: "transform 0.3s ease",
            position: "absolute",
            left: isMobile ? "16px" : "32px",
            fontSize: "1.4rem",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.15)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          {theme === "dark" ? (
            <Sun size={28} />
          ) : (
            <Moon size={28} />
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
                  color: location.pathname === to
                    ? (theme === "dark" ? "#a5d6ff" : "#7b9acc")
                    : (theme === "dark" ? "#e2e8f0" : "#232751"),
                  textDecoration: "none",
                  fontWeight: location.pathname === to ? 900 : 700,
                  fontSize: 18,
                  transition: "all 0.22s ease",
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
              color: theme === "dark" ? "#a5d6ff" : "#7b9acc",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              position: "absolute",
              right: "16px",
            }}
          >
            <Menu size={34} />
          </button>
        )}
      </nav>

      <MobileNavMenu
        navs={navs}
        location={location}
        open={isMobile && showMenu}
        setOpen={setShowMenu}
      />
    </>
  );
}

// Main App
export default function App() {
  return (
    <Router>
      <ParticlesBackground />

      <Navbar />

      <div
        className="page-content"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          background: "transparent", // biar body yang handle background via --bg-primary
          paddingTop: "90px", // ruang untuk navbar fixed
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