import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { useTenant } from "@/context/TenantContext";
import { useTenantImage } from "@/hooks/useTenantImages";
import { useTenantContent } from "@/hooks/useTenantContent";

export function BranchHeroSection() {
    const { content, tenantId, theme } = useTenant();
    const { data: heroImageData } = useTenantImage(tenantId, 'hero');
    const { data: dbContent } = useTenantContent(tenantId);
    
    if (!content.hero) return null;

    const { hero } = content;
    const isVeneto = tenantId === 'interlomas';
    const isCorporateStyle = theme.id === 'winpot' || theme.id === 'diamonds';
    
    // Use DB content if available, otherwise fallback to mock data
    const heroTitle = dbContent?.hero_title || hero.title;
    const heroSubtitle = dbContent?.hero_subtitle || hero.subtitle;
    const heroSchedule = dbContent?.hero_schedule || hero.schedule?.weekdays;
    const heroAddress = dbContent?.hero_address || hero.address?.full;
    const heroImage = heroImageData?.image_url || hero.image;
    
    // CTA buttons: use DB if available, fallback to mock
    const primaryCtaText = dbContent?.hero_cta_primary_text || hero.ctaButtons?.[0]?.text || 'Ver Juegos';
    const primaryCtaLink = dbContent?.hero_cta_primary_link || hero.ctaButtons?.[0]?.href || '#juegos';
    const secondaryCtaText = dbContent?.hero_cta_secondary_text || 'Contáctanos';
    const secondaryCtaLink = dbContent?.hero_cta_secondary_link || '#contacto';

    return (
        <SectionWrapper id="inicio" background="gradient" padding="none" className="min-h-[600px] lg:min-h-[800px] pt-32 pb-20 hero-gradient overflow-hidden relative flex items-center">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative">
                    {/* Dynamic Floating Images (Diamonds / Generic) */}
                    {hero.floatingImages && hero.floatingImages.length > 0 && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {hero.floatingImages.map((img: any, i: number) => {
                                const isUrl = typeof img === 'string';
                                const src = isUrl ? img : img.url;
                                const alt = isUrl ? 'Decoration' : img.alt;

                                const positions = [
                                    { top: '10%', right: '10%', delay: 0 },
                                    { bottom: '15%', left: '5%', delay: 0.2 },
                                    { top: '40%', right: '5%', delay: 0.4 },
                                    { bottom: '10%', right: '20%', delay: 0.6 },
                                ];
                                const pos = positions[i % positions.length];

                                return (
                                    <motion.img
                                        key={i}
                                        src={src}
                                        alt={alt}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: pos.delay + 0.5, repeat: Infinity, repeatType: "reverse" }}
                                        style={{ position: 'absolute', ...pos }}
                                        className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-80 drop-shadow-lg"
                                    />
                                );
                            })}
                        </div>
                    )}

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center lg:text-left relative z-20"
                    >
                        {/* Premium Badge for Veneto */}
                        {isVeneto && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="inline-block mb-4"
                            >
                                <span className="bg-accent/10 text-accent border border-accent/30 px-4 py-1.5 rounded-full text-sm font-medium tracking-wider uppercase">
                                    ✦ Experiencia de lujo premium
                                </span>
                            </motion.div>
                        )}

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h1 className={`text-5xl md:text-6xl lg:text-7xl mb-1 
                                ${isVeneto ? 'font-serif text-shadow-glow font-bold text-foreground italic' : ''}
                                ${isCorporateStyle ? 'font-sans font-extrabold tracking-tight text-foreground uppercase' : ''}
                                ${!isVeneto && !isCorporateStyle ? 'font-serif font-normal italic text-foreground' : ''}
                            `}>
                                {heroTitle}
                            </h1>
                            <h2 className={`text-4xl md:text-5xl lg:text-6xl 
                                ${isVeneto ? 'font-sans tracking-[0.2em] font-bold text-primary' : ''}
                                ${isCorporateStyle ? 'font-sans font-extrabold text-primary text-shadow-glow uppercase' : ''}
                                ${!isVeneto && !isCorporateStyle ? 'font-serif font-bold tracking-wide text-primary' : ''}
                            `}>
                                {heroSubtitle}
                            </h2>
                        </motion.div>

                        {/* Schedule */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-8 mb-4"
                        >
                            <p className="text-muted-foreground text-sm mb-1 uppercase tracking-wider">Horarios de servicio:</p>
                            <p className="text-foreground text-sm">{heroSchedule}</p>
                        </motion.div>

                        {/* Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-8"
                        >
                            <p className="text-primary font-semibold text-sm whitespace-pre-line">
                                {heroAddress}
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <a
                                href={primaryCtaLink}
                                className="bg-primary text-primary-foreground hover:brightness-110 font-semibold px-8 py-3 rounded transition-all flex items-center gap-2 shadow-lg"
                            >
                                {primaryCtaText}
                            </a>
                            <a
                                href={secondaryCtaLink}
                                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-3 rounded transition-all duration-300"
                            >
                                {secondaryCtaText}
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative flex justify-center lg:justify-end z-10"
                    >
                        <div className="relative">
                            {isVeneto && <div className="absolute inset-0 bg-primary opacity-40 blur-3xl scale-110" />}
                            <img
                                src={heroImage}
                                alt={heroImageData?.alt_text || `${heroTitle} ${heroSubtitle} - Casino`}
                                className="w-full max-w-2xl drop-shadow-2xl relative z-10"
                            />
                        </div>
                    </motion.div>
                </div>
            </Container>
        </SectionWrapper>
    );
}
