"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function SaveButton({ recipeId }) {
  const { data: session } = useSession();

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!session) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/save-recipe/${session.user.id}/${recipeId}`
    )
      .then((res) => res.json())
      .then((data) => setSaved(data.saved));
  }, [session, recipeId]);

  const handleSave = async () => {
    if (!session) {
      alert("Please login first");
      return;
    }

    if (saved) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-recipe`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          recipeId,
        }),
      });

      setSaved(false);
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          recipeId,
        }),
      });

      setSaved(true);
    }
  };

  return (
    <button
      onClick={handleSave}
      className={`px-6 py-3 rounded-full font-semibold transition ${
        saved
          ? "bg-green-600 text-white"
          : "bg-gray-200 text-black"
      }`}
    >
      {saved ? "✓ Saved" : "💾 Save Recipe"}
    </button>
  );
}