'use client'
import { handleUpdateNote } from "@/app/(notes)/actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function NoteEditor({ text, id, setEditing, updateNote }: {
    text: string, id: number,
    setEditing: (editing: boolean) => void,
    updateNote: (data: FormData) => void
}) {
    const { pending } = useFormStatus();
    async function handleSubmit(data: FormData) {
       updateNote(data);
       setEditing(false);
    }

    return (<>
        <form action={handleSubmit} className="">
            <textarea className="inline-block size-full" name="text" placeholder="Add a note" defaultValue={text} />
            <input type="hidden" name="id" value={id} />
            <button disabled={pending} type="submit" className="float-right inline-block text-white bg-green-700 hover:bg-green-600 p-2">Save Note</button>
        </form>
    </>)
}

function NoteViewer({ text, timestamp }: { text: string, timestamp: Date }) {
    return (<>
        <p>{text}</p><br></br>
        <span className="text-sm float-left">{timestamp.toLocaleString()}</span>
    </>)
}

export interface NoteProps {
    text: string
    timestamp: Date,
    id: number,
    deleteNote: (id: number) => void,
    updateNote: (data: FormData) => void
}

export default function Note(props: NoteProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-5">
                        {isEditing ?
                            <NoteEditor {...props} setEditing={setIsEditing} /> :
                            <NoteViewer {...props} />}
                    </div>
                    <div>
                        <button className="bg-red-700 text-white p-2 rounded-lg block"
                            onClick={() => props.deleteNote(props.id)}>
                            Delete
                        </button>
                        <button className="bg-blue-700 text-white p-2 rounded-lg block" onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? "Cancel" : "Edit"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}