import { useEffect, useState } from 'react';
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      } as const,
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      } as const,
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      } as const,
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      } as const,
    },
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const buttonVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 0.8,
      } as const,
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.3)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      } as const,
    },
    tap: { scale: 0.95 },
  };

  const backgroundVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.2,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      } as const,
    },
  };

  const scrollIndicatorVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const statsVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.8,
        ease: "easeOut" as const,
      } as const,
    },
  };

  // Separate motion props for floating elements
  const floatingElement1 = {
    animate: floatingAnimation,
  };

  const floatingElement2 = {
    animate: {
      ...floatingAnimation,
      y: [0, 20, 0],
    },
  };

  const underlineVariants = {
    animate: {
      width: ["0%", "100%", "0%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: 1,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        
        {/* Floating shapes */}
        <motion.div
          {...floatingElement1}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl"
        />
        <motion.div
          {...floatingElement2}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-pink-400/10 to-purple-400/10 blur-3xl"
        />
      </div>

      {/* Background image with parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <Image
          src="/assets/images/hero-1.jpg"
          alt="Background"
          fill
          className="object-cover opacity-30"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Profile Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="relative mx-auto mb-8 md:mb-12 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30" />
            
            {/* Profile image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image
                src="/assets/images/ronald.jpg"
                alt="Ronald Mweema"
                fill
                className="object-cover scale-110"
                priority
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
              />
            </div>
            
            {/* Decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full"
            />
          </motion.div>

          {/* Title & Description */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Hi, I&apos;m{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Ronald Mweema
                  </span>
                  <motion.span
                    variants={underlineVariants}
                    animate="animate"
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                  />
                </span>
              </span>
            </h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-2"
            >
              Frontend Developer & UI/UX Specialist
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
            >
              Crafting beautiful, responsive web experiences with modern technologies
              and attention to detail. <Link href="/about" className='group bg-transparent text-green-500 text-lg hover:text-green/10 transition-all duration-200'>
              <span className='bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent py-1 px-2 rounded-full'>About me click here
              </span>
                </Link>
            </motion.p>
          </motion.div>

          {/* Social Links - Remove hoverEffect if not supported */}
          <motion.div
            variants={itemVariants}
            className="mb-8 md:mb-12"
          >
            <SocialLinks
              iconSize="lg"
              className="text-white/90 hover:text-white"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/projects"
                className="group relative flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <FiArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: 0.1 }}
            >
              <a
                href="/resume.pdf"
                download
                className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                <FiDownload className="group-hover:animate-bounce" />
                <span>Download CV</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={scrollIndicatorVariants}
            animate="animate"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar for desktop */}
      <motion.div
        variants={statsVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:block absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10"
      >
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="py-6 text-center">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-white/70">Projects</div>
            </div>
            <div className="py-6 text-center">
              <div className="text-3xl font-bold">3+</div>
              <div className="text-white/70">Years Experience</div>
            </div>
            <div className="py-6 text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-white/70">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}