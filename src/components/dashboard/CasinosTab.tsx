import { MapPin, MessageSquare, FileText } from "lucide-react";

const casinos = [
  {
    name: "Winpot Plaza Mía Metepec",
    location: "Metepec, Estado de México",
    focus: "Entretenimiento familiar y eventos locales",
    notes: "Alto tráfico los fines de semana",
  },
  {
    name: "Winpot Plaza Las Américas Ecatepec",
    location: "Ecatepec, Estado de México",
    focus: "Promociones de temporada",
    notes: "Audiencia joven predominante",
  },
  {
    name: "Winpot Vía Morelos Ecatepec",
    location: "Ecatepec, Estado de México",
    focus: "Experiencia VIP y lealtad",
    notes: "Clientes recurrentes de alto valor",
  },
  {
    name: "Winpot Mega Outlet Lerma",
    location: "Lerma, Estado de México",
    focus: "Tráfico de outlet + casino",
    notes: "Sinergia con visitantes del outlet",
  },
  {
    name: "Winpot Galerías Metepec",
    location: "Metepec, Estado de México",
    focus: "Posicionamiento premium",
    notes: "Zona de alto poder adquisitivo",
  },
  {
    name: "Winpot Patio Tlalpan",
    location: "CDMX, Tlalpan",
    focus: "Audiencia urbana CDMX",
    notes: "Comunicación enfocada en conveniencia",
  },
];

const CasinosTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {casinos.map((casino, index) => (
        <div
          key={index}
          className="casino-card p-6 hover:border-casino-gold/30 transition-all duration-300 group"
        >
          {/* Casino Name */}
          <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-casino-gold transition-colors">
            {casino.name}
          </h3>
          
          {/* Info Grid */}
          <div className="space-y-4">
            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded bg-casino-gold/10 shrink-0">
                <MapPin className="w-4 h-4 text-casino-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Ubicación</p>
                <p className="text-sm text-foreground">{casino.location}</p>
              </div>
            </div>
            
            {/* Focus */}
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded bg-casino-gold/10 shrink-0">
                <MessageSquare className="w-4 h-4 text-casino-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Enfoque</p>
                <p className="text-sm text-foreground">{casino.focus}</p>
              </div>
            </div>
            
            {/* Notes */}
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded bg-casino-gold/10 shrink-0">
                <FileText className="w-4 h-4 text-casino-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Notas</p>
                <p className="text-sm text-foreground">{casino.notes}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CasinosTab;
