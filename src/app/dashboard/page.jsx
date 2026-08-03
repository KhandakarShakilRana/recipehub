"use client";

import { useSession } from "@/lib/auth-client";

import AdminLayout from "@/components/AdminLayout";
import GeneralLayout from "@/components/GeneralLayout";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Please login first.
      </div>
    );
  }

  if (session.user.role === "admin") {
    return <AdminLayout />;
  }

  return <GeneralLayout />;
}