'use client'
import Calendar from "@/components/calendar/Calendar";
import EventList from "@/components/calendar/EventList";
import { getDayAsRange } from "@/lib/util/dateutils";
import { useState } from "react";

export default function DashboardCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const range = getDayAsRange(selectedDate);

    return (
        <div>
            <p>Calendar</p>
            <div className="grid grid-cols-2 gap-2">
                <Calendar selectedDate={selectedDate} onSelectDay={setSelectedDate} />
                <EventList start={range.start} end={range.end} />
            </div>
        </div>
    )
}
