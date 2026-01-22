/* src/pages/WorkPage.js */
import React from "react";
import { useTheme } from "../context/ThemeContext";

/* -------------------------------------------------
   Mobile detection hook
------------------------------------------------- */
function useIsMobile(breakpoint = 600) {
    const [isMobile, setIsMobile] = React.useState(
        typeof window !== "undefined" && window.innerWidth < breakpoint
    );

    React.useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [breakpoint]);

    return isMobile;
}
/* -------------------------------------------------
   Data – 100% UTUH
------------------------------------------------- */
const WORKS = [
    {
        role: "Supervisor",
        company: "Global Hospitality Solutions pty Ltd.",
        period: "Jan 2025 – Oct 2025",
        location: "Sydney, Australia",
        summary:
            "Managed a housekeeping team of 20+ staff, coordinating workflows to ensure operational efficiency and high-quality service. Optimised processes and tracking systems, improving task completion accuracy by 25%. Leveraged problem-solving and communication skills to resolve operational challenges, demonstrating teamwork, leadership, and adaptability in an Australian workplace environment.",
        stack: [
            {
                name: "Teamwork, Resilience, and Collaboration",
                what: "Coordinated with a diverse team of 20+ staff members to manage daily schedules, workflows, and task assignments in a fast-paced hospitality environment.",
                achieve: "Fostered a collaborative atmosphere that led to seamless operations and a 25% improvement in overall task completion accuracy.",
                it: "Agile development, code reviews, cross-functional collaboration."
            },
            {
                name: "Problem-Solving & Critical Thinking",
                what: "Identified and resolved operational challenges, such as workflow bottlenecks and resource allocation issues, through analytical thinking and quick decision-making.",
                achieve: "Implemented solutions that optimised processes, resulting in a 25% increase in task accuracy and reduced downtime.",
                it: "Debugging, troubleshooting, algorithm design."
            },
            {
                name: "Process Optimisation & Attention to Detail",
                what: "Analysed existing processes, identifying inefficiencies and implementing detailed improvements.",
                achieve: "Achieved a 25% improvement in task completion rates.",
                it: "Code optimisation, database tuning, QA testing."
            },
            {
                name: "Communication & Stakeholder Management",
                what: "Facilitated clear communication between team members and stakeholders in a multicultural Australian workplace.",
                achieve: "Maintained high service quality and resolved conflicts effectively.",
                it: "Requirement gathering, documentation, client meetings."
            }
        ]
    },
    {
        role: "Team Leader Assistant Manager",
        company: "Global Hospitality Solutions, The Grand National Hotel by Saint Peter.",
        period: "Oct 2025 – Present",
        location: "Sydney, Australia",
        summary:
            "Oversaw daily hotel operations across Housekeeping and Security, ensuring smooth workflows, consistent luxury brand standards, and efficient service delivery. Managed staffing using the Preno SaaS occupancy system, coordinated cross-functional teams, and provided daily operational reporting to Hotel Management. Performed room inspections, minibar stock control, operational control, and property care. Demonstrated leadership, systems thinking, and process optimisation, transferable to IT and software development environments.",
        stack: [
            {
                name: "Operational Leadership & Team Coordination",
                what: "Managed day-to-day operations across Housekeeping, aligning staff schedules with occupancy forecasts using Preno and ensuring consistent delivery of luxury hotel standards.",
                achieve: "Enhanced workflow consistency and improved service reliability by coordinating a diverse team and establishing structured operational routines.",
                it: "Project coordination, sprint planning, cross-functional collaboration."
            },
            {
                name: "Process Optimisation & Systems Thinking",
                what: "Analysed and improved operational processes, including housekeeping workflows, minibar stock routines, and property care procedures.",
                achieve: "Reduced service delays and increased operational efficiency by implementing clearer processes and standardised task flows.",
                it: "Process mapping, optimisation, requirement analysis, QA mindset."
            },
            {
                name: "Data-Driven Decision Making",
                what: "Used Preno SaaS occupancy data and daily reporting to forecast staffing needs, allocate resources, and manage workload distribution.",
                achieve: "Improved staff productivity and operational accuracy by basing daily decisions on real-time occupancy and performance data.",
                it: "Using dashboards, interpreting data, monitoring system performance."
            },
            {
                name: "Communication, Reporting & Stakeholder Management",
                what: "Communicated operational issues to Hotel Management, maintained reporting standards, and ensured all teams followed brand-level guidelines.",
                achieve: "Maintained high service quality through clear communication, timely issue resolution, and effective stakeholder alignment.",
                it: "Documentation, requirement gathering, stakeholder communication."
            },
            {
                name: "Quality Assurance & Attention to Detail",
                what: "Performed room inspections, minibar checks, and luxury-standard turndown service while ensuring full compliance with property and brand expectations.",
                achieve: "Delivered consistent high-quality guest experience through rigorous inspection and meticulous attention to detail.",
                it: "Testing, code review accuracy, maintaining quality standards."
            }
        ]
    }
];
function SkillPill({ skill, isMobile }) {
    const [showPopup, setShowPopup] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const { theme } = useTheme();

    // Desktop: hover hanya untuk visual cue (ga buka popup)
    const handleMouseEnter = () => !isMobile && setIsHovered(true);
    const handleMouseLeave = () => !isMobile && setIsHovered(false);

    // Klik untuk toggle popup (semua device)
    const handleClick = (e) => {
        e.stopPropagation();
        setShowPopup(prev => !prev);
    };

    // Tutup popup kalau klik di luar
    React.useEffect(() => {
        if (!showPopup) return;

        const handleClickOutside = (e) => {
            if (!e.target.closest(".skill-popup") && !e.target.closest(".skill-pill")) {
                setShowPopup(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showPopup]);

    return (
        <div style={{ position: "relative", marginBottom: isMobile ? 8 : 0 }}>
            {/* Pill dengan animasi hover */}
            <span
                className="skill-pill"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                style={{
                    background: theme === "dark"
                        ? (showPopup ? "rgba(165,214,255,0.28)" : (isHovered ? "rgba(165,214,255,0.22)" : "rgba(165,214,255,0.12)"))
                        : (showPopup ? "#A7C1F2" : (isHovered ? "#B3D0FF" : "#D0DEFA")),
                    color: theme === "dark" ? "#e2e8f0" : "#232751",
                    borderRadius: 12,
                    padding: isMobile ? "6px 8vw" : "6px 16px",
                    fontWeight: 700,
                    fontSize: isMobile ? 12 : 15,
                    cursor: "pointer",
                    display: "inline-block",
                    transition: "all 0.25s ease",
                    transform: showPopup || isHovered ? "scale(1.08)" : "scale(1)",
                    boxShadow: showPopup || isHovered
                        ? theme === "dark" ? "0 6px 24px rgba(165,214,255,0.35), 0 0 0 3px rgba(165,214,255,0.15)" : "0 4px 12px rgba(0,0,0,0.15), 0 0 0 3px rgba(123,154,204,0.2)"
                        : "0 1px 3px rgba(0,0,0,0.08)",
                    userSelect: "none",
                    pointerEvents: "auto",
                    backdropFilter: theme === "dark" ? "blur(6px)" : "none",
                    position: "relative",
                    overflow: "hidden", // untuk ripple effect
                }}
            >
                {/* Ripple/glow effect pas hover */}
                <span
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "inherit",
                        background: theme === "dark"
                            ? "radial-gradient(circle at 50% 50%, rgba(165,214,255,0.15) 0%, transparent 70%)"
                            : "radial-gradient(circle at 50% 50%, rgba(123,154,204,0.2) 0%, transparent 70%)",
                        opacity: isHovered || showPopup ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                    }}
                />

                {skill.name}
            </span>

            {/* Popup */}
            {showPopup && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: "none",
                        zIndex: 9999,
                    }}
                >
                    <div
                        className="skill-popup"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: isMobile ? "92vw" : 420,
                            maxHeight: "80vh",
                            overflowY: "auto",
                            background: theme === "dark"
                                ? "rgba(30, 41, 59, 0.68)"
                                : "rgba(255,255,255,0.96)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            borderRadius: 24,
                            padding: isMobile ? 24 : 28,
                            boxShadow: theme === "dark"
                                ? "0 24px 70px rgba(0,0,0,0.65), inset 0 0 30px rgba(255,255,255,0.1)"
                                : "0 20px 50px rgba(0,0,0,0.25), inset 0 0 20px rgba(255,255,255,0.6)",
                            border: theme === "dark"
                                ? "1px solid rgba(165,214,255,0.3)"
                                : "1px solid rgba(255,255,255,0.4)",
                            pointerEvents: "all",
                            fontSize: isMobile ? 14 : 15.5,
                            color: theme === "dark" ? "#f8fafc" : "#1a1a2e",
                            lineHeight: 1.7,
                            animation: "popupEnter 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
                        }}
                    >
                        {[
                            { title: "What I did", text: skill.what },
                            { title: "Achievements", text: skill.achieve },
                            { title: "Transferable IT", text: skill.it }
                        ].map((sec, i) => (
                            <div key={i} style={{ marginTop: i ? 20 : 0 }}>
                                <div style={{ fontWeight: 700, color: "var(--accent)", fontSize: isMobile ? 15 : 16.5, marginBottom: 8 }}>
                                    {sec.title}
                                </div>
                                <div style={{ color: theme === "dark" ? "#e2e8f0" : "#222", lineHeight: 1.6 }}>
                                    {sec.text}
                                </div>
                            </div>
                        ))}

                        {isMobile && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowPopup(false); }}
                                style={{
                                    marginTop: 28,
                                    width: "100%",
                                    padding: "14px",
                                    background: "var(--accent)",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: 14,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    fontSize: 16,
                                    boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
                                }}
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
/* -------------------------------------------------
   Work Card – 100% SAMA
------------------------------------------------- */
function WorkCard({ work, isMobile }) {
    const [visible, setVisible] = React.useState(false);
    const [cardHover, setCardHover] = React.useState(false);
    const { theme } = useTheme();

    React.useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            onMouseEnter={() => !isMobile && setCardHover(true)}
            onMouseLeave={() => !isMobile && setCardHover(false)}
            style={{
                background: theme === "dark"
                    ? "rgba(30, 41, 59, 0.35)"  // lebih transparan
                    : "#EDF2FB",
                backdropFilter: theme === "dark" ? "blur(20px)" : "none",
                WebkitBackdropFilter: theme === "dark" ? "blur(20px)" : "none",
                borderRadius: 24,
                padding: isMobile ? 24 : 36,
                border: theme === "dark" ? "1px solid rgba(165, 214, 255, 0.22)" : "none",
                boxShadow: theme === "dark"
                    ? "0 12px 40px rgba(0, 0, 0, 0.45), inset 0 0 24px rgba(165, 214, 255, 0.12)"
                    : "0 4px 20px rgba(0,0,0,0.1)",
                marginBottom: isMobile ? 16 : 24,
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, opacity 0.5s ease",
                transform: cardHover ? "scale(1.03)" : "scale(1)",
                opacity: visible ? 1 : 0,
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div style={{ fontSize: isMobile ? 18 : 26, fontWeight: 900, color: "var(--text-primary)" }}>
                {work.role}
            </div>
            <div style={{ fontSize: isMobile ? 15 : 21, marginBottom: isMobile ? 6 : 8, color: "var(--accent)", fontWeight: 700 }}>
                {work.company} — <span style={{ color: "var(--text-secondary)" }}>{work.period}</span>
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: isMobile ? 12.5 : 17, marginBottom: isMobile ? 8 : 12 }}>
                {work.location}
            </div>

            <div style={{ fontSize: isMobile ? 15 : 18, lineHeight: 1.7, color: "var(--text-primary)", marginBottom: isMobile ? 14 : 18 }}>
                {work.summary}
            </div>

            <div style={{ display: "flex", gap: isMobile ? 10 : 14, flexWrap: "wrap" }}>
                {work.stack.map((s) => (
                    <SkillPill key={s.name} skill={s} isMobile={isMobile} />
                ))}
            </div>
        </div>
    );
}
/* -------------------------------------------------
   Page – 100% SAMA
------------------------------------------------- */
export default function WorkPage() {
    const isMobile = useIsMobile();
    const { theme } = useTheme();

    return (
        <div style={{
            maxWidth: isMobile ? "99vw" : 900,
            margin: isMobile ? "20px auto" : "56px auto",
            padding: isMobile ? "0 4vw" : "0 15px",
            color: "var(--text-primary)",
        }}>
            <h1 style={{
                fontWeight: 900,
                fontSize: isMobile ? 28 : 44,
                color: theme === "dark" ? "var(--accent)" : "#97a2b5ff",
                marginBottom: isMobile ? 20 : 36,
                textAlign: isMobile ? "center" : "left",
                textShadow: theme === "dark" ? "0 2px 12px rgba(165,214,255,0.35)" : "none",
            }}>
                Work & Project Experience
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 24 : 36 }}>
                {WORKS.map((work) => (
                    <WorkCard key={work.role + work.company} work={work} isMobile={isMobile} />
                ))}
            </div>
        </div>
    );
}