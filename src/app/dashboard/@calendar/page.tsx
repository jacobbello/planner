'use client'
import Calendar from "@/components/calendar/Calendar";
import EventList from "@/components/calendar/EventList";
import { useState } from "react";

export default function DashboardCalendar() {
    const [range, setRange] = useState(() => {
        const start = new Date();
        start.setUTCHours(0, 0, 0, 0);
        const end = new Date();
        end.setUTCHours(23, 59, 59, 999);
        return { start, end };
    });


    return (
        <div>
            <p>Calendar</p>
            <div className="grid grid-cols-2 gap-2">
                <Calendar start={range.start} end={range.end} onClick={
                    (d) => {
                        if (d < range.start || d > range.end) {
                            let newRange = d < range.start ? 
                                { start: d, end: range.end } :
                                { start: range.start, end: d };
                            setRange(newRange);
                        } else {
                            setRange({start: d, end: d});
                        }
                    }
                } />
                <EventList {...range} />
            </div>
        </div>
    )
}