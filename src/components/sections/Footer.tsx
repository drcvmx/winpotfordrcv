import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/domain/Logo";
import { NavLinkAtom } from "@/components/ui/nav-link-atom";
import { Text } from "@/components/ui/typography";
import { quickLinks } from "@/data/navigation";
import { contactInfo } from "@/data/stats";
import winpotLogoFooter from "@/assets/winpot-logo-footer.webp";
import badge18Plus from "@/assets/18-plus-badge.webp";

export function Footer() {
  return (
    <footer id="contacto" className="bg-background border-t border-border">
      {/* Banner con logos */}
      <div className="bg-background py-4 md:py-6 overflow-hidden">
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-16 px-4">
          <img src={badge18Plus} alt="18+" className="h-8 sm:h-10 md:h-14 opacity-80 flex-shrink-0" />
          <img src={winpotLogoFooter} alt="Winpot Casino" className="h-6 sm:h-8 md:h-12 flex-shrink-0" />
          <img src={badge18Plus} alt="18+" className="h-8 sm:h-10 md:h-14 opacity-80 flex-shrink-0 hidden xs:block sm:block" />
          <img src={winpotLogoFooter} alt="Winpot Casino" className="h-6 sm:h-8 md:h-12 flex-shrink-0 hidden sm:block" />
          <img src={badge18Plus} alt="18+" className="h-8 sm:h-10 md:h-14 opacity-80 flex-shrink-0 hidden md:block" />
        </div>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Logo className="mb-4" />
            <Text size="sm" textColor="muted" leading="relaxed">La mejor experiencia de casino en México. Más de 15 años ofreciendo entretenimiento de calidad.</Text>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => <li key={link.name}><NavLinkAtom href={link.href} variant="muted">{link.name}</NavLinkAtom></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm"><Phone className="w-4 h-4 text-accent" /><span>{contactInfo.phone}</span></li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm"><Mail className="w-4 h-4 text-accent" /><span>{contactInfo.email}</span></li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm"><MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><span>{contactInfo.address}</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center">
          <Text size="xs" textColor="muted">© {new Date().getFullYear()} Winpot Casino. Todos los derechos reservados. Juego responsable. Solo mayores de 18 años.</Text>
        </div>
      </Container>
    </footer>
  );
}
