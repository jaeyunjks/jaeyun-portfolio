import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

/* ────────────────────── DATA ────────────────────── */
const LANG_SKILLS = [
    { name: "Java", lvl: 2 },
    { name: "Python", lvl: 2 },
    { name: "HTML/CSS/JS", lvl: 2 },
    { name: "SQL", lvl: 1.5 },
    { name: "C++", lvl: 1 },
    { name: "Swift", lvl: 1 },
    { name: "TypeScript", lvl: 1 },
];

const FRAMEWORKS = [
    { name: "React", lvl: 0.5 },
    { name: "Django", lvl: 0.5 },
    { name: "Node.js", lvl: 0.5 },
    { name: "JSP", lvl: 1 },
    { name: "Spring Boot", lvl: 0.5 },
    { name: "Vue.js", lvl: 0.5 },
];

const DEVTOOLS = [
    { name: "Git", lvl: 2 },
    { name: "Jira", lvl: 1.5 },
    { name: "MySQL", lvl: 2 },
    { name: "MongoDB", lvl: 0.5 },
    { name: "VSCode", lvl: 2 },
    { name: "Figma", lvl: 1 },
    { name: "Docker", lvl: 0.5 },
    { name: "Postman", lvl: 1 },
];

const SECTION_TABS = [
    { key: "languages", label: "Languages" },
    { key: "frameworks", label: "Frameworks / Tech" },
    { key: "tools", label: "Dev Tools" },
];

/* ────────────────────── HOOKS ────────────────────── */
function useIsMobile(breakpoint = 640) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [breakpoint]);
    return isMobile;
}

/* ────────────────────── ANIMATED BAR ────────────────────── */
function AnimatedBar({ label, value, color, delay = 0 }) {
    const isMobile = useIsMobile();
    const [width, setWidth] = useState(0);
    const max = 2;

    useEffect(() => {
        const timer = setTimeout(() => setWidth((value / max) * 100), 150 + delay * 80);
        return () => clearTimeout(timer);
    }, [value, max, delay]);

    const display = value < 1 ? "less than a year" : `${value} yr${value > 1 ? "s" : ""}`;

    return (
        <div
            style={{
                background: "#E6EBF5",
                height: isMobile ? 36 : 40,
                borderRadius: 20,
                margin: isMobile ? "10px 0" : "8px 0",
                position: "relative",
                width: isMobile ? "92vw" : 340,
                maxWidth: isMobile ? "99vw" : 420,
                overflow: "hidden",
                boxShadow: "inset 0 1px 3px #00000012",
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: `${width}%`,
                    background: `linear-gradient(90deg, ${color}dd, ${color})`,
                    borderRadius: 20,
                    transition: "width 1s cubic-bezier(.34,1.06,.64,1)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: isMobile ? 16 : 18,
                    fontWeight: 700,
                    fontSize: isMobile ? 14.5 : 16,
                    color: width > 30 ? "#fff" : "#232751",
                    transition: "color .3s",
                }}
            >
                <span style={{ marginRight: 12 }}>{label}</span>
                <span style={{ marginLeft: "auto", marginRight: 16, fontSize: isMobile ? 13 : 14 }}>
                    {display}
                </span>
            </div>
        </div>
    );
}

/* ────────────────────── MAIN COMPONENT ────────────────────── */
export default function AboutPage() {
    const [section, setSection] = useState("languages");
    const isMobile = useIsMobile();
    const { theme } = useTheme();

    const dataMap = {
        languages: { list: LANG_SKILLS, colour: "#7B9ACC" },
        frameworks: { list: FRAMEWORKS, colour: "#6A8BD6" },
        tools: { list: DEVTOOLS, colour: "#5A7BC5" },
    };
    const { list, colour } = dataMap[section];

    return (
        <section
            style={{
                maxWidth: isMobile ? "97vw" : 780,
                margin: isMobile ? "40px auto" : "80px auto",
                padding: isMobile ? "0 5vw" : "0 20px",
                fontFamily: "'Segoe UI', Arial, sans-serif",
                color: "var(--text-primary)",
                minHeight: "calc(100vh - 80px)",
                boxSizing: "border-box",
            }}
        >
            <h1
                style={{
                    fontWeight: 900,
                    fontSize: isMobile ? 32 : 44,
                    background: "linear-gradient(90deg, var(--accent), var(--accent-hover))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: isMobile ? 24 : 36,
                    textAlign: isMobile ? "center" : "left",
                    textShadow: theme === "dark" ? "0 2px 12px rgba(165,214,255,0.35)" : "none",
                    letterSpacing: "-0.5px",
                }}
            >
                About Me
            </h1>

            <p
                style={{
                    fontSize: isMobile ? 16 : 18,
                    lineHeight: 1.7,
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    textAlign: isMobile ? "justify" : "left",
                    margin: isMobile ? "20px 0 32px" : "32px 0 44px",
                    textShadow: theme === "dark" ? "0 1px 6px rgba(0,0,0,0.7)" : "none",
                    opacity: theme === "dark" ? 0.98 : 0.95,
                }}
            >
                Software Development student passionate about <strong>front-end</strong> — crafting clean, interactive UI with
                <strong> HTML, CSS, JavaScript & React</strong>. <br /><br />
                Expanding into <strong>backend</strong> with <strong>Spring Boot</strong> and <strong>Vue.js</strong>, plus
                <strong> DevOps</strong> (Docker, CI/CD). <br /><br />
                Also exploring <strong>React Native</strong>, QA, and business analysis.
            </p>

            {/* Tabs & AnimatedBar tetap sama */}
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "center",
                    gap: isMobile ? 12 : 20,
                    margin: isMobile ? "28px 0" : "48px 0",
                }}
            >
                {SECTION_TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setSection(tab.key)}
                        style={{
                            flex: isMobile ? 1 : "none",
                            background: section === tab.key ? "linear-gradient(135deg, var(--accent), var(--accent-hover))" : "var(--bg-secondary)",
                            color: section === tab.key ? "#fff" : "var(--text-primary)",
                            fontWeight: 700,
                            fontSize: isMobile ? 15 : 17,
                            padding: isMobile ? "11px 20px" : "12px 32px",
                            border: "none",
                            borderRadius: 14,
                            boxShadow: section === tab.key ? "0 4px 16px var(--shadow)" : "0 1px 3px var(--shadow)",
                            transition: "all .22s ease",
                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            if (section !== tab.key) e.currentTarget.style.background = theme === "dark" ? "#2d3748" : "#E1E8F7";
                        }}
                        onMouseLeave={(e) => {
                            if (section !== tab.key) e.currentTarget.style.background = "var(--bg-secondary)";
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    minHeight: 300,
                    padding: isMobile ? "8px 0" : "12px 0",
                }}
            >
                {list.map((item, i) => (
                    <AnimatedBar
                        key={item.name}
                        label={item.name}
                        value={item.lvl}
                        color={colour}
                        delay={i}
                    />
                ))}
            </div>

            <p
                style={{
                    textAlign: "center",
                    marginTop: 32,
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                }}
            >
                * Experience measured in years of active use
            </p>
        </section>
    );
}