/**
 * Converts a Google Drive share URL to a direct embed URL for images
 * 
 * Input formats supported:
 * - https://drive.google.com/file/d/{ID}/view?usp=drive_link
 * - https://drive.google.com/file/d/{ID}/view
 * - https://drive.google.com/open?id={ID}
 * 
 * Output format:
 * - https://drive.google.com/uc?export=view&id={ID}
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return url;

  // Check if it's already in the correct format
  if (url.includes('drive.google.com/uc?')) {
    return url;
  }

  // Pattern 1: https://drive.google.com/file/d/{ID}/view...
  const filePattern = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const fileMatch = url.match(filePattern);
  if (fileMatch && fileMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  }

  // Pattern 2: https://drive.google.com/open?id={ID}
  const openPattern = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
  const openMatch = url.match(openPattern);
  if (openMatch && openMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
  }

  // Not a Google Drive URL, return as-is
  return url;
}

/**
 * Checks if a URL is a Google Drive URL that needs conversion
 */
export function isGoogleDriveUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('drive.google.com');
}

/**
 * Normalizes any image URL, converting special formats as needed
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return url;
  
  // Handle Google Drive URLs
  if (isGoogleDriveUrl(url)) {
    return convertGoogleDriveUrl(url);
  }

  // Add more URL normalizations here as needed
  
  return url;
}
