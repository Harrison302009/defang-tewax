"use server";
import { getServerSession } from "../lib/get-server-session/get-server-session";
import { prisma } from "../lib/prisma-client/prisma-client";

export const DeleteAllUsers = async () => {
  const session = await getServerSession();
  await prisma.user.deleteMany();
  return { status: 200 };
};
