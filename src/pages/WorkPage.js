import React from "react";

const WORKS = [
    {
        role: "Houskeeping Team Lead and Supervisor",
        company: "Global Hospitality Solutions pty Ltd.",
        period: "Jan 2025 – Present",
        location: "Sydney, Australia",
        summary: "Managed a team of 20+ staff, coordinating schedules and workflows to ensure operational efficiency and high-quality service. Optimised processes and tracking systems, improving task completion accuracy by 25%. Leveraged problem-solving and communication skills to resolve operational challenges, demonstrating teamwork, leadership, and adaptability in an Australian workplace environment.",
        stack: ["Teamwork & Collaboration", "Problem-Solving & Critical Thinking", "Process Optimisation & Attention to Detail", "Communication & Stakeholder Management"]
    }
];

export default function WorkPage() {
    return (
        <div style={{ maxWidth: 900, margin: "52px auto", padding: "0 15px" }}>
            <h1 style={{ fontWeight: 900, fontSize: 36, color: "#97a2b5ff", marginBottom: 26 }}>Work & Project Experience</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {WORKS.map(work => (
                    <div key={work.role + work.company} style={{
                        background: "#EDF2FB", borderRadius: 14, padding: 27,
                        boxShadow: "0 2px 14px #c0c7ef15", marginBottom: 8
                    }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#232751" }}>{work.role}</div>
                        <div style={{ fontSize: 18, marginBottom: 6 }}>
                            <b>{work.company}</b> — <span style={{ color: "#7B9ACC", fontWeight: 600 }}>{work.period}</span>
                        </div>
                        <div style={{ color: "#6B7C8A", fontSize: 15, marginBottom: 8 }}>{work.location}</div>
                        <div style={{ fontSize: 17, lineHeight: 1.6, color: "#22253B", marginBottom: 12 }}>{work.summary}</div>
                        <div style={{ display: "flex", gap: 9 }}>
                            {work.stack.map(s => (
                                <span key={s} style={{
                                    background: "#D0DEFA", color: "#232751", borderRadius: 11,
                                    padding: "5px 15px", fontWeight: 700, fontSize: 15
                                }}>{s}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
