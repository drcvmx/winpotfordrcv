import { Search, Globe, Wrench } from "lucide-react";

const blocks = [
  {
    icon: Search,
    title: "¿Qué posicionamos?",
    subtitle: "Keywords y términos objetivo",
    content: "Define las palabras clave principales y secundarias. Términos de marca, términos genéricos del sector, long-tail keywords específicas por ubicación.",
    items: [
      "Términos de marca: Winpot, Winpot Casino",
      "Términos genéricos: Casino en México, entretenimiento",
      "Long-tail: Casino cerca de Plaza Mía Metepec",
    ],
  },
  {
    icon: Globe,
    title: "¿Dónde posicionamos?",
    subtitle: "Canales y plataformas orgánicas",
    content: "Mapeo de los canales donde buscamos posicionamiento orgánico y cómo se integran en la estrategia general.",
    items: [
      "Google Search (sitio web principal)",
      "Google Maps (fichas de negocio por casino)",
      "YouTube (contenido de video)",
      "Redes sociales (Instagram, Facebook)",
    ],
  },
  {
    icon: Wrench,
    title: "¿Cómo posicionamos?",
    subtitle: "Tácticas y metodología SEO",
    content: "Acciones concretas para mejorar el posicionamiento orgánico en cada canal identificado.",
    items: [
      "Optimización on-page (meta tags, contenido)",
      "SEO local (Google Business Profile)",
      "Link building y menciones de marca",
      "Contenido evergreen + actualizaciones",
    ],
  },
];

const SeoTab = () => {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <div
          key={index}
          className="casino-card p-6 md:p-8 relative overflow-hidden hover:border-casino-gold/30 transition-all duration-300"
        >
          {/* Number indicator */}
          <div className="absolute top-6 right-6 text-6xl font-bold text-casino-gold/10">
            0{index + 1}
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-casino-gold/10">
                <block.icon className="w-5 h-5 text-casino-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {block.title}
                </h3>
                <p className="text-sm text-casino-gold">{block.subtitle}</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mt-4 mb-5 leading-relaxed">
              {block.content}
            </p>
            
            <ul className="space-y-2">
              {block.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <span className="w-2 h-2 rounded-full bg-casino-gold shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeoTab;
