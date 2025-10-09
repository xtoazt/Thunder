import OnBoarding from "@/components/homeComponents/onBoarding";
import { useSettings } from "@/store";
import { createFileRoute } from "@tanstack/react-router";
import ReactGA from "react-ga4";
import { lazy, useEffect, useState } from "react";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMeta } from "@/components/hooks/useMeta";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Obfuscate } from "@/components/obf";

// Lazy-loaded home variants
const Default = lazy(() => import("@/components/homeComponents/default"));
const Tabbed = lazy(() => import("@/components/homeComponents/tabbed"));

type Sponsor = {
  title: string;
  icon: string;
  url: string;
  discord: string;
};

const getSponsor = async (): Promise<Sponsor> => {
  try {
    const res = await fetch("/api/sponser");
    if (res.ok) {
      return res.json();
    }
  } catch (e) {
    // Backend not available, return empty sponsor
  }
  return { title: "", icon: "", url: "", discord: "" };
};

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getSponsor(),
});

function Home() {
  const settings = useSettings();
  const [loading, setLoading] = useState(true);
  const [showSupportAlert, setShowSupportAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if user has seen the update popup
    const hasSeenUpdate = localStorage.getItem("thundr:updateSeen:v2");
    if (!hasSeenUpdate) {
      const timer = setTimeout(() => {
        setShowUpdateAlert(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const random = Math.random() * 100 + 1;
      if (random <= 20) setShowSupportAlert(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Analytics & meta
  useEffect(() => {
    ReactGA.initialize("G-PBTEBTLRLZ");
    ReactGA.event("page_view", {
      page_location: window.location.href,
      page_title: "Thundr",
      user_agent: navigator.userAgent ?? "no-ua",
    });
  }, []);
  useMeta(settings.title, settings.icon);

  return (
    <>
      <OnBoarding />
      
      {/* Update Notification */}
      <AlertDialog open={showUpdateAlert}>
        <AlertDialogContent className="border-none rounded-full">
          <AlertDialogHeader>
            <AlertDialogTitle>✨ Thundr Got an Update!</AlertDialogTitle>
            <AlertDialogDescription>
              sorry bout that ass update but now it lowk looks fire so yea
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => {
                localStorage.setItem("thundr:updateSeen:v2", "true");
                setShowUpdateAlert(false);
              }}
            >
              Got it!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Support Alert */}
      <AlertDialog open={showSupportAlert}>
        <AlertDialogContent className="border-none rounded-full">
          <AlertDialogHeader>
            <AlertDialogTitle>Share the Website!</AlertDialogTitle>
            <AlertDialogDescription>
              Not only does this help motivate me to continue working on Thundr
              but it lets your friends in on the fun! If you're scared about the
              link being blocked we have plenty of more in the{" "}
              <Obfuscate text="discord" />!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSupportAlert(false)}>
              Got it!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AnimatePresence>{loading && <Loading key="loader" />}</AnimatePresence>

      {settings.siteType === "default" ? (
        <Default />
      ) : settings.siteType === "browser" ? (
        <Tabbed />
      ) : (
        <Default />
      )}
    </>
  );
}

// Animates 0→3 dots
const AnimatedDots: React.FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => (c + 1) % 4), 500);
    return () => clearInterval(id);
  }, []);
  return <span>{".".repeat(count)}</span>;
};

const Loading: React.FC = () => {
  const [isOnboarding, setIsOnboarding] = useState(false);
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("onboardingCompleted");
    if (!hasCompletedOnboarding) {
      setIsOnboarding(true);
    }
  }, []);
  if (isOnboarding) {
    return null;
  }
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="1 2"
        className={cn(
          `[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] fixed inset-0 z-0 opacity-40`
        )}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-4"
      >
        <Card className="border-border/30 bg-card/80 backdrop-blur-xl shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-6">
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Welcome to Thundr
            </CardTitle>
            <CardDescription className="text-lg">
              Please wait while we prepare the website
              <AnimatedDots />
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Home;
