import { useState } from "react";

const Calendar = () => {
  // Month data - for demo purposes
  const [currentMonth, setCurrentMonth] = useState("May 2025");
  
  // Days of week header
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  // Calendar days - this would typically be generated dynamically
  const days = [
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
    { day: 5, isCurrentMonth: false },
    { day: 6, isCurrentMonth: false },
    { day: 7, isCurrentMonth: false },
  ];
  
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Calendar</h2>
          <p className="text-gray-500">Select a day to plan activities</p>
        </div>
        
        <div className="text-center font-medium text-lg mb-4">
          {currentMonth}
        </div>
        
        {/* Days of week header - properly aligned with the same grid structure */}
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="h-9 flex items-center justify-center font-medium text-sm">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days - using the same grid structure as the header */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => (
            <div
              key={i}
              className={`h-9 flex items-center justify-center rounded-md hover:bg-gray-100 cursor-pointer ${
                day.isCurrentMonth ? "" : "text-gray-400"
              }`}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function CalendarDemo() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Calendar />
    </div>
  );
}