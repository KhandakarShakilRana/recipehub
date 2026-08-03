"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaHeart,
  FaShoppingBasket,
  FaPlusCircle,
} from "react-icons/fa";

export default function UserDashboard() {
  const { data: session, isPending } = useSession();

  const [stats, setStats] = useState({
    myRecipes: 0,
    savedRecipes: 0,
    reports: 0,
    purchasedRecipes: 0,
  });

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard-stats/${session.user.id}`
        );

        const data = await res.json();

        setStats({
          myRecipes: data.myRecipes || 0,
          savedRecipes: data.savedRecipes || 0,
          reports: data.reports || 0,
          purchasedRecipes: data.purchasedRecipes || 0,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [session]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Please login first.
      </div>
    );
  }

  const menuItems = [
    {
      name: "My Recipes",
      href: "/dashboard/my-recipes",
      icon: <FaBookOpen />,
    },
    {
      name: "Add Recipe",
      href: "/add-recipe",
      icon: <FaPlusCircle />,
    },
    {
      name: "Saved Recipes",
      href: "/dashboard/saved",
      icon: <FaHeart />,
    },
    {
      name: "Purchased Recipes",
      href: "/dashboard/purchased",
      icon: <FaShoppingBasket />,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-72 min-h-screen bg-[#1F2937] text-white p-6">
          <h2 className="text-2xl font-bold mb-8">User Dashboard</h2>

          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-[#374151] transition"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">

          <h1 className="text-3xl font-bold mb-8">
            Welcome Back, {session.user.name} 👋
          </h1>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-xl bg-[#1F2937] p-6 shadow">
              <h3 className="text-gray-400">My Recipes</h3>
              <p className="mt-2 text-white text-3xl font-bold">
                {stats.myRecipes}
              </p>
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6 shadow">
              <h3 className="text-gray-400">Saved Recipes</h3>
              <p className="mt-2 text-white text-3xl font-bold">
                {stats.savedRecipes}
              </p>
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6 shadow">
              <h3 className="text-gray-400">Reports Submitted</h3>
              <p className="mt-2 text-white text-3xl font-bold">
                {stats.reports}
              </p>
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6 shadow">
              <h3 className="text-gray-400">Purchased Recipes</h3>
              <p className="mt-2 text-white text-3xl font-bold">
                {stats.purchasedRecipes}
              </p>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-10 rounded-xl bg-[#1F2937] p-6 shadow">

            <h2 className="mb-5 text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              <Link
                href="/dashboard/my-recipes"
                className="rounded-lg border p-5 text-center hover:bg-yellow-100 hover:text-black transition"
              >
                📖 Manage My Recipes
              </Link>

              <Link
                href="/dashboard/saved"
                className="rounded-lg border p-5 text-center hover:bg-yellow-100 hover:text-black transition"
              >
                ❤️ Saved Recipes
              </Link>

              <Link
                href="/add-recipe"
                className="rounded-lg border p-5 text-center hover:bg-yellow-100 hover:text-black transition"
              >
                🍳 Add Recipe
              </Link>

              <Link
                href="/dashboard/purchased"
                className="rounded-lg border p-5 text-center hover:bg-yellow-100 hover:text-black transition"
              >
                🍽️ Purchased Recipes
              </Link>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}