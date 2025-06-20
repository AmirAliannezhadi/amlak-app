import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from "@/layout/DashboardSidebar.module.css";
import LogoutButton from "@/module/LogoutButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

async function DashboardSidebar({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <CgProfile />
        <p>{session?.user.email}</p>
        <span></span>
        <Link href="/dashboard">حساب کاربری</Link>
        <Link href="/dashboard/my-profiles">آگهی های من</Link>
        <Link href="/dashboard/add">ثبت آگهی</Link>
        <LogoutButton />
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export default DashboardSidebar;
