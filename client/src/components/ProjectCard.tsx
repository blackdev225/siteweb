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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`group relative cursor-pointer overflow-hidden bg-neutral-100 will-change-transform active:scale-[0.98] transition-transform ${className}`}
      onClick={() => onClick(project)}
    >
      <div className={`w-full ${aspectClasses[aspectRatio]} overflow-hidden`}>
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex flex-col justify-center items-center p-6 md:p-8 opacity-0 group-hover:opacity-100">
        <div className="text-center">
          <h3 className="text-white text-2xl md:text-3xl font-display font-bold uppercase tracking-tighter leading-tight mb-1">
            {project.title}
          </h3>
          <p className="text-white/60 text-xs font-serif italic tracking-widest">
            {project.subtitle || project.type}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
