import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Converts Google Drive share URL into preview URL for embedding in an iframe
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
        content: `I sit down in my chair and relax for a bit while I take in what I need to do for the day. When I think
about how much work I have to do and how long I have to be sitting down for, I get worried and a
little stressed about how much work there is and if I'll be ok sitting down for so long. Even though I
can make it through most days just fine, it's really exhausting and draining though afterwards. It's
really difficult to manage my time when I feel so much pressure on myself to get everything done as
soon as I can so that I don't have to worry about it later but it just never ends. I don't know what I
can do other than keep working until it's gone. I've even been having trouble making time for food
breaks, let alone exercise, and it just gets worse when I waste my time on youtube or instagram
instead of working. It's just a spiral that never feels like it's getting better. Doing the work sometimes
cheers me up because I love doing digital art even when it's for work, and I enjoy watching videos
too but I feel like I'll eventually burn out on everything because I just want to do it so much too. My
posture has also been getting really bad recently since I have to sit still so much focused on a screen,
I can barely get up off the chair sometimes after I finish. I feel like I've tried everything to keep
myself on a schedule but nothing seems to work, and I live alone so I don't have anyone to help me
with it either.`
    },
    {
        title: "Future Use Scenario",
        desc: "Design solution improves wellbeing and productivity.",
        content: `I start everyday at the same time, not too early in the morning because I can work from home, so
usually I start at 9am. Sometimes, I even stay in bed a little after my phone gives me a notification to
wake up for the day and eat breakfast, but usually I start then. Afterwards, I walk over to my desk and
open up the laptop, while also checking my day's schedule on my phone. Feeling confident with the
workload I've got set for the day, I go through my to do list as they alert me on my phone. I've since
corrected my bad work habits thanks to the desk's sensors telling me when I'm acting too anxious
working. After a couple hours, my phone gives me forewarning before the desk lowers itself for the
scheduled break for the day, and usually I decide to either exercise and make a small snack, or drag a
chair over to have a quick break on social media or draw a little. I've been feeling really healthy and on
top of things ever since I've been able to follow the schedules I've set, and the table enforcing the
schedule alongside phone notifications really feels like someone tapping on my shoulder and helping
me along my day. It's really reassuring. Since I started to following the schedule I set for myself, I feel
like my workload has become so much lighter and manageable even though nothing has changed.
Sometimes I even feel like I can squeeze some meetups with friends in-between my schedule.`
    },
    {
        title: "Storyboard",
        desc: "User flow visual showing solution in context.",
        file: "/storyboard.png",
        type: "image"
    },
    {
        title: "Specified Goal",
        desc: "User goal for prototype evaluation: setup a personalized sit/stand schedule and activity sensor preferences.",
        content: `To setup or import a personalized sit/stand schedule for the smart standing desk for the week, ...`
    },
    {
        title: "Paper Prototype",
        desc: "Low fidelity paper prototype for initial usability testing.",
        file: "/paperproto.jpg",
        type: "image"
    },
    {
        title: "Figma Mobile App Prototype",
        desc: "Interactive mobile app design, user testing in Figma.",
        videos: [
            {
                label: "Welcome Page",
                url: "https://drive.google.com/file/d/1eohtbytHpW1AswJD07sSirkeM_NsQtOB/view?usp=sharing"
            },
            {
                label: "Main Feature",
                url: "https://drive.google.com/file/d/1X0QyLfJsUNl3RSB7zhszZrwtbW85YBf8/view?usp=sharing"
            }
        ],
        type: "gdrive-multivideo"
    },
    {
        title: "DIA Video",
        desc: "High fidelity demonstration and evaluation video prototypes.",
        videos: [
            {
                label: "DIA Demo",
                url: "https://drive.google.com/file/d/1dSDjvmMtnqEoK_DzWYB28rvRATXTidnw/view?usp=sharing"
            }
        ],
        type: "gdrive-multivideo"
    }
];

const colors = [
    "#C7D8F7", "#D1E1F4", "#F2F8FF", "#EDF2FB", "#EAF6FF", "#D2E6F7", "#F3F8FC", "#F7FAFF", "#DBEAF6"
];

// PDF Modal Popup
function PDFModal({ open, url, onClose }) {
    return open ? (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(60,80,120,0.19)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000
        }}>
            <motion.div
                initial={{ opacity: 0, scale: .88, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 60 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: "#fff",
                    borderRadius: 18,
                    boxShadow: "0 4px 24px #0f143058",
                    padding: 22,
                    width: "96vw",
                    maxWidth: 620,
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        marginLeft: "auto",
                        marginBottom: 9,
                        background: "#7B9ACC",
                        color: "#fff",
                        borderRadius: 7,
                        border: "none",
                        fontWeight: 700,
                        padding: "7px 16px",
                        cursor: "pointer"
                    }}
                >
                    Close
                </button>
                <iframe
                    src={url}
                    title="PDF Viewer"
                    style={{
                        width: "100%",
                        height: "70vh",
                        borderRadius: 10,
                        border: "none",
                        background: "#f8fbff"
                    }}
                />
            </motion.div>
        </div>
    ) : null;
}

