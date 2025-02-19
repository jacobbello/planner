import { createNote, getNotes } from "@/lib/db/notes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;

    const page = parseInt(params.get('page') as string);
    const perPage = parseInt(params.get('perPage') as string);

    const notes = await getNotes(1, (page-1) * perPage, perPage);

    return Response.json(notes);
}

export async function POST(request: Request) {
    const data = await request.json();

    //TODO use actual user ID
    await createNote(1, data['text']);

    return Response.json({});
}