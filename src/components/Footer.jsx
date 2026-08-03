// components/Footer.tsx
"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null;
  }
  
  return (
    <footer className="bg-[#efefef] ">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left */}
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">
              About Us
            </h2>

            <p className="text-gray-700 leading-7 max-w-lg">
              Our mission at CookBook is to make everyday cooking fun,
              because we believe that cooking is key to a happier and
              healthier life for people, communities and the planet.
              We empower homecooks all over the world to help each
              other by sharing recipes and cooking tips.
            </p>

            
          </div>

          {/* Right */}
          <div className="lg:pl-20">
            <h3 className="text-xl font-semibold uppercase tracking-wide mb-6">
              Learn More
            </h3>

            <ul className="space-y-3 text-gray-800">
              <li>
                <Link href="#" className="hover:underline">
                  CookBook Community
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:underline">
                  Feedback
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:underline">
                  Blog
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:underline">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <Link href="#">
                <Image
                  src="/images/instagram.png"
                  alt="Instagram"
                  width={34}
                  height={34}
                />
              </Link>

              <Link href="#">
                <Image
                  src="/images/facebook.png"
                  alt="Facebook"
                  width={34}
                  height={34}
                />
              </Link>

              <Link href="#">
                <Image
                  src="/images/pinterest.png"
                  alt="Pinterest"
                  width={34}
                  height={34}
                />
              </Link>

              <Link href="#">
                <Image
                  src="/images/twitter.png"
                  alt="Twitter"
                  width={34}
                  height={34}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Illustration */}
        <div className="mt-14">
          <Image
            src="/images/footer-vegetables.png"
            alt="Footer Decoration"
            width={1600}
            height={250}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </footer>
  );
}
