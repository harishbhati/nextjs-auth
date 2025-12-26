"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await authService.login({ email, password });
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("token", res.data.token)
        router.push("/dashboard");
      } else {
        setMessage(res.message);
      }
    } catch (err: unknown) {
      setMessage("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={submit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
      >
       <div className="text-center">
          <h1 className="text-[#111318] tracking-tight text-[32px] font-extrabold leading-tight pb-3">Welcome Back</h1>
          <p className="text-[#637588] text-base font-normal leading-normal px-2">Please enter your details to access the customer portal.</p>
        </div>

        {message && (
          <p
            className={`text-center font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-foreground"
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-foreground"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="pt-6 border-t border-[#f0f2f5] text-center">
            <p className="text-[#637588] text-sm">
            Don&apos;t have an account? 
            <Link href="/register" className="text-primary font-bold hover:underline hover:text-primary-dark ml-1 transition-colors">Sign up</Link>
            </p>
        </div>
      </form>
    </div>
  );

}
