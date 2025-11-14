import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Google Drive: Convert share link to preview
function toGDrivePreviewUrl(url) {
    const match = url.match(/\/file\/d\/([^/]+)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
}

const CASE_STUDY_STEPS = [
    {
        title: "Journal Entry",
        desc: "Initial reflections and thoughts regarding daily challenges incorporating design principles.",
        file: "/journal-entry.pdf",
        type: "pdf"
    },
    {
        title: "Affinity Diagram",
        desc: "Visual mapping of core pain points facing the persona.",
        file: "/affinity-diagram.png",
        type: "image"
    },
    {
        title: "Persona",
        desc: "Full persona outlining user background, needs, and motivations.",
        file: "/persona.png",
        type: "image"
    },
    {
        title: "Problem Scenario",
        desc: "Description of daily time management struggles, work/life balance and burnout.",
        content: `I sit down in my chair and relax for a bit while I take in what I need to do for the day. When I think about how much work I have to do and how long I have to be sitting down for, I get worried and a little stressed about how much work there is and if I'll be ok sitting down for so long. Even though I can make it through most days just fine, it's really exhausting and draining though afterwards. It's really difficult to manage my time when I feel so much pressure on myself to get everything done as soon as I can so that I don't have to worry about it later but it just never ends. I don't know what I can do other than keep working until it's gone. I've even been having trouble making time for food breaks, let alone exercise, and it just gets worse when I waste my time on youtube or instagram instead of working. It's just a spiral that never feels like it's getting better. Doing the work sometimes cheers me up because I love doing digital art even when it's for work, and I enjoy watching videos too but I feel like I'll eventually burn out on everything because I just want to do it so much too. My posture has also been getting really bad recently since I have to sit still so much focused on a screen, I can barely get up off the chair sometimes after I finish. I feel like I've tried everything to keep myself on a schedule but nothing seems to work, and I live alone so I don't have anyone to help me with it either.`,
        expandable: true
    },
    {
        title: "Future Use Scenario",
        desc: "Design solution improves wellbeing and productivity.",
        content: `I start everyday at the same time, not too early in the morning because I can work from home, so usually I start at 9am. Sometimes, I even stay in bed a little after my phone gives me a notification to wake up for the day and eat breakfast, but usually I start then. Afterwards, I walk over to my desk and open up the laptop, while also checking my day's schedule on my phone. Feeling confident with the workload I've got set for the day, I go through my to do list as they alert me on my phone. I've since corrected my bad work habits thanks to the desk's sensors telling me when I'm acting too anxious working. After a couple hours, my phone gives me forewarning before the desk lowers itself for the scheduled break for the day, and usually I decide to either exercise and make a small snack, or drag a chair over to have a quick break on social media or draw a little. I've been feeling really healthy and on top of things ever since I've been able to follow the schedules I've set, and the table enforcing the schedule alongside phone notifications really feels like someone tapping on my shoulder and helping me along my day. It's really reassuring. Since I started to following the schedule I set for myself, I feel like my workload has become so much lighter and manageable even though nothing has changed. Sometimes I even feel like I can squeeze some meetups with friends in-between my schedule.`,
        expandable: true
    },
    {
        title: "Storyboard",
        desc: "User flow visual showing solution in context.",
        file: "/storyboard.png",
        type: "image"
    },
    {
        title: "Specified Goal",
        desc: "User goal for prototype evaluation: setup a personalised sit/stand schedule and activity sensor preferences.",
        content: `To setup or import a personalised sit/stand schedule for the smart standing desk for the week, and configure activity sensor preferences to monitor posture and anxiety levels during work. The user should be able to set custom break reminders, adjust desk height automation, and view weekly progress reports.`,
        expandable: true
    },
    {
        title: "Paper Prototype",
        desc: "Low fidelity paper prototype for initial usability testing.",
        images: [
            "/paperproto1.png",
            "/paperproto2.png",
            "/paperproto3.png"
        ],
        type: "slideshow"
    },
    {
        title: "Figma Mobile App Prototype",
        desc: "Interactive mobile app design, user testing in Figma.",
        videos: [
            {
                label: "Welcome Page",
                url: "https://drive.google.com/file/d/1X0QyLfJsUNl3RSB7zhszZrwtbW85YBf8/view?usp=drive_link"
            },
            {
                label: "Main Feature",
                url: "https://drive.google.com/file/d/1eohtbytHpW1AswJD07sSirkeM_NsQtOB/view?usp=drive_link"
            }
        ],
        type: "gdrive-iphone-sidebyside"
    },
    {
        title: "DIA Video",
        desc: "High fidelity demonstration and evaluation video prototypes.",
        videos: [
            {
                url: "https://drive.google.com/file/d/1dSDjvmMtnqEoK_DzWYB28rvRATXTidnw/view?usp=drive_link"
            }
        ],
        type: "gdrive-multivideo"
    }
];

const colors = [
    "#C7D8F7", "#D1E1F4", "#F2F8FF", "#EDF2FB", "#EAF6FF", "#D2E6F7", "#F3F8FC", "#F7FAFF", "#DBEAF6"
];

// PDF Modal
function PDFModal({ open, url, onClose }) {
    if (!open) return null;
    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(60,80,120,0.19)", display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 2000
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 60 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px #0f143058",
                    padding: 22, width: "96vw", maxWidth: 620, maxHeight: "90vh",
                    display: "flex", flexDirection: "column"
                }}
            >
                <button onClick={onClose} style={{
                    marginLeft: "auto", marginBottom: 9, background: "#7B9ACC",
                    color: "#fff", borderRadius: 7, border: "none", fontWeight: 700,
                    padding: "7px 16px", cursor: "pointer"
                }}>
                    Close
                </button>
                <iframe src={url} title="PDF Viewer" style={{
                    width: "100%", height: "70vh", borderRadius: 10, border: "none", background: "#f8fbff"
                }} />
            </motion.div>
        </div>
    );
}

