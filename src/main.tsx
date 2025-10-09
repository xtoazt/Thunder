import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
// Create a new router instance
const router = createRouter({ routeTree, defaultStaleTime: Infinity });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </StrictMode>
  );
}
