import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import aboutBanner from "@/assets/about-banner.webp";

export function AboutSection() {
  return (
    <SectionWrapper id="nosotros" background="default">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heading className="mb-6">
              <span className="text-foreground italic font-bold">ACERCA</span>
              <br />
              <span className="text-primary italic font-bold">DEL CASINO</span>
            </Heading>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
              <p>
                Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento.
                Con más de 15 años de experiencia en el mercado, Winpot y sus marcas asociadas buscan crear un ambiente
                seguro, divertido y emocionante para cada uno de sus usuarios.
              </p>
              <p>
                Actualmente, contamos con 18 establecimientos a nivel nacional y desde el 2020 desarrollamos nuestro
                proyecto en línea. Lanzando al mercado una experiencia integral de emociones las 24 horas del día,
                los 365 días del año.
              </p>
            </div>
          </motion.div>

          {/* Image RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-end"
          >
            <img
              src={aboutBanner}
              alt="Winpot Casino - Acerca de nosotros"
              className="w-full max-w-lg rounded-lg"
            />
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
