
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import GameMode from "./pages/GameMode";
import SpellingGame from "./pages/SpellingGame";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Progress from "./pages/Progress";
import Subscription from "./pages/Subscription";
import MultiLanguageGamePage from "./pages/MultiLanguageGamePage";
import AdventureMap from "./pages/AdventureMap";
import AdventureScene from "./pages/AdventureScene";
import Admin from "./pages/Admin";
import LearningDashboard from "./pages/LearningDashboard";
import { useGameStore } from "./utils/game";
import { AdventureProvider } from "./contexts/adventure";
import Social from "./pages/Social";
import CreateGroup from "./pages/CreateGroup";
import DiscoverGroupsPage from "./pages/DiscoverGroupsPage";
import { ParentalControlsProvider } from "./contexts/ParentalControlsContext";
import { SocialGroupsProvider } from "./contexts/SocialGroupsContext";
import TimeLimitOverlay from "./components/parental/TimeLimitOverlay";

function App() {
  const { checkAndUpdateStreak } = useGameStore();

  // Check streak on app load
  useEffect(() => {
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);

  return (
    <Router>
      <ParentalControlsProvider>
        <SocialGroupsProvider>
          <AdventureProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/game-mode" element={<GameMode />} />
              <Route path="/spelling-game" element={<SpellingGame />} />
              <Route path="/multilanguage" element={<MultiLanguageGamePage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/learning" element={<LearningDashboard />} />
              <Route path="/adventure" element={<AdventureMap />} />
              <Route path="/adventure/:locationId" element={<AdventureScene />} />
              <Route path="/social" element={<Social />} />
              <Route path="/social/create" element={<CreateGroup />} />
              <Route path="/social/discover" element={<DiscoverGroupsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <TimeLimitOverlay />
            <Toaster />
          </AdventureProvider>
        </SocialGroupsProvider>
      </ParentalControlsProvider>
    </Router>
  );
}

export default App;
