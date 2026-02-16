import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { ContactForm } from "@/components/domain/ContactForm";
import { useTenant } from "@/context/TenantContext";
import { useTenantImage } from "@/hooks/useTenantImages";
import rouletteImageFallback from "@/assets/roulette-contact.png";
import { normalizeImageUrl } from "@/lib/url-utils";
import { FloatingDecoration } from "@/components/ui/floating-decoration";
import { getBrandDecorations } from "@/data/brand-decorations";

export function ContactSection() {
  const { tenantId, data } = useTenant();
  const { data: contactImageData } = useTenantImage(tenantId, 'contact');
  const brandId = data?.brandId || 'winpot';
  const decorations = getBrandDecorations(brandId);
  
  const contactImage = contactImageData?.image_url || rouletteImageFallback;
  const contactAlt = contactImageData?.alt_text || "Ruleta de casino";

  return (
    <SectionWrapper id="contacto" background="secondary" className="relative overflow-hidden">
      {/* Decoration: left side */}
      <FloatingDecoration src={decorations[5]} side="left" top="30%" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-lg overflow-hidden"
          >
            <img
              src={normalizeImageUrl(contactImage)}
              alt={contactAlt}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Form RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Heading className="text-primary mb-8">
              CONTACTO
            </Heading>
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
