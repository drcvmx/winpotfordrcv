import { Container } from "@/components/ui/container";
import { useTenant } from "@/context/TenantContext";
import { useTenantLegal, DEFAULT_LEGAL_TEXT } from "@/hooks/useTenantLegal";
import { useTenantContent } from "@/hooks/useTenantContent";

export function LegalSection() {
  const { tenantId, theme } = useTenant();
  const { data: legalData } = useTenantLegal(tenantId);
  const { data: content } = useTenantContent(tenantId);
  
  const legalText = legalData?.legal_text || DEFAULT_LEGAL_TEXT;
  const privacyUrl1 = content?.privacy_policy_url;
  const privacyUrl2 = (content as any)?.privacy_policy_url_2;
  
  // Get brand-specific accent color for the top border
  const getBrandAccent = () => {
    const brandId = theme?.id || 'winpot';
    switch (brandId) {
      case 'veneto':
        return 'border-t-sky-400';
      case 'capri':
        return 'border-t-amber-400';
      case 'diamonds':
        return 'border-t-rose-400';
      default:
        return 'border-t-primary';
    }
  };

  return (
    <section className={`bg-muted/30 border-t-2 ${getBrandAccent()} py-8`}>
      <Container>
        <div className="max-w-4xl mx-auto">
          {privacyUrl1 && (
            <p className="text-xs text-muted-foreground leading-relaxed mb-3 text-center">
              <a
                href={privacyUrl1}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                Aviso de Privacidad
              </a>
            </p>
          )}
          {legalText.split('\n\n').map((paragraph, index) => (
            <p 
              key={index} 
              className="text-xs text-muted-foreground leading-relaxed mb-3 last:mb-0 text-center"
            >
              {paragraph}
            </p>
          ))}
          {privacyUrl2 && (
            <p className="text-xs text-muted-foreground leading-relaxed mt-3 text-center">
              <a
                href={privacyUrl2}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                Aviso de Privacidad
              </a>
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
