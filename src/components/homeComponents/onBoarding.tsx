import { useState, useEffect } from "react";
import { useSettings } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import GridPattern from "../ui/grid-pattern";
import { cn } from "@/lib/utils";
const OnBoarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const settings = useSettings();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("onboardingCompleted");
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setShowOnboarding(false);
  };

  if (!showOnboarding) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-md">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"1 2"}
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
              A powerful tab-based web browser with UV proxy
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/30 rounded-lg flex flex-col items-center justify-center p-4">
                <div className="w-full h-10 bg-white/20 rounded-t-lg flex items-center px-3 gap-2 shadow-lg">
                  <div className="w-20 h-7 bg-white/40 rounded-md"></div>
                  <div className="w-20 h-7 bg-white/20 rounded-md"></div>
                  <div className="w-8 h-7 bg-white/10 rounded-md ml-auto"></div>
                </div>
                <div className="w-full flex-1 bg-white/10 rounded-b-lg mt-2"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="text-primary font-semibold">✨ Features</div>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Tab-based browsing</li>
                    <li>• UV proxy support</li>
                    <li>• Bookmarks</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="text-primary font-semibold">🚀 Fast & Secure</div>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• WISP backend</li>
                    <li>• Modern UI</li>
                    <li>• Fullscreen mode</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button
              variant="default"
              className="w-full"
              onClick={handleComplete}
            >
              Get Started →
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnBoarding;
