"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  Luggage,
  MapPin,
  DollarSign,
  Calendar,
  ImageIcon,
  PiggyBank,
  Languages,
  ClipboardList,
  Plane,
  Palette,
} from "lucide-react"

const dockItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Packing", href: "/dashboard/packing", icon: Luggage },
  { name: "Destinations", href: "/dashboard/destinations", icon: MapPin },
  { name: "Currency", href: "/dashboard/currency", icon: DollarSign },
  { name: "Planner", href: "/dashboard/planner", icon: Calendar },
  { name: "Gallery", href: "/dashboard/gallery", icon: ImageIcon },
  { name: "Budget", href: "/dashboard/budget", icon: PiggyBank },
  { name: "Language", href: "/dashboard/language", icon: Languages },
  { name: "Itinerary", href: "/dashboard/itinerary", icon: ClipboardList },
  { name: "Airport", href: "/dashboard/airport", icon: Plane },
  { name: "Moodboard", href: "/dashboard/moodboard", icon: Palette },
]

export function Dock() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
      <div className="flex items-end h-16 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-gray-200">
        {dockItems.map((item) => {
          const isActive = pathname === item.href
          const isHovered = hoveredItem === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`relative mx-1 flex flex-col items-center justify-center ${
                  isActive ? "text-pastel-pink" : "text-gray-600"
                }`}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className={`p-2 rounded-full ${isActive ? "bg-pastel-pink/20" : "hover:bg-gray-100"}`}
                  initial={{ scale: 1 }}
                  animate={{ scale: isHovered ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <motion.span
                  className="absolute -bottom-6 text-xs font-medium whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded opacity-0 pointer-events-none"
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 h-1 w-1 rounded-full bg-pastel-pink"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
