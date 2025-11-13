/* src/pages/WorkPage.js */
import React from "react";

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
   Data
------------------------------------------------- */
const WORKS = [
    {
        role: "Houskeeping Team Lead and Supervisor",
        company: "Global Hospitality Solutions pty Ltd.",
        period: "Jan 2025 – Present",
        location: "Sydney, Australia",
        summary:
            "Managed a team of 20+ staff, coordinating schedules and workflows to ensure operational efficiency and high-quality service. Optimised processes and tracking systems, improving task completion accuracy by 25%. Leveraged problem-solving and communication skills to resolve operational challenges, demonstrating teamwork, leadership, and adaptability in an Australian workplace environment.",
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
    }
];

/* -------------------------------------------------
   Skill Pill – hover (desktop) / tap (mobile)
------------------------------------------------- */
function SkillPill({ skill, isMobile }) {
    const [show, setShow] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);

    // Close on outside tap (mobile)
    React.useEffect(() => {
        if (!isMobile || !show) return;
        const handleOutside = (e) => {
            if (!e.target.closest(".skill-popup") && !e.target.closest(".skill-pill")) {
                setShow(false);
            }
        };
        document.addEventListener("click", handleOutside);
        return () => document.removeEventListener("click", handleOutside);
    }, [show, isMobile]);

    const toggle = (e) => {
        e.stopPropagation();
        if (isMobile) setShow((v) => !v);
    };

    return (
        <div style={{ position: "relative", marginBottom: isMobile ? 8 : 0 }}>
            {/* Pill */}
            <span
                className="skill-pill"
                onMouseEnter={() => !isMobile && setHovered(true)}
                onMouseLeave={() => !isMobile && setHovered(false)}
                onClick={toggle}
                style={{
                    background: hovered || (isMobile && show) ? "#A7C1F2" : "#D0DEFA",
                    color: "#232751",
                    borderRadius: 12,
                    padding: isMobile ? "6px 8vw" : "6px 16px",
                    fontWeight: 700,
                    fontSize: isMobile ? 12 : 15,
                    cursor: "pointer",
                    display: "inline-block",
                    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                    transform: hovered || (isMobile && show) ? "scale(1.08)" : "scale(1)",
                    boxShadow:
                        hovered || (isMobile && show)
                            ? "0 4px 12px rgba(0,0,0,0.15)"
                            : "0 1px 3px rgba(0,0,0,0.08)",
                    userSelect: "none"
                }}
            >
                {skill.name}
            </span>

            {/* Popup – ONE title per section */}
            {(isMobile ? show : hovered) && (
                <div
                    className="skill-popup"
                    style={{
                        position: isMobile ? "fixed" : "absolute",
                        top: isMobile ? "50%" : "110%",
                        left: isMobile ? "50%" : "50%",
                        transform: isMobile
                            ? "translate(-50%, -50%)"
                            : "translateX(-50%) translateY(-8px) scale(0.94)",
                        width: isMobile ? "92vw" : 370,
                        maxHeight: isMobile ? "80vh" : "auto",
                        overflowY: "auto",
                        background: "rgba(255,255,255,0.94)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        borderRadius: 16,
                        padding: isMobile ? 16 : 18,
                        boxShadow:
                            "0 16px 40px rgba(0,0,0,0.2), inset 0 0 16px rgba(255,255,255,0.5)",
                        border: "1px solid rgba(255,255,255,0.35)",
                        zIndex: 100,
                        fontSize: isMobile ? 13 : 14.5,
                        color: "#1a1a2e",
                        lineHeight: 1.6,
                        animation: "popupEnter 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards"
                    }}
                >
                    {/* Sections – ONLY ONE TITLE */}
                    {[
                        { title: "What I did", text: skill.what },
                        { title: "Achievements", text: skill.achieve },
                        { title: "Transferable IT", text: skill.it }
                    ].map((sec, i) => (
                        <div key={i} style={{ marginTop: i ? 14 : 0 }}>
                            <div
                                style={{
                                    fontWeight: 600,
                                    color: "#7B9ACC",
                                    fontSize: isMobile ? 13 : 14,
                                    marginBottom: 4
                                }}
                            >
                                {sec.title}
                            </div>
                            <div style={{ color: "#222", lineHeight: 1.5 }}>{sec.text}</div>
                        </div>
                    ))}

                    {/* Close button (mobile only) */}
                    {isMobile && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShow(false);
                            }}
                            style={{
                                marginTop: 18,
                                width: "100%",
                                padding: "10px",
                                background: "#7B9ACC",
                                color: "white",
                                border: "none",
                                borderRadius: 10,
                                fontWeight: 600,
                                cursor: "pointer",
                                fontSize: 15
                            }}
                        >
                            Close
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

/* -------------------------------------------------
   Work Card
------------------------------------------------- */
function WorkCard({ work, isMobile }) {
    const [visible, setVisible] = React.useState(false);
    const [cardHover, setCardHover] = React.useState(false);

    React.useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            onMouseEnter={() => !isMobile && setCardHover(true)}
            onMouseLeave={() => !isMobile && setCardHover(false)}
            style={{
                background: "#EDF2FB",
                borderRadius: 16,
                padding: isMobile ? 16 : 30,
                boxShadow: "0 2px 14px #c0c7ef15",
                marginBottom: isMobile ? 8 : 12,
                transition: "transform 0.3s ease, opacity 0.5s ease",
                transform: cardHover ? "scale(1.025)" : "scale(1)",
                opacity: visible ? 1 : 0,
                position: "relative"
            }}
        >
            <div style={{ fontSize: isMobile ? 16.5 : 24, fontWeight: 800, color: "#232751" }}>
                {work.role}
            </div>
            <div style={{ fontSize: isMobile ? 14 : 19.5, marginBottom: isMobile ? 5 : 7 }}>
                <b>{work.company}</b> —{" "}
                <span style={{ color: "#7B9ACC", fontWeight: 600 }}>{work.period}</span>
            </div>
            <div
                style={{
                    color: "#6B7C8A",
                    fontSize: isMobile ? 11.5 : 16,
                    marginBottom: isMobile ? 7 : 10
                }}
            >
                {work.location}
            </div>

            <div
                style={{
                    fontSize: isMobile ? 14 : 18,
                    lineHeight: 1.65,
                    color: "#22253B",
                    marginBottom: isMobile ? 12 : 15
                }}
            >
                {work.summary}
            </div>

            <div style={{ display: "flex", gap: isMobile ? 8 : 11, flexWrap: "wrap" }}>
                {work.stack.map((s) => (
                    <SkillPill key={s.name} skill={s} isMobile={isMobile} />
                ))}
            </div>
        </div>
    );
}

/* -------------------------------------------------
   Page
------------------------------------------------- */
export default function WorkPage() {
    const isMobile = useIsMobile();

    return (
        <div
            style={{
                maxWidth: isMobile ? "99vw" : 900,
                margin: isMobile ? "20px auto" : "56px auto",
                padding: isMobile ? "0 4vw" : "0 15px"
            }}
        >
            <h1
                style={{
                    fontWeight: 900,
                    fontSize: isMobile ? 25 : 40,
                    color: "#97a2b5ff",
                    marginBottom: isMobile ? 18 : 30,
                    textAlign: isMobile ? "center" : "left"
                }}
            >
                Work & Project Experience
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 32 }}>
                {WORKS.map((work) => (
                    <WorkCard key={work.role + work.company} work={work} isMobile={isMobile} />
                ))}
            </div>

            {/* Animation */}
            <style jsx>{`
        @keyframes popupEnter {
          to {
            opacity: 1;
            transform: ${isMobile
                    ? "translate(-50%, -50%)"
                    : "translateX(-50%) translateY(0) scale(1)"};
          }
        }
      `}</style>
        </div>
    );
}