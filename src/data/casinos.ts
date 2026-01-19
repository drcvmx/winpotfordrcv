import type { CasinoType, BrandFilter } from "@/types";

export const brandFilters: BrandFilter[] = [
  { id: 'all', label: 'Todos', count: 18 },
  { id: 'winpot', label: 'Winpot', count: 15, color: '#FF2B44' },
  { id: 'capri', label: 'Capri', count: 2, color: '#FFC107' },
  { id: 'diamonds', label: 'Diamonds', count: 2, color: '#B0BEC5' },
  { id: 'veneto', label: 'Veneto', count: 1, color: '#FF2B44' },
];

export const casinos: CasinoType[] = [
  // WINPOT BRAND (13 locaciones)
  {
    id: 'tuxtla',
    city: 'Tuxtla',
    brand: 'winpot',
    schedule: {
      weekdays: 'Domingo a Miércoles de 9:00 a.m. a 4:00 a.m.',
      weekend: 'Jueves a Sábado de 9:00 a.m. a 6:00 a.m.',
    },
    address: 'Plaza Ámbar Fashion Mall, Carretera Panamericana a Chiapa de Corzo #651 Col. El Retiro Local PB S-A6, 29040 Tuxtla Gutiérrez, Chis.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-tuxtla-FACHADA.webp',
    externalLink: 'https://tuxtla.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Ámbar+Fashion+Mall+Tuxtla+Gutiérrez',
  },
  {
    id: 'boca',
    city: 'Boca del Río',
    brand: 'winpot',
    schedule: {
      weekdays: 'Lunes a Domingo abierto las 24 hrs.',
    },
    address: 'Plaza Sol, Playa de Oro, 94299 Boca del Río, Ver.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-boca-del-rio-FACHADA.webp',
    isOpen24h: true,
    externalLink: 'https://boca.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Sol+Boca+del+Río+Veracruz',
  },
  {
    id: 'puntosur',
    city: 'Punto Sur',
    brand: 'winpot',
    schedule: {
      weekdays: 'Domingo a Miércoles de 10:00 a.m. a 3:00 a.m.',
      weekend: 'Jueves a Sábado de 10:00 a.m. a 5:00 a.m.',
    },
    address: 'Av. Punto Sur 235, 45645 Tlajomulco de Zúñiga, Jal.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-punto-sur-FACHADA.webp',
    externalLink: 'https://puntosur.winpothome.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av+Punto+Sur+235+Tlajomulco+Jalisco',
  },
  {
    id: 'tonala',
    city: 'Tonalá',
    brand: 'winpot',
    schedule: {
      weekdays: 'Lunes a Domingo de 11:00 a.m. a 4:00 a.m.',
    },
    address: 'Plaza Viva Patria 850, Lagos de Oriente, 45403 Tonalá, Jal.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-tonala-FACHADA.webp',
    externalLink: 'https://tonala.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Viva+Tonalá+Jalisco',
  },
  {
    id: 'playa',
    city: 'Playa del Carmen',
    brand: 'winpot',
    schedule: {
      weekdays: 'Lunes a Domingo de 10:00 am a 3:00 am',
    },
    address: 'Av. P. Central Supermanzana 52 Manzana, 1 Lote a1, Col, Nuevo Centro Urbano, 77723 Playa del Carmen, Q.R.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-playa-del-carmen-FACHADA.webp',
    externalLink: 'https://playa.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Supermanzana+52+Playa+del+Carmen+Quintana+Roo',
  },
  {
    id: 'puebla',
    city: 'Puebla',
    brand: 'winpot',
    schedule: {
      weekdays: 'Lunes a Domingo de 10:00 a.m a 3:00 a.m',
    },
    address: 'Plaza Pabellón, Cto Juan Pablo II 1757, Reserva Territorial Atlixcyotl, La Noria, 72410 Heroica Puebla de Zaragoza, Pue.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-puebla-FACHADA.webp',
    externalLink: 'https://puebla.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Pabellón+Puebla',
  },
  {
    id: 'pachuca',
    city: 'Pachuca',
    brand: 'winpot',
    schedule: {
      weekdays: 'Lunes a Domingo de 10:00 am a 4:00 am',
    },
    address: 'Camino Real de La Plata, Zona Plateada, 42080 Pachuca de Soto, Hgo',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-pachuca-FACHADA.webp',
    externalLink: 'https://pachuca.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Camino+Real+de+La+Plata+Pachuca+Hidalgo',
  },
  {
    id: 'mandarin',
    city: 'Mexicali Mandarín',
    brand: 'winpot',
    schedule: {
      weekdays: 'Lunes a Domingo abierto las 24 hrs.',
    },
    address: 'Plaza Mandarín, Blvd. Benito Juárez 2252-Local 60 interior 1, Sánchez Taboada, 21360 Mexicali, B.C.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-mexicali-mandarin-FACHADA.webp',
    isOpen24h: true,
    externalLink: 'https://mandarin.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Mandarín+Mexicali+Baja+California',
  },
  {
    id: 'carranza',
    city: 'Mexicali Carranza',
    brand: 'winpot',
    schedule: {
      weekdays: 'Lunes a Domingo abierto las 24 hrs.',
    },
    address: 'Blvd. Lázaro Cárdenas 2000, Plutarco Elías Calles, 21376 Mexicali, B.C.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-mexicali-carranza-FACHADA.webp',
    isOpen24h: true,
    externalLink: 'https://mexicali.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lázaro+Cárdenas+2000+Mexicali+Baja+California',
  },
  {
    id: 'merida',
    city: 'Mérida',
    brand: 'winpot',
    schedule: {
      weekdays: 'Domingo a Jueves 9:00 a.m. a 3:00 a.m.',
      weekend: 'Viernes y Sábado 9:00 a.m. a 4:00 a.m.',
    },
    address: 'Plaza Las Américas, C. 52 327, Miguel Hidalgo, 97220 Mérida, Yuc.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-merida-FACHADA.webp',
    externalLink: 'https://merida.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Las+Américas+Mérida+Yucatán',
  },
  {
    id: 'guaymas',
    city: 'Guaymas',
    brand: 'winpot',
    schedule: {
      weekdays: 'Lunes a Domingo de 09:00 am a 02:00 am',
    },
    address: 'Blvd. Benito Juárez 900, Guadalupe, 85440 Guaymas, Son.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-guaymas-foto-FACHADA.webp',
    externalLink: 'https://guaymas.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Benito+Juárez+900+Guaymas+Sonora',
  },
  {
    id: 'metrocentro',
    city: 'Metrocentro',
    brand: 'winpot',
    schedule: {
      weekdays: 'Lunes a Viernes de 10:00 am a 5:00 am',
      weekend: 'Sábados y Domingos 24 hrs',
    },
    address: 'Av. López Mateos Sur 3333, Residencial Victoria, 45088 Zapopan, Jalisco',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-metrocentro-fachada-1.webp',
    externalLink: 'https://metrocentro.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=López+Mateos+Sur+3333+Zapopan+Jalisco',
  },
  {
    id: 'metepec',
    city: 'Metepec',
    brand: 'winpot',
    schedule: {
      weekdays: 'Lunes a Domingo de 10:00 am a 3:00 am',
    },
    address: 'Plaza Mía, Av Tecnológico 1600-Local Sa-3, San Salvador Tizatlali, 52172 San Salvador Tizatlalli, Mx.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-metepec-fachada-1.webp',
    externalLink: 'https://metepec.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Mía+Metepec+Estado+de+México',
  },

  // DIAMONDS BRAND (2 locaciones)
  {
    id: 'pozarica',
    city: 'Poza Rica',
    brand: 'diamonds',
    schedule: {
      weekdays: 'Lunes a Domingo de 10:00 am a 3:00 am',
    },
    address: 'Plaza Gran Patio, Carr. Poza Rica – Cazones Km. 50, La Rueda, 93306 Poza Rica de Hidalgo, Ver.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-poza-rica-fachada.webp',
    externalLink: 'https://pozarica.winpothome.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Gran+Patio+Poza+Rica+Veracruz',
  },
  {
    id: 'cordilleras',
    city: 'Cordilleras',
    brand: 'diamonds',
    schedule: {
      weekdays: 'Domingo a Miércoles de 10:00 am a 4:00 am',
      weekend: 'Jueves a Sábado de 10:00 am a 5:00 am',
    },
    address: 'Av. Patria 1020, Jardines del Tepeyac, 45030 Zapopan, Jalisco',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-diamonds-fachada-ok.webp',
    externalLink: 'https://cordilleras.winpotcasinos.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Patria+1020+Zapopan+Jalisco',
  },

  // CAPRI BRAND (2 locaciones)
  {
    id: 'guadalajara',
    city: 'Guadalajara',
    brand: 'capri',
    schedule: {
      weekdays: 'Domingo a Miércoles de 10:00 am a 4:00 am',
      weekend: 'Jueves a Sábado de 9:00 a.m. a 6:00 a.m.',
    },
    address: 'Av. Circunvalación Jorge Álvarez del Castillo 1846, Lomas del Country, 44610 Guadalajara, Jal.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/08/winpot-capri-guadalajada-FACHADA.webp',
    externalLink: 'https://guadalajara.winpothome.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Circunvalación+1846+Guadalajara+Jalisco',
  },
  {
    id: 'satelite',
    city: 'Satélite',
    brand: 'capri',
    schedule: {
      weekdays: 'Domingo a Miércoles de 10:00 am a 4:00 am',
      weekend: 'Jueves a Sábado de 9:00 a.m. a 6:00 a.m.',
    },
    address: 'Perif. Blvd. Manuel Ávila Camacho 2245, San Lucas Tepetlacalco, 54055 Tlalnepantla, Mx.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-capri-fachada-ok.webp',
    externalLink: 'https://satelite.capricasino.com.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ávila+Camacho+2245+Tlalnepantla+Estado+de+México',
  },

  // VENETO BRAND (1 locación)
  {
    id: 'interlomas',
    city: 'Interlomas',
    brand: 'veneto',
    schedule: {
      weekdays: 'Lunes a Domingo de 10:00 am a 3:00 am',
    },
    address: 'Paseo de la Herradura 424, Parques de la Herradura, 52786 Naucalpan de Juárez, Mx.',
    imageUrl: 'https://winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-veneto-fachada-1.webp',
    externalLink: 'https://interlomas.winpothome.mx/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Paseo+de+la+Herradura+424+Naucalpan+Estado+de+México',
  },
];

// Estadísticas de casinos
export const casinoStats = {
  totalLocations: 20,
  totalCities: 17,
  byBrand: {
    winpot: 15,
    diamonds: 2,
    capri: 2,
    veneto: 1,
  },
  open24h: 4,
};

// Colores de marca
export const brandColors = {
  winpot: {
    bg: 'bg-primary',
    text: 'text-primary-foreground',
    border: 'border-primary',
    hex: '#FF2B44',
  },
  capri: {
    bg: 'bg-amber-500',
    text: 'text-black',
    border: 'border-amber-500',
    hex: '#FFC107',
  },
  diamonds: {
    bg: 'bg-slate-400',
    text: 'text-white',
    border: 'border-slate-400',
    hex: '#B0BEC5',
  },
  veneto: {
    bg: 'bg-primary',
    text: 'text-primary-foreground',
    border: 'border-primary',
    hex: '#FF2B44',
  },
};
