"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useDragControls } from "framer-motion"
import { Plus, Trash2, Sticker, Text, Download, Save, Move, ImageIcon, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sticker data
const stickers = [
  { id: "sticker-1", src: "/1.png", alt: "Airplane" },
  { id: "sticker-2", src: "/2.png", alt: "Beach" },
  { id: "sticker-3", src: "/3.png", alt: "Mountain" },
  { id: "sticker-4", src: "/4.png", alt: "Camera" },
  { id: "sticker-5", src: "/5.png", alt: "Suitcase" },
  { id: "sticker-6", src: "/6.png", alt: "Passport" },
]

// Background images
const backgrounds = [
  { id: "bg-1", src: "/ocean.png", alt: "Beach Background" },
  { id: "bg-2", src: "/mountain.png", alt: "Mountain Background" },
  { id: "bg-3", src: "/city.png", alt: "City Background" },
  { id: "bg-4", src: "/forest.png", alt: "Forest Background" },
]

// Color palettes
const colorPalettes = [
  { id: "palette-1", name: "Pastel", colors: ["#ffd6e0", "#c1e1f0", "#c9e4ca", "#ffecc7", "#e0c1f0"] },
  { id: "palette-2", name: "Vibrant", colors: ["#FF5757", "#57C5FF", "#5FFF57", "#FFDD57", "#C957FF"] },
  { id: "palette-3", name: "Earthy", colors: ["#8D6E63", "#A1887F", "#BCAAA4", "#D7CCC8", "#EFEBE9"] },
  { id: "palette-4", name: "Monochrome", colors: ["#212121", "#424242", "#616161", "#9E9E9E", "#BDBDBD"] },
]

type MoodboardItem = {
  id: string
  type: "image" | "sticker" | "text"
  content: string
  x: number
  y: number
  width?: number
  height?: number
  rotation?: number
  zIndex: number
  color?: string
}

export default function MoodboardPage() {
  const [items, setItems] = useState<MoodboardItem[]>([])
  const [background, setBackground] = useState(backgrounds[0])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [newText, setNewText] = useState("")
  const [textColor, setTextColor] = useState("#000000")
  const [boardName, setBoardName] = useState("My Trip Moodboard")
  const [isLoading, setIsLoading] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const dragControls = useDragControls()

  // Simulate loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Add a sticker to the moodboard
  const addSticker = (sticker: { id: string; src: string }) => {
    const newItem: MoodboardItem = {
      id: `item-${Date.now()}`,
      type: "sticker",
      content: sticker.src,
      x: Math.random() * 300,
      y: Math.random() * 300,
      width: 100,
      height: 100,
      rotation: Math.random() * 20 - 10,
      zIndex: items.length + 1,
    }

    setItems([...items, newItem])
    setSelectedItem(newItem.id)
  }

  // Add text to the moodboard
  const addText = () => {
    if (!newText.trim()) return

    const newItem: MoodboardItem = {
      id: `item-${Date.now()}`,
      type: "text",
      content: newText,
      x: Math.random() * 300,
      y: Math.random() * 300,
      rotation: Math.random() * 10 - 5,
      zIndex: items.length + 1,
      color: textColor,
    }

    setItems([...items, newItem])
    setSelectedItem(newItem.id)
    setNewText("")
  }

  // Delete an item from the moodboard
  const deleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setItems(items.filter((item) => item.id !== id))
    if (selectedItem === id) {
      setSelectedItem(null)
    }
  }

  // Bring item to front
  const bringToFront = (id: string) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, zIndex: Math.max(...items.map((i) => i.zIndex)) + 1 }
        }
        return item
      }),
    )
    setSelectedItem(id)
  }

  // Handle drag start
  const startDrag = (e: React.PointerEvent, id: string) => {
    dragControls.start(e, { snapToCursor: false })
    bringToFront(id)
  }

  // Update item position
  const updateItemPosition = (id: string, x: number, y: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, x, y }
        }
        return item
      }),
    )
  }

  // Rotate item
  const rotateItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, rotation: (item.rotation || 0) + 15 }
        }
        return item
      }),
    )
  }

  // Save moodboard
  const saveMoodboard = () => {
    toast({
      title: "Moodboard saved",
      description: "Your moodboard has been saved successfully.",
    })
  }

  // Apply color palette
  const applyColorPalette = (palette: { colors: string[] }) => {
    setItems(
      items.map((item, index) => {
        if (item.type === "text") {
          return { ...item, color: palette.colors[index % palette.colors.length] }
        }
        return item
      }),
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-5">Trip Moodboard</h2>
          <p className="text-muted-foreground">Create a visual representation of your trip</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={saveMoodboard} className="bg-pastel-blue hover:bg-pastel-blue/80">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Input
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  className="max-w-xs border-0 bg-transparent p-0 text-xl font-bold focus-visible:ring-0"
                />
                <Select
                  value={background.id}
                  onValueChange={(value) => {
                    const bg = backgrounds.find((bg) => bg.id === value)
                    if (bg) setBackground(bg)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select background" />
                  </SelectTrigger>
                  <SelectContent>
                    {backgrounds.map((bg) => (
                      <SelectItem key={bg.id} value={bg.id}>
                        {bg.alt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isLoading ? (
                <div
                  className="animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:50%_100%] bg-no-repeat relative overflow-hidden rounded-lg h-[600px]"
                  style={{ backgroundPosition: "-100% 0", backgroundColor: "#f0f0f0" }}
                />
              ) : (
                <div
                  ref={canvasRef}
                  className="relative h-[600px] w-full overflow-hidden rounded-lg border"
                  style={{
                    backgroundImage: `url(${background.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className={`absolute cursor-move ${selectedItem === item.id ? "ring-2 ring-pastel-blue" : ""}`}
                        style={{
                          zIndex: item.zIndex,
                          rotate: item.rotation,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: item.x,
                          y: item.y,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        drag
                        dragControls={dragControls}
                        onPointerDown={(e) => startDrag(e, item.id)}
                        onClick={() => setSelectedItem(item.id)}
                        onDragEnd={(_, info) => {
                          updateItemPosition(item.id, item.x + info.offset.x, item.y + info.offset.y)
                        }}
                        whileDrag={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                        dragMomentum={false}
                        dragElastic={0.2}
                      >
                        {item.type === "sticker" && (
                          <img
                            src={item.content}
                            alt="Sticker"
                            style={{
                              width: item.width ? `${item.width}px` : "auto",
                              height: item.height ? `${item.height}px` : "auto",
                            }}
                            className="pointer-events-none"
                          />
                        )}
                        {item.type === "text" && (
                          <div
                            className="rounded bg-white/80 p-2 font-cursive text-xl"
                            style={{ minWidth: "100px", color: item.color }}
                          >
                            {item.content}
                          </div>
                        )}
                        {selectedItem === item.id && (
                          <div className="absolute -right-2 -top-2 flex gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-pastel-blue text-white shadow-md"
                              onClick={(e) => rotateItem(item.id, e)}
                            >
                              <Move className="h-3 w-3" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md"
                              onClick={(e) => deleteItem(item.id, e)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="stickers">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="stickers">
                    <Sticker className="mr-2 h-4 w-4" />
                    Stickers
                  </TabsTrigger>
                  <TabsTrigger value="text">
                    <Text className="mr-2 h-4 w-4" />
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="colors">
                    <Palette className="mr-2 h-4 w-4" />
                    Colors
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="stickers" className="mt-4">
                  <div className="grid grid-cols-4 gap-2">
                    {stickers.map((sticker) => (
                      <motion.div
                        key={sticker.id}
                        className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border hover:border-pastel-blue hover:bg-pastel-blue/20"
                        onClick={() => addSticker(sticker)}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img src={sticker.src || "/placeholder.svg"} alt={sticker.alt} className="h-10 w-10" />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="text" className="mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-input">Add Text</Label>
                      <div className="flex gap-2">
                        <Input
                          id="text-input"
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          placeholder="Enter text..."
                        />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button onClick={addText} disabled={!newText.trim()}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text-color">Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="text-color"
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <div className="flex-1 rounded-lg border p-2 font-cursive" style={{ color: textColor }}>
                          {newText || "Preview Text"}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="colors" className="mt-4">
                  <div className="space-y-4">
                    <Label>Color Palettes</Label>
                    {colorPalettes.map((palette) => (
                      <div key={palette.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{palette.name}</span>
                          <Button variant="outline" size="sm" onClick={() => applyColorPalette(palette)}>
                            Apply
                          </Button>
                        </div>
                        <div className="flex gap-1">
                          {palette.colors.map((color, i) => (
                            <div key={i} className="h-8 flex-1 rounded-md" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-3">Tips</h3>
              <ul className="space-y-2 text-sm">
                <motion.li
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pastel-pink text-xs font-bold">
                    1
                  </div>
                  <span>Drag items to position them on your moodboard</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pastel-blue text-xs font-bold">
                    2
                  </div>
                  <span>Click an item to select it, then use the rotate button to adjust its angle</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pastel-green text-xs font-bold">
                    3
                  </div>
                  <span>Try different color palettes to match your trip theme</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pastel-yellow text-xs font-bold">
                    4
                  </div>
                  <span>Save your moodboard to revisit and update as your plans evolve</span>
                </motion.li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
