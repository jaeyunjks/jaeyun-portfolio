// src/components/ParticlesBackground.jsx
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "../context/ThemeContext";

export default function ParticlesBackground() {
    const { theme } = useTheme();
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        // console.log(container); // debug kalau perlu
    };

    const isDark = theme === "dark";

    return init ? (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none",
            }}
            options={{
                fullScreen: { enable: true, zIndex: -1 },
                fpsLimit: 90,
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                particles: {
                    number: {
                        value: isDark ? 80 : 130, // lebih banyak lagi di light biar jelas
                        density: { enable: true, area: 800 },
                    },
                    color: {
                        value: isDark
                            ? ["#e2e8f0", "#c9d1d9", "#a5d6ff", "#ffffff"]
                            : ["#ffffff", "#f8fafc", "#f1f5f9", "#e0f2fe", "#dbeafe"], // dominan putih di light
                    },
                    shape: {
                        type: "circle",
                    },
                    opacity: {
                        value: isDark ? 0.6 : 0.7, // naikkan ke 0.7 di light supaya lebih jelas
                        random: true,
                        animation: {
                            enable: true,
                            speed: 1.5,
                            minimumValue: 0.35, // minimum lebih tinggi biar ga terlalu pudar
                        },
                    },
                    size: {
                        value: { min: 1.5, max: 7 }, // ukuran lebih variatif
                    },
                    move: {
                        enable: true,
                        speed: isDark ? 1.8 : 1.5,
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: "out",
                    },
                    links: {
                        enable: true,
                        distance: 180,
                        color: isDark ? "#a5d6ff" : "#f1f5f9",
                        opacity: isDark ? 0.5 : 0.4, // naikkan sedikit di light
                        width: 1,
                    },
                },
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "grab" },
                        onClick: { enable: true, mode: "push" },
                        resize: true,
                    },
                    modes: {
                        grab: { distance: 200, links: { opacity: 0.7 } },
                        push: { quantity: 4 },
                    },
                },
                detectRetina: true,
            }}
        />
    ) : null;
}