export default function Note({text, timestamp}: {text: string, timestamp: number}) {
    return (
        <div>
            <p>{text}</p><br></br>
            <p>{new Date(timestamp).toLocaleString()}</p>

        </div>
    )
}