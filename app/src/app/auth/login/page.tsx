import { getServerSession } from "@/modules/lib/get-server-session/get-server-session";
import LoginContainer from "./container/container";
import { redirect } from "next/navigation";

export  default async function Login() {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <LoginContainer />
  )
}