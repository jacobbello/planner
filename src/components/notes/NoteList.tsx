'use client'
import { useState } from "react"
import Note from "./Note"
import PageSelector from "../ui/PageSelector";
import useSWR, { useSWRConfig } from "swr";
import CreateNoteForm from "./CreateNoteForm";

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
    const { data, error, isLoading } = useSWR(
        `/api/notes?page=${page}&perPage=${perPage}`, fetcher);

    let content = <p>Loading...</p>;
    if (!isLoading) {
        if (error) {
            content = <p>Error: {error.message}</p>
        } else if (data !== undefined) {
            console.log(data);
            content = <ul>
                {data?.notes?.map((note: { id: number, text: string, lastModified: Date }) => (
                    <li key={note.id} className="mb-4">
                        <Note text={note.text} timestamp={new Date(note.lastModified)} id={note.id} />
                    </li>
                ))}
            </ul>
        }
    }
    return content;
}

export default function NoteList() {
    const { data } = useSWR("/api/notes", (url) =>
        fetch(url, { method: "HEAD" }
    ).then(res => res.json()));

    const [page, setPage] = useState({ page: 1, perPage: 10 });
    const notesCount = data?.count || 0;

    const start = Math.max(1, (page.page - 1) * page.perPage + 1);
    const end = Math.min((page.page * page.perPage) + 1, notesCount);

    const maxPage = Math.ceil(notesCount / page.perPage);

    const { mutate } = useSWRConfig();
    return (
        <>
            <CreateNoteForm />
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