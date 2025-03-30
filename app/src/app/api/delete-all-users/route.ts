import { getServerSession } from "@/modules/lib/get-server-session/get-server-session"
import { prisma } from "@/modules/lib/prisma-client/prisma-client";
import { NextResponse } from "next/server";

export const DELETE = async () => {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    await prisma.user.deleteMany();
    return NextResponse.json({ message: "All users deleted" }, { status: 200 })
}