import { getServerSession } from "@/modules/lib/get-server-session/get-server-session"
import { prisma } from "@/modules/lib/prisma-client/prisma-client";
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    const users = await prisma.user.findMany();
    console.log(users);
    return NextResponse.json(users);
}