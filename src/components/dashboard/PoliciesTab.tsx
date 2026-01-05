import { CheckCircle, XCircle, AlertTriangle, Info, Shield } from "lucide-react";

const policies = [
  {
    icon: CheckCircle,
    title: "Qué se puede decir",
    iconColor: "text-green-500",
    bgColor: "bg-green-500/10",
    items: [
      "Información sobre ubicaciones de casinos",
      "Horarios de operación",
      "Promociones vigentes aprobadas",
      "Eventos y entretenimiento",
    ],
  },
  {
    icon: XCircle,
    title: "Qué NO se puede decir",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    items: [
      "Promesas de ganancias garantizadas",
      "Incentivos a apostar de forma excesiva",
      "Contenido dirigido a menores de edad",
      "Comparaciones despectivas con competencia",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Claims Prohibidos",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
    items: [
      '"Gana dinero fácil"',
      '"100% seguro que ganas"',
      '"Sin riesgo alguno"',
      '"La mejor forma de hacerte millonario"',
    ],
  },
  {
    icon: Shield,
    title: "Reglas por Plataforma",
    iconColor: "text-casino-gold",
    bgColor: "bg-casino-gold/10",
    items: [
      "Google: No promocionar juegos de azar sin licencia",
      "Meta: Requiere aprobación previa para gambling",
      "TikTok: Prohibido contenido de apuestas",
      "Twitter/X: Restricciones geográficas específicas",
    ],
  },
];

const PoliciesTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {policies.map((policy, index) => (
        <div
          key={index}
          className="casino-card p-6 relative overflow-hidden hover:border-casino-gold/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-lg ${policy.bgColor}`}>
              <policy.icon className={`w-5 h-5 ${policy.iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {policy.title}
            </h3>
          </div>
          
          <ul className="space-y-3">
            {policy.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="flex items-start gap-2 text-muted-foreground text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-casino-gold mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      {/* Info Banner */}
      <div className="md:col-span-2 casino-card p-5 flex items-center gap-4 border-casino-gold/20">
        <div className="p-2 rounded-lg bg-casino-gold/10">
          <Info className="w-5 h-5 text-casino-gold" />
        </div>
        <p className="text-sm text-muted-foreground">
          Todas las políticas deben ser revisadas y actualizadas periódicamente según los cambios en regulaciones de cada plataforma.
        </p>
      </div>
    </div>
  );
};

export default PoliciesTab;
