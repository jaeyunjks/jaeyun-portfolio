import React, { useState, useEffect } from "react";

// Skills data as before
const LANG_SKILLS = [
    { lang: "Java", lvl: 2 },
    { lang: "Python", lvl: 2 },
    { lang: "HTML/CSS/JS", lvl: 2 },
    { lang: "SQL", lvl: 1.5 },
    { lang: "C++", lvl: 1 },
];
const FRAMEWORKS = [
    { name: "React", lvl: 2 },
    { name: "Django", lvl: 1.5 },
    { name: "ASP.NET MVC", lvl: 1 },
    { name: "Node.js", lvl: 1 },
    { name: "JSP", lvl: 1 },
    { name: "Bootstrap", lvl: 2 }
];
const DEVTOOLS = [
    { name: "Git", lvl: 2 },
    { name: "Jira", lvl: 1.5 },
    { name: "MySQL", lvl: 2 },
    { name: "MongoDB", lvl: 1 },
    { name: "VSCode", lvl: 2 },
    { name: "Figma", lvl: 1.5 }
];
const SECTION_TABS = [
    { key: "languages", label: "Languages" },
    { key: "frameworks", label: "Frameworks / Tech" },
    { key: "tools", label: "Dev Tools" },
];

// Responsive detector hook
function useIsMobile(breakpoint = 600) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < breakpoint);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);
    return isMobile;
}

// Animated bar component (responsive width)
function AnimatedBar({ value, max = 2, color = "#7B9ACC", label }) {
    const isMobile = useIsMobile();
    const [width, setWidth] = useState(0);
    useEffect(() => {
        setTimeout(() => setWidth((value / max) * 100), 200);
    }, [value, max]);
    const barWidth = isMobile ? "92vw" : 260;
    return (
        <div style={{
            background: "#D0DEFA",
            height: isMobile ? 22 : 24,
            borderRadius: 16,
            minWidth: isMobile ? 80 : 60,
            marginTop: isMobile ? 9 : 6,
            marginBottom: isMobile ? 7 : 4,
            position: "relative",
            width: barWidth,
            maxWidth: isMobile ? "99vw" : "60vw",
            overflow: "hidden"
        }}>
            <div style={{
                height: isMobile ? 22 : 24,
                borderRadius: 16,
                background: color,
                width: `${width}%`,
                color: "#fff",
                fontWeight: 800,
                textAlign: "center",
                position: "absolute",
                transition: "width .8s cubic-bezier(.81,-0.22,.32,1.17)"
            }}>
                <span style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "90%",
                    textAlign: "center",
                    fontSize: isMobile ? 14 : 16,
                }}>
                    {label} {value} yr
                </span>
            </div>
        </div>
    );
}

export default function AboutPage() {
    const [section, setSection] = useState("languages");
    const isMobile = useIsMobile();

    let skillList;
    if (section === "languages") skillList = LANG_SKILLS.map(s =>
        <AnimatedBar key={s.lang} value={s.lvl} label={s.lang + ":"} color="#7B9ACC" />
    );
    if (section === "frameworks") skillList = FRAMEWORKS.map(f =>
        <AnimatedBar key={f.name} value={f.lvl} label={f.name + ":"} color="#A4B0E9" />
    );
    if (section === "tools") skillList = DEVTOOLS.map(t =>
        <AnimatedBar key={t.name} value={t.lvl} label={t.name + ":"} color="#BAC8E0" />
    );

    return (
        <div
            style={{
                maxWidth: isMobile ? "97vw" : 700,
                margin: isMobile ? "22px auto" : "60px auto",
                color: "#232751",
                padding: isMobile ? "0 4vw" : "0 18px"
            }}>
            <h1
                style={{
                    fontWeight: 900,
                    fontSize: isMobile ? 27 : 38,
                    color: "#7B9ACC",
                    marginBottom: isMobile ? 17 : 24
                }}
            >About Me</h1>
            <p
                style={{
                    fontSize: isMobile ? 15 : 18,
                    margin: isMobile ? "16px 0" : "34px 0",
                    color: "#334",
                    lineHeight: isMobile ? 1.56 : 1.7,
                    textAlign: isMobile ? "justify" : "left"
                }}
            >
                I’m really interested in front-end development because I enjoy turning ideas and designs into something interactive and alive. I like the balance between logic and creativity, writing code that not only works but also looks clean and intuitive. When I started learning HTML and CSS, I realised I actually enjoy making things functional rather than only focusing on the visual side. But I still value good design, so I always try to follow design principles and make sure my code represents the original concept properly.
            </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: isMobile ? 10 : 25,
                    margin: isMobile ? "20px 0" : "38px 0",
                    minHeight: isMobile ? 30 : 40,
                    width: "100%",
                }}
            >
                {SECTION_TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setSection(tab.key)}
                        style={{
                            background: section === tab.key ? "#7B9ACC" : "#ECEFFE",
                            color: section === tab.key ? "#fff" : "#232751",
                            fontWeight: 700,
                            border: 0,
                            borderRadius: 11,
                            padding: isMobile ? "7px 14vw" : "9px 28px",
                            fontSize: isMobile ? 15 : 17,
                            boxShadow: section === tab.key ? "0 2px 12px #acbedd35" : "none",
                            transition: "all .16s",
                            marginBottom: isMobile ? 7 : 0
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div
                style={{
                    minHeight: isMobile ? 110 : 320,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    transition: "all .35s"
                }}
            >
                {skillList}
            </div>
        </div>
    );
}
