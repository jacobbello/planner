'use client'
import { Suspense, use, useCallback, useEffect, useState } from "react"
import Note, { NoteProps } from "./note"
import { createNote, getNotes, getNotesCount, StoredNote } from "@/lib/db/notes";
import { handleCreateNote, handleDelete, handleUpdateNote } from "@/app/(notes)/actions";
import PageSelector from "../ui/page-selector";
import { get } from "http";

export default function NoteList() {
    const [notes, setNotes] = useState<StoredNote[]>([]);
    const [page, setPage] = useState({ page: 1, pageSize: 10 });
    const [totalNotes, setTotalNotes] = useState(1);
    const [changed, setChanged] = useState(false);

    const deleteNote = useCallback((id: number) => {
        handleDelete(id).then(() => setChanged(true));
    }, []);

    const updateNote = useCallback((data: FormData) => {
        handleUpdateNote(data).then(() => setChanged(true));
    }, []);

    useEffect(() => {
        getNotes(1, (page.page - 1) * page.pageSize, page.pageSize)
            .then(setNotes).then(() => setChanged(false));
        getNotesCount(1).then(setTotalNotes);
    }, [page, changed]);

    function onCreate(data: FormData) {
        handleCreateNote(data).then(() => setChanged(true));
    }

    return (
        <>

            <form action={onCreate} className="">
                <textarea className="inline-block size-full" name="text" placeholder="Add a note" />
                <button type="submit" className="inline-block text-white bg-blue-700 hover:bg-blue-600 p-2">Save Note</button>
            </form>
            <div className="flex justify-between mx-2 my-1">
                <div>
                    <span>Showing {Math.max(1, (page.page - 1) * page.pageSize + 1)} to {Math.min((page.page - 1) * page.pageSize + 1 + notes.length, totalNotes)} of {totalNotes} notes </span>

                </div>
                <div>
                    
                    <label htmlFor="pageSize">Per Page</label>
                    <select className="border border-black ml-2 mr-6" id="pageSize" value={page.pageSize} onChange={(e) => setPage({ ...page, pageSize: parseInt(e.target.value) })}>
                        <option value="1">1</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <PageSelector setPage={(p) => setPage({ page: p, pageSize: page.pageSize })} page={page.page} max={Math.ceil(totalNotes / page.pageSize)} />
                </div>
            </div>
            <ul>
                <Suspense fallback={<li>Loading...</li>}>
                    {notes.map((note, index) => (
                        <li key={index} className="mb-4">
                            <Note text={note.text} timestamp={note.lastModified} id={note.id}
                                deleteNote={deleteNote}
                                updateNote={updateNote} />
                        </li>
                    ))}
                </Suspense>
            </ul>
        </>
    );
}