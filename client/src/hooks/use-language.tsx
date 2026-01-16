import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr";

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

const translations: Translations = {
  navHome: { en: "Home", fr: "Accueil" },
  navFeatured: { en: "Featured Projects", fr: "Projets Phares" },
  navGallery: { en: "Gallery", fr: "Galerie" },
  navInteractive: { en: "Interactive VR", fr: "VR Interactif" },
  navAbout: { en: "About Us", fr: "À Propos" },
  navContact: { en: "Contact", fr: "Contact" },
  heroTagline: { en: "Crafting Visual Identities For Architecture", fr: "Création d'Identités Visuelles pour l'Architecture" },
  introTitle: { en: "Vision Studio 360", fr: "Vision Studio 360" },
  introSub: { en: "Transforming Architectural Visions into Cinematic Reality", fr: "Transformer les Visions Architecturales en Réalité Cinématique" },
  readStory: { en: "Our Story", fr: "Notre Histoire" },
  footerLegal: { en: "Legal & Privacy", fr: "Mentions Légales" },
  exploreDimensions: { en: "Exploring New Dimensions", fr: "Explorer de Nouvelles Dimensions" },
  experience: { en: "Experience", fr: "Expérience" },
  years: { en: "Years", fr: "Ans" },
  projects: { en: "Projects", fr: "Projets" },
  satisfaction: { en: "Satisfaction", fr: "Satisfaction" },
  startProject: { en: "Start a Project", fr: "Démarrer un Projet" },
  getInTouch: { en: "Get In Touch", fr: "Nous Contacter" },
  sendMessage: { en: "Send Message", fr: "Envoyer le Message" },
  name: { en: "Full Name", fr: "Nom Complet" },
  email: { en: "Email", fr: "Email" },
  phone: { en: "Phone", fr: "Téléphone" },
  projectType: { en: "Project Type", fr: "Type de Projet" },
  message: { en: "Message", fr: "Message" },
  ourServices: { en: "Our Services", fr: "Nos Services" },
  expertise: { en: "Team & Expertise", fr: "Équipe & Expertise" },
  archViz: { en: "Architectural Visualization", fr: "Visualisation Architecturale" },
  interior3d: { en: "Interior Design 3D", fr: "Design d'Intérieur 3D" },
  cinematicAnim: { en: "Cinematic Animations", fr: "Animations Cinématiques" },
  vrExperience: { en: "Virtual Reality Experiences", fr: "Expériences de Réalité Virtuelle" },
  studioDescription: { 
    en: "Vision Studio 360 is a boutique architectural visualization studio based in Abidjan, Côte d'Ivoire. We are a collective of multidisciplinary artists united by a shared passion for storytelling through visual language.", 
    fr: "Vision Studio 360 est un studio de visualisation architecturale basé à Abidjan, en Côte d'Ivoire. Nous sommes un collectif d'artistes multidisciplinaires unis par une passion commune pour la narration à travers le langage visuel." 
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
