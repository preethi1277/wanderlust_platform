"use client"

import { cn } from "@/lib/utils"

interface ShimmerLoaderProps {
  className?: string
  width?: string
  height?: string
  rounded?: boolean
  count?: number
}

export function ShimmerLoader({
  className,
  width = "100%",
  height = "100px",
  rounded = false,
  count = 1,
}: ShimmerLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:50%_100%] bg-no-repeat relative overflow-hidden",
            rounded ? "rounded-full" : "rounded-md",
            className,
          )}
          style={{
            width,
            height,
            backgroundPosition: "-100% 0",
            backgroundColor: "#f0f0f0",
          }}
        />
      ))}
    </>
  )
}

export function ShimmerCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <ShimmerLoader height="200px" />
      <ShimmerLoader height="20px" width="80%" />
      <ShimmerLoader height="15px" width="60%" />
    </div>
  )
}

export function ShimmerGrid({ columns = 3, count = 6 }: { columns?: number; count?: number }) {
  return (
    <div className={`grid gap-4 grid-cols-1 md:grid-cols-${columns}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  )
}
