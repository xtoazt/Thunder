import { useEffect } from "react";
import { VERSION } from "@/constants";
import { BareMuxConnection } from "@mercuryworkshop/bare-mux";
import { useSettings } from "../../store";
declare global {
  interface Window {
    Connection: BareMuxConnection;
  }
}

const useSw = (path: string, scope: string = "/") => {
  const settingsStore = useSettings();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Register the main service worker (UV only)
      navigator.serviceWorker
        .register(`./sw.js?v=${VERSION}`, { scope })
        .then(
          function (registration) {
            console.log(
              `[sw] ${path} successfully registered with a scope of ${registration.scope}`
            );
          },
          function (err) {
            console.error(`[sw] ${path} failed to register, error: `, err);
          }
        );
      
      // Setup BareMux connection for WISP
      navigator.serviceWorker.ready.then(() => {
        const connection = new BareMuxConnection("/baremux/worker.js");
        window.Connection = connection;
        console.log(
          `[uv] Setting WISP URL to ${settingsStore.wispUrl} using ${settingsStore.transport.name} transport`
        );
        connection.setTransport(settingsStore.transport.path, [
          {
            wisp: settingsStore.wispUrl,
          },
        ]).catch((err) => {
          console.error("[baremux] Failed to set transport:", err);
        });
      });
    }
  }, [path, settingsStore.wispUrl, settingsStore.transport]);
};

export default useSw;
