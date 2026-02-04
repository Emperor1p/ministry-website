import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 p-2 rounded-full">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold font-display">God of Ages</span>
            </div>
            <p className="text-white/60 leading-relaxed">
              Dedicated to caring for the elderly, providing support, healthcare, and dignity to those who have paved the way for us.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 text-white/60"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
                <a href="mailto:godofages@gmail.com">godofages@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-white/70 hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                <span>123 Ministry Lane, Care City, State 12345</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Our Mission", "Gallery", "Donate", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-primary transition-colors flex items-center gap-2">
                    <span className="h-1 w-1 bg-primary rounded-full" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Newsletter</h4>
            <p className="text-white/60 mb-4 text-sm">
              Subscribe to get updates on our outreach programs and activities.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-primary text-white placeholder:text-white/40 transition-colors"
              />
              <button className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors shadow-lg shadow-primary/20">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          <p>© {currentYear} God of Ages Ministry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
