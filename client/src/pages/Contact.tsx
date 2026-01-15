import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const { mutate, isPending } = useSubmitContact();
  
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
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        
        {/* Left: Form */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-8">
              Start a Project
            </h1>
            <p className="text-neutral-500 mb-12 text-lg">
              Have a vision? Let's bring it to reality. Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-400">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} className="border-0 border-b border-neutral-200 rounded-none px-0 py-6 text-xl focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent shadow-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-400">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@address.com" {...field} className="border-0 border-b border-neutral-200 rounded-none px-0 py-6 text-xl focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent shadow-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-400">Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 890" {...field} className="border-0 border-b border-neutral-200 rounded-none px-0 py-6 text-xl focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent shadow-none" value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-400">Project Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-0 border-b border-neutral-200 rounded-none px-0 py-6 text-xl focus:ring-0 focus:border-black bg-transparent shadow-none">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="exterior">Exterior Rendering</SelectItem>
                        <SelectItem value="interior">Interior Rendering</SelectItem>
                        <SelectItem value="animation">Animation / Walkthrough</SelectItem>
                        <SelectItem value="vr">Virtual Reality / 360</SelectItem>
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
                    <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-400">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your project..." 
                        {...field} 
                        className="border-0 border-b border-neutral-200 rounded-none px-0 py-4 text-lg focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent shadow-none min-h-[150px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full md:w-auto px-12 py-8 bg-black hover:bg-neutral-800 text-white uppercase tracking-widest text-sm font-bold rounded-none transition-all"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Right: Info */}
        <div className="bg-neutral-50 p-12 lg:p-24 flex flex-col justify-between h-full">
          <div>
             <h3 className="font-display font-bold text-2xl mb-8 uppercase">Studio Info</h3>
             <div className="space-y-8 font-light text-lg">
               <div>
                 <span className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Email</span>
                 <a href="mailto:hello@visionstudio360.com" className="hover:underline">hello@visionstudio360.com</a>
               </div>
               <div>
                 <span className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Phone</span>
                 <a href="tel:+2250707000000" className="hover:underline">+225 07 07 00 00 00</a>
               </div>
               <div>
                 <span className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Location</span>
                 <p>Abidjan, Côte d'Ivoire</p>
               </div>
             </div>
          </div>

          <div className="mt-16">
            <h3 className="font-display font-bold text-2xl mb-8 uppercase">Follow Us</h3>
            <div className="flex gap-4">
               {/* Social links styled as minimal text */}
               <a href="#" className="border-b border-transparent hover:border-black transition-colors pb-1">LinkedIn</a>
               <a href="#" className="border-b border-transparent hover:border-black transition-colors pb-1">Instagram</a>
               <a href="#" className="border-b border-transparent hover:border-black transition-colors pb-1">Behance</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
