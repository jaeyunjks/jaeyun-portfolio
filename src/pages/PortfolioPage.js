import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

// Responsive hook
function useIsMobile(breakpoint = 600) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" && window.innerWidth < breakpoint
    );

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
}
const PROJECTS = [
    {
        id: 5,
        title: "Event Management System - Software Architecture",
        tech: ["C4 Model", "Microservices", "Event-Driven"],
        img: "/software architecture.png",
        summary: "Proposed a scalable Event Management & Ticketing Platform with customisable event pages, dynamic pricing, real-time ticketing, secure payments, social media integration, and post-event analytics. Designed using cloud-native microservices to achieve 10K TPS, 99.9% uptime, and 40% cost efficiency.",
        details: (
            <>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Why I Did This?</div>
                <div>
                    The goal of this project was to demonstrate industry-standard practices by:
                    Defining context, stakeholders, risks, and quality attributes. Proposing a scalable, cloud-native microservices architecture. Justifying decisions across system qualities, data management, security, cloud adoption, and optional AI/ML & IoT. Delivering iterative progress via weekly peer reviews.
                </div>
                <div style={{ marginTop: 16 }}>
                    <Link
                        to="/event-management-case-study"
                        style={{
                            background: "#7B9ACC",
                            color: "#fff",
                            borderRadius: 10,
                            fontWeight: 700,
                            padding: "9px 18px",
                            textDecoration: "none",
                            display: "inline-block",
                            fontSize: 14
                        }}
                    >
                        View Project
                    </Link>
                </div>
            </>
        )
    },
    {
        id: 6,
        title: "E2E Automation & Test Quality System",
        tech: ["Risk-Based Testing", "Selenium", "TestCafe"],
        img: "/EST.png",
        summary: "Automated 9 critical user flows with 88.89% pass rate. Built full test quality system with planning, execution, and reporting.",
        details: (
            <>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Project Overview</div>
                <div style={{ lineHeight: 1.7 }}>
                    • Designed <strong>E2E test processes</strong> for Poco Mega Store using Gantt planning (C.1)<br />
                    • Applied <strong>quality management principles</strong>: traceability, risk-based execution (D.1)<br />
                    • Executed <strong>9 functional tests</strong> with Selenium & TestCafe (D.1)<br />
                    • Built full <strong>test quality system</strong>: planning, automation, reporting (E.1)<br />
                    • Achieved <strong>88.89% pass rate</strong> — found 1 critical failure
                </div>
                <div style={{ marginTop: 16 }}>
                    <Link
                        to="/stqm-case-study"
                        style={{
                            background: "#7B9ACC",
                            color: "#fff",
                            borderRadius: 10,
                            fontWeight: 700,
                            padding: "9px 18px",
                            textDecoration: "none",
                            display: "inline-block",
                            fontSize: 14
                        }}
                    >
                        View My Work
                    </Link>
                </div>
            </>
        )
    },
    {
        id: 2,
        title: "Stand-Smart - Interaction Design Project",
        tech: ["Figma", "UX Research", "Web"],
        img: "/ixd.png",
        summary: "UX task manager: research, persona, prototyping, usability, report. Click for project story!",
        details: (
            <>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Why I Did This?</div>
                <div>
                    This project is aimed to solve real user pain points in daily task management. Explored full HCI process: found problems, built personas, ideated, tested, refined solutions.
                </div>
                <div style={{ marginTop: 16 }}>
                    <Link
                        to="/interaction-design-case"
                        style={{
                            background: "#7B9ACC",
                            color: "#fff",
                            borderRadius: 10,
                            fontWeight: 700,
                            padding: "9px 18px",
                            textDecoration: "none",
                            display: "inline-block",
                            fontSize: 14
                        }}
                    >
                        View Full Case
                    </Link>
                </div>
            </>
        )
    }, {
        id: 3,
        title: "Final Room Checklist",
        tech: ["Next.js 16", "TypeScript", "Tailwind v4", "Zustand", "ShadCN/UI", "PWA"],
        img: "/old-city-view.png",
        summary: "Luxury mobile web app for 5-star hotel supervisors to complete final room inspection in under 45 seconds — no paper, no backend, fully offline.",
        details: (
            <>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Project Overview</div>
                <div style={{ lineHeight: 1.7 }}>
                    • Built a beautiful glassmorphism PWA with one-tap checklist (Bathroom • Bedroom • Mini Bar)<br />
                    • Persistent notes field + auto-save via Zustand & LocalStorage<br />
                    • Instant navigation, fully offline, installable on iOS/Android<br />
                    • Deployed as static site on Vercel — zero server cost<br />
                    • Feels like a real native luxury hotel app
                </div>
                <div style={{ marginTop: 16 }}>
                    <a
                        href="https://supervisor-checklist.vercel.app"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            background: "#7B9ACC",
                            color: "#fff",
                            borderRadius: 10,
                            fontWeight: 700,
                            padding: "9px 18px",
                            textDecoration: "none",
                            display: "inline-block",
                            fontSize: 14
                        }}
                    >
                        View My Work
                    </a>
                </div>
            </>
        )
    }, {
        id: 3,
        title: "Lume - Productivity App",
        tech: ["JavaScript"],
        img: "/Lume.png",
        summary: "Lume is a minimalist, offline-first productivity dashboard built with React and Tailwind CSS. It combines a clean Kanban board, customisable Pomodoro focus sessions with time tracking, daily task planning, calendar-based progress insights with streak visualisation, and a private daily reflection journal — all stored securely in the browser via localStorage. Designed for calm, intentional focus.",
        details: "Lume is a local-only productivity tool for focused work and mindful reflection. Built with React, Tailwind CSS, React Router, Recharts, and react-calendar, it runs 100% offline with full data persistence in the browser — no account, no tracking, no server.",
        github: "https://github.com/jaeyunjks/productive-app.git"
    }, {
        id: 3,
        title: "Productivity Dashboard",
        tech: ["Swift", "SwiftUI"],
        img: "/swift.png",
        summary: "Productivity iOS app with task management, Pomodoro timer, habit tracking, Affirmations,etc. [COMING SOON]",
        details: "User can view positive affirmations to help make major shifts in their mindset and serve as prompts and daily reminders to ensure every day is an amazing day.",
        github: "https://github.com/jaeyunjks/ProductivityDashboard"
    },
    {
        id: 3,
        title: "DSA Directed Graph",
        tech: ["C++", "Graph Theory", "Algorithms", "OOP"],
        img: "/DSA.png",
        summary: "C++ implementation for directed graph data structure, supporting core operations and traversal algorithms.",
        details: "A command-line program written in C++ for creating and manipulating directed graphs. Supports adding vertices and edges, displaying adjacency lists, and performing BFS & DFS traversals. Built using STL containers for efficient storage and modular design patterns.",
        github: "https://github.com/jaeyunjks/Directed_Graph"
    }, {
        id: 4,
        title: "Random Meal Generator (In Progress)",
        tech: ["React, JavaScript"],
        img: "/food.png",
        summary: "in progress..",
        details: "in progress..",
        github: "https://github.com/jaeyunjks/random-meal-generator"
    },
    {
        id: 1,
        title: "IoTBay - IoT Devices Ordering",
        tech: ["Java", "JSP", "MVC", "MySQL"],
        img: "/iotbay.png",
        summary: "E-commerce webapp for IoT devices. Full shipment management CRUD, secure backend, Agile team.",
        details: "IoTBay lets customers browse, order, and track IoT devices like sensors/actuators. Implemented key shipment module, login system, and optimized data retrieval.",
        github: "https://github.com/jaeyunjks/IOTBay.git"
    },
];

