"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/recipe");
        const data = await res.json();

        setRecipes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
  {recipes.map((recipe) => (
    <Link
      href={`/recipe/${recipe._id}`}
      key={recipe._id}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square">
        <img
          src={recipe.image}
          alt={recipe.recipeName}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
        />

        {/* Heart Button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 bg-white w-8 h-8 rounded-full shadow flex justify-center items-center"
        >
          <FaHeart className="text-gray-500 text-sm" />
        </button>
      </div>

      {/* Recipe Info */}
      <div className="mt-3">
        <h2 className="font-semibold text-sm line-clamp-1">
          {recipe.recipeName}
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          {recipe.calories} Calories
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-orange-500 font-medium">
            ❤️ {recipe.likes}
          </span>

          <span className="text-xs text-gray-500">
            {new Date(recipe.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  ))}
</div>
    </main>
  );
}