'use client'
import { getCountInRange, getEventsInRange } from "@/lib/db/events";
import { useEffect, useState } from "react";
import { StoredEvent } from "@/lib/db/events";
import EventListItem from "./event";
import PageSelector from "../ui/page-selector";
import useSWR from "swr";
import { dateFormat } from "@/lib/util/dateformat";

const fetcher = (url: string | URL | Request, init: RequestInit | undefined) =>
    fetch(url, init).then(res => res.json());

export default function EventList(range: { start: Date, end: Date }) {
    const [page, setPage] = useState(1);

    const start = range.start !== undefined ? `&start=${range.start.getTime()}` : '';
    const end = range.end !== undefined ? `&start=${range.end.getTime()}` : '';
    const key = `/api/events?page=${page}&perPage=5` + start + end;
    const { data, error, isLoading, mutate } = useSWR(
        key,
        fetcher
    );

    let content = <p>Loading...</p>;

    if (error) {
        content = <p>Error: error.message</p>
    } else if (!isLoading) {
        const totalEvents = data.total;
        content = <div>
            <div className="grid grid-cols-2 gap-2">
                <span>{(page - 1) * 5 + 1} to {Math.min(totalEvents, page * 5 + 1)} of {totalEvents}</span>
                <PageSelector setPage={setPage} page={page} max={Math.ceil(totalEvents / 5)} />
            </div>
            <ul>
                {data.events.map((event: any) => (
                    <li key={event.id}>
                        <EventListItem date={new Date(event.date)}
                            description={event.description}
                            name={event.name}
                        />
                    </li>
                ))}
            </ul>
        </div>
    }



    return <div>
        <center className="text-lg">
            {dateFormat.formatRange(range.start, range.end)}
        </center>
        {content}
    </div>;
}