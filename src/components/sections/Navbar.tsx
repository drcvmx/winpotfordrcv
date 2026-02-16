import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Gamepad2, CalendarDays, Building2, Users, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/domain/Logo";
import { NavLinkAtom } from "@/components/ui/nav-link-atom";
import { Container } from "@/components/ui/container";
import { navLinks as defaultLinks } from "@/data/navigation";
import { useTenant } from "@/context/TenantContext";

// Icon mapping for mobile nav
const ICON_MAP: Record<string, React.ElementType> = {
  "Inicio": Home,
  "Juegos": Gamepad2,
  "Eventos": CalendarDays,
  "Instalaciones": Building2,
  "Casinos": Building2,
  "Nosotros": Users,
  "Ubicación": MapPin,
  "Contacto": Phone,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 hidden md:block ${isScrolled
          ? `bg-background/95 backdrop-blur-md shadow-lg ${isBranch ? 'border-b border-accent/20' : ''}`
          : "bg-transparent"
          }`}
      >
        <Container className="h-full flex items-center justify-between">
          <a href="#inicio"><Logo /></a>
          <div className="flex items-center gap-8">
            {navigationItems.map((link: any) => (
              <NavLinkAtom key={link.name} href={link.href}>{link.name}</NavLinkAtom>
            ))}
          </div>
        </Container>
      </motion.nav>

      {/* Mobile Icon Navbar - Fixed at top */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-lg' 
            : 'bg-background/80 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center justify-around py-2 px-1 overflow-x-auto no-scrollbar">
          {navigationItems.map((link: any) => {
            const IconComponent = ICON_MAP[link.name] || Home;
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex flex-col items-center gap-0.5 px-1 min-w-0 py-1 text-foreground/90 hover:text-accent transition-colors group shrink-0"
              >
                <IconComponent 
                  className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" 
                  strokeWidth={1.5}
                />
                <span className="text-[9px] sm:text-[10px] font-medium leading-tight whitespace-nowrap">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
