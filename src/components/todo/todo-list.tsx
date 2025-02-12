'use client'
import { getNumTodos, getTodos, Todo } from "@/lib/db/todo";
import { useEffect, useState } from "react";
import TodoListItem from "./todo";

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [page, setPage] = useState(1);
    const [totalTodos, setTotalTodos] = useState(1);

    useEffect(() => {
        getTodos(1, (page - 1) * 5, 5).then(setTodos);
        getNumTodos(1).then(setTotalTodos);
    }, [page])

    return <div>
        <ul>
            {todos.map((todo, index) => (
                <li key={index}>
                    <TodoListItem {...{ ...todo, description: todo.description ?? '' }}>
                    </TodoListItem>
                </li>
            ))}
        </ul>
    </div>
}