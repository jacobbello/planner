import { deleteTodo, updateTodo } from "@/lib/db/todo";

type RouteParams = {params: Promise<{id: string}>};

export async function PUT(request: Request, {params}: RouteParams) {
    const id = parseInt((await params).id);
    const data = await request.json();

    await updateTodo(
        id,
        data["name"],
        data["description"],
        new Date(data["deadline"])
    );

    return Response.json(true);
}

export async function DELETE(request: Request, {params}: RouteParams) {
    const id = parseInt((await params).id);

    await deleteTodo(id);

    return Response.json(true);
}