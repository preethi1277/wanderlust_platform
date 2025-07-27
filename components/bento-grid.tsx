"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BentoGridProps {
  className?: string
  children: ReactNode
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>{children}</div>
}

interface BentoGridItemProps {
  className?: string
  title?: string
  description?: string
  header?: ReactNode
  icon?: ReactNode
  children?: ReactNode
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  children,
  colSpan = 1,
  rowSpan = 1,
}: BentoGridItemProps) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl sticky-note",
        colSpan === 1 ? "md:col-span-1" : colSpan === 2 ? "md:col-span-2" : "md:col-span-3",
        rowSpan === 1 ? "row-span-1" : "row-span-2",
        className,
      )}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pastel-pink via-pastel-blue to-pastel-green" />
      <div className="absolute top-0 right-4 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm transform -translate-y-1/2 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-400 rounded-full" />
      </div>
      <div className="p-4 h-full flex flex-col">
        {header}
        {(title || icon) && (
          <div className="flex items-center gap-2 mb-2">
            {icon && <div className="text-pastel-blue">{icon}</div>}
            {title && <h3 className="font-medium text-lg">{title}</h3>}
          </div>
        )}
        {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
        {children}
      </div>
    </motion.div>
  )
}
