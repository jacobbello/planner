import { createTodo, getTodoCount, getTodos } from "@/lib/db/todo";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const userId = 1;
    const params = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(params.get("page") as string));
    const perPage = parseInt(params.get("perPage") as string);

    const todo = await getTodos(
        userId,
        params.has("excludeDone"),
        (page-1)*perPage,
        perPage,
    )

    const total = await getTodoCount(userId);

    return Response.json({
        todo, total
    });
}

export async function POST(request: NextRequest) {
    const userId = 1;
    const res = await request.json();

    await createTodo(
        userId,
        res["name"],
        res["description"],
        new Date(res["deadline"])
    )
    return Response.json(true);
}