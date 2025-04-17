'use client'
import { isSameDay } from "@/lib/util/dateutils";

export function CalendarDay({ day, selectDay, selected = false }: { day: Date, selectDay: (date: Date) => void, selected: boolean }) {
    return (<button onClick={() => selectDay(day)} className={"aspect-square hover:bg-gray-300 " + (selected ? "bg-gray-300" : "bg-gray-100")}>
        {day.getDate()}
    </button>);
}

export default function Calendar({ selectedDate, onSelectDay = (d: Date) => { } }:
    { selectedDate: Date, onSelectDay?: (d: Date) => void }) {
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let days = []

    for (let i = 0; i < 28; i++) {
        let day = new Date(selectedDate);
        day.setUTCHours(0, 0, 0, 0);
        day.setDate(selectedDate.getDate() + i - selectedDate.getDay());
        days.push(day);
    }

    return <div>
        
        <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day, i) => (
                <div key={i} className="bg-gray-100 text-lg size-full block text-center align-middle">{day}</div>
            ))}
            {days.map((day, i) => (
                <CalendarDay key={i} day={day} selected={isSameDay(day, selectedDate)}
                    selectDay={onSelectDay} />
            ))}
        </div>

    </div>;
}
