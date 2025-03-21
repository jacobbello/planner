export default function FormError({ text, inline }: { text: string | string[] | undefined, inline?: boolean }) {
    if (text === undefined || text == null || text.length == 0) return <></>
    return typeof text === "string" ?
        <span className="text-sm text-red-700" >
            {text}
        </span > : text.map((t, i) => <div key={i}>
            <FormError key={i} text={t} />{inline ? null : <br />}
        </div>);
}