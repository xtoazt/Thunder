// Public Bare Servers (choose one):
// - https://bare.benrogo.net/
// - https://uv.holy.how/
// - https://tomp.app/bare/
// - https://bare.shuttle.rip/

self.__uv$config = {
  prefix: "/~/uv/",
  bare: "https://bare.benrogo.net/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
};
