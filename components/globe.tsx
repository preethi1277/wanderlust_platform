"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"

export function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const fadeMaskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let phi = 0
    let width = 0
    const onResize = () => {
      if (canvasRef.current && fadeMaskRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 1.8,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1, 1, 1],
      markers: [],
      opacity: 0.9,
      onRender: (state) => {
        // This prevents rotation except for touch devices
        if (pointerInteracting.current !== null && pointerInteractionMovement.current < 15) {
          phi += 0.005
        } else {
          phi += 0.005
        }
        state.phi = phi + state.phi
      },
    })

    setTimeout(() => {
      if (fadeMaskRef.current) {
        fadeMaskRef.current.style.opacity = "1"
      }
    }, 200)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: "1",
        margin: "auto",
        position: "relative",
      }}
      className={className}
    >
      <div
        ref={fadeMaskRef}
        style={{
          position: "absolute",
          width: "100%",
          aspectRatio: "1",
          transition: "opacity 1s ease",
          opacity: 0,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            contain: "layout paint size",
            cursor: "auto",
          }}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current
            canvasRef.current!.style.cursor = "grabbing"
          }}
          onPointerUp={() => {
            pointerInteracting.current = null
            pointerInteractionMovement.current = 0
            canvasRef.current!.style.cursor = "auto"
          }}
          onPointerOut={() => {
            pointerInteracting.current = null
            pointerInteractionMovement.current = 0
            canvasRef.current!.style.cursor = "auto"
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current
              pointerInteractionMovement.current = delta
              canvasRef.current!.style.cursor = "grabbing"
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current
              pointerInteractionMovement.current = delta
            }
          }}
        />
      </div>
    </div>
  )
}
