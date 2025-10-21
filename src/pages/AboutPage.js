import React, { useState, useEffect } from "react";

// Replace with your actual values & options
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

// animated bar component
function AnimatedBar({ value, max = 2, color = "#7B9ACC", label }) {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        setTimeout(() => setWidth((value / max) * 100), 200);
    }, [value, max]);
    return (
        <div style={{
            background: "#D0DEFA", height: 24, borderRadius: 16, minWidth: 60, marginTop: 6, marginBottom: 4,
            position: "relative", width: 260, maxWidth: "60vw"
        }}>
            <div style={{
                height: 24,
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
                    position: "absolute", left: "50%", transform: "translateX(-50%)", width: "90%", textAlign: "center"
                }}>
                    {label} {value} yr
                </span>
            </div>
        </div>
    );
}

export default function AboutPage() {
    const [section, setSection] = useState("languages");

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
        <div style={{ maxWidth: 700, margin: "60px auto", color: "#232751", padding: "0 12px" }}>
            <h1 style={{ fontWeight: 900, fontSize: 38, color: "#7B9ACC" }}>About Me</h1>
            <p style={{ fontSize: 18, margin: "34px 0", color: "#334" }}>
                I’m really interested in front-end development because I enjoy turning ideas and designs into something interactive and alive. I like the balance between logic and creativity, writing code that not only works but also looks clean and intuitive. When I started learning HTML and CSS, I realised I actually enjoy making things functional rather than only focusing on the visual side. But I still value good design, so I always try to follow design principles and make sure my code represents the original concept properly.
            </p>

            <div style={{
                display: "flex", justifyContent: "center", gap: 25,
                margin: "38px 0", minHeight: 40
            }}>
                {SECTION_TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setSection(tab.key)}
                        style={{
                            background: section === tab.key ? "#7B9ACC" : "#ECEFFE",
                            color: section === tab.key ? "#fff" : "#232751",
                            fontWeight: 700,
                            border: 0, borderRadius: 11, padding: "9px 28px", fontSize: 17,
                            boxShadow: section === tab.key ? "0 2px 12px #acbedd35" : "none",
                            transition: "all .16s"
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div style={{
                minHeight: 320, display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "flex-start", transition: "all .35s"
            }}>
                {skillList}
            </div>
        </div>
    );
}
