import Image from "next/image";
import SocialLinks from "./SocialLinks";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero-1.jpg"
          alt="Ronald Mweema"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Circular profile photo */}
        <div className="mx-auto mb-8 w-40 h-50 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg">
          <Image
            src="/assets/images/ronald1.png"
            alt="Ronald Mweema"
            width={200}
            height={200}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hi, I&aposm Ronald Mweema
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Frontend Developer | UI/UX Enthusiast
        </p>

        <div className="flex justify-center space-x-4 mb-8">
          <SocialLinks
            iconSize="lg"
            className="text-white dark:text-white/90"
          />
        </div>

        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition cursor-pointer">
          <Link href="/projects">View My Work</Link>
        </button>
      </div>
    </section>
  );
}
