import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingValues {
  version: string;
  proxy: "uv" | "scramjet";
  transport: {
    path: "/libcurl/index.mjs" | "/epoxy/index.mjs";
    name: "libcurl" | "epoxy";
  };
  cloak: "none" | "aboutBlank";
  siteType: "browser" | "default";
  title: string;
  icon: string;
  searchEngine: {
    name: string;
    url: string;
  };
  wispUrl: string;
  allowTabReordering: boolean;
}

interface SettingSetters {
  setVersion: (version: string) => void;
  setProxy: (proxy: "uv" | "scramjet") => void;
  setTransport: (
    path: "/libcurl/index.mjs" | "/epoxy/index.mjs",
    name: "libcurl" | "epoxy"
  ) => void;
  setCloak: (cloak: "none" | "aboutBlank") => void;
  setSiteType: (siteType: "browser" | "default") => void;
  setTitle: (title: string) => void;
  setIcon: (icon: string) => void;
  setWispUrl: (wispUrl: string) => void;
  setSearchEngine: (name: string, url: string) => void;
  setDefault: () => void;
  setAllowTabReordering: (allow: boolean) => void;
}

const DEFAULT_SETTINGS: SettingValues = {
  version: "2.0.0",
  proxy: "uv",
  transport: {
    path: "/libcurl/index.mjs",
    name: "libcurl",
  },
  allowTabReordering: false,
  cloak: "none",
  siteType: "browser",
  title: "Thundr",
  icon: "/assets/imgs/logo.png",
  searchEngine: {
    name: "Brave",
    url: "https://search.brave.com/search?q=",
  },
  wispUrl: "wss://wisp.mercurywork.shop/",
};

type SettingsStore = SettingValues & SettingSetters;

const useSettings = create<SettingsStore>()(
  persist(
    (set, get) => ({
      version: "2.0.0",
      setVersion: (version: string) => set(() => ({ version })),
      proxy: "uv",
      transport: {
        path: "/libcurl/index.mjs",
        name: "libcurl",
      },
      allowTabReordering: false,
      setAllowTabReordering: (allow: boolean) =>
        set(() => ({ allowTabReordering: allow })),
      setTransport: (
        path: "/libcurl/index.mjs" | "/epoxy/index.mjs",
        name: "libcurl" | "epoxy"
      ) => set(() => ({ transport: { path, name } })),
      cloak: "none",
      siteType: "browser",
      setSiteType: (siteType: "browser" | "default") =>
        set(() => ({ siteType })),
      setCloak: (cloak: "none" | "aboutBlank") => set(() => ({ cloak })),
  title: "Thundr",
  setTitle: (title: string) => set(() => ({ title })),
  icon: "/assets/imgs/logo.png",
      setIcon: (icon: string) => set(() => ({ icon })),
      searchEngine: {
        name: "Brave",
        url: "https://search.brave.com/search?q=",
      },
      // Public WISP server (like UV-Static-2.0 uses)
      wispUrl: "wss://wisp.mercurywork.shop/",
      setWispUrl: (wispUrl: string) => set(() => ({ wispUrl })),
      setProxy: (proxy: "uv" | "scramjet") => set(() => ({ proxy })),
      setSearchEngine: (name: string, url: string) =>
        set(() => ({
          searchEngine: {
            name,
            url,
          },
        })),
      setDefault: () => set(() => DEFAULT_SETTINGS),
    }),
    {
      name: "settings",
      version: 2,
      migrate: (persistedState: any, version: number) => {
        // Force update to new WISP server if using old local one
        if (version < 2) {
          console.log("Migrating settings to v2 - updating WISP server");
          return {
            ...persistedState,
            version: "2.0.0",
            wispUrl: "wss://wisp.mercurywork.shop/",
            proxy: "uv",
          };
        }
        return persistedState;
      },
    }
  )
);

export { useSettings };
