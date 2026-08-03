"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSession } from "@/lib/auth-client";

export default function ReportModal({ recipeId }) {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReport = async () => {
    if (!session?.user?.id) {
      alert("Please login first.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a reason.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId,
          reportedBy: session.user.id,
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Report submitted successfully.");

        setMessage("");
        setOpen(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-red-800 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
      >
        🚩 Report Recipe
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">

          <div className="bg-black rounded-2xl w-full max-w-lg p-6 relative border border-gray-700">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-2 text-white">
              Report Recipe
            </h2>

            <p className="text-gray-400 mb-5">
              Tell us why you're reporting this recipe.
            </p>

            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your reason here..."
              className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg p-4 outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                Cancel
              </button>

              <button
                onClick={handleReport}
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}