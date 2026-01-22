import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useTheme } from "../context/ThemeContext";

/* ────────────────────── CONSTANTS ────────────────────── */
const COLORS = {
    primary: "#7B9ACC",
    secondary: "#6A8BD6",
    text: "#232751",
    light: "#F9FAFC",
    border: "#CAD3E2",
    shadow: "#e6f0f925",
    hover: "#E1E8F7",
};

/* ────────────────────── RESPONSIVE HOOK ────────────────────── */
function useIsMobile(breakpoint = 600) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);
    return isMobile;
}

/* ────────────────────── REUSABLE FORM INPUT ────────────────────── */
function FormInput({ name, placeholder, type = "text", required, rows, style = {} }) {
    const isMobile = useIsMobile();
    return (
        <input
            name={name}
            placeholder={placeholder}
            type={type}
            required={required}
            rows={rows}
            style={{
                display: "block",
                width: "100%",
                marginBottom: isMobile ? 12 : 18,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontSize: isMobile ? 15 : 16,
                padding: isMobile ? 10 : 12,
                resize: type === "textarea" ? "vertical" : "none",
                minHeight: type === "textarea" ? (isMobile ? 64 : 90) : "auto",
                background: "rgba(255,255,255,0.1)",
                color: "var(--text-primary)",
                ...style,
            }}
        />
    );
}

/* ────────────────────── MAIN COMPONENT ────────────────────── */
export default function ContactPage() {
    const form = useRef();
    const isMobile = useIsMobile();
    const { theme } = useTheme();
    const today = new Date().toLocaleString();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm("service_jkgvb2e", "template_hm943z9", form.current, {
                publicKey: "cfBYxuTPnUhXt9G1j",
            })
            .then(() => {
                alert("Message sent successfully!");
                form.current.reset();
            })
            .catch((error) => {
                alert("Failed to send message.\n" + error.text);
            });
    };

    return (
        <div
            style={{
                maxWidth: isMobile ? "98vw" : 960,
                margin: isMobile ? "30px auto 10px" : "80px auto 32px",
                color: "var(--text-primary)",
                padding: isMobile ? "0 4vw" : "0 15px",
                fontFamily: "'Segoe UI', Arial, sans-serif",
            }}
        >
            {/* Header */}
            <h1
                style={{
                    fontWeight: 900,
                    fontSize: isMobile ? 32 : 44,
                    color: "var(--accent)",
                    marginBottom: isMobile ? 20 : 32,
                    textAlign: "center",
                    textShadow: theme === "dark" ? "0 2px 12px rgba(165,214,255,0.35)" : "none",
                }}
            >
                Contact Me
            </h1>

            {/* Intro */}
            <p
                style={{
                    fontSize: isMobile ? 16 : 18,
                    marginBottom: isMobile ? 20 : 28,
                    textAlign: "center",
                    lineHeight: 1.7,
                    color: "var(--text-primary)",
                    textShadow: theme === "dark" ? "0 1px 6px rgba(0,0,0,0.7)" : "none",
                    opacity: theme === "dark" ? 0.98 : 0.95,
                }}
            >
                Thank you for your interest in getting in touch!<br />
                I value open communication and welcome any inquiries, feedback, or
                collaboration opportunities.<br /><br />
                Feel free to reach out using the form below or via:
            </p>

            {/* Social Links */}
            <div
                style={{
                    fontSize: isMobile ? 16 : 20,
                    fontWeight: 700,
                    margin: isMobile ? 16 : 24,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: isMobile ? 12 : 32,
                }}
            >
                <a
                    href="https://www.linkedin.com/in/yafiefarabi0710/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)", textDecoration: "none" }}
                >
                    LinkedIn
                </a>
                <a
                    href="mailto:yaafiiee.10@gmail.com"
                    style={{ color: "var(--accent)", textDecoration: "none" }}
                >
                    Mail
                </a>
            </div>

            {/* Avatar + Form Layout */}
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: isMobile ? 24 : 48,
                    marginTop: isMobile ? 32 : 60,
                }}
            >
                {/* Picture Placeholder */}
                <div
                    style={{
                        flexShrink: 0,
                        width: isMobile ? 140 : 180,
                        height: isMobile ? 140 : 180,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                        border: "2px solid rgba(165,214,255,0.3)",
                    }}
                >
                    <img
                        src="/YafiePP.png"
                        alt="Your portrait"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>

                {/* Form */}
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    style={{
                        flex: 1,
                        maxWidth: isMobile ? "100%" : 480,
                        background: theme === "dark" ? "rgba(30, 41, 59, 0.45)" : COLORS.light,
                        backdropFilter: theme === "dark" ? "blur(16px)" : "none",
                        WebkitBackdropFilter: theme === "dark" ? "blur(16px)" : "none",
                        borderRadius: 20,
                        padding: isMobile ? "20px 6vw" : "40px",
                        border: theme === "dark" ? "1px solid rgba(165,214,255,0.25)" : "1px solid #CAD3E2",
                        boxShadow: theme === "dark"
                            ? "0 16px 48px rgba(0,0,0,0.5), inset 0 0 24px rgba(165,214,255,0.12)"
                            : "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                >
                    <FormInput name="name" placeholder="Your Name" required />
                    <FormInput name="user_email" placeholder="Your Email" type="email" required />
                    <FormInput name="subject" placeholder="Subject" required />
                    <FormInput name="message" placeholder="Your message" type="textarea" required rows={5} />

                    <input type="hidden" name="time" value={today} />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            background: "var(--accent)",
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: isMobile ? 16 : 18,
                            border: 0,
                            borderRadius: 12,
                            padding: isMobile ? "12px 0" : "14px 0",
                            marginTop: 12,
                            cursor: "pointer",
                            boxShadow: "0 6px 20px rgba(123,154,204,0.4)",
                            transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 10px 30px rgba(123,154,204,0.5)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(123,154,204,0.4)";
                        }}
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* Footer */}
            <p
                style={{
                    marginTop: 48,
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    textAlign: "center",
                }}
            >
                © {new Date().getFullYear()} Yafie Farabi. All rights reserved.
            </p>
        </div>
    );
}