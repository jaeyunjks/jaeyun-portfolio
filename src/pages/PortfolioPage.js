import React, { useState } from "react";
import { Link } from "react-router-dom";

// Responsive device hook
function useIsMobile(breakpoint = 600) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
    React.useEffect(() => {
        function handleResize() { setIsMobile(window.innerWidth < breakpoint); }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);
    return isMobile;
}

const PROJECTS = [
    {
        id: 5,
        title: "Software Architecture - Event Management System",
        tech: ["C4 Model", "Microservices", "Event-Driven"],
        img: "/software architecture.png",
        summary: "Proposed a scalable Event Management & Ticketing Platform with customizable event pages, dynamic pricing, real-time ticketing, secure payments, social media integration, and post-event analytics. Designed using cloud-native microservices to achieve 10K TPS, 99.9% uptime, and 40% cost efficiency.",
        details: (
            <>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Why I Did This?</div>
                <div>
                    The goal of this project was to demonstrate industry-standard practices by:
                    Defining context, stakeholders, risks, and quality attributes. Proposing a scalable, cloud-native microservices architecture. Justifying decisions across system qualities, data management, security, cloud adoption, and optional AI/ML & IoT. Delivering iterative progress via weekly peer reviews
                </div>.
                <div style={{ margin: "20px 0 10px" }}>
                    <Link
                        to="/event-management-case-study"
                        style={{
                            background: "#7B9ACC",
                            color: "#fff",
                            borderRadius: 9,
                            fontWeight: 700,
                            padding: "8px 15px",
                            textDecoration: "none"
                        }}
                    >
                        View Project
                    </Link>
                </div>
            </>
        )
    }, {
        id: 6,
        title: "E2E Automation & Test Quality System",
        tech: ["Risk-Based Testing", "Selenium", "TestCafe"],
        img: "/EST.png",
        summary: "Automated 9 critical user flows with 88.89% pass rate. Built full test quality system with planning, execution, and reporting.",
        details: (
            <>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Project Overview</div>
                <div>
                    • Designed <strong>E2E test processes</strong> for Poco Mega Store using Gantt planning (C.1)<br />
                    • Applied <strong>quality management principles</strong>: traceability, risk-based execution (D.1)<br />
                    • Executed <strong>9 functional tests</strong> with Selenium & TestCafe (D.1)<br />
                    • Built full <strong>test quality system</strong>: planning, automation, reporting (E.1)<br />
                    • Achieved <strong>88.89% pass rate</strong> — found 1 critical failure
                </div>
                <div style={{ margin: "20px 0 10px" }}>
                    <Link
                        to="/stqm-case-study"
                        style={{
                            background: "#7B9ACC",
                            color: "#fff",
                            borderRadius: 9,
                            fontWeight: 700,
                            padding: "8px 15px",
                            textDecoration: "none"
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
        title: "Interaction Design Project",
        tech: ["Figma", "UX Research", "Web"],
        img: "/ixd.png",
        summary: "UX task manager: research, persona, prototyping, usability, report. Click for project story!",
        details: (
            <>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Why I Did This?</div>
                <div>
                    Assignment project: solving real user pain points in daily task management. Explored full HCI process: found problems, built personas, ideated, tested, refined solutions.
                </div>
                <div style={{ margin: "20px 0 10px" }}>
                    <Link
                        to="/interaction-design-case"
                        style={{
                            background: "#7B9ACC",
                            color: "#fff",
                            borderRadius: 9,
                            fontWeight: 700,
                            padding: "8px 15px",
                            textDecoration: "none"
                        }}
                    >
                        View Full Case
                    </Link>
                </div>
            </>
        )
    },
    {
        id: 3,
        title: "DSA Directed Graph",
        tech: ["C++", "Graph Theory", "Algorithms", "OOP"],
        img: "/DSA.png",
        summary: "C++ implementation for directed graph data structure, supporting core operations and traversal algorithms.",
        details: "A command-line program written in C++ for creating and manipulating directed graphs. Supports adding vertices and edges, displaying adjacency lists, and performing BFS & DFS traversals. Built using STL containers for efficient storage and modular design patterns.",
        github: "https://github.com/jaeyunjks/Directed_Graph"
    },
    {
        id: 4,
        title: "Random Meal Generator (In Progress)",
        tech: ["React"],
        img: "/food.png",
        summary: "in progress..",
        details: "in progress..",
        github: "https://github.com/jaeyunjks/random-meal-generator"
    }, {
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
    const isMobile = useIsMobile();

    return (
        <div style={{
            maxWidth: isMobile ? "99vw" : 900,
            margin: isMobile ? "14px auto" : "48px auto",
            padding: isMobile ? "0 3vw" : "0 17px"
        }}>
            <h1 style={{
                fontWeight: 900,
                fontSize: isMobile ? 23 : 36,
                color: "#7B9ACC",
                marginBottom: isMobile ? 14 : 28,
                textAlign: isMobile ? "center" : "left"
            }}>
                My Portfolio
            </h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? 13 : 32
            }}>
                {PROJECTS.map(p => (
                    <div
                        key={p.id}
                        style={{
                            background: "#EDF2FB",
                            borderRadius: 18,
                            boxShadow: "0 2px 16px #c0c7ef17",
                            padding: isMobile ? 10 : 21,
                            cursor: "pointer",
                            border: expanded === p.id ? "2.2px solid #7B9ACC" : "1.2px solid #e3e8f2",
                            marginBottom: isMobile ? 8 : 0
                        }}
                        onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    >
                        <img
                            src={p.img}
                            alt={p.title}
                            style={{
                                width: "100%",
                                borderRadius: 11,
                                maxHeight: isMobile ? 110 : 155,
                                marginBottom: isMobile ? 7 : 11,
                                objectFit: "cover"
                            }}
                        />
                        <div style={{
                            fontWeight: 700,
                            fontSize: isMobile ? 15 : 22,
                            margin: isMobile ? "7px 0" : "10px 0",
                            color: "#232751"
                        }}>{p.title}</div>
                        <div style={{
                            color: "#7B9ACC",
                            fontWeight: 600,
                            fontSize: isMobile ? 12 : 15,
                            letterSpacing: 1,
                            marginBottom: isMobile ? 6 : 7
                        }}>
                            {p.tech && p.tech.join(" · ")}
                        </div>
                        <div style={{
                            fontSize: isMobile ? 11.7 : 15,
                            opacity: .78,
                            marginBottom: isMobile ? 6 : 8
                        }}>{p.summary}</div>
                        <div style={{
                            fontSize: isMobile ? 10.3 : 14,
                            color: "#798",
                            marginBottom: isMobile ? 7 : 10
                        }}>
                            <i>Click for detail</i>
                        </div>
                        {expanded === p.id && (
                            <div
                                style={{
                                    marginTop: isMobile ? 6 : 8,
                                    background: "#FAFCFF",
                                    color: "#232751",
                                    fontSize: isMobile ? 11.2 : 15,
                                    lineHeight: 1.59,
                                    padding: isMobile ? "10px 8px" : "14px 12px",
                                    borderRadius: 9,
                                    boxShadow: "0 2px 9px #ddeaf8"
                                }}
                            >
                                {typeof p.details === "string" ? (
                                    <div style={{ marginBottom: isMobile ? 8 : 10 }}>{p.details}</div>
                                ) : (
                                    p.details
                                )}
                                {p.github && (
                                    <a
                                        href={p.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            background: "#7B9ACC",
                                            color: "#fff",
                                            borderRadius: 9,
                                            textDecoration: "none",
                                            fontWeight: 700,
                                            padding: isMobile ? "6px 12px" : "7px 18px",
                                            marginRight: 14,
                                            fontSize: isMobile ? 10.5 : 15,
                                            display: "inline-block",
                                            marginTop: isMobile ? 7 : 10
                                        }}
                                    >
                                        View Code
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
