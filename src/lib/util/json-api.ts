import { auth } from "@/auth"
import { NextRequest } from "next/server";

export default function protectedRouteHandler(
    handler: (userId: string, req: NextRequest) => any
) {
    return auth(async (req) => {
        if (req.auth && req.auth?.user?.id !== undefined) {
            return handler(req.auth.user.id, req);
        }
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 });
    });
}

export function protectedServerAction<S, T>(
    action: (prev: S, data: T, userId: string) => Promise<S>
) {
    return async (prev: S, data: T) => {
        const session = await auth();
        if (!session?.user?.id) {
            return {
                ...prev,
                success: false,
                message: "Not authenticated"
            };
        }
        return action(prev, data, session.user.id);
    }
}