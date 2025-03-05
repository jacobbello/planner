function PageButton({ children, onClick, active = true, current = false }: { children: React.ReactNode, onClick: () => void, active?: boolean, current?: boolean }) {
    if (active) {
        return <button className="text-blue-700 hover:text-blue-500 hover:underline px-1"
            onClick={onClick}>
            {children}
        </button>
    } else {
        return <span className={"px-1 text-black" + (current ? "underline" : "")}>{children}</span>
    }
}

export default function PageSelector({ setPage, page, max }: { page: number, max: number, setPage: (page: number) => void }) {
    const start = Math.max(1, page - 2); //always include 1
    const end = Math.min(max, start + 4);

    const numbers = [];

    if (start > 1) numbers.push(1);

    for (let i = start; i <= end; i++) {
        numbers.push(i);
    }

    if (end < max) numbers.push(max);
    //TODO make length consistent 

    return <div>
        <PageButton active={page > 1} onClick={() => setPage(Math.max(0, page - 1))}>
            previous
        </PageButton>
        {
            numbers.map((i) => 
                <PageButton key={i}
                    onClick={() => setPage(i)} current={i === page} active={i !== page}>
                {i}
                </PageButton>)
        }
        <PageButton active={page < max} onClick={() => setPage(Math.min(max, page + 1))}>
            next
        </PageButton>

    </div>
}