"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type CursorVariant = "default" | "text" | "button"

interface CustomCursorProps {
  cursorVariant: CursorVariant
}

export function CustomCursor({ cursorVariant }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Don't render the custom cursor on mobile
  if (isMobile) return null

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "white",
      scale: 1,
    },
    text: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "white",
      scale: 1.5,
      mixBlendMode: "difference" as const,
    },
    button: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "white",
      scale: 1.2,
      mixBlendMode: "difference" as const,
    },
  }

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 1,
    },
    text: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 0,
    },
    button: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 0,
    },
  }

  return (
    <>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      />
      <motion.div
        className="cursor-dot"
        variants={dotVariants}
        animate={cursorVariant}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      />
    </>
  )
}
