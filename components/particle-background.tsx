"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // Load only the features you need to reduce bundle size
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional callback when particles are loaded
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent", // Let our gradient show through
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 2,
            },
            repulse: {
              distance: 80,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#fbbf24", "#ffffff", "#94a3b8"], // Amber, white, and slate colors
          },
          links: {
            color: "#ffffff",
            distance: 120,
            enable: true,
            opacity: 0.5,
            width: 0.7,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1200,
            },
            value: 75,
          },
          opacity: {
            value: { min: 0.9, max: 3 }, // was { min: 0.1, max: 0.4 }
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.9, // match min to above for consistency
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.7, max: 2.5 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.7,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.02,
              opacity: 1.0,
            },
          },
        },
        detectRetina: true,
        smooth: true,
        style: {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "-1",
          pointerEvents: "none",
          opacity: "0.45", // was 0.13, increased by ~23%
        },
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
       
      }}
    />
  )
}
