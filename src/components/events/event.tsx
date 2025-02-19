'use client'

import { useState } from "react";

const fmt = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

export default function EventListItem({name, description, date}: 
    {
        name: string,
        description: string,
        date: Date
    
    }) {
    const [expanded, setExpanded] = useState(false);
    const past = date.getTime() < Date.now();

    return <>
    <div className="p-2 border border-gray-200 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
            <p className="text-gray-500 text-sm">{fmt.format(date)}</p>
            <p className={past ? "line-through" : ""}>{name}</p>
            <button className="text-sm text-gray-400 hover:underline" onClick={() => setExpanded(!expanded)}>
                {expanded ? "hide" : "show"}
            </button>
        </div>
        { expanded ? <p>{description}</p> : <></>}
    </div>
    </>;

}