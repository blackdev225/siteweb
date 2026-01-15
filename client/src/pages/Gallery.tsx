import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Project } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

type FilterType = "all" | "exterior" | "interior" | "animation";

export default function Gallery() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { data: projects, isLoading } = useProjects(
    filter === "all" ? undefined : { type: filter }
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useLanguage();

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {projects?.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject}
                aspectRatio="square"
              />
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 border-none bg-black text-white rounded-none">
          {selectedProject && (
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="max-w-full max-h-[85vh] object-contain"
                />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
