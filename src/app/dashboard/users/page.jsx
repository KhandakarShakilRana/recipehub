"use client";

import AdminOnly from "@/components/AdminOnly";
import { useEffect, useState } from "react";
import {
  FaTrash,
  FaUserShield,
  FaUser,
} from "react-icons/fa";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.deletedCount > 0) {
      setUsers(users.filter((u) => u._id !== id));
    }
  };

  const changeRole = async (id, role) => {
    const newRole =
      role === "admin"
        ? "general"
        : "admin";

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/role/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: newRole,
        }),
      }
    );

    setUsers(
      users.map((u) =>
        u._id === id
          ? {
              ...u,
              role: newRole,
            }
          : u
      )
    );
  };

  return (
    <AdminOnly>
        <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Manage Users
      </h1>

      <div className="overflow-x-auto rounded-xl shadow bg-[#1F2937]">

        <table className="w-full">

          <thead className="bg-[#111827]">

            <tr>

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-t border-gray-700"
              >

                <td className="p-4">

                  <img
                    src={user.image}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                </td>

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role === "admin"
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  >
                    {user.role}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        changeRole(
                          user._id,
                          user.role
                        )
                      }
                      className="bg-blue-600 p-2 rounded"
                    >
                      {user.role === "admin" ? (
                        <FaUser />
                      ) : (
                        <FaUserShield />
                      )}
                    </button>

                    <button
                      onClick={() =>
                        deleteUser(user._id)
                      }
                      className="bg-red-600 p-2 rounded"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
    </AdminOnly>
  );
}