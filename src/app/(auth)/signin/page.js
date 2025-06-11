import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SigninPage from "@/template/SigninPage";
import { redirect } from "next/navigation";

async function signin() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    redirect("/")
  }
  return <SigninPage />;
}

export default signin;
