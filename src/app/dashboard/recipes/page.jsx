"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaTrash, FaSearch } from "react-icons/fa";
import AdminOnly from "@/components/AdminOnly";

export default function ManageRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/recipes`)
      .then((res) => res.json())
      .then(setRecipes);
  }, []);

  const deleteRecipe = async (id) => {
    if (!confirm("Delete this recipe?")) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminOnly>
        <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Manage Recipes
      </h1>

      <div className="mb-6 relative">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
          className="w-full bg-[#1F2937] rounded-lg py-3 pl-12 pr-4 outline-none"
        />

      </div>

      <div className="overflow-x-auto rounded-xl bg-[#1F2937] shadow">

        <table className="w-full">

          <thead className="bg-[#111827]">

            <tr>

              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Recipe</th>

              <th className="p-4 text-left">Calories</th>

              <th className="p-4 text-left">Likes</th>

              <th className="p-4 text-left">Created</th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredRecipes.map((recipe) => (

              <tr
                key={recipe._id}
                className="border-t border-gray-700"
              >

                <td className="p-4">

                  <img
                    src={recipe.image}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                </td>

                <td className="p-4 font-semibold">
                  {recipe.recipeName}
                </td>

                <td className="p-4">
                  {recipe.calories}
                </td>

                <td className="p-4">
                  ❤️ {recipe.likes}
                </td>

                <td className="p-4">
                  {new Date(recipe.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/recipe/${recipe._id}`}
                      className="bg-blue-600 p-2 rounded"
                    >
                      <FaEye />
                    </Link>

                    <button
                      onClick={() => deleteRecipe(recipe._id)}
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