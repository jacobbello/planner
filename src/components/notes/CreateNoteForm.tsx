'use client'
import { CreateNoteActionState, handleCreateNote } from "@/app/(notes)/actions";
import SubmitButton from "../ui/form/SubmitButton";
import { useActionState } from "react";
import { useSWRConfig } from "swr";
import FormError from "../ui/form/FormError";

export default function CreateNoteForm() {
    const createAction = async (prev: CreateNoteActionState, formData: FormData) => {
        const res = await handleCreateNote(prev, formData);
        if (res.success) {
            mutate(
                key => typeof key === "string" && key.startsWith("/api/notes"),
                undefined,
                {revalidate: true}
            );
        }
        return res;
    }

    const [state, formAction, pending] = useActionState(createAction, {} as CreateNoteActionState);
    const { mutate } = useSWRConfig();

    return <form action={formAction} className="">
        <FormError text={state.message} />
        <textarea className="inline-block size-full" name="text" placeholder="Add a note" defaultValue={state.text} />
        <SubmitButton disabled={pending}>Save Note</SubmitButton>
    </form>
}