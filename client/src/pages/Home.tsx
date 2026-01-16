import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=2560",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2560",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2560",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2560"
];

export default function Home() {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { 
      id: "featured",
      title: t("navFeatured"), 
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
      link: "/featured",
      label: "Curated Projects"
    },
    { 
      id: "gallery",
      title: t("navGallery"), 
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
      link: "/gallery",
      label: "Stills & Animations"
    },
    { 
      id: "interactive",
      title: t("navInteractive"), 
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=2000",
      link: "/interactive",
      label: "VR & 360"
    },
    { 
      id: "about",
      title: t("navAbout"), 
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
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
            <motion.img
              key={currentImage}
              src={HERO_IMAGES[currentImage]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-6xl md:text-9xl text-white tracking-tighter mb-4 uppercase"
          >
            Vision Studio 360
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-serif italic text-lg md:text-2xl text-white/80 font-light"
          >
            {t("heroTagline")}
          </motion.p>
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
      <section className="bg-white py-24 px-6 md:px-0">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            {t("introTitle")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-serif italic text-neutral-400"
          >
            {t("introSub")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
          {categories.map((cat, index) => (
            <Link key={cat.id} href={cat.link} className="group relative h-[600px] block overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 text-center text-white">
                <h3 className="text-3xl font-display font-bold uppercase tracking-tighter mb-1">
                  {cat.title}
                </h3>
                <p className="text-sm font-serif italic opacity-70">
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
