import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { Loader2, Cuboid, MonitorPlay, Glasses } from "lucide-react";
import { useState } from "react";
import { Project } from "@shared/schema";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Interactive() {
  const { data: projects, isLoading } = useProjects({ type: 'vr' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const technologies = [
    { name: "Unreal Engine 5", description: "Real-time rendering" },
    { name: "WebVR", description: "Browser-based experiences" },
    { name: "Oculus / Vive", description: "Fully immersive VR" },
    { name: "360° Panorama", description: "Interactive tours" }
  ];

  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      {/* Hero */}
      <section className="h-[80vh] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-40">
           {/* Unsplash: Abstract digital wireframe or futuristic space */}
           <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2560" 
            alt="VR Hero" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-8 flex justify-center"
          >
            <Cuboid className="w-16 h-16 text-white" strokeWidth={1} />
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
            Exploring New Dimensions
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto">
            Immersive virtual reality experiences and interactive walkthroughs that bring unbuilt spaces to life.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
           <Glasses className="w-6 h-6" />
           <h2 className="text-2xl uppercase tracking-widest font-medium">Interactive Projects</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {projects?.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject} 
                className="bg-neutral-900"
              />
            ))}
            {(!projects || projects.length === 0) && (
               <div className="col-span-full text-center py-20 border border-neutral-800 rounded-lg text-neutral-500">
                 No VR/Interactive projects currently available.
               </div>
            )}
          </div>
        )}
      </section>

      {/* Tech Stack */}
      <section className="border-t border-neutral-800 py-24 bg-black">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
           <h2 className="text-center font-display text-4xl mb-16 uppercase tracking-wider">Powered By</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {technologies.map((tech) => (
               <div key={tech.name} className="flex flex-col items-center text-center p-8 border border-neutral-800 hover:border-white transition-colors duration-300">
                 <MonitorPlay className="w-8 h-8 mb-4 text-neutral-500" />
                 <h3 className="text-lg font-bold mb-2">{tech.name}</h3>
                 <p className="text-sm text-neutral-500">{tech.description}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl bg-neutral-900 text-white border-neutral-800">
          {selectedProject && (
            <div>
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6 relative group cursor-pointer">
                 <img src={selectedProject.imageUrl} className="w-full h-full object-cover opacity-50" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all scale-90 group-hover:scale-100">
                      <MonitorPlay className="w-8 h-8 text-white fill-white" />
                    </div>
                 </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
              <p className="text-neutral-400">{selectedProject.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
