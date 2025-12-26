"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
    } else {
      // Defer state update to avoid React warnings
      Promise.resolve().then(() => {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      });
    }
  }, [router]);

  return { user, loading, setUser };
}
