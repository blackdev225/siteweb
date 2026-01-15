import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Project } from "@shared/schema";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function Featured() {
  const { data: projects, isLoading } = useProjects({ category: 'featured' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552945233-0c4659b8be56?auto=format&fit=crop&q=80&w=2560" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-9xl font-bold uppercase tracking-tighter mb-4"
          >
            {t("navFeatured")}
          </motion.h1>
          <p className="font-serif italic text-xl md:text-2xl opacity-80">Curated Projects</p>
        </div>
      </section>

      <section className="py-32 px-6 md:px-0">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
            {projects?.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject}
                className="aspect-[16/9]"
                aspectRatio="video"
              />
            ))}
          </div>
        )}
      </section>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 border-none bg-black text-white rounded-none">
          {selectedProject && (
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="max-w-full max-h-[80vh] object-contain mb-8"
                />
                <h2 className="text-4xl font-display font-bold uppercase tracking-tighter">{selectedProject.title}</h2>
                <p className="text-neutral-500 font-serif italic">{selectedProject.subtitle}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
