import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2560",
    title: "Get in Touch"
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2560",
    title: "Start a Project"
  }
];

export default function Contact() {
  const { mutate, isPending } = useSubmitContact();
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "exterior",
      message: "",
    },
  });

  function onSubmit(data: InsertMessage) {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="w-full h-full"
            >
              <img 
                src={HERO_SLIDES[currentSlide].image} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/60 text-xs font-serif italic tracking-[0.4em] uppercase mb-4"
                >
                  {HERO_SLIDES[currentSlide].title}
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter"
                >
                  {t("navContact")}
                </motion.h1>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-3xl font-display font-bold uppercase tracking-tighter mb-12">{t("startProject")}</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("name")} {...field} className="border-0 border-b border-neutral-200 rounded-none px-0 py-6 text-xl focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent shadow-none placeholder:text-neutral-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("email")} {...field} className="border-0 border-b border-neutral-200 rounded-none px-0 py-6 text-xl focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent shadow-none placeholder:text-neutral-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-0 border-b border-neutral-200 rounded-none px-0 py-6 text-xl focus:ring-0 focus:border-black bg-transparent shadow-none">
                          <SelectValue placeholder={t("projectType")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="exterior">Exterior</SelectItem>
                        <SelectItem value="interior">Interior</SelectItem>
                        <SelectItem value="animation">Animation</SelectItem>
                        <SelectItem value="vr">VR / 360</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder={t("message")} {...field} className="border-0 border-b border-neutral-200 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent shadow-none min-h-[150px] resize-none placeholder:text-neutral-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full h-20 bg-black hover:bg-neutral-800 text-white uppercase tracking-widest text-sm font-bold rounded-none transition-all">
                {isPending ? <Loader2 className="animate-spin" /> : t("sendMessage")}
              </Button>
            </form>
          </Form>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-display font-bold uppercase tracking-tighter mb-12">{t("getInTouch")}</h2>
          <div className="space-y-12 text-xl font-light">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4">Email</span>
              <a href="mailto:lialidaniel18@gmail.com" className="hover:opacity-50 transition-opacity">lialidaniel18@gmail.com</a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4">Phone</span>
              <a href="tel:+2250713412559" className="hover:opacity-50 transition-opacity">+225 07 13 41 25 59</a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4">Location</span>
              <p>Abidjan, Côte d'Ivoire</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
