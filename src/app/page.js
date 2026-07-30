import HeroSection from "@/components/HeroSection";
import Homepage from "@/components/Homepage";
import Image from "next/image";
import { SiHomepage } from "react-icons/si";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <Homepage></Homepage>
    </div>
  );
}
