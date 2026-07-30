import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { notFound } from "next/navigation";

export default async function UserProfile({ params }) {
  const { id } = await params;

  const userRes = await fetch(`http://localhost:5000/user/${id}`, {
    cache: "no-store",
  });

  if (!userRes.ok) {
    notFound();
  }

  const user = await userRes.json();

  const recipeRes = await fetch("http://localhost:5000/recipe", {
    cache: "no-store",
  });

  const recipes = await recipeRes.json();

  const userRecipes = recipes.filter(
    (recipe) => recipe.userId === id
  );

  return (
    <main className="max-w-7xl mx-auto px-5 py-10">

      {/* Profile */}

      <div className="flex flex-col md:flex-row items-center gap-8 mb-14">

        <img
          src={user.image}
          alt={user.name}
          className="w-36 h-36 rounded-full object-cover border-4 border-orange-500 shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold">
            {user.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {user.email}
          </p>

          <div className="flex gap-8 mt-6">

            <div>
              <p className="text-3xl font-bold">
                {userRecipes.length}
              </p>

              <p className="text-gray-500">
                Recipes
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">
                {userRecipes.reduce((sum, recipe) => sum + recipe.likes, 0)}
              </p>

              <p className="text-gray-500">
                Total Likes
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Recipes */}

      <h2 className="text-3xl font-bold mb-8">
        Recipes by {user.name}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

        {userRecipes.map((recipe) => (

          <Link
            href={`/recipe/${recipe._id}`}
            key={recipe._id}
            className="group"
          >

            <div className="relative overflow-hidden rounded-xl aspect-square">

              <img
                src={recipe.image}
                alt={recipe.recipeName}
                className="w-full h-full object-cover group-hover:scale-110 duration-300"
              />

              <div className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                <FaHeart className="text-gray-500 text-sm" />
              </div>

            </div>

            <h3 className="font-semibold mt-3 line-clamp-1">
              {recipe.recipeName}
            </h3>

            <p className="text-sm text-gray-500">
              {recipe.calories} Calories
            </p>

            <p className="text-orange-500 font-medium">
              ❤️ {recipe.likes}
            </p>

          </Link>

        ))}

      </div>

    </main>
  );
}