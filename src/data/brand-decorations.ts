/**
 * Brand decoration images mapping.
 * Each brand has 7 floating decorative elements used across sections:
 * 1. GamesSection (right)
 * 2. CasinoBanner (left)
 * 3. EventsSection (left)
 * 4. EventsSection (right)
 * 5. FacilitiesSection (right)
 * 6. ContactSection (left)
 * 7. Extra/alternate
 */

export type BrandDecorations = {
  [key: string]: string[];
};

export const brandDecorations: BrandDecorations = {
  winpot: [
    "/decorations/winpot/deco-1.webp",
    "/decorations/winpot/deco-2.webp",
    "/decorations/winpot/deco-3.webp",
    "/decorations/winpot/deco-4.webp",
    "/decorations/winpot/deco-5.webp",
    "/decorations/winpot/deco-6.webp",
    "/decorations/winpot/deco-7.webp",
  ],
  diamonds: [
    "/decorations/diamonds/deco-1.webp",
    "/decorations/diamonds/deco-2.webp",
    "/decorations/diamonds/deco-3.webp",
    "/decorations/diamonds/deco-4.webp",
    "/decorations/diamonds/deco-5.webp",
    "/decorations/diamonds/deco-6.webp",
    "/decorations/diamonds/deco-7.webp",
  ],
  capri: [
    "/decorations/capri/deco-1.webp",
    "/decorations/capri/deco-2.webp",
    "/decorations/capri/deco-3.webp",
    "/decorations/capri/deco-4.webp",
    "/decorations/capri/deco-5.webp",
    "/decorations/capri/deco-6.webp",
    "/decorations/capri/deco-7.webp",
  ],
  veneto: [
    "/decorations/veneto/deco-1.webp",
    "/decorations/veneto/deco-2.webp",
    "/decorations/veneto/deco-3.webp",
    "/decorations/veneto/deco-4.webp",
    "/decorations/veneto/deco-5.webp",
    "/decorations/veneto/deco-6.webp",
    "/decorations/veneto/deco-7.webp",
  ],
};

/** Get decoration images for a brand, defaults to winpot */
export function getBrandDecorations(brandId: string): string[] {
  return brandDecorations[brandId] || brandDecorations.winpot;
}
