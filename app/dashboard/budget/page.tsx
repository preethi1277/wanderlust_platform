"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, DollarSign, PieChart, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Budget categories
const categories = ["Accommodation", "Transportation", "Food", "Activities", "Shopping", "Miscellaneous"]

// Initial expenses
const initialExpenses = [
  {
    id: "1",
    description: "Hotel Reservation",
    amount: 800,
    category: "Accommodation",
    date: "2025-06-15",
  },
  {
    id: "2",
    description: "Flight Tickets",
    amount: 650,
    category: "Transportation",
    date: "2025-06-15",
  },
  {
    id: "3",
    description: "Restaurant Dinner",
    amount: 120,
    category: "Food",
    date: "2025-06-16",
  },
  {
    id: "4",
    description: "Museum Tickets",
    amount: 45,
    category: "Activities",
    date: "2025-06-17",
  },
]

export default function BudgetPage() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "Accommodation",
    date: new Date().toISOString().split("T")[0],
  })

  // Calculate total budget
  const totalBudget = 3000 // Fixed budget for demo
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const remainingBudget = totalBudget - totalSpent

  // Calculate category totals
  const categoryTotals = categories.map((category) => {
    const total = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)

    return {
      category,
      total,
      percentage: totalSpent > 0 ? Math.round((total / totalSpent) * 100) : 0,
    }
  })

  // Add new expense
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newExpense.description || !newExpense.amount) return

    setExpenses([
      ...expenses,
      {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: Number.parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
      },
    ])

    // Reset form
    setNewExpense({
      description: "",
      amount: "",
      category: "Accommodation",
      date: new Date().toISOString().split("T")[0],
    })
  }

  // Delete expense
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-green-5">Budget Tracker</h2>
        <p className="text-muted-foreground">Keep track of your travel expenses</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-green-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <BarChart className="h-4 w-4 text-green-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((totalSpent / totalBudget) * 100)}% of total budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            <PieChart className="h-4 w-4 text-green-1" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${remainingBudget < 0 ? "text-red-500" : ""}`}>
              ${remainingBudget.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Tabs defaultValue="expenses">
          <TabsList>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expense List</CardTitle>
                <CardDescription>Track all your travel expenses</CardDescription>
              </CardHeader>
              <CardContent>
                {expenses.length === 0 ? (
                  <div className="flex h-20 items-center justify-center rounded-lg border border-dashed">
                    <p className="text-sm text-muted-foreground">No expenses added yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex-1">
                          <div className="font-medium">{expense.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {expense.category} • {new Date(expense.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="font-medium">${expense.amount.toFixed(2)}</div>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteExpense(expense.id)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Breakdown of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryTotals.map((item) => (
                    <div key={item.category}>
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm">
                          ${item.total.toFixed(2)} ({item.percentage}%)
                        </div>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-green-3">
                        <div className="h-2 rounded-full bg-green-1" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
            <CardDescription>Record a new expense</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What did you spend on?"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full bg-green-1 hover:bg-green-5">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