export default function PortfolioPage() {
    const [expanded, setExpanded] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);
    const isMobile = useIsMobile();
    const { theme } = useTheme();

    const isDark = theme === "dark";

    return (
        <div style={{
            maxWidth: isMobile ? "99vw" : 900,
            margin: isMobile ? "16px auto" : "52px auto",
            padding: isMobile ? "0 3vw" : "0 18px",
            color: "var(--text-primary)",
        }}>
            {/* Title */}
            <h1 style={{
                fontWeight: 900,
                fontSize: isMobile ? 24 : 38,
                color: isDark ? "var(--accent)" : "#7B9ACC",
                marginBottom: isMobile ? 16 : 32,
                textAlign: isMobile ? "center" : "left",
                textShadow: isDark ? "0 2px 12px rgba(165,214,255,0.35)" : "none",
                opacity: 0,
                animation: "fadeInDown 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}>
                My Projects
            </h1>

            {/* Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? 16 : 36,
            }}>
                {PROJECTS.map((p, index) => {
                    const isExpanded = expanded === p.id;
                    const isHovered = hoveredId === p.id;

                    return (
                        <div
                            key={p.id}
                            onMouseEnter={() => !isMobile && setHoveredId(p.id)}
                            onMouseLeave={() => !isMobile && setHoveredId(null)}
                            onClick={() => setExpanded(isExpanded ? null : p.id)}
                            style={{
                                background: isDark
                                    ? "rgba(30, 41, 59, 0.45)"  // glassy dark
                                    : "#EDF2FB",
                                backdropFilter: isDark ? "blur(16px)" : "none",
                                WebkitBackdropFilter: isDark ? "blur(16px)" : "none",
                                borderRadius: 24,
                                overflow: "hidden",
                                boxShadow: isHovered || isExpanded
                                    ? isDark
                                        ? "0 16px 48px rgba(0,0,0,0.5), inset 0 0 24px rgba(165,214,255,0.12)"
                                        : "0 16px 36px rgba(123,154,204,0.24)"
                                    : isDark
                                        ? "0 8px 32px rgba(0,0,0,0.4)"
                                        : "0 4px 18px #c0c7ef18",
                                cursor: "pointer",
                                border: isExpanded
                                    ? isDark ? "1px solid rgba(165,214,255,0.3)" : "3px solid #7B9ACC"
                                    : isDark ? "1px solid rgba(165,214,255,0.18)" : "1.5px solid #e3e8f2",
                                transition: "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                transform: (isHovered || isExpanded) && !isMobile
                                    ? "translateY(-8px) scale(1.03)"
                                    : "translateY(0) scale(1)",
                                opacity: 0,
                                animation: `fadeInUp 0.6s ease-out ${index * 0.12}s forwards`,
                            }}
                        >
                            {/* Image */}
                            <div style={{
                                position: "relative",
                                overflow: "hidden",
                            }}>
                                <img
                                    src={p.img}
                                    alt={p.title}
                                    style={{
                                        width: "100%",
                                        height: isMobile ? 140 : 200,
                                        objectFit: "cover",
                                        transition: "transform 0.5s ease",
                                        transform: (isHovered || isExpanded) && !isMobile ? "scale(1.08)" : "scale(1)",
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div style={{
                                padding: isMobile ? "16px 14px" : "24px 22px",
                            }}>
                                <div style={{
                                    fontWeight: 700,
                                    fontSize: isMobile ? 16 : 23,
                                    marginBottom: 8,
                                    color: isDark ? "var(--accent)" : "#232751",
                                    lineHeight: 1.3,
                                }}>
                                    {p.title}
                                </div>

                                {/* Tech Badges */}
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: isMobile ? 8 : 10,
                                    marginBottom: 12,
                                }}>
                                    {p.tech?.map((t, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                background: isDark ? "rgba(165,214,255,0.18)" : "#D0DEFA",
                                                color: isDark ? "#e2e8f0" : "#232751",
                                                fontSize: isMobile ? 11 : 13.5,
                                                fontWeight: 600,
                                                padding: isMobile ? "5px 10px" : "6px 14px",
                                                borderRadius: 12,
                                                transition: "all 0.3s ease",
                                                transform: (isHovered || isExpanded) && !isMobile ? "scale(1.1)" : "scale(1)",
                                                boxShadow: (isHovered || isExpanded) && !isMobile
                                                    ? isDark ? "0 3px 10px rgba(165,214,255,0.3)" : "0 3px 8px rgba(0,0,0,0.12)"
                                                    : "none",
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div style={{
                                    fontSize: isMobile ? 13 : 15.5,
                                    color: isDark ? "var(--text-primary)" : "#2d3748",
                                    opacity: 0.9,
                                    lineHeight: 1.6,
                                    marginBottom: 8,
                                }}>
                                    {p.summary}
                                </div>

                                <div style={{
                                    fontSize: isMobile ? 11 : 13.5,
                                    color: isDark ? "var(--text-secondary)" : "#5a67d8",
                                    fontStyle: "italic",
                                    opacity: 0.8,
                                    marginBottom: 4,
                                }}>
                                    Click for details
                                </div>
                            </div>

                            {/* Expandable Panel – glassy juga di dark */}
                            <div style={{
                                maxHeight: isExpanded ? "1200px" : "0",
                                opacity: isExpanded ? 1 : 0,
                                overflow: "hidden",
                                transition: "max-height 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease",
                                background: isDark ? "rgba(30, 41, 59, 0.5)" : "rgba(250, 252, 255, 0.95)",
                                backdropFilter: isDark ? "blur(12px)" : "blur(10px)",
                                WebkitBackdropFilter: isDark ? "blur(12px)" : "blur(10px)",
                                borderTop: isExpanded ? (isDark ? "1px solid rgba(165,214,255,0.2)" : "1px solid rgba(123,154,204,0.2)") : "none",
                                padding: isExpanded ? (isMobile ? "16px 14px" : "24px 22px") : "0 14px",
                            }}>
                                <div style={{
                                    fontSize: isMobile ? 13.5 : 15.5,
                                    color: isDark ? "var(--text-primary)" : "#1a202c",
                                    lineHeight: 1.7,
                                }}>
                                    {typeof p.details === "string" ? p.details : p.details}
                                </div>

                                {/* Buttons */}
                                <div style={{
                                    display: "flex",
                                    gap: 12,
                                    marginTop: 20,
                                    flexWrap: "wrap",
                                }}>
                                    {p.github && (
                                        <a
                                            href={p.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                background: "var(--accent)",
                                                color: "#fff",
                                                borderRadius: 12,
                                                textDecoration: "none",
                                                fontWeight: 700,
                                                padding: isMobile ? "10px 16px" : "12px 22px",
                                                fontSize: isMobile ? 13 : 15,
                                                transition: "all 0.3s ease",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = "translateY(-3px)";
                                                e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = "translateY(0)";
                                                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                                            }}
                                        >
                                            View Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Animations */}
            <style jsx>{`
        @keyframes fadeInDown {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}