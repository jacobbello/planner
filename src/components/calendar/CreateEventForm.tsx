import { CreateEventActionState, handleCreateEvent } from "@/app/(events)/actions"
import { useActionState, useState } from "react"
import TextInput from "../ui/form/TextInput"
import SubmitButton from "../ui/form/SubmitButton"
import FormError from "../ui/form/FormError"
import { toLocalDateTime } from "@/lib/util/dateutils"

export default function CreateEventForm({ date, onSuccess }: { date: Date , onSuccess: () => void }) {
    const [state, formAction, pending] = useActionState(async (prev: any, data: FormData) => {
        let res = await handleCreateEvent(prev, data);
        onSuccess();
        return res;
    }, {} as CreateEventActionState)

    const defaultDateValue = toLocalDateTime(date);
    return <form action={formAction}>
        <FormError text={state?.message}/>
        <label>
            <span className="mr-3">Event Time</span>
            <FormError text={state?.fieldErrors?.date}/>
            <TextInput inline name="date" type="datetime-local" defaultValue={defaultDateValue}/>
        </label>
        <FormError text={state?.fieldErrors?.name}/>
        <TextInput name="name" placeholder="Event name" defaultValue={state.name} />
        <FormError text={state?.fieldErrors?.description}/>
        <textarea rows={4} cols={50} className="w-full" name="description" placeholder="Event description" defaultValue={state.description} />
        <SubmitButton disabled={pending}>Create Event</SubmitButton>
    </form>;
}