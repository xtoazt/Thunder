/// <reference types="vite/client" />

declare global {
  interface Window {
    sj: any;
    __uv$config: any;
  }
}

declare const __uv$config: any;
declare class ScramjetController {
  constructor(config: any);
}

export {};
