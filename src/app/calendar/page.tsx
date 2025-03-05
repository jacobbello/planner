"use client"
import Calendar from "@/components/calendar/Calendar";
import CreateEventForm from "@/components/calendar/CreateEventForm";
import EventList from "@/components/calendar/EventList";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { getDayAsRange } from "@/lib/util/dateutils";
import { useState } from "react";

export default function Page() {
    const [range, setRange] = useState(getDayAsRange());
    const [creating, setCreating] = useState(true);

    return (
        <div>
            <p>Calendar</p>
            <div className="grid grid-cols-2 gap-2">
                {
                    creating ?
                        <Modal close={() => setCreating(false)} >
                            <CreateEventForm date={range.start} onSuccess={() => 0} />
                        </Modal> : null
                }
                <Calendar start={range.start} end={range.end} onClick={
                    d => setRange(getDayAsRange(d))} />
                <div>
                    <Button onClick={() => setCreating(true)}>Create Event</Button>
                    <h2>Events</h2>
                    <EventList {...range} />
                </div>
            </div>
        </div>
    )
}