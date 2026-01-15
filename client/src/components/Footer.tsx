import { Link } from "wouter";
import { Box, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white text-black py-12 px-6 md:px-12 border-t border-neutral-100">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-400">
          <Link href="/" className="text-black font-bold tracking-tighter flex items-center gap-2">
            <Box className="w-4 h-4" strokeWidth={2} />
            VISION STUDIO 360
          </Link>
          <span className="hidden md:block opacity-30">|</span>
          <p>{t("footerLegal")}</p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-neutral-400 hover:text-black transition-colors">
            <Instagram className="w-5 h-5" strokeWidth={1.5} />
          </a>
          <a href="#" className="text-neutral-400 hover:text-black transition-colors">
            <Linkedin className="w-5 h-5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
