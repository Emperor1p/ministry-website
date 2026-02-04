import { motion } from "framer-motion";
import {
  Heart,
  HandHeart,
  Stethoscope,
  Utensils,
  Users,
  ArrowRight,
  CheckCircle2,
  Quote,
  Loader2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as ScrollLink } from "react-scroll";
import { cn } from "@/lib/utils";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { useToast } from "@/hooks/use-toast";
import { api, insertInquirySchema, type InsertInquiry } from "@shared/routes";
import {
  useCreateInquiry,
  useFaqs,
  useGallery,
} from "@/hooks/use-ministry-data";

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
  const { data: faqs, isLoading: isFaqsLoading } = useFaqs();
  const { data: galleryItems, isLoading: isGalleryLoading } = useGallery();
  const { mutate: createInquiry, isPending: isSubmitting } = useCreateInquiry();
  const { toast } = useToast();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    createInquiry(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description:
            "Thank you for reaching out. We will get back to you soon.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navigation />

      {/* ============================================
          HERO SECTION
      ============================================ */}
      <section
        id="home"
        className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Using Unsplash image for elderly care/hands */}
          <img
            src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop"
            alt="Caring hands holding elderly hands"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 mb-6">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-medium tracking-wide">
                Bringing Hope & Dignity
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
              Honoring the{" "}
              <span className="text-primary italic">God of Ages</span> by
              Serving the Aged
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              We are dedicated to providing compassionate care, essential
              support, and a community of love for our elderly generation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <ScrollLink to="donate" smooth={true} duration={500}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 h-14 rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-200"
                >
                  Support the Mission
                </Button>
              </ScrollLink>
              <ScrollLink to="about" smooth={true} duration={500}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 h-14 rounded-full bg-white/5 text-white border-white/30 hover:bg-white/10 hover:text-white backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </ScrollLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          ABOUT SECTION
      ============================================ */}
      <section id="about" className="py-20 md:py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Elderly woman smiling */}
                <img
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1000&auto=format&fit=crop"
                  alt="Happy elderly woman"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 bg-secondary/30 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -left-10 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl -z-10" />

              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl border border-border max-w-[200px] hidden md:block">
                <p className="text-4xl font-bold text-primary font-display mb-1">
                  500+
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Lives touched through our outreach programs
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeading
                title="Restoring Dignity, Spreading Love"
                subtitle="Who We Are"
                alignment="left"
                className="mb-8"
              />

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                <span className="font-semibold text-foreground">
                  God of Ages Ministry
                </span>{" "}
                was founded by{" "}
                <span className="text-primary font-medium">God set man</span>{" "}
                with a divine mandate to care for the elderly in our society. We
                believe that old age should be a time of peace, comfort, and
                joy, not struggle.
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                In a fast-paced world that often overlooks the aged, we stand in
                the gap to provide financial assistance, healthcare support, and
                most importantly, the warmth of companionship.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Compassionate Care",
                  "Community Outreach",
                  "Health Support",
                  "Spiritual Guidance",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          MISSION & VISION SECTION
      ============================================ */}
      <section id="mission" className="py-20 md:py-12 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <SectionHeading
            title="Our Guiding Light"
            subtitle="Vision & Mission"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div whileHover={{ y: -5 }} className="group">
              <Card className="h-full border-none shadow-lg overflow-hidden relative bg-white">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                <CardContent className="p-8 md:p-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <HandHeart className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-4">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To create a world where every elderly person feels valued,
                    cherished, and supported, living out their golden years with
                    dignity, purpose, and joy under the grace of God.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="group">
              <Card className="h-full border-none shadow-lg overflow-hidden relative bg-white">
                <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />
                <CardContent className="p-8 md:p-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-foreground transition-colors duration-300">
                    <Users className="h-7 w-7 text-foreground/80 group-hover:text-foreground transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-4">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We are on a mission to mobilize resources and compassionate
                    hearts to provide holistic care—physical, emotional, and
                    spiritual—to the aged, ensuring no one walks the path of old
                    age alone.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Aims & Objectives */}
          <div className="mt-20">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold font-display mb-4 ">
                How We Help
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our ministry focuses on tangible ways to improve the quality of
                life for our seniors.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-7xl"
            >
              {[
                {
                  icon: Utensils,
                  title: "Food & Clothing",
                  description:
                    "Providing nutritious meals and comfortable clothing to those in need.",
                  color: "bg-orange-100 text-orange-600",
                },
                {
                  icon: Stethoscope,
                  title: "Healthcare Support",
                  description:
                    "Assisting with medical checkups, medications, and health monitoring.",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  icon: Heart,
                  title: "Emotional Support",
                  description:
                    "Offering companionship and listening ears to combat loneliness.",
                  color: "bg-rose-100 text-rose-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-shadow text-center"
                >
                  <div
                    className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display mb-3">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          GALLERY SECTION
      ============================================ */}
      <section id="gallery" className="py-20 md:py-12 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <SectionHeading title="Moments of Joy" subtitle="Our Gallery" />

          {isGalleryLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {galleryItems?.length
                ? galleryItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className={cn(
                      "relative group overflow-hidden rounded-xl bg-muted cursor-pointer",
                      i % 3 === 0 ? "md:col-span-2 md:row-span-2 h-full" : "",
                    )}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-white font-bold text-lg">
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                ))
                : // Fallback static gallery if API is empty
                [
                  "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1516307073027-efab695d3357?q=80&w=1000&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?q=80&w=1000&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1518593494747-386055d72bdc?q=80&w=1000&auto=format&fit=crop",
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className={cn(
                      "relative group overflow-hidden rounded-xl bg-muted",
                      i === 0 ? "md:col-span-2 md:row-span-2 h-full" : "",
                    )}
                  >
                    <img
                      src={src}
                      alt="Gallery image"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================
          DONATE SECTION
      ============================================ */}
      <section
        id="donate"
        className="py-20 md:py-32 bg-primary relative overflow-hidden text-white"
      >
        {/* Abstract Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 0 C 50 100 80 100 100 0 Z" fill="white" />
          </svg>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6"
              >
                Become a Partner
              </motion.span>

              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                Your Support Changes Lives
              </h2>

              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Every donation goes directly towards food, medication, and care
                for the elderly in our community. Join us in making their golden
                years shine brighter.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Provide a month of groceries for an elderly couple",
                  "Cover essential medication costs",
                  "Fund community outreach events",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-white text-primary flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white text-foreground rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-display mb-2">
                  Bank Transfer Details
                </h3>
                <p className="text-muted-foreground">
                  Direct donations to our ministry account
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 mb-8 border border-border">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">
                      Bank Name
                    </span>
                    <span className="font-bold text-lg">Zenith Bank</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">
                      Account Name
                    </span>
                    <span className="font-bold text-lg text-right">
                      God of Ages Ministry
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">
                      Account Number
                    </span>
                    <span className="font-bold text-2xl font-mono text-primary">
                      1012345678
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground italic">
                Please use "Ministry Support" as the transaction reference.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ SECTION
      ============================================ */}
      <section id="faq" className="py-20 md:py-12 bg-secondary/20">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">

          <SectionHeading title="Common Questions" subtitle="FAQ" />

          {isFaqsLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs?.length
                ? faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`item-${faq.id}`}
                    className="bg-white border border-border rounded-xl px-4 data-[state=open]:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-lg font-medium py-6 hover:no-underline hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))
                : // Fallback content if API is empty
                [
                  {
                    q: "How can I volunteer?",
                    a: "We welcome volunteers! Please fill out the contact form below or email us directly to join our outreach team.",
                  },
                  {
                    q: "Is my donation tax-deductible?",
                    a: "Yes, we are a registered non-profit organization. We provide receipts for all donations upon request.",
                  },
                  {
                    q: "Do you have a physical location?",
                    a: "Yes, our ministry office is open Monday to Friday. See the footer for our address.",
                  },
                ].map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="bg-white border border-border rounded-xl px-4 data-[state=open]:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-lg font-medium py-6 hover:no-underline hover:text-primary transition-colors">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          )}
        </div>
      </section>

      {/* ============================================
          CONTACT SECTION
      ============================================ */}
      <section id="contact" className="py-20 md:py-12 bg-white">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">

          <SectionHeading title="Get in Touch" subtitle="Contact Us" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
            {/* Contact Info Sidebar */}
            <div className="md:col-span-2 bg-foreground text-white p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold font-display mb-6 text-primary">
                  Contact Information
                </h3>
                <p className="text-white/70 mb-10">
                  Have questions or want to get involved? Fill out the form or
                  reach out to us directly.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-white/70">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-white/70">godofages@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-white/70">
                        123 Ministry Lane, Care City
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="font-display italic text-white/50 text-lg">
                  "Cast me not off in the time of old age; forsake me not when
                  my strength faileth."
                  <br />
                  <span className="text-sm not-italic mt-2 block">
                    — Psalm 71:9
                  </span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3 p-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="bg-muted/30 border-border h-12 rounded-lg"
                            {...field}
                          />
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            type="email"
                            className="bg-muted/30 border-border h-12 rounded-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How can we help you?"
                            className="bg-muted/30 border-border min-h-[150px] rounded-lg resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-semibold rounded-lg shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
