import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

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

const SHADOWS = {
    light: "0 2px 12px #e6f0f925",
    avatar: "0 4px 12px rgba(0,0,0,0.08)",
    button: "0 2px 12px #7B9ACC44",
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
                ...style,
            }}
        />
    );
}

/* ────────────────────── MAIN COMPONENT ────────────────────── */
export default function ContactPage() {
    const form = useRef();
    const isMobile = useIsMobile();
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
                color: COLORS.text,
                padding: isMobile ? "0 4vw" : "0 15px",
                fontFamily: "'Segoe UI', Arial, sans-serif",
            }}
        >
            {/* Header */}
            <h1
                style={{
                    fontWeight: 900,
                    fontSize: isMobile ? 28 : 38,
                    color: COLORS.primary,
                    marginBottom: isMobile ? 15 : 24,
                    textAlign: "center",
                }}
            >
                Contact Me
            </h1>

            {/* Intro */}
            <p
                style={{
                    fontSize: isMobile ? 15 : 18,
                    marginBottom: isMobile ? 18 : 23,
                    textAlign: "center",
                    lineHeight: 1.6,
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
                    fontSize: isMobile ? 15 : 20,
                    fontWeight: 700,
                    margin: isMobile ? 12 : 20,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: isMobile ? 8 : 28,
                }}
            >
                <a
                    href="https://www.linkedin.com/in/yafiefarabi0710/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: COLORS.primary, textDecoration: "none" }}
                >
                    LinkedIn
                </a>
                <a
                    href="mailto:yaafiiee.10@gmail.com"
                    style={{ color: COLORS.primary, textDecoration: "none" }}
                >
                    yaafiiee.10@gmail.com
                </a>
            </div>

            {/* Avatar + Form Layout */}
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: isMobile ? 20 : 40,
                    marginTop: isMobile ? 30 : 50,
                }}
            >
                {/* Picture Placeholder */}
                <div
                    style={{
                        flexShrink: 0,
                        width: isMobile ? 120 : 160,
                        height: isMobile ? 120 : 160,
                        borderRadius: "50%",
                        background: "#E6EBF5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        boxShadow: SHADOWS.avatar,
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
                        maxWidth: isMobile ? "100%" : 420,
                        background: COLORS.light,
                        borderRadius: 14,
                        padding: isMobile ? "16px 6vw" : "32px",
                        boxShadow: SHADOWS.light,
                    }}
                >
                    <FormInput name="name" placeholder="Your Name" required />
                    <FormInput name="user_email" placeholder="Your Email" type="email" required />
                    <FormInput name="subject" placeholder="Subject" required />
                    <FormInput name="message" placeholder="Your message" type="textarea" required rows={4} />

                    <input type="hidden" name="time" value={today} />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            background: COLORS.primary,
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: isMobile ? 15 : 17,
                            border: 0,
                            borderRadius: 10,
                            padding: isMobile ? "11px 0" : "14px 0",
                            marginTop: 8,
                            cursor: "pointer",
                            boxShadow: SHADOWS.button,
                            transition: "background .2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.secondary)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.primary)}
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* Footer */}
            <p
                style={{
                    marginTop: 40,
                    fontSize: 13,
                    color: "#7788AA",
                    textAlign: "center",
                }}
            >
                © {new Date().getFullYear()} Yafie Farabi. All rights reserved.
            </p>
        </div>
    );
}