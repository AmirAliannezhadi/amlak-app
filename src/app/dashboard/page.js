import DashboardPage from "@/template/DashboardPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Karbar from "@/models/Karbar";
import connectDB from "src/utils/connectDB";

async function Dashboard() {
  await connectDB();
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  const user = await Karbar.findOne({ email });
  console.log(user);
  return <DashboardPage createdAt={user.createdAt} />;
}

export default Dashboard;
