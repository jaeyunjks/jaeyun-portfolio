import React, { useState } from "react";
import { Link } from "react-router-dom";

const PROJECTS = [
    {
        id: 1,
        title: "IoTBay - IoT Devices Ordering",
        tech: ["Java", "JSP", "MVC", "MySQL"],
        img: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=700&h=380&fit=crop",
        summary: "E-commerce webapp for IoT devices. Full shipment management CRUD, secure backend, Agile team.",
        details: "IoTBay lets customers browse, order, and track IoT devices like sensors/actuators. Implemented key shipment module, login system, and optimized data retrieval.",
        github: "https://github.com/jaeyunjks/IOTBay.git"
    },
    {
        id: 2,
        title: "Interaction Design Project",
        tech: ["Figma", "UX Research", "Web"],
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=380&fit=crop",
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
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700&h=380&fit=crop",
        summary: "C++ implementation for directed graph data structure, supporting core operations and traversal algorithms.",
        details: "A command-line program written in C++ for creating and manipulating directed graphs. Supports adding vertices and edges, displaying adjacency lists, and performing BFS & DFS traversals. Built using STL containers for efficient storage and modular design patterns.",
        github: "https://github.com/jaeyunjks/Directed_Graph"
    },
    {
        id: 4,
        title: "Expense Tracker (In Progress)",
        tech: ["React", "Node.js", "Express", "MongoDB", "Full Stack"],
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&h=380&fit=crop",
        summary: "Full stack expense tracking app—record, view, and analyze daily spending. Currently under active development.",
        details: "A work-in-progress expense tracker allowing users to log daily expenses, categorize spending, and visualize data trends. Frontend built with React, backend with Node.js/Express, and data stored in MongoDB. Plans include authentication, analytics dashboard, and responsive design.",
        github: "https://github.com/jaeyunjks/expense-tracker.git"
    }
];

export default function PortfolioPage() {
    const [expanded, setExpanded] = useState(null);

    return (
        <div style={{ maxWidth: 900, margin: "48px auto", padding: "0 17px" }}>
            <h1 style={{ fontWeight: 900, fontSize: 36, color: "#7B9ACC", marginBottom: 28 }}>
                My Portfolio
            </h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                {PROJECTS.map(p => (
                    <div
                        key={p.id}
                        style={{
                            background: "#EDF2FB",
                            borderRadius: 18,
                            boxShadow: "0 2px 16px #c0c7ef17",
                            padding: 21,
                            cursor: "pointer",
                            border: expanded === p.id ? "2.2px solid #7B9ACC" : "1.2px solid #e3e8f2"
                        }}
                        onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    >
                        <img src={p.img} alt={p.title} style={{ width: "100%", borderRadius: 11, maxHeight: 155, marginBottom: 11 }} />
                        <div style={{ fontWeight: 700, fontSize: 22, margin: "10px 0", color: "#232751" }}>{p.title}</div>
                        <div style={{ color: "#7B9ACC", fontWeight: 600, fontSize: 15, letterSpacing: 1, marginBottom: 7 }}>
                            {p.tech && p.tech.join(" · ")}
                        </div>
                        <div style={{ fontSize: 15, opacity: .78, marginBottom: 8 }}>{p.summary}</div>
                        <div style={{ fontSize: 14, color: "#798", marginBottom: 10 }}>
                            <i>Click for detail</i>
                        </div>
                        {expanded === p.id && (
                            <div
                                style={{
                                    marginTop: 8,
                                    background: "#FAFCFF",
                                    color: "#232751",
                                    fontSize: 15,
                                    lineHeight: 1.6,
                                    padding: "14px 12px",
                                    borderRadius: 9,
                                    boxShadow: "0 2px 9px #ddeaf8"
                                }}
                            >
                                {typeof p.details === "string" ? (
                                    <div style={{ marginBottom: 10 }}>{p.details}</div>
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
                                            padding: "7px 18px",
                                            marginRight: 14
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
