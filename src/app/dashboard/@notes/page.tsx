import Note from "@/components/notes/note";
import CircleButton from "@/components/ui/circle-button";

export default function Notes() {
    return (
        <div>
            <h3>Notes</h3>
            <ul>
                <li>
                    <Note text="This is a note" timestamp={Date.now()} />
                    <Note text="This is another note" timestamp={Date.now()} />
                    <Note text="This is a third note" timestamp={Date.now()} />
                </li>
                <div className="relative bottom-0 right-0">
                    <CircleButton onClick={() => {}}>+</CircleButton>
                </div>
            </ul>
        </div>
    )
}