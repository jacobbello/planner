'use client'
import { handleDelete } from "@/app/(notes)/actions";
import { handleUpdateNote } from "@/app/(notes)/actions";
import { useActionState, useState } from "react";
import { useSWRConfig } from "swr";
import FormError from "@/components/ui/form/form-error";

function NoteEditor({ text, id, setEditing }: {
    text: string, id: number,
    setEditing: (editing: boolean) => void
}) {
    const {mutate} = useSWRConfig();

    const [state, updateAction, pending] = useActionState(async (prev: any, data: FormData) => {
        let res = await handleUpdateNote(prev, data);
        if (res.success) {
            setEditing(false);
            mutate(
                key => typeof key === "string" && key.startsWith("/api/notes"),
                undefined,
                {revalidate: true}
            );
        }
        return res;
    }, { text, success: false });

    return (<>
        <FormError text={state.fieldErrors?.text}/>
        <FormError text={}
        <form action={updateAction} className="">
            <textarea className="inline-block size-full" name="text" placeholder="Add a note" defaultValue={state.text} />
            <input type="hidden" name="id" value={id} />
            <button disabled={pending} type="submit" className="float-right inline-block text-white bg-green-700 hover:bg-green-600 p-2">Save Note</button>
        </form>
    </>)
}

function NoteViewer({ text, timestamp }: { text: string, timestamp: Date }) {
    return (<>
        <p>{text}</p><br></br>
        <span className="text-sm float-left">{timestamp.toLocaleString()}</span>
    </>)
}

export interface NoteProps {
    text: string
    timestamp: Date,
    id: number
}

export default function Note(props: NoteProps) {
    const [isEditing, setIsEditing] = useState(false);
    const deleteSelf = handleDelete.bind(null, props.id);
    const {mutate} = useSWRConfig();

    const [state, deleteAction, pending] = useActionState(async prev => {
        let res = await handleDelete(props.id, prev);
        mutate(
            key => typeof key === "string" && key.startsWith("/api/notes"),
            undefined,
            {revalidate: true}
        );
        return res;
    }, { success: false });

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-5">
                    {isEditing ?
                        <NoteEditor {...props} setEditing={setIsEditing} /> :
                        <NoteViewer {...props} />}
                </div>
                <div>
                    <button className="bg-red-700 text-white p-2 rounded-lg block"
                        onClick={deleteAction}>
                        Delete
                    </button>
                    <button className="bg-blue-700 text-white p-2 rounded-lg block" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                </div>
            </div>
        </div>
    )
}