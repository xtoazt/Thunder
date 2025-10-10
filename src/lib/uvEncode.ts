// UV URL encoding helper
// Uses UV's XOR codec for proper URL encoding

export function encodeUVUrl(url: string): string {
  // Simple XOR encoding that matches UV's codec
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  
  const encoded = encoder.encode(url);
  const key = "uvkey"; // UV's default XOR key
  const keyBytes = encoder.encode(key);
  
  const result = new Uint8Array(encoded.length);
  for (let i = 0; i < encoded.length; i++) {
    result[i] = encoded[i] ^ keyBytes[i % keyBytes.length];
  }
  
  // Convert to base64-like URL-safe encoding
  let str = '';
  for (let i = 0; i < result.length; i++) {
    str += String.fromCharCode(result[i]);
  }
  
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

