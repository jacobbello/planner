'use client'
import { useState } from "react"
import Note from "./note"
import { handleCreateNote, handleDelete, handleUpdateNote } from "@/app/(notes)/actions";
import PageSelector from "../ui/page-selector";
import useSWR, { useSWRConfig } from "swr";
import NoteCreate from "./note-create";

const fetcher = (url: string | URL | Request, init: RequestInit | undefined) =>
    fetch(url, init).then(res => res.json());

type PageInfo = {
    page: number,
    perPage: number
}

export function PageDropdown({ page, setPage, options = [1, 5, 10, 25] }:
    { page: PageInfo, setPage: (info: PageInfo) => void, options?: number[] }) {
    return <label>
        Per Page
        <select className="border border-black ml-2 mr-6" id="perPage"
            value={page.perPage}
            onChange={(e) => setPage({ ...page, perPage: parseInt(e.target.value) })}>
            {options.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
    </label>
}

function NoteListPage({ page, perPage }: PageInfo) {
    const { data, error, isLoading, mutate } = useSWR(
        `/api/notes?page=${page}&perPage=${perPage}`, fetcher);

    let content = <p>Loading...</p>;
    if (!isLoading) {
        if (error) {
            content = <p>Error: {error.message}</p>
        } else {
            content = <ul>
                {data.map((note: { id: number, text: string, lastModified: Date }) => (
                    <li key={note.id} className="mb-4">
                        <Note text={note.text} timestamp={note.lastModified} id={note.id}
                            deleteNote={async (id) => {
                                await handleDelete(id);
                                const updatedNotes = data.filter((n: any) => n.id != id);
                                mutate(updatedNotes);
                            }}
                            updateNote={async (d) => {
                                await handleUpdateNote(d);
                                const updateId = d.get("id") as string;
                                const updateText = d.get("text") as string;
                                const updatedNotes = data.map((n: any) =>
                                    n.id == updateId ? { ...n, text: updateText } : n);
                                mutate(updatedNotes);
                            }} />
                    </li>
                ))}
            </ul>
        }
    }
    return content;
}

export default function NoteList({ notesCount }: { notesCount: number }) {
    const [page, setPage] = useState({ page: 1, perPage: 10 });

    const start = Math.max(1, (page.page - 1) * page.perPage + 1);
    const end = Math.min((page.page * page.perPage) + 1, notesCount);

    const maxPage = Math.ceil(notesCount / page.perPage);

    const { mutate } = useSWRConfig();
    return (
        <>
            <NoteCreate action={async (d) => {
                await handleCreateNote(d);
                mutate(
                    (key) => typeof key === 'string' && key.startsWith('/api/notes?page='),
                    (undefined),
                    { revalidate: true }
                );
            }} />
            <div className="flex justify-between mx-2 my-1">
                <div>
                    <span>Showing {start} to {end} of {notesCount} notes </span>
                </div>
                <div>
                    <PageDropdown {...{ page, setPage }} />
                    <PageSelector setPage={(p) => setPage({ page: p, perPage: page.perPage })}
                        page={page.page} max={maxPage} />
                </div>
            </div>
            <NoteListPage {...page} />
            <div className="hidden">
                {
                    (page.page < maxPage) ?
                        <NoteListPage page={page.page + 1} perPage={page.perPage} />
                        : null
                }
            </div>
        </>
    );
}