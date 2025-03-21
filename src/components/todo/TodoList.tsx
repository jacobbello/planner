'use client'
import { useState } from "react";
import Todo from "./Todo";
import useSWR from "swr";
import PageSelector from "../ui/PageSelector";

function TodoListPage({ page, perPage }: { page: number, perPage: number }) {
    const { data, error, isLoading } = useSWR(
        `/api/todo?page=${page}&perPage=${perPage}`,
        (url) => fetch(url).then(res => res.json())
    );

    if (isLoading) return <p>Loading...</p>

    if (error) {
        return <p>error.message</p>
    }

    return <ul>
        {data?.todo?.map((todo: any) => (
            <li key={todo.id}>
                <Todo {...{ ...todo, deadline: new Date(todo.deadline) }} />
            </li>
        ))}
    </ul>
}

export default function TodoList({ todosCount }: { todosCount: number }) {
    const perPage = 5;
    const [page, setPage] = useState(1);


    return <div>
        <PageSelector page={page} max={Math.ceil(todosCount / perPage)} setPage={setPage} />
        <TodoListPage {...{page, perPage}}/>
    </div>
}