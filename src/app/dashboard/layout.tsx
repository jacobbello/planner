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
                <div className="container mx-auto">
                    <div className="grid grid-cols-3 gap-4">
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