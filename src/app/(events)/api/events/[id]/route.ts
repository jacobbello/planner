import { deleteEvent, updateEvent } from "@/lib/db/events";

type RouteParams = {params: Promise<{id: string}>};

export async function PUT(request: Request,
    {params}: RouteParams
) {
    const id = parseInt((await params).id);
    const data = await request.json();

    await updateEvent(id, data['name'], data['description'], data['date']);
    return Response.json(true);
}

export async function DELETE(request: Request, {params}: RouteParams) {
    const id = parseInt((await params).id);

    await deleteEvent(id);

    return Response.json(true);
}