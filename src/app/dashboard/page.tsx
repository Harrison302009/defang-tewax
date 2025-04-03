import { getServerSession } from "@/modules/lib/get-server-session/get-server-session";
import { redirect } from "next/navigation";
import DashboardContainer from "./container/container";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  return <DashboardContainer />;
}