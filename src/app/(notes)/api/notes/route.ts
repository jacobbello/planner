import { auth } from "@/auth";
import { createNote, getNotes, getNotesCount } from "@/lib/db/notes";
import protectedRouteHandler from "@/lib/util/json-api";

export const GET = protectedRouteHandler(async (userId, req) => {
    const params = req.nextUrl.searchParams;

    const page = parseInt(params.get("page") as string);
    const perPage = parseInt(params.get("perPage") as string);

    try {
        const notes = await getNotes(userId, (page - 1) * perPage, perPage);
        const count = await getNotesCount(userId);

        return Response.json({ notes, count, success: true });
    } catch (e: any) {
        return Response.json({ success: false, message: e.message });
    }
});

export const HEAD = protectedRouteHandler(async (userId, req) => {
    try {
        const count = await getNotesCount(userId);
        return Response.json({count, success: true})
    } catch (e: any) {
        return Response.json({success: false, message: e.message});
    }
});

export const POST = protectedRouteHandler(async (userId, req) => {
    const data = await req.json();

    if (typeof data["text"] !== "string" || data["text"].length == 0)
        return Response.json({success: false, message: "Body cannot be empty"})

    try {
        await createNote(userId, data['text']);
        return Response.json({ success: true });
    } catch (e: any) {
        return Response.json({ success: false, message: e.message })
    }
});