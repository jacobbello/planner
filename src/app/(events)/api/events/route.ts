import { auth } from "@/auth";
import { createEvent, getCountInRange, getEventsInRange, StoredEvent } from "@/lib/db/events";
import { z } from "zod";

const getEventsSchema = z.object({
    page: z.number().int().positive(),
    perPage: z.number().int().positive(),
    start: z.string().datetime().optional(),
    end: z.string().datetime().optional()
})

export const GET = auth(async (request) => {
    if (!request.auth) {
        return Response.json({ message: "Authentication failure" }, { status: 401 });
    }
    console.log("Auth" + request.auth);
    const userId = 1;
    const params = request.nextUrl.searchParams;

    const res = await getEventsSchema.safeParseAsync({
        page: params.get("page"),
        perPage: params.get("perPage"),
        start: params.get("start"),
        end: params.get("end")
    });

    if (!res.success) {
        return Response.json({
            errors: res.error.flatten().fieldErrors,
            events: [],
            total: 0
        }, {status: 400})
    }

    let events: StoredEvent[] = [];

    let start = new Date(res.data.start||0);
    let end = new Date(res.data.end || (Date.now() * 2));

    events = await getEventsInRange(
        userId, { start, end },
        (res.data.page - 1) * res.data.perPage + 1,
        res.data.perPage
    );
    let total = await getCountInRange(userId, { start, end });

    return Response.json({ events, total });
})


const countEventsSchema = z.object({
    start: z.date().optional(),
    end: z.date().optional()
});

export const HEAD = auth(async (request) => {
    if (!request.auth) {
        return Response.json({ message: "Authentication failure" }, { status: 401 });
    }
    const userId = 1;
    const params = request.nextUrl.searchParams;

    const res = await countEventsSchema.safeParseAsync({
        page: params.get("page"),
        perPage: params.get("perPage")
    });

    if (!res.success) {
        return Response.json(res.error.flatten().fieldErrors, {status: 400});
    }

    let start = res.data.start || new Date(0);
    let end = res.data.end || new Date(Date.now() * 2);
    return Response.json(await getCountInRange(userId, { start, end }));
});


const createEventsSchema = z.object({
    name: z.string().nonempty(),
    desc: z.string().nonempty(),
    date: z.date()
});
export const POST = auth(async (request) => {
    if (!request.auth) {
        return Response.json({ message: "Authentication failure" }, { status: 401 });
    }
    const userId = 1;
    const body = await request.json();
    const res = await createEventsSchema.safeParseAsync(body);

    if (!res.success) {
        return Response.json(res.error.flatten().fieldErrors, {status: 400});
    }

    await createEvent(userId, res.data.name, res.data.desc, res.data.date);

    return Response.json({});
});