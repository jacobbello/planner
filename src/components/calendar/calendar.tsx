'use client'
import { ReactNode, useState } from "react";

export function CalendarDay({day, selectDay, selected = false}: {day: Date, selectDay: (date: Date) => void, selected: boolean}) {
    return <button onClick={() => selectDay(day)} className={"aspect-square hover:bg-gray-300 " + (selected ? "bg-gray-300": "bg-gray-100")}>
        {day.getDate()}
    </button>
}

function ControlButton({children, onClick}: {children: ReactNode, onClick: () => void}) {
    return <button className="mx-0.5 float-right bg-blue-500 hover:bg-blue-700 text-white p-1"
                onClick={onClick}>
        {children}
    </button>
}

export default function Calendar() {
    const [date, setDate] = useState(() => {
        return new Date()
    });
    const dayNames = ['S','M','T','W','T','F','S'];
    let days = []

    for (let i = 0; i < 28; i++) {
        let day = new Date(date);
        day.setUTCHours(0, 0, 0, 0);
        day.setDate(date.getDate() + i - date.getDay());
        days.push(day);
    }

    return <div>
        <div className="grid grid-flow-col my-2">
            <div>
                <select value={date.getMonth()} onChange={(e) => {
                    let d = new Date(date);
                    d.setMonth(parseInt(e.target.value));
                    setDate(d);
                }}>
                    <option value="0">January</option>
                    <option value="1">Febuary</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>    
            </div>
            <div>
                <ControlButton onClick={() => {
                    let d = new Date(date);
                    d.setDate(d.getDate() - 7);
                    setDate(d);
                }}>Previous Week</ControlButton>
                <ControlButton onClick={() => setDate(new Date())}>
                    Today
                </ControlButton>
                <ControlButton onClick={() => {
                    let d = new Date(date);
                    d.setDate(d.getDate() + 7);
                    setDate(d);
                }}>Next Week</ControlButton>
            </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day, i) => (
                <div className="bg-gray-100 text-lg size-full block text-center align-middle">{day}</div>
            ))}
            {days.map((day, i) => (
                <CalendarDay day={day} selected={day.getDate()==date.getDate()}
                 selectDay={setDate}>

                </CalendarDay>  
            ))}
        </div>
        
    </div>;
}