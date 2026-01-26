import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { normalizeImageUrl } from "@/lib/url-utils";

import winpotLogo from "@/assets/winpot-logo.svg";
import capriLogo from "@/assets/capri-logo.svg";
import venetoLogo from "@/assets/veneto-logo.svg";
import diamondsLogo from "@/assets/diamonds-logo.svg";

const brandLogos = [
  { id: "winpot", name: "Winpot", logo: winpotLogo },
  { id: "capri", name: "Capri", logo: capriLogo },
  { id: "veneto", name: "Veneto", logo: venetoLogo },
  { id: "diamonds", name: "Diamonds", logo: diamondsLogo },
];

export function BrandsSection() {
  return (
    <SectionWrapper background="secondary" padding="lg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Heading className="text-primary">MARCAS</Heading>
        </motion.div>

        {/* Desktop: Grid estático */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden lg:grid grid-cols-4 gap-8"
        >
          {brandLogos.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center p-6 cursor-pointer transition-all"
            >
              <img
                src={normalizeImageUrl(brand.logo)}
                alt={`${brand.name} Casino Logo`}
                className="h-20 w-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Tablet/Mobile: Carrusel con autoplay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="lg:hidden"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {brandLogos.map((brand, index) => (
                <CarouselItem key={brand.id} className="pl-4 basis-1/2 md:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-center p-6"
                  >
                    <img
                      src={normalizeImageUrl(brand.logo)}
                      alt={`${brand.name} Casino Logo`}
                      className="h-16 md:h-20 w-auto object-contain"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
