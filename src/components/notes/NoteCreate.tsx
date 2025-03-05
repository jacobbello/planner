import SubmitButton from "../ui/form/SubmitButton";

export default function NoteCreate({action}: {action: (d: FormData) => void}) {
    return <form action={action} className="">
        <textarea className="inline-block size-full" name="text" placeholder="Add a note" />
        <SubmitButton>Save Note</SubmitButton>
    </form>
}