"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Luggage, MapPin, Calendar, DollarSign, Plane, ClipboardList, ImageIcon } from "lucide-react"

export default function DashboardPage() {
  // Calculate days until next trip (dummy data)
  const daysUntilTrip = 42

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-8">
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">My Travel Journal</h2>
          <p className="text-muted-foreground text-lg">Welcome to your travel dashboard!</p>
        </div>
        <Link href="/dashboard/planner">
          <Button className="bg-pastel-blue hover:bg-pastel-purple text-foreground text-lg px-6 py-6 font-bold shadow-lg hover:shadow-xl transition-all">
            <Calendar className="mr-2 h-5 w-5" />
            Plan New Trip
          </Button>
        </Link>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={item}>
          <Link href="/dashboard/planner">
            <div className="sticky-note pink h-full cursor-pointer">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Upcoming Trips</h3>
                  <Calendar className="h-6 w-6 text-foreground" />
                </div>
                <div className="text-3xl font-bold mt-2">2</div>
                <p className="text-sm text-foreground/70">Paris, Tokyo</p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/dashboard/planner">
            <div className="sticky-note blue h-full cursor-pointer">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Days Until Next Trip</h3>
                  <Plane className="h-6 w-6 text-foreground" />
                </div>
                <div className="text-3xl font-bold mt-2">{daysUntilTrip}</div>
                <p className="text-sm text-foreground/70">Paris in {daysUntilTrip} days</p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/dashboard/packing">
            <div className="sticky-note yellow h-full cursor-pointer">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Packing Progress</h3>
                  <Luggage className="h-6 w-6 text-foreground" />
                </div>
                <div className="text-3xl font-bold mt-2">68%</div>
                <div className="mt-2 h-3 w-full rounded-full bg-white/50">
                  <div className="h-full w-[68%] rounded-full bg-foreground/80" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/dashboard/budget">
            <div className="sticky-note purple h-full cursor-pointer">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Budget Spent</h3>
                  <DollarSign className="h-6 w-6 text-foreground" />
                </div>
                <div className="text-3xl font-bold mt-2">$1,240</div>
                <p className="text-sm text-foreground/70">of $3,000 budget</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="sticky-note green">
          <h3 className="text-2xl font-bold mb-4">Trip Timeline</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pastel-pink text-foreground shadow-md">
                <Plane className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-xl">Paris, France</p>
                <p className="text-foreground/70">June 15 - June 22, 2025</p>
              </div>
              <Link href="/dashboard/planner">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-foreground/80 hover:bg-pastel-pink/20 font-bold"
                >
                  View Details
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pastel-blue text-foreground shadow-md">
                <Plane className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-xl">Tokyo, Japan</p>
                <p className="text-foreground/70">August 10 - August 20, 2025</p>
              </div>
              <Link href="/dashboard/planner">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-foreground/80 hover:bg-pastel-blue/20 font-bold"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="sticky-note white">
          <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Link href="/dashboard/packing">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-pastel-pink rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Luggage className="h-8 w-8 mb-2" />
                <span className="font-bold">Packing</span>
              </motion.div>
            </Link>
            <Link href="/dashboard/currency">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-pastel-blue rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <DollarSign className="h-8 w-8 mb-2" />
                <span className="font-bold">Currency</span>
              </motion.div>
            </Link>
            <Link href="/dashboard/destinations">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-pastel-green rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MapPin className="h-8 w-8 mb-2" />
                <span className="font-bold">Destinations</span>
              </motion.div>
            </Link>
            <Link href="/dashboard/itinerary">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-pastel-yellow rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <ClipboardList className="h-8 w-8 mb-2" />
                <span className="font-bold">Itinerary</span>
              </motion.div>
            </Link>
            <Link href="/dashboard/gallery">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-pastel-purple rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <ImageIcon className="h-8 w-8 mb-2" />
                <span className="font-bold">Gallery</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
