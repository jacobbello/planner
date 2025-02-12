'use client'
import { getCountInRange, getEventsInRange } from "@/lib/db/events";
import { useEffect, useState } from "react";
import {StoredEvent} from "@/lib/db/events";
import EventListItem from "./event";
import PageSelector from "../ui/page-selector";

export default function EventList() {
    const [events, setEvents] = useState<StoredEvent[]>([]);
    const [totalEvents, setTotalEvents] = useState(1);
    const [page, setPage] = useState(1);
    const [date, setDate] = useState(() => {
        const start = new Date();
        start.setUTCHours(0, 0, 0, 0);
        const end = new Date();
        end.setUTCHours(23, 59, 59, 999);
        return {start, end};
    });

    useEffect(() => {
        getEventsInRange(1, date, (page-1)*5, 5).then(setEvents);
        getCountInRange(1, date).then(setTotalEvents);
    }, [date, page]);

    return <div>
        <div className="grid grid-cols-2 gap-2">
            <span>{(page-1) * 5 + 1} to {Math.min(totalEvents, page*5+1)} of {totalEvents}</span>
            <PageSelector setPage={setPage} page={page} max={Math.ceil(totalEvents/5)} />
        </div>
        <ul>
            {events.map((event, index) => (
                <li key={index}>
                    <EventListItem title={event.name} description={event.description||''} date={event.date}>

                    </EventListItem>
                </li>
            ))}
        </ul>
    </div>;
}