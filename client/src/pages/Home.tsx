import { motion } from "framer-motion";
import { ArrowDown, MoveRight } from "lucide-react";
import { Link } from "wouter";
import { useProjects } from "@/hooks/use-projects";

export default function Home() {
  // Use "featured" projects for the grid if available, otherwise fetch all
  const { data: projects, isLoading } = useProjects({ category: 'featured' });

  const categories = [
    { 
      id: "featured",
      title: "Featured Works", 
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
      link: "/featured"
    },
    { 
      id: "gallery",
      title: "Visual Gallery", 
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
      link: "/gallery"
    },
    { 
      id: "interactive",
      title: "Interactive / VR", 
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=2000",
      link: "/interactive"
    },
    { 
      id: "about",
      title: "The Studio", 
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
      link: "/about"
    }
  ];

  return (
    <div className="bg-white">
      {/* SCREEN 1: HERO */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect could go here if we added scroll listener */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash: Minimalist modern architecture exterior */}
          <img 
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=2560" 
            alt="Hero Architecture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display font-bold text-5xl md:text-8xl lg:text-9xl text-white tracking-tighter mb-6 uppercase"
          >
            Vision Studio 360
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-serif italic text-xl md:text-3xl text-white/90 font-light"
          >
            Crafting Visual Identities For Architecture
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white z-10"
        >
          <ArrowDown className="w-8 h-8 opacity-70" strokeWidth={1} />
        </motion.div>
      </section>

      {/* SCREEN 2: INTRO & CATEGORIES */}
      <section className="min-h-screen bg-white">
        <div className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24 max-w-4xl"
          >
            <h2 className="text-4xl md:text-6xl font-display font-light leading-tight tracking-tight text-neutral-900 mb-8">
              Transforming architectural visions into <span className="italic font-serif">emotive reality</span> through light, composition, and technology.
            </h2>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-neutral-600 transition-colors">
              Read our story <MoveRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-[2400px] md:h-[600px] w-full">
            {categories.map((cat, index) => (
              <Link key={cat.id} href={cat.link} className="group relative w-full h-full block overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500" />
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white/60 text-xs font-mono mb-2 block">0{index + 1}</span>
                    <h3 className="text-white text-3xl font-display font-medium leading-none mb-4">
                      {cat.title}
                    </h3>
                    <div className="h-[1px] w-12 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
