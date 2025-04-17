import { auth } from "@/auth";
import { createEvent, getCountInRange, getEventsInRange, StoredEvent } from "@/lib/db/events";
import protectedRouteHandler from "@/lib/util/json-api";
import { z } from "zod";

const getEventsSchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    perPage: z.coerce.number().int().positive().optional(),
    start: z.string().datetime().optional(),
    end: z.string().datetime().optional()
})

export const GET = protectedRouteHandler(async (userId, request) => {
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
    if (res.data.page && res.data.perPage) {
        events = await getEventsInRange(
            userId, { start, end },
            (res.data.page - 1) * res.data.perPage + 1,
            res.data.perPage
        );
    }
    
    let count = await getCountInRange(userId, { start, end });

    return Response.json({ events, count });
})


const countEventsSchema = z.object({
    start: z.date().optional(),
    end: z.date().optional()
});

const createEventsSchema = z.object({
    name: z.string().nonempty(),
    desc: z.string().nonempty(),
    date: z.date()
});
export const POST = protectedRouteHandler(async (userId, request) => {
    const body = await request.json();
    const res = await createEventsSchema.safeParseAsync(body);

    if (!res.success) {
        return Response.json(res.error.flatten().fieldErrors, {status: 400});
    }

    await createEvent(userId, res.data.name, res.data.desc, res.data.date);

    return Response.json({});
});