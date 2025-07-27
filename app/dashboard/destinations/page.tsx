"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, MapPin, Heart, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Destination data
const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    region: "Europe",
    emoji: "🇫🇷",
    description: "The City of Light with iconic landmarks like the Eiffel Tower and Louvre Museum.",
    tags: ["Romantic", "Cultural", "Food"],
    image: "/paris.jpg",
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    emoji: "🇯🇵",
    description: "A bustling metropolis blending ultramodern and traditional aspects of Japanese culture.",
    tags: ["Urban", "Food", "Shopping"],
    image: "/tokyo.jpg",
  },
  {
    id: 3,
    name: "New York",
    country: "United States",
    region: "North America",
    emoji: "🇺🇸",
    description: "The Big Apple featuring skyscrapers, Central Park, and a diverse cultural scene.",
    tags: ["Urban", "Cultural", "Nightlife"],
    image: "/newyork.jpg",
  },
  {
    id: 4,
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    emoji: "🇦🇺",
    description: "Stunning harbor city known for the Opera House, beaches, and laid-back lifestyle.",
    tags: ["Beach", "Outdoor", "Relaxing"],
    image: "/sydney.jpg",
  },
  {
    id: 5,
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    emoji: "🇿🇦",
    description: "Beautiful coastal city with Table Mountain and diverse cultural influences.",
    tags: ["Nature", "Adventure", "Cultural"],
    image: "/cape.jpg",
  },
  {
    id: 6,
    name: "Rio de Janeiro",
    country: "Brazil",
    region: "South America",
    emoji: "🇧🇷",
    description: "Vibrant city famous for its beaches, Carnival, and the Christ the Redeemer statue.",
    tags: ["Beach", "Nightlife", "Cultural"],
    image: "/rio.jpg",
  },
  {
    id: 7,
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    emoji: "🇮🇩",
    description: "Island paradise with beautiful beaches, rice terraces, and spiritual temples.",
    tags: ["Beach", "Relaxing", "Spiritual"],
    image: "/bali.jpg",
  },
  {
    id: 8,
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    emoji: "🇪🇸",
    description: "Catalan city known for Gaudí architecture, Mediterranean beaches, and vibrant culture.",
    tags: ["Cultural", "Beach", "Food"],
    image: "/barcelona.jpg",
  },
]

const regions = ["All", "Europe", "Asia", "North America", "South America", "Africa", "Oceania"]
const tags = [
  "Beach",
  "Urban",
  "Cultural",
  "Food",
  "Nightlife",
  "Adventure",
  "Relaxing",
  "Romantic",
  "Shopping",
  "Nature",
  "Spiritual",
  "Outdoor",
]

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeRegion, setActiveRegion] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedDestination, setSelectedDestination] = useState<(typeof destinations)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter destinations based on search, region, and tags
  const filteredDestinations = destinations.filter((destination) => {
    // Filter by search query
    const matchesSearch =
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by region
    const matchesRegion = activeRegion === "All" || destination.region === activeRegion

    // Filter by tags
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => destination.tags.includes(tag))

    return matchesSearch && matchesRegion && matchesTags
  })

  // Simulate loading when changing tabs
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [activeRegion])

  // Toggle favorite
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Handle destination click
  const handleDestinationClick = (destination: (typeof destinations)[0]) => {
    setSelectedDestination(destination)
  }

  // Close detail view
  const closeDetailView = () => {
    setSelectedDestination(null)
  }

  // Card variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  return (
    <div className="space-y-6" ref={containerRef}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold tracking-tight text-green-5">Destinations</h2>
        <p className="text-muted-foreground">Explore and discover amazing places around the world</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-4 md:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search destinations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filter by Tags
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {tags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedTags([...selectedTags, tag])
                  } else {
                    setSelectedTags(selectedTags.filter((t) => t !== tag))
                  }
                }}
              >
                {tag}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <Tabs defaultValue="All" value={activeRegion} onValueChange={(value) => setActiveRegion(value)}>
        <TabsList className="flex w-full overflow-auto">
          {regions.map((region) => (
            <TabsTrigger key={region} value={region} className="flex-shrink-0">
              {region === "All" ? (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  All Regions
                </>
              ) : (
                region
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {regions.map((region) => (
          <TabsContent key={region} value={region} className="mt-6">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:50%_100%] bg-no-repeat relative overflow-hidden rounded-lg h-[300px]"
                    style={{ backgroundPosition: "-100% 0", backgroundColor: "#f0f0f0" }}
                  />
                ))}
              </div>
            ) : filteredDestinations.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No destinations found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {filteredDestinations.map((destination, index) => (
                    <motion.div
                      key={destination.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layoutId={`destination-${destination.id}`}
                      onClick={() => handleDestinationClick(destination)}
                      className="sticky-note cursor-pointer overflow-hidden group"
                    >
                      <div className="relative">
                        <img
                          src={destination.image || "/placeholder.svg"}
                          alt={destination.name}
                          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <motion.button
                          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md z-10"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => toggleFavorite(destination.id, e)}
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              favorites.includes(destination.id) ? "fill-red-500 text-red-500" : "text-gray-500"
                            }`}
                          />
                        </motion.button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{destination.name}</h3>
                          <span className="text-2xl">{destination.emoji}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{destination.country}</p>
                        <p className="text-sm line-clamp-2 mb-3">{destination.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {destination.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-green-3">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Destination Detail Modal */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeDetailView}
          >
            <motion.div
              layoutId={`destination-${selectedDestination.id}`}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedDestination.image || "/placeholder.svg"}
                  alt={selectedDestination.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => toggleFavorite(selectedDestination.id, e)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(selectedDestination.id) ? "fill-red-500 text-red-500" : "text-gray-500"
                      }`}
                    />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="h-5 w-5 text-gray-500" />
                  </motion.button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{selectedDestination.name}</h2>
                  <span className="text-3xl">{selectedDestination.emoji}</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {selectedDestination.country} • {selectedDestination.region}
                </p>
                <p className="mb-6">{selectedDestination.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedDestination.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-green-3 px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={closeDetailView}>
                    Close
                  </Button>
                  <Button className="bg-pastel-green hover:bg-pastel-green/80">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Explore More
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
