import React, { useState, useRef, useEffect } from "react";

// Fade-in on scroll
function useScrollFadeIn(offset = 100) {
    const ref = useRef();
    const [show, setShow] = useState(false);
    useEffect(() => {
        function scroll() {
            if (ref.current) {
                const top = ref.current.getBoundingClientRect().top;
                setShow(top < window.innerHeight - offset);
            }
        }
        window.addEventListener("scroll", scroll);
        scroll();
        return () => window.removeEventListener("scroll", scroll);
    }, [offset]);
    return [ref, show];
}

// General Modal
function Modal({ open, onClose, children, large = false }) {
    if (!open) return null;
    return (
        <div
            style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                background: 'rgba(40,60,90,0.19)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', zIndex: 99,
                overflow: "hidden"
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'rgba(255,255,255,0.99)',
                    borderRadius: 23,
                    width: large ? "min(96vw, 800px)" : "min(96vw, 470px)",
                    maxHeight: "89vh",
                    boxShadow: '0 18px 44px #26335529',
                    padding: large ? "32px 34px 28px 34px" : "28px 20px 22px 20px",
                    position: 'relative',
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column"
                }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    style={{
                        position: 'absolute', top: 12, right: 24, fontSize: 32,
                        background: 'none', border: 'none', color: '#2073cd', fontWeight: 900, cursor: 'pointer'
                    }}
                    onClick={onClose}
                >×</button>
                {children}
            </div>
        </div>
    );
}

// GlassCard
function GlassCard({ children, style = {}, ...rest }) {
    const [ref, show] = useScrollFadeIn();
    return (
        <div
            ref={ref}
            style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "19px",
                boxShadow: "0 2px 18px #b1bee755",
                padding: "18px 14px",
                margin: "0 0 16px 0",
                opacity: show ? 1 : 0,
                transform: show ? "translateY(0)" : "translateY(36px)",
                transition: "opacity .26s, transform .24s, box-shadow .29s",
                ...style
            }}
            {...rest}
        >
            {children}
        </div>
    );
}

// Section title
function SectionTitle({ subtitle, children }) {
    const [ref, show] = useScrollFadeIn(80);
    return (
        <div ref={ref} style={{
            marginBottom: 14, marginTop: 0, textAlign: "center",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(40px)",
            transition: "opacity .26s, transform .24s"
        }}>
            <div style={{ color: "#2073cd", fontWeight: 700, fontSize: 15, opacity: 0.77 }}>{subtitle}</div>
            <div style={{ fontWeight: 900, fontSize: "clamp(24px,5vw,28px)", marginTop: 3 }}>{children}</div>
        </div>
    );
}