// Main Component
export default function InteractionDesignCase() {
    const refs = useRef(CASE_STUDY_STEPS.map(() => React.createRef()));
    const [pdfModal, setPdfModal] = useState({ open: false, url: "" });

    const scrollToStep = idx => {
        refs.current[idx].current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div style={{
            maxWidth: 820,
            margin: "48px auto",
            padding: 20,
            position: "relative"
        }}>
            <motion.h1
                initial={{ opacity: 0, y: -24, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: .8 }}
                style={{
                    fontSize: 34,
                    color: "#7B9ACC",
                    fontWeight: 900,
                    marginBottom: 22,
                    letterSpacing: 0.5
                }}>
                Interaction Design Project
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .4, duration: .6 }}
                style={{ marginBottom: 23, fontSize: 17 }}
            >
                Scroll to view each animated step, or click below to jump:
            </motion.div>

            <motion.nav
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .6, duration: .5 }}
                style={{
                    display: "flex",
                    gap: 14,
                    flexWrap: "wrap",
                    marginBottom: 28,
                    padding: "6px 0"
                }}
            >
                {CASE_STUDY_STEPS.map((step, idx) => (
                    <motion.button
                        key={step.title}
                        whileHover={{ scale: 1.09, backgroundColor: "#E3EDFF", color: "#527DCA" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => scrollToStep(idx)}
                        style={{
                            fontWeight: 600,
                            letterSpacing: 0.6,
                            color: "#7B9ACC",
                            background: "#F6FAFF",
                            border: "1.6px solid #D7E2FA",
                            borderRadius: 8,
                            padding: "7px 10px",
                            cursor: "pointer",
                            transition: "all .18s",
                            boxShadow: "0 1px 4px #c0c7ef0b"
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
                    initial={{ opacity: 0, y: 40, scale: 0.97, boxShadow: "0 2px 26px #c0c7ef00" }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        boxShadow: "0 4px 26px #a2b6f444"
                    }}
                    whileHover={{
                        scale: 1.022,
                        boxShadow: "0 8px 28px #7b9acc22",
                        backgroundColor: colors[idx % colors.length]
                    }}
                    transition={{ delay: idx * 0.15, duration: 0.73, type: "spring" }}
                    viewport={{ once: true, amount: 0.19 }}
                    style={{
                        marginBottom: 38,
                        background: colors[idx % colors.length],
                        borderRadius: 14,
                        padding: 19,
                        boxShadow: "0 2px 13px #c0c7ef21",
                        cursor: "pointer"
                    }}>
                    <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 6 }}>
                        {step.title}
                    </div>
                    <div style={{ marginBottom: 7, color: "#232751", fontSize: 17 }}>
                        {step.desc}
                    </div>
                    {/* PDF Modal Button */}
                    {step.file && step.type === "pdf" && (
                        <button
                            onClick={() => setPdfModal({ open: true, url: step.file })}
                            style={{
                                background: "#7B9ACC",
                                color: "#fff",
                                borderRadius: 6,
                                padding: "6px 15px",
                                textDecoration: "none",
                                fontWeight: 600,
                                marginTop: 8,
                                border: "none",
                                cursor: "pointer"
                            }}>
                            View PDF
                        </button>
                    )}

                    {/* Images */}
                    {step.file && step.type === "image" && (
                        <motion.img
                            src={step.file}
                            alt={step.title}
                            initial={{ opacity: 0, scale: .94 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: .73 }}
                            style={{
                                width: "96%",
                                maxWidth: 510,
                                borderRadius: 10,
                                marginTop: 8,
                                boxShadow: "0 2px 18px #becae921"
                            }}
                        />
                    )}

                    {/* Multi Google Drive videos */}
                    {step.videos && step.type === "gdrive-multivideo" && (
                        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                            {step.videos.map((video, i) => (
                                <motion.div
                                    key={video.label}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: .64, delay: i * 0.24 }}
                                    style={{
                                        width: 320,
                                        minWidth: 230,
                                        maxWidth: "100%",
                                        marginTop: 8,
                                        borderRadius: 10,
                                        overflow: "hidden",
                                        boxShadow: "0 2px 18px #becae921",
                                        background: "#f6f8fa",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}
                                >
                                    <div style={{
                                        fontWeight: 600,
                                        margin: "10px 0 6px",
                                        color: "#527DCA"
                                    }}>
                                        {video.label}
                                    </div>
                                    <iframe
                                        src={toGDrivePreviewUrl(video.url)}
                                        allow="autoplay"
                                        frameBorder="0"
                                        style={{
                                            width: "100%",
                                            height: "210px",
                                            borderRadius: "10px"
                                        }}
                                        allowFullScreen
                                        title={video.label}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Figma embed */}
                    {step.file && step.type === "figma" && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: .72, delay: .13 }}
                            style={{
                                width: "100%",
                                minHeight: 400,
                                marginTop: 12,
                                borderRadius: 10,
                                boxShadow: "0 2px 12px #c7d8f733",
                                overflow: "hidden"
                            }}>
                            <iframe
                                src={step.file}
                                allowFullScreen
                                width="100%"
                                height="500"
                                style={{
                                    border: "none",
                                    borderRadius: "10px",
                                    minHeight: 430,
                                    background: "#fff"
                                }}
                                title={step.title}
                            />
                        </motion.div>
                    )}

                    {/* Text Content */}
                    {step.content && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: .72, delay: .13 }}
                            style={{
                                fontSize: 15,
                                color: "#565",
                                background: "#F4F8FC",
                                margin: "12px 0 0",
                                padding: 13,
                                borderRadius: 9,
                                boxShadow: "0 2px 7px #c7d8f711"
                            }}>
                            {step.content}
                        </motion.div>
                    )}
                </motion.section>
            ))}
        </div>
    );
}
