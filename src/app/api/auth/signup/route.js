import Karbar from "@/models/Karbar";
import { NextResponse } from "next/server";
import { hashPassword } from "src/utils/auth";
import connectDB from "src/utils/connectDB";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    console.log({ email, password });

    if (!email || !password) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 422 }
      );
    }

    const existingUser = await Karbar.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return NextResponse.json(
        { error: "این کاربر قبلا ثبت نام کرده است" },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newKarbar = await Karbar.create({ email: email, password: hashedPassword });
    console.log(newKarbar);

    return NextResponse.json({
      message: "حساب کاربری ایجاد شد",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "مشکلی در سرور رخ داده است",
      },
      { status: 500 }
    );
  }
}
