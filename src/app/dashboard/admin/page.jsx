"use client";

import Link from "next/link";
import {
  FaUsers,
  FaUtensils,
  FaFlag,
  FaShieldAlt,
  FaChartPie,
} from "react-icons/fa";

export default function AdminDashboard() {
  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: <FaChartPie />,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/users",
      icon: <FaUsers />,
    },
    {
      name: "Manage Recipes",
      href: "/dashboard/admin/recipes",
      icon: <FaUtensils />,
    },
    {
      name: "Review Reports",
      href: "/dashboard/admin/reports",
      icon: <FaFlag />,
    },
    {
      name: "Moderate Activities",
      href: "/dashboard/admin/moderation",
      icon: <FaShieldAlt />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 min-h-screen bg-[#1F2937] text-white p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

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

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">
            Welcome, Admin 👋
          </h1>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="text-gray-500">Total Users</h3>
              <p className="mt-2 text-3xl font-bold">1,250</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="text-gray-500">Recipes</h3>
              <p className="mt-2 text-3xl font-bold">845</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="text-gray-500">Reports</h3>
              <p className="mt-2 text-3xl font-bold">18</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="text-gray-500">Pending Reviews</h3>
              <p className="mt-2 text-3xl font-bold">32</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-10 rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Link
                href="/dashboard/admin/users"
                className="rounded-lg border p-5 text-center hover:bg-yellow-100 transition"
              >
                Manage Users
              </Link>

              <Link
                href="/dashboard/admin/recipes"
                className="rounded-lg border p-5 text-center hover:bg-yellow-100 transition"
              >
                Manage Recipes
              </Link>

              <Link
                href="/dashboard/admin/reports"
                className="rounded-lg border p-5 text-center hover:bg-yellow-100 transition"
              >
                Review Reports
              </Link>

              <Link
                href="/dashboard/admin/moderation"
                className="rounded-lg border p-5 text-center hover:bg-yellow-100 transition"
              >
                Moderate Activities
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}