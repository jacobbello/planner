import { getNotesCount } from "@/lib/db/notes";
import NoteList from "./note-list";

export default async function NoteViewer() {
    const userId = 1;

    const totalNotes = await getNotesCount(userId);

    return (
        <NoteList notesCount={totalNotes} />
    )
}