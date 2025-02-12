export default function TodoListItem({done, deadline, description, name}:
    {
        done: boolean, deadline: Date, description?: string, name: string
}) {


    function formatDate(date: Date, military = false) {
        return military ? `${date.getMonth()}/${date.getDay()}} ${date.getHours()}:${date.getMinutes}` : `${date.getHours() % 12}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}`;
    }

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                <p>{formatDate(deadline)}</p>
                <p>{name}</p>
                <button>{done ? 'Done' : 'Not Done'}</button>
            </div>
            <p>{description}</p>
        </div>
    );
}