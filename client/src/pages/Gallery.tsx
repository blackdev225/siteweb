import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Project } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type FilterType = "all" | "exterior" | "interior" | "animation";

export default function Gallery() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { data: projects, isLoading } = useProjects(
    filter === "all" ? undefined : { type: filter }
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "All Works" },
    { id: "exterior", label: "Exteriors" },
    { id: "interior", label: "Interiors" },
    { id: "animation", label: "Animations" },
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-neutral-100 pb-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase mb-4">
              Gallery
            </h1>
            <p className="text-neutral-500 max-w-md">
              A comprehensive archive of our architectural visualizations, from concept to final render.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300",
                  filter === f.id
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject}
                aspectRatio="square"
              />
            ))}
             {(!projects || projects.length === 0) && (
               <div className="col-span-full text-center py-20 text-neutral-400 bg-neutral-50">
                 No projects found in this category.
               </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-5xl w-full bg-transparent border-none p-0 shadow-none">
          {selectedProject && (
            <div className="relative group">
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title} 
                className="w-full h-auto rounded-sm shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                 <h3 className="text-2xl font-display font-bold">{selectedProject.title}</h3>
                 <p className="text-sm opacity-80">{selectedProject.subtitle}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
