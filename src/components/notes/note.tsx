export interface NoteProps {
    text: string
    timestamp: number
}

export default function Note({text, timestamp}: NoteProps) {
    return (
        <div>
            <p>{text}</p><br></br>
            <p>{new Date(timestamp).toLocaleString()}</p>

        </div>
    )
}