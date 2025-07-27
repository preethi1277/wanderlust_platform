"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="loading-container">
      <div className="flex flex-col items-center">
        <div className="loading-animation">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h2 className="mt-6 text-2xl font-bodoni text-foreground">
          <span className="font-bodoni">Wander</span>
          <span className="font-cursive text-pastel-pink">lust</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Preparing your journey...</p>
      </div>
    </div>
  )
}
