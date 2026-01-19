import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

const HERO_SLIDES = [
  {
    image: "/images/hero/hero-1.jpg",
    title: "Cinematic Vision"
  },
  {
    image: "/images/hero/hero-2.jpg",
    title: "Elegance in Detail"
  },
  {
    image: "/images/hero/hero3.jpg",
    title: "Structural Art"
  },
  {
    image: "/images/hero/hero-4.jpg",
    title: "Spatial Storytelling"
  }
];

export default function Home() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { 
      id: "featured",
      title: t("navFeatured"), 
      image: "/images/hero/hero-1.jpg",
      link: "/featured",
      label: "Curated Projects"
    },
    { 
      id: "gallery",
      title: t("navGallery"), 
      image: "/images/hero/hero-2.jpg",
      link: "/gallery",
      label: "Stills & Animations"
    },
    { 
      id: "interactive",
      title: t("navInteractive"), 
      image: "/images/hero/hero3.jpg",
      link: "/interactive",
      label: "VR & 360"
    },
    { 
      id: "about",
      title: t("navAbout"), 
      image: "/images/hero/hero-4.jpg",
      link: "/about",
      label: "Our Studio"
    }
  ];

  return (
    <div className="bg-white scroll-smooth">
      {/* SCREEN 1: HERO SLIDESHOW */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <motion.img
                src={HERO_SLIDES[currentSlide].image}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="w-full h-full object-cover object-center"
                loading="eager"
                alt={HERO_SLIDES[currentSlide].title}
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-white/60 text-xs font-serif italic tracking-[0.4em] uppercase mb-4"
                >
                  {HERO_SLIDES[currentSlide].title}
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-bold text-4xl md:text-9xl text-white tracking-tighter uppercase px-4 md:px-0"
                >
                  Vision Studio 360
                </motion.h1>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white z-10"
        >
          <ArrowDown className="w-6 h-6 opacity-50" strokeWidth={1} />
        </motion.div>
      </section>

      {/* SCREEN 2: CONTENT */}
      <section className="bg-white py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold mb-4 leading-[1.2]"
          >
            {t("introTitle")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg md:text-2xl font-serif italic text-neutral-400 leading-[1.6]"
          >
            {t("introSub")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-1 md:gap-0">
          {categories.map((cat, index) => (
            <Link key={cat.id} href={cat.link} className="group relative h-[400px] md:h-[600px] block overflow-hidden will-change-transform">
              <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 text-center text-white active:scale-95 transition-transform">
                <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tighter mb-1 leading-[1.2]">
                  {cat.title}
                </h3>
                <p className="text-sm font-serif italic opacity-70 leading-[1.6]">
                  {cat.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}