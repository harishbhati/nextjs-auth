"use client";
import { useAuth } from "../services/useAuth";
import ProtectedWrapper from "../components/ProtectedRoute";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <ProtectedWrapper>
      <div className="flex min-h-screen items-center justify-center">
        <h1>Welcome {user?.email} to the Dashboard</h1>
      </div>
    </ProtectedWrapper>
  );
}