// Expandable Text — Read More di POJOK KANAN BAWAH (Neat!)
function ExpandableText({ text, maxLines = 3 }) {
    const [expanded, setExpanded] = useState(false);
    const lineHeight = 26;
    const maxHeight = maxLines * lineHeight;
    const maxChars = 400; // ≈ 3 baris

    const shouldShowMore = text.length > maxChars;

    return (
        <div style={{ position: "relative" }}>
            <div
                style={{
                    maxHeight: expanded ? "none" : maxHeight,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                    lineHeight: `${lineHeight}px`,
                    fontSize: 15.5,
                    color: "#333",
                    paddingBottom: expanded ? 0 : 40 // beri ruang buat tombol
                }}
            >
                {text}
            </div>

            {/* READ MORE — Pojok Kanan Bawah */}
            {!expanded && shouldShowMore && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        background: "rgba(248, 251, 255, 0.92)",
                        backdropFilter: "blur(4px)",
                        borderRadius: 12,
                        padding: "6px 12px",
                        boxShadow: "0 2px 8px rgba(123,154,204,0.2)",
                        zIndex: 1
                    }}
                >
                    <button
                        onClick={() => setExpanded(true)}
                        style={{
                            background: "transparent",
                            color: "#7B9ACC",
                            border: "none",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            padding: 0,
                            transition: "color 0.2s"
                        }}
                        onMouseEnter={e => e.target.style.color = "#527DCA"}
                        onMouseLeave={e => e.target.style.color = "#7B9ACC"}
                    >
                        Read More
                    </button>
                </div>
            )}

            {/* SHOW LESS — Muncul setelah expand */}
            {expanded && (
                <div style={{ textAlign: "right", marginTop: 12 }}>
                    <button
                        onClick={() => setExpanded(false)}
                        style={{
                            background: "#E3EDFF",
                            color: "#527DCA",
                            border: "none",
                            borderRadius: 8,
                            padding: "6px 14px",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer"
                        }}
                    >
                        Show Less
                    </button>
                </div>
            )}
        </div>
    );
}

