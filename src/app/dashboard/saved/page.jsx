"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { FaHeart, FaEye, FaTrash } from "react-icons/fa";

export default function SavedRecipes() {
  const { data: session } = useSession();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/saved-recipes/${session.user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      });
  }, [session]);

  const handleRemove = async (recipeId) => {
    const confirmRemove = confirm(
      "Remove this recipe from your saved recipes?"
    );

    if (!confirmRemove) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-recipe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        recipeId,
      }),
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      setRecipes((prev) =>
        prev.filter((recipe) => recipe._id !== recipeId)
      );
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          ❤️ Saved Recipes
        </h1>

        <p className="text-gray-500">
          {recipes.length} Saved Recipe{recipes.length !== 1 && "s"}
        </p>

      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20">

          <h2 className="text-2xl font-bold">
            No Saved Recipes
          </h2>

          <p className="text-gray-500 mt-3">
            Save your favorite recipes to view them later.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-600 rounded-xl shadow">

          <table className="w-full">

            <thead className="bg-gray-700">

              <tr>

                <th className="text-left p-4">
                  Image
                </th>

                <th className="text-left p-4">
                  Recipe
                </th>

                <th className="text-left p-4">
                  Calories
                </th>

                <th className="text-left p-4">
                  Likes
                </th>

                <th className="text-left p-4">
                  Posted
                </th>

                <th className="text-center p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {recipes.map((recipe) => (

                <tr
                  key={recipe._id}
                  className="border-t border-gray-500"
                >

                  <td className="p-4">

                    <img
                      src={recipe.image}
                      alt={recipe.recipeName}
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

                    <span className="flex items-center gap-2 text-red-500">
                      <FaHeart />
                      {recipe.likes}
                    </span>

                  </td>

                  <td className="p-4">
                    {new Date(recipe.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        href={`/recipe/${recipe._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() => handleRemove(recipe._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded cursor-pointer"
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
      )}

    </div>
  );
}