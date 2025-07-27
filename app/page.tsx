"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const smokeRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
  // Set up the canvas dimensions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Initialize and animate the smoke effect
  useEffect(() => {
    if (!smokeRef.current || dimensions.width === 0) return
    
    const canvas = smokeRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = dimensions.width
    canvas.height = dimensions.height
    
    const particleCount = Math.floor(dimensions.width / 20) // Reduced particle count for better performance
    const pastelColors = [
      'rgba(244, 191, 220, 0.4)', // pastel-pink
      'rgba(193, 225, 252, 0.4)', // pastel-blue
      'rgba(253, 241, 182, 0.4)', // pastel-yellow
      'rgba(201, 236, 200, 0.4)', // pastel-green
      'rgba(218, 196, 246, 0.4)'  // pastel-purple
    ]
    
    // Initialize particles array
    const particles = []
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 100 + 50
        this.speedX = Math.random() * 0.2 - 0.1 // Slower motion
        this.speedY = Math.random() * 0.2 - 0.1 // Slower motion
        this.color = pastelColors[Math.floor(Math.random() * pastelColors.length)]
        this.blur = Math.random() * 15 + 15 // Increased blur for smoother effect
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        // Wrap around screen edges
        if (this.x < -this.size) this.x = canvas.width + this.size
        if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.y < -this.size) this.y = canvas.height + this.size
        if (this.y > canvas.height + this.size) this.y = -this.size
      }
      
      draw() {
        ctx.save()
        ctx.filter = `blur(${this.blur}px)`
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      // Cleanup
    }
  }, [dimensions])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // Create variants for letter animations
  const letterVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.4, transition: { duration: 0.2 } }
  }

  // Button variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.98,
      transition: { type: "spring", stiffness: 500, damping: 15 }
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white notebook-bg overflow-auto">
      {/* Smoke canvas */}
      <canvas 
        ref={smokeRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply" 
        style={{ zIndex: 0 }}  
      />

      {/* Enhanced smooth cursor */}
      <SmoothCursor />

      <main className="flex-1 flex flex-col items-center justify-center min-h-screen">
        <div
          ref={containerRef}
          className="container max-w-5xl px-4 relative overflow-visible flex flex-col items-center justify-center gap-12"
        >
          {/* Mouse follower blobs with smoother animations */}
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-pastel-pink/30 mix-blend-multiply filter blur-3xl"
            animate={{
              x: mousePosition.x - 150,
              y: mousePosition.y - 150,
            }}
            transition={{ type: "spring", damping: 40, stiffness: 90, mass: 1 }}
          />
          <motion.div
            className="absolute w-56 h-56 rounded-full bg-pastel-blue/30 mix-blend-multiply filter blur-3xl"
            animate={{
              x: mousePosition.x - 120,
              y: mousePosition.y - 120,
            }}
            transition={{ type: "spring", damping: 45, stiffness: 85, mass: 1 }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full bg-pastel-yellow/30 mix-blend-multiply filter blur-3xl"
            animate={{
              x: mousePosition.x - 100,
              y: mousePosition.y - 100,
            }}
            transition={{ type: "spring", damping: 50, stiffness: 80, mass: 1 }}
          />

          <div className="flex flex-col items-center justify-center gap-10 relative z-10">
            <div className="space-y-6 max-w-2xl mx-auto text-center">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl tracking-tight leading-tight text-foreground flex justify-center">
                  {/* Interactive letters for "Wander" */}
                  <span className="font-bodoni flex">
                    {"Wander".split("").map((letter, index) => (
                      <motion.span
                        key={`wander-${index}`}
                        variants={letterVariants}
                        initial="initial"
                        whileHover="hover"
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                  {/* Interactive letters for "lust" */}
                  <span className="font-cursive text-pastel-pink flex">
                    {"lust".split("").map((letter, index) => (
                      <motion.span
                        key={`lust-${index}`}
                        variants={letterVariants}
                        initial="initial"
                        whileHover="hover"
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                </h1>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-foreground/80 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your ultimate travel companion to plan, organize, and enjoy your perfect journey.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center"
              >
                <Link href="/login" className="w-auto">
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <InteractiveHoverButton>
                      <motion.span
                        animate={isHovering ? { y: [-1, 1, -1], transition: { repeat: Infinity, duration: 0.6 } } : {}}
                      >
                        Start Your Journey
                      </motion.span>
                    </InteractiveHoverButton>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
