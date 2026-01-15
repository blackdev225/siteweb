import { Project } from "@shared/schema";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
}

export function ProjectCard({ project, onClick, className, aspectRatio = "video" }: ProjectCardProps) {
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`group relative cursor-pointer overflow-hidden bg-neutral-100 ${className}`}
      onClick={() => onClick(project)}
    >
      <div className={`w-full ${aspectClasses[aspectRatio]} overflow-hidden`}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6 md:p-8">
        <div className="flex justify-end">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white bg-white/10 backdrop-blur-sm">
            <Plus className="w-5 h-5" />
          </div>
        </div>
        
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white/70 text-sm uppercase tracking-widest mb-2 font-medium">
            {project.subtitle || project.type}
          </p>
          <h3 className="text-white text-2xl md:text-3xl font-display font-bold leading-tight">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
