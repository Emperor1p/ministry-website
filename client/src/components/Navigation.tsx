import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Mission", to: "mission" },
    { name: "Gallery", to: "gallery" },
    { name: "FAQ", to: "faq" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
            <Heart className="h-6 w-6 text-primary fill-primary/20" />
          </div>
          <span className={cn(
            "text-xl font-bold font-display tracking-tight transition-colors",
            scrolled ? "text-foreground" : "text-foreground md:text-white"
          )}>
            God of Ages
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className={cn(
                "text-sm font-medium cursor-pointer hover:text-primary transition-colors",
                scrolled ? "text-muted-foreground" : "text-white/90 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="donate" smooth={true} duration={500}>
            <Button
              variant={scrolled ? "default" : "secondary"}
              size="sm"
              className={cn(
                "rounded-full px-6 font-semibold shadow-md",
                !scrolled && "bg-white text-primary hover:bg-white/90"
              )}
            >
              Donate Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className={cn("h-6 w-6", scrolled ? "text-foreground" : "text-foreground md:text-white")} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-border shadow-xl md:hidden flex flex-col p-4 gap-2 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-lg font-medium text-foreground hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-border">
            <Link to="donate" smooth={true} duration={500} onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full text-lg py-6 shadow-md">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
