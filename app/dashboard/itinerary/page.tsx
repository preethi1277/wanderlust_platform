"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Plus, Trash2, GripVertical, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Initial itinerary data
const initialDays = [
  {
    id: "day-1",
    title: "Day 1 - Arrival & Eiffel Tower",
    date: "June 15, 2025",
    activities: [
      {
        id: "activity-1",
        time: "09:00",
        title: "Arrival at Charles de Gaulle Airport",
        location: "Paris, France",
        notes: "Terminal 2E, Flight AF1234",
      },
      {
        id: "activity-2",
        time: "12:00",
        title: "Check-in at Hotel",
        location: "Le Grand Hotel, Paris",
        notes: "Reservation #12345",
      },
      {
        id: "activity-3",
        time: "16:00",
        title: "Visit Eiffel Tower",
        location: "Champ de Mars, Paris",
        notes: "Pre-booked tickets for sunset view",
      },
      {
        id: "activity-4",
        time: "19:30",
        title: "Dinner at Le Jules Verne",
        location: "Eiffel Tower, 2nd Floor",
        notes: "Reservation at 19:30",
      },
    ],
  },
  {
    id: "day-2",
    title: "Day 2 - Louvre & Notre Dame",
    date: "June 16, 2025",
    activities: [
      {
        id: "activity-5",
        time: "09:00",
        title: "Breakfast at Café de Flore",
        location: "Saint-Germain-des-Prés",
        notes: "Famous historic café",
      },
      {
        id: "activity-6",
        time: "10:30",
        title: "Visit the Louvre Museum",
        location: "Rue de Rivoli",
        notes: "Don't miss the Mona Lisa!",
      },
      {
        id: "activity-7",
        time: "14:00",
        title: "Lunch at Angelina",
        location: "Rue de Rivoli",
        notes: "Try their famous hot chocolate",
      },
      {
        id: "activity-8",
        time: "16:00",
        title: "Visit Notre Dame Cathedral",
        location: "Île de la Cité",
        notes: "Exterior view only due to reconstruction",
      },
    ],
  },
]

type Activity = {
  id: string
  time: string
  title: string
  location: string
  notes: string
}

type Day = {
  id: string
  title: string
  date: string
  activities: Activity[]
}

