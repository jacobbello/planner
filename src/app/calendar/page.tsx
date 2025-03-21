"use client"
import Calendar from "@/components/calendar/Calendar";
import CreateEventForm from "@/components/calendar/CreateEventForm";
import EventList from "@/components/calendar/EventList";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { getDayAsRange } from "@/lib/util/dateutils";
import { useState } from "react";

export default function Page() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [creating, setCreating] = useState(false); // Corrected initial state to false
    const range = getDayAsRange(selectedDate);

    return (
        <div>
            <p>Calendar</p>
            <div className="grid grid-cols-2 gap-2">
                {
                    creating ?
                        <Modal close={() => setCreating(false)} >
                            <CreateEventForm date={selectedDate} onSuccess={() => 0} />
                        </Modal> : null
                }
                <Calendar selectedDate={selectedDate} onSelectDay={setSelectedDate} />
                <div>
                    <Button onClick={() => setCreating(true)}>Create Event</Button>
                    <h2>Events</h2>
                    <EventList start={range.start} end={range.end} />
                </div>
            </div>
        </div>
    )
}
