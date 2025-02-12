'use client'

import { useState } from "react";

export default function EventListItem({title, description, date}: 
    {
        title: string,
        description: string,
        date: Date
    
    }) {
    const [expanded, setExpanded] = useState(false);
    
    function formatDate(date: Date, military = false) {
        return military ? `${date.getHours()}:${date.getMinutes}` : `${date.getHours() % 12}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}`;
    }

    return <>
    <div className="p-2 border border-gray-200 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
            <p className="text-gray-500">{formatDate(date)}</p>
            <p>{title}</p>
            <button onClick={() => setExpanded(!expanded)}>{expanded ? '\u25B2' : '\u25BC'}</button>
        </div>
        { expanded ? <p>{description}</p> : <></>}
    </div>
    </>;

}