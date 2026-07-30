import Link from "next/link";

export default async function HomeSections() {
  const res = await fetch("http://localhost:5000/recipe", {
    cache: "no-store",
  });

  const recipes = await res.json();

  // Top 4 by likes
  const featuredRecipes = [...recipes]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4);

  // Shuffle for random sections
  const shuffled = [...recipes].sort(() => Math.random() - 0.5);

  const randomRecipes = shuffled.slice(0, 4);
  const popularRecipes = shuffled.slice(4, 8);

  return (
    <div className="max-w-7xl mx-auto px-5 py-16 space-y-24">
      {/* ================= WHAT WE'RE CRAVING ================= */}

      <section>
        <h2 className="inline-block bg-yellow-300 px-4 py-2 font-bold uppercase mb-8">
          What We're Craving
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredRecipes.map((recipe) => (
            <Link
              href={`/recipe/${recipe._id}`}
              key={recipe._id}
              className="group"
            >
              <div className="overflow-hidden rounded-xl shadow">
                <img
                  src={recipe.image}
                  alt={recipe.recipeName}
                  className="w-full aspect-square object-cover group-hover:scale-110 duration-300"
                />
              </div>

              <h3 className="text-center mt-3 font-semibold line-clamp-1">
                {recipe.recipeName}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= MORE RECIPES ================= */}

      <section>
        <h2 className="inline-block bg-yellow-300 px-4 py-2 font-bold uppercase mb-8">
          More Recipes
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {randomRecipes.map((recipe) => (
            <Link
              href={`/recipe/${recipe._id}`}
              key={recipe._id}
              className="text-center group"
            >
              <img
                src={recipe.image}
                alt={recipe.recipeName}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg group-hover:scale-110 duration-300"
              />

              <h3 className="mt-3 font-medium line-clamp-1">
                {recipe.recipeName}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= THE MOST POPULAR RECIPES ================= */}

      <section className="grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <h2 className="text-5xl font-black leading-tight">
            The Most Popular
            <br />
            Recipes on
            <br />
            RecipeHub
            <br />
            Right Now
          </h2>

          <p className="mt-6 text-gray-500 leading-8">
            Discover trending recipes loved by our community. Browse delicious
            meals, save your favorites, and explore something new every day.
          </p>
        </div>

        <div className="space-y-6">
          {popularRecipes.map((recipe) => (
            <Link
              href={`/recipe/${recipe._id}`}
              key={recipe._id}
              className="flex gap-5 group"
            >
              <img
                src={recipe.image}
                alt={recipe.recipeName}
                className="w-28 h-28 rounded-lg object-cover flex-shrink-0"
              />

              <div>
                <h3 className="font-bold text-lg group-hover:text-orange-500 duration-300">
                  {recipe.recipeName}
                </h3>

                <p className="text-gray-500 line-clamp-3 mt-2">
                  {recipe.procedure}
                </p>

                <p className="mt-3 text-orange-500 font-medium">
                  ❤️ {recipe.likes}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
