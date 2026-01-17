import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Project } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

type FilterType = "all" | "exterior" | "interior" | "animation";

export default function Gallery() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { data: projects, isLoading } = useProjects(
    filter === "all" ? undefined : { type: filter }
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useLanguage();

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!projects || !selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!projects || !selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const getGridSpan = (imageUrl: string) => {
    const isWide = imageUrl.toLowerCase().includes('landscape') || imageUrl.toLowerCase().includes('wide');
    if (isWide) {
      return "lg:col-span-3 md:col-span-2 col-span-1";
    }
    return "lg:col-span-2 md:col-span-1 col-span-1";
  };

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "exterior", label: "Exteriors" },
    { id: "interior", label: "Interiors" },
    { id: "animation", label: "Animations" },
  ];

  return (
    <div className="bg-white min-h-screen pt-40 pb-24">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-baseline gap-8 border-b border-neutral-100 pb-12">
          <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter uppercase leading-none">
            {t("navGallery")}
          </h1>

          <div className="flex flex-wrap gap-12 text-xs font-bold uppercase tracking-[0.3em]">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "transition-all duration-300 border-b-2 pb-2",
                  filter === f.id
                    ? "border-black text-black"
                    : "border-transparent text-neutral-300 hover:text-black"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {projects?.map((project) => (
              <div 
                key={project.id} 
                className={cn(getGridSpan(project.imageUrl))}
              >
                <ProjectCard 
                  project={project} 
                  onClick={setSelectedProject}
                  aspectRatio="auto"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 border-none bg-white text-black rounded-none">
          {selectedProject && (
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-0 md:p-12 relative">
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-50 p-2 hover:opacity-50 transition-opacity"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="w-full md:w-3/5 h-1/2 md:h-full flex items-center justify-center p-6 md:p-12">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="w-full md:w-2/5 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-12 md:pl-0">
                <div className="max-w-md">
                  <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-4 text-primary leading-none">
                    {selectedProject.title}
                  </h3>
                  <p className="text-neutral-400 text-sm md:text-base font-serif italic mb-8">
                    {selectedProject.subtitle || "Undisclosed"}
                  </p>
                  <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 mb-12">
                    {selectedProject.description}
                  </p>
                  
                  <div className="flex gap-12 items-center pt-12 border-t border-neutral-100">
                     <button 
                       onClick={handlePrevious}
                       className="p-4 hover:bg-neutral-50 transition-colors rounded-full"
                       aria-label="Previous image"
                     >
                        <ChevronLeft className="w-8 h-8" />
                     </button>
                     <button 
                       onClick={handleNext}
                       className="p-4 hover:bg-neutral-50 transition-colors rounded-full"
                       aria-label="Next image"
                     >
                        <ChevronRight className="w-8 h-8" />
                     </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
