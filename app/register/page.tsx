"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import Link from "next/link";

export default function Register() {
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
      const res = await authService.register({ email, password });
      console.log('response', res)
      setMessage(res.message || "Registered successfully!");
      // Redirect to login after short delay
      setTimeout(() => router.push("/login"), 1000);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setMessage(err.message);
        } else {
            setMessage("Registration failed");
        }
    }
    finally {
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
          <h1 className="text-[#111318] tracking-tight text-[32px] font-extrabold leading-tight pb-3">Create Your Account</h1>
          <p className="text-[#637588] text-base font-normal leading-normal px-2">Please enter your details to create a new customer portal account.</p>
        </div>

        {message && (
          <p
            className={`text-center font-medium ${
              message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
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
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-foreground transition"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-foreground transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="pt-6 border-t border-[#f0f2f5] text-center">
          <p className="text-[#637588] text-sm">
            Already have an account? 
            <Link href="/login" className="text-primary font-bold hover:underline hover:text-primary-dark ml-1 transition-colors">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