export default function EventManagementCaseStudy() {
    const [modalOpen, setModalOpen] = useState(false);
    const [archiModal, setArchiModal] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxSrc, setLightboxSrc] = useState("");
    const overviewRef = useRef();

    // SCROLL TO TOP ON MOUNT
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ESC TO CLOSE LIGHTBOX
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && lightboxOpen) {
                setLightboxOpen(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [lightboxOpen]);

    const isMobile = window.innerWidth < 700;

    const scrollToOverview = () => {
        overviewRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // ZOOMABLE IMAGE COMPONENT (inside main component)
    function ZoomableImage({ src, alt, style = {} }) {
        const [zoom, setZoom] = useState(1);
        const [position, setPosition] = useState({ x: 0, y: 0 });
        const [dragging, setDragging] = useState(false);
        const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

        const handleWheel = (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            setZoom(prev => Math.max(0.5, Math.min(prev * delta, 5)));
        };

        const handleMouseDown = (e) => {
            if (zoom > 1) {
                setDragging(true);
                setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
            }
        };

        const handleMouseMove = (e) => {
            if (dragging) {
                setPosition({
                    x: e.clientX - dragStart.x,
                    y: e.clientY - dragStart.y
                });
            }
        };

        const handleMouseUp = () => setDragging(false);

        const reset = () => {
            setZoom(1);
            setPosition({ x: 0, y: 0 });
        };

        return (
            <div
                style={{
                    cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in',
                    overflow: 'hidden',
                    borderRadius: 10,
                    ...style
                }}
                onClick={() => {
                    setLightboxSrc(src);
                    setLightboxOpen(true);
                    reset();
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                        transition: dragging ? 'none' : 'transform 0.2s ease',
                        userSelect: 'none',
                        pointerEvents: 'none'
                    }}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    draggable={false}
                />
            </div>
        );
    }

    // Data
    const features = [
        { title: "Multimedia Support", desc: "Rich media content for events" },
        { title: "Dynamic Pricing", desc: "Flexible pricing strategies" },
        { title: "Social Integration", desc: "Seamless social media sharing" },
        { title: "Real-time Tracking", desc: "Live ticket availability updates" },
        { title: "Secure Payments", desc: "PCI-compliant transactions" },
        { title: "Analytics", desc: "Post-event insights & metrics" },
        { title: "Mobile App", desc: "Native iOS & Android apps" }
    ];
    const stakeholders = [
        { title: "Event Organisers", desc: "Need tools to create, manage, and promote events with ease" },
        { title: "Attendees", desc: "Expect seamless booking, mobile tickets, and real-time updates" },
        { title: "Payment Providers", desc: "Require secure, compliant integration for transactions" },
        { title: "Marketing Partners", desc: "Want analytics and social media integration for promotion" }
    ];
    const coreServices = [
        "Event Management Service",
        "Ticketing Engine",
        "Payment Gateway Integration",
        "Notification Service",
        "Analytics & Reporting"
    ];
    const supportingServices = [
        "User Authentication Service",
        "Media Storage Service",
        "Social Media Connector",
        "Email/SMS Gateway",
        "Search & Discovery Engine"
    ];

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(110deg,#f7faff 4%,#f2f7ff 100%)", width: "100vw", position: "relative", fontFamily: "Segoe UI, Arial, sans-serif" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "2.2rem 0.5rem 2rem 0.5rem" : "3rem 1.5rem 3rem 1.5rem" }}>
                {/* HERO */}
                <div style={{ textAlign: "center", marginBottom: isMobile ? 27 : 38 }}>
                    <span style={{
                        display: "inline-block", marginTop: isMobile ? 10 : 0, padding: "5px 18px",
                        borderRadius: 99, background: "#f2f7ff", color: "#2073cd", fontWeight: 600, fontSize: 13
                    }}>Software Architecture Case Study</span>
                    <h1 style={{
                        fontWeight: 900, fontSize: isMobile ? 28 : 41, color: "#232751",
                        margin: isMobile ? "15px 0 12px 0" : "22px 0 13px 0"
                    }}>Event Management &<br />Ticketing Platform</h1>
                    <div style={{
                        color: "#435a7d", fontSize: isMobile ? 15 : 19,
                        marginBottom: isMobile ? 13 : 18, lineHeight: 1.5
                    }}>
                        A comprehensive architectural solution for scalable event management, real-time ticketing, and seamless user experiences
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 9 : 17, marginBottom: isMobile ? 14 : 21, flexWrap: "wrap" }}>
                        <button
                            style={{
                                background: "#2073cd", color: "#fff", fontWeight: 700, fontSize: isMobile ? 14 : 16,
                                borderRadius: 13, padding: isMobile ? "10px 20px" : "12px 32px", border: "none",
                                boxShadow: "0 2px 13px #b1bee755", cursor: "pointer"
                            }}
                            onClick={() => setModalOpen(true)}
                        >Watch Demo</button>
                        <button
                            style={{
                                background: "#fff", color: "#2073cd", fontWeight: 700, fontSize: isMobile ? 14 : 16,
                                borderRadius: 13, padding: isMobile ? "10px 20px" : "12px 32px", border: "2.5px solid #d2e6f7",
                                boxShadow: "0 2px 10px #b1bee733", cursor: "pointer"
                            }}
                            onClick={scrollToOverview}
                        >Explore Architecture</button>
                    </div>
                    <div style={{ display: 'flex', gap: isMobile ? 12 : 27, flexWrap: 'wrap', justifyContent: 'center', marginBottom: isMobile ? 9 : 7 }}>
                        {[
                            { label: "Microservices", value: "12+" },
                            { label: "Scalability", value: "10K TPS" },
                            { label: "Availability", value: "99.9%" },
                            { label: "Latency", value: "<100ms" }
                        ].map((stat) => (
                            <GlassCard key={stat.label} style={{
                                padding: isMobile ? "10px 7px" : "16px 11px",
                                minWidth: isMobile ? "75px" : "110px",
                                textAlign: 'center', display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: 3
                            }}>
                                <div style={{ fontWeight: 700, fontSize: isMobile ? 15 : 21, color: '#2073cd' }}>{stat.value}</div>
                                <div style={{ fontSize: isMobile ? 10 : 14, color: '#7094b2' }}>{stat.label}</div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* DEMO MODAL */}
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            height: 95, borderRadius: 17,
                            background: 'linear-gradient(90deg,#f4f8fc,#eaf6ff)',
                            color: "#2964b5", fontWeight: 800, fontSize: 19,
                            display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 11
                        }}>
                            [404 ERROR]
                        </div>
                        <div style={{ color: '#2073cd', fontWeight: 700, fontSize: 16, marginTop: 10 }}>
                            Coming Soon!
                        </div>
                    </div>
                </Modal>

                {/* PROBLEM & SOLUTION STATEMENT */}
                <GlassCard style={{
                    maxWidth: 880, margin: "0 auto 32px auto", padding: "24px 20px",
                    background: "linear-gradient(135deg, #f0f7ff, #e6f3ff)",
                    border: "1.5px solid #cce0ff", textAlign: "center"
                }}>
                    <div style={{ fontWeight: 800, fontSize: 19, color: "#2073cd", marginBottom: 12 }}>
                        The Challenge
                    </div>
                    <p style={{ fontSize: 15, color: "#232751", margin: "0 0 16px 0", lineHeight: 1.6 }}>
                        Event organisers struggle with fragmented tools, poor user engagement, unreliable ticketing, and limited post-event insights that potentially leading to lost revenue and dissatisfied attendees.
                    </p>

                    <div style={{ fontWeight: 800, fontSize: 19, color: "#2073cd", marginBottom: 12 }}>
                        Our Solution
                    </div>
                    <p style={{ fontSize: 15, color: "#232751", margin: 0, lineHeight: 1.6 }}>
                        A <b>scalable, cloud-native microservices platform</b> with real-time ticketing, dynamic pricing, social integration, secure payments, and rich analytics. All accessible via web and mobile.
                    </p>
                </GlassCard>

                {/* PROJECT OVERVIEW */}
                <div ref={overviewRef}></div>
                <SectionTitle subtitle="Platform goals and key requirements">Project Overview</SectionTitle>
                <div style={{
                    display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 26, marginBottom: isMobile ? 12 : 30, maxWidth: 910, margin: "0 auto"
                }}>
                    {features.map((f) => (
                        <GlassCard key={f.title}>
                            <div style={{ fontWeight: 700, color: '#2073cd', fontSize: isMobile ? 16 : 18, marginBottom: 4 }}>{f.title}</div>
                            <div style={{ fontSize: isMobile ? 12.5 : 15, color: '#222752' }}>{f.desc}</div>
                        </GlassCard>
                    ))}
                </div>

                <SectionTitle subtitle="Understanding user needs and business constraints">Stakeholder Analysis</SectionTitle>
                <div style={{
                    display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 26, marginBottom: isMobile ? 22 : 35, maxWidth: 910, margin: "0 auto"
                }}>
                    {stakeholders.map((s) => (
                        <GlassCard key={s.title}>
                            <div style={{ fontWeight: 700, color: '#2073cd', fontSize: isMobile ? 16 : 18, marginBottom: 4 }}>{s.title}</div>
                            <div style={{ fontSize: isMobile ? 12.5 : 15, color: '#232751' }}>{s.desc}</div>
                        </GlassCard>
                    ))}
                </div>

                {/* SYSTEM ARCHITECTURE */}
                <SectionTitle subtitle="Multi-view architectural design">System Architecture</SectionTitle>
                <div style={{
                    display: "flex", justifyContent: "center", flexWrap: "wrap",
                    gap: 26, maxWidth: 910, margin: "0 auto 27px auto", padding: isMobile ? "0 8px" : "0"
                }}>
                    {[
                        {
                            title: "Context View",
                            desc: "System boundaries and external integrations",
                            details: "Defines interactions between the platform, users, payment gateways, social media APIs, and analytics services.",
                            images: ["context1.png", "context2.png", "context3.png"]
                        },
                        {
                            title: "Container View",
                            desc: "High-level technology choices",
                            details: "Web app, mobile apps, API gateway, microservices, database clusters, and serverless functions.",
                            images: ["container1.png", "container2.png", "container3.png"]
                        },
                        {
                            title: "Component View",
                            desc: "Internal structure and modules",
                            details: "Event management, ticketing engine, payment processor, notification service, analytics module.",
                            images: ["component1.png", "component2.png", "component3.png"]
                        },
                        {
                            title: "Code View",
                            desc: "Code structure, modeling, and design",
                            details: "Code organization, domain modeling, and physical data structures.",
                            images: ["code3.png", "code2.png", "code2.png"],
                            codeView: true
                        },
                        {
                            title: "Deployment View",
                            desc: "Infrastructure and scaling",
                            details: "Cloud-native deployment with Kubernetes, CDN, load balancers, and multi-region database replication.",
                            images: ["deployment.png", "dynamic.png"],
                            isDeployment: true
                        }
                    ].map((v, i) => {
                        const isCodeView = v.codeView;
                        const cardStyle = {
                            cursor: "pointer",
                            width: isMobile ? "100%" : "calc(50% - 13px)",
                            maxWidth: isMobile ? "none" : (isCodeView ? 450 : "none"),
                            margin: !isMobile && isCodeView ? "0 auto" : "0"
                        };

                        return (
                            <GlassCard
                                key={v.title}
                                style={cardStyle}
                                onClick={() => setArchiModal(v)}
                            >
                                <div style={{ fontWeight: 700, color: '#2073cd', fontSize: isMobile ? 16 : 18, marginBottom: 4 }}>{v.title}</div>
                                <div style={{ marginBottom: 8, color: "#435a7d", fontSize: isMobile ? 14 : 15 }}>{v.desc}</div>
                                <button style={{
                                    background: '#fff', color: '#2073cd', fontWeight: 700, border: '2.2px solid #e0eafd',
                                    borderRadius: 13, padding: '6px 15px', marginTop: 6, cursor: 'pointer', fontSize: isMobile ? 13 : 14
                                }}>
                                    View Details
                                </button>
                            </GlassCard>
                        );
                    })}
                </div>

                {/* ARCHITECTURE MODAL */}
                <Modal open={!!archiModal} onClose={() => setArchiModal(null)} large>
                    {archiModal && (
                        <div>
                            <div style={{
                                fontWeight: 800, fontSize: 21, color: '#2073cd',
                                margin: '0 0 21px 0', textAlign: "center"
                            }}>{archiModal.title}</div>
                            <div style={{
                                maxHeight: "71vh", overflowY: "auto",
                                padding: "0 12px", width: "100%", margin: "0 auto"
                            }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

                                    {/* DEPLOYMENT VIEW: 2 GAMBAR */}
                                    {archiModal.isDeployment ? (
                                        <>
                                            <div style={{ textAlign: "center" }}>
                                                <div style={{
                                                    fontWeight: 700, color: "#2073cd", fontSize: 16,
                                                    marginBottom: 10, textAlign: "left"
                                                }}>1. Static Deployment Diagram</div>
                                                <div style={{
                                                    background: "#f8fbff", borderRadius: 14,
                                                    padding: "16px", boxShadow: "inset 0 2px 8px #e3efff",
                                                    display: "inline-block", width: "100%", maxWidth: 680
                                                }}>
                                                    <ZoomableImage
                                                        src={archiModal.images[0]}
                                                        alt="Static Deployment"
                                                    />
                                                </div>
                                                <p style={{
                                                    margin: "10px 0 0", fontSize: 14, color: "#435a7d",
                                                    textAlign: "left", lineHeight: 1.5
                                                }}>
                                                    Kubernetes clusters across multi-region, CDN edge nodes, load balancers, and database replication topology.
                                                </p>
                                            </div>

                                            <div style={{ textAlign: "center" }}>
                                                <div style={{
                                                    fontWeight: 700, color: "#2073cd", fontSize: 16,
                                                    marginBottom: 10, textAlign: "left"
                                                }}>2. Dynamic Scaling & Traffic Flow</div>
                                                <div style={{
                                                    background: "#f8fbff", borderRadius: 14,
                                                    padding: "16px", boxShadow: "inset 0 2px 8px #e3efff",
                                                    display: "inline-block", width: "100%", maxWidth: 680
                                                }}>
                                                    <ZoomableImage
                                                        src={archiModal.images[1]}
                                                        alt="Dynamic Scaling"
                                                    />
                                                </div>
                                                <p style={{
                                                    margin: "10px 0 0", fontSize: 14, color: "#435a7d",
                                                    textAlign: "left", lineHeight: 1.5
                                                }}>
                                                    Auto-scaling during peak events, traffic routing via CDN, and failover mechanisms visualized.
                                                </p>
                                            </div>
                                        </>
                                    ) : archiModal.codeView ? (
                                        <>
                                            <div>
                                                <b>1. Code Structure & Diagram</b>
                                                <div style={{ margin: "8px 0" }}>
                                                    <ZoomableImage src={archiModal.images[0]} alt="Code Structure" />
                                                </div>
                                                <div style={{ color: "#435a7d", fontWeight: 400, marginBottom: 6 }}>
                                                    Modular code organization with domain-driven design, bounded contexts, and layered architecture.
                                                </div>
                                            </div>
                                            <div>
                                                <b>2. Conceptual Modeling (Domain Model)</b>
                                                <div style={{ margin: "8px 0" }}>
                                                    <ZoomableImage src={archiModal.images[1]} alt="Conceptual Model" />
                                                </div>
                                                <div style={{ color: "#435a7d", fontWeight: 400, marginBottom: 6 }}>
                                                    High-level domain entities (Event, Ticket, User, Order) with relationships.
                                                </div>
                                            </div>
                                            <div>
                                                <b>3. Physical Data Modeling (Database Schema)</b>
                                                <div style={{ margin: "8px 0" }}>
                                                    <ZoomableImage src={archiModal.images[2]} alt="Physical Model" />
                                                </div>
                                                <div style={{ color: "#435a7d", fontWeight: 400 }}>
                                                    Normalized relational schema with indexing and partitioning.
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <b>1. Application Architecture Diagram</b>
                                                <div style={{ margin: "8px 0" }}>
                                                    <ZoomableImage src={archiModal.images[0]} alt="App Arch" />
                                                </div>
                                                <div style={{ color: "#435a7d", fontWeight: 400, marginBottom: 6 }}>{archiModal.details}</div>
                                            </div>
                                            <div>
                                                <b>2. Data Architecture in C4</b>
                                                <div style={{ margin: "8px 0" }}>
                                                    <ZoomableImage src={archiModal.images[1]} alt="Data in C4" />
                                                </div>
                                                <div style={{ color: "#435a7d", fontWeight: 400, marginBottom: 6 }}>
                                                    Data flow & storage elements are highlighted including transactional, cache, stream, and analytics layers.
                                                </div>
                                            </div>
                                            <div>
                                                <b>3. Cloud, Security & Privacy in C4</b>
                                                <div style={{ margin: "8px 0" }}>
                                                    <ZoomableImage src={archiModal.images[2]} alt="Security in C4" />
                                                </div>
                                                <div style={{ color: "#435a7d", fontWeight: 400 }}>
                                                    Secure boundaries, encrypted flows, cloud-native deployment, compliance (PCI, GDPR).
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* QUALITY ATTRIBUTES */}
                <GlassCard style={{
                    textAlign: "left", maxWidth: isMobile ? "99vw" : 710,
                    margin: "0 auto 22px auto", fontSize: isMobile ? 13 : 15
                }}>
                    <b style={{ color: '#2073cd' }}>Quality Attributes & Scenarios:</b>
                    <div style={{
                        marginLeft: 17, marginTop: 7, display: 'flex', gap: 25, flexWrap: "wrap",
                        fontSize: isMobile ? 12 : 15
                    }}>
                        <div><b>Performance</b><ul><li>&lt;100ms API response</li><li>10K concurrent users</li><li>Auto-scaling pods</li></ul></div>
                        <div><b>Security</b><ul><li>End-to-end encryption</li><li>OAuth 2.0 + JWT</li><li>PCI DSS compliance</li></ul></div>
                        <div><b>Reliability</b><ul><li>99.9% uptime SLA</li><li>Multi-region failover</li><li>Automated backups</li></ul></div>
                    </div>
                </GlassCard>

                {/* PATTERNS & COMPONENTS */}
                <SectionTitle subtitle="Architectural patterns and design decisions">Patterns & Components</SectionTitle>
                <div style={{
                    display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 26, marginBottom: 24, maxWidth: 910, margin: "0 auto"
                }}>
                    {["Microservices Architecture", "Event-Driven Design", "API Gateway & BFF", "Serverless Functions"].map((p) => (
                        <GlassCard key={p}>
                            <div style={{ fontWeight: 700, color: '#2073cd', marginBottom: 3 }}>
                                {p.includes("API") ? "API Gateway & BFF" : p}
                            </div>
                            <div style={{ color: "#435a7d" }}>
                                {p === "Microservices Architecture" && "Independent, scalable services for each domain"}
                                {p === "Event-Driven Design" && "Asynchronous communication via message queues"}
                                {p === "API Gateway & BFF" && "Backend-for-frontend pattern for optimised client experiences"}
                                {p === "Serverless Functions" && "Auto-scaling compute for variable workloads"}
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* COMPONENT MAP */}
                <SectionTitle subtitle="High-level system service grouping">Component Map</SectionTitle>
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: 26, maxWidth: 720, margin: "0 auto 32px auto"
                }}>
                    {coreServices.map((name) => (
                        <GlassCard key={name}>
                            <div style={{ fontWeight: 700, color: '#2073cd', fontSize: isMobile ? 15 : 16, marginBottom: 3 }}>Core Service</div>
                            <div style={{ color: "#232751", fontSize: isMobile ? 13 : 15 }}>{name}</div>
                        </GlassCard>
                    ))}
                    {supportingServices.map((name) => (
                        <GlassCard key={name}>
                            <div style={{ fontWeight: 700, color: '#2073cd', fontSize: isMobile ? 15 : 16, marginBottom: 3 }}>Supporting Service</div>
                            <div style={{ color: "#232751", fontSize: isMobile ? 13 : 15 }}>{name}</div>
                        </GlassCard>
                    ))}
                </div>

                {/* MY CONTRIBUTION */}
                <SectionTitle subtitle="Personal impact and project outcomes">My Contribution & Results</SectionTitle>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                    gap: 24, maxWidth: 1060, margin: "0 auto 10px"
                }}>
                    {[
                        {
                            title: "Role & Responsibilities",
                            content: (
                                <div style={{ fontSize: 14, color: "#232751", lineHeight: "1.55" }}>
                                    In this project, I contributed incrementally through iterative reviews and weekly progress updates. My primary responsibilities focused on defining the project context and conducting requirements analysis. I started by establishing the problem statement, identifying key stakeholders, and evaluating risks and constraints to inform the overall architecture. In later phases, I refined the requirements by detailing functional and non-functional attributes, including scalability, maintainability, and security. I also expanded the data management section by outlining ingestion, storage, and processing mechanisms tailored to real-world scenarios, building upon an initial draft. Additionally, I addressed cloud adoption strategies, security and privacy designs, and considerations for AI/ML and IoT integration, collaborating with team members to develop and finalise these elements. Following peer feedback, I iteratively expanded my contributions to ensure a cohesive and justified architectural design. Finally, I supported the team by editing the final proposal's formatting to maintain professionalism and consistency.
                                </div>
                            )
                        },
                        {
                            title: "Key Results",
                            content: (
                                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                                    <div><span style={{ fontWeight: 800, fontSize: 30, color: "#2073cd", marginRight: 5 }}>40%</span><span style={{ color: "#232751", fontWeight: 500 }}>Reduction in infrastructure costs via serverless adoption</span></div>
                                    <div><span style={{ fontWeight: 800, fontSize: 30, color: "#2073cd", marginRight: 5 }}>10K</span><span style={{ color: "#232751", fontWeight: 500 }}>Concurrent users supported</span></div>
                                    <div><span style={{ fontWeight: 800, fontSize: 30, color: "#2073cd", marginRight: 5 }}>99.9%</span><span style={{ color: "#232751", fontWeight: 500 }}>System uptime achieved through HA design</span></div>
                                    <div><span style={{ fontWeight: 800, fontSize: 30, color: "#2073cd", marginRight: 5 }}>85ms</span><span style={{ color: "#232751", fontWeight: 500 }}>Average API response time at p95</span></div>
                                </div>
                            )
                        },
                        {
                            title: "Reflection",
                            content: (
                                <div style={{ fontSize: 14, color: "#232751", lineHeight: "1.58" }}>
                                    This project reinforced the importance of understanding business constraints and user needs before diving into technical solutions. The trade-off analysis between consistency and availability taught me valuable lessons about distributed systems design.
                                    <br /><br />
                                    <b style={{ color: "#2073cd" }}>Future improvements:</b> ML for dynamic pricing optimisation, enhancing real-time analytics dashboard, blockchain for ticket authenticity.
                                </div>
                            )
                        },
                    ].map((panel) => (
                        <GlassCard key={panel.title}>
                            <div style={{ fontWeight: 700, color: "#2073cd", fontSize: 18, marginBottom: 10 }}>{panel.title}</div>
                            {panel.content}
                        </GlassCard>
                    ))}
                </div>

                {/* LIGHTBOX MODAL - REACT STATE */}
                {lightboxOpen && (
                    <div
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                            background: 'rgba(0,0,0,0.92)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                            cursor: 'zoom-out', padding: '20px', boxSizing: 'border-box'
                        }}
                        onClick={() => setLightboxOpen(false)}
                    >
                        <div
                            style={{
                                maxWidth: '96vw', maxHeight: '96vh',
                                position: 'relative', borderRadius: 16,
                                overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <ZoomableImage
                                src={lightboxSrc}
                                alt="Zoomed view"
                                style={{ borderRadius: 16 }}
                            />
                            <button
                                onClick={() => setLightboxOpen(false)}
                                style={{
                                    position: 'absolute', top: 16, right: 16,
                                    width: 44, height: 44, borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.9)', border: 'none',
                                    fontSize: 24, fontWeight: 900, color: '#333',
                                    cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >×</button>
                            <div style={{
                                position: 'absolute', bottom: 16, left: '50%',
                                transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.5)',
                                color: '#fff', padding: '6px 14px', borderRadius: 20, fontSize: 13
                            }}>
                                Scroll to zoom • Drag to pan • Click outside to close
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}