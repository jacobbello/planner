import { getTodoCount } from "@/lib/db/todo";
import TodoList from "./todo-list";

export default async function TodoViewer() {
    const userId = 1;

    const totalTodos = await getTodoCount(userId);
    
    return <TodoList totalTodos={totalTodos}/>
}