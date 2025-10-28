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

// General Modal for content, now rectangle & scrollable
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
            <style>{`
                @keyframes fadeInModal {
                  from { opacity:0; transform:scale(.93);}
                  to { opacity:1; transform:scale(1);}
                }
            `}</style>
        </div>
    );
}

// GlassCard: block/kolom animasi fade, shadow
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

// Section title animasi
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

    const isMobile = window.innerWidth < 700;
    const overviewRef = useRef();
    const scrollToOverview = () => {
        overviewRef.current.scrollIntoView({ behavior: "smooth" });
    };

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
                                boxShadow: "0 2px 13px #b1bee755", cursor: "pointer", marginRight: 4, marginBottom: isMobile ? 8 : 0
                            }}
                            onClick={() => setModalOpen(true)}
                        >Watch Demo</button>
                        <button
                            style={{
                                background: "#fff", color: "#2073cd", fontWeight: 700, fontSize: isMobile ? 14 : 16,
                                borderRadius: 13, padding: isMobile ? "10px 20px" : "12px 32px", border: "2.5px solid #d2e6f7",
                                boxShadow: "0 2px 10px #b1bee733", cursor: "pointer", marginBottom: isMobile ? 8 : 0
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
                        ].map((stat, i) =>
                            <GlassCard key={stat.label} style={{
                                padding: isMobile ? "10px 7px" : "16px 11px",
                                minWidth: isMobile ? "75px" : "110px",
                                textAlign: 'center',
                                fontWeight: 500,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: 3
                            }}>
                                <div style={{ fontWeight: 700, fontSize: isMobile ? 15 : 21, color: '#2073cd', marginBottom: 1, marginTop: 2 }}>{stat.value}</div>
                                <div style={{ fontSize: isMobile ? 10 : 14, color: '#7094b2' }}>{stat.label}</div>
                            </GlassCard>
                        )}
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
                            [Demo Architecture Animation Placeholder]
                        </div>
                        <div style={{ color: '#2073cd', fontWeight: 700, fontSize: 16, marginTop: 10 }}>
                            System architecture, animated overview, or demo video here
                        </div>
                    </div>
                </Modal>

                {/* -------- PROJECT OVERVIEW CARD GRID -------- */}
                <div ref={overviewRef}></div>
                <SectionTitle subtitle="Platform goals and key requirements">Project Overview</SectionTitle>
                <div style={{
                    display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 26, marginBottom: isMobile ? 12 : 30, maxWidth: 910, margin: "0 auto"
                }}>
                    {features.map((f, i) => (
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
                    {stakeholders.map((s, i) => (
                        <GlassCard key={s.title}>
                            <div style={{ fontWeight: 700, color: '#2073cd', fontSize: isMobile ? 16 : 18, marginBottom: 4 }}>{s.title}</div>
                            <div style={{ fontSize: isMobile ? 12.5 : 15, color: '#232751' }}>{s.desc}</div>
                        </GlassCard>
                    ))}
                </div>

                {/* ... Problem Statement, Quality Attributes, Patterns, etc ... */}

                {/* ARCHITECTURE POPUP GRID + MODAL */}
                <SectionTitle subtitle="Multi-view architectural design">System Architecture</SectionTitle>
                <div style={{
                    display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 26, marginBottom: isMobile ? 18 : 27, maxWidth: 910, margin: "0 auto"
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
                            title: "Deployment View",
                            desc: "Infrastructure and scaling",
                            details: "Cloud-native deployment with Kubernetes, CDN, load balancers, and multi-region database replication.",
                            images: ["deployment1.png", "deployment2.png", "deployment3.png"]
                        }
                    ].map((v, i) => (
                        <GlassCard
                            key={v.title}
                            style={{ cursor: "pointer" }}
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
                    ))}
                </div>
                <Modal open={!!archiModal} onClose={() => setArchiModal(null)} large>
                    {archiModal && (
                        <div>
                            <div style={{
                                fontWeight: 800, fontSize: 21, color: '#2073cd',
                                margin: '0 0 21px 0', textAlign: "center"
                            }}>{archiModal.title}</div>
                            <div style={{
                                maxHeight: "71vh", overflowY: "auto",
                                paddingRight: 6, paddingLeft: 6, width: "100%", margin: "0 auto"
                            }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                                    <div>
                                        <b>1. Application Architecture Diagram</b>
                                        <div style={{ margin: "8px 0" }}>
                                            <img
                                                src={archiModal.images[0]}
                                                alt="Application Architecture"
                                                style={{
                                                    width: "100%", maxWidth: "99%", maxHeight: "230px",
                                                    borderRadius: 9, boxShadow: "0 2px 10px #bcc9e680",
                                                    background: "#f7faff", objectFit: "contain",
                                                    display: "block", margin: "0 auto 5px auto"
                                                }} />
                                        </div>
                                        <div style={{ color: "#435a7d", fontWeight: 400, marginBottom: 6 }}>{archiModal.details}</div>
                                    </div>
                                    <div>
                                        <b>2. Incorporate data architectural decisions into C4 diagrams</b>
                                        <div style={{ margin: "8px 0" }}>
                                            <img
                                                src={archiModal.images[1]}
                                                alt="Data Decisions in C4"
                                                style={{
                                                    width: "100%", maxWidth: "99%", maxHeight: "230px",
                                                    borderRadius: 9, boxShadow: "0 2px 10px #bcc9e680",
                                                    background: "#f7faff", objectFit: "contain",
                                                    display: "block", margin: "0 auto 5px auto"
                                                }} />
                                        </div>
                                        <div style={{ color: "#435a7d", fontWeight: 400, marginBottom: 6 }}>
                                            Data flow & storage elements are highlighted including transactional, cache, stream, and analytics layers in this view.
                                        </div>
                                    </div>
                                    <div>
                                        <b>3. Incorporate Cloud, Security and Privacy decisions into C4 diagrams</b>
                                        <div style={{ margin: "8px 0" }}>
                                            <img
                                                src={archiModal.images[2]}
                                                alt="Cloud Security and Privacy in C4"
                                                style={{
                                                    width: "100%", maxWidth: "99%", maxHeight: "230px",
                                                    borderRadius: 9, boxShadow: "0 2px 10px #bcc9e680",
                                                    background: "#f7faff", objectFit: "contain",
                                                    display: "block", margin: "0 auto 5px auto"
                                                }} />
                                        </div>
                                        <div style={{ color: "#435a7d", fontWeight: 400 }}>
                                            Diagram explicitly shows secure boundaries, encrypted flows, cloud-native deployment, compliance, and regulated zones (PCI, GDPR).
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                <GlassCard style={{
                    textAlign: "left", maxWidth: isMobile ? "99vw" : 710,
                    margin: "0 auto 22px auto", fontSize: isMobile ? 13 : 15
                }}>
                    <b style={{ color: '#2073cd' }}>Quality Attributes & Scenarios:</b>
                    <div style={{
                        marginLeft: 17, marginTop: 7, display: 'flex', gap: 25, flexWrap: "wrap",
                        fontSize: isMobile ? 12 : 15
                    }}>
                        <div>
                            <b>Performance</b>
                            <ul>
                                <li>&lt;100ms API response</li>
                                <li>10K concurrent users</li>
                                <li>Auto-scaling pods</li>
                            </ul>
                        </div>
                        <div>
                            <b>Security</b>
                            <ul>
                                <li>End-to-end encryption</li>
                                <li>OAuth 2.0 + JWT</li>
                                <li>PCI DSS compliance</li>
                            </ul>
                        </div>
                        <div>
                            <b>Reliability</b>
                            <ul>
                                <li>99.9% uptime SLA</li>
                                <li>Multi-region failover</li>
                                <li>Automated backups</li>
                            </ul>
                        </div>
                    </div>
                </GlassCard>

                {/* Patterns & Components */}
                <SectionTitle subtitle="Architectural patterns and design decisions">Patterns & Components</SectionTitle>
                <div style={{
                    display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 26,
                    marginBottom: 24, maxWidth: 910, margin: "0 auto"
                }}>
                    <GlassCard>
                        <div style={{ fontWeight: 700, color: '#2073cd', marginBottom: 3 }}>Microservices Architecture</div>
                        <div style={{ color: "#435a7d" }}>Independent, scalable services for each domain</div>
                    </GlassCard>
                    <GlassCard>
                        <div style={{ fontWeight: 700, color: '#2073cd', marginBottom: 3 }}>Event-Driven Design</div>
                        <div style={{ color: "#435a7d" }}>Asynchronous communication via message queues</div>
                    </GlassCard>
                    <GlassCard>
                        <div style={{ fontWeight: 700, color: '#2073cd', marginBottom: 3 }}>API Gateway & BFF</div>
                        <div style={{ color: "#435a7d" }}>Backend-for-frontend pattern for optimized client experiences</div>
                    </GlassCard>
                    <GlassCard>
                        <div style={{ fontWeight: 700, color: '#2073cd', marginBottom: 3 }}>Serverless Functions</div>
                        <div style={{ color: "#435a7d" }}>Auto-scaling compute for variable workloads</div>
                    </GlassCard>
                </div>

                {/* Component Map SYMMETRIC */}
                <SectionTitle subtitle="High-level system service grouping">Component Map</SectionTitle>
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: 26, maxWidth: 720, margin: "0 auto 32px auto"
                }}>
                    {coreServices.map((name) =>
                        <GlassCard key={name}>
                            <div style={{ fontWeight: 700, color: '#2073cd', fontSize: isMobile ? 15 : 16, marginBottom: 3 }}>Core Service</div>
                            <div style={{ color: "#232751", fontSize: isMobile ? 13 : 15 }}>{name}</div>
                        </GlassCard>
                    )}
                    {supportingServices.map((name) =>
                        <GlassCard key={name}>
                            <div style={{ fontWeight: 700, color: '#2073cd', fontSize: isMobile ? 15 : 16, marginBottom: 3 }}>Supporting Service</div>
                            <div style={{ color: "#232751", fontSize: isMobile ? 13 : 15 }}>{name}</div>
                        </GlassCard>
                    )}
                </div>

                {/* CONTRIBUTION PANELS: 3 balok */}
                <SectionTitle subtitle="Personal impact and project outcomes">My Contribution & Results</SectionTitle>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                    gap: 24,
                    maxWidth: 1060,
                    margin: "0 auto 10px"
                }}>
                    {[
                        {
                            title: "Role & Responsibilities",
                            content: (
                                <div style={{ fontSize: 14, color: "#232751", lineHeight: "1.55" }}>
                                    As the lead architect, I designed the complete system architecture from context to deployment views. I conducted stakeholder interviews, defined quality attributes, selected appropriate architectural patterns, and documented design decisions. I also created prototypes for critical components and established CI/CD pipelines for automated deployments.
                                </div>
                            )
                        },
                        {
                            title: "Key Results",
                            content: (
                                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                                    <div>
                                        <span style={{ fontWeight: 800, fontSize: 30, color: "#2073cd", marginRight: 5 }}>40%</span>
                                        <span style={{ color: "#232751", fontWeight: 500 }}>Reduction in infrastructure costs via serverless adoption</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 800, fontSize: 30, color: "#2073cd", marginRight: 5 }}>10K</span>
                                        <span style={{ color: "#232751", fontWeight: 500 }}>Concurrent users supported</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 800, fontSize: 30, color: "#2073cd", marginRight: 5 }}>99.9%</span>
                                        <span style={{ color: "#232751", fontWeight: 500 }}>System uptime achieved through HA design</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 800, fontSize: 30, color: "#2073cd", marginRight: 5 }}>85ms</span>
                                        <span style={{ color: "#232751", fontWeight: 500 }}>Average API response time at p95</span>
                                    </div>
                                </div>
                            )
                        },
                        {
                            title: "Reflection",
                            content: (
                                <div style={{ fontSize: 14, color: "#232751", lineHeight: "1.58" }}>
                                    This project reinforced the importance of understanding business constraints and user needs before diving into technical solutions. The trade-off analysis between consistency and availability taught me valuable lessons about distributed systems design.
                                    <br /><br />
                                    <b style={{ color: "#2073cd" }}>Future improvements:</b> ML for dynamic pricing optimization, enhancing real-time analytics dashboard, blockchain for ticket authenticity.
                                </div>
                            )
                        },
                    ].map((panel, idx) => (
                        <GlassCard key={panel.title}>
                            <div style={{ fontWeight: 700, color: "#2073cd", fontSize: 18, marginBottom: 10 }}>
                                {panel.title}
                            </div>
                            {panel.content}
                        </GlassCard>
                    ))}
                </div>

            </div>
        </div>
    );
}
