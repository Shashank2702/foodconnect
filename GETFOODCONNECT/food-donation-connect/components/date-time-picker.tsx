"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DateTimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  granularity?: "day" | "minute"
}

export function DateTimePicker({ date, setDate, granularity = "minute" }: DateTimePickerProps) {
  const [selectedTime, setSelectedTime] = React.useState<{
    hours: string
    minutes: string
  }>({
    hours: "12",
    minutes: "00",
  })

  const handleTimeChange = (time: { hours?: string; minutes?: string }) => {
    const newTime = { ...selectedTime, ...time }
    setSelectedTime(newTime)

    if (date) {
      const newDate = new Date(date)
      newDate.setHours(Number.parseInt(newTime.hours))
      newDate.setMinutes(Number.parseInt(newTime.minutes))
      setDate(newDate)
    }
  }

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      const hours = selectedTime.hours ? Number.parseInt(selectedTime.hours) : 12
      const minutes = selectedTime.minutes ? Number.parseInt(selectedTime.minutes) : 0

      const dateWithTime = new Date(newDate)
      dateWithTime.setHours(hours)
      dateWithTime.setMinutes(minutes)

      setDate(dateWithTime)
    } else {
      setDate(undefined)
    }
  }

  React.useEffect(() => {
    if (date) {
      setSelectedTime({
        hours: date.getHours().toString().padStart(2, "0"),
        minutes: date.getMinutes().toString().padStart(2, "0"),
      })
    }
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? granularity === "minute" ? format(date, "PPP p") : format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
        {granularity === "minute" && (
          <div className="border-t p-3">
            <div className="flex items-center justify-between space-x-2">
              <p className="text-sm font-medium">Time:</p>
              <div className="flex items-center space-x-2">
                <Select value={selectedTime.hours} onValueChange={(value) => handleTimeChange({ hours: value })}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="Hours" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-sm">:</span>
                <Select value={selectedTime.minutes} onValueChange={(value) => handleTimeChange({ minutes: value })}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="Minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <SelectItem key={i} value={(i * 5).toString().padStart(2, "0")}>
                        {(i * 5).toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

