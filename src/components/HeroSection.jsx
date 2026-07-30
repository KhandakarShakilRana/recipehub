// components/Header.tsx

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[260px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden">

        {/* Background Image */}
        <Image
          src="/images/header-banner.jpg" // Replace with your image
          alt="Header Banner"
          fill
          priority
          className="object-cover"
        />

        {/* Optional Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Bottom Left Button */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8">
          <Link href="/add-recipe">
            <button className="bg-[#E4A951] hover:bg-[#d63d18] text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
              Add Recipe
            </button>
          </Link>
          <Link href="/recipe">
            <button className="bg-[#E4A951] ml-4 hover:bg-[#d63d18] text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
              Browse Recipe
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}