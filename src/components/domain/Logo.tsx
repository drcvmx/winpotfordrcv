import winpotLogo from "@/assets/winpot-logo.svg";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <img 
      src={winpotLogo} 
      alt="Winpot Casino" 
      className={className}
      style={{ height: '40px', width: 'auto' }}
    />
  );
}
