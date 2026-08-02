
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import LikeButton from "@/components/LikeButton";
import ReportModal from "@/components/ReportModal";


export default async function RecipeDetails({ params }) {
  const { id } = await params;

  // 1. Fetch current recipe safely
  let recipe = null;
  try {
    const res = await fetch(`http://localhost:5000/recipe/${id}`, {
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type");
    if (res.ok && contentType && contentType.includes("application/json")) {
      recipe = await res.json();
    } else {
      notFound();
    }
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
    notFound();
  }

  // 2. Fetch all recipes for "You May Also Like" safely
  let recipes = [];
  try {
    const allRes = await fetch("http://localhost:5000/recipe", {
      cache: "no-store",
    });

    const contentType = allRes.headers.get("content-type");
    if (allRes.ok && contentType && contentType.includes("application/json")) {
      recipes = await allRes.json();
    }
  } catch (error) {
    console.error("Failed to fetch related recipes:", error);
  }

  const related = Array.isArray(recipes)
    ? recipes.filter((item) => item._id !== recipe._id).slice(0, 4)
    : [];

  return (
    <main className="max-w-7xl mx-auto px-5 py-10">
      <Link
        href="/recipe"
        className="inline-flex items-center gap-2 mb-8 text-orange-500 hover:text-orange-600"
      >
        <FaArrowLeft />
        Back
      </Link>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <img
            src={recipe.image}
            alt={recipe.recipeName}
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Details */}
        <div>
            
          <h1 className="text-5xl font-bold mb-4">{recipe.recipeName}</h1>

          <div className="flex gap-8 mb-8">
            <div>
              <p className="text-gray-500 text-sm">Calories</p>
              <h2 className="text-3xl font-bold">{recipe.calories}</h2>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Likes</p>
              <h2 className="text-sm font-bold"><LikeButton
  recipeId={recipe._id}
  initialLikes={recipe.likes}
/></h2>
            </div>
           
          </div>

          <h3 className="text-xl font-semibold mb-3">Nutrition</h3>
          <p className="whitespace-pre-line mb-8">{recipe.nutrition}</p>

          <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
          <p className="whitespace-pre-line mb-8">{recipe.ingredients}</p>

          <h3 className="text-xl font-semibold mb-3">Procedure</h3>
          <p className="whitespace-pre-line">{recipe.procedure}</p>
          
        </div>
        <ReportModal recipeId={recipe._id}></ReportModal>
        
         
      </div>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((item) => (
            <Link
              href={`/recipe/${item._id}`}
              key={item._id}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={item.image}
                  alt={item.recipeName}
                  className="w-full h-full object-cover group-hover:scale-110 duration-300"
                />

                <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow">
                  <FaHeart className="text-gray-500 text-sm" />
                </div>
              </div>

              <h3 className="font-semibold mt-3 line-clamp-1">
                {item.recipeName}
              </h3>

              <p className="text-sm text-gray-500">{item.calories} Calories</p>

              <p className="text-orange-500">❤️ {item.likes}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}