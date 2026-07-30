"use client";

import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { createRecipe } from "@/lib/actions";
import {  useSession } from "@/lib/auth-client";

export default function AddRecipePage() {
  const router = useRouter();
   const {data : session , isPending} = useSession();
  const userid = session?.session.userId;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const recipe = {
      userId: userid,
      image: form.image.value,
      recipeName: form.recipeName.value,
      ingredients: form.ingredients.value,
      procedure: form.procedure.value,
      calories: Number(form.calories.value),
      likes:0,
      nutrition: form.nutrition.value,
      createdAt: new Date(),
    };

    try {
      const result = await createRecipe(recipe);

      if (result.insertedId) {
        alert("Recipe added successfully!");

        form.reset();

        // Uncomment if you want to redirect after posting
        // router.push("/");
      } else {
        alert("Failed to add recipe.");
      }
    } catch (error) {
  console.error("Error:", error);
  alert(error.message);
}

    setLoading(false);
  };

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto rounded-lg shadow-sm p-6 sm:p-8">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-8"
        >
          <FiArrowLeft />
          Back to home
        </button>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Recipe Image */}
          <div>
            <label className="block font-medium text-white mb-2">
              Recipe Image
            </label>

            <input
              type="url"
              name="image"
              required
              placeholder="https://example.com/recipe-image.jpg"
              className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />

            <p className="text-sm text-gray-500 mt-2">
              Paste the direct image URL of your recipe.
            </p>
          </div>

          {/* Recipe Name */}
          <div>
            <label className="block font-medium text-white mb-2">
              Recipe Name
            </label>

            <input
              type="text"
              name="recipeName"
              required
              placeholder="What do you call your recipe?"
              className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block font-medium text-white mb-2">
              Ingredients
            </label>

            <textarea
              name="ingredients"
              rows={5}
              required
              placeholder="List your ingredients."
              className="w-full border border-gray-300 rounded px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>

          {/* Procedure */}
          <div>
            <label className="block font-medium text-white mb-2">
              Procedure
            </label>

            <textarea
              name="procedure"
              rows={5}
              required
              placeholder="How do you cook your recipe?"
              className="w-full border border-gray-300 rounded px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>

          {/* Calories */}
          <div>
            <label className="block font-medium text-white mb-2">
              Calory Count
            </label>

            <input
              type="number"
              name="calories"
              required
              placeholder="What's your calorie count?"
              className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>

          {/* Nutrition */}
          <div>
            <label className="block font-medium text-white mb-2">
              Nutrition Values
            </label>

            <textarea
              name="nutrition"
              rows={5}
              required
              placeholder="List your nutrition values."
              className="w-full border border-gray-300 rounded px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-medium px-8 py-3 rounded transition"
            >
              {loading ? "Posting..." : "Post Recipe"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}