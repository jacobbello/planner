import { auth } from "@/auth";
import TodoList from "@/components/todo/todo-list";
import { getNotesCount } from "@/lib/db/notes";

export default async function Todo() {
    const session = await auth();

    // This component shouldn't be rendered unless logged in, but just in case
    if (!session?.user?.id) {
        return <p>Not Logged in</p>
    }
    const userId = parseInt(session.user.id);
    const numTodos = await getNotesCount(userId);

    return (
        <div>
            <p>Todo</p>
            <TodoList todosCount={numTodos} />
        </div>
    )
}