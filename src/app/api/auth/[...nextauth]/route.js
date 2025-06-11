import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Karbar from "@/models/Karbar";
import { verifyPassword } from "src/utils/auth";
import connectDB from "src/utils/connectDB";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await connectDB();
        } catch (error) {
          console.log(error);
          throw new Error("مشکلی در سرور رخ داده است");
        }

        if (!email || !password) {
          throw new Error("لطفا اطلاعات معتبر وارد کنید");
        }

        const user = await Karbar.findOne({ email });
        if (!user) {
          throw new Error("لطفا ابتدا حساب کاربری ایجاد کنید");
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("ایمیل یا رمز عبور اشتباه است");
        }

        return { email };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
