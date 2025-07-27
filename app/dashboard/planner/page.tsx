"use client"

import { useState } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Trip data
const tripData = {
  destination: "Paris, France",
  startDate: new Date(2025, 5, 15), // June 15, 2025
  endDate: new Date(2025, 5, 22), // June 22, 2025
  days: 8,
}

type DayPlan = {
  id: string
  date: Date
  notes: string
  activities: {
    id: string
    time: string
    description: string
  }[]
}

// Generate initial day plans
const generateInitialDayPlans = () => {
  const dayPlans: DayPlan[] = []
  const { startDate, days } = tripData

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    dayPlans.push({
      id: `day-${i + 1}`,
      date,
      notes: "",
      activities:
        i === 0
          ? [
              { id: `activity-${Date.now()}-1`, time: "09:00", description: "Arrival at Charles de Gaulle Airport" },
              { id: `activity-${Date.now()}-2`, time: "12:00", description: "Check-in at hotel" },
            ]
          : [],
    })
  }

  return dayPlans
}

export default function PlannerPage() {
  const [dayPlans, setDayPlans] = useState<DayPlan[]>(generateInitialDayPlans)
  const [selectedDayId, setSelectedDayId] = useState<string>("day-1")
  const { toast } = useToast()

  // Get the selected day plan
  const selectedDayPlan = dayPlans.find((day) => day.id === selectedDayId)

  // Calculate days until trip
  const today = new Date()
  const daysUntilTrip = Math.ceil((tripData.startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  // Add a new activity to the selected day
  const addActivity = () => {
    if (!selectedDayPlan) return

    setDayPlans(
      dayPlans.map((day) => {
        if (day.id === selectedDayPlan.id) {
          return {
            ...day,
            activities: [...day.activities, { id: `activity-${Date.now()}`, time: "12:00", description: "" }],
          }
        }
        return day
      }),
    )
  }

  // Update activity
  const updateActivity = (activityId: string, field: "time" | "description", value: string) => {
    if (!selectedDayPlan) return

    setDayPlans(
      dayPlans.map((day) => {
        if (day.id === selectedDayPlan.id) {
          return {
            ...day,
            activities: day.activities.map((activity) => {
              if (activity.id === activityId) {
                return { ...activity, [field]: value }
              }
              return activity
            }),
          }
        }
        return day
      }),
    )
  }

  // Delete activity
  const deleteActivity = (activityId: string) => {
    if (!selectedDayPlan) return

    setDayPlans(
      dayPlans.map((day) => {
        if (day.id === selectedDayPlan.id) {
          return {
            ...day,
            activities: day.activities.filter((activity) => activity.id !== activityId),
          }
        }
        return day
      }),
    )
  }

  // Update day notes
  const updateDayNotes = (notes: string) => {
    if (!selectedDayPlan) return

    setDayPlans(
      dayPlans.map((day) => {
        if (day.id === selectedDayPlan.id) {
          return { ...day, notes }
        }
        return day
      }),
    )
  }

  // Save trip plan
  const saveTripPlan = () => {
    // In a real app, this would save to a database
    toast({
      title: "Trip plan saved",
      description: "Your trip plan has been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-5">Trip Planner</h2>
          <p className="text-muted-foreground">Plan your daily activities for {tripData.destination}</p>
        </div>
        <Button onClick={saveTripPlan} className="bg-green-1 hover:bg-green-5">
          <Save className="mr-2 h-4 w-4" />
          Save Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-medium">Destination</div>
                <div className="text-sm text-muted-foreground">{tripData.destination}</div>
              </div>
              <div>
                <div className="font-medium">Dates</div>
                <div className="text-sm text-muted-foreground">
                  {format(tripData.startDate, "MMM d, yyyy")} - {format(tripData.endDate, "MMM d, yyyy")}
                </div>
              </div>
              <div>
                <div className="font-medium">Duration</div>
                <div className="text-sm text-muted-foreground">{tripData.days} days</div>
              </div>
              <div>
                <div className="font-medium">Countdown</div>
                <div className="text-2xl font-bold text-green-1">{daysUntilTrip} days</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Day Selection</CardTitle>
              <CardDescription>Choose a day to plan activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedDayId} onValueChange={setSelectedDayId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  {dayPlans.map((day, index) => (
                    <SelectItem key={day.id} value={day.id}>
                      Day {index + 1} - {format(day.date, "MMM d, yyyy")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {selectedDayPlan ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Day {dayPlans.findIndex((day) => day.id === selectedDayPlan.id) + 1} -{" "}
                    {format(selectedDayPlan.date, "EEEE, MMMM d, yyyy")}
                  </CardTitle>
                  <CardDescription>Plan your activities for this day</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="day-notes">Day Notes</Label>
                    <Textarea
                      id="day-notes"
                      placeholder="Add notes for this day..."
                      value={selectedDayPlan.notes}
                      onChange={(e) => updateDayNotes(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Activities</Label>
                      <Button variant="outline" size="sm" onClick={addActivity}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Activity
                      </Button>
                    </div>

                    {selectedDayPlan.activities.length === 0 ? (
                      <div className="flex h-20 items-center justify-center rounded-lg border border-dashed">
                        <p className="text-sm text-muted-foreground">
                          No activities planned. Click "Add Activity" to get started.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedDayPlan.activities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-3 rounded-lg border p-3">
                            <div className="w-20">
                              <Input
                                type="time"
                                value={activity.time}
                                onChange={(e) => updateActivity(activity.id, "time", e.target.value)}
                              />
                            </div>
                            <Input
                              value={activity.description}
                              onChange={(e) => updateActivity(activity.id, "description", e.target.value)}
                              placeholder="Activity description..."
                              className="flex-1"
                            />
                            <Button variant="ghost" size="icon" onClick={() => deleteActivity(activity.id)}>
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex h-10 items-center justify-center">
                <p className="text-muted-foreground">Select a day to plan your activities.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}