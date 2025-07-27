"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
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

const items = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    color: "bg-pastel-pink",
  },
  {
    name: "Packing Checklist",
    href: "/dashboard/packing",
    icon: Luggage,
    color: "bg-pastel-blue",
  },
  {
    name: "Destinations",
    href: "/dashboard/destinations",
    icon: MapPin,
    color: "bg-pastel-green",
  },
  {
    name: "Currency Converter",
    href: "/dashboard/currency",
    icon: DollarSign,
    color: "bg-pastel-yellow",
  },
  {
    name: "Trip Planner",
    href: "/dashboard/planner",
    icon: Calendar,
    color: "bg-pastel-purple",
  },
  {
    name: "Travel Gallery",
    href: "/dashboard/gallery",
    icon: ImageIcon,
    color: "bg-pastel-pink",
  },
  {
    name: "Budget Tracker",
    href: "/dashboard/budget",
    icon: PiggyBank,
    color: "bg-pastel-blue",
  },
  {
    name: "Language Cheat Sheet",
    href: "/dashboard/language",
    icon: Languages,
    color: "bg-pastel-green",
  },
  {
    name: "Itinerary Board",
    href: "/dashboard/itinerary",
    icon: ClipboardList,
    color: "bg-pastel-yellow",
  },
  {
    name: "Airport Navigation",
    href: "/dashboard/airport",
    icon: Plane,
    color: "bg-pastel-purple",
  },
  {
    name: "Trip Moodboard",
    href: "/dashboard/moodboard",
    icon: Palette,
    color: "bg-pastel-pink",
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[240px] flex-col bg-white border-r">
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-2 px-2">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    isActive
                      ? `${item.color} text-foreground font-bold`
                      : "hover:bg-gray-100 text-foreground/80 hover:text-foreground",
                  )}
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full mr-3 p-2",
                      isActive ? "bg-white/80" : item.color + "/20",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-bold">{item.name}</span>
                  {isActive && (
                    <motion.div className="ml-auto h-2 w-2 rounded-full bg-white" layoutId="sidebarActiveIndicator" />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
