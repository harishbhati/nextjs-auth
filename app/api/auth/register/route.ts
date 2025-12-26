import connectDB from "../../../../lib/db";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    let body: { email?: string; password?: string };

    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid JSON payload",
          error: "Request body must be valid JSON",
        }),
        { status: 400 }
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Validation error",
          error: "Email and password are required",
        }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User already exists",
          error: "Email is already registered",
        }),
        { status: 409 } // Conflict
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
        data: {
          id: user._id.toString(),
          email: user.email,
        },
      }),
      { status: 201 } // Created
    );
  } catch (error) {
    console.error("Register error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
        error: "Something went wrong while registering the user",
      }),
      { status: 500 }
    );
  }
}
