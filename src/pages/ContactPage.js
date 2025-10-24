import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// Responsive device hook
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

export default function ContactPage() {
    const form = useRef();
    const isMobile = useIsMobile();
    const today = new Date().toLocaleString();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_jkgvb2e",
                "template_hm943z9",
                form.current,
                { publicKey: "cfBYxuTPnUhXt9G1j" }
            )
            .then(
                () => {
                    alert("Message sent successfully!");
                    form.current.reset();
                },
                (error) => {
                    alert("Failed to send message.\n" + error.text);
                }
            );
    };

    return (
        <div
            style={{
                maxWidth: isMobile ? "98vw" : 600,
                margin: isMobile ? "30px auto 10px" : "80px auto 32px",
                color: "#232751",
                textAlign: "center",
                padding: isMobile ? "0 4vw" : "0 15px",
            }}
        >
            <h1
                style={{
                    fontWeight: 900,
                    fontSize: isMobile ? 28 : 38,
                    color: "#7B9ACC",
                    marginBottom: isMobile ? 15 : 24,
                }}
            >
                Contact Me
            </h1>

            <p style={{
                fontSize: isMobile ? 15 : 18,
                marginBottom: isMobile ? 18 : 23,
            }}>
                Thank you for your interest in getting in touch!<br />
                I value open communication and welcome any inquiries, feedback, or
                collaboration opportunities.<br /><br />
                Please don't hesitate to get in touch either by the form below, or:
            </p>

            <div style={{
                fontSize: isMobile ? 15 : 20,
                fontWeight: 700,
                margin: isMobile ? 12 : 20,
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
                justifyContent: "center",
                gap: isMobile ? 8 : 28,
            }}>
                <a
                    href="https://www.linkedin.com/in/yafiefarabi0710/"
                    style={{
                        color: "#7B9ACC",
                        marginBottom: isMobile ? 8 : 0,
                        textDecoration: "none"
                    }}
                >
                    LinkedIn
                </a>
                <a
                    href="mailto:yaafiiee.10@gmail.com"
                    style={{
                        color: "#7B9ACC",
                        textDecoration: "none"
                    }}
                >
                    yaafiiee.10@gmail.com
                </a>
            </div>

            <form
                ref={form}
                onSubmit={sendEmail}
                style={{
                    margin: isMobile ? "22px auto 0" : "58px auto 0",
                    maxWidth: isMobile ? "100vw" : 410,
                    background: "#F9FAFC",
                    borderRadius: 14,
                    padding: isMobile ? "14px 8vw" : "30px",
                    boxShadow: "0 2px 12px #e6f0f925",
                }}
            >
                <input
                    name="name"
                    placeholder="Your Name"
                    required
                    style={{
                        display: "block",
                        width: "100%",
                        marginBottom: isMobile ? 10 : 18,
                        border: "1px solid #CAD3E2",
                        borderRadius: 8,
                        fontSize: isMobile ? 15 : 16,
                        padding: isMobile ? 10 : 12,
                    }}
                />

                <input
                    name="user_email"
                    placeholder="Your Email"
                    required
                    type="email"
                    style={{
                        display: "block",
                        width: "100%",
                        marginBottom: isMobile ? 10 : 18,
                        border: "1px solid #CAD3E2",
                        borderRadius: 8,
                        fontSize: isMobile ? 15 : 16,
                        padding: isMobile ? 10 : 12,
                    }}
                />

                <input
                    name="subject"
                    placeholder="Subject"
                    required
                    style={{
                        display: "block",
                        width: "100%",
                        marginBottom: isMobile ? 10 : 18,
                        border: "1px solid #CAD3E2",
                        borderRadius: 8,
                        fontSize: isMobile ? 15 : 16,
                        padding: isMobile ? 10 : 12,
                    }}
                />

                <textarea
                    name="message"
                    placeholder="Your message"
                    required
                    style={{
                        display: "block",
                        width: "100%",
                        marginBottom: isMobile ? 10 : 18,
                        border: "1px solid #CAD3E2",
                        borderRadius: 8,
                        fontSize: isMobile ? 15 : 16,
                        padding: isMobile ? 10 : 12,
                        minHeight: isMobile ? 64 : 90,
                    }}
                />

                <input
                    type="hidden"
                    name="time"
                    value={today}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        background: "#7B9ACC",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: isMobile ? 15 : 17,
                        border: 0,
                        borderRadius: 10,
                        padding: isMobile ? "11px 0" : "14px 0",
                        marginTop: 8,
                        cursor: "pointer",
                        boxShadow: isMobile ? "0 2px 8px #e6f0f945" : "0 2px 12px #e6f0f925",
                    }}
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}
