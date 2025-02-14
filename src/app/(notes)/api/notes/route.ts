import { createNote, getNotes } from "@/lib/db/notes";

export async function GET(request: Request) {
    const res = await request.json();

    const page = parseInt(res['page']);
    const perPage = parseInt(res['perPage']);

    const notes = await getNotes(1, (page-1) * perPage, perPage);

    return Response.json(notes);
}

export async function POST(request: Request) {
    const data = await request.json();

    //TODO use actual user ID
    createNote(1, data['text']);

    return Response.json({});
}