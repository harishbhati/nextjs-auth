import connectDB from "../../../../lib/db";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: { email?: string; password?: string } = await req.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Validation error" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });

    const token = generateToken({ _id: user._id.toString(), email: user.email });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        user: { id: user._id.toString(), email: user.email },
        token,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
