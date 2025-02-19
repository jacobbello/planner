import { createEvent, getCountInRange, getEventsInRange, StoredEvent } from "@/lib/db/events";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const userId = 1;
    const params = request.nextUrl.searchParams;

    let events: StoredEvent[] = [];

    let page = parseInt(params.get('page') as string);
    let perPage = parseInt(params.get('perPage') as string);

    let start = new Date(0);
    if (params.has('start')) {
        let start = new Date(parseInt(params.get('start') as string));
    }

    let end = new Date(Date.now() * 2);
    if (params.has('end')) {
        end = new Date(parseInt(params.get('end') as string));
    }
    events = await getEventsInRange(userId, {start, end}, (page-1) * perPage + 1, perPage);
    let total = await getCountInRange(userId, {start, end});

    return Response.json({events, total});
}

export async function HEAD(request: NextRequest) {
    const userId = 1;
    const params = request.nextUrl.searchParams;

    let page = parseInt(params.get('page') as string);
    let perPage = parseInt(params.get('perPage') as string);

    let start = new Date(0);
    if (params.has('start')) {
        let start = new Date(parseInt(params.get('start') as string));
    }

    let end = new Date(Date.now() * 2);
    if (params.has('end')) {
        end = new Date(parseInt(params.get('end') as string));
    }
    return Response.json(await getCountInRange(userId, {start, end}));
}

export async function POST(request: NextRequest) {
    const userId = 1;
    const data = await request.json();

    await createEvent(userId, data['name'], data['desc'], data['date']);

    return Response.json({});
}