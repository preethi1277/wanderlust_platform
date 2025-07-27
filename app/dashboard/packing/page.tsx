"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Initial packing list data
const initialCategories = [
  {
    id: "essentials",
    name: "Essentials",
    items: [
      { id: "passport", name: "Passport", checked: true },
      { id: "wallet", name: "Wallet", checked: true },
      { id: "phone", name: "Phone", checked: true },
      { id: "charger", name: "Charger", checked: false },
      { id: "adapter", name: "Travel Adapter", checked: false },
    ],
  },
  {
    id: "clothing",
    name: "Clothing",
    items: [
      { id: "shirts", name: "T-shirts", checked: false },
      { id: "pants", name: "Pants/Shorts", checked: false },
      { id: "underwear", name: "Underwear", checked: false },
      { id: "socks", name: "Socks", checked: false },
      { id: "jacket", name: "Jacket", checked: false },
      { id: "swimwear", name: "Swimwear", checked: false },
    ],
  },
  {
    id: "toiletries",
    name: "Toiletries",
    items: [
      { id: "toothbrush", name: "Toothbrush", checked: false },
      { id: "toothpaste", name: "Toothpaste", checked: false },
      { id: "shampoo", name: "Shampoo", checked: false },
      { id: "soap", name: "Soap", checked: false },
      { id: "deodorant", name: "Deodorant", checked: false },
    ],
  },
  {
    id: "health",
    name: "Health",
    items: [
      { id: "medication", name: "Medication", checked: false },
      { id: "firstaid", name: "First Aid Kit", checked: false },
      { id: "sunscreen", name: "Sunscreen", checked: false },
      { id: "insect", name: "Insect Repellent", checked: false },
    ],
  },
]

export default function PackingPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [newItemName, setNewItemName] = useState("")
  const [activeTab, setActiveTab] = useState("essentials")

  const handleCheckItem = (categoryId: string, itemId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, checked: !item.checked }
              }
              return item
            }),
          }
        }
        return category
      }),
    )
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemName.trim()) return

    setCategories(
      categories.map((category) => {
        if (category.id === activeTab) {
          return {
            ...category,
            items: [
              ...category.items,
              {
                id: `${activeTab}-${Date.now()}`,
                name: newItemName,
                checked: false,
              },
            ],
          }
        }
        return category
      }),
    )
    setNewItemName("")
  }

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.filter((item) => item.id !== itemId),
          }
        }
        return category
      }),
    )
  }

  // Calculate progress for each category
  const getCategoryProgress = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    if (!category || category.items.length === 0) return 0

    const checkedItems = category.items.filter((item) => item.checked).length
    return Math.round((checkedItems / category.items.length) * 100)
  }

  // Calculate overall progress
  const getTotalProgress = () => {
    const totalItems = categories.reduce((acc, category) => acc + category.items.length, 0)
    if (totalItems === 0) return 0

    const totalChecked = categories.reduce(
      (acc, category) => acc + category.items.filter((item) => item.checked).length,
      0,
    )
    return Math.round((totalChecked / totalItems) * 100)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-green-5">Packing Checklist</h2>
        <p className="text-muted-foreground">Keep track of everything you need for your trip</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>Your packing completion status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{getTotalProgress()}% Complete</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-green-3">
                <div className="h-2.5 rounded-full bg-green-1" style={{ width: `${getTotalProgress()}%` }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="essentials" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="relative">
              {category.name}
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-1 text-[10px] text-white">
                {getCategoryProgress(category.id)}%
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>Items to pack in this category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleAddItem} className="flex gap-2">
                  <Input
                    placeholder={`Add new ${category.name.toLowerCase()} item...`}
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                  <Button type="submit" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </form>

                <div className="space-y-2">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => handleCheckItem(category.id, item.id)}
                        />
                        <Label
                          htmlFor={item.id}
                          className={`text-sm font-medium ${item.checked ? "line-through text-muted-foreground" : ""}`}
                        >
                          {item.name}
                        </Label>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(category.id, item.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
