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