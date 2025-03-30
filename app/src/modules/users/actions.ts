import { getServerSession } from "../lib/get-server-session/get-server-session";
import { prisma } from "../lib/prisma-client/prisma-client"

export const UserFetch = async () => {
    const session = await getServerSession();
    const users = await prisma.user.findMany();
    return (users);
}