// Slideshow
function Slideshow({ images }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: 580, margin: "18px auto" }}>
            <motion.img
                key={index}
                src={images[index]}
                alt={`Paper Prototype ${index + 1}`}
                initial={{ opacity: 0, x: 120 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -120 }}
                transition={{ duration: 0.7 }}
                style={{
                    width: "100%",
                    borderRadius: 18,
                    boxShadow: "0 10px 36px rgba(123,154,204,0.3)",
                    border: "1px solid #e2e8f0"
                }}
            />
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                            width: 14, height: 14, borderRadius: "50%",
                            background: i === index ? "#7B9ACC" : "#D0DEFA",
                            border: "none", cursor: "pointer",
                            transition: "all 0.3s"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

// iPhone Frame — VIDEO UTUH, NO CROP, NO ZOOM
function IPhoneFrameSmall({ children }) {
    return (
        <div style={{
            position: "relative",
            width: "100%",
            maxWidth: 260,           // Ukuran kecil (ubah sesuka hati)
            height: 560,
            margin: "0 auto",
            background: "#1a1a1a",
            borderRadius: 44,
            padding: "70px 16px 70px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.35), 0 0 16px rgba(123,154,204,0.18)",
            overflow: "hidden"
        }}>
            {/* Notch */}
            <div style={{
                position: "absolute",
                top: 20,
                left: "50%",
                transform: "translateX(-50%)",
                width: 110,
                height: 24,
                background: "#1a1a1a",
                borderRadius: 14
            }} />

            {/* Screen Container */}
            <div style={{
                width: "100%",
                height: "100%",
                background: "#000",  // Background hitam
                borderRadius: 32,
                overflow: "hidden",
                position: "relative"
            }}>
                {/* Video Container — PAKSA ASPECT RATIO */}
                <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div style={{
                        width: "100%",
                        height: "100%",
                        position: "relative"
                    }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function InteractionDesignCase() {
    const refs = useRef(CASE_STUDY_STEPS.map(() => React.createRef()));
    const [pdfModal, setPdfModal] = useState({ open: false, url: "" });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToStep = idx => {
        refs.current[idx].current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div style={{
            maxWidth: 960,
            margin: "64px auto",
            padding: "0 24px",
            position: "relative"
        }}>
            <motion.h1
                initial={{ opacity: 0, y: -32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    fontSize: 40,
                    color: "#7B9ACC",
                    fontWeight: 900,
                    marginBottom: 30,
                    letterSpacing: 0.7,
                    textAlign: "center"
                }}>
                Interaction Design Project
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ marginBottom: 36, fontSize: 18, textAlign: "center", color: "#444" }}
            >
                Scroll to explore each step, or click to jump:
            </motion.div>

            <motion.nav
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                    display: "flex", gap: 18, flexWrap: "wrap",
                    justifyContent: "center", marginBottom: 44
                }}
            >
                {CASE_STUDY_STEPS.map((step, idx) => (
                    <motion.button
                        key={step.title}
                        whileHover={{ scale: 1.12, backgroundColor: "#E3EDFF", color: "#527DCA" }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => scrollToStep(idx)}
                        style={{
                            fontWeight: 600, letterSpacing: 0.6, color: "#7B9ACC",
                            background: "#F6FAFF", border: "2px solid #D7E2FA",
                            borderRadius: 14, padding: "12px 18px", cursor: "pointer",
                            transition: "all .2s", boxShadow: "0 4px 10px #c0c7ef1a"
                        }}
                    >
                        {step.title}
                    </motion.button>
                ))}
            </motion.nav>

            <AnimatePresence>
                <PDFModal open={pdfModal.open} url={pdfModal.url} onClose={() => setPdfModal({ open: false, url: "" })} />
            </AnimatePresence>

            {CASE_STUDY_STEPS.map((step, idx) => (
                <motion.section
                    ref={refs.current[idx]}
                    key={step.title}
                    initial={{ opacity: 0, y: 70, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 48px rgba(123,154,204,0.28)" }}
                    transition={{ delay: idx * 0.16, duration: 0.9, type: "spring", stiffness: 75 }}
                    viewport={{ once: true, amount: 0.2 }}
                    style={{
                        marginBottom: 56,
                        background: colors[idx % colors.length],
                        borderRadius: 24,
                        padding: 32,
                        boxShadow: "0 8px 32px rgba(192,199,239,0.22)",
                        cursor: "pointer"
                    }}
                >
                    <div style={{ fontWeight: 700, fontSize: 30, marginBottom: 12, color: "#232751" }}>
                        {step.title}
                    </div>
                    <div style={{ marginBottom: 14, color: "#2d3748", fontSize: 18, lineHeight: 1.7 }}>
                        {step.desc}
                    </div>

                    {/* PDF */}
                    {step.file && step.type === "pdf" && (
                        <button
                            onClick={() => setPdfModal({ open: true, url: step.file })}
                            style={{
                                background: "#7B9ACC", color: "#fff", borderRadius: 12,
                                padding: "12px 24px", fontWeight: 600, marginTop: 14,
                                border: "none", cursor: "pointer"
                            }}
                        >
                            View PDF
                        </button>
                    )}

                    {/* Image */}
                    {step.file && step.type === "image" && (
                        <motion.img
                            src={step.file}
                            alt={step.title}
                            initial={{ opacity: 0, scale: 0.88 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            style={{
                                width: "100%", maxWidth: 600, borderRadius: 18,
                                marginTop: 18, boxShadow: "0 12px 40px rgba(123,154,204,0.25)"
                            }}
                        />
                    )}

                    {/* Paper Prototype */}
                    {step.type === "slideshow" && <Slideshow images={step.images} />}

                    {/* Figma: 2 iPhone Frames Side-by-Side (Small & Clean) */}
                    {step.type === "gdrive-iphone-sidebyside" && (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 32,
                            flexWrap: "wrap",
                            margin: "32px 0"
                        }}>
                            {step.videos.map((video, i) => (
                                <motion.div
                                    key={video.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    style={{
                                        flex: "1 1 300px",
                                        maxWidth: 360,
                                        textAlign: "center"
                                    }}
                                >
                                    <div style={{
                                        fontWeight: 600,
                                        marginBottom: 12,
                                        color: "#527DCA",
                                        fontSize: 16
                                    }}>
                                        {video.label}
                                    </div>
                                    <IPhoneFrameSmall>
                                        <iframe
                                            src={toGDrivePreviewUrl(video.url)}
                                            allow="autoplay"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                border: 0,
                                                objectFit: "contain",
                                                background: "#000",
                                                display: "block",
                                                aspectRatio: "9 / 19.5"
                                            }}
                                            title={video.label}
                                            allowFullScreen
                                        />
                                    </IPhoneFrameSmall>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* DIA Video */}
                    {step.videos && step.type === "gdrive-multivideo" && (
                        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
                            {step.videos.map((video, i) => (
                                <motion.div
                                    key={video.label}
                                    initial={{ opacity: 0, y: 35 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    style={{
                                        width: 420, marginTop: 18, borderRadius: 18,
                                        overflow: "hidden", boxShadow: "0 12px 40px rgba(123,154,204,0.25)",
                                        background: "#f8f9fc"
                                    }}
                                >
                                    <div style={{ fontWeight: 600, padding: "16px 0", textAlign: "center", color: "#527DCA", fontSize: 18 }}>
                                        {video.label}
                                    </div>
                                    <iframe
                                        src={toGDrivePreviewUrl(video.url)}
                                        allow="autoplay"
                                        style={{ width: "100%", height: "260px", border: "none" }}
                                        title={video.label}
                                        allowFullScreen
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Expandable Text — HANYA JIKA expandable: true */}
                    {step.content && (
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            style={{
                                background: "#F8FBFF",
                                marginTop: 20,
                                padding: 20,
                                borderRadius: 16,
                                boxShadow: "0 4px 16px rgba(199,216,247,0.35)",
                                lineHeight: 1.8
                            }}
                        >
                            {step.expandable ? (
                                <ExpandableText text={step.content} maxLines={3} />
                            ) : (
                                <div style={{ fontSize: 15.5, color: "#333" }}>{step.content}</div>
                            )}
                        </motion.div>
                    )}
                </motion.section>
            ))}
        </div>
    );
}