export default function ItineraryPage() {
  const [days, setDays] = useState<Day[]>(initialDays)
  const [newDayTitle, setNewDayTitle] = useState("")
  const [newDayDate, setNewDayDate] = useState("")
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [editingDayId, setEditingDayId] = useState<string | null>(null)
  const { toast } = useToast()

  // Handle drag and drop
  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result

    // Dropped outside the list
    if (!destination) return

    // Reordering days
    if (type === "day") {
      const reorderedDays = [...days]
      const [removed] = reorderedDays.splice(source.index, 1)
      reorderedDays.splice(destination.index, 0, removed)
      setDays(reorderedDays)
      return
    }

    // Reordering activities within the same day
    if (source.droppableId === destination.droppableId) {
      const dayIndex = days.findIndex((day) => day.id === source.droppableId)
      const newActivities = [...days[dayIndex].activities]
      const [removed] = newActivities.splice(source.index, 1)
      newActivities.splice(destination.index, 0, removed)

      const newDays = [...days]
      newDays[dayIndex] = {
        ...days[dayIndex],
        activities: newActivities,
      }
      setDays(newDays)
      return
    }

    // Moving activities between days
    const sourceDayIndex = days.findIndex((day) => day.id === source.droppableId)
    const destDayIndex = days.findIndex((day) => day.id === destination.droppableId)

    const sourceActivities = [...days[sourceDayIndex].activities]
    const destActivities = [...days[destDayIndex].activities]

    const [removed] = sourceActivities.splice(source.index, 1)
    destActivities.splice(destination.index, 0, removed)

    const newDays = [...days]
    newDays[sourceDayIndex] = {
      ...days[sourceDayIndex],
      activities: sourceActivities,
    }
    newDays[destDayIndex] = {
      ...days[destDayIndex],
      activities: destActivities,
    }

    setDays(newDays)
  }

  // Add new day
  const handleAddDay = () => {
    if (!newDayTitle || !newDayDate) return

    const newDay: Day = {
      id: `day-${Date.now()}`,
      title: newDayTitle,
      date: newDayDate,
      activities: [],
    }

    setDays([...days, newDay])
    setNewDayTitle("")
    setNewDayDate("")

    toast({
      title: "Day added",
      description: `${newDayTitle} has been added to your itinerary.`,
    })
  }

  // Add new activity to a day
  const handleAddActivity = (dayId: string) => {
    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      time: "12:00",
      title: "New Activity",
      location: "",
      notes: "",
    }

    setDays(
      days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: [...day.activities, newActivity],
          }
        }
        return day
      }),
    )

    // Set this activity for editing
    setEditingActivity(newActivity)
    setEditingDayId(dayId)
  }

  // Delete activity
  const handleDeleteActivity = (dayId: string, activityId: string) => {
    setDays(
      days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: day.activities.filter((activity) => activity.id !== activityId),
          }
        }
        return day
      }),
    )

    // Clear editing if the deleted activity was being edited
    if (editingActivity?.id === activityId) {
      setEditingActivity(null)
      setEditingDayId(null)
    }
  }

  // Delete day
  const handleDeleteDay = (dayId: string) => {
    setDays(days.filter((day) => day.id !== dayId))

    // Clear editing if a deleted day's activity was being edited
    if (editingDayId === dayId) {
      setEditingActivity(null)
      setEditingDayId(null)
    }

    toast({
      title: "Day removed",
      description: "The day has been removed from your itinerary.",
    })
  }

  // Update activity
  const handleUpdateActivity = (field: keyof Activity, value: string) => {
    if (!editingActivity || !editingDayId) return

    const updatedActivity = {
      ...editingActivity,
      [field]: value,
    }

    setEditingActivity(updatedActivity)

    setDays(
      days.map((day) => {
        if (day.id === editingDayId) {
          return {
            ...day,
            activities: day.activities.map((activity) => {
              if (activity.id === editingActivity.id) {
                return updatedActivity
              }
              return activity
            }),
          }
        }
        return day
      }),
    )
  }

  // Save itinerary
  const handleSaveItinerary = () => {
    // In a real app, this would save to a database
    toast({
      title: "Itinerary saved",
      description: "Your itinerary has been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-5">Interactive Itinerary</h2>
          <p className="text-muted-foreground">Plan and organize your daily activities</p>
        </div>
        <Button onClick={handleSaveItinerary} className="bg-green-1 hover:bg-green-5">
          Save Itinerary
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="days" type="day">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {days.length === 0 ? (
                  <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                    <p className="text-muted-foreground">No days added yet. Add your first day to get started.</p>
                  </div>
                ) : (
                  days.map((day, dayIndex) => (
                    <Draggable key={day.id} draggableId={day.id} index={dayIndex}>
                      {(provided) => (
                        <Card ref={provided.innerRef} {...provided.draggableProps} className="relative">
                          <div {...provided.dragHandleProps} className="absolute left-3 top-3 cursor-grab">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <CardHeader className="pl-12">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle>{day.title}</CardTitle>
                                <CardDescription>{day.date}</CardDescription>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleAddActivity(day.id)}>
                                  <Plus className="mr-1 h-3 w-3" />
                                  Add Activity
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteDay(day.id)}>
                                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Droppable droppableId={day.id} type="activity">
                              {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                  {day.activities.length === 0 ? (
                                    <div className="flex h-20 items-center justify-center rounded-lg border border-dashed">
                                      <p className="text-sm text-muted-foreground">No activities added yet.</p>
                                    </div>
                                  ) : (
                                    day.activities.map((activity, activityIndex) => (
                                      <Draggable key={activity.id} draggableId={activity.id} index={activityIndex}>
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`flex items-start gap-3 rounded-lg border p-3 ${
                                              editingActivity?.id === activity.id ? "border-green-1 bg-green-3/20" : ""
                                            }`}
                                            onClick={() => {
                                              setEditingActivity(activity)
                                              setEditingDayId(day.id)
                                            }}
                                          >
                                            <div className="flex h-full items-center">
                                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                            <div className="flex min-w-[70px] flex-col items-center">
                                              <Clock className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-sm font-medium">{activity.time}</span>
                                            </div>
                                            <div className="flex-1">
                                              <div className="font-medium">{activity.title}</div>
                                              {activity.location && (
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                  <MapPin className="h-3 w-3" />
                                                  {activity.location}
                                                </div>
                                              )}
                                              {activity.notes && <div className="mt-1 text-sm">{activity.notes}</div>}
                                            </div>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteActivity(day.id, activity.id)
                                              }}
                                            >
                                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                          </div>
                                        )}
                                      </Draggable>
                                    ))
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Day</CardTitle>
              <CardDescription>Add a new day to your itinerary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="day-title">Day Title</Label>
                  <Input
                    id="day-title"
                    placeholder="e.g., Day 3 - Museum Tour"
                    value={newDayTitle}
                    onChange={(e) => setNewDayTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="day-date">Date</Label>
                  <Input id="day-date" type="date" value={newDayDate} onChange={(e) => setNewDayDate(e.target.value)} />
                </div>
                <Button
                  onClick={handleAddDay}
                  disabled={!newDayTitle || !newDayDate}
                  className="w-full bg-green-1 hover:bg-green-5"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Day
                </Button>
              </div>
            </CardContent>
          </Card>

          {editingActivity && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Activity</CardTitle>
                <CardDescription>Update activity details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-time">Time</Label>
                    <Input
                      id="activity-time"
                      type="time"
                      value={editingActivity.time}
                      onChange={(e) => handleUpdateActivity("time", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-title">Title</Label>
                    <Input
                      id="activity-title"
                      value={editingActivity.title}
                      onChange={(e) => handleUpdateActivity("title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-location">Location</Label>
                    <Input
                      id="activity-location"
                      value={editingActivity.location}
                      onChange={(e) => handleUpdateActivity("location", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-notes">Notes</Label>
                    <Textarea
                      id="activity-notes"
                      value={editingActivity.notes}
                      onChange={(e) => handleUpdateActivity("notes", e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
