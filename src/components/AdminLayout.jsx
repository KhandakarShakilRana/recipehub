"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaUsers,
  FaUtensils,
  FaFlag,
  FaShieldAlt,
  FaChartPie,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`)
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Manage Users",
      href: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      name: "Manage Recipes",
      href: "/dashboard/recipes",
      icon: <FaUtensils />,
    },
    {
      name: "Review Reports",
      href: "/dashboard/reports",
      icon: <FaFlag />,
    },
    
  ];

  if (!dashboard) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 min-h-screen bg-[#1F2937] text-white p-6">
          <h2 className="text-2xl font-bold mb-8">
            Admin Panel
          </h2>

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
            Welcome, Admin 👋
          </h1>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

            <div className="bg-[#1F2937] rounded-xl p-6 shadow">
              <h3 className="text-gray-400">Users</h3>
              <p className="text-4xl font-bold mt-2">
                {dashboard.users}
              </p>
            </div>

            <div className="bg-[#1F2937] rounded-xl p-6 shadow">
              <h3 className="text-gray-400">Recipes</h3>
              <p className="text-4xl font-bold mt-2">
                {dashboard.recipes}
              </p>
            </div>

            <div className="bg-[#1F2937] rounded-xl p-6 shadow">
              <h3 className="text-gray-400">Likes</h3>
              <p className="text-4xl font-bold mt-2 flex items-center gap-2">
                <FaHeart className="text-red-500 text-2xl" />
                {dashboard.likes}
              </p>
            </div>

            <div className="bg-[#1F2937] rounded-xl p-6 shadow">
              <h3 className="text-gray-400">Reports</h3>
              <p className="text-4xl font-bold mt-2">
                {dashboard.reports}
              </p>
            </div>

            

          </div>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            {/* Latest Recipes */}
            <div className="bg-[#1F2937] rounded-xl p-6 shadow">

              <h2 className="text-xl font-bold mb-5">
                🍳 Latest Recipes
              </h2>

              <div className="space-y-4">

                {dashboard.latestRecipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    className="flex items-center gap-4 border-b border-gray-700 pb-4"
                  >
                    <img
                      src={recipe.image}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {recipe.recipeName}
                      </h3>

                      <p className="text-sm text-gray-400">
                        ❤️ {recipe.likes} Likes
                      </p>
                    </div>

                    <Link
                      href={`/recipe/${recipe._id}`}
                      className="bg-blue-600 px-3 py-2 rounded"
                    >
                      View
                    </Link>

                  </div>
                ))}

              </div>

            </div>

            {/* Latest Reports */}
            <div className="bg-[#1F2937] rounded-xl p-6 shadow">

              <h2 className="text-xl font-bold mb-5">
                🚩 Latest Reports
              </h2>

              <div className="space-y-4">

                {dashboard.latestReports.map((report) => (
                  <div
                    key={report._id}
                    className="border-b border-gray-700 pb-4"
                  >
                    <p className="font-semibold">
                      {report.message}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(report.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Latest Users */}
          {dashboard.latestUsers && (
            <div className="mt-10 bg-[#1F2937] rounded-xl p-6 shadow">

              <h2 className="text-xl font-bold mb-5">
                👥 Latest Users
              </h2>

              <div className="space-y-4">

                {dashboard.latestUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-4 border-b border-gray-700 pb-4"
                  >
                    <img
                      src={user.image}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h3>{user.name}</h3>
                      <p className="text-sm text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}