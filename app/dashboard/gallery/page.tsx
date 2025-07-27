"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { Upload, Search, X, Download, Heart, Share2, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Gallery data
const galleryImages = [
  {
    id: 1,
    src: "/paris.jpg",
    alt: "Eiffel Tower at sunset",
    location: "Paris, France",
    date: "June 15, 2024",
    tags: ["landmark", "sunset"],
  },
  {
    id: 2,
    src: "/cape.jpg",
    alt: "Notre Dame Cathedral",
    location: "Paris, France",
    date: "June 16, 2024",
    tags: ["architecture", "landmark"],
  },
  {
    id: 3,
    src: "/rio.jpg",
    alt: "Louvre Museum",
    location: "Paris, France",
    date: "June 17, 2024",
    tags: ["museum", "art"],
  },
  {
    id: 4,
    src: "/bali.jpg",
    alt: "Seine River Cruise",
    location: "Paris, France",
    date: "June 18, 2024",
    tags: ["river", "boat"],
  },
  {
    id: 5,
    src: "/newyork.jpg",
    alt: "Montmartre",
    location: "Paris, France",
    date: "June 19, 2024",
    tags: ["neighborhood", "view"],
  },
  {
    id: 6,
    src: "/sydney.jpg",
    alt: "Café scene",
    location: "Paris, France",
    date: "June 20, 2024",
    tags: ["food", "cafe"],
  },
  {
    id: 7,
    src: "/tokyo.jpg",
    alt: "Arc de Triomphe",
    location: "Paris, France",
    date: "June 21, 2024",
    tags: ["landmark", "architecture"],
  },
  {
    id: 8,
    src: "/barcelona.jpg",
    alt: "Champs-Élysées",
    location: "Paris, France",
    date: "June 22, 2024",
    tags: ["street", "shopping"],
  },
  {
    id: 9,
    src: "/paris.jpg",
    alt: "Sacré-Cœur",
    location: "Paris, France",
    date: "June 23, 2024",
    tags: ["landmark", "church"],
  },
]

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dragInfo, setDragInfo] = useState({ isDragging: false, startX: 0, startY: 0 })
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Filter images based on search query
  const filteredImages = galleryImages.filter((image) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      image.alt.toLowerCase().includes(searchLower) ||
      image.location.toLowerCase().includes(searchLower) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    )
  })

  // Simulate loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [searchQuery])

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

  // Navigate to next/previous image
  const navigateImage = (direction: "next" | "prev") => {
    if (!selectedImage) return

    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % galleryImages.length
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    }

    setSelectedImage(galleryImages[newIndex])
    setScale(1)
    x.set(0)
    y.set(0)
  }

  // Handle image drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedImage) return
    setDragInfo({
      isDragging: true,
      startX: e.clientX - x.get(),
      startY: e.clientY - y.get(),
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragInfo.isDragging) return
    x.set(e.clientX - dragInfo.startX)
    y.set(e.clientY - dragInfo.startY)
  }

  const handleMouseUp = () => {
    setDragInfo({ isDragging: false, startX: 0, startY: 0 })
  }

  // Zoom in/out
  const handleWheel = (e: React.WheelEvent) => {
    if (!selectedImage) return
    e.preventDefault()
    const newScale = Math.max(0.5, Math.min(3, scale - e.deltaY * 0.005))
    setScale(newScale)
  }

  // Reset zoom and position
  const resetZoom = () => {
    setScale(1)
    x.set(0)
    y.set(0)
  }

  // Card variants for animations
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  }

  return (
    <div className="space-y-6" ref={containerRef}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold tracking-tight text-green-5">Travel Gallery</h2>
        <p className="text-muted-foreground">Store and showcase your travel memories</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-4 md:flex-row md:items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by location, description, or tags..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-pastel-blue hover:bg-pastel-blue/80">
          <Upload className="mr-2 h-4 w-4" />
          Upload Photos
        </Button>
      </motion.div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:50%_100%] bg-no-repeat relative overflow-hidden rounded-lg h-[250px]"
              style={{ backgroundPosition: "-100% 0", backgroundColor: "#f0f0f0" }}
            />
          ))}
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">No images found. Try adjusting your search or upload new photos.</p>
        </div>
      ) : (
        <motion.div initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                custom={index}
                variants={cardVariants}
                layoutId={`gallery-${image.id}`}
                className="sticky-note p-0 overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(image)}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white font-medium truncate">{image.alt}</p>
                  </div>
                  <motion.button
                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => toggleFavorite(image.id, e)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(image.id) ? "fill-red-500 text-red-500" : "text-gray-500"
                      }`}
                    />
                  </motion.button>
                </div>
                <div className="p-3">
                  <p className="text-sm text-muted-foreground">
                    {image.location} • {image.date}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {image.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-pastel-blue/20 px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Image Detail Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none shadow-none">
          <div className="relative bg-black/90 rounded-lg overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-2 z-20">
              <motion.button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-5 w-5 text-white" />
              </motion.button>
            </div>

            <div className="absolute bottom-4 left-4 z-20 flex gap-2">
              <motion.button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => selectedImage && toggleFavorite(selectedImage.id, e)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    selectedImage && favorites.includes(selectedImage.id) ? "fill-red-500 text-red-500" : "text-white"
                  }`}
                />
              </motion.button>
              <motion.button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="h-5 w-5 text-white" />
              </motion.button>
              <motion.button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download className="h-5 w-5 text-white" />
              </motion.button>
              <motion.button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Info className="h-5 w-5 text-white" />
              </motion.button>
            </div>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
              <motion.button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateImage("prev")}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </motion.button>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
              <motion.button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateImage("next")}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </motion.button>
            </div>

            <div
              className="h-[80vh] w-full flex items-center justify-center overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              onDoubleClick={resetZoom}
            >
              {selectedImage && (
                <motion.div layoutId={`gallery-${selectedImage.id}`} style={{ x, y }} className="relative">
                  <motion.img
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    style={{ scale }}
                    className="max-h-[80vh] object-contain cursor-grab active:cursor-grabbing"
                    draggable="false"
                  />
                </motion.div>
              )}
            </div>

            <div className="absolute bottom-4 right-4 z-20 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
              {scale.toFixed(1)}x
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
