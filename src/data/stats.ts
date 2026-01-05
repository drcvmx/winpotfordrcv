import type { StatType, ContactInfoType } from "@/types";

export const heroStats: StatType[] = [
  { value: "16+", label: "Ciudades" },
  { value: "18", label: "Sucursales" },
  { value: "15+", label: "Años" },
];

export const aboutStats: StatType[] = [
  { value: "500+", label: "Máquinas" },
  { value: "50+", label: "Mesas de Juego" },
  { value: "24/7", label: "Atención" },
];

export const contactInfo: ContactInfoType = {
  phone: "+52 (55) 1234-5678",
  email: "info@winpot.mx",
  address: "Av. Principal #123, Ciudad de México, México",
};
