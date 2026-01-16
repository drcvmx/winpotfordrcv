import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TENANTS, BRAND_THEMES } from "@/data/mock-tenant";

/**
 * Development-only tenant switcher
 * Shows a floating panel to quickly navigate between tenants
 */
const DevSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show in development
  if (!import.meta.env.DEV) return null;

  // Get current tenant from path
  const currentPath = location.pathname.split('/').filter(Boolean)[0] || 'main';

  const handleTenantSwitch = (tenantId: string) => {
    if (tenantId === 'main') {
      navigate('/');
    } else {
      navigate(`/${tenantId}`);
    }
  };

  // Group tenants by brand
  const tenantsByBrand = Object.values(TENANTS).reduce((acc, tenant) => {
    const brand = tenant.brandId;
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(tenant);
    return acc;
  }, {} as Record<string, typeof TENANTS[keyof typeof TENANTS][]>);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-4 bg-black/95 rounded-lg border border-white/20 text-white max-w-xs shadow-xl max-h-[80vh] overflow-y-auto backdrop-blur-sm">
      <p className="text-[10px] uppercase tracking-widest font-bold text-center mb-2 text-white/50">
        🛠️ DEV SWITCHER
      </p>
      
      {Object.entries(tenantsByBrand).map(([brandId, tenants]) => (
        <div key={brandId} className="mb-2">
          <p 
            className="text-[9px] uppercase tracking-wider font-semibold mb-1 px-1"
            style={{ color: `hsl(${BRAND_THEMES[brandId]?.colors.primary || '0 0% 50%'})` }}
          >
            {BRAND_THEMES[brandId]?.name || brandId}
          </p>
          <div className="grid grid-cols-2 gap-1">
            {tenants.map((t) => {
              const isActive = (t.id === 'main' && currentPath === 'main') || 
                              (t.id === currentPath);
              return (
                <Button
                  key={t.id}
                  size="sm"
                  variant={isActive ? 'default' : 'outline'}
                  onClick={() => handleTenantSwitch(t.id)}
                  className={`text-[10px] truncate px-2 py-1 h-auto ${
                    isActive 
                      ? 'bg-white text-black' 
                      : 'bg-transparent border-white/20 text-white/70 hover:text-white hover:border-white/50'
                  }`}
                  title={t.content.metadata.title}
                >
                  {t.id === 'main' ? '🏢 Corp' : t.content.metadata.city || t.id}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
      
      <div className="border-t border-white/10 pt-2 mt-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="w-full text-[10px] bg-transparent border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
        >
          ⚙️ Dashboard
        </Button>
      </div>
    </div>
  );
};

export default DevSwitcher;
