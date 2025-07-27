"use client"

import { useState } from "react"
import { Search, Filter, Plane, Clock, Coffee, ShoppingBag, Utensils, Wifi, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Airport data
const terminals = ["All", "Terminal 1", "Terminal 2A", "Terminal 2B", "Terminal 2C", "Terminal 2D"]

const gates = [
  {
    id: "gate-1",
    name: "Gate A1",
    terminal: "Terminal 1",
    walkingTime: 5,
    amenities: ["Restrooms", "Charging Stations", "Water Fountain"],
    nearbyShops: ["Duty Free", "Bookstore"],
    nearbyFood: ["Café Express", "Burger Joint"],
  },
  {
    id: "gate-2",
    name: "Gate A2",
    terminal: "Terminal 1",
    walkingTime: 7,
    amenities: ["Restrooms", "Charging Stations", "Water Fountain", "Nursing Room"],
    nearbyShops: ["Duty Free", "Fashion Boutique"],
    nearbyFood: ["Sushi Bar", "Coffee Shop"],
  },
  {
    id: "gate-3",
    name: "Gate B1",
    terminal: "Terminal 2A",
    walkingTime: 10,
    amenities: ["Restrooms", "Charging Stations", "Water Fountain", "Lounge Access"],
    nearbyShops: ["Electronics", "Souvenir Shop"],
    nearbyFood: ["Pizza Place", "Sandwich Shop"],
  },
  {
    id: "gate-4",
    name: "Gate B2",
    terminal: "Terminal 2A",
    walkingTime: 12,
    amenities: ["Restrooms", "Charging Stations", "Water Fountain"],
    nearbyShops: ["Luxury Goods", "Pharmacy"],
    nearbyFood: ["Steakhouse", "Ice Cream"],
  },
  {
    id: "gate-5",
    name: "Gate C1",
    terminal: "Terminal 2B",
    walkingTime: 8,
    amenities: ["Restrooms", "Charging Stations", "Water Fountain", "Shower Facilities"],
    nearbyShops: ["Duty Free", "Travel Essentials"],
    nearbyFood: ["Noodle Bar", "Bakery"],
  },
  {
    id: "gate-6",
    name: "Gate C2",
    terminal: "Terminal 2B",
    walkingTime: 6,
    amenities: ["Restrooms", "Charging Stations", "Water Fountain"],
    nearbyShops: ["Bookstore", "Gift Shop"],
    nearbyFood: ["Café", "Fast Food"],
  },
  {
    id: "gate-7",
    name: "Gate D1",
    terminal: "Terminal 2C",
    walkingTime: 15,
    amenities: ["Restrooms", "Charging Stations", "Water Fountain", "Prayer Room"],
    nearbyShops: ["Duty Free", "Designer Clothing"],
    nearbyFood: ["Fine Dining", "Bar"],
  },
  {
    id: "gate-8",
    name: "Gate D2",
    terminal: "Terminal 2C",
    walkingTime: 18,
    amenities: ["Restrooms", "Charging Stations", "Water Fountain"],
    nearbyShops: ["Tech Gadgets", "Travel Accessories"],
    nearbyFood: ["Healthy Options", "Coffee Shop"],
  },
  {
    id: "gate-9",
    name: "Gate E1",
    terminal: "Terminal 2D",
    walkingTime: 20,
    amenities: ["Restrooms", "Charging Stations", "Water Fountain", "Children's Play Area"],
    nearbyShops: ["Toys", "Duty Free"],
    nearbyFood: ["Family Restaurant", "Ice Cream"],
  },
  {
    id: "gate-10",
    name: "Gate E2",
    terminal: "Terminal 2D",
    walkingTime: 22,
    amenities: ["Restrooms", "Charging Stations", "Water Fountain"],
    nearbyShops: ["Luxury Watches", "Cosmetics"],
    nearbyFood: ["Wine Bar", "Gourmet Deli"],
  },
]

const amenities = [
  "Restrooms",
  "Charging Stations",
  "Water Fountain",
  "Lounge Access",
  "Shower Facilities",
  "Nursing Room",
  "Prayer Room",
  "Children's Play Area",
]

export default function AirportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTerminal, setSelectedTerminal] = useState("All")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedGate, setSelectedGate] = useState<(typeof gates)[0] | null>(null)

  // Filter gates based on search, terminal, and amenities
  const filteredGates = gates.filter((gate) => {
    // Filter by search query
    const matchesSearch = gate.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by terminal
    const matchesTerminal = selectedTerminal === "All" || gate.terminal === selectedTerminal

    // Filter by amenities
    const matchesAmenities =
      selectedAmenities.length === 0 || selectedAmenities.every((amenity) => gate.amenities.includes(amenity))

    return matchesSearch && matchesTerminal && matchesAmenities
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-green-5">Airport Navigation</h2>
        <p className="text-muted-foreground">Find your way around the airport</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gate Finder</CardTitle>
              <CardDescription>Find gates and nearby amenities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search gates..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedTerminal} onValueChange={setSelectedTerminal}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select terminal" />
                  </SelectTrigger>
                  <SelectContent>
                    {terminals.map((terminal) => (
                      <SelectItem key={terminal} value={terminal}>
                        {terminal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      <Filter className="h-4 w-4" />
                      Amenities
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {amenities.map((amenity) => (
                      <DropdownMenuCheckboxItem
                        key={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAmenities([...selectedAmenities, amenity])
                          } else {
                            setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
                          }
                        }}
                      >
                        {amenity}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {filteredGates.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground">No gates found. Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredGates.map((gate) => (
                    <Card
                      key={gate.id}
                      className={`cursor-pointer transition-colors hover:border-green-1 ${
                        selectedGate?.id === gate.id ? "border-green-1 bg-green-3/20" : ""
                      }`}
                      onClick={() => setSelectedGate(gate)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{gate.name}</CardTitle>
                          <Badge variant="outline" className="bg-green-3">
                            {gate.terminal}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{gate.walkingTime} min walk from security</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {gate.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="bg-green-2/50">
                              {amenity}
                            </Badge>
                          ))}
                          {gate.amenities.length > 3 && (
                            <Badge variant="secondary" className="bg-green-2/50">
                              +{gate.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {selectedGate && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedGate.name} Details</CardTitle>
                    <CardDescription>{selectedGate.terminal}</CardDescription>
                  </div>
                  <Badge className="bg-green-1">
                    <Clock className="mr-1 h-3 w-3" />
                    {selectedGate.walkingTime} min
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="amenities">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="amenities">
                      <Wifi className="mr-2 h-4 w-4" />
                      Amenities
                    </TabsTrigger>
                    <TabsTrigger value="shops">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Shops
                    </TabsTrigger>
                    <TabsTrigger value="food">
                      <Utensils className="mr-2 h-4 w-4" />
                      Food
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="amenities" className="mt-4">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {selectedGate.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2 rounded-lg border p-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-3">
                            <Info className="h-4 w-4 text-green-5" />
                          </div>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="shops" className="mt-4">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {selectedGate.nearbyShops.map((shop) => (
                        <div key={shop} className="flex items-center gap-2 rounded-lg border p-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-3">
                            <ShoppingBag className="h-4 w-4 text-green-5" />
                          </div>
                          <span>{shop}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="food" className="mt-4">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {selectedGate.nearbyFood.map((food) => (
                        <div key={food} className="flex items-center gap-2 rounded-lg border p-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-3">
                            <Coffee className="h-4 w-4 text-green-5" />
                          </div>
                          <span>{food}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Airport Map</CardTitle>
              <CardDescription>Interactive terminal map</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg bg-green-3 p-4">
                <div className="flex h-full flex-col items-center justify-center">
                  <Plane className="h-16 w-16 text-green-5" />
                  <p className="mt-4 text-center text-sm">Interactive airport map would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Airport Tips</CardTitle>
              <CardDescription>Make your journey smoother</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-green-1 flex-shrink-0" />
                  <span>Arrive at least 2 hours before domestic flights and 3 hours for international flights</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 text-green-1 flex-shrink-0" />
                  <span>Check your terminal and gate information before heading to the airport</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wifi className="mt-0.5 h-4 w-4 text-green-1 flex-shrink-0" />
                  <span>Free Wi-Fi is available throughout the airport</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShoppingBag className="mt-0.5 h-4 w-4 text-green-1 flex-shrink-0" />
                  <span>Duty-free shopping is available after security checkpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <Utensils className="mt-0.5 h-4 w-4 text-green-1 flex-shrink-0" />
                  <span>Most restaurants are open from 6:00 AM to 10:00 PM</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
