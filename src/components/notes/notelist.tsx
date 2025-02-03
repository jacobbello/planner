'use client'
import { useState } from "react"
import Note, { NoteProps } from "./note"

export default function NoteList() {
    const [notes, setNotes] = useState<NoteProps[]>([]);
    const [currentNote, setCurrentNote] = useState<string>('');

    const addNote = (formData: FormData) => {
        
        setNotes([...notes, {text: currentNote, timestamp: Date.now()}])
    }

    return (
        <>
            <form action={addNote}>
                <input type="text" value={currentNote} onChange={e => setCurrentNote(e.target.value)}placeholder="Add a note" />
                <button type="submit">Add</button>
            </form>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>
                        <Note {...note} />
                    </li>
                    ))}
            </ul>
        </>
    );
}