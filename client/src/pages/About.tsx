import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2560",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2560",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2560"
];

export default function About() {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-white text-black min-h-screen">
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImage}
              src={HERO_IMAGES[currentImage]} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6">
           <motion.h1
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter mb-4 leading-none"
           >
             {t("navAbout")}
           </motion.h1>
           <p className="text-lg md:text-2xl font-serif italic opacity-80 font-light">
             Our Studio & Approach
           </p>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-12 uppercase tracking-tighter">Vision Studio 360</h2>
        <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-500 mb-16">
          Vision Studio 360 is a boutique architectural visualization studio based in Abidjan, Côte d'Ivoire. We are a collective of multidisciplinary artists united by a shared passion for storytelling through visual language.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 py-16 border-y border-neutral-100">
          <div>
            <span className="block text-5xl font-display font-bold mb-2">6+</span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">{t("years")} {t("experience")}</span>
          </div>
          <div>
            <span className="block text-5xl font-display font-bold mb-2">50+</span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">{t("projects")}</span>
          </div>
          <div>
            <span className="block text-5xl font-display font-bold mb-2">100%</span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">{t("satisfaction")}</span>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-12">Our Services</h3>
          <ul className="space-y-6 text-2xl font-display font-medium uppercase tracking-tighter">
             <li>Architectural Visualization</li>
             <li>Interior Design 3D</li>
             <li>Cinematic Animations</li>
             <li>Virtual Reality Experiences</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-12">Expertise</h3>
          <div className="flex flex-col items-center md:items-start">
             <div className="w-32 h-32 bg-neutral-100 rounded-full mb-8 overflow-hidden grayscale">
               <div className="w-full h-full bg-neutral-200" />
             </div>
             <h4 className="text-xl font-bold uppercase tracking-tighter mb-2">Hans Daniel ZADY</h4>
             <p className="text-neutral-400 text-sm uppercase tracking-widest mb-6">Founder & Lead 3D Visualizer</p>
             <a href="#" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">LinkedIn</a>
          </div>
        </div>
      </section>
    </div>
  );
}
