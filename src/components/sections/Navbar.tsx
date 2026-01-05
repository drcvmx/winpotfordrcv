import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/domain/Logo";
import { NavLinkAtom } from "@/components/ui/nav-link-atom";
import { Container } from "@/components/ui/container";
import { navLinks as defaultLinks } from "@/data/navigation";
import { useTenant } from "@/context/TenantContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { tenant, content } = useTenant();

  const navData = content?.navigation || defaultLinks;
  const navigationItems = Array.isArray(navData) ? navData : (navData.menuItems || []);
  const isBranch = tenant === 'branch';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${isScrolled
        ? `bg-background/95 backdrop-blur-md shadow-lg ${isBranch ? 'border-b border-accent/20' : ''}`
        : "bg-transparent"
        }`}
    >
      <Container className="h-full flex items-center justify-between">
        <a href="#inicio"><Logo /></a>
        <div className="hidden md:flex items-center gap-8">
          {navigationItems.map((link: any) => (
            <NavLinkAtom key={link.name} href={link.href}>{link.name}</NavLinkAtom>
          ))}
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
            <Container className="py-6 flex flex-col gap-4">
              {navigationItems.map((link: any) => (
                <NavLinkAtom key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="py-2">{link.name}</NavLinkAtom>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
