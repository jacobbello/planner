import Card from "@/components/ui/card";

export default function DashboardLayout({
    children,
    calendar,
    events,
    notes,
    todo,
}: Readonly<{
    children: React.ReactNode;
    calendar: React.ReactNode;
    events: React.ReactNode;
    notes: React.ReactNode;
    todo: React.ReactNode;
}>) {
    return (
        <div>
            {children}
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <Card>{calendar}</Card>
                </div>
                <Card>{todo}</Card>
            </div>
            <Card>{notes}</Card>
        </div>
    );
}