'use client'
import { ReactNode, useState } from "react";

export function CalendarDay({ day, selectDay, selected = false }: { day: Date, selectDay: (date: Date) => void, selected: boolean }) {
    return <button onClick={() => selectDay(day)} className={"aspect-square hover:bg-gray-300 " + (selected ? "bg-gray-300" : "bg-gray-100")}>
        {day.getDate()}
    </button>
}

function ControlButton({ children, onClick }: { children: ReactNode, onClick: () => void }) {
    return <button className="mx-0.5 float-right bg-blue-500 hover:bg-blue-700 text-white p-1"
        onClick={onClick}>
        {children}
    </button>
}

export default function Calendar({ start, end, onClick = (d: Date) => { } }:
    { start: Date, end: Date, onClick?: (d: Date) => void }) {
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let startFixed = new Date(start);
    startFixed.setUTCHours(0, 0, 0, 0);

    let endFixed = new Date(end);
    
    endFixed.setUTCHours(23, 59, 59, 999);

    let days = []

    for (let i = 0; i < 28; i++) {
        let day = new Date(start);
        day.setUTCHours(0, 0, 0, 0);
        day.setDate(start.getDate() + i - start.getDay());
        days.push(day);
    }

    return <div>
        
        <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day, i) => (
                <div key={i} className="bg-gray-100 text-lg size-full block text-center align-middle">{day}</div>
            ))}
            {days.map((day, i) => (
                <CalendarDay key={i} day={day} selected={day >= startFixed && day <= endFixed}
                    selectDay={onClick} />
            ))}
        </div>

    </div>;
}