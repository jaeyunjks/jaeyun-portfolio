import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// Responsive device hook
function useIsMobile(breakpoint = 600) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < breakpoint);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);
    return isMobile;
}

function useLoopTyping(text, delay = 50, wait = 1200) {
    const [out, setOut] = useState("");
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        if (idx < text.length) {
            const timer = setTimeout(() => setIdx(i => i + 1), delay);
            setOut(text.slice(0, idx + 1));
            return () => clearTimeout(timer);
        } else {
            const loop = setTimeout(() => setIdx(0), wait);
            return () => clearTimeout(loop);
        }
    }, [idx, text, delay, wait]);
    return out;
}

const LinkedInIcon = ({ size = 34 }) => (
    <svg height={size} width={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="9" fill="#7B9ACC" fillOpacity="0.13" />
        <path d="M11 13h2v7h-2v-7zm1-2.2a1.21 1.21 0 1 1 0-2.42 1.21 1.21 0 0 1 0 2.42zM13 15h1.8v1h.02c.25-.47.85-.98 1.8-.98 1.93 0 2.28 1.36 2.28 3.12V20h-2v-2c0-.5 0-1.15-.7-1.15-.7 0-.8.55-.8 1.12V20h-2v-5z" fill="#7B9ACC" fillOpacity="0.82" />
    </svg>
);

const GithubIcon = ({ size = 34 }) => (
    <svg height={size} width={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="9" fill="#232751" fillOpacity="0.11" />
        <path d="M16 6C10.47 6 6 10.47 6 16c0 4.43 2.87 8.18 6.84 9.52.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.14-1.1-1.44-1.1-1.44-.9-.61.07-.6.07-.6 1 .07 1.54 1.02 1.54 1.02.89 1.53 2.34 1.09 2.91.83.09-.64.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.11-.25-.45-1.25.1-2.6 0 0 .84-.27 2.75 1.02a9.57 9.57 0 0 1 2.5-.34c.85.004 1.71.115 2.5.334 1.9-1.3 2.74-1.02 2.74-1.02.55 1.35.21 2.35.1 2.6.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.7-4.57 4.95.36.31.68.93.68 1.88v2.79c.001.262.16.57.67.474A10.013 10.013 0 0 0 26 16c0-5.53-4.47-10-10-10z" fill="#232751" fillOpacity="0.73" />
    </svg>
);

function FloatingSocialLinks({ isMobile }) {
    return (
        <div style={{
            position: "fixed",
            right: isMobile ? 11 : 28,
            bottom: isMobile ? 11 : 28,
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 9 : 15
        }}>
            <motion.a
                href="https://www.linkedin.com/in/yafiefarabi0710/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.76, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 370, damping: 16, delay: 0.18 }}
                whileHover={{ scale: [1, 1.08, 1], opacity: 0.88 }}
                style={{
                    borderRadius: "50%",
                    padding: 0,
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0 1.5px 9px rgba(0,0,0,0.15)"
                }}
                aria-label="LinkedIn"
            >
                <LinkedInIcon size={isMobile ? 30 : 38} />
            </motion.a>
            <motion.a
                href="https://github.com/jaeyunjks"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.76, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 352, damping: 16, delay: 0.24 }}
                whileHover={{ scale: [1, 1.08, 1], opacity: 0.86 }}
                style={{
                    borderRadius: "50%",
                    padding: 0,
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0 1.5px 9px rgba(0,0,0,0.15)"
                }}
                aria-label="GitHub"
            >
                <GithubIcon size={isMobile ? 30 : 38} />
            </motion.a>
        </div>
    );
}

export default function HomePage() {
    const isMobile = useIsMobile();
    const { theme } = useTheme();
    const heroTxt = "Hi, I'm Yafie, an aspiring Software Engineer & Business Analyst.";
    const animated = useLoopTyping(heroTxt, isMobile ? 27 : 40, 1700);
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: isMobile ? "80vh" : "90vh",
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "0 5vw",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 2,
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
                maxWidth: isMobile ? "90vw" : "800px",
                margin: "0 auto",
            }}>
                <h1 style={{
                    fontWeight: 900,
                    fontSize: isMobile ? 32 : 48,
                    color: "var(--accent)",
                    letterSpacing: -1.5,
                    lineHeight: 1.1,
                    margin: "0 0 1.6rem 0",
                    textShadow: theme === "dark" ? "0 4px 16px rgba(165,214,255,0.45)" : "0 4px 16px rgba(123,154,204,0.35)",
                    width: "100%",
                }}>
                    {animated}
                </h1>

                <p style={{
                    fontSize: isMobile ? 15 : 22,
                    color: "var(--text-primary)", // hitam di light mode, putih di dark
                    lineHeight: 1.6,
                    margin: "0 0 2rem 0",
                    width: "100%",
                    opacity: 0.95,
                }}>
                    Bachelor of Information Technology | Open for 2025&2026 Internship
                    <br />
                    <span style={{
                        fontSize: isMobile ? 13.5 : 18,
                        opacity: 0.85,
                        display: "block",
                        marginTop: "0.8rem",
                    }}>
                        Enterprise Software Development & Business Information System Management @UTS.
                    </span>
                </p>

                <button
                    onClick={() => navigate("/contact")}
                    style={{
                        background: "var(--accent)",
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: isMobile ? 15 : 19,
                        border: "none",
                        borderRadius: 28,
                        padding: isMobile ? "12px 32vw" : "16px 60px",
                        boxShadow: theme === "dark" ? "0 4px 24px rgba(165,214,255,0.35)" : "0 4px 24px rgba(123,154,204,0.3)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                    }}
                >
                    Contact Me
                </button>
            </div>

            <FloatingSocialLinks isMobile={isMobile} />
        </div>
    );
}