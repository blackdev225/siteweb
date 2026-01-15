import { Link } from "wouter";
import { Box, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-24">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Box className="w-8 h-8 text-white" strokeWidth={1} />
            <span className="font-display font-bold text-2xl tracking-tighter uppercase">
              Vision Studio 360
            </span>
          </Link>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
            A boutique architectural visualization studio crafting emotive imagery and immersive experiences for the built environment.
          </p>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg mb-6 text-neutral-300">Explore</h4>
          <ul className="space-y-4">
            <li><Link href="/featured" className="text-neutral-500 hover:text-white transition-colors">Featured</Link></li>
            <li><Link href="/gallery" className="text-neutral-500 hover:text-white transition-colors">Gallery</Link></li>
            <li><Link href="/interactive" className="text-neutral-500 hover:text-white transition-colors">Interactive</Link></li>
            <li><Link href="/about" className="text-neutral-500 hover:text-white transition-colors">Studio</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg mb-6 text-neutral-300">Contact</h4>
          <ul className="space-y-4 text-neutral-500">
            <li>Abidjan, Côte d'Ivoire</li>
            <li>hello@visionstudio360.com</li>
            <li>+225 07 07 00 00 00</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg mb-6 text-neutral-300">Social</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-white hover:text-white transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-white hover:text-white transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-white hover:text-white transition-all">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-neutral-600 text-xs uppercase tracking-wider">
        <p>&copy; {new Date().getFullYear()} Vision Studio 360. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
          <a href="#" className="hover:text-neutral-400">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
