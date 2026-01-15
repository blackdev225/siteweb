import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Project } from "@shared/schema";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Featured() {
  const { data: projects, isLoading } = useProjects({ category: 'featured' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          {/* Unsplash: Modern high-rise architecture */}
          <img 
            src="https://images.unsplash.com/photo-1552945233-0c4659b8be56?auto=format&fit=crop&q=80&w=2560" 
            alt="Featured Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4"
          >
            Featured Works
          </motion.h1>
          <p className="font-light text-xl opacity-80 max-w-2xl mx-auto">
            A curated selection of our most iconic architectural visualizations.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {projects?.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject}
                className={idx % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"}
                aspectRatio={idx % 3 === 0 ? "video" : "square"}
              />
            ))}
            {(!projects || projects.length === 0) && (
               <div className="col-span-full text-center py-20 text-neutral-400">
                 No featured projects found. Add some to the database.
               </div>
            )}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 border-none bg-black/95 text-white overflow-hidden flex flex-col md:flex-row">
          {selectedProject && (
            <>
              <div className="flex-1 h-1/2 md:h-full relative bg-neutral-900 flex items-center justify-center">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="w-full md:w-[400px] p-8 md:p-12 flex flex-col justify-center border-l border-white/10 bg-neutral-950">
                <span className="text-neutral-500 uppercase tracking-widest text-xs mb-4">
                  {selectedProject.type}
                </span>
                <h2 className="text-3xl font-display font-bold mb-2">{selectedProject.title}</h2>
                <p className="text-xl text-neutral-400 font-light mb-8 italic">
                  {selectedProject.subtitle}
                </p>
                
                <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
                  <p>{selectedProject.description || "A stunning architectural visualization showcasing modern design principles and atmospheric lighting."}</p>
                </div>

                {selectedProject.tags && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 border border-neutral-800 rounded-full text-xs text-neutral-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
