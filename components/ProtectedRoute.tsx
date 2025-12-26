"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
//   const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const router = useRouter();

 useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    router.push("/login");
    return;
  }

  
  // Defer state update slightly
  setTimeout(() => {
    setUser(JSON.parse(storedUser));
    // setLoading(false);
  }, 0);
}, [router]);


//   if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return <>{children}</>;
}
