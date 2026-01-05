import { Zap, Target, BarChart3, DollarSign } from "lucide-react";

type CampaignStatus = "active" | "paused" | "draft";

interface Campaign {
  name: string;
  type: string;
  objective: string;
  status: CampaignStatus;
  budget?: string;
}

const campaigns: Campaign[] = [
  {
    name: "Branding Winpot",
    type: "Display",
    objective: "Reconocimiento de marca",
    status: "active",
    budget: "$5,000/mes",
  },
  {
    name: "Search - Casinos CDMX",
    type: "Search",
    objective: "Tráfico al sitio",
    status: "active",
    budget: "$8,000/mes",
  },
  {
    name: "Search - Casinos EdoMex",
    type: "Search",
    objective: "Tráfico al sitio",
    status: "active",
    budget: "$10,000/mes",
  },
  {
    name: "Remarketing Visitantes",
    type: "Display Remarketing",
    objective: "Conversiones",
    status: "paused",
    budget: "$3,000/mes",
  },
  {
    name: "YouTube Promocional",
    type: "Video",
    objective: "Awareness",
    status: "draft",
  },
  {
    name: "Performance Max",
    type: "PMax",
    objective: "Conversiones multicanal",
    status: "draft",
  },
];

const statusConfig: Record<CampaignStatus, { label: string; className: string }> = {
  active: {
    label: "Activo",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  paused: {
    label: "Pausado",
    className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  draft: {
    label: "Borrador",
    className: "bg-muted text-muted-foreground border-border",
  },
};

const typeIcons: Record<string, typeof Zap> = {
  Display: Target,
  Search: Zap,
  "Display Remarketing": BarChart3,
  Video: Target,
  PMax: Zap,
};

const SemTab = () => {
  return (
    <div className="space-y-6">
      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map((campaign, index) => {
          const IconComponent = typeIcons[campaign.type] || Zap;
          const status = statusConfig[campaign.status];
          
          return (
            <div
              key={index}
              className="casino-card p-5 hover:border-casino-gold/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-casino-gold/10">
                    <IconComponent className="w-4 h-4 text-casino-gold" />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    {campaign.type}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${status.className}`}>
                  {status.label}
                </span>
              </div>
              
              {/* Name */}
              <h3 className="text-base font-semibold text-foreground mb-3">
                {campaign.name}
              </h3>
              
              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="w-3.5 h-3.5" />
                  <span>{campaign.objective}</span>
                </div>
                {campaign.budget && (
                  <div className="flex items-center gap-2 text-casino-gold">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{campaign.budget}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary Card */}
      <div className="casino-card p-5 border-casino-gold/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-casino-gold">6</p>
            <p className="text-xs text-muted-foreground">Campañas Totales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">3</p>
            <p className="text-xs text-muted-foreground">Activas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-400">1</p>
            <p className="text-xs text-muted-foreground">Pausadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-muted-foreground">2</p>
            <p className="text-xs text-muted-foreground">Borradores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemTab;
