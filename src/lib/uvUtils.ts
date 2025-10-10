// UV Utility functions for encoding URLs
// Uses the global Ultraviolet codec

declare global {
  interface Window {
    Ultraviolet?: {
      codec: {
        xor: {
          encode: (url: string) => string;
          decode: (url: string) => string;
        };
      };
    };
  }
}

/**
 * Encode a URL using UV's XOR codec
 * This must be used before passing URLs to the UV proxy
 */
export function encodeUVUrl(url: string): string {
  if (typeof window !== 'undefined' && window.Ultraviolet) {
    try {
      return window.Ultraviolet.codec.xor.encode(url);
    } catch (e) {
      console.error('[UV] Failed to encode URL:', e);
    }
  }
  
  // Fallback: just return the URL
  // UV will attempt to handle it
  console.warn('[UV] Ultraviolet codec not available, using raw URL');
  return url;
}

/**
 * Get the full proxied URL for an iframe
 * @param url - The URL to proxy (e.g., "https://google.com")
 * @returns The full proxied URL (e.g., "/~/service/encodedUrl")
 */
export function getProxiedUrl(url: string): string {
  const encoded = encodeUVUrl(url);
  return `/~/service/${encoded}`;
}

