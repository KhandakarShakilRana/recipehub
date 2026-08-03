"use client"
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data : session , isPending} = useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut();
         // Refresh server components/session
    window.location.href = "/login";
    
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div><Link href="/#">RecipeHub</Link></div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          {session?.user ? (
        <>
          <li className="relative group list-none">

  {/* Profile Image */}
  <img
    src={session?.user?.image || "/default-avatar.png"}
    alt={session?.user?.name || "Profile"}
    referrerPolicy="no-referrer"
    className="h-10 w-10 rounded-full object-cover cursor-pointer border-2 border-transparent group-hover:border-yellow-400 transition"
  />

  {/* Dropdown */}
  <div className="absolute right-0 mt-3 w-52 rounded-lg bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

    {/* User Info */}
    <div className="px-4 py-3 border-b">
      <p className="font-semibold text-black">
        {session?.user?.name}
      </p>

      <p className="text-xs text-gray-500 truncate">
        {session?.user?.email}
      </p>
    </div>

    {/* Menu */}
    <Link
      href={`/user/${session?.user?.id}`}
      className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
    >
      👤 Profile
    </Link>

    <Link
      href="/dashboard"
      className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
    >
      📊 Dashboard
    </Link>

    <button
      onClick={handleSignOut}
      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 cursor-pointer"
    >
      🚪 Sign Out
    </button>

  </div>

</li>
        </>
      ) : (
        <>
          <li>
            <Link href="/login">Login</Link>
          </li>

          <li>
            <Link
              href="/register"
              className="bg-white px-4 py-2 text-black"
            >
              Sign Up
            </Link>
          </li>
        </>
      )}
        </ul>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            
            {session?.user ? (
        <>
          


          <li>
            <Link
              onClick={handleSignOut}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Sign Out
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/login">Login</Link>
          </li>

          <li>
            <Link
              href="/register"
              className="bg-white px-4 py-2 text-black"
            >
              Sign Up
            </Link>
          </li>
        </>
      )}
          </ul>
        </div>
      )}
    </nav>
  );
}
export default Navbar

