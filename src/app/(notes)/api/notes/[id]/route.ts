import { deleteNote, updateNote } from "@/lib/db/notes";
import { revalidatePath } from "next/cache";

type RouteParams = {params: Promise<{id: string}>};


/*export async function GET(request: Request,
    {params}: RouteParams) {
    const id = (await params).id;
}*/

export async function PUT(request: Request,
    {params}: RouteParams
) {
    const id = parseInt((await params).id);
    const data = await request.json();

    await updateNote(id, data["text"]);
    
    return Response.json(true);
}

export async function DELETE(request: Request, {params}: RouteParams) {
    const id = parseInt((await params).id);

    await deleteNote(id);

    return Response.json(true);
}