// UV Configuration for Thundr
// Using WISP backend instead of Bare server
// WISP is configured via BareMux in the main app

self.__uv$config = {
  prefix: "/~/service/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
};
