import React from "react";

export default function ContactPage() {
    return (
        <div style={{
            maxWidth: 600, margin: "80px auto 32px", color: "#232751", textAlign: "center", padding: "0 15px"
        }}>
            <h1 style={{
                fontWeight: 900, fontSize: 38, color: "#7B9ACC", marginBottom: 24
            }}>Contact Me</h1>
            <p style={{ fontSize: 18, marginBottom: 23 }}>
                Thank you for your interest in getting in touch!<br />
                I value open communication and welcome any inquiries, feedback, or collaboration opportunities. <br /><br />
                Please don't hesitate to get in touch either by the form below, or:
            </p>
            <div style={{ fontSize: 20, fontWeight: 700, margin: 20 }}>
                <a href="https://www.linkedin.com/in/yafiefarabi0710/"
                    style={{ color: "#7B9ACC", marginRight: 28, textDecoration: "none" }}>LinkedIn</a>
                <a href="mailto:yaafiiee.10@gmail.com"
                    style={{ color: "#7B9ACC", textDecoration: "none" }}>yaafiiee.10@gmail.com</a>
            </div>
            {/* OPTIONAL: Contact Form Integration */}
            <form style={{ margin: "58px auto 0", maxWidth: 410, background: "#F9FAFC", borderRadius: 14, padding: 30, boxShadow: "0 2px 12px #e6f0f925" }}>
                <input placeholder="Your Name" required style={{
                    display: "block", width: "100%", marginBottom: 18, border: "1px solid #CAD3E2",
                    borderRadius: 8, fontSize: 16, padding: 12
                }} />
                <input placeholder="Your Email" required type="email" style={{
                    display: "block", width: "100%", marginBottom: 18, border: "1px solid #CAD3E2",
                    borderRadius: 8, fontSize: 16, padding: 12
                }} />
                <textarea placeholder="Your message" required style={{
                    display: "block", width: "100%", marginBottom: 18, border: "1px solid #CAD3E2",
                    borderRadius: 8, fontSize: 16, padding: 12, minHeight: 90
                }} />
                <button type="submit" style={{
                    width: "100%", background: "#7B9ACC", color: "#fff", fontWeight: 800,
                    fontSize: 17, border: 0, borderRadius: 10, padding: "14px 0", marginTop: 8, cursor: "pointer"
                }}>Send Message</button>
            </form>
        </div>
    );
}
