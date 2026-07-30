"use client";

import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";

export default function LikeButton({ recipeId, initialLikes }) {
  const { data: session } = useSession();
  console.log(session);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    fetch(
      `http://localhost:5000/likes/check?recipeId=${recipeId}&userId=${session.user.id}`
    )
      .then((res) => res.json())
      .then((data) => setLiked(data.liked));
  }, [recipeId, session]);

  const handleLike = async () => {
    if (!session?.user?.id) {
      alert("Please login first.");
      return;
    }

    if (loading) return;

    setLoading(true);

    const body = {
      recipeId,
      userId: session.user.id,
    };

    try {
      if (!liked) {
        const res = await fetch("http://localhost:5000/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        if (data.success) {
          setLiked(true);
          setLikes((prev) => prev + 1);
        }
      } else {
        const res = await fetch("http://localhost:5000/likes", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        if (data.success) {
          setLiked(false);
          setLikes((prev) => prev - 1);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition font-medium ${
        liked
          ? "bg-red-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-red-100"
      }`}
    >
      <FaHeart />

      <span>{liked ? "Liked" : "Like"}</span>

      <span>({likes})</span>
    </button>
  );
}