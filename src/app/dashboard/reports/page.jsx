"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaEye,
  FaTrash,
  FaTimesCircle,
} from "react-icons/fa";
import AdminOnly from "@/components/AdminOnly";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reports`)
      .then((res) => res.json())
      .then(setReports);
  }, []);

  const deleteReport = async (id) => {
    if (!confirm("Delete this report?")) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/report/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.deletedCount > 0) {
      setReports((prev) =>
        prev.filter((r) => r._id !== id)
      );
    }
  };

  const deleteRecipe = async (recipeId) => {
    if (!confirm("Delete this recipe permanently?"))
      return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/report/recipe/${recipeId}`,
      {
        method: "DELETE",
      }
    );

    setReports((prev) =>
      prev.filter((r) => r.recipeId !== recipeId)
    );
  };

  return (
    <AdminOnly>
        <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Review Reports
      </h1>

      <div className="overflow-x-auto rounded-xl bg-[#1F2937] shadow">

        <table className="w-full">

          <thead className="bg-[#111827]">

            <tr>

              <th className="p-4">Recipe</th>

              <th className="p-4">Reporter</th>

              <th className="p-4">Reason</th>

              <th className="p-4">Date</th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report) => (

              <tr
                key={report._id}
                className="border-t border-gray-700"
              >

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <img
                      src={report.recipeImage}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div>

                      <h3 className="font-semibold">
                        {report.recipeName}
                      </h3>

                      <p>
                        ❤️ {report.recipeLikes}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <img
                      src={report.reporterImage}
                      className="w-10 h-10 rounded-full"
                    />

                    <div>

                      <h3>
                        {report.reporterName}
                      </h3>

                      <p className="text-sm text-gray-400">
                        {report.reporterEmail}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="p-4">
                  {report.message}
                </td>

                <td className="p-4">
                  {new Date(
                    report.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/recipe/${report.recipeId}`}
                      className="bg-blue-600 p-2 rounded"
                    >
                      <FaEye />
                    </Link>

                    <button
                      onClick={() =>
                        deleteReport(report._id)
                      }
                      className="bg-yellow-600 p-2 rounded cursor-pointer"
                    >
                      <FaTimesCircle />
                    </button>

                    <button
                      onClick={() =>
                        deleteRecipe(report.recipeId)
                      }
                      className="bg-red-600 p-2 rounded cursor-pointer"
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