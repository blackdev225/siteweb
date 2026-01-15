import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero */}
      <section className="h-screen relative flex items-center">
        <div className="absolute inset-0 w-full h-full z-0">
           {/* Unsplash: Minimalist office or architect working */}
           <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2560" 
            alt="Studio Workspace" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/90" />
        </div>
        
        <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
           >
             <h1 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-8 leading-none">
               The<br/>Studio
             </h1>
             <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-600 max-w-xl">
               Vision Studio 360 is a boutique visualization practice based in Abidjan, dedicated to the art of architectural storytelling.
             </p>
           </motion.div>
        </div>
      </section>

      {/* Story & Stats */}
      <section className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
           <div className="md:col-span-4">
              <h3 className="text-sm font-bold uppercase tracking-widest border-t border-black pt-4">Our Story</h3>
           </div>
           <div className="md:col-span-8">
              <p className="text-2xl md:text-4xl font-light leading-tight mb-12">
                We believe that every project has a unique narrative waiting to be uncovered. Our approach combines technical precision with artistic intuition to create images that not only show space, but evoke feeling.
              </p>
              
              <div className="grid grid-cols-3 gap-8 border-t border-neutral-200 pt-8">
                <div>
                  <span className="block text-4xl md:text-6xl font-display font-bold mb-2">6+</span>
                  <span className="text-sm text-neutral-500 uppercase tracking-wider">Years Experience</span>
                </div>
                <div>
                  <span className="block text-4xl md:text-6xl font-display font-bold mb-2">50+</span>
                  <span className="text-sm text-neutral-500 uppercase tracking-wider">Projects Delivered</span>
                </div>
                <div>
                  <span className="block text-4xl md:text-6xl font-display font-bold mb-2">100%</span>
                  <span className="text-sm text-neutral-500 uppercase tracking-wider">Client Satisfaction</span>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-neutral-100 py-24 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-3xl font-display font-bold mb-8 uppercase">Services</h3>
            <ul className="space-y-4 text-lg font-light text-neutral-600">
               <li className="border-b border-neutral-200 pb-4">Architectural Visualization (CGI)</li>
               <li className="border-b border-neutral-200 pb-4">Interior Rendering</li>
               <li className="border-b border-neutral-200 pb-4">3D Animation & Walkthroughs</li>
               <li className="border-b border-neutral-200 pb-4">Virtual Reality (VR) Experiences</li>
               <li className="border-b border-neutral-200 pb-4">360° Interactive Tours</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-3xl font-display font-bold mb-8 uppercase">Founder</h3>
            <div className="flex gap-6 items-start">
               <div className="w-24 h-24 bg-neutral-300 rounded-full overflow-hidden shrink-0">
                 {/* Placeholder Avatar */}
                 <div className="w-full h-full bg-neutral-400 flex items-center justify-center text-white font-bold text-2xl">HZ</div>
               </div>
               <div>
                  <h4 className="text-xl font-bold">Hans Daniel ZADY</h4>
                  <p className="text-neutral-500 mb-4">Founder & Creative Director</p>
                  <p className="text-neutral-600 leading-relaxed">
                    With a background in architecture and a passion for digital art, Hans leads the studio with a keen eye for composition and light.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
