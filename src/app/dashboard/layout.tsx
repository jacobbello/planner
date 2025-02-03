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
        <html lang="en">
            <body>
                {children}
                <div className="px-20 py-10">
                    <div className="columns-3">
                        <Card>{calendar}</Card>
                        <Card>{events}</Card>
                        <Card>{todo}</Card>
                    </div>
                    
                    <Card>{notes}</Card>
                </div>



            </body>
        </html>
    );
}