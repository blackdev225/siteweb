import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2560",
    title: "Our Workspace"
  },
  {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2560",
    title: "Creative Minds"
  },
  {
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2560",
    title: "Boutique Craft"
  }
];

export default function About() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-white text-black min-h-screen">
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="w-full h-full"
            >
              <img 
                src={HERO_SLIDES[currentSlide].image} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/60 text-xs font-serif italic tracking-[0.4em] uppercase mb-4"
                >
                  {HERO_SLIDES[currentSlide].title}
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter mb-4 leading-none"
                >
                  {t("navAbout")}
                </motion.h1>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-12 uppercase tracking-tighter">Vision Studio 360</h2>
        <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-500 mb-16">
          {t("studioDescription")}
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
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-12">{t("ourServices")}</h3>
          <ul className="space-y-6 text-2xl font-display font-medium uppercase tracking-tighter">
             <li>{t("archViz")}</li>
             <li>{t("interior3d")}</li>
             <li>{t("cinematicAnim")}</li>
             <li>{t("vrExperience")}</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-12">{t("expertise")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center md:items-start">
               <div className="w-24 h-24 bg-neutral-100 rounded-full mb-6 overflow-hidden grayscale">
                 <div className="w-full h-full bg-neutral-200" />
               </div>
               <h4 className="text-lg font-bold uppercase tracking-tighter mb-1">Hans Daniel ZADY</h4>
               <p className="text-neutral-400 text-[10px] uppercase tracking-widest mb-4">Founder & Lead 3D Visualizer</p>
               <a href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">LinkedIn</a>
            </div>

            <div className="flex flex-col items-center md:items-start">
               <div className="w-24 h-24 bg-neutral-100 rounded-full mb-6 overflow-hidden grayscale">
                 <div className="w-full h-full bg-neutral-200" />
               </div>
               <h4 className="text-lg font-bold uppercase tracking-tighter mb-1">Abigail KOUADIO</h4>
               <p className="text-neutral-400 text-[10px] uppercase tracking-widest mb-4">3D Artist & Interior Designer</p>
               <a href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">LinkedIn</a>
            </div>

            <div className="flex flex-col items-center md:items-start">
               <div className="w-24 h-24 bg-neutral-100 rounded-full mb-6 overflow-hidden grayscale">
                 <div className="w-full h-full bg-neutral-200" />
               </div>
               <h4 className="text-lg font-bold uppercase tracking-tighter mb-1">Joane LIALI</h4>
               <p className="text-neutral-400 text-[10px] uppercase tracking-widest mb-4">Architectural Visualizer</p>
               <a href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
