import React from "react";

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

const WORKS = [
    {
        role: "Houskeeping Team Lead and Supervisor",
        company: "Global Hospitality Solutions pty Ltd.",
        period: "Jan 2025 – Present",
        location: "Sydney, Australia",
        summary: "Managed a team of 20+ staff, coordinating schedules and workflows to ensure operational efficiency and high-quality service. Optimised processes and tracking systems, improving task completion accuracy by 25%. Leveraged problem-solving and communication skills to resolve operational challenges, demonstrating teamwork, leadership, and adaptability in an Australian workplace environment.",
        stack: [
            "Teamwork & Collaboration",
            "Problem-Solving & Critical Thinking",
            "Process Optimisation & Attention to Detail",
            "Communication & Stakeholder Management"
        ]
    }
];

export default function WorkPage() {
    const isMobile = useIsMobile();

    return (
        <div style={{
            maxWidth: isMobile ? "99vw" : 900,
            margin: isMobile ? "18px auto" : "52px auto",
            padding: isMobile ? "0 3vw" : "0 15px"
        }}>
            <h1 style={{
                fontWeight: 900,
                fontSize: isMobile ? 23 : 36,
                color: "#97a2b5ff",
                marginBottom: isMobile ? 15 : 26,
                textAlign: isMobile ? "center" : "left"
            }}>
                Work & Project Experience
            </h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 16 : 28
            }}>
                {WORKS.map(work => (
                    <div key={work.role + work.company} style={{
                        background: "#EDF2FB",
                        borderRadius: 14,
                        padding: isMobile ? 13 : 27,
                        boxShadow: "0 2px 14px #c0c7ef15",
                        marginBottom: isMobile ? 5 : 8
                    }}>
                        <div style={{
                            fontSize: isMobile ? 15.5 : 22,
                            fontWeight: 800,
                            color: "#232751"
                        }}>{work.role}</div>
                        <div style={{
                            fontSize: isMobile ? 13 : 18,
                            marginBottom: isMobile ? 4 : 6
                        }}>
                            <b>{work.company}</b> — <span style={{ color: "#7B9ACC", fontWeight: 600 }}>{work.period}</span>
                        </div>
                        <div style={{
                            color: "#6B7C8A",
                            fontSize: isMobile ? 10.5 : 15,
                            marginBottom: isMobile ? 5.5 : 8
                        }}>{work.location}</div>
                        <div style={{
                            fontSize: isMobile ? 13.5 : 17,
                            lineHeight: 1.6,
                            color: "#22253B",
                            marginBottom: isMobile ? 9 : 12
                        }}>{work.summary}</div>
                        <div style={{
                            display: "flex",
                            gap: isMobile ? 6 : 9,
                            flexWrap: "wrap"
                        }}>
                            {work.stack.map(s => (
                                <span key={s} style={{
                                    background: "#D0DEFA",
                                    color: "#232751",
                                    borderRadius: 11,
                                    padding: isMobile ? "4px 7vw" : "5px 15px",
                                    fontWeight: 700,
                                    fontSize: isMobile ? 11.2 : 15,
                                    marginBottom: isMobile ? 5 : 0
                                }}>{s}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
