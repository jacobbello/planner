export default function Card({children}: {children: React.ReactNode}) {
    return (
        <div className="bg-gray p-5 shadow-md rounded-md">
            {children}
        </div>
    );
}