import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Project } from "@shared/schema";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/use-language";

export default function Interactive() {
  const { data: projects, isLoading } = useProjects({ type: 'vr' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen text-black">
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
           <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2560" 
            alt="VR" 
            className="w-full h-full object-cover grayscale opacity-20"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter mb-6 leading-none">
            {t("navInteractive")}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 font-serif italic">
            Virtual Reality & 360° Experiences
          </p>
        </div>
      </section>

      <section className="py-32 px-6 md:px-0">
        <div className="max-w-4xl mx-auto text-center mb-32 px-6">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-8">{t("exploreDimensions")}</h2>
          <p className="text-xl font-light text-neutral-500 leading-relaxed">
            This section showcases our interactive experiences, where architecture and technology merge to create immersive journeys. From virtual reality environments to 360° imagery.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
            {projects?.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject} 
                aspectRatio="video"
                className="aspect-video"
              />
            ))}
          </div>
        )}
      </section>

      <section className="py-32 bg-neutral-50 border-y border-neutral-100 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-xs font-bold uppercase tracking-[0.4em] text-neutral-300">
           <span>Unreal Engine 5</span>
           <span>Lumion</span>
           <span>360° Tours</span>
           <span>WebVR</span>
        </div>
      </section>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 border-none bg-black text-white rounded-none">
          {selectedProject && (
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
               <img src={selectedProject.imageUrl} className="max-w-full max-h-[80vh] object-contain mb-8" />
               <h2 className="text-4xl font-display font-bold uppercase tracking-tighter">{selectedProject.title}</h2>
               <p className="text-neutral-500 font-serif italic">{t("experience")}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
