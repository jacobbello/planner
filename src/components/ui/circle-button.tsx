export default function CircleButton({children, onClick} : {children: React.ReactNode, onClick: () => void}) {
    return (
        <button onClick={onClick} className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md">
            {children}
        </button>
    );
}