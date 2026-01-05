import { User, Key, Shield, ExternalLink } from "lucide-react";

type AccountStatus = "active" | "pending" | "restricted";

interface Access {
  platform: string;
  role: string;
  status: AccountStatus;
  account?: string;
}

interface Admin {
  name: string;
  email: string;
  role: string;
}

const accesses: Access[] = [
  { platform: "Google Ads", role: "Admin", status: "active", account: "xxx-xxx-xxxx" },
  { platform: "Meta Business", role: "Admin", status: "active", account: "Winpot MX" },
  { platform: "Google Analytics", role: "Viewer", status: "active" },
  { platform: "Search Console", role: "Owner", status: "active" },
  { platform: "TikTok Ads", role: "N/A", status: "pending" },
  { platform: "Twitter Ads", role: "N/A", status: "restricted" },
];

const admins: Admin[] = [
  { name: "Anuar", email: "anuar@winpot.com", role: "Propietario" },
  { name: "Equipo Marketing", email: "marketing@winpot.com", role: "Administrador" },
  { name: "Agencia", email: "agencia@partner.com", role: "Editor" },
];

const statusConfig: Record<AccountStatus, { label: string; className: string }> = {
  active: {
    label: "Activo",
    className: "bg-green-500/20 text-green-400",
  },
  pending: {
    label: "Pendiente",
    className: "bg-amber-500/20 text-amber-400",
  },
  restricted: {
    label: "Restringido",
    className: "bg-primary/20 text-primary",
  },
};

const AccountsTab = () => {
  return (
    <div className="space-y-8">
      {/* Accesses Section */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <Key className="w-5 h-5 text-casino-gold" />
          <h2 className="text-lg font-semibold text-foreground">Accesos a Plataformas</h2>
        </div>
        
        <div className="casino-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide p-4">
                    Plataforma
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide p-4">
                    Cuenta
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide p-4">
                    Rol
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide p-4">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {accesses.map((access, index) => {
                  const status = statusConfig[access.status];
                  return (
                    <tr 
                      key={index} 
                      className="border-b border-border/50 last:border-0 hover:bg-card/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground font-medium">{access.platform}</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground text-sm">
                        {access.account || "—"}
                      </td>
                      <td className="p-4 text-foreground text-sm">
                        {access.role}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Administrators Section */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-5 h-5 text-casino-gold" />
          <h2 className="text-lg font-semibold text-foreground">Administradores</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {admins.map((admin, index) => (
            <div
              key={index}
              className="casino-card p-5 hover:border-casino-gold/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-casino-gold/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-casino-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{admin.name}</p>
                  <p className="text-xs text-casino-gold">{admin.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{admin.email}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AccountsTab;
