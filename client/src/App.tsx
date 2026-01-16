import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Featured from "@/pages/Featured";
import Gallery from "@/pages/Gallery";
import Interactive from "@/pages/Interactive";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { LanguageProvider } from "@/hooks/use-language";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Scroll to top on route change
function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/featured" component={Featured} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/interactive" component={Interactive} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <LanguageProvider>
          <Helmet>
            <title>Vision Studio 360 | Cinematic Architectural Visualization</title>
            <meta name="description" content="Vision Studio 360 specializes in cinematic architectural visualization, VR, and interactive 360 experiences for global projects." />
            <meta property="og:title" content="Vision Studio 360 | Cinematic Architectural Visualization" />
            <meta property="og:description" content="Premium architectural visualization studio delivering high-end stills, animations, and VR experiences." />
            <meta property="og:type" content="website" />
          </Helmet>
          <Router />
          <Toaster />
        </LanguageProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
