
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AdventureProvider } from "./contexts/AdventureContext";
import Index from "./pages/Index";
import GameMode from "./pages/GameMode";
import SpellingGame from "./pages/SpellingGame";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AdventureMapPage from "./pages/AdventureMap";
import AdventureScenePage from "./pages/AdventureScene";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdventureProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/game-mode" element={<GameMode />} />
              <Route path="/play/:gameId" element={<SpellingGame />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/adventure" element={<AdventureMapPage />} />
              <Route path="/adventure/:locationId" element={<AdventureScenePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AdventureProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
