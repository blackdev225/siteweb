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
  navFeatured: { en: "Featured", fr: "Projets" },
  navGallery: { en: "Gallery", fr: "Galerie" },
  navInteractive: { en: "Interactive", fr: "Interactif" },
  navAbout: { en: "About", fr: "À Propos" },
  navContact: { en: "Contact", fr: "Contact" },
  heroTagline: { en: "Crafting Visual Identities For Architecture", fr: "Identités Visuelles pour l'Architecture" },
  introTitle: { en: "Vision Studio 360", fr: "Vision Studio 360" },
  introSub: { en: "Transforming Architectural Visions", fr: "Transformer les Visions Architecturales" },
  readStory: { en: "Read our story", fr: "Notre histoire" },
  footerLegal: { en: "Legal & Privacy", fr: "Mentions Légales" },
  exploreDimensions: { en: "Exploring New Dimensions", fr: "Explorer de Nouvelles Dimensions" },
  experience: { en: "Experience", fr: "Expérimenter" },
  years: { en: "Years", fr: "Ans" },
  projects: { en: "Projects", fr: "Projets" },
  satisfaction: { en: "Satisfaction", fr: "Satisfaction" },
  startProject: { en: "Start a Project", fr: "Démarrer un Projet" },
  getInTouch: { en: "Get In Touch", fr: "Nous Contacter" },
  sendMessage: { en: "Send Message", fr: "Envoyer" },
  name: { en: "Full Name", fr: "Nom Complet" },
  email: { en: "Email", fr: "Email" },
  phone: { en: "Phone", fr: "Téléphone" },
  projectType: { en: "Project Type", fr: "Type de Projet" },
  message: { en: "Message", fr: "Message" },
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
