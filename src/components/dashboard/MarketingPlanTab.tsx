import { Target, TrendingUp, Megaphone, ListChecks } from "lucide-react";

const blocks = [
  {
    icon: Target,
    title: "Objetivo General del Proyecto",
    content: "Define aquí el objetivo principal del proyecto Winpot Casino. ¿Qué queremos lograr? ¿Cuál es la meta a largo plazo?",
  },
  {
    icon: TrendingUp,
    title: "Enfoque de Crecimiento",
    content: "Estrategia de crecimiento del proyecto. ¿Cómo planeamos escalar? ¿Cuáles son los KPIs principales?",
  },
  {
    icon: Megaphone,
    title: "Canales a Utilizar",
    content: "Lista de canales de marketing y comunicación. Redes sociales, email marketing, publicidad pagada, SEO, etc.",
  },
  {
    icon: ListChecks,
    title: "Fases del Plan",
    content: "Roadmap del proyecto dividido en fases. Cada fase con sus objetivos, entregables y fechas tentativas.",
  },
];

const MarketingPlanTab = () => {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <div
          key={index}
          className="casino-card p-6 md:p-8 relative overflow-hidden group hover:border-casino-gold/30 transition-all duration-300"
        >
          {/* Subtle left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-casino-gold to-casino-dark-gold opacity-60" />
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-casino-gold/10 text-casino-gold shrink-0">
              <block.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {block.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {block.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketingPlanTab;
