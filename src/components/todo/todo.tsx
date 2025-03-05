import { dateFormat } from "@/lib/util/dateutils";
import { useState } from "react";

export default function TodoListItem({ done, deadline, description, name }:
    {
        done: boolean, deadline: Date, description?: string, name: string
    }) {

    return (
        <div className="p-2 border border-gray-200 rounded-lg">
            <div className="grid grid-cols-2">
                <div className="col-span-2 grid grid-cols-2">
                    <p>{name}</p>
                    <p className="text-gray-500 text-sm">{dateFormat.format(deadline)}</p>
                </div>
                <p>{description}</p>
                <button>{done ? 'Done' : 'Not Done'}</button>
            </div>

        </div>
    );
}