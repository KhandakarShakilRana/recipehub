"use client";

import { useSession } from "@/lib/auth-client";

export default function AdminOnly({ children }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Please Login</h1>
          <p className="mt-2 text-gray-500">
            You must be logged in to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md text-center">
          <h1 className="text-4xl mb-4">🔒</h1>
          <h2 className="text-3xl font-bold">
            Access Denied
          </h2>
          <p className="mt-3 text-gray-500">
            This page is available only for administrators.
          </p>
        </div>
      </div>
    );
  }

  return children;